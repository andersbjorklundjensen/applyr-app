/* globals describe */

module.exports = function () {
  describe('[GET] /api/job/all - Get all applied jobs for one user', require('./get-all-jobs'));
  describe('[GET] /api/job/:id - Get one applied job by id for one user', require('./get-job'));
  describe('[POST] /api/job - Add a new job for one user', require('./add-job'));
  describe('[PUT] /api/job/:id - Edit a job for one user', require('./edit-job'));
  describe('[DELETE] /api/job/:id - Delete a job for one user', require('./delete-job'));
};
