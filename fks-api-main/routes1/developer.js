var express = require('express');
var router = express.Router();
var connection = require('../helper/db-connection');

//add roles
router.post('/role/add', async function (req, res) {
  try {
    var query = "INSERT INTO role (role_name) VALUES (?)";
    await connection.query(query, [req.body.role_name], function (err, rs, fields) {
      if (err) {
        console.log(err);
        res.status(400).json({message:"ERROR: BAD REQUEST"});
      } else {
        res.status(200).json(rs);
      }
    })
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
});

//add roles
router.get('/role/getAll', async function (req, res) {
  try {
    var query = "SELECT * FROM role";
    await connection.query(query, function (err, rs, fields) {
      if (err) {
        console.log(err);
        res.status(400).json({message:"ERROR: BAD REQUEST"});
      } else {
        res.status(200).json(rs);
      }
    });
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
});

//add roles
router.get('/role/update', async function (req, res) {
  try {
    var query = "UPDATE role SET role_name = 'student' where role_id = 6";
    await connection.query(query, function (err, rs, fields) {
      if (err) {
        console.log(err);
        res.status(400).json({message:"ERROR: BAD REQUEST"});
      } else {
        res.status(200).json(rs);
      }
    });
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
});
module.exports = router;