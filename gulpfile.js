var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('default', ['chai']);

gulp.task('test', function(done) {
  return gulp.src('./tests/serverSpec.js')
         .pipe(mocha({reporter:'nyan'}));
});






