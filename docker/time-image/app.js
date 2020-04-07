const http = require('http');
const os = require('os');

console.log("Time server starting...");

var handler = function(request, response) {
  console.log("Received request from " + request.connection.remoteAddress);
  var result = { time: new Date(), 
	hostAddress: os.networkInterfaces().eth0[0].address, 
	host: os.hostname() 
	};
  response.setHeader('Content-Type', 'application/json');
  response.writeHead(200);
  response.end(JSON.stringify(result, null, 3));
}

var www = http.createServer(handler);

process.on('SIGTERM', function () {
  console.log("Received SIGTERM. Shutting down.");
  www.close(function () {
    console.log("HTTP server has shut down. Process exiting.");
    process.exit(0);
  });
});

www.listen(8080);

