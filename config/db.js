const mysql = require('mysql');

var db = mysql.createConnection({
    multipleStatements:true,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'scope',
    dateStrings:true
});

module.exports = db;