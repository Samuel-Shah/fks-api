var express = require('express');
var router = express.Router();
var connection = require('../helper/db-connection')

//add assignment_type
router.post('/add', async function (req, res) {
  var assignment_type_name = req.body.assignment_type_name;
  var status = req.body.status;
 
  var sql = `INSERT INTO assignment_type (assignment_type_name, status) VALUES (?, ?)`;
  await connection.query(sql, [assignment_type_name, status], function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json({message:"assignment_type created"});
    }

  })

});


//get all assignment_types
router.get('/', function (req, res) {
  var query = `SELECT * FROM assignment_type`;
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }
  })
});


//get assignment_type by id
router.get('/id/:id', async function (req, res) {
  var assignment_type_id = req.params.id
  var query = `SELECT * FROM assignment_type WHERE assignment_type_id=${assignment_type_id}`
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }

  })
})

//update assignment_type by id
router.patch('/id/:id/update', function (req, res) {
    var assignment_type_name = req.body.assignment_type_name;
    var status = req.body.status;
   
  var query = "UPDATE assignment_type SET"
    + "assignment_type_name = ?, status=?"
    + " WHERE assignment_type_id = ?";
    await connection.query(sql,[assignment_type_name, status, req.params.id ] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"assignment_type Updated"});
      }
  
    })
})

//delete assignment_type by id
router.delete('/id/:id/delete', function (req, res) {
  var query = "UPDATE assignment_type SET"
    + " status = 0"
    + " WHERE assignment_type_id = ?";
    await connection.query(sql,[req.params.id] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"assignment_type deleted"});
      }
  
    })
})

module.exports = router;
