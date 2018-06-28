const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// Init Routes
const users = require('./api/users');

// Init Express
const app = express();

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost/myposio')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use Routes
app.use('/api/users', users);

app.get('/', (req, res) => {
  res.send('test');
});

// Listen to port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
