Plugins
---
- [how to write a plugin](https://github.com/webpack/docs/wiki/how-to-write-a-plugin)
- [list of plugins](https://github.com/webpack/docs/wiki/list-of-plugins)

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
Parser
---
```js
Parser.prototype.evaluate = function evaluate(source) {
	var ast = acorn.parse("(" + source + ")", {
		ranges: true,
		locations: true,
		ecmaVersion: 6,
		sourceType: "module"
	});
	if(!ast || typeof ast !== "object" || ast.type !== "Program")
		throw new Error("evaluate: Source couldn't be parsed");
	if(ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement")
		throw new Error("evaluate: Source is not a expression");
	return this.evaluateExpression(ast.body[0].expression);
};
```
