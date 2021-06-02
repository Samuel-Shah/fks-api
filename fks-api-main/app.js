var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

//helper imports
var dbInit = require('./helper/db-init')
//route imports
var usersRouter = require('./routes1/users');
var assignmentsRouter = require('./routes1/assignments');
var authRouter = require('./routes1/auth');
var classesRouter = require('./routes1/classes');
var subjectsRouter = require('./routes1/subjects');

var app = express();
app.use(cors())

//dbInit initializes the database and creates the tables
dbInit();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/users', usersRouter);
app.use('/assignments', assignmentsRouter);
app.use('/auth', authRouter);
app.use('/classes', classesRouter);
app.use('/subjects', subjectsRouter);

module.exports = app;
