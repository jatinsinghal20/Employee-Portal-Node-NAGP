const expect = require('chai').expect;
const Sinon = require('sinon');
const projectController = require('../controller/project-controller');
const Project = require('../model/project');

describe('project-controller-test', () => {

   // describe('getProjectOpenings', () => {
   //    it('Should call render', () => {
   //       const res = {
   //          render: function () {
   //          }
   //       };

   //       const req = {
   //          user: {
   //             role: 'manager'
   //          }
   //       };

   //       Sinon.stub(Project, 'find');
   //       Project.find.yield(null, {});
   //       Sinon.spy(res, 'render');
   //       projectController.getProjectOpenings(req, res, {});
   //       expect(res.render.calledWith('project-list')).to.be.true;
   //    });
   // });
});
