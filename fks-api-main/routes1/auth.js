var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var connection = require('../helper/db-connection')

//middleware
const verifyToken = require("../middleware/verify-token");

router.post("/login", async function (req, res) {
    try {
        
     var query= `SELECT * from users where email =${req.body.email} `

     var user = await connection.query(query, async function(re,err,fields){
        if(err){
            res.status(400).json({
                message: "failed",
                additional_info: "User does not exist"
            });
        }
        else if(await bcrypt.compare(req.body.password, user.password)){
            jwt.sign(
                { user_id: user.user_id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1d" },
                (err, token) => {
                    if (err) {
                        res.status(403).json(err);
                    } else {
                        res.status(200).json({ token: token, user_id: user.user_id, first_name: user.first_name, last_name: user.last_name, email:user.email, mobile: user.mobile, role_id: user.role_id });
                    }
                }
            );
        }
        else{
            res.status(403).json({
                message: "failed",
                additional_info: "invalid email or password"
            });
        }
     })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
})

router.post("/check", verifyToken, async function (req, res) {
    if (!req.auth) {
        res.status(403).json({ error: err });
    } else {
        res
            .status(200)
            .json({ message: "success", additional_info: "the authToken is valid" });
    }
});

module.exports = router;
