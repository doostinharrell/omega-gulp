// Require Node Modules
var gulp = require('gulp'),
    browsersync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    nodesass = require('node-sass'),
    sass = require('gulp-sass'),
    globbing = require('gulp-css-globbing'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    browsersync = require('browser-sync'),
    reload = browsersync.reload;
 
// JS Task
gulp.task('js', function() {
  gulp.src('dev/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('../maps/js'))
    .pipe(gulp.dest('build/js'))
});

// Sass Task
gulp.task('sass', function() {
  gulp.src('dev/sass/EXAMPLE.styles.scss')
    .pipe(sourcemaps.init())
    .pipe(globbing({
      extensions: ['.scss']
    }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifycss())
    .pipe(sourcemaps.write('../maps/css'))
    .pipe(gulp.dest('build/css'))
  
  gulp.src('dev/sass/EXAMPLE.normalize.scss')
    .pipe(sourcemaps.init())
    .pipe(globbing({
      extensions: ['.scss']
    }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifycss())
    .pipe(sourcemaps.write('../maps/css'))
    .pipe(gulp.dest('build/css'))

  gulp.src('dev/sass/EXAMPLE.hacks.scss')
    .pipe(sourcemaps.init())
    .pipe(globbing({
      extensions: ['.scss']
    }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifycss())
    .pipe(sourcemaps.write('../maps/css'))
    .pipe(gulp.dest('build/css'))
  
  .pipe(reload({stream: true}));
});

// Browser Sync
gulp.task('browser-sync', function() {
    browsersync({
      proxy: "www.EXAMPLE.twm"
    });
});

// Run all tasks and watch for changes
gulp.task('default', function() {
  gulp.run('js')
  gulp.run('sass')
  gulp.run('browser-sync')
  gulp.watch('dev/**/*', function() {
    gulp.run('js')
    gulp.run('sass')
  })
});