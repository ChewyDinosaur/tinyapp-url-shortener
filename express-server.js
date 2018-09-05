// Left off at task #10
// Still need to modify header to show logout for logged in users
// instead of the login link


const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const PORT = 8080;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};



app.get('/', (req, res) => {
  let templateVars = {
    users: users,
    cookie: req.cookies
  }
  res.render('index', templateVars);
});

app.get('/registration', (req, res) => {
  let templateVars = {
    users: users
  };
  res.render('registration', templateVars);
});

app.get('/login', (req, res) => {
  let templateVars = {
    users: users
  }
  res.render('login', templateVars);
});

app.get('/urls', (req, res) => {
  let templateVars = { 
    urls: urlDatabase,
    users: users,
    cookie: req.cookies
  };
  res.render('urls_index', templateVars);
});

app.get('/urls/new', (req, res) => {
  let templateVars = {
    users: users,
    cookie: req.cookies
  };
  res.render('urls_new', templateVars);
});

app.get('/urls/:id', (req, res) => {
  let templateVars = { 
    shortURL: req.params.id,
    longURL: urlDatabase[req.params.id],
    users: users,
    cookie: req.cookies
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
  res.redirect(`/urls/${shortURL}`);
});

app.post('/urls/:id/delete', (req, res) => {
  const shortURL = req.params.id;
  delete urlDatabase[shortURL];
  res.redirect('/urls');
});

app.post('/urls/:id', (req, res) => {
  const shortURL = req.params.id;
  const longURL = req.body.longURL;
  urlDatabase[shortURL] = longURL;
  res.redirect('/urls');
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let id = '';
  for (var i in users) {
    if (users[i].email !== email) {
      // Not a match, skip to next user
      continue;
    } else {
      // Found match
      if (users[i].password === password) {
        id = users[i].id;
        res.cookie('user_id', id);
        return res.redirect('/urls');
      } else {
        return res.status(403).send('Password incorrect.');
      }
    }
  }
  return res.status(403).send('Email not found.');
});

app.post('/logout', (req, res) => {
  res.clearCookie('user_id');
  res.redirect('/');
});

app.post('/register', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const id = generateRandomString();
  // Check to make sure fields are not empty
  if (email === '' || password === '') {
    return res.status(400).send('Email or password was left blank.');
  }

  users[id] = {
    id: id,
    email: email,
    password: password
  };
  console.log(users);
  res.cookie('user_id', id);
  res.redirect('/urls')
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
