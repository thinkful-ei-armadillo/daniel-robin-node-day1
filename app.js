/* eslint-disable quotes */
'use strict';
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

// starting syntax for each GET path
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

// setting app to listen on correct port
app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});