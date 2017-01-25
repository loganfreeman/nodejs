(1,eval)('this') vs eval('this') in JavaScript?
---
- [global scope](http://stackoverflow.com/questions/9107240/1-evalthis-vs-evalthis-in-javascript)

the Ecma spec considers a reference to eval to be a "direct eval call", but an expression that merely yields eval to be an indirect one -- and indirect eval calls are guaranteed to execute in global scope.

```js
var x = 'outer';
(function() {
  var x = 'inner';
  eval('console.log("direct call: " + x)'); 
  (1,eval)('console.log("indirect call: " + x)'); 
})();
```


global.js
```js
var g;

// This works in non-strict mode
g = (function() { return this; })();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;
```
