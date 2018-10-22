var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var LectureRegToken = new Schema({
  token: {
    type: String
  },
  resetDate: {
    type: Date
  }
});
module.exports = mongoose.model('Lecture Register Token', LectureRegToken);
