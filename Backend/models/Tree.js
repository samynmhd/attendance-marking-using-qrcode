var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TreeSchema = new Schema({
  schoolName: { type: String },
  courseName: {type:String},
  semester: {type: String},
  subjects:[{
    subname:{type:String},
    subcode: {type:String}
  }]
});

module.exports = mongoose.model('Tree', TreeSchema);
