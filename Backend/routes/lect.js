const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const Tree = require('../models/Tree');
const Lect = require('../models/Lect');
const UserSub = require('../models/UserSubs');
const AttToken = require('../models/AttendanceToken');
const StudAtt = require('../models/StdAttendance');
const passport = require('passport');
const settings = require('../config/settings');
const async = require('async');
const test = require('../models/stdtestatt');
// const ppconf = require('../config/passport');
// const lecturer = ppconf.lecturer(passport);


//admin registration

router.post('/register', (req, res) => {
  console.log(req.body);
  if (!req.body.id || !req.body.password) {
    res.json({
      success: false,
      msg: "Please pass username and password"
    });
  } else {
    let newUser = new Lect({
      id: req.body.id,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      school: req.body.school,
      usertype: "Lecturer",
    });

    //save the user
    newUser.save((err) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          msg: "Username or email already exists"
        });
      }
      res.json({
        success: true,
        msg: 'Successfuly created user'
      });
    })
  }
})

//lectlogin
// router.post('/login', function(req, res) {
//   console.log(req.body);
//   console.log("inside the login route");
//   Lect.findOne({
//     id: req.body.username
//   }, (err, user) => {
//     console.log(err + " first error");
//     if (err) throw err;
//
//     if (!user) {
//       // res.json({success: false, msg: 'Authentication failed. User not found.'});
//       res.status(401).send({
//         success: false,
//         msg: 'Authentication failed. User not found.'
//       });
//     } else {
//       // check if password matches
//       user.comparePassword(req.body.password, function(err, isMatch) {
//         if (isMatch && !err) {
//           // if user is found and password is right create a token
//           var token = jwt.sign(user.toJSON(), settings.secret);
//           // return the information including token as JSON
//           res.json({
//             success: true,
//             token: 'JWT ' + token,
//             user: user
//           });
//         } else {
//           console.log(err + " second error");
//           // res.json({success: false, msg: 'Authentication failed. Wrong password.'});
//           res.status(401).send({
//             success: false,
//             msg: 'Authentication failed. Wrong password.'
//           });
//         }
//       });
//     }
//   });
// });

//qrdata
router.post('/qrdata', (req, res) => {
  console.log(req.body);
  let newAttToken = new AttToken({
    token: req.body.token,
    subject: req.body.sub,
    date: req.body.date,
    week: req.body.week,
    identifier: req.body.identifier,
    hours: req.body.hours,
  });

  newAttToken.save((err) => {
    if (err) return res.status(400).send({
      success: false,
      msg: err
    });
    return res.status(200).send({
      success: true,
      msg: 'Qrcode Data saved to db'
    });
  });
})

//getting attendance for subject for a specific date

router.get('/findAttendance/:sub/:date', (req, res) => {
  console.log(req.params.sub);
  StudAtt.find({
    subject: req.params.sub,
    date: req.params.date
  }, (err, isSub) => {
    if (err) throw err;
    if (isSub) {
      console.log(isSub);
      return res.status(200).json(isSub);
    } else {
      return res.status(400).send({
        success: false,
        msg: 'No Attendance'
      });
    }
  })
})

//find using semester registration date
router.get('/findAttendance/r/:sub/:iden', (req, res) => {
  console.log(req.params.sub);
  console.log(req.params.iden);
  StudAtt.find({
    subject: req.params.sub,
    identifier: req.params.iden
  }, (err, isSub) => {
    if (err) throw err;
    if (isSub) {
      console.log(isSub);
      return res.status(200).json(isSub);
    } else {
      return res.status(400).send({
        success: false,
        msg: 'No Attendance'
      });
    }
  })
})

//test find attendance
router.get('/findAttendance/test/:sub/:iden',(req,res)=>{
  test.find({'attendance.subject':req.params.sub, 'attendance.identifier':req.params.iden},(err,isFound)=>{
    if (err) throw err;
    if (isFound){
      return res.status(200).json(isFound);
    } else {
      return res.status(400).send({
        success: false,
        msg:'No Attendance'
      })
    }
  })
})

//test find attendance
router.get('/findAttendance/test/:sub/:iden/:date',(req,res)=>{
  test.find({'attendance.subject':req.params.sub, 'attendance.identifier':req.params.iden,'attendance.date':req.params.date},(err,isFound)=>{
    if (err) throw err;
    if (isFound){
      return res.status(200).json(isFound);
    } else {
      return res.status(400).send({
        success: false,
        msg:'No Attendance'
      })
    }
  })
})

router.get('/getToken/:sub/:iden',(req,res)=>{
  AttToken.find({subject:req.params.sub,identifier:req.params.iden},(err,isToken)=>{
    if (err) throw err;
    if(isToken){
      return res.status(200).json(isToken);
    }
  })
})

// router.post('/findAttendance/:sub', passport.authenticate('jwt', {
//   session: false
// }), (req, res, nex) => {
//   let token = getToken(req.headers);
//   console.log(token);
//   if (token) {
//     StudAtt.find({
//       subject: req.params.sub
//     }, (err, isFound) => {
//       if (err) throw err;
//       if (isFound) {
//         return res.status(200).json(isFound);
//       } else {
//         return res.status(400).send({
//           success: false,
//           msg: 'No Attendance'
//         });
//       }
//     })
//   } else {
//     return res.status(403).send({
//       success: false,
//       msg: 'Unauthorized'
//     });
//   }
// })
//finding attendance for the subject
// router.get('/findAttendance/second/:sub/:iden', (req, res) => {
//   let sub = decodeURIComponent(req.params.sub);
//   let iden = decodeURIComponent(req.params.iden);
//   StudAtt.find({
//     subject: sub,
//     identifier:iden
//   }, (err, isFound) => {
//     if (err) throw err;
//     if (isFound) {
//       return res.status(200).json(isFound);
//     } else {
//       return res.status(400).send({
//         success: false,
//         msg: 'No Attendance'
//       });
//     }
//   })
// })
//finding students who are registered for the chosen subject
router.get('/findstudentesregforsubject/:sub', (req, res) => {
  UserSub.find({
    subjects: req.params.sub
  }, (err, sub) => {
    if (err) throw err;
    res.status(200).json(sub);
  })
});
//getting users
router.get('/getUser',(req,res) =>{
  User.find({},(err,isUser)=>{
    if (err) throw err;
    if(isUser){
      res.status(200).json(isUser);
    }
  })
})


// //get subjects
// router.get('/subjects/:course', passport.authenticate('jwt', {
//   session: false
// }), (req, res, next) => {
//   let token = getToken(req.headers);
//   console.log(token);
//   if (token) {
//     console.log("inside token found");
//     let course = req.params.course;
//     //finding the subjects available for the current semester for the student to be added
//     Tree.find({
//       schoolName: course
//     }, (err, data) => {
//       if (err) return next(err);
//       console.log(data);
//       return res.json(data);
//     })
//   } else {
//     console.log("i am inside no token found");
//     res.status(403).send({
//       success: false,
//       msg: 'Unauthorized'
//     });
//   }
// })

//get subjects
router.get('/subjects/:course', (req, res) => {
  let course = req.params.course;
  //finding the subjects available for the current semester for the student to be added
  Tree.find({
    schoolName: course
  }, (err, data) => {
    if (err) return next(err);
    console.log(data);
    return res.json(data);
  })
})


// //readin qrdata
// router.get('/qrdata/:token/:sub/:id/:date', (req, res) => {
//   console.log("inside the method");
//   let token = decodeURIComponent(req.params.token);
//   let sub = decodeURIComponent(req.params.sub);
//   let uid = decodeURIComponent(req.params.id);
//   let date = decodeURIComponent(req.params.date);
//   AttToken.find({
//     token: token,
//     subject: sub
//   }, (err, data) => {
//     if (err) throw err;
//     if (data) {
//       StudAtt.findOne({
//         id: uid,
//         subject: sub,
//         date: date
//       }, (err, isGiven) => {
//         if (err) throw err;
//         if (!isGiven) {
//           let newData = new StudAtt({
//             id: uid,
//             subject: sub,
//             date: date
//           });
//           newData.save((err) => {
//             if (err) throw err;
//             console.log("inside save Attendance");
//             return res.status(200).send({
//               success: true,
//               msg: 'Attendance Saved'
//             });
//           })
//         } else {
//           console.log("inside the first error Attendance give");
//           return res.status(400).send({
//             success: false,
//             msg: 'Attendance already saved'
//           });
//         }
//       });
//     } else {
//       console.log("invalid token");
//       return res.status(400).send({
//         success: false,
//         msg: 'Invalid Token'
//       });
//     }
//   });
// });

//att token count
router.get('/count/:sub/:reg',(req,res)=>{
  AttToken.aggregate([
    {
      $match: {
        subject:req.params.sub,
        identifier: req.params.reg
      }
    },
    {
      $count:"tokens"
    }
  ],(err,count)=>{
    if (err) throw err;
    console.log(count);
    res.status(200).json(count);
  })
})

//student attendance projection
router.get('/project/:sub/:reg',(req,res)=>{
  test.aggregate([
    {
      $match:{
        "attendance.subject":req.params.sub,
        "attendance.identifier":req.params.reg
      }
    },
    {
      $project:{
        _id:0,
        sem:0,
        firstname:0,
        lastname:0
      }
    }
  ],(err,project)=>{
    if(err) throw err;
    console.log(project);
    res.status(200).json(project);
  })
})


//getting the Authentication getToken
getToken = function(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};


module.exports = router;
