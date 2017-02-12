const express = require('express');
const compression = require('compression');
const basicAuth = require('express-basic-auth');
const serveStatic = require('serve-static');

const oneHour = 3600000;

const app = express();
app.use(compression());
app.use(basicAuth({
  users: { 'user': 'collaborizm' },
  challenge: true,
  unauthorizedResponse: function(req) {
    return req.auth ? 'Wrong username or password.'  : 'No credentials provided';
  }
}));
app.use(serveStatic('./www', {maxAge: 0}));

app.listen(process.env.PORT || 8000, () => {
  console.log('Server started...')
});
