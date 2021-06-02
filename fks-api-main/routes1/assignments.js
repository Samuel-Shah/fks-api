var express = require('express');
var router = express.Router();
var connection = require('../helper/db-connection')

//add assignment
router.post('/add', async function (req, res) {
  try {
  var assignment_name = req.body.assignment_name;
  var subject_id = req.body.subject_id;
  var assignment_type_id = req.body.assignment_type_id;
  var assignment_question_type_id = req.body.assignment_question_type_id;
  var total_marks = req.body.total_marks;
  var assignment_value = req.body.assignment_value;
  var created_by = req.body.created_by;
  var updated_by = req.body.updated_by;
  var deleted_by = req.body.deleted_by;
  var created_date = req.body.created_date;
  var updated_date = req.body.updated_date;
  var deleted_date = req.body.deleted_date;
  var status = req.body.status;
  var query = `INSERT INTO assignment (assignment_name, subject_id, assignment_type_id, assignment_question_type_id, total_marks, assignment_value, created_by, updated_by, deleted_by, created_date, updated_date, deleted_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  await connection.query(query, [assignment_name, subject_id, assignment_type_id, assignment_question_type_id, total_marks, assignment_value, created_by, updated_by, deleted_by, created_date, updated_date, deleted_date, status ], function (err, rs, fields) {
    if (err) {
      console.log(err);
      res.status(400).json({message:"ERROR: BAD REQUEST"});
    } else {
      res.status(200).json({message:"assignment created"});
    }
  })
} catch (error) {
  res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
}
});

//get all assignments
router.get('/', async function (req, res) {
  try {
    var query = `SELECT * FROM assignment`;
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
  });

  //get assignment by id
router.get('/id/:id', async function (req, res) {
  try {
    var assignment_id = req.params.id
    var query = `SELECT * FROM assignment WHERE assignment_id=${assignment_id}`
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
  });
  
  //update assignment by id
  router.patch('/id/:id/update', async function (req, res) {
  try {
      var assignment_name = req.body.assignment_name;
      var subject_id = req.body.subject_id;
      var assignment_type_id = req.body.assignment_type_id;
      var assignment_question_type_id = req.body.assignment_question_type_id;
      var total_marks = req.body.total_marks;
      var assignment_value = req.body.assignment_value;
      var created_by = req.body.created_by;
      var updated_by = req.body.updated_by;
      var deleted_by = req.body.deleted_by;
      var created_date = req.body.created_date;
      var updated_date = req.body.updated_date;
      var deleted_date = req.body.deleted_date;
      var status = req.body.status;
    var query = "UPDATE assignment SET"
      + " assignment_name = ?, subject_id = ?, assignment_type_id = ?, assignment_question_type_id = ?, total_marks=?, assignment_value=?"
      + " updated_by = ?, updated_date = ?, deleted_by = '--'"
      + " WHERE assignment_id = ?";
      await connection.query(query,[assignment_name, subject_id, assignment_type_id, assignment_question_type_id, total_marks, assignment_value,  updated_by, updated_date,  req.params.id  ] ,function (err, rs, fields) {
        if (err) {
          console.log(err);
          res.status(400).json({message:"ERROR: BAD REQUEST"});
        } else {
          res.status(200).json({message:"assignment Updated"});
        }
    
      })
      } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
    
  })
  
  //delete assignment by id
  router.delete('/id/:id/disable', async function (req, res) {
  try {
    var query = "UPDATE assignment SET"
      + " status = 0"
      + " WHERE assignment_id = ?";
      await connection.query(query,[req.params.id] ,function (err, rs, fields) {
        if (err) {
          console.log(err);
          res.status(400).json({message:"ERROR: BAD REQUEST"});
        } else {
          res.status(200).json({message:"assignment Deleted"});
        }
    
      })
      } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
      
  })

  //delete assignment permanently by id
  router.delete('/id/:id/permanent_delete', async function (req, res) {
  try {
    var query = "DELETE FROM assignment WHERE assignment_id = ?";
      await connection.query(query,[req.params.id] ,function (err, rs, fields) {
        if (err)
          console.log(err)
        else {
          res.status(200).json({message:"assignment Deleted permanently"});
        }
    
      })
      } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
  })

  //get assignments by class id
router.get('/filter_by_class/:class_id', async function (req, res) {
  try {
    var class_id = req.params.class_id
    var query = `SELECT * FROM class_has_assignment WHERE class_id=${class_id};`
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

//search assignments by student
// router.get('/filter_by_student/:student', async function (req, res) {
//     let rs = {};
//     let query1 = "SELECT assignment.*, student_details.student_details_id,"
//     + " student_details.class_id, FROM student_details"
//     + " JOIN class_has_assignment ON student_details.class_id = class_has_assignment.class_id" 
//     + " JOIN assignment ON class_has_assignment.assignment_id = assignment.assignment_id"
//     + " WHERE "
//     + " AND assignment.status_id = 1"
//     + " AND class_has_assignment.status = 1"
//     + " AND student_details.status = 1"
//     + " AND student_details.student_details_id = ? ";
//     let rs1 = await connection.query(query1,[req.params.student] 
//       ,function (err1, rs1, fields1) {
//       if (err1)
//         console.log(err1);
//       else {
//         rs.all_assignments = rs;
//         let query1 = "SELECT assignment.assignment_id, student_completed_assignment.*,"
//         + " FROM student_completed_assignment"
//         + " JOIN assignment ON student_completed_assignment.assignment_id = assignment.assignment_id"
//         + " WHERE student_completed_assignment.student_id = ?";
//         let rs2= await connection.query(query1,[req.params.student] 
//           ,function (err1, rs2, fields1) {
//           if (err2)
//             console.log(err2);
//           else {
//             rs.completed_assignments = rs2;
//             res.status(200).json({message:"assignment Deleted"});
//             res.status(200).json(rs);
//           }
//         });
//       }
//     });
//   });
  
//   /** */
//   //search assignments by teacher
//   router.get('/filter_by_teacher/:teacher', async function (req, res) {
//     let query = "SELECT assignment.*, subject.subject_teacher_id,"
//     + " FROM subject"
//     + " JOIN assignment ON subject.subject_id = .subject_id"
//     + " WHERE "
//     + " AND assignment.status = ?"
//     + " AND subject.status = ?"
//     + " AND subject.subject_id = ?";
//     let rs = await connection.query(query,[req.params.teacher] 
//       ,function (err, rs, fields) {
//       if (err)
//         console.log(err);
//       else {
//         res.status(200).json(rs);
//       }
//     });
//   });
  
//   /** */
//   //delete record from student completed_assignment
//   router.delete('/id/:id/student/:student_id/unmark_complete', async function (req, res) {
//     let query = "UPDATE student_completed_assignment SET status = 0"
//     + " WHERE assignment_id = ? AND student_id = ?";
//     let rs= await connection.query(query,[req.params.id, req.params.student_id] 
//     ,function (err, rs, fields) {
//       if (err)
//         console.log(err);
//       else {
//         res.status(200).json({message:"Unmarked completed assignment"});
//       }
//     });
//   }); 
  
//   /** */
//   //update student_completed_assignment with attained_marks and comments by id and student_id
//   router.patch('/id/:id/:student_id/add_review', async function (req, res) {
//     let query = "UPDATE student_completed_assignment SET"
//     + " attained_marks = ?, comments=?"
//     + " WHERE assignment_id = ? AND student_id = ?";
//     let rs= await connection.query(query,[req.body.attained_marks,
//         req.body.comments,
//         req.params.id,
//         req.params.student_id,
//       ] ,function (err, rs, fields) {
//       if (err)
//         console.log(err);
//       else {
//         res.status(200)
//         .json({message:"student_completed_assignment updated with attained_marks and comments"});
//       }
//     });
//   });
  
//   /** */
//   //update student_completed_assignment with comments by id and student_id
//   router.patch('/id/:id/:student_id/update_review', async function (req, res) {
//     let query = "UPDATE student_completed_assignment SET"
//     + " comments = ? WHERE assignment_id = ? AND student_id = ?";
//     let rs= await connection.query(query,[req.body.comments,
//         req.params.id,
//         req.params.student_id,
//       ] ,function (err, rs, fields) {
//       if (err)
//         console.log(err);
//       else {
//         res.status(200)
//         .json({message:"student_completed_assignment updated with comments"});
//       }
//     });
//   });
  
//   /** */
//   //insert record in class_has_assignment
//   router.post('/add_assignment_to_class', async function (req, res) {
//     let query = "INSERT INTO class_has_assignment (class_id, assignment_id) VALUES (?,?)";
//     let rs= await connection.query(query,[req.body.class_id, req.body.assignment_id,
//       ] ,function (err, rs, fields) {
//       if (err)
//         console.log(err);
//       else {
//         res.status(200)
//         .json({message:"added record in class_has_assignment"});
//       }
//     });
//   });
  
//   /** */
//   //delete record from class_has_assignment
//   router.post('/remove_assignment_from_class', async function (req, res) {
//     let query = "UPDATE class_has_assignment SET ststus = 0 WHERE assignment_id = ?";
//     let rs= await connection.query(query,[req.body.assignment_id] ,function (err, rs, fields)
//     {
//       if (err)
//         console.log(err);
//       else {
//         res.status(200)
//         .json({message:"added record in class_has_assignment"});
//       }
//     });
//   });

  
  
  module.exports = router;

