const express = require('express');
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/urls', (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render('urls_index', templateVars);
});

app.get('/urls/new', (req, res) => {
  res.render('urls_new');
});

app.get('/urls/:id', (req, res) => {
  let templateVars = { 
    shortURL: req.params.id,
    longURL: urlDatabase[req.params.id]
  };
  res.render('urls_show', templateVars)
});

app.get('/u/:id', (req, res) => {
  const shortURL = req.params.id;
  // check to make sure shortURL is valid
  if (!urlDatabase.hasOwnProperty(shortURL)) {
    return res.send('Incorrect URL');
  }
  let longURL = urlDatabase[shortURL];
  res.redirect(longURL);
});

app.post('/urls', (req, res) => {
  const shortURL = generateRandomString();
  const longURL = req.body.longURL;
  urlDatabase[shortURL] = longURL;
  console.log(urlDatabase);
  res.redirect(`/urls/${shortURL}`);
});

app.post('/urls/:id/delete', (req, res) => {
  const shortURL = req.params.id;
  delete urlDatabase[shortURL];
  res.redirect('/urls');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}`);
});


function generateRandomString() {
  let newString = '';
  const strLength = 6;
  const characters = [
    numbers = { min: 48, max: 57 },
    upperCase = { min: 65, max: 90 },
    lowerCase = { min: 97, max: 122 }
  ];

  for (let i = 0; i < strLength; i++) {
    const randomIndex = Math.floor(Math.random() * Math.floor(3));
    const min = characters[randomIndex].min;
    const max = characters[randomIndex].max;
    const code = Math.floor(Math.random() * (max - min + 1)) + min;
    newString += String.fromCharCode(code);
  }
  return newString;
}
