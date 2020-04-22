var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var db = require('./config/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var viewsRouter = require('./routes/view.js');
var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/fixhop/views', viewsRouter)
app.use('/fixhop/api', apiRouter);

module.exports = app;
