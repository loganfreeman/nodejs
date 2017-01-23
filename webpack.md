compile
---
```js
Compiler.prototype.compile = function(callback) {
	var self = this;
	var params = self.newCompilationParams();
	self.applyPluginsAsync("before-compile", params, function(err) {
		if(err) return callback(err);

		self.applyPlugins("compile", params);

		var compilation = self.newCompilation(params);

		self.applyPluginsParallel("make", compilation, function(err) {
			if(err) return callback(err);

			compilation.finish();

			compilation.seal(function(err) {
				if(err) return callback(err);

				self.applyPluginsAsync("after-compile", compilation, function(err) {
					if(err) return callback(err);

					return callback(null, compilation);
				});
			});
		});
	});
};
```
