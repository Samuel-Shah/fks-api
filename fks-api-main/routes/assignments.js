var express = require('express');
var router = express.Router();
var connection = require('../helper/db-connection')

//add assignment
router.post('/add', async function (req, res) {
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
    if (err)
      console.log(err)
    else {
      res.status(200).json({message:"assignment created"});
    }

  })

});


//get all assignments
router.get('/', function (req, res) {
  var query = `SELECT * FROM assignment`;
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }

  })
});


//get assignment by id
router.get('/id/:id', async function (req, res) {
  var assignment_id = req.params.id
  var query = `SELECT * FROM assignment WHERE assignment_id=${assignment_id}`
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }

  })
})

//update assignment by id
router.patch('/id/:id/update', function (req, res) {
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
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"assignment Updated"});
      }
  
    })
})

//delete assignment by id
router.delete('/id/:id/delete', function (req, res) {
  var query = "UPDATE assignment SET"
    + " status = 0"
    + " WHERE assignment_id = ?";
    await connection.query(query,[req.params.id] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"assignment Deleted"});
      }
  
    })
})

module.exports = router;
