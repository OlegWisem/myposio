const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const CompanySchema = new Schema({
  companies: [
    {
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
      }
    }
  ]
});

module.exports = Company = mongoose.model('company', CompanySchema);
