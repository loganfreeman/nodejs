function convertImport(src) {
  console.log('Reading:', src);
  const html = fs.readFileSync(src);
  let dest = src.replace(/\.html$/, '.js');
  dest = dest.replace(INITIAL_IMPORT, 'index');

  jsdom.env({
    html: html,
    done: function(err, window) {
      if (err) {
        throw err;
      }

      const imports = window.document.querySelectorAll('link[rel="import"]');
      const scripts = window.document.querySelectorAll('script');
      let scriptsContent = '';
      scriptsContent += addUseStrictDirective();
      scriptsContent += convertLicenseComments(html);

      // traverse and rewrite the imports
      for (var i = 0; i < imports.length; i++) {
        const importPath = importToPath(imports[i]);
        scriptsContent += importToRequire(importPath, dest);

        // Recursively process each import.
        if (paths[importPath]) {
          continue;
        }
        paths[importPath] = true;
        convertImport(importPath);
      }

      // adjust the javascript
      for (let s = 0; s < scripts.length; s++) {
        scriptsContent += rewriteGlobals(scripts[s]);
      }

      // node4 compat
      scriptsContent = polyfillNode4Support(dest, scriptsContent);
      // browser compat
      scriptsContent = adjustForBrowserCompat(scriptsContent);

      writeNewFile(dest, scriptsContent);

      function convertLicenseComments(html) {
        const license = /<!--(.*\n)+-->/im;
        const licenseContent = license.exec(html);
        if (licenseContent) {
          return licenseContent[0]
            .replace(/<!--/g, '/**')
            .replace(/-->/g, '**/\n\n');
        }

        return '';
      }

      function importToPath(importElem) {
        let importPath = importElem.getAttribute('href');
        importPath = importPath.replace(/^\//, './third_party/src/catapult/tracing/');

        return importPath;
      }

      function importToRequire(importPath, dest) {
        const from = path.dirname(dest);
        const to = importPath.replace(/html$/, 'js');
        let relativePath = path.relative(from, to);

        if (relativePath[0] !== '.') {
          relativePath = './' + relativePath;
        }

        relativePath = relativePath.replace('./third_party/src/catapult/tracing/tracing', '.');
        return 'require("' + relativePath + '");\n';
      }

      function rewriteGlobals(script) {
        script = script.textContent;

        script = script.replace(/tr\.exportTo/, 'global.tr.exportTo');
        script = script.replace(/var global = this;/, '');
        script = script.replace(/this.tr =/, 'global.tr =');
        script = script.replace(/\(function\(global\)\s?\{/, '(function() {');
        return script;
      }

      // the "use strict" must be found *above* the require() statements
      function addUseStrictDirective() {
        return '"use strict";\n';
      }

      // adjust and transpile for usage in node 4+
      function polyfillNode4Support(dest, scriptsContent) {
        let transformed = scriptsContent;
        if (dest.endsWith('/slice.js')) {
          // no babel plugin that can transpile `new.target`, so this is done manually
          transformed = transformed.replace('if (new.target)', 'if (!(this instanceof Slice))');
        }
        transformed = babel.transform(transformed, {
          plugins: ['transform-es2015-destructuring']
        }).code;
        return transformed;
      }

      function adjustForBrowserCompat(scriptsContent) {
        return scriptsContent
            // early exit in tracing/base.ui and avoid currentScript from breaking us.
            .replace('var THIS_DOC = document.currentScript.ownerDocument;', 'return;');
      }

      function writeNewFile(dest, scriptsContent) {
        dest = dest.replace('./third_party/src/catapult/tracing/tracing/', '');
        dest = path.resolve('./third_party/traceviewer-js/' + dest);

        const destFolder = path.dirname(dest);
        mkdirp(destFolder, function(err) {
          if (err) {
            throw new Error(`Failed to create folder: ${destFolder}`);
          }

          console.log('Writing:', dest);
          fs.writeFile(dest, scriptsContent, 'utf8');
        });
      }
    }
  });
}
