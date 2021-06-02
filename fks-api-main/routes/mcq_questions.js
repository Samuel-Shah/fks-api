var express = require('express');
var router = express.Router();
var connection = require('../helper/db-connection')

//add mcq_questions
router.post('/add', async function (req, res) {
  var mcq_questions_title = req.body.mcq_questions_title;
  var assignment_id = req.body.assignment_id;
  var status = req.body.status;
 
  var query = `INSERT INTO mcq_questions (mcq_questions_name, assignment_id, status) VALUES (?, ?)`;
  await connection.query(query, [mcq_questions_title, assignment_id, status], function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json({message:"mcq_question created"});
    }

  })

});


//get all mcq_questionss
router.get('/', function (req, res) {
  var query = `SELECT * FROM mcq_questions`;
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }
  })
});


//get mcq_questions by id
router.get('/id/:id', async function (req, res) {
  var mcq_questions_id = req.params.id
  var query = `SELECT * FROM mcq_questions WHERE mcq_questions_id=${mcq_questions_id}`
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }

  })
})

//update mcq_questions by id
router.patch('/id/:id/update', function (req, res) {
    var mcq_questions_name = req.body.mcq_questions_name;
    var assignment_id = req.body.assignment_id;
    var status = req.body.status;
   
  var query = "UPDATE mcq_questions SET"
    + "mcq_questions_name = ?, assignment_id=?, status=?"
    + " WHERE mcq_questions_id = ?";
    await connection.query(query,[mcq_questions_name, assignment_id, status, req.params.id ] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"mcq_questions Updated"});
      }
  
    })
})

//delete mcq_questions by id
router.delete('/id/:id/delete', function (req, res) {
  var query = "UPDATE mcq_questions SET"
    + " status = 0"
    + " WHERE mcq_questions_id = ?";
    await connection.query(query,[req.params.id] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"mcq_questions deleted"});
      }
  
    })
})

module.exports = router;
