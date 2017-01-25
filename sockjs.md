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
