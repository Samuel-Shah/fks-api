var express = require('express');
var router = express.Router();
var connection = require('../helper/db-connection')

//add subject
router.post('/add', async function (req, res) {
  try {
  var subject_name = req.body.subject_name;
  // var subject_type_id = req.body.subject_type_id;
  // var class_id = req.body.class_id;
  // var subject_teacher_id = req.body.subject_teacher_id;
  var status = req.body.status;
  var query = `INSERT INTO subject (subject_name, status) VALUES (?, 1)`;
  await connection.query(query, [subject_name], function (err, rs, fields) {
    if (err) {
      console.log(err);
      res.status(400).json({message:"ERROR: BAD REQUEST"});
    } else {
      res.status(200).json({message:"subject created"});
    }
  })
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
});


//get all subjects
router.get('/', async function (req, res) {
  try {
  var query = `SELECT * FROM subject`;
  await connection.query(query,  function (err, rs, fields) {
    if (err) {
      console.log(err);
      res.status(400).json({message:"ERROR: BAD REQUEST"});
    } else {
      res.status(200).json(rs)
    }
  })
} catch (error) {
  res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
}
});


//get subject by id
router.get('/id/:id', async function (req, res) {
  try {
  var subject_id = req.params.id
  var query = `SELECT * FROM subject WHERE subject_id=${subject_id}`
  await connection.query(query,  function (err, rs, fields) {
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
})

//update subject by id
router.patch('/id/:id/update', async function (req, res) {
  try {
    var subject_name = req.body.subject_name;
    var subject_type_id = req.body.subject_type_id;
    var class_id = req.body.class_id;
    var subject_teacher_id = req.body.subject_teacher_id;
    var status = req.body.status;
   
  var query = "UPDATE subject SET"
    + "subject_name = ?, subject_type_id=?, class_id=?, subject_teacher_id=?, status=?"
    + " WHERE subject_id = ?";
    await connection.query(query,[subject_name, subject_type_id, class_id, subject_teacher_id, status, req.params.id ] ,function (err, rs, fields) {
      if (err) {
        console.log(err);
        res.status(400).json({message:"ERROR: BAD REQUEST"});
      } else {
        res.status(200).json({message:"subject Updated"});
      }
  
    })
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
})

//delete subject by id
router.delete('/id/:id/disable', async function (req, res) {
  try { 
  var query = "UPDATE subject SET"
    + " status = 0"
    + " WHERE subject_id = ?";
    await connection.query(query,[req.params.id] ,function (err, rs, fields) {
      if (err) {
        console.log(err);
        res.status(400).json({message:"ERROR: BAD REQUEST"});
      } else {
        res.status(200).json({message:"subject deleted"});
      }
    })
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
})

//delete user by id (permanent deletion)
router.delete('/id/:id/permanent_delete', async function (req, res) {
  try {
    var query = "DELETE FROM subject WHERE subject_id = ?";
      await connection.query(query,[req.params.id] ,function (err, rs, fields) {
        if (err) {
          console.log(err);
          res.status(400).json({message:"ERROR: BAD REQUEST"});
        } else {
          res.status(200).json({message:"subject permanently Deleted"});
        }
    
      })
    } catch (error) {
      res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
    }
  })

module.exports = router;
