const expect = require('chai').expect;
const Sinon = require('sinon');
const indexController = require('../controller/index-controller');
const User = require('../model/user');

describe('index-controller-test', () => {

   describe('renderHomePage', () => {
      it('Should call render', () => {
         const res = {
            render: function () {
            }
         };
         Sinon.spy(res, 'render');
         indexController.renderHomePage({}, res, {});
         expect(res.render.calledWith('index')).to.be.true;
      });
   });

   describe('renderRegistrationPage', () => {
      it('Should call render', () => {
         const res = {
            render: function () {
            }
         };
         Sinon.spy(res, 'render');
         indexController.renderRegistrationPage({}, res, {});
         expect(res.render.calledWith('register')).to.be.true;
      });
   });

   describe('renderLoginPage', () => {
      it('Should call render with error if there is error in query params', () => {
         const res = {
            render: function (title, parameter) {
               return parameter;
            }
         };
         const req = {
            query: {
               error: true
            }
         };
         Sinon.spy(res, 'render');
         indexController.renderLoginPage(req, res, {});
         expect(res.render.calledWith('login', { error: true })).to.be.true;

      });

      it('Should call render without error if there is no error in query params', () => {
         const res = {
            render: function (title, parameter) {
               return parameter;
            }
         };
         const req = {
            query: {
            }
         };
         Sinon.spy(res, 'render');
         indexController.renderLoginPage(req, res, {});
         expect(res.render.calledWith('login', { error: false })).to.be.true;

      });
   });

   describe('logoutUser', () => {
      it('Should end users session', () => {
         const res = {
            redirect: function () {
            }
         };
         const req = {
            logOut: function () {
            },
            session: {
               destroy: function () {

               }
            }
         };
         Sinon.spy(req, 'logOut');
         indexController.logoutUser(req, res, {});
         expect(req.logOut.called).to.be.true;
      });
   });

   describe('registerUser', () => {
      it('Should register new user if validation passed', () => {
         const res = {
            redirect: function () {
            }
         };
         const req = {
            body: {
               username: 'test',
               password: 'test',
               role: 'manager'
            }
         };

         Sinon.spy(res, 'redirect');
         indexController.registerUser(req, res, {}).then(() => {
            expect(res.redirect.called).to.be.true;
         })
      });
   });

});
