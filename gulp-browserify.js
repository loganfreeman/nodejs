gulp.task('javascript', ['lint'], function() {
  return browserify('./assets/javascript/main.js', {debug: true})
      .transform(babelify)
      .bundle()
      .on('error', streamError)
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(gulpIf(isProd(), uglify()))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(DEST));
});
