const express = require('express') //importing express packages
const app = express() //creating a express instance 
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
	extended: false
})) //middleware to parse data from request 

app.use(express.static('/home/pi/Desktop/Portfolio/FrontEnd/')) //serves all the files in sign_up directory

app.use(morgan('short')) //use morgan to log request from/to server

///////////////////////
const router = require('./routes/user.js') //create a route instance for chained handlers 

app.use(router) //using the user.js router
//////////////////////////////////////

app.get("/", (req, res) => { //specified a routing function
	console.log("Responding to root route ")
})

app.listen(8080, () => {
	console.log("Server is up and listening at localhost:8080")
})