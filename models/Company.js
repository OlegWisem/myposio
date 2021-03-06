const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const CompanySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  field: {
    type: String,
    required: true
  },
  companyid: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  email: {
    type: String,
    lowercase: true
  },
  website: {
    type: String
  },
  category: {
    type: String
  },
  requests: {
    type: Number,
    default: 0
  },
  secondaryCategory: {
    type: String
  },
  photo: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  isreviewed: {
    type: Boolean,
    default: false
  }
});

module.exports = Company = mongoose.model('company', CompanySchema);
