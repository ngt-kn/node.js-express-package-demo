const Joi = require('joi');
const express  = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const auth = require('./middleware/authenicate');
const config = require ('config');
const debug = require('debug')('app:startup');

const courses = require('./routes/courses');
const home = require('./routes/home');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

// use a view engine to return html to client
app.set('view engine', 'pug');
app.set('views', './views'); // default, put all templates here

// parses body type json
app.use(express.json());

/**
 * parses incoming request with url encoded payloads i.e. key=value&key=value
 * then formats as json body. extened allows use of arrays and complex objects
 */
app.use(express.urlencoded({ extened: true}));

// serve static files
app.use(express.static('public'));

// middleware for increased security, better to load early
app.use(helmet());

// load router from courses file
app.use('/api/courses', courses);
app.use('/', home);

/**
 * Setup config
 */
// console.log('Application Name: ' + config.get('name'));
// console.log('Mail Server Name: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));

// if env not set returns development
if (app.get('env') === 'development') {
    // enable http logging, will impact processing pipeline, may not want to use for production
    // or only use for specific situations
    app.use(morgan('tiny'));
    debug("morgan enabled...");
}

// Custom middleware function placeholder for logging
app.use(logger);

// Custom middleware function placehoder for authentication
app.use(auth);

// PORT 
// const port = process.env.PORT || 3000;
const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
