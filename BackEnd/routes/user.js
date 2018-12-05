//file to encapsulate the routes to the server
const express = require('express') //importing express packages
const app = express() //creating a express instance 
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const router = express.Router()

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

router.get('/messages', (req, res) => {
	console.log("Messages")
	res.end()
})


router.post('/user_create', (req, res) => {
	console.log("added " + req.body.username + " to database");
	res.sendFile("/home/pi/Desktop/Portfolio/FrontEnd/login_page/loggedin.html")
	//console.log("creating new user");

	//console.log("First name: " + req.body.username);

	var username = req.body.username;
	var password = req.body.password;
	var create_user_query = "insert into users (name, password) values (?, ?)";
	getConnection().query(create_user_query, [username, password], (err, results, fields) => {
		if (err) {
			console.log("Failed to insert new user: " + err)
			res.sendStatus(500)
			return
		}
		console.log("Inserted a new user with id: ", results.insertId);
		res.end();
	})
})

router.get('/users', (req, res) => {

	console.log('Fetching user with id: ' + req.params.id)
	/*
	const connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'open',
		database: 'mfs_db'
	})
	*/

	//var query1 = "select * from users where name = ?"; //? is a placeholder for userId
	var query1 = "select * from users";
	var username = req.params.id

	getConnection().query(query1, (err, rows, fields) => {
		if (err) { //error handling
			console.log("Failed to query for users: " + err)
			res.sendStatus(500) //output internal  server error
			res.end()
			return
		}
		console.log("User fetched succcessfully");
		res.json(rows)
	})
})

router.get('/users/:id', (req, res) => {
	const query = "select * from users where id = ?";
	getConnection().query(query, [req.params.id], (err, rows, fields) => {
		if (err) { //error handling
			console.log("Failed to query user: " + req.params.id + " error: " + err)
			res.sendStatus(500) //output internal  server error
			res.end()
			return
		}
		console.log("User " + req.params.id + " successfully fetched")
		res.json(rows)
	})
})


module.exports = router //exports the router module to other files