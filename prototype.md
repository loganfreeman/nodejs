The `__proto__` property of Object.prototype is an accessor property (a getter function and a setter function) that exposes the internal `[[Prototype]]` (either an object or null) of the object through which it is accessed.

The use of `__proto__` is controversial, and has been discouraged. It was never originally included in the EcmaScript language spec, but modern browsers decided to implement it anyway. Only recently, the `__proto__` property has been standardized in the ECMAScript 2015 language specification for web browsers to ensure compatibility, so will be supported into the future. It is deprecated in favor of `Object.getPrototypeOf/Reflect.getPrototypeOf` and `Object.setPrototypeOf/Reflect.setPrototypeOf` (though still, setting the [[Prototype]] of an object is a slow operation that should be avoided if performance is a concern).

The `__proto__` property can also be used in an object literal definition to set the object `[[Prototype]]` on creation, as an alternative to `Object.create()`. See: object initializer / literal syntax.