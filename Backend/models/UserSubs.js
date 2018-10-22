var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSubs = new Schema({
  id: {
    type: String,
    required: true
  },
  subjects:[],
  semester:{type: String}
});

module.exports = mongoose.model('UserSub', UserSubs);
