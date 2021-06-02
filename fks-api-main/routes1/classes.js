var express = require('express');
var router = express.Router();
var connection = require('../helper/db-connection')

//add class
router.post('/add', async function (req, res) {
  try {
  var class_name = req.body.class_name;
  var class_teacher_id = req.body.class_teacher_id;
  var status = req.body.status;
 
  var query = `INSERT INTO class (class_name, class_teacher_id) VALUES (?, ?)`;
  await connection.query(query, [class_name, class_teacher_id], function (err, rs, fields) {
    if (err) {
      console.log(err);
      res.status(400).json({message:"ERROR: BAD REQUEST"});
    } else {
      res.status(200).json({message:"class created"});
    }
  });
  } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
});


//get all classs
router.get('/', async function (req, res) {
  try {
  var query = `SELECT * FROM class`;
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
});


//get class by id
router.get('/id/:id', async function (req, res) {
  try {
  var class_id = req.params.id
  var query = `SELECT * FROM class WHERE class_id=${class_id}`
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

//update class by id
router.patch('/id/:id/update', async function (req, res) {
  try {
 var class_name = req.body.class_name;
 var class_teacher_id = req.body.class_teacher_id;
 var status = req.body.status;
  var query = "UPDATE class SET"
    + "class_name = ?, class_teacher_id=?"
    + " WHERE class_id = ?";
    await connection.query(query,[class_name, class_teacher_id, req.params.id  ] ,function (err, rs, fields) {
      if (err) {
        console.log(err);
        res.status(400).json({message:"ERROR: BAD REQUEST"});
      } else {
        res.status(200).json({message:"class Updated"});
      }
  
    })
    } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
})

//delete class by id
router.delete('/id/:id/disable', async function (req, res) {
  try {
  var query = "UPDATE class SET"
    + " status = 0"
    + " WHERE class_id = ?";
    await connection.query(query,[req.params.id] ,function (err, rs, fields) {
      if (err) {
        console.log(err);
        res.status(400).json({message:"ERROR: BAD REQUEST"});
      } else {
        res.status(200).json({message:"class deleted"});
      }
  
    })
    } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
})

    //delete user by id (permanent deletion)
    router.delete('/id/:id/permanent_delete', async function (req, res) {
  try {
        var query = "DELETE FROM class WHERE class_id = ?";
          await connection.query(query,[req.params.id] ,function (err, rs, fields) {
            if (err) {
        console.log(err);
        res.status(400).json({message:"ERROR: BAD REQUEST"});
      } else {
              res.status(200).json({message:"class permanently Deleted"});
            }
        
          })
          } catch (error) {
    res.status(500).json({message:"ERROR: INTERNAL SERVER ERROR"});
  }
      })

module.exports = router;
