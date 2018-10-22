var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var LectSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstname:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  school:{
    type: String
  },
  usertype: {
    type: String
  }
});

// AdminSchema.pre('save', (next) => {
//   var user = this;
//   if (this.isModified('password') || this.isNew) {
//     bcrypt.genSalt(10, (err, salt) => {
//       if (err) {
//         return next(err);
//       }
//       bcrypt.hash(user.password, salt, null, (err, hash) => {
//         if (err) {
//           return next(err);
//         }
//         user.password = hash;
//         next();
//       });
//     });
//   } else {
//     return next();
//   }
// });

LectSchema.pre('save', function(next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// AdminSchema.methods.comparePassword = (passw, cb) => {
//   bcrypt.compare(passw, this.password, (err, isMatch) => {
//     if (err) {
//       return cb(err);
//     }
//     cb(null, isMatch);
//   });
// };

LectSchema.methods.comparePassword = function(passw, cb) {
  bcrypt.compare(passw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Lect', LectSchema);
