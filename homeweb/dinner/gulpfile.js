var gulp = require('gulp');
gulp.task('default', function() {

  gulp.src([
    'node_modules/vue/dist/vue.js',
    'node_modules/vue/dist/vue.min.js',
    'node_modules/vue-resource/dist/vue-resource.js',
    'node_modules/vue-resource/dist/vue-resource.min.js'
  ]).pipe(gulp.dest('./static/dinner/vendor/vue/'));

});