gulp.task('css', function() {
  return gulp.src('./assets/css/main.css')
      .pipe(plumber({errorHandler: streamError}))
      .pipe(cssnext({
        browsers: '> 1%, last 2 versions, Safari > 5, ie > 9, Firefox ESR',
        compress: true,
        url: false
      }))
      .pipe(gulp.dest(DEST));
});
