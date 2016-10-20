/*
 * GH pages deploy
 * --------------- */

gulp.task('gh-pages', function() {
  return gulp.src(buildPath + '**/*')
    .pipe(deploy({
      prefix: 'dist',
      repository: 'github_repo_url',
      remoteBranch: ['gh-pages']
    }));
});

gulp.task('deploy', function(cb) {
  return runSequence(
    'build',
    'gh-pages',
  cb);
});
