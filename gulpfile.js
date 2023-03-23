const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const cssModulesify = require('css-modulesify');

gulp.task('build', function () {
  return browserify({
      entries: './src/index.js',
      debug: true
    })
    .transform(babelify)
    .transform(cssModulesify, {
      rootDir: __dirname,
      output: './build/bundle.css',
      global: true,
      processorOpts: {
        parser: require('postcss-safe-parser'),
        map: false,
      },
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build'));
});

gulp.task('default', gulp.series('build'));