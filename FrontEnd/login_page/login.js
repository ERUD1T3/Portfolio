//file to encapsulate the routes to the server
const express = require('express') //importing express packages
const app = express() //creating a express instance 
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')