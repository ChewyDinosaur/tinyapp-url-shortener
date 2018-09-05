const urlDatabase = {
  "b2xVn2": {
    userID: 'userRandomID',
    url: "http://www.lighthouselabs.ca"
  },
  "9sm5xK": {
    userID: 'user2RandomID',
    url: "http://www.google.com"
  }
};

function urlsForUser(id) {
  let userURLS = {};
  for (var i in urlDatabase) {
    if (i === id) {
      userURLS[i] = {
        userID: id,
        url: urlDatabase[i].url
      };
    }
  }
  return userURLS;
}

const filtered = urlsForUser('b2xVn2');
console.log(filtered);