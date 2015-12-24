var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

gulp.task('css', function(){
  gulp.src('app/assets/css/style.css')
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(autoprefixer('last 2 version', 'ie 9'))
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  gulp.src('app/assets/js/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['css', 'scripts'], function() {

    browserSync.init({
        server: './app',
        open: false
    });

    gulp.watch('app/assets/css/style.css', ['css']);
    gulp.watch('app/assets/js/app.js', ['scripts']);
    gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
