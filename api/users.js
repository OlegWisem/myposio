const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');
const sendGrid = require('@sendgrid/mail');
const crypto = require('crypto');
const moment = require('moment');
const multer = require('multer');
const fs = require('fs');
const MulterAzureStorage = require('multer-azure-storage');

// Load User model
const User = require('../models/User');

// Load translations
const messages = require('../lang/messages');

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateProfileInput = require('../validation/profile');
const validateLoginInput = require('../validation/login');
const validateChangePasswordInput = require('../validation/changePassword');
const validateForgotPasswordInput = require('../validation/forgotPassword');
const validateResetPasswordInput = require('../validation/resetPassword');
const validateNewPasswordInput = require('../validation/newPassword');

// Set Mail API key
sendGrid.setApiKey(keys.sendGridKey);

// Set-up Multer

// Accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: new MulterAzureStorage({
    azureStorageConnectionString: keys.blobConnectionString,
    containerName: 'avatar',
    containerSecurity: 'blob'
  }),
  limits: {
    fileSize: 1024 * 1024 * 10 // Max File size in bytes (10 mb)
  },
  fileFilter
});

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  //Check for language
  if (!req.body.locale)
    return res.status(400).json({ lang: 'Locale value is required' });
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      if (req.body.locale === 'fi')
        errors.email = messages.fi['register.emailExists'];
      else errors.email = messages.en['register.emailExists'];
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/changepassword
// @desc    Change user's password
// @access  Private
router.post(
  '/changepassword',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (!req.body.locale)
      return res.status(400).json({ lang: 'Locale value is required' });

    const { errors, isValid } = validateChangePasswordInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const oldpassword = req.body.oldpassword;

    // Find user by email
    User.findOne({ email: req.body.email }).then(user => {
      // Check for user
      if (!user) {
        if (req.body.locale === 'fi')
          errors.email = messages.fi['login.userNotFound'];
        else errors.email = messages.en['login.userNotFound'];
        return res.status(404).json(errors);
      } else {
        // Check Old Password
        bcrypt.compare(oldpassword, user.password).then(isMatch => {
          if (isMatch) {
            // User Matched
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) throw err;
                user.set({ password: hash });
                user.save().then(profile => res.json(profile));
              });
            });
          } else {
            if (req.body.locale === 'fi')
              errors.oldpassword =
                messages.fi['changePassword.passwordIncorrect'];
            else
              errors.oldpassword =
                messages.en['changePassword.passwordIncorrect'];
            return res.status(400).json(errors);
          }
        });
      }
    });
  }
);

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  //Check for language
  if (!req.body.locale)
    return res.status(400).json({ lang: 'Locale value is required' });

  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      if (req.body.locale === 'fi')
        errors.email = messages.fi['login.userNotFound'];
      else errors.email = messages.en['login.userNotFound'];
      return res.status(404).json(errors);
    }

    // Check if account frozen
    if (user.passwordAttempts >= 4) {
      if (
        moment().isBefore(
          moment(new Date(user.passwordLastAttempt)).add(30, 'minutes')
        )
      ) {
        if (req.body.locale === 'fi')
          errors.email = messages.fi['login.userFrozen'];
        else errors.email = messages.en['login.userFrozen'];
        return res.status(400).json(errors);
      } else {
        // Reset attempts if unfrozen
        user.set({ passwordAttempts: 0 });
      }
    }
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched

        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          isAdmin: user.isAdmin
        };

        // Reset password attempts
        user.set({
          passwordAttempts: 0,
          passwordLastAttempt: moment()
        });
        user.save();

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: '7 day' },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        user.set({
          passwordAttempts: user.passwordAttempts + 1,
          passwordLastAttempt: moment()
        });
        user.save();
        let attempts = 5 - user.passwordAttempts;
        if (req.body.locale === 'fi')
          errors.password = messages.fi['login.passwordIncorrect'] + attempts;
        else
          errors.password = messages.en['login.passwordIncorrect'] + attempts;
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return currect user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      avatar: req.user.avatar
    });
  }
);

// @route   POST api/users/update
// @desc    Update user
// @access  Private
router.post(
  '/update',
  passport.authenticate('jwt', { session: false }),
  upload.single('avatar'),
  (req, res) => {
    //Check for language
    if (!req.body.locale)
      return res.status(400).json({ lang: 'Locale value is required' });
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    if (req.body.name) profileFields.name = req.body.name;
    if (req.body.email) profileFields.email = req.body.email;
    if (req.body.phone) profileFields.phone = req.body.phone;
    if (req.file) profileFields.avatar = req.file.url;

    User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: profileFields },
      { new: true }
    )
      .then(profile => {
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/users/mail/test
// @desc    Test mail
// @access  Public
router.get('/mail/test', (req, res) => {
  const msg = {
    to: 'wisemik4@gmail.com',
    from: 'test@example.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  };
  sendGrid.send(msg);

  res.json({ mail: 'done' });
});

// @route   POST api/users/forgot
// @desc    Forgot password - generate token and send e-mail
// @access  Public
router.post('/forgot', (req, res) => {
  //Check for language
  if (!req.body.locale)
    return res.status(400).json({ lang: 'Locale value is required' });

  const { errors, isValid } = validateForgotPasswordInput(req.body);

  // Check Validation
  if (!isValid) {
    //Return any errors with 400 status
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    // Check for user
    if (!user) {
      if (req.body.locale === 'fi')
        errors.email = messages.fi['forgotpassword.userNotFound'];
      else errors.email = messages.en['forgotpassword.userNotFound'];
      return res.status(404).json(errors);
    }
    crypto.randomBytes(20, (err, buffer) => {
      if (err) throw err;
      const token = buffer.toString('hex');

      User.findByIdAndUpdate(
        { _id: user._id },
        {
          reset_password_token: token,
          reset_password_expires: moment().add(10, 'days') // 10 days until expires
        },
        { upsert: true, new: true }
      )
        .then(newUser => {
          // Send e-mail
          const msg = {
            to: req.body.email,
            from: 'info@myposio.com',
            subject: 'Password Recovery',
            templateId: keys.resetPasswordTemplateEn,
            substitutions: {
              email: req.body.email,
              token: token,
              lang: req.body.locale
            }
          };
          if (req.body.locale === 'fi')
            msg.subject = messages.fi['passwordEmail.subject'];
          else msg.subject = messages.en['passwordEmail.subject'];
          sendGrid.send(msg);

          res.json({ success: true });
        })
        .catch(err => res.status(404).json(err));
    });
  });
});

// @route   GET api/users/reset
// @desc    Forgot password - validate token
// @access  Public
router.get('/reset', (req, res) => {
  //Check for language
  if (!req.query.lang)
    return res.status(400).json({ lang: 'Locale value is required' });
  const { errors, isValid } = validateResetPasswordInput(req.query);

  // Check Validation
  if (!isValid) {
    //Return any errors with 400 status
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.query.email,
    reset_password_token: req.query.token
  }).then(user => {
    // Check for user
    if (!user) {
      if (req.query.lang === 'fi')
        errors.email = messages.fi['resetPassword.requestInvalid'];
      else errors.email = messages.en['resetPassword.requestInvalid'];
      return res.status(404).json(errors);
    }
    // Check for token
    if (moment().isAfter(user.reset_password_expires)) {
      if (req.query.lang === 'fi')
        errors.email = messages.fi['resetPassword.tokenExpired'];
      else errors.email = messages.en['resetPassword.tokenExpired'];
      return res.status(404).json(errors);
    }
    res.json({ valid: true });
  });
});

// @route   POST api/users/reset
// @desc    Forgot password - set new password
// @access  Public
router.post('/reset', (req, res) => {
  //Check for language
  if (!req.body.locale)
    return res.status(400).json({ lang: 'Locale value is required' });
  const { errors, isValid } = validateNewPasswordInput(req.query, req.body);

  // Check Validation
  if (!isValid) {
    //Return any errors with 400 status
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.query.email,
    reset_password_token: req.query.token
  }).then(user => {
    // Check for user
    if (!user) {
      if (req.body.locale === 'fi')
        errors.email = messages.fi['newPassword.requestInvalid'];
      else errors.email = messages.en['newPassword.requestInvalid'];
      return res.status(404).json(errors);
    }

    // Check for token
    if (moment().isAfter(user.reset_password_expires)) {
      if (req.body.locale === 'fi')
        errors.token = messages.fi['newPassword.tokenExpired'];
      else errors.token = messages.en['newPassword.tokenExpired'];
      return res.status(404).json(errors);
    }

    // Change the password
    // User Matched
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;
        user.set({
          password: hash,
          reset_password_token: undefined,
          reset_password_expires: undefined
        });
        user.save().then(profile => res.json(profile));
      });
    });
  });
});

module.exports = router;
