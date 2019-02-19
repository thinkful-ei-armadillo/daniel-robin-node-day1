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

app.get('/cipher', (req, res) => {
  const text = req.query.text;
  const shift = req.query.shift;

  if (!text) {
    res.status(400).send('Please provide a text query for shifting.');
  }

  if (!shift) {
    res.status(400).send('Please provide a shift query for encoding your text.');
  }

  const uppers = text.toUpperCase();
  const shiftNum = parseFloat(shift);
  const textArr = uppers.split('');

  console.log(textArr);
  console.log(shift);

  const alphaStart = 'A'.charCodeAt(0);

  for (let i = 0; i < textArr.length; i++) {
    const charLoc = textArr[i].charCodeAt(0);
    if (charLoc < alphaStart || charLoc > (alphaStart + 26)) {
      textArr[i];
    }
    else {
      let distance = charLoc - alphaStart;
      distance = distance + shiftNum;
      distance = distance % 26;

      textArr[i] = String.fromCharCode(alphaStart + distance);
    }
  }

  const result = textArr.join('');

  res.send(`Encrypted code is ${result}`);
});

// setting app to listen on correct port
app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});