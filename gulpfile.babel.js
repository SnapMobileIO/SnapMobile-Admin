'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import ngHtml2Js from 'gulp-ng-html2js';

function handleError(error) {
  gutil.log(gutil.colors.magenta(error.message));
  if (error.stack) { gutil.log(gutil.colors.cyan(error.stack)); }
  process.exit(1);
}

gulp.task('babel', function() {
  return gulp.src(['./src/admin/*.js'])
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('./dist/admin'))
    .on('error', handleError);
});

gulp.task('htmlify', function() {
  return gulp.src("./src/admin/views/*.html")
    .pipe(ngHtml2Js({
      moduleName: "adminApp",
      prefix: "app/admin/views/"
    }))
    .pipe(gulp.dest("./dist/admin/views"))
    .on('error', handleError);
});

gulp.task('dist', ['babel', 'htmlify']);