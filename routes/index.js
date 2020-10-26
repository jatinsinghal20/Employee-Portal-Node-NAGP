var express = require('express');
const passport = require('passport');
const indexController = require('../controller/index-controller');
var router = express.Router();

/* GET home page. */
router.get('/', indexController.renderHomePage);

/* GET registration page. */
router.get('/register', indexController.renderRegistrationPage);

/* GET Login page. */
router.get('/login', indexController.renderLoginPage);

/* Logout user*/
router.get('/logout', indexController.logoutUser);

/* Register new user. */
router.post('/register', indexController.registerUser);


/* Login user */
router.post(
    '/login',
    passport.authenticate('local', { session: true, failureRedirect: '/login?error=true', successRedirect: '/project' }),
);


module.exports = router;