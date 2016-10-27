function extractFrontMatter(options) {
  let files = [];
  let site = assign({demos: []}, options);
  return through.obj(
    function transform(file, enc, done) {
      let contents = file.contents.toString();
      let yaml = frontMatter(contents);

      if (yaml.attributes) {
        let slug = path.basename(file.path, path.extname(file.path));
        let permalink = site.baseUrl +
            (slug == 'index' ? '' : 'demos/' + slug + '/');

        file.contents = new Buffer(yaml.body);
        file.data = {
          site: site,
          page: assign({
            slug: slug,
            permalink: permalink
          }, yaml.attributes)
        };

        if (file.path.indexOf('demos') > -1) {
          site.demos.push(file.data.page);
        }
      }

      files.push(file);
      done();
    },
    function flush(done) {
      files.forEach(function(file) { this.push(file); }.bind(this));
      done();
    }
  );
}
