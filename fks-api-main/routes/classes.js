var express = require('express');
var router = express.Router();
var connection = require('../helper/db-connection')

//add class
router.post('/add', async function (req, res) {
  var class_name = req.body.class_name;
  var class_teacher_id = req.body.class_teacher_id;
  var status = req.body.status;
 
  var query = `INSERT INTO class (class_name, class_teacher_id, status) VALUES (?, ?, ?)`;
  await connection.query(query, [class_name, class_teacher_id, status], function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json({message:"class created"});
    }

  })

});


//get all classs
router.get('/', function (req, res) {
  var query = `SELECT * FROM class`;
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }
  })
});


//get class by id
router.get('/id/:id', async function (req, res) {
  var class_id = req.params.id
  var query = `SELECT * FROM class WHERE class_id=${class_id}`
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }

  })
})

//update class by id
router.patch('/id/:id/update', function (req, res) {
 var class_name = req.body.class_name;
 var class_teacher_id = req.body.class_teacher_id;
 var status = req.body.status;
  var query = "UPDATE class SET"
    + "class_name = ?, class_teacher_id=?"
    + " WHERE class_id = ?";
    await connection.query(query,[class_name, class_teacher_id, req.params.id  ] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"class Updated"});
      }
  
    })
})

//delete class by id
router.delete('/id/:id/delete', function (req, res) {
  var query = "UPDATE class SET"
    + " status = 0"
    + " WHERE class_id = ?";
    await connection.query(query,[req.params.id] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"class deleted"});
      }
  
    })
})

module.exports = router;
