const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Tree = require('../models/Tree');
const UserSub = require('../models/UserSubs');
const AttToken = require('../models/AttendanceToken');
const StudAtt = require('../models/StdAttendance');
const StdTest = require('../models/stdtestatt');
const passport = require('passport');
// require('../config/passport')(passport);
const ppconf = require('../config/passport');
const student = ppconf.student(passport);
// require('../config/passport_lect')(passport);


//student dashboard
router.get('/subjects/:id/:sem', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  let token = getToken(req.headers);
  console.log(req.params.id);
  if (token) {
    //finding if the user has added any subjects to be displayed
    UserSub.findOne({
      id: req.params.id,
      semester: req.params.sem
    }, (err, found) => {
      if (err) return next(err);
      if (found) {
        return res.json(found);
        // return res.status(204).send({success:false,msg:"No subjects were found"});
      } else {
        return res.json('No Subjects');
      }
    });
    // res.json("This is the main route");
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized'
    });
  }
})


// get subjects for students for their current semester
router.get('/stdaddsub/:id/:sem/:course', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  let token = getToken(req.headers);
  let userid = decodeURIComponent(req.params.id);
  let usersem = decodeURIComponent(req.params.sem);
  let course = decodeURIComponent(req.params.course);
  console.log(userid + " " + usersem + " " + course);
  if (token) {
    //finding the subjects available for the current semester for the student to be added
    Tree.findOne({
      courseName: course,
      semester: usersem
    }, (err, data) => {
      if (err) return next(err);
      console.log(data);
      return res.json(data);
    })
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized'
    });
  }
})

//get attended classes for students
router.get('/attendance/:id/:sem', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  let token = getToken(req.headers);
  let userid = req.params.id;
  if (token) {
    //finding the classes attended by the student to be displayed in the dashboard
    StdTest.findOne({
      id: userid,
      sem:req.params.sem
    }, (err, isFound) => {
      if (err) throw err;
      if (isFound) {
        console.log(isFound);
        return res.json(isFound);
      } else {
        return res.json({
          msg: 'Have not attended any class yet'
        });
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized'
    });
  }
})

//select the subjects for the current semester
router.post('/selectsubs/:id/:sem', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  let token = getToken(req.headers);
  let userid = decodeURIComponent(req.params.id);
  let usersem = decodeURIComponent(req.params.sem);
  let body = req.body;
  let data = {
    id: userid,
    semester: usersem,
    subjects: body
  };
  if (token) {
    //checking if student has any subjects selected for the current semester
    UserSub.findOne({
      id: userid,
      semester: usersem
    }, (err, sub) => {
      if (err) return next(err);
      if (sub) {
        return res.status(400).send({
          success: false,
          msg: 'Subjects already selected'
        });
      } else {
        //if not save the selected subjects
        UserSub.create(data, (err, done) => {
          if (err) return next(err);
          if (done) {
            console.log(done);
            return res.status(200).send({
              success: true,
              msg: "Subjects Selected"
            });
          }
        })
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized'
    });
  }
})

//attendance marking
//readin qrdata
router.post('/qrdata/:token/:sub/:id/:sem/:date/:week/:identifier/:ip', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  let token = getToken(req.headers);
  console.log("inside the method");
  let Atoken = decodeURIComponent(req.params.token);
  let sub = decodeURIComponent(req.params.sub);
  let uid = decodeURIComponent(req.params.id);
  let date = decodeURIComponent(req.params.date);
  let week = decodeURIComponent(req.params.week);
  let identifier = decodeURIComponent(req.params.identifier);
  let ip = decodeURIComponent(req.params.ip);
  let sem = req.params.sem;
  //Checking if the student is logged in
  if (token) {
    //check if the student has registered for the subject
    UserSub.findOne({
      id: uid,
      semester: sem,
      subjects: sub
    }, (err, isSub) => {
      if (err) throw err;
      if (isSub) {
        //validate the attendance token
        AttToken.findOne({
          token: Atoken,
          subject: sub,
          date: date,
          week: week,
          identifier: identifier
        }, (err, data) => {
          if (err) throw err;
          if (data) {
            //find if student has given attendance for the current subject for the day
            StudAtt.findOne({
              id: uid,
              subject: sub,
              date: date
            }, (err, isGiven) => {
              if (err) throw err;
              if (!isGiven) {
                let newData = new StudAtt({
                  id: uid,
                  subject: sub,
                  date: date,
                  sem: sem,
                  week: week,
                  identifier: identifier,
                  ip:ip
                });
                //if not save the the attendance
                newData.save((err) => {
                  if (err) return res.status(400).send({
                    success: false,
                    msg: err
                  });
                  console.log("inside save Attendance");
                  return res.status(201).send({
                    success: true,
                    msg: 'Attendance Saved'
                  });
                });
              } else {
                console.log("inside the first error Attendance give");
                return res.status(400).send({
                  success: false,
                  msg: 'Attendance already saved'
                });
              }
            });
          } else {
            console.log("invalid token");
            return res.status(400).send({
              success: false,
              msg: 'Invalid Token'
            });
          }
        });

      } else {
        console.log("Subect not registered");
        return res.status(400).send({
          success: false,
          msg: 'Not registered for subject'
        });
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized'
    });
  }
});

//test std Attendance

router.post('/qrdata/test/:token/:sub/:id/:sem/:date/:week/:identifier/:ip', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  let token = getToken(req.headers);
  console.log("inside the method");
  let Atoken = decodeURIComponent(req.params.token);
  let sub = decodeURIComponent(req.params.sub);
  let uid = decodeURIComponent(req.params.id);
  let date = decodeURIComponent(req.params.date);
  let week = decodeURIComponent(req.params.week);
  let identifier = decodeURIComponent(req.params.identifier);
  let ip = decodeURIComponent(req.params.ip);
  let sem = req.params.sem;
  let attendance = [{
    subject: sub,
    date: date,
    week: week,
    identifier: identifier,
    ip: ip
  }]
  //Checking if the student is logged in
  if (token) {
    //check if the student has registered for the subject
    UserSub.findOne({
      id: uid,
      semester: sem,
      subjects: sub
    }, (err, isSub) => {
      if (err) throw err;
      if (isSub) {
        //validate the attendance token
        AttToken.findOne({
          token: Atoken,
          subject: sub,
          date: date,
          week: week,
          identifier: identifier
        }, (err, data) => {
          if (err) throw err;
          if (data) {
            //find if student has given attendance for the current subject for the day
            StdTest.findOne({
              id: uid,
              'attendance.subject': sub,
              'attendance.date': date
            }, (err, isGiven) => {
              if (err) throw err;
              if (!isGiven) {
                StdTest.findOne({'attendance.subject':sub, 'attendance.date':date, 'attendance.ip':ip}, (err,isIp)=>{
                  if (err) throw err;
                  if (isIp) {
                    console.log("duplicate ip address");
                    return res.status(400).send({
                      success: true,
                      msg: 'Please refrain from giving attendance to your colleagues'
                    })
                  } else {
                    StdTest.findOne({
                      id: uid,
                      sem: sem
                    }, (err, isData) => {
                      if (err) throw err;
                      if (isData) {
                        StdTest.findOneAndUpdate({
                          id: uid,
                          sem: sem
                        }, {
                          $push: {
                            attendance: {
                              $each: attendance
                            }
                          }
                        }, {
                          safe: true,
                          upsert: true,
                          multi: true
                        }, (err, isUpdated) => {
                          console.log(err);
                          if (err) throw err;
                          if (isUpdated) {
                            return res.status(200).send({
                              success: true,
                              msg: 'Attendance Saved'
                            });
                          }
                        });
                      } else {
                        User.findOne({id:uid},(err,isUser)=>{
                          if (err) throw err;
                          if(isUser){
                            console.log(isUser.firstname);
                            let user = {};
                            user = isUser;
                            let newData = new StdTest({
                              id: uid,
                              sem: sem,
                              firstname: isUser.firstname,
                              lastname: isUser.lastname,
                              attendance: [{
                                week: week,
                                identifier: identifier,
                                subject: sub,
                                date: date
                              }]
                            })

                            newData.save((err) => {
                              if (err) throw err;
                              return res.status(200).send({
                                success: true,
                                msg: 'Attendance saved'
                              });
                            });
                          } else {
                            return res.status(400).send({
                              success:false,
                              msg:'User not found'
                            })
                          }
                        })
                      }
                    });
                  }
                })
              } else {
                console.log("inside the first error Attendance give");
                return res.status(400).send({
                  success: false,
                  msg: 'Attendance already saved'
                });
              }
            });
          } else {
            console.log("invalid token");
            return res.status(400).send({
              success: false,
              msg: 'Invalid Token'
            });
          }
        });

      } else {
        console.log("Subect not registered");
        return res.status(400).send({
          success: false,
          msg: 'Not registered for subject'
        });
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized'
    });
  }
});

//update user

router.post('/updateuser/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  let token = getToken(req.headers);
  let userid = req.params.id;
  if (token) {
    User.findByIdAndUpdate(req.params.id,req.body,{new: true},(err,isUpdated)=>{
      if (err) throw err;
      if(isUpdated){
        return res.status(200).json(isUpdated);
      } else {
        return res.status(400).send({
          success: false,
          msg:'Failed to update'
        })
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized'
    });
  }
})


// router.get('/stdaddsub/:id/:sem/:course',(req,res,next)=>{
//   let userid = decodeURIComponent(req.params.id);
//   let usersem = decodeURIComponent(req.params.sem);
//   let course = decodeURIComponent(req.params.course);
//   console.log(userid+" "+usersem+" "+course);
//     Tree.findOne({courseName:course, semester:usersem},(err,data)=>{
//       if(err) console.log(err);
//       console.log(data);
//         res.json(data);
//     });
// })








//for get methods

// router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
//   var token = getToken(req.headers);
//   if (token) {
//     Book.find(function (err, books) {
//       if (err) return next(err);
//       res.json(books);
//     });
//   } else {
//     return res.status(403).send({success: false, msg: 'Unauthorized.'});
//   }
// });




//for saving
// router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
//   var token = getToken(req.headers);
//   if (token) {
//     Book.create(req.body, function (err, post) {
//       if (err) return next(err);
//       res.json(post);
//     });
//   } else {
//     return res.status(403).send({success: false, msg: 'Unauthorized.'});
//   }
// });
//finding subjects for the students
// router.get('/subjects', passport.authenticate('jwt', { session: false}), function(req, res) {
//   var token = getToken(req.headers);
//   if (token) {
//     UserSubs.findOne({id:req.body.id},(err, sub) => {
//       if (err) return next(err);
//       if(sub){
//         res.json(sub);
//       } else {
//         res.status(401).send({success:false, msg:"Please choose subjects"});
//       }
//     });
//   } else {
//     return res.status(403).send({success: false, msg: 'Unauthorized.'});
//   }
// });
// router.post('/subjects', (req,res)=>{
//   Tree.findOne({courseName:req.body.courseName,semester:req.body.semester},(err,data)=>{
//     if(err) throw err;
//     if(data){
//       res.json(data);
//     } else {
//       res.json({success:false, msg:'No subjects found'});
//     }
//   })
// })



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
