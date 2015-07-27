// Require Node Modules
var gulp          = require('gulp'),
    browsersync   = require('browser-sync'),
    filter        = require('gulp-filter'),
    uglify        = require('gulp-uglify'),
    concat        = require('gulp-concat'),
    flatten       = require('gulp-flatten'),
    ext           = require('gulp-ext-replace'),
    nodesass      = require('node-sass'),
    sass          = require('gulp-sass'),
    globbing      = require('gulp-css-globbing'),
    autoprefixer  = require('gulp-autoprefixer'),
    minifycss     = require('gulp-minify-css'),
    sourcemaps    = require('gulp-sourcemaps'),
    bowerfiles    = require('main-bower-files'),
    browsersync   = require('browser-sync'),
    reload        = browsersync.reload;

// Bower Task
gulp.task('bower-build', function() {

  gulp.src(bowerfiles({ // Get main js files
    includeDev:'true',
    overrides: {
      jquery: {
        ignore: true // Ignore bower jQuery in favore of Drupal
      },
      "modernizr-min": {
        main: "*.js" // Manual main file definition for modernizr
      }
    }
  }),{base:'libraries'})

    .pipe(filter('**/*.js'))
    .pipe(flatten)
    .pipe(gulp.dest('dev/js/bower'))

  gulp.src(bowerfiles({includeDev:'true'}),{base:'libraries'})// get main css files
    .pipe(filter('**/*.css'))
    .pipe(ext('.scss'))
    .pipe(flatten)
    .pipe(gulp.dest('dev/sass/bower'))
})

// JS Task
gulp.task('js', function() {
  gulp.src('dev/js/*.js')
    .pipe(uglify())
    .pipe(concat({ path: 'functions.js', stat: {mode: 0666} }))
    .pipe(gulp.dest('build/js'))
})

// Sass Task
gulp.task('sass', function() {
  gulp.src('dev/sass/EXAMPLE.styles.scss')
    .pipe(sourcemaps.init())
    .pipe(globbing({ extensions: ['.scss'] }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifycss())
    .pipe(sourcemaps.write('../maps/css'))
    .pipe(gulp.dest('build/css'))

  gulp.src('dev/sass/EXAMPLE.normalize.scss')
    .pipe(sourcemaps.init())
    .pipe(globbing({ extensions: ['.scss'] }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifycss())
    .pipe(sourcemaps.write('../maps/css'))
    .pipe(gulp.dest('build/css'))

  gulp.src('dev/sass/EXAMPLE.hacks.scss')
    .pipe(sourcemaps.init())
    .pipe(globbing({ extensions: ['.scss'] }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifycss())
    .pipe(sourcemaps.write('../maps/css'))
    .pipe(gulp.dest('build/css'))

    // Reload browser
    .pipe(reload({stream: true}))
})

// Browser Sync
gulp.task('browser-sync', function() {
  browsersync({
    proxy: "www.EXAMPLE.twm",
    port: 3000,
    ui: {
      port: 3001,
      weinre: {
        port: 3002
      }
    }
  })
})

// Watch for changes
gulp.task('watch', function(){
  gulp.watch('dev/**/*', ['js', 'sass'])
})

// Run run browser-sync and watch for changes
gulp.task('default', ['browser-sync', 'watch'])
