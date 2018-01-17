const gulp = require('gulp');
// const jshint = require('gulp-jshint');
const jsFiles = ['*.js', 'src/**/*.js'];
const jscs = require('gulp-jscs');
const nodemon = require('nodemon');

gulp.task('style', () => {
  return gulp
    .src(jsFiles)
    // .pipe(jshint())
    // .pipe(
    //   jshint.reporter('jshint-stylish', {
    //     verbose: true
    //   })
    // )
    .pipe(jscs());
});

gulp.task('inject', () => {
  const wiredep = require('wiredep').stream;
  const options = {
    bowerJson: require('./bower.json'),
    directory: './public/lib'
  };

  return gulp
    .src('./src/views/*html.')
    .pipe(wiredep(options))
    .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', () => {
  const options = {
    script: 'app.js',
    delayTime: 1,
    env: {
      PORT: 3000
    },
    watch: jsFiles
  };

  return nodemon(options).on('restart', ev => {
    console.log('Restarting...');
  });
});