// *****************************************
// Gulp base enviroment
// v 1.0.0
// luca ronca
// *****************************************

// /////////////////////////////////////////
// Reuired
// /////////////////////////////////////////

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	htmlmin = require('gulp-htmlmin'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	mainBowerFiles = require('main-bower-files'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer');

// /////////////////////////////////////////
// Scritps Task
// /////////////////////////////////////////

gulp.task('scripts', function() {
	return gulp.src(['app/js/**/*.js'])
		.pipe(plumber())
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(rename( {suffix: '.min'} ))
		.pipe(gulp.dest('dist/js'))
		.pipe(reload( {stream:true} ));
});

// /////////////////////////////////////////
// CSS Task
// /////////////////////////////////////////

gulp.task('minify-css', function() {
  return gulp.src('app/css/**/*.css')
		.pipe(plumber())
		.pipe(concat('styles.css'))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename( {suffix: '.min'} ))
		.pipe(gulp.dest('dist/css'))
		.pipe(reload( {stream:true} ));
});

// /////////////////////////////////////////
// Images Task
// /////////////////////////////////////////

gulp.task('images', function() {
    gulp.src(['app/img/**/*.png','app/img/**/*.jpg','app/img/**/*.gif','app/img/**/*.jpeg'])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ],
            use: [pngquant()]
        }))
	    .pipe(gulp.dest('dist/img'));
});

// /////////////////////////////////////////
// HTML Task
// /////////////////////////////////////////

gulp.task('html', function(){
	return gulp.src('app/**/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'))
		.pipe(reload( {stream:true} ));
});

// /////////////////////////////////////////
// Browser-Sync Task
// /////////////////////////////////////////

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: "./dist"
		}
	});
});

// /////////////////////////////////////////
// Main bower files Task
// /////////////////////////////////////////

gulp.task("main-bower-files-js", function(){
	return gulp.src(mainBowerFiles('**/*.js'))
		.pipe(gulp.dest('app/js'));
});

gulp.task("main-bower-files-css", function(){
	return gulp.src(mainBowerFiles('**/*.css'))
		.pipe(gulp.dest('app/css'));
});

gulp.task("main-bower-files", ['main-bower-files-js', 'main-bower-files-css']);

// /////////////////////////////////////////
// Watch Task
// /////////////////////////////////////////

gulp.task('watch', function(){
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/css/**/*.css', ['minify-css']);
	gulp.watch('app/**/*.html', ['html']);
});

// /////////////////////////////////////////
// Clean Task
// /////////////////////////////////////////

gulp.task('clean', function () {
	return gulp.src('dist/**/*', {read: false})
		.pipe(clean());
});


// /////////////////////////////////////////
// Default Task
// /////////////////////////////////////////

gulp.task('default', ['main-bower-files', 'scripts', 'minify-css', 'images', 'html', 'browser-sync', 'watch']);