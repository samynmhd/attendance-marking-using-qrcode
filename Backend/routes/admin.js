const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Tree = require('../models/Tree');
const Admin = require('../models/Admin')
const UserSub = require('../models/UserSubs');
const Course = require('../models/Course');
const StdAtt = require('../models/stdtestatt');
const passport = require('passport');
const settings = require('../config/settings');
// require('../config/passport')(passport);
const jwt = require('jsonwebtoken');
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const LectReg = require('../models/LectureRegisterToken');


//admin registration

router.post('/register', (req, res) => {
  console.log(req.body);
  if (!req.body.id || !req.body.password) {
    res.json({
      success: false,
      msg: "Please pass username and password"
    });
  } else {
    let newUser = new Admin({
      id: req.body.id,
      password: req.body.password,
      usertype: "Admin",
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

//admin Login

router.post('/login', function(req, res) {
  console.log(req.body);
  console.log("inside the login route");
  Admin.findOne({
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

//get username
router.get('/getstudent/:id', (req, res) => {
  User.findOne({
    id: req.params.id
  }, (err, isStudent) => {
    if (err) throw err;
    if (isStudent) {
      res.status(200).json(isStudent)
    } else {
      res.status(400).send({
        success: false,
        msg: 'User not found'
      })
    }
  })
})

//admin get school and course
router.get('/getSchool', (req, res) => {
  Course.find({}, (err, isFound) => {
    if (err) throw err;
    return res.json(isFound);
  })
})
//admin add school and course
router.post('/addSchool', (req, res, next) => {
  //check of the school created
  console.log(req.body);
  let name = [];
  let initialss = [];
  let typess = [];
  let course = req.body.course;
  let body = req.body;
  course.forEach((item) => {
    name.push(item.coursename);
    initialss.push(item.initial);
    typess.push(item.courseType);
  });
  console.log(course);
  Course.findOne({
    schoolName: req.body.schoolName
  }, (err, isSchool) => {
    if (err) throw err;
    if (isSchool) {
      //check for duplicate course names
      Course.findOne({
        schoolName: req.body.schoolName,
        'course.coursename': {
          $all: name
        },
        'course.courseType': {
          $all: typess
        }
      }, (err, isDuplicate) => {
        if (err) throw err;
        if (isDuplicate) {
          return res.status(400).send({
            success: false,
            msg: 'Duplicate course name'
          });
        } else {
          //if not duplicate update the course structure with the new course
          Course.findOneAndUpdate({
            schoolName: req.body.schoolName
          }, {
            $addToSet: {
              course: {
                $each: course
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
                msg: 'Course addeded'
              });
            }
          })
        }
      })
    } else {
      Course.create(req.body, (err, saved) => {
        if (err) return next(err);
        res.status(200).send({
          success: true,
          msg: 'New Course created'
        })
      })
    }
  })
})
// //admin get subjects
// router.get('/getsubjects',(req,res)=>{
//   Course.find({},(err,isData)=>{
//     if (err) throw err;
//     if(isData){
//       return res.json(isData);
//     }
//   })
// })

//admin add subjects
router.post('/addsubjects', (req, res) => {
  console.log(req.body);
  let subjects = [];
  subjects = req.body.subject;
  let sub = [];
  subjects.forEach((items) => {
    sub.push(items.name);
  });
  console.log(subjects);
  //find if the program is present
  Tree.findOne({
    courseName: req.body.courseName,
    semester: req.body.semester
  }, (err, found) => {
    if (err) throw err;
    console.log(err);
    //if found update the subjects array with new subjects
    //subjects need to be in an array
    if (found) {
      Tree.findOneAndUpdate({
        courseName: req.body.courseName,
        semester: req.body.semester
      }, {
        $push: {
          subjects: {
            $each: subjects
          }
        }
      }, {
        safe: true,
        upsert: true
      }, (err, doc) => {
        if (err) throw err;
        console.log(err);
        if (doc) {
          res.json({
            success: true,
            msg: "Updated"
          });
        } else {
          res.json({
            success: false,
            msg: "Something went wrong"
          });
        }
      })
    } else {
      //if the program is not present, create new program
      const newTree = new Tree({
        schoolName: req.body.schoolName,
        courseName: req.body.courseName,
        semester: req.body.semester,
        subjects: subjects
      });
      newTree.save((err) => {
        if (err) throw err;
        res.status(200).send({
          success: true,
          msg: 'Saved'
        });
      })
      // Tree.create(req.body, (err, post) => {
      //   if (err) return next(err);
      //   res.json(post);
      // });
    }
  });
});

//get the whole program Tree
router.get('/getTree', (req, res) => {
  Tree.find({}, (err, isTree) => {
    if (err) throw err;
    if (isTree) {
      return res.status(200).json(isTree);
    }
  })
})

//admin remove subjects

router.post('/deletesubject', (req, res) => {
  let data = req.body;
  console.log(data);
  Tree.findOne({
    courseName: data.courseName,
    semester: data.semester
  }, (err, found) => {
    if (err) throw err;
    console.log("second find");
    if (found) {
      console.log("inside the found function");
      Tree.update({
        courseName: data.courseName,
        semester: data.semester
      }, {
        $pull: {
          subjects: {
            subname: data.subname,
            subcode: data.subcode
          }
        }
      }, {
        safe: true,
        upsert: true
      }, (err, updated) => {
        if (err) throw err;
        if (updated) {
          return res.status(200).send({
            success: true,
            msg: 'Deleted'
          })
        } else {
          console.log("failed");
        }
      })
    }
  })
})

//update subject

router.post('/updatesubject/:id',(req,res)=>{
  console.log(req.body);
  let data = {};
  let id = req.params.id;
  console.log(id);
  data = {
    subcode: req.body.subcode,
    subname: req.body.subname
  }
  // Tree.findOneAndUpdate({"_id":req.body._id},{$set:{subcode: req.body.subcode, subname: req.body.subname}},{returnNewDocument:true})
  Tree.update({'subjects._id':req.params.id},{'$set':{'subjects.$.subname':req.body.subname, 'subjects.$.subcode':req.body.subcode}})
    .then(resp=>{
      console.log(resp);
      return res.status(200).send({
        success: false,
        msg:'Updated'
      })
    })
    .catch(err=>{
      console.log(err);
      return res.status(400).send({
        success: false,
        msg:'Unsuccessful'
      })
    })
})

//admin remove subjects
// router.post('/removesubjects', (req, res) => {
//   Tree.findOne({
//     courseName: req.body.courseName,
//     semester: req.body.semester
//   }, (err, found) => {
//     if (err) throw err;
//     if (found) {
//       console.log(found);
//       Tree.update({
//         courseName: req.body.courseName,
//         semester: req.body.semester
//       }, {
//         $pull: {
//           subjects: req.body.subjects
//         }
//       }, {
//         safe: true,
//         upsert: true
//       }, (err, doc) => {
//         if (err) throw err;
//         console.log(err);
//         if (doc) {
//           console.log(doc);
//           res.json({
//             success: true,
//             msg: "Deleted"
//           });
//         }
//       })
//     } else {
//       console.log("Something went wrong");
//     }
//   })
// })
//admin lect registration email
router.post('/email', (req, res, next) => {
  async.waterfall([
    (done) => {
      crypto.randomBytes(20, (err, buff) => {
        const token = buff.toString('hex');
        done(err, token);
      });
    },
    (token, done) => {
      let date = Date.now() + 3600000;
      let newData = new LectReg({
        token: token,
        resetDate: date
      });
      newData.save((err) => {
        done(err, token);
      });
    },
    (token, done) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.ADMIN_EMAIL,
          pass: process.env.ADMIN_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      const mailOptions = {
        to: req.body.email,
        from: 'Admin',
        subject: 'Registration Page',
        text: `You are receiving this because you have requested to be registered in the attendance system. Please follow the link to get registered.\n\n https://${req.headers.host}/lecturer/register/${token}\n\ Your token will expire within one hour, please register in between the time. If you did not request this, please ignore this message.`
      };
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.log(err);
        }
        return res.status(200).send({
          success: true,
          msg: `An email has been sent to ${req.body.email}`
        });
        done(err, 'done');
      });
    }
  ], (err) => {
    if (err) return next(err);
    res.status(401).send({
      success: false,
      msg: 'Server Error'
    });
  });
});

//admin check token is valid for lecturer Registration
router.get('/lectreg/:token', (req, res) => {
  LectReg.findOne({
    token: req.params.token,
    resetDate: {
      $gt: Date.now()
    }
  }, (err, isToken) => {
    if (err) throw err;
    if (isToken) {
      return res.status(200).send({
        success: true,
        msg: 'Token is valid'
      })
    } else {
      return res.status(400).send({
        success: false,
        msg: 'Token is invalid'
      });
    }
  });
});



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
