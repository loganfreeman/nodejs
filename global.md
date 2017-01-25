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

strict mode
---
For a normal function, this is always an object: either the provided object if called with an object-valued this; the value, boxed, if called with a Boolean, string, or number; or the global object if called with an undefined or null.

Not only is automatic boxing a performance cost, but exposing the global object in browsers is a security hazard, because the global object provides access to functionality that "secure" JavaScript environments must restrict. Thus for a strict mode function, the specified this is not boxed into an object, and if unspecified, this will be undefined:

```js
"use strict";
function fun() { return this; }
console.assert(fun() === undefined);
console.assert(fun.call(2) === 2);
console.assert(fun.apply(null) === null);
console.assert(fun.call(undefined) === undefined);
console.assert(fun.bind(true)() === true);
```

strict mode makes it impossible to accidentally create global variables.
Assignments which would accidentally create global variables instead throw in strict mode:
```js
"use strict";
                       // Assuming a global variable mistypedVariable exists
mistypedVariable = 17; // this line throws a ReferenceError due to the 
                       // misspelling of variable
```
Any assignment that silently fails in normal code (assignment to a non-writable property, assignment to a getter-only property, assignment to a new property on a non-extensible object) will throw in strict mode:
```js
"use strict";

// Assignment to a non-writable property
var obj1 = {};
Object.defineProperty(obj1, "x", { value: 42, writable: false });
obj1.x = 9; // throws a TypeError

// Assignment to a getter-only property
var obj2 = { get x() { return 17; } };
obj2.x = 5; // throws a TypeError

// Assignment to a new property on a non-extensible object
var fixed = {};
Object.preventExtensions(fixed);
fixed.newProp = "ohai"; // throws a TypeError
```
Third, strict mode makes attempts to delete undeletable properties throw (where before the attempt would simply have no effect):
```js
"use strict";
delete Object.prototype; // throws a TypeError
```
