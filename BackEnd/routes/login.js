//file to encapsulate the routes to the server
const express = require('express') //importing express packages
const mysql = require('mysql')
const bodyParser = require('body-parser')
const crypto = require('crypto')

function encrypt(password) {
	var key = crypto.createCipher('aes-128-cbc', 'mypassword');
	var cipher = key.update(password, 'utf8', 'hex')
	cipher += key.final('hex');
	return cipher;
}

function decrypt(cipher) {
	var key = crypto.createDecipher('aes-128-cbc', 'mypassword');
	var password = key.update(cipher, 'hex', 'utf8')
	password += key.update.final('utf8');
	return password;
}

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
    var check_query = "select * from users where name = ? and password = ?";
    getConnection().query(check_query, [username, encrypt(password)], (err, rows, fields) => {
        if (err) {
            console.log("Failed to check user: " + err)
            res.sendStatus(500)
            return
        }
        if (rows.length < 1) {
            console.log("User not present");
            res.sendFile("/home/pi/Desktop/WebPortfolio/FrontEnd/notlog.html")

        } else {
            console.log("user verified");
            res.sendFile("/home/pi/Desktop/WebPortfolio/FrontEnd/loggedin.html")
        }
    })
})

module.exports = login_router //exports the router module to other files