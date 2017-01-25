To use the library from JavaScript, you’d do the following (example for NodeJS):
```js
var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;

var orig_code = "... JS code here";
var ast = jsp.parse(orig_code); // parse code and get the initial AST
ast = pro.ast_mangle(ast); // get a new AST with mangled names
ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
var final_code = pro.gen_code(ast); // compressed code here
```
