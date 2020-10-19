const expressJwt = require('express-jwt');
const { createError } = require('../common/error');
const project = require('../model/project');

function isAuthenticated() {
  return expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });
}

function isManager(req, res, next) {
  if (req.user.role.toLowerCase() == 'manager') {
    next();
  }
  else {
    next(createError(401, 'Unauthorized'));
  }
}

function isManagerOfTheProject(req, res, next) {
  if (req.user.role.toLowerCase() == 'manager') {
    project.findById(req.params.id, (err, project) => {
      console.log(project)
      if (project.createdby == req.user.username) {
        next();
      }
      else {
        res.status(401).send('Unauthorized');
      }
    })
  }
  else {
    res.status(401).send('Unauthorized');
  }
}

function isEmployee(req, res, next) {
  if (req.user.role.toLowerCase() == 'employee') {
    next();
  }
  else {
    next(createError(401, 'Unauthorized'));
  }
}

module.exports = {
  isAuthenticated,
  isManager,
  isEmployee,
  isManagerOfTheProject
};
