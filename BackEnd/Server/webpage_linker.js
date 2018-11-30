var http = require('http'),
    fs = require('fs');
const hostname = '192.168.43.10'
const port = 8080 

fs.readFile('./test_webpage.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(port, hostname, () => {
  		console.log('Server running at http://${hostname}:${port}/');
	});
});
