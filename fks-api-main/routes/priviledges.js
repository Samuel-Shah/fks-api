var express = require('express');
var router = express.Router();
var connection = require('../helper/db-connection')

//add priviledge
router.post('/add', async function (req, res) {
  var priviledge_level = req.body.priviledge_level;
  var priviledge_name = req.body.priviledge_name;
  var status = req.body.status;
 
  var query = `INSERT INTO priviledge (priviledge_level, priviledge_name, status) VALUES (?, ?, ?)`;
  await connection.query(query, [priviledge_level, priviledge_name, status], function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json({message:"priviledge created"});
    }

  })

});


//get all priviledges
router.get('/', function (req, res) {
  var query = `SELECT * FROM priviledge`;
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }
  })
});


//get priviledge by id
router.get('/id/:id', async function (req, res) {
  var priviledge_id = req.params.id
  var query = `SELECT * FROM priviledge WHERE priviledge_id=${priviledge_id}`
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }

  })
})

//update priviledge by id
router.patch('/id/:id/update', function (req, res) {
  var priviledge_level = req.body.priviledge_level;
  var priviledge_name = req.body.priviledge_name;
  var status = req.body.status;
  var query = "UPDATE priviledge SET"
    + " priviledge_level = ?, priviledge_name = ?"
    + " WHERE priviledge_id = ?";
    await connection.query(query,[priviledge_level, priviledge_name, req.params.id  ] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"priviledge Updated"});
      }
  
    })
})

//delete priviledge by id
router.delete('/id/:id/delete', function (req, res) {
  var query = "UPDATE priviledge SET"
    + " status = 0"
    + " WHERE priviledge_id = ?";
    await connection.query(query,[req.params.id] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"priviledge Deleted"});
      }
  
    })
})

module.exports = router;
