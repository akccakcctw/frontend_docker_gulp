const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create(); // browser auto reload

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

const configAutoprefixer = {
	browsers: ['last 2 versions']
};

gulp.task('default', ['css', 'js', 'markups']);

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
  gulp.watch(paths.styles.src, {mode: 'poll'}, ['css']);
	gulp.watch(paths.scripts.src, {mode: 'poll'}, ['js']);
	gulp.watch(paths.markups.src, {mode: 'poll'}, ['markups']);
});

gulp.task('min', ['css-min', 'js-min']);

gulp.task('css', () => {
  gulp.src(paths.styles.src)
    .pipe($.plumber())
		.pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'nested', // expanded, nested, compact, compressed
      precision: 10,
      includePath: ['.'],
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(configAutoprefixer))
		.pipe($.sourcemaps.write('./sourcemaps'))
    .pipe(gulp.dest(paths.styles.dest)) // output folder
    .pipe(browserSync.stream())
  // .pipe($.notify("Compile Sass Complete!"))
});

gulp.task('css-min', () => {
  gulp.src(paths.styles.src)
    .pipe($.plumber())
    .pipe($.sass.sync({
      outputStyle: 'compressed',
      precision: 10,
      includePath: ['.'],
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(configAutoprefixer))
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest)) // output folder
    .pipe($.notify({
      message: 'Minify Sass Complete!',
      onLast: true,
    }))
});

gulp.task('js', () => {
	gulp.src(paths.scripts.src)
		.pipe($.plumber())
		.pipe($.babel())
		.pipe(gulp.dest(paths.scripts.dest)) // output folder
		.pipe(browserSync.stream())
});

gulp.task('js-min', () => {
	gulp.src(paths.scripts.src)
		.pipe($.plumber)
		.pipe($.babel())
		.pipe($.uglify())
		.pipe($.rename({ suffix: '.min' }))
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe($.notify({
			message: 'Minify Javascript Complete!',
			onLast: true,
		}))
});

gulp.task('markups', () => {
	gulp.src(paths.markups.src)
		.pipe($.plumber())
		.pipe($.pug({ pretty: true }))
		.pipe(gulp.dest(paths.markups.dest)) // output folder
		.pipe(browserSync.stream())
});
