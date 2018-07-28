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
const sharp = require('sharp');
const fs = require('fs');

// Load User model
const User = require('../models/User');

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateProfileInput = require('../validation/profile');
const validateLoginInput = require('../validation/login');
const validateChangePasswordInput = require('../validation/changePassword');
const validateForgotPasswordInput = require('../validation/forgotPassword');
const validateResetPasswordInput = require('../validation/resetPassword');
const validateNewPasswordInput = require('../validation/newPassword');

// Set Mail API key
sendGrid.setApiKey(
  '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'
);

// Set-up Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/temp');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().getTime() + file.originalname);
  }
});

// Accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
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
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
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
        errors.email = 'User not found';
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
            errors.oldpassword = 'Password incorrect';
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
      errors.email = 'User not found';
      return res.status(404).json(errors);
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
          avatar: user.avatar
        };

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
        errors.password = 'Password incorrect';
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
  upload.single('avatar'),
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
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
    if (req.file) {
      profileFields.avatar =
        req.protocol +
        '://' +
        req.get('host') +
        '/uploads/' +
        req.file.filename;
    }

    /*if (req.file) {
      sharp.cache(false);
      sharp('uploads/temp/' + req.file.filename)
        .resize(200)
        .toFile('uploads/' + req.file.filename)
        .then(newFile => {
          fs.unlink('uploads/temp/' + req.file.filename, err => {
            if (err) throw err;
          });
        })
        .catch(err => res.status(404).json(err));
    }*/
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
  const { errors, isValid } = validateForgotPasswordInput(req.body);

  // Check Validation
  if (!isValid) {
    //Return any errors with 400 status
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
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
            templateId: 'e52d49f2-014e-4ae3-8845-e9e08e94742d',
            substitutions: {
              email: req.body.email,
              token: token
            }
          };
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
      errors.email = 'Invalid request';
      return res.status(404).json(errors);
    }
    // Check for token
    if (moment().isAfter(user.reset_password_expires)) {
      errors.email = 'Token has expired';
      return res.status(404).json(errors);
    }
    res.json({ valid: true });
  });
});

// @route   POST api/users/reset
// @desc    Forgot password - set new password
// @access  Public
router.post('/reset', (req, res) => {
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
      errors.email = 'Invalid request';
      return res.status(404).json(errors);
    }

    // Check for token
    if (moment().isAfter(user.reset_password_expires)) {
      errors.token = 'Token has expired';
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
