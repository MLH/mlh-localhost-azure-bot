const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const axios = require('axios');

const PORT = process.env.PORT || 3000;
const ENDPOINT = process.env.ENDPOINT || "";
const ENDPOINT_KEY = process.env.ENDPOINT_KEY || "";

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  // Render the landing page
  res.render('index', { title: 'MLHacks' });
});

app.post('/query', function (req, res) {
  const { body: { query } } = req;
  // Make a request to the QnA bot endpoint, with the specified EndpointKey
  axios.post(ENDPOINT, {
    question: query
  }, {
    headers: {
      'Authorization': 'EndpointKey ' + ENDPOINT_KEY,
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    res.send(response.data.answers[0].answer);
  }).catch(function(err) {
    console.log(err);
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, '0.0.0.0', () => console.log(`MLHacks app listening on port ${PORT}!`));