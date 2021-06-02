var express = require('express');
var router = express.Router();
var connection = require('../helper/db-connection')

//add assignment_question_type
router.post('/add', async function (req, res) {
  var assignment_question_type_name = req.body.assignment_question_type_name;
  var status = req.body.status;
 
  var sql = `INSERT INTO assignment_question_type (assignment_question_type_name, status) VALUES (?, ?)`;
  await connection.query(sql, [assignment_question_type_name, status], function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json({message:"assignment_question_type created"});
    }

  })

});


//get all assignment_question_types
router.get('/', function (req, res) {
  var query = `SELECT * FROM assignment_question_type`;
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }
  })
});


//get assignment_question_type by id
router.get('/id/:id', async function (req, res) {
  var assignment_question_type_id = req.params.id
  var query = `SELECT * FROM assignment_question_type WHERE assignment_question_type_id=${assignment_question_type_id}`
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }

  })
})

//update assignment_question_type by id
router.patch('/id/:id/update', function (req, res) {
    var assignment_question_type_name = req.body.assignment_question_type_name;
    var status = req.body.status;
   
  var query = "UPDATE assignment_question_type SET"
    + "assignment_question_type_name = ?, status=?"
    + " WHERE assignment_question_type_id = ?";
    await connection.query(sql,[assignment_question_type_name, status, req.params.id ] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"assignment_question_type Updated"});
      }
  
    })
})

//delete assignment_question_type by id
router.delete('/id/:id/delete', function (req, res) {
  var query = "UPDATE assignment_question_type SET"
    + " status = 0"
    + " WHERE assignment_question_type_id = ?";
    await connection.query(sql,[req.params.id] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"assignment_question_type deleted"});
      }
  
    })
})

module.exports = router;
