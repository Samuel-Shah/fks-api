var express = require('express');
var router = express.Router();
var connection = require('../helper/db-connection')

//add user
router.post('/add', async function (req, res) {
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var mobile = req.body.mobile;
  var email = req.body.email;
  var password = req.body.password;
  var created_by = req.body.created_by;
  var updated_by = req.body.updated_by;
  var created_date = req.body.created_date;
  var updated_date = req.body.updated_date;
  var deleted_date = req.body.deleted_date;
  var role_id = req.body.role_id;
  var status = req.body.status;
  var sql = `INSERT INTO user (first_name, last_name, mobile, email, password, created_by, updated_by, deleted_by, created_date, role_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  await connection.query(sql, [first_name, last_name, mobile, password, created_by, updated_by, deleted_by, created_date, updated_date, deleted_date, role_id, status ], function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json({message:"user created"});
    }

  })

});


//get all users
router.get('/', function (req, res) {
  var query = `SELECT * FROM user`;
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }

  })
});


//get user by id
router.get('/id/:id', async function (req, res) {
  var user_id = req.params.id
  var query = `SELECT * FROM user WHERE user_id=${user_id}`
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }

  })
})

//update user by id
router.patch('/id/:id/update', function (req, res) {
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var mobile = req.body.mobile;
  var email = req.body.email;
  var password = req.body.password;
  var created_by = req.body.created_by;
  var updated_by = req.body.updated_by;
  var updated_date = req.body.updated_date;
  var role_id = req.body.role_id;
  var status = req.body.status;
  var query = "UPDATE user SET"
    + " first_name = ?, last_name = ?, mobile = ?, email = ?, password = ?,"
    + " updated_by = ?, updated_date = ?, deleted_by = '--'"
    + " role_id = ?"
    + " WHERE user_id = ?";
    await connection.query(sql,[first_name, last_name, mobile, email, password, updated_by, updated_date, role_id,  req.params.id  ] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"USER Updated"});
      }
  
    })
})

//delete user by id
router.delete('/id/:id/delete', function (req, res) {
  var query = "UPDATE user SET"
    + " status = 0"
    + " WHERE user_id = ?";
    await connection.query(sql,[req.params.id] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"USER Deleted"});
      }
  
    })
})

module.exports = router;
