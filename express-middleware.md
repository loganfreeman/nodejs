connect-history-api-fallback
---
This tiny middleware addresses some of the issues. Specifically, it will change the requested location to the index you specify (default being /index.html) whenever there is a request which fulfills the following criteria:

The request is a GET request
which accepts text/html,
is not a direct file request, i.e. the requested path does not contain a . (DOT) character and
does not match a pattern provided in options.rewrites (see options below)
```js
history({
  rewrites: [
    {
      from: /^\/libs\/.*$/,
      to: function(context) {
        return '/bower_components' + context.parsedUrl.pathname;
      }
    }
  ]
});
```
