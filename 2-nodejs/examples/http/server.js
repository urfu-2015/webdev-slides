const inspect = require('util').inspect;
const http = require('http');

const server = new http.Server();

server.listen(8080);

server.on('request', function (req, res) {
	const method = req.method;
	const headers = req.headers;
	const url = req.url;

	console.log(`Method: ${inspect(method, { colors: true })}\n`);
    console.log(`Headers:\n ${inspect(headers, { colors: true })}\n`);
	console.log(`URL: ${inspect(url, { colors: true })}\n`);

	res.setHeader('content-type', 'text/html');
	res.write('<strong>Hello!</strong>');
    res.end();
});
