//set up express app
//write logic for hangman
//create form for letters
// pick random word from file.  **rock paper scissors
// code snippet in newline
const express = require('express');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

/*****************************Middleware***************************/

app.use('/css', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

let gameArr = [];
  for (let idx = 0, idx <= random.length, idx++) {
    gameArr.push('_');
  }

  let wordArr = randWord.split('');
  let deadPool = [];
  let gameLives = 8;

  guessedLetter = ['']; {
    if deadPool.includes(guessedLetter) {
      if guessedLetter  == wodArr[idx]
    } if deadPool.includes(guessedLetter);
  } else {
    deadPool.push(guessedLetter)
    gameLives--;
  }
