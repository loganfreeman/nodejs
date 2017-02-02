copy properties from one object to another
---
```javascript
for (var i = 1, l = arguments.length; i < l; i++) {
    Object.assign(ReactCanvasComponent.prototype, arguments[i]);
  }
```

[mixwith](https://github.com/justinfagnani/mixwith.js)
---
mixin application
```js
let MyMixin = (superclass) => class extends superclass {
  // mixin methods here
};

// my-class.js

class MyClass extends MyMixin(MySuperClass) {
  // class methods here, go ahead, use super!
}
```
