const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const fs = require('fs');

const app = express();



app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());
app.use(express.static(__dirname + '/public'));
//session init
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  if (!req.session.game) {
    req.session.game = {
    words: fs.readFileSync('/usr/share/dict/words', 'utf-8').toLowerCase().split('\n'),
    gameArr: [],
    wordArr: [],
    deadLetters: [],
    gameLives: 1,
    swap: false,
    Win: false,
    Lose: false
    };
    req.session.game.randWord = req.session.game.words[Math.floor(Math.random() * req.session.game.words.length)];
    req.session.game.wordArr = req.session.game.randWord.split('');
  }
  next();
});


app.get('/', function(req, res) {
  let randWord = req.session.game.randWord;
  let gameArr = req.session.game.gameArr;
  let wordArr = req.session.game.wordArr;
  let deadPool = req.session.game.deadLetters;
  let gameLives = req.session.game.gameLives;

  if (!gameArr.length) {

    for (let idx = 0; idx < randWord.length; idx++) {
      gameArr.push('_');
    }

    console.log(randWord);
    console.log(gameArr);
    console.log(wordArr);
    console.log(deadPool);
    console.log(gameLives);

  } else if (gameLives == 0) {
      console.log('you lose!');
      req.session.game.swap = true;
      req.session.game.Lose = true;
      req.session.game.gameArr = req.session.game.wordArr;

    } else if (wordArr.join('') === gameArr.join('') ) {
      console.log('you win!');
      req.session.game.swap = true;
      req.session.game.Win = true;
    }
  res.render('game', req.session.game);
});

app.post('/', function(req, res) {

  console.log(req.session.game.deadLetters);
  const wordArr = req.session.game.wordArr;
  const gameArr = req.session.game.gameArr;
  let guessedLetter = req.body.playerGuess;

  console.log(guessedLetter);

  let deadLet = req.session.game.deadLetters;

  if (deadLet.indexOf(guessedLetter) >= 0) {
    console.log('Guess Again');
    res.redirect('/');
  } else {
    for (let idx in wordArr) {
      if (guessedLetter === wordArr[idx]) {
        gameArr[idx] = wordArr[idx];
        console.log(gameArr);
        if (deadLet.indexOf(guessedLetter) < 0) {
          deadLet.push(guessedLetter);
        }
      }
    }
    if (wordArr.indexOf(guessedLetter) < 0) {
      deadLet.push(guessedLetter);
      req.session.game.gameLives--;
    }
  }
  res.redirect('/');
});

app.post('/newGame', function(req, res) {
req.session.game = 0;
res.redirect('/');
});

app.listen(3000, function() {
  console.log('Dead man walking');
});
