var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stdtestatt = new Schema({
  id: {type: String},
  sem: {type: String},
  firstname: {type: String},
  lastname: {type: String},
  attendance:[{
    week:{type: String},
    identifier: {type: String},
    subject: {type:String},
    date: {type: String},
    ip: {type: String}
  }]
});

module.exports = mongoose.model('Student Attendance Test', stdtestatt);
