## The `Symbol.hasInstance` well-known symbol is used to determine if a constructor object recognizes an object as its instance. 
The `instanceof` operator's behavior can be customized by this symbol.

```js
class MyArray {  
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}
console.log([] instanceof MyArray); // true
```
