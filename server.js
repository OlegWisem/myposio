const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const keys = require('../config/keys');

// Init Routes
const users = require('./api/users');
const companies = require('./api/companies');

// Init Express
const app = express();

// Connect to MongoDB
mongoose
  .connect(keys.mongoDevURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Multer middleware
app.use('/uploads', express.static('./uploads'));

// Use Routes
app.use('/api/users', users);
app.use('/api/companies', companies);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Listen to port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
