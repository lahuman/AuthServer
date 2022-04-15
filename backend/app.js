
global.reqlib = require('app-root-path').require;
require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const winston = require('./config/winston');
const indexRouter = require('./routes/index');

// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
const swaggerDefinition = {
  info: { // API informations (required)
    title: 'Auth Service', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'Auth API' // Description (optional)
  },
  host: 'localhost:3000', // Host (optional)
  basePath: '/' // Base path (optional)
};

// Options for the swagger docs
const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  apis: ['./routes/index.js', './routes/users/index.js', './routes/roles/index.js']
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

var allowlist = ['http://localhost:8000'];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

const app = express();
app.use(cors(corsOptionsDelegate));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('express-session')({
  secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: { maxAge: 60000 }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(require('morgan')('combined', { stream: winston.stream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
