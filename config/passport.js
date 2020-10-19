const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../model/user');

passport.use(
    new LocalStrategy((username, password, done) => {
        username = username.trim();
        password = password.trim();
        User.findOne({
            username,
        },
            async (err, user) => {
                if (err) {
                    return done(err);
                }

                if (!user || !(await user.validatePassword(password))) {
                    return done(null, false), { message: "Incorrect Username or password" };
                }

                return done(null, user);
            }
        );
    })
);



passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});