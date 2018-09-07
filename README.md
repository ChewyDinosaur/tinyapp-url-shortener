# tinyAPP URL Shortener

tinyAPP is a nodejs application powered by Express and EJS that provides a shortened URL and redirection for user submitted URLs.

![Login Page](https://github.com/ChewyDinosaur/tinyapp-url-shortener/blob/master/docs/login-page.png)

-------

Users can create, share, edit, and delete their tinyURLs. Stats such as amount of times a tinyURL has been visited and the date the tinyURL was created are tracked, along with unique visits and timestamps everytime the tinyURL was visited.

![tinyURLs List Page](https://github.com/ChewyDinosaur/tinyapp-url-shortener/blob/master/docs/url-list-page.png)
![tinyURLs Edit Page](https://github.com/ChewyDinosaur/tinyapp-url-shortener/blob/master/docs/url-edit-page.png)

## Dependencies

- Node.js
- Express
- EJS
- bcrypt
- body-parser
- cookie-session

## Setup

- After cloning the repo, run `npm install` to install the dependencies. 
- Run the development web server using the `node express_server.js` command.
- tinyAPP will then be accessable at `localhost:8080` and shortened URLs will redirect by inputting `localhost:8080/u/<tinyURL>` in the address bar.