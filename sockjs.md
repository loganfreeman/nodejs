net.connect(options[, connectListener])
---
A factory function, which returns a new `net.Socket` and automatically connects with the supplied options.

The options are passed to both the `net.Socket` constructor and the `socket.connect` method.

The connectListener parameter will be added as a listener for the 'connect' event once.
```js
function connectToDaemon(socket_path, cbs){
  var socket = net.connect(socket_path, cbs.ready);
  json_socket.listen(socket, cbs.event);
  return socket;
}
```

webpack-dev-server
---
```js
// delegate listen call and init sockjs
Server.prototype.listen = function() {
	this.listeningApp.listen.apply(this.listeningApp, arguments);
	var sockServer = sockjs.createServer({
		// Limit useless logs
		log: function(severity, line) {
			if(severity === "error") {
				console.log(line);
			}
		}
	});
	sockServer.on("connection", function(conn) {
		this.sockets.push(conn);

		// Remove the connection when it's closed
		conn.on("close", function() {
			var connIndex = this.sockets.indexOf(conn);
			if(connIndex >= 0) {
				this.sockets.splice(connIndex, 1);
			}
		}.bind(this));

		if(this.hot) this.sockWrite([conn], "hot");
		if(!this._stats) return;
		this._sendStats([conn], this._stats.toJson(), true);
	}.bind(this));

	sockServer.installHandlers(this.listeningApp, {
		prefix: '/sockjs-node'
	});
}
```
Echo server
---
```js
var http = require('http');
var sockjs = require('sockjs');
var node_static = require('node-static');

// 1. Echo sockjs server
var sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};

var sockjs_echo = sockjs.createServer(sockjs_opts);
sockjs_echo.on('connection', function(conn) {
    conn.on('data', function(message) {
        conn.write(message);
    });
});

// 2. Static files server
var static_directory = new node_static.Server(__dirname);

// 3. Usual http stuff
var server = http.createServer();
server.addListener('request', function(req, res) {
    static_directory.serve(req, res);
});
server.addListener('upgrade', function(req,res){
    res.end();
});

sockjs_echo.installHandlers(server, {prefix:'/echo'});

console.log(' [*] Listening on 0.0.0.0:9999' );
server.listen(9999, '0.0.0.0');
```
