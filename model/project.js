const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: String,
  client: String,
  technology: String,
  role: String,
  description: String,
  status: String,
  createdby: String,
  appliedUsers: [String]
});


module.exports = mongoose.model('project', ProjectSchema);
