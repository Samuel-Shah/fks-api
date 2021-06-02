var express = require('express');
var router = express.Router();
var connection = require('../helper/db-connection')

//add mcq_options
router.post('/add', async function (req, res) {
  var mcq_options_title = req.body.mcq_options_title;
  var mcq_questions_id = req.body.mcq_questions_id;
  var value = req.body.value;
  var status = req.body.status;
 
  var query = `INSERT INTO mcq_options (mcq_options_name, mcq_questions_id, status) VALUES (?, ?)`;
  await connection.query(query, [mcq_options_title, mcq_questions_id, value, status], function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json({message:"mcq_question created"});
    }

  })

});


//get all mcq_optionss
router.get('/', function (req, res) {
  var query = `SELECT * FROM mcq_options`;
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }
  })
});


//get mcq_options by id
router.get('/id/:id', async function (req, res) {
  var mcq_options_id = req.params.id
  var query = `SELECT * FROM mcq_options WHERE mcq_options_id=${mcq_options_id}`
  await connection.query(query,  function (err, rs, fields) {
    if (err)
      console.log(err)
    else {
      res.status(200).json(rs);
    }

  })
})

//update mcq_options by id
router.patch('/id/:id/update', function (req, res) {
    var mcq_options_name = req.body.mcq_options_name;
    var mcq_questions_id = req.body.mcq_questions_id;
    var value = req.body.value;
    var status = req.body.status;
   
  var query = "UPDATE mcq_options SET"
    + "mcq_options_name = ?, mcq_questions_id=?, value=?, status=?"
    + " WHERE mcq_options_id = ?";
    await connection.query(query,[mcq_options_name, mcq_questions_id, value, status, req.params.id ] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"mcq_options Updated"});
      }
  
    })
})

//delete mcq_options by id
router.delete('/id/:id/delete', function (req, res) {
  var query = "UPDATE mcq_options SET"
    + " status = 0"
    + " WHERE mcq_options_id = ?";
    await connection.query(query,[req.params.id] ,function (err, rs, fields) {
      if (err)
        console.log(err)
      else {
        res.status(200).json({message:"mcq_options deleted"});
      }
  
    })
})

module.exports = router;
