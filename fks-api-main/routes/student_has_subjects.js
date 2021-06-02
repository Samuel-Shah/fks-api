var express = require('express');
var router = express.Router();
var connection = require('../helper/db-connection')

//add student_has_subject
router.post('/add', async function (req, res) {
  var student_id = req.body.student_id;
  var subject_id = req.body.subject_id;
  var status = req.body.status;
 
  var query = `INSERT INTO student_has_subject (student_id, subject_id, status) VALUES (?, ?, ?)`;
  await connection.query(query, [student_id, subject_id, status], function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json({message:"student_has_subject created"});
    }

  })

});


//get all student_has_subjects
router.get('/', function (req, res) {
  var query = `SELECT * FROM student_has_subject`;
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }
  })
});


//get student_has_subject by id
router.get('/id/:id', async function (req, res) {
  var student_has_subject_id = req.params.id
  var query = `SELECT * FROM student_has_subject WHERE student_has_subject_id=${student_has_subject_id}`
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }

  })
})

//update student_has_subject by id
router.patch('/id/:id/update', function (req, res) {
    var student_id = req.body.student_id;
  var subject_id = req.body.subject_id;
  var status = req.body.status;
   
  var query = "UPDATE student_has_subject SET"
    + "student_id= ?, subject_id=?, status=?"
    + " WHERE student_has_subject_id = ?";
    await connection.query(query,[student_id, subject_id, status, req.params.id ] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"student_has_subject Updated"});
      }
  
    })
})

//delete student_has_subject by id
router.delete('/id/:id/delete', function (req, res) {
  var query = "UPDATE student_has_subject SET"
    + " status = 0"
    + " WHERE student_has_subject_id = ?";
    await connection.query(query,[req.params.id] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"student_has_subject deleted"});
      }
  
    })
})

module.exports = router;
