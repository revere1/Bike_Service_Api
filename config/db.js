const mysql = require('mysql');

var db = mysql.createConnection({
    multipleStatements:true,
    host: 'localhost',
    user: 'scope',
    password: 'scope@123',
    database: 'scope',
    dateStrings:true
});

module.exports = db;