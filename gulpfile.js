const gulp = require('gulp')
const sass = require('gulp-sass')
const obfuscator = require('gulp-js-obfuscator')
const sourcemaps = require('gulp-sourcemaps')
const browserify = require('browserify')
const babelify = require('babelify')
const browserSync = require('browser-sync').create()
const source = require('vinyl-source-stream')
const del = require('del')

var config = {
  base:    __dirname + '/',
  src:     __dirname + '/src',
  htmlin:  __dirname + '/src/html/**/*.html',
  cssin:   __dirname + '/src/sass/**/*.sass',
  jsin:    __dirname + '/src/babel/**/*.{jsx,js}',
  jsentry: __dirname + '/src/babel/main.jsx',
  imgin:   __dirname + '/src/img/**/*',
  cssout:  __dirname + '/docs/css/',
  jsout:   __dirname + '/docs/js/',
  imgout:  __dirname + '/docs/img/',
  htmlout: __dirname + '/docs/'
}

function clean () {
  return del([config.htmlout + '*'])
}

function reload (cb) {
  browserSync.reload()
  cb()
}

function css () {
  return gulp.src(config.cssin)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.cssout))
}

function scripts () {
  return browserify({
    entries: config.jsentry,
    extensions: ['.js', '.jsx'],
    debug: true
  })
    .transform(babelify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest(config.jsout))
    //.pipe(obfuscator())
}

function images () {
  return gulp
    .src(config.imgin)
    .pipe(gulp.dest(config.imgout))
}

function html () {
  return gulp
    .src(config.htmlin)
    .pipe(gulp.dest(config.htmlout))
}

function serve () {
  browserSync.init({
    server: config.htmlout
  })

  gulp.watch(config.jsin, () => gulp.series(scripts, reload))
  gulp.watch(config.cssin, () => gulp.series(css, reload))
  gulp.watch(config.imgin, () => gulp.series(images, reload))
  gulp.watch(config.htmlin, () => gulp.series(html, reload))
}

function build (cb) {
  gulp.series(clean, gulp.parallel(html, images, scripts, css))(cb)
}

exports.build = build
exports.clean = clean
exports.default = gulp.series(build, serve)
