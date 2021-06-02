var express = require('express');
var router = express.Router();
var connection = require('../helper/db-connection')

//add student_details
router.post('/add', async function (req, res) {
  var admission_number = req.body.admission_number;
  var user_id = req.body.user_id;
  var class_id = req.body.class_id;
  var status = req.body.status;
 
  var query = `INSERT INTO student_details (admission_number, user_id, class_id, status) VALUES (?, ?, ?, ?)`;
  await connection.query(query, [admission_number, user_id, class_id, status], function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json({message:"Student created"});
    }

  })

});


//get all student_detailss
router.get('/', function (req, res) {
  var query = `SELECT * FROM student_details`;
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }
  })
});


//get student_details by id
router.get('/id/:id', async function (req, res) {
  var student_details_id = req.params.id
  var query = `SELECT * FROM student_details WHERE student_details_id=${student_details_id}`
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }

  })
})

//update student_details by id
router.patch('/id/:id/update', function (req, res) {
    var admission_number = req.body.admission_number;
    var user_id = req.body.user_id;
    var class_id = req.body.class_id;
    var status = req.body.status;
   
  var query = "UPDATE student_details SET"
    + "admission_number = ?, user_id=?, class_id=?, status=?"
    + " WHERE student_details_id = ?";
    await connection.query(query,[admission_number, user_id, class_id, status, req.params.id ] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"student_details Updated"});
      }
  
    })
})

//delete student_details by id
router.delete('/id/:id/delete', function (req, res) {
  var query = "UPDATE student_details SET"
    + " status = 0"
    + " WHERE student_details_id = ?";
    await connection.query(query,[req.params.id] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"student_details deleted"});
      }
  
    })
})

module.exports = router;
