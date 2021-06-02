var express = require('express');
var router = express.Router();
var connection = require('../helper/db-connection')

//add subject
router.post('/add', async function (req, res) {
  var subject_name = req.body.subject_name;
  var subject_type_id = req.body.subject_type_id;
  var class_id = req.body.class_id;
  var subject_teacher_id = req.body.subject_teacher_id;
  var status = req.body.status;
 
  var query = `INSERT INTO subject (subject_name, subject_type_id, class_id, subject_teacher_id, status) VALUES (?, ?, ?, ?, ?)`;
  await connection.query(query, [subject_name, subject_type_id, class_id, subject_teacher_id, status], function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json({message:"subject created"});
    }

  })

});


//get all subjects
router.get('/', function (req, res) {
  var query = `SELECT * FROM subject`;
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }
  })
});


//get subject by id
router.get('/id/:id', async function (req, res) {
  var subject_id = req.params.id
  var query = `SELECT * FROM subject WHERE subject_id=${subject_id}`
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }

  })
})

//update subject by id
router.patch('/id/:id/update', function (req, res) {
    var subject_name = req.body.subject_name;
    var subject_type_id = req.body.subject_type_id;
    var class_id = req.body.class_id;
    var subject_teacher_id = req.body.subject_teacher_id;
    var status = req.body.status;
   
  var query = "UPDATE subject SET"
    + "subject_name = ?, subject_type_id=?, class_id=?, subject_teacher_id=?, status=?"
    + " WHERE subject_id = ?";
    await connection.query(query,[subject_name, subject_type_id, class_id, subject_teacher_id, status, req.params.id ] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"subject Updated"});
      }
  
    })
})

//delete subject by id
router.delete('/id/:id/delete', function (req, res) {
  var query = "UPDATE subject SET"
    + " status = 0"
    + " WHERE subject_id = ?";
    await connection.query(query,[req.params.id] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"subject deleted"});
      }
  
    })
})

module.exports = router;
