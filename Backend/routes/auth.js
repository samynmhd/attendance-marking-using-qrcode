const mongoose = require('mongoose');
const passport = require('passport');
const settings = require('../config/settings');
// require('../config/passport')(passport)
const ppconf = require('../config/passport');
const student = ppconf.student(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/User");
const Lect = require("../models/Lect");
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const async = require('async');
const nodemailer = require('nodemailer');


//user registration
router.post('/register', (req, res) => {
  console.log(req.body);
  if (!req.body.id || !req.body.password) {
    res.json({
      success: false,
      msg: "Please pass username and password"
    });
  } else {
    let newUser = new User({
      id: req.body.id,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      gender: req.body.gender,
      program: req.body.program,
      shcool: req.body.shcool,
      usertype: req.body.usertype,
      semester: req.body.semester,
    });

    //save the user
    newUser.save((err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          success: false,
          msg: "Username or email already exists"
        });
      }
      res.status(200).json({
        success: true,
        msg: 'Successfuly created user'
      });
    })
  }
})

//password reset
router.post('/forget', (req, res, next) => {
  async.waterfall([
    (done) => {
      crypto.randomBytes(20, (err, buff) => {
        const token = buff.toString('hex');
        done(err, token);
      });
    },
    (token, done) => {
      User.findOne({
        email: req.body.email
      }, (err, user) => {
        if (!user) {
          return res.status(400).send({
            success: false,
            msg: 'Provided user does not exists'
          });
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;
        user.save((err) => {
          done(err, token, user);
        });
      });
    },
    (token, user, done) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'miuattendance@gmail.com',
          pass: 'W3lcome!.!'
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      const mailOptions = {
        to: user.email,
        from: 'miuattendance@gmail.com',
        subject: 'Password Rest',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'https://client-fyp.herokuapp.com/forgot/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.log(err);
        }
        return res.status(200).send({
          success: true,
          msg: `An email has been sent to ${user.email} with further instructions`
        });
        done(err, 'done');
      });
    }
  ], (err) => {
    if (err) return next(err);
    res.status(401).send({
      success: false,
      msg: 'Server error'
    });
  });
});

router.get('/reset/:token', (req, res) => {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  }, (err, user) => {
    if (!user) {
      return res.status(400).send({
        success: false,
        msg: 'Password reset token is invalid or Expired'
      });
    } else {
      res.status(200).send({
        success: true,
        msg: 'Password updated'
      });
    }
  });
});

router.post('/reset/:token', (req, res) => {
  async.waterfall([
    (done) => {
      User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
          $gt: Date.now()
        }
      }, (err, user) => {
        if (!user) {
          return res.status(400).send({
            success: false,
            msg: 'Password reset token is invalid or has Expired'
          });
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.save((err) => {
          if (err) {
            console.log(err);
          }
          done(err, user);
        });
      });
    },
    (user, done) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'miuattendance@gmail.com',
          pass: 'W3lcome!.!'
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      const mailOptions = {
        to: user.email,
        from: 'miuattendance',
        subject: 'Your password has changed',
        text: `Hello,\n\n
        This is a confirmation that the password for your account ${user.email} has just been changed.\n`
      };
      transporter.sendMail(mailOptions, (err) => {
        return res.status(200).send({
          success: true,
          msg: 'Your password has been changed'
        });
        done(err);
      });
    }
  ], (err) => {
    return res.status(401).send({
      success: false,
      msg: 'Server error'
    });
  });
});

// router.post('/register', function(req, res) {
//   if (!req.body.username || !req.body.password) {
//     res.json({success: false, msg: 'Please pass username and password.'});
//   } else {
//     var newUser = new User({
//       username: req.body.username,
//       password: req.body.password
//     });
//     // save the user
//     newUser.save(function(err) {
//       if (err) {
//         return res.json({success: false, msg: 'Username already exists.'});
//       }
//       res.json({success: true, msg: 'Successful created new user.'});
//     });
//   }
// });

//login
router.post('/login', function(req, res) {
  console.log(req.body);
  console.log("got inside backend");
  User.findOne({
    id: req.body.username
  }, (err, user) => {
    console.log(err + " first error");
    if (err) throw err;

    if (!user) {
      // res.json({success: false, msg: 'Authentication failed. User not found.'});
      res.status(401).send({
        success: false,
        msg: 'Authentication failed. User not found.'
      });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), settings.secret);
          // return the information including token as JSON
          console.log(user);
          res.json({
            success: true,
            token: 'JWT ' + token,
            user: user
          });
        } else {
          console.log(err + " second error");
          // res.json({success: false, msg: 'Authentication failed. Wrong password.'});
          res.status(401).send({
            success: false,
            msg: 'Authentication failed. Wrong password.'
          });
        }
      });
    }
  });
});

//lectuter login
router.post('/lecturer/login', function(req, res) {
  console.log(req.body);
  console.log("got inside backend");
  Lect.findOne({
    id: req.body.username
  }, (err, user) => {
    console.log(err + " first error");
    if (err) throw err;

    if (!user) {
      // res.json({success: false, msg: 'Authentication failed. User not found.'});
      res.status(401).send({
        success: false,
        msg: 'Authentication failed. User not found.'
      });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), settings.secret);
          // return the information including token as JSON
          console.log(user);
          res.json({
            success: true,
            token: 'JWT ' + token,
            user: user
          });
        } else {
          console.log(err + " second error");
          // res.json({success: false, msg: 'Authentication failed. Wrong password.'});
          res.status(401).send({
            success: false,
            msg: 'Authentication failed. Wrong password.'
          });
        }
      });
    }
  });
});


module.exports = router;
