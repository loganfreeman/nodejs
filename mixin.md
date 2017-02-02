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
wrap
```js
const _wrappedMixin = '__mixwith_wrappedMixin';

  const wrap = exports.wrap = (mixin, wrapper) => {
    Object.setPrototypeOf(wrapper, mixin);
    if (!mixin[_wrappedMixin]) {
      mixin[_wrappedMixin] = mixin;
    }
    return wrapper;
  };
const unwrap = exports.unwrap = wrapper => wrapper[_wrappedMixin] || wrapper;
```
