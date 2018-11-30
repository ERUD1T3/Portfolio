const express = require('express') //importing express packages
const app = express() //creating a express instance 
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false})) //middleware to parse data from request 
app.use(express.static('/home/pi/Desktop/Portfolio/FrontEnd/signup_page')) //serves all the files in sign_up directory

app.use(morgan('short')) //use morgan to log request from/to server


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

///////////////////////
const router = require('./routes/user.js') //create a route instance for chained handlers 
app.use(router)
//////////////////////////////////////
//
app.post('/user_create', (req, res) =>{
	res.send("added " + req.body.username + " to database");
	console.log("creating new user");
	
	console.log("First name: " + req.body.username);
	
	var username = req.body.username;
	var password = req.body.password;
	var create_user_query = "insert into users (name, password) values (?, ?)"; 
	getConnection().query(create_user_query, [username, password], (err, results, fields) => { 
	if(err) {
		console.log("Failed to insert new user: " + err)
		res.sendStatus(500)
		return
	}	
		console.log("Inserted a new user with id: ", results.insertId);
		res.end();
	})
})

//app.get('/user/:id', (req, res) => {
app.get('/users', (req, res) => {
	console.log('Fetching user with id: ' + req.params.id)
	const connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'open',
		database: 'mfs_db'
	})

	//var query1 = "select * from users where name = ?"; //? is a placeholder for userId
	var query1 = "select * from users";
	var username = req.params.id

	connection.query(query1,(err, rows, fields) => {
		if(err) { //error handling
			console.log("Failed to query for users: " + err)
			res.sendStatus(500) //output internal  server error
			res.end()
			return
		}
		console.log("I think we fetched users succcessfully");
		res.json(rows)
	})
	//res.end()
})

app.get("/", (req, res) => { //specified a routing function
	console.log("Responding to root route ")
	res.send("Hello from ROOOT")
 })

app.get("/user", (req, res) => {
	var user1 = {"firstName": "Alan", "lastName": "Turing"}
	const user2 = {"firstName": "Ada", "lastName": "lovelace"}
	
	res.json([user1, user2])
	//res.send("Nodemon auto updates when I save this file")
})

app.listen(8080, () => {
	console.log("Server is up and listening at localhost:8080")
})
