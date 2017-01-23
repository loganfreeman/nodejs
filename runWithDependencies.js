function runWithDependencies(compilers, fn, callback) {
	var fulfilledNames = {};
	var remainingCompilers = compilers;

	function isDependencyFulfilled(d) {
		return fulfilledNames[d];
	}

	function getReadyCompilers() {
		var readyCompilers = [];
		var list = remainingCompilers;
		remainingCompilers = [];
		for(var i = 0; i < list.length; i++) {
			var c = list[i];
			var ready = !c.dependencies || c.dependencies.every(isDependencyFulfilled);
			if(ready)
				readyCompilers.push(c);
			else
				remainingCompilers.push(c);
		}
		return readyCompilers;
	}

	function runCompilers(callback) {
		if(remainingCompilers.length === 0) return callback();
		async.map(getReadyCompilers(), function(compiler, callback) {
			fn(compiler, function(err) {
				if(err) return callback(err);
				fulfilledNames[compiler.name] = true;
				runCompilers(callback);
			});
		}, callback);
	}
	runCompilers(callback);
}
