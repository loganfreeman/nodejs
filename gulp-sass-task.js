// --------------------------
// SASS (libsass)
// --------------------------
tasks.sass = function() {
  return gulp.src(sourcePaths.stylesheets + '*.scss')
    // sourcemaps + sass + error handling
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(bulkSass())
    .pipe(sass({
      importer: moduleImporter(),
      sourceComments: !production,
      outputStyle: production ? 'compressed' : 'nested'
    }))
    .on('error', handleError('SASS'))
    // generate .maps
    .pipe(gulpif(!production, sourcemaps.write({
      includeContent: false,
      sourceRoot: '.'
    })))
    // autoprefixer
    .pipe(gulpif(!production, sourcemaps.init({
      loadMaps: true
    })))
   .pipe(autoprefixer({
          browsers: ['last 2 versions'],
    }))
    /* We don't serve the source files
     * so include scss content inside the sourcemaps. */
    .pipe(sourcemaps.write({
      includeContent: true
    }))
    .pipe(gulp.dest(buildPath + 'css/'))
    .pipe(browserSync.reload({stream: true}));
};
