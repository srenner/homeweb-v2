var gulp = require('gulp');

gulp.task('default', function() {

  gulp.src([
    'node_modules/purecss/build/**/*.css',
  ]).pipe(gulp.dest('./static/landing/vendor/purecss/'));

});