Create a new file src/server.ts
---
```ts
// polyfills have to be first
import 'angular2-universal-polyfills';
import { createEngine, ExpressEngineConfig } from 'angular2-express-engine';
import { MainModule } from './main.node';  // will change depending on your app

// 1. set up Angular Universal to be the rendering engine for Express
app.engine('.html', createEngine({}));

// 2. get the top level NgModule for the app and pass in important values to Angular Universal 
app.get('/*', (req, res) => {

  // Our Universal - express configuration object
  const expressConfig : ExpressEngineConfig = {
    req,
    res,
    ngModule: MainModule,
    preboot: false,
    baseUrl: '/',
    requestUrl: req.originalUrl,
    originUrl: 'http://localhost:3000'
  };

  // NOTE: everything passed in here will be set as properties to the top level Zone
  // access these values in your code like this: Zone.current.get('req');
  // this is temporary; we will have a non-Zone way of getting these soon
  res.render('index', expressConfig);
});
```

src/client.ts
---
```ts
// important for this to be first in your client.ts file so polyfills can be properly applied
import 'angular2-universal-polyfills';
import { platformUniversalDynamic } from 'angular2-universal';
import { MainModule } from './main.browser';  // this will change depending on your app

const platformRef = platformUniversalDynamic();

// bootstrap returns promise if you want to do something after complete
platformRef.bootstrapModule(MainModule);
```
MainModule
---
```ts
import { UniversalModule } from 'angular2-universal';
@NgModule({
  imports: [
    UniversalModule // includes stuff like the universal HttpModule; must be first import
    // other imports here
  ]
})
export class MainModule {

}
```
