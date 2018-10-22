const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
const User = require('../models/User');
const Lect = require('../models/Lect');
const settings = require('../config/settings'); // get settings file

// module.exports = function(passport) {
//   let opts = {};
//   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
//   opts.secretOrKey = settings.secret;
//   passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//     User.findOne({
//       id: jwt_payload.id
//     }, function(err, user) {
//       if (err) {
//         return done(err, false);
//       }
//       if (user) {
//         done(null, user);
//       } else {
//         done(null, false);
//       }
//     });
//   }));
// };

module.exports = {
  student: function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = settings.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({
        id: jwt_payload.id
      }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    }));
  },
  lecturer: function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = settings.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      Lect.findOne({
        id: jwt_payload.id
      }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    }));
  }
}
