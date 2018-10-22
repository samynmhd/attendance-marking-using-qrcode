var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentAttendance = new Schema({
  subject: {type:String},
  date: {type: String},
  id: {type: String},
  sem: {type: String},
  week:{type: String},
  identifier: {type: String}
});

module.exports = mongoose.model('Student Attendance', StudentAttendance);
