var express = require('express');
const passport = require('passport');
const validation = require('../middlewares/validation');
const User = require('../model/user');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});


router.get('/register', function (req, res, next) {
    res.render('register');
});

router.get('/login', function (req, res, next) {
    let error = false;
    if (req.query.hasOwnProperty('error')) {
        error = true;
    }
    res.render('login', { error: error });
});

router.get('/logout', function (req, res, next) {
    req.logOut();
    req.session.destroy((err) => {
        res.redirect('/');
    })
});




router.post('/register', async (req, res, next) => {
    const user = new User(req.body);
    if (await validation.validateRegistration(user.username, user.password, user.role)) {
        await user.setHashedPassword();
        user.save((err, savedUser) => {
            if (err) {
                next(createError(500, err.errorMessage));
            }
            req.login(user, (err) => {
                if (err) {
                    next(createError(500, err.errorMessage));
                }
                res.redirect('/project');
            })
        });
    } else {
        res.redirect('/register');
    }

});


/* Login user */
router.post(
    '/login',
    passport.authenticate('local', { session: true, failureRedirect: '/login?error=true', successRedirect: '/project' }),
);


module.exports = router;