var express = require('express');
const auth = require('../middlewares/auth');
const validation = require('../middlewares/validation');
const projectController = require('../controller/project-controller');
var router = express.Router();

router.use((req, res, next) => {
    if (req && req.user && req.user.username) {
        next();
    }
    else {
        res.redirect('/login');
    }
});

/* render home page */
router.get('/', (req, res) => { res.redirect("project/openings") });

/* List all projects available to user */
router.get('/openings', projectController.getProjectOpenings);

/* Render new project form */
router.get('/create', auth.isManager, projectController.renderCreateProject);

/* Render project details */
router.get('/:id', projectController.getProjectDetailsById);

/* create new project opening*/
router.post('/', auth.isManager, validation.validateCreateProject, projectController.createNewProjectOpening);

/* change project status */
router.put('/:id', auth.isManagerOfTheProject, projectController.changeProjectStatus);

/* apply for a project */
router.put('/:id/apply', auth.isEmployee, projectController.applyForProject);


module.exports = router;