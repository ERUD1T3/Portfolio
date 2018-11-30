//file to encapsulate the routes to the server

const express = require('express')

const router = express.Router()
router.get('/messages', (req, res) => {
	console.log("Messages")
	res.end()
})

module.exports = router //exports the router module to other files
