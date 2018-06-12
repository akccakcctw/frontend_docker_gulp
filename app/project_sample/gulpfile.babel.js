'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import getEnv from './build-tasks/env';
import del from 'del';

const $ = gulpLoadPlugins();

const paths = {
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/',
  },
  styles: {
    src: 'src/sass/**/*.scss',
    dest: 'dist/css/',
  },
  markups: {
    src: 'src/views/**/*.pug',
    dest: 'dist/',
  },
};


const clean = () => del(['dist/css', 'dist/js']);

// create livereload server
const server = browserSync.create();

function reload(cb) {
  server.reload();
  cb();
}

function serve(cb) {
  server.init({
    open: false,
    notify: false,
    port: 8000,
    ui: {
      port: 3000
    },
    server: {
      baseDir: './dist/',
    },
  });
  cb();
}

function compileCSS() {
  return gulp.src(paths.styles.src)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'nested', // expanded, nested, compact, compressed
      precision: 10,
      includePath: ['.'],
    }).on('error', $.sass.logError))
  .pipe($.autoprefixer({ browsers: ['last 2 versions'] }))
  .pipe($.sourcemaps.write('./sourcemaps'))
  .pipe(gulp.dest(paths.styles.dest))
  .pipe(server.stream())
}

function compileJS() {
  return gulp.src(paths.scripts.src)
    .pipe($.plumber())
    .pipe($.babel())
    .pipe(gulp.dest(paths.scripts.dest))
}

function compileMarkups() {
  return gulp.src(paths.markups.src)
    .pipe($.plumber())
    .pipe($.pug({ pretty: true }))
    .pipe(gulp.dest(paths.markups.dest))
}

const watchCSS = () => gulp.watch(paths.styles.src, { usePolling: true }, gulp.series(compileCSS));
const watchJS = () => gulp.watch(paths.scripts.src, { usePolling: true }, gulp.series(compileJS, reload));
const watchMarkups = () => gulp.watch(paths.markups.src, { usePolling: true }, gulp.series(compileMarkups, reload));
const compile = gulp.parallel(compileCSS, compileJS, compileMarkups);
compile.description = 'compile all sources';

const watch = gulp.parallel(watchCSS, watchJS, watchMarkups);

function minifyCSS() {
  return gulp.src(paths.styles.src)
    .pipe($.plumber())
    .pipe($.sass.sync({
      outputStyle: 'compressed',
      precision: 10,
      includePath: ['.'],
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe($.notify({
      message: 'Minify Sass Complete!',
      onLast: true,
    }))
}

function minifyJS() {
  return gulp.src(paths.scripts.src)
    .pipe($.plumber())
    .pipe($.babel())
    .pipe($.uglify()) // minify
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe($.notify({
      message: 'Minify Javascript Complete!',
      onLast: true,
    }))
}

const min = gulp.parallel(minifyCSS, minifyJS);
min.description = 'minify CSS and JS files';

const env = getEnv();

// `gulp --production` for production,
// or simply use `gulp` for development
const defaultTasks = env.production
  ? gulp.series(min)
  : gulp.series(compile, serve, watch);

export {
  compile,
  compileCSS,
  compileJS,
  compileMarkups,
  serve,
  watch,
  watchCSS,
  watchJS,
  watchMarkups,
  minifyCSS,
  minifyJS,
  min,
  clean,
};

export default defaultTasks;

