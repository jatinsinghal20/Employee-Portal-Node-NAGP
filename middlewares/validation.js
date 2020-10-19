let User = require('../model/user');
let Project = require('../model/project');
const { createError } = require('../common/error');

validateRegistration = async function (username, password, role) {
   var isValid = false
   if (username && password && (role.toLowerCase() == "manager" || role.toLowerCase() == "employee")) {
      var user = await User.findOne({
         username
      },
         (err, user) => {
            if (err || user) {
               return user;
            }
            return null;
         }
      )
      if (!user) {
         isValid = true;
      }
   }
   return isValid;
}


validateApplyForProject = async function (id, username) {
   var validationStatus = {
      isValid: true
   }
   var project = await Project.findOne({
      _id: id
   },
      (err, project) => {
         if (project) {
            return project;
         }
         return null;
      }
   )
   if (project) {
      if (project.status == 'closed') {
         validationStatus.isValid = false;
         validationStatus.errorMessage = "Opening has been closed";
      }
      else if (project.appliedUsers && project.appliedUsers.indexOf(username) > -1) {
         validationStatus.isValid = false;
         validationStatus.errorMessage = "You have already applied for the opening";
      }

   }
   else {
      validationStatus.isValid = false;
      validationStatus.errorMessage = "Project doesn't exists";
   }
   return validationStatus;
}

validateCreateProject = function (req, res, next) {
   if (req.body.name && req.body.name.length > 2
      && req.body.client && req.body.client.length > 2
      && req.body.role && req.body.role.length > 2
      && req.body.technology && req.body.technology.length > 2
      && req.body.description && req.body.description.length > 2) {
      next();
   }
   else {
      next(createError(400, "Length of each field should be greater than 2"))
   }
}

module.exports = {
   validateRegistration,
   validateApplyForProject,
   validateCreateProject
}