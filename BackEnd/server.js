const express = require('express') //importing express packages
const app = express() //creating a express instance 
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const fs = require('fs')


app.use(bodyParser.urlencoded({
	extended: false
})) //middleware to parse data from request 

app.use(express.static('/home/pi/Desktop/Portfolio/FrontEnd/')) //serves all the files in sign_up directory

app.use(morgan('short')) //use morgan to log request from/to server

///////////////////////
const router = require('./routes/user.js') //create a route instance for chained handlers 
const login_router = require('./routes/login.js')


app.use(router) //using the user.js router
app.use(login_router)
//////////////////////////////////////

app.get("/", (req, res) => { //specified a routing function
	console.log("Responding to root route ")
})

app.post("/signup_page/sign_up.html", (req, res) => {
	res.sendFile("/home/pi/Desktop/Portfolio/FrontEnd/signup_page/sign_up.html");
	res.end();
})

app.post("/Data/first_classifier.py", (req, res) => {
	res.download("home/pi/Desktop/Portfolio/Data/first_classifier.py");
	res.end();
})
app.listen(8080, () => {
	var localhost;
	fs.readFile('./localhost.txt','utf8', (err, data) => {
		if(err) {
			throw error;
		}
		localhost = data;
	console.log("Server is up and listening at\nAddress: " + localhost + "Port: 8080")
	})
})
