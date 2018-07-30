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
// @desc    Create
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
    if (req.body.companyid) companyFields.companyid = req.body.companyid;
    if (req.body.address) companyFields.address = req.body.address;
    if (req.body.description) companyFields.description = req.body.description;
    if (req.body.phone) companyFields.phone = req.body.phone;
    if (req.body.email) companyFields.email = req.body.email;
    if (req.body.website) companyFields.website = req.body.website;
    if (req.body.phone) companyFields.phone = req.body.phone;
    if (req.body.category) companyFields.category = req.body.category;

    // Social
    companyFields.social = {};
    if (req.body.youtube) companyFields.social.youtube = req.body.youtube;
    if (req.body.twitter) companyFields.social.twitter = req.body.twitter;
    if (req.body.facebook) companyFields.social.facebook = req.body.facebook;
    if (req.body.instagram) companyFields.social.instagram = req.body.instagram;

    // Create
    new Company(companyFields).save().then(company => res.json(company));
  }
);

// @route   POST api/profile/:company_id
// @desc    Edit company
// @access  Private
router.post(
  '/:company_id',
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
    if (req.user.isAdmin === false) companyFields.user = req.user.id;
    if (req.body.name) companyFields.name = req.body.name;
    if (req.body.field) companyFields.field = req.body.field;
    if (req.body.companyid) companyFields.companyid = req.body.companyid;
    if (req.body.address) companyFields.address = req.body.address;
    if (req.body.description) companyFields.description = req.body.description;
    if (req.body.phone) companyFields.phone = req.body.phone;
    if (req.body.email) companyFields.email = req.body.email;
    if (req.body.website) companyFields.website = req.body.website;
    if (req.body.phone) companyFields.phone = req.body.phone;
    if (req.body.category) companyFields.category = req.body.category;

    // Social
    companyFields.social = {};
    if (req.body.youtube) companyFields.social.youtube = req.body.youtube;
    if (req.body.twitter) companyFields.social.twitter = req.body.twitter;
    if (req.body.facebook) companyFields.social.facebook = req.body.facebook;
    if (req.body.instagram) companyFields.social.instagram = req.body.instagram;

    const query = {};
    query._id = req.params.company_id;
    if (req.user.isAdmin === false) query.user = companyFields.user;

    Company.findOneAndUpdate(query, { $set: companyFields }, { new: true })
      .then(company => {
        // Update
        res.json(company);
      })
      .catch(err =>
        res
          .status(401)
          .json({ company: 'You are not allowed to edit this company' })
      );
  }
);

// @route   DELETE api/profile/:company_id
// @desc    Delete company
// @access  Private
router.delete(
  '/:company_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Company.findOneAndRemove({ user: req.user.id, _id: req.params.company_id })
      .then(company => {
        res.json({ success: true });
      })
      .catch(err =>
        res.status(404).json({ company: 'There are no companies' })
      );
  }
);

// @route   GET api/companies/all
// @desc    Get all companies
// @access  Public
router.get('/all', (req, res) => {
  let errors = {};
  Company.find({ isreviewed: true })
    .populate('user', ['name'])
    .then(companies => {
      if (!companies) {
        errors.nocompany = 'There are no companies';
        return res.status(404).json(errors);
      }
      res.json(companies);
    })
    .catch(err => res.status(404).json({ company: 'There are no companies' }));
});

// @route   GET api/companies
// @desc    Get current users companies
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let errors = {};
    Company.find({ user: req.user.id })
      .populate('user', ['name'])
      .then(companies => {
        if (!companies) {
          errors.nocompanies = 'There is no companies for this user';
          return res.status(404).json(errors);
        }
        res.json(companies);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/companies/review
// @desc    Get all companies for review
// @access  Private
router.get(
  '/review',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let errors = {};
    Company.find({ isreviewed: false })
      .populate('user', ['name'])
      .then(companies => {
        if (!companies) {
          errors.nocompanies = 'There is no companies for this user';
          return res.status(404).json(errors);
        }
        res.json(companies);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/companies/review/:company_id
// @desc    Publish the company
// @access  Private
router.get(
  '/review/:company_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Company.findOneAndUpdate(
      { _id: req.params.company_id },
      { $set: { isreviewed: true } },
      { new: true }
    ).then(company => {
      // Update
      res.json(company);
    });
  }
);

// @route   GET api/companies/:id
// @desc    Get company by ID
// @access  Public
router.get('/:id', (req, res) => {
  Company.findById(req.params.id)
    .populate('user', ['name', 'phone', 'email'])
    .then(company => res.json(company))
    .catch(err =>
      res.status(404).json({ nocompanyfound: 'No company found with that ID' })
    );
});
module.exports = router;
