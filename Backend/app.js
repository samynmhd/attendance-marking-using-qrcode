const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./config/db');
const auth = require('./routes/auth');
const students = require('./routes/student');
const admin = require('./routes/admin');
const lect = require('./routes/lect');
const history = require('connect-history-api-fallback');
const requestIp = require('request-ip');
require('dotenv').config();

// const serverStatic = require('server-static');

const app = express();
app.use(history({
  // verbose:true;
}));


const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DB_LINK, {
    promiseLibrary: require('bluebird')
  })
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'dist')));
// app.use(requestIp.mw())
// app.use(function(req, res) {
//     const ip = req.clientIp;
//     res.end(ip);
// });
// app.use(serverStatic(__dirname + '/dist'));
// app.get(/.*/,(req,res)=>{
//   res.sendfile(__dirname + "/dist/index.html");
// })
app.use('/api/students', express.static(path.join(__dirname + '/dist/')));
app.use('/api/auth', express.static(path.join(__dirname + '/dist/')));
app.use('/api/admin', express.static(path.join(__dirname + '/dist/')));
app.use('/api/lect', express.static(path.join(__dirname + '/dist/')));


// app.use('/book', book);
app.use('/api/students', students);
app.use('/api/auth', auth);
app.use('/api/admin', admin);
app.use('/api/lect', lect);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  console.error(err);
  err.status = 404;
  next(err);
});

// restful api error handler
app.use(function(err, req, res, next) {
  console.log(err);

  if (req.app.get('env') !== 'development') {
    delete err.stack;
  }

  res.status(err.statusCode || 500).json(err);
});
module.exports = app;
