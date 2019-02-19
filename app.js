/* eslint-disable quotes */
'use strict';
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {

  res.send('Welcome to Express!');
});

// SUM SOLUTION
app.get('/sum', (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  if (!a) {
    res.status(400).send('Please provide an A query');
  }

  if (!b) {
    res.status(400).send('Please provide a B query');
  }

  const sum = parseFloat(a) + parseFloat(b);

  res.send(`The sum of a and b is ${sum}!`);
});

app.get('/sum', (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  if (!a) {
    res.status(400).send('Please provide an A query');
  }

  if (!b) {
    res.status(400).send('Please provide a B query');
  }

  const sum = parseFloat(a) + parseFloat(b);

  res.send(`The sum of a and b is ${sum}!`);
});

// setting app to listen on correct port
app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});