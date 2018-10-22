var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AttendanceToken = new Schema({
  token: { type: String },
  subject: {type:String},
  date: {type: String},
  week: {type: String},
  identifier:{type: String},
  hours: {type: Number}
});

module.exports = mongoose.model('Attendance Token', AttendanceToken);
