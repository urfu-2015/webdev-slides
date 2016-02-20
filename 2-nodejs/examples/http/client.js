const http = require('http');

const req = http.request({
	hostname: 'localhost',
	port: 8080
});

req.on('response', function (response) {
	var str = ''

	response.on('data', function (chunk) {
		str += chunk;
	});

	response.on('end', function () {
		console.log(str);
	});
});

req.end();
