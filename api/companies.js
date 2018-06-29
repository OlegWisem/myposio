const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Validation
const validateCompanyInput = require('../validation/company');

// Load Company Model
const Company = require('../models/Company');

// Load User Model
const User = require('../models/User');

// @route   GET api/companies/test
// @desc    Tests companies route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route   POST api/profile
// @desc    Create or Edit company
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCompanyInput(req.body);

    // Check Validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const companyFields = {};
    companyFields.user = req.user.id;
    if (req.body._id) companyFields._id = req.body._id;
    if (req.body.name) companyFields.name = req.body.name;
    if (req.body.field) companyFields.field = req.body.field;
    if (req.body.address) companyFields.address = req.body.address;
    if (req.body.description) companyFields.description = req.body.description;
    if (req.body.phone) companyFields.phone = req.body.phone;
    if (req.body.email) companyFields.email = req.body.email;
    if (req.body.website) companyFields.website = req.body.website;
    if (req.body.phone) companyFields.phone = req.body.phone;

    // Social
    companyFields.social = {};
    if (req.body.youtube) companyFields.social.youtube = req.body.youtube;
    if (req.body.twitter) companyFields.social.twitter = req.body.twitter;
    if (req.body.facebook) companyFields.social.facebook = req.body.facebook;
    if (req.body.instagram) companyFields.social.instagram = req.body.instagram;

    Company.findOne({ user: companyFields.user, _id: companyFields._id }).then(
      company => {
        if (company) {
          // Update
          console.log('update');
        } else {
          // Create

          new Company(companyFields).save().then(company => res.json(company));
        }
      }
    );
  }
);

module.exports = router;
