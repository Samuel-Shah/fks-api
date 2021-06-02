const connection = require('./db-connection')

checkConnection();

function checkConnection() {
    connection.connect(function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log("CONNECTION ESTABLISHED");
        }
    });
}

module.exports=checkConnection;