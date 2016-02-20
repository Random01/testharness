var restify = require('restify'),
	httpProxy = require('http-proxy');

var config = {
	proxyPort: 8103,
	serverPort: 8104
};

httpProxy.createServer({
	router: {
		'.*': '127.0.0.1:' + config.serverPort
	}
}).listen(config.proxyPort, function () {
	console.log('server listening at %s', config.proxyPort);
});

var server = restify.createServer();
// for serving static file
server.get(/^\/.*/, restify.serveStatic({
	directory: './public/',
	default: '/index.html'
}))

server.listen(config.serverPort);
