var express = require('express');
var router = express.Router();
var connection = require('../helper/db-connection')

//add subject_type
router.post('/add', async function (req, res) {
  var subject_type_name = req.body.subject_type_name;
  var status = req.body.status;
 
  var query = `INSERT INTO subject_type (subject_type_name, status) VALUES (?, ?)`;
  await connection.query(query, [subject_type_name, status], function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json({message:"Subject_Type created"});
    }

  })

});


//get all subject_types
router.get('/', function (req, res) {
  var query = `SELECT * FROM subject_type`;
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }
  })
});


//get subject_type by id
router.get('/id/:id', async function (req, res) {
  var subject_type_id = req.params.id
  var query = `SELECT * FROM subject_type WHERE subject_type_id=${subject_type_id}`
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }

  })
})

//update subject_type by id
router.patch('/id/:id/update', function (req, res) {
    var subject_type_name = req.body.subject_type_name;
    var status = req.body.status;
   
  var query = "UPDATE subject_type SET"
    + "subject_type_name = ?, status=?"
    + " WHERE subject_type_id = ?";
    await connection.query(query,[subject_type_name, status, req.params.id ] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"subject_type Updated"});
      }
  
    })
})

//delete subject_type by id
router.delete('/id/:id/delete', function (req, res) {
  var query = "UPDATE subject_type SET"
    + " status = 0"
    + " WHERE subject_type_id = ?";
    await connection.query(query,[req.params.id] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"subject_type deleted"});
      }
  
    })
})

module.exports = router;
