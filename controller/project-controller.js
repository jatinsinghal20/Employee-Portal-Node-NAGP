const Project = require('../model/project');
const notification = require('../middlewares/notification');
const { createError } = require('../common/error');

function getProjectOpenings(req, res, next) {
   if (req.user.role.toLowerCase() == "employee") {
      Project.find({
         "status": "open"
      }, { _id: 1, name: 1, role: 1, technology: 1 }, (err, projects) => {
         if (err) {
            next(createError(500, err.errorMessage));
         }
         else {
            res.render('project-list', { projects: projects, username: req.user.username, isManager: false });
         }
      })
   }
   else {
      Project.find({
         "createdby": req.user.username
      }, { _id: 1, name: 1, role: 1, technology: 1 }, (err, projects) => {
         if (err) {
            next(createError(500, err.errorMessage));
         }
         else {
            res.render('project-list', { projects: projects, username: req.user.username, isManager: true });
         }
      })
   }
}

function getProjectDetailsById(req, res, next) {
   id = req.params.id;
   Project.find({
       "_id": id
   },
       (err, project) => {
           if (err) {
               next(createError(500, err.errorMessage));
           }
           else {
               res.render('project-detail', { project: project[0], username: req.user.username, role: req.user.role });
           }
       })
}

function renderCreateProject(req, res, next) {
   res.render('create-project', { username: req.user.username });
}

function createNewProjectOpening(req, res, next) {
   const project = new Project(req.body);
   project.status = 'open';
   project.createdby = req.user.username
   project.save((err, savedproject) => {
       if (err) {
           next(createError(500, err.errorMessage));
       }
       res.redirect('/project');
   });
}

function changeProjectStatus(req, res, next) {
   var id = req.params.id;
   Project.update({ _id: id }, { $set: { status: req.body.status } },
       (err, updatedProject) => {
           if (err) {
               next(createError(500, err.errorMessage));
           }
           if (req.body.status == 'closed') {
               notification.eventEmitter.emit('closeProject', id);
           }
           res.status(200).send(updatedProject);
       });
}


async function applyForProject(req, res, next) {
   var id = req.params.id;
   const validationStatus = await validateApplyForProject(id, req.user.username);
   if (validationStatus.isValid) {
       Project.update({ _id: id }, { $addToSet: { appliedUsers: req.user.username } },
           (err, updatedProject) => {
               if (err) {
                   next(createError(500, err.errorMessage));
               }
               notification.eventEmitter.emit('applyForProject', id, req.user.username);
               res.status(200).send(updatedProject);
           })
   }
   else {
       res.status(400).send(validationStatus.errorMessage);
   }
}

module.exports = {
   getProjectOpenings,
   renderCreateProject,
   getProjectDetailsById,
   createNewProjectOpening,
   changeProjectStatus,
   applyForProject
}