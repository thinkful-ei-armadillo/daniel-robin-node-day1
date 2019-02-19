/* eslint-disable no-inner-declarations */
/* eslint-disable quotes */
"use strict";
const express = require("express");
const morgan = require("morgan");
const store = require("./store");
const app = express();
app.use(morgan("dev"));
// app.use(store);

app.get("/", (req, res) => {
  res.send("Welcome to Express!");
});

// SUM SOLUTION
app.get("/sum", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  if (!a) {
    res.status(400).send("Please provide an A query");
  }

  if (!b) {
    res.status(400).send("Please provide a B query");
  }

  const sum = parseFloat(a) + parseFloat(b);

  res.send(`The sum of a and b is ${sum}!`);
});

// CIPHER solution
app.get("/cipher", (req, res) => {
  const text = req.query.text;
  const shift = req.query.shift;

  if (!text) {
    res.status(400).send("Please provide a text query for shifting.");
  }

  if (!shift) {
    res
      .status(400)
      .send("Please provide a shift query for encoding your text.");
  }

  const uppers = text.toUpperCase();
  const shiftNum = parseFloat(shift);
  const textArr = uppers.split("");

  console.log(textArr);
  console.log(shift);

  const alphaStart = "A".charCodeAt(0);

  for (let i = 0; i < textArr.length; i++) {
    const charLoc = textArr[i].charCodeAt(0);
    if (charLoc < alphaStart || charLoc > alphaStart + 26) {
      textArr[i];
    } else {
      let distance = charLoc - alphaStart;
      distance = distance + shiftNum;
      distance = distance % 26;

      textArr[i] = String.fromCharCode(alphaStart + distance);
    }
  }

  const result = textArr.join("");

  res.send(`Encrypted code is ${result}`);
});

// LOTTO solution
app.get("/lotto", (req, res) => {
  const { numbers } = req.query;
  if (!numbers) {
    res.status(200).send("number is required");
  }
  if (!Array.isArray(numbers)) {
    res.status(200).send("numbers must be an array");
  }

  const numbersArr = numbers
    .map(num => parseInt(num))
    .filter(num => num >= 1 && num <= 20);
  if(numbersArr.length !== 6){
    res.status(400).send('must be 6 numbers between 1 and 20');
  }
  const randomNumber = new Array(6);
  for(let i = 0; i < 6; i++){
    const randomGenerator = parseInt(Math.random()*(20 - 1) +1);
    randomNumber[i] = randomGenerator;
  }
  let results = randomNumber.filter(num => !numbersArr.includes(num) );
  if(results.length === 0){
    res.send('Wow! Unbelievable! You could have won the mega millions!');
  } else if(results.length === 1){
    res.send('Congrats you won $100');
  } else if(results.length === 2){
    res.send('Congrats you won a free ticket');
  } else {
    res.send('you lose');
  }
  
});

// APPS search solution
app.get("/apps", (req, res) => {
  const sort = req.query.sort;
  const genres = req.query.genres;

  if (sort === 'App') {
    store.sort( (a, b) => { return a.App.charCodeAt(0) - b.App.charCodeAt(0); });
  }

  if (sort === 'Rating') {
    store.sort((a, b) => { return b.Rating - a.Rating; });
  }

  let results = [];

  if (genres === 'Action') {
    results.push(store.filter( app => app.Genres.includes('Action')));
  }

  if (genres === 'Puzzle') {
    results.push(store.filter( app => app.Genres.includes('Puzzle')));
  }

  if (genres === 'Strategy') {
    results.push(store.filter( app => app.Genres.includes('Strategy')));
  }

  if (genres === 'Casual') {
    results.push(store.filter( app => app.Genres.includes('Casual')));
  }

  if (genres === 'Arcade') {
    results.push(store.filter( app => app.Genres.includes('Arcade')));
  }

  if (genres === 'Card') {
    results.push(store.filter( app => app.Genres.includes('Card')));
  }

  if (!sort && !genres) {
    res.send(store);
  }
  else {
    res.send(results);
  }
});

// setting app to listen on correct port
app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});
