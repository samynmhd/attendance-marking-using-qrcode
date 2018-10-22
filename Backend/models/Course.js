var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
  schoolName: {
    type: String
  },
  course: [{
    coursename: String,
    initial: String,
    courseType:String
  }]
});

module.exports = mongoose.model('Course', CourseSchema);
