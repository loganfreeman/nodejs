- [code challenge with streams](https://howtonode.org/coding-challenges-with-streams)

stream cache
---
```js
var StreamCache = require('stream-cache');
var fs          = require('fs');

var cache = new StreamCache();
fs.createReadStream(__filename).pipe(cache);

// Cache can now be piped anywhere, even before the readable stream finishes.
cache.pipe(process.stdout);
```
