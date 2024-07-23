const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority&appName=Flickbase`;

const bodyParser = require("body-parser");
mongoose.connect(mongoURI);

const {xss} = require('express-xss-sanitizer');
const mongoSanitize = require('express-mongo-sanitize')

const passport = require('passport')
const {jwtStrategy} = require('./middleware/passport')
const {handleError, convertToApiError} = require('./middleware/apiError')

const routes = require('./routes');

// PARSING
app.use(bodyParser.json());

// SANITIZE
app.use(xss());
app.use(mongoSanitize());

// PASSPORT
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// ROUTES
app.use('/api',routes);

// ERROR HANDLING
app.use(convertToApiError) //this is for the unknown errors 
//
app.use((err,req,res,next)=>{
  handleError(err,res)
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
