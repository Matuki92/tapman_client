const express = require('express');
const path = require('path');
const app = express();
const pkg = require('./package.json');

// const forceSSL = function () {
//   return function (req, res, next) {
//     if (req.headers['x-forwarded-proto'] !== 'https') {
//       const path = 'https://' + req.get('Host') + req.url;
//       return res.redirect(path);
//     }
//     next();
//   };
// };

// app.use(forceSSL());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = 8080;

app.listen(port, () => console.log(pkg.name + ' ' + pkg.version + ' listening on ' + port));