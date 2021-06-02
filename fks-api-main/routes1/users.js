var express = require('express');
var router = express.Router();
var connection = require('../helper/db-connection')
var bcrypt= require('bcrypt');

//add user
router.post('/add', async function (req, res) {
  try {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let mobile = req.body.mobile;
    let email = req.body.email;
    let password = await bcrypt.hash(req.body.password,10);
    let created_by = req.body.created_by;
    let currentTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata"
    });
    let created_date = new Date(currentTime);
    let role_id = req.body.role_id;
    let role_name = req.body.role_name;
    //Add to master User table
    var sql = `INSERT INTO user (first_name, last_name, mobile, email, password, created_by, updated_by, deleted_by, created_date, role_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await connection.query(sql, [first_name, last_name, mobile, email, password, created_by, '--', '--', created_date, role_id], async function (err, rs, fields) {
      if (err) {
        console.log(err);
        res.status(400).json({message:"ERROR: BAD REQUEST"});
      }
      else { //role based checking and adding to respective tables
        if(role_name == "student"){
          let user_id = rs.insertId;
          let admission_number =  req.body.admission_number;
          let blood_group =  req.body.blood_group;
          let class_id = req.body.class_id;
          var sql1 = `INSERT INTO student_details (user_id, admission_number, blood_group, class_id) VALUES (?, ?, ?, ?)`;
          await connection.query(sql1, [user_id, admission_number, blood_group, class_id], function (err, rs, fields) {
            if (err) {
              console.log(err);
              res.status(400).json({message:"ERROR: BAD REQUEST"});
            }
            else {
              res.status(200).json({message:"user created"});
            }
          })
        }
        if(role_name == "teacher"){
          console.log(rs)
          let user_id = rs.insertId;
          let profile_picture_url = req.body.profile_picture_url;
          let short_desc = req.body.short_desc;
          let sql2 = `INSERT INTO teacher_details (user_id, profile_picture_url, short_desc) VALUES (?, ?, ?)`;
          await connection.query(sql2, [ user_id, profile_picture_url, short_desc], function (err, rs, fields) {
            if (err) {
              console.log(err);
              res.status(400).json({message:"ERROR: BAD REQUEST"});
            }
            else {
              res.status(200).json({message:"user created"});
            }
          })
        }
        if(role_name == "parent"){
          let parent_id = rs.insertId;
          let student_id = req.body.student_id;
          let occupation = req.body.occupation;
          let sql3 = "INSERT INTO parent_has_student (parent_id, student_id, occupation) VALUES (?,?,?)"
          await connection.query(sql3, [parent_id, student_id, occupation], function (err, rs, fields) {
            if (err) {
              console.log(err);
              res.status(400).json({message:"ERROR: BAD REQUEST"});
            }
            else {
              res.status(200).json({message:"user created"});
            }
          })
        }
        if(role_name == "admin"){
          res.status(200).json({message:"user created"});
        }
        if (role_name == "super admin") {
          res.status(200).json({message:"user created"});
        }
        if (role_name == "alumini") {
          res.status(200).json({message:"user created"});
        }
      }
    });
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
});

//get all users
router.get('/', async function (req, res) {
  try {
    let query = `SELECT * FROM user`;
    await connection.query(query,  function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json(rs);
      }
    });
  } catch (error) {
      res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
});

  //get user by id
router.get('/id/:id', async function (req, res) {
  try {
    let user_id = req.params.id
    let query = `SELECT * FROM user WHERE user_id=${user_id}`
    await connection.query(query,  function (err, rs, fields) {
      if (err)if (err) {
        console.log(err);
        res.status(400).json({message:"ERROR: BAD REQUEST"});
    } else {
        res.status(200).json(rs);
      }
    });
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
})

//update user by id
router.patch('/id/:id/update', async function (req, res) {
  try {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let mobile = req.body.mobile;
    let email = req.body.email;
    let password = await bcrypt.hash(req.body.password,10);
    let updated_by = req.body.updated_by;
    let currentTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata"
    });
    let updated_date = new Date(currentTime);
    let role_id = req.body.role_id;
    let query = "UPDATE user SET"
      + " first_name = ?, last_name = ?, mobile = ?, email = ?, password = ?,"
      + " updated_by = ?, updated_date = ?, role_id = ?"
      + " WHERE user_id = ?";
    await connection.query( query, [first_name, last_name, mobile, email, password,
       updated_by, updated_date, role_id, req.params.id] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"USER Updated"});
      }
    });
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
})

/**
 * MAY REQUIRE CHANGES WHILE DEVELEOPING FRONT END
 */
//update student details by id
router.patch('/id/:id/update_student_details', async function (req, res) {
  try {
    console.log("INSIDE /id/:id/update_student_details");
    let admission_number = req.body.admission_number;
    let class_id = req.body.class_id;
    let query = "UPDATE student_details SET admission_number = ?, class_id = ?"
      + " WHERE student_details_id = ?";
    console.log("DATA FETCHED");
    await connection.query(query, [ admission_number, class_id, req.params.id],
      function (err, rs, fields) {
      if (err) {
        console.log(err);
        res.status(400).json({message:"ERROR: BAD REQUEST"});
      } else {
        res.status(200).json({message:"student_details Updated"});
      }
    });
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
})

/**
 * MAY REQUIRE CHANGES WHILE DEVELEOPING FRONT END
 */
//update parent_has_student details by id
router.patch('/id/:id/update_parent_details', async function (req, res) {
  try {
    let student_id = req.body.student_id;
    let parent_id = req.body.parent_id;
    let query = "UPDATE parent_has_student SET"
    + " student_id = ?, parent_id = ?"
    + " WHERE parent_has_student_id = ?";
    await connection.query(query,[student_id, parent_id, req.params.id ]
      ,function (err, rs, fields) {
        if (err) {
          console.log(err);
          res.status(400).json({message:"ERROR: BAD REQUEST"});
        } else {
        res.status(200).json({message:"parent_has_student Updated"});
      }
    });
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
})

//update teacher_details by id
router.patch('/id/:id/update_teacher_details', async function (req, res) {
  try {
    var profile_picture_url = req.body.profile_picture_url;
    var short_desc = req.body.short_desc;
    var user_id = req.body.user_id;
    var status = req.body.status;
  var query = "UPDATE teacher_details SET"
    + "profile_picture_url = ?, short_desc=?, user_id=?, status=?"
    + " WHERE teacher_details_id = ?";
    await connection.query(query,[profile_picture_url, short_desc, user_id,  status, req.params.id ] ,function (err, rs, fields) {
      if (err) {
        console.log(err);
        res.status(400).json({message:"ERROR: BAD REQUEST"});
      } else {
        res.status(200).json({message:"teacher_details Updated"});
      }
    });
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
})

//update priviledge by id
router.patch('/id/:id/update_admin_details', async function (req, res) {
  try {
    var priviledge_level = req.body.priviledge_level;
    var priviledge_name = req.body.priviledge_name;
    var status = req.body.status;
    var query = "UPDATE priviledge SET"
      + " priviledge_level = ?, priviledge_name = ?"
      + " WHERE priviledge_id = ?";
      await connection.query(sql,[priviledge_level, priviledge_name, req.params.id  ] ,function (err, rs, fields) {
        if (err) {
          console.log(err);
          res.status(400).json({message:"ERROR: BAD REQUEST"});
        } else {
          res.status(200).json({message:"priviledge Updated"});
        }
      })
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
})

  //delete user by id (deactivation)
router.delete('/id/:id/disable', async function (req, res) {
  try {
    var query = "UPDATE user SET"
      + " status = 0"
      + " WHERE user_id = ?";
      await connection.query(query,[req.params.id] ,function (err, rs, fields) {
        if (err) {
          console.log(err);
          res.status(400).json({message:"ERROR: BAD REQUEST"});
        } else {
          res.status(200).json({message:"USER Deleted"});
        }
      })
    } catch (error) {
      res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
    }
  })

    //delete user by id (permanent deletion)
router.delete('/id/:id/permanent_delete', async function (req, res) {
  try {
    var query = "DELETE FROM user WHERE user_id = ?";
      await connection.query(query,[req.params.id] ,function (err, rs, fields) {
        if (err) {
          console.log(err);
          res.status(400).json({message:"ERROR: BAD REQUEST"});
        } else {
          res.status(200).json({message:"USER Deleted"});
        }
      })
    } catch (error) {
      res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
    }
  })

  //get user by role id
router.get('/filter_users_by_role/:role_id', async function (req, res) {
  try {
    var role_id = req.params.role_id
    var query = `SELECT * FROM user WHERE role_id=${role_id}`
    await connection.query(query,  function (err, rs, fields) {
      if (err) {
        console.log(err);
        res.status(400).json({message:"ERROR: BAD REQUEST"});
      } else {
        res.status(200).json(rs);
      }
    })
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
  })

//get users by class id
router.get('/filter_students_by_class/:class_id', async function (req, res) {
  try {
    var class_id = req.params.class_id
    var query = `SELECT users.user_id, student_details.student_id FROM users INNER JOIN student_details ON users.user_id=student_details.user_id WHERE class_id=${class_id};`
    await connection.query(query,  function (err, rs, fields) {
      if (err) {
        console.log(err);
        res.status(400).json({message:"ERROR: BAD REQUEST"});
      } else {
        res.status(200).json(rs);
      }
    })
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
})

//get users by blood group id
router.get('/filter_students_by_blood_group/:blood_group', async function (req, res) {
  try {
    var blood_group= req.params.blood_group
    var query = `SELECT * from student_details WHERE blood_group=${blood_group};`
    await connection.query(query,  function (err, rs, fields) {
      if (err) {
        console.log(err);
        res.status(400).json({message:"ERROR: BAD REQUEST"});
      } else {
        res.status(200).json(rs);
      }
    })
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
})


//get all teachers by class
router.get('/filter_teachers_by_class/:class', async function (req, res) {
  try {
    var query = "SELECT user.*, class.class_name, class.class_teacher_id FROM class "
    + " JOIN user ON class.class_teacher_id = user.user_id";
    await connection.query(query, [req.params.class ], function (err, rs, fields) {
      if (err) {
        console.log(err);
        res.status(400).json({message:"ERROR: BAD REQUEST"});
      } else {
        res.status(200).json(rs);
      }
    });
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
});

//get parents student id
router.get('/filter_parents_by_student/:student_id', async function (req, res) {
  try {
    var student_id= req.params.student_id
    var query = `SELECT * from parent_has_student WHERE student_id=${student_id};`
    await connection.query(query,  function (err, rs, fields) {
      if (err) {
        console.log(err);
        res.status(400).json({message:"ERROR: BAD REQUEST"});
      } else {
        res.status(200).json(rs);
      }
    });
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
})

  //get parents by occupation
router.get('/filter_parents_by_occupation/:occupation', async function (req, res) {
  try {
    var occupation= req.params.occupation
    var query = `SELECT * from parent_has_student WHERE occupation=${occupation};`
    await connection.query(query,  function (err, rs, fields) {
      if (err) {
        console.log(err);
        res.status(400).json({message:"ERROR: BAD REQUEST"});
      } else {
        res.status(200).json(rs);
      }
    });
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
})

  //add student_has_subject
router.post('/add_student_to_subject', async function (req, res) {
  try {
    var student_id = req.body.student_id;
    var subject_id = req.body.subject_id;
    var status = req.body.status;
    var query = `INSERT INTO student_has_subject (student_id, subject_id, status) VALUES (?, ?, ?)`;
    await connection.query(query, [student_id, subject_id, status], function (err, rs, fields) {
      if (err) {
        console.log(err);
        res.status(400).json({message:"ERROR: BAD REQUEST"});
      } else {
        res.status(200).json({message:"student added to subject"});
      }
    })
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
});

//delete student_has_subject by id
router.delete('/remove_student_from_subject/:id', async function (req, res) {
  try {
    var query = "UPDATE student_has_subject SET"
      + " status = 0"
      + " WHERE student_has_subject_id = ?";
      await connection.query(query,[req.params.id] ,function (err, rs, fields) {
        if (err) {
          console.log(err);
          res.status(400).json({message:"ERROR: BAD REQUEST"});
        } else {
          res.status(200).json({message:"student removed from subject deleted"});
        }
      });
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
})

  module.exports = router;


  






  
  
