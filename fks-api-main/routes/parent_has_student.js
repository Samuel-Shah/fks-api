var express = require('express');
var router = express.Router();
var connection = require('../helper/db-connection')

//add parent_has_student
router.post('/add', async function (req, res) {
  var student_id = req.body.student_id;
  var parent_id = req.body.parent_id;
  var status = req.body.status;
 
  var query = `INSERT INTO parent_has_student (student_id, parent_id, status) VALUES (?, ?, ?, ?)`;
  await connection.query(query, [student_id, parent_id, status], function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json({message:"Parent created"});
    }

  })

});


//get all parent_has_students
router.get('/', function (req, res) {
  var query = `SELECT * FROM parent_has_student`;
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }
  })
});


//get parent_has_student by id
router.get('/id/:id', async function (req, res) {
  var parent_has_student_id = req.params.id
  var query = `SELECT * FROM parent_has_student WHERE parent_has_student_id=${parent_has_student_id}`
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }

  })
})

//update parent_has_student by id
router.patch('/id/:id/update', function (req, res) {
    var student_id = req.body.student_id;
    var parent_id = req.body.parent_id;
    var status = req.body.status;
   
  var query = "UPDATE parent_has_student SET"
    + "student_id = ?, parent_id=?, status=?"
    + " WHERE parent_has_student_id = ?";
    await connection.query(query,[student_id, parent_id, status, req.params.id ] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"parent_has_student Updated"});
      }
  
    })
})

//delete parent_has_student by id
router.delete('/id/:id/delete', function (req, res) {
  var query = "UPDATE parent_has_student SET"
    + " status = 0"
    + " WHERE parent_has_student_id = ?";
    await connection.query(query,[req.params.id] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"parent_has_student deleted"});
      }
  
    })
})

module.exports = router;
