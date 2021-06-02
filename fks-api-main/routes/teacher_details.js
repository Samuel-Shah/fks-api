var express = require('express');
var router = express.Router();
var connection = require('../helper/db-connection')

//add teacher_details
router.post('/add', async function (req, res) {
  var profile_picture_url = req.body.profile_picture_url;
  var short_desc = req.body.short_desc;
  var user_id = req.body.user_id;
  var status = req.body.status;
 
  var query = `INSERT INTO teacher_details (profile_picture_url, short_desc, user_id, status) VALUES (?, ?, ?, ?)`;
  await connection.query(query, [profile_picture_url, short_desc, user_id,  status], function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json({message:"teacher created"});
    }

  })

});


//get all teacher_detailss
router.get('/', function (req, res) {
  var query = `SELECT * FROM teacher_details`;
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }
  })
});


//get teacher_details by id
router.get('/id/:id', async function (req, res) {
  var teacher_details_id = req.params.id
  var query = `SELECT * FROM teacher_details WHERE teacher_details_id=${teacher_details_id}`
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }

  })
})

//update teacher_details by id
router.patch('/id/:id/update', function (req, res) {
    var profile_picture_url = req.body.profile_picture_url;
    var short_desc = req.body.short_desc;
    var user_id = req.body.user_id;
    var status = req.body.status;
  var query = "UPDATE teacher_details SET"
    + "profile_picture_url = ?, short_desc=?, user_id=?, status=?"
    + " WHERE teacher_details_id = ?";
    await connection.query(query,[profile_picture_url, short_desc, user_id,  status, req.params.id ] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"teacher_details Updated"});
      }
  
    })
})

//delete teacher_details by id
router.delete('/id/:id/delete', function (req, res) {
  var query = "UPDATE teacher_details SET"
    + " status = 0"
    + " WHERE teacher_details_id = ?";
    await connection.query(query,[req.params.id] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"teacher_details deleted"});
      }
  
    })
})

module.exports = router;
