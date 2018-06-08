const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create(); // browser auto reload

const $ = gulpLoadPlugins();

gulp.task('default', ['css']);

gulp.task('browserSync', ['default'], () => {
  browserSync.init({
    open: false,
    notify: false,
    port: 8001,
		ui: {
			port: 3001
		},
    server: {
      baseDir: 'dist'
    },
  });
});

gulp.task('watch', ['browserSync'], () => {
  gulp.watch('src/sass/**/*.scss', {mode: 'poll'}, ['css']);
});

gulp.task('min', ['css-min']);

console.log(gulp.dest('dist/css'));

gulp.task('css', () => {
  gulp.src('src/sass/**/*.scss')
    .pipe($.plumber())
    .pipe($.sass.sync({
      outputStyle: 'nested', // expanded, nested, compact, compressed
      precision: 10,
      includePath: ['.'],
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(gulp.dest('dist/css')) // output folder
    .pipe(browserSync.stream())
  // .pipe($.notify("Compile Sass Complete!"))
});

gulp.task('css-min', () => {
  gulp.src('src/sass/**/*.scss')
    .pipe($.plumber())
    .pipe($.sass.sync({
      outputStyle: 'compressed',
      precision: 10,
      includePath: ['.'],
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/css')) // output folder
    .pipe($.notify({
      message: 'Minify Sass Complete!',
      onLast: true,
    }))
});

