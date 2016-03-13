var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('build', function() {
  var tsResult = gulp.src('app/**/*.ts')
    .pipe(ts({
        noImplicitAny: true,
        suppressImplicitAnyIndexErrors: true,
        outFile:"app.js"
      }));
      
      return tsResult.js.pipe(gulp.dest('app'));
});
 
gulp.task('watch', function () {
  gulp.watch('app/*.ts', ['build']);
});