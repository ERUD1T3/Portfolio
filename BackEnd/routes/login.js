//file to encapsulate the routes to the server
const express = require('express') //importing express packages
const mysql = require('mysql')
const bodyParser = require('body-parser')

const login_router = express.Router()

const pool = mysql.createPool({
    connectionLimit: 10, //serve 10 connection at a time while queuing additional connections`
    host: 'localhost',
    user: 'root',
    password: 'open',
    database: 'mfs_db'
})

function getConnection() {
    return pool;
}

login_router.post('/login', (req, res) => {
    ///res.send("verifying " + req.body.username + " in database");
    console.log("verifying");

    //console.log("First name: " + req.body.username);

    var username = req.body.username;
    var password = req.body.password;
    var check_query = "select * form users where name = ?";
    getConnection().query(check_query, [username], (err, rows, fields) => {
        if (err) {
            console.log("Failed to check user: " + err)
            res.sendStatus(500)
            return
        }
        if (rows.length < 1) {
            console.log("User not present");
            res.send("invalid Username")
        } else {
            console.log("user verified");
            res.send("valid username")
        }
        res.end();
    })
})

module.exports = login_router //exports the router module to other files