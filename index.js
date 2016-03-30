var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
app.use(cookieParser());
app.use(bodyParser.json());

var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

var sessionTokens = {};

function isValidToken (req) {
  var sessionToken = req.cookies['sessionToken'];
  return (sessionToken && sessionTokens[sessionToken]);
};

var auth = require('./private/auth.json');

var apiRouter = express.Router();
apiRouter.post('/login', function (req, res) {
  if (req.body) {
    var data = req.body;
    var password = data.password;
    console.log(data);
    if (password === auth.password) {
      var st = "sessoin_token:" + (Date.now() * Math.random()) + "-" + "puppies";
      sessionTokens[st] = st;
      res.cookie('sessionToken', st, { maxAge: 1000 * 60 * 60 * 24 * 3, httpOnly: true });
      res.redirect('/');
      console.log("logged in successfully, created session.");
    } else {
      res.status(404).end();
    }
  } else {
    res.sendStatus(400);
  }
});
app.use('/api', apiRouter);

app.use('/app', express.static('public'));

app.use('/app/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.use('/', function (req, res) {
  if (isValidToken(req) || req.path == '/app/login') {
    proxy.web(req, res, { target: 'http://localhost:8080' })
  } else {
    res.redirect('/app/login');
  }
});

var port = process.env.port || 8081;
server.listen(port, function () {
  console.log("rethinkdb-webmin listening on port: %s", port);
});
