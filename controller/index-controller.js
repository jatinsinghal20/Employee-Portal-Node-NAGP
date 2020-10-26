const validation = require('../middlewares/validation');
const User = require('../model/user');
const createError = require('../common/error').createError;

function renderHomePage(req, res, next) {
   res.render('index');
}

function renderRegistrationPage(req, res, next) {
   res.render('register');
}

function renderLoginPage(req, res, next) {
   let error = false;
   if (req.query.hasOwnProperty('error')) {
       error = true;
   }
   res.render('login', { error: error });
}

function logoutUser(req, res, next) {
   req.logOut();
   req.session.destroy((err) => {
       res.redirect('/');
   })
}

async function registerUser(req, res, next) {
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
      next(createError(400, "Please enter valid data to register user"));
   }

}

module.exports = {
   renderHomePage,
   renderRegistrationPage,
   renderLoginPage,
   logoutUser,
   registerUser
}