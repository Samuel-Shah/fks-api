var mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'fks-primary.c4oeytfgtzvr.ap-south-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'fksprimarypassword',
    database: 'fksprimary',
    timeout: 600000
});


module.exports= connection;