var gulp = require('gulp');
var sass = require('gulp-sass');
var less = require('gulp-less');
var rename = require("gulp-rename");
var browserSync = require("browser-sync").create();

gulp.task('serve', ['sass', 'less'], function() {
    browserSync.init({
        server: "./src"
    });

    gulp.watch("src/**/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("src/**/*.less", ['less']).on('change', browserSync.reload);
    gulp.watch("src/*.html").on('change', browserSync.reload);
})

gulp.task('less', function () {
    return gulp.src([
    './src/**/*.less',
    ])
    .pipe(less())
    .pipe(rename(function (path) {
        path.dirname = "css";
        path.basename += "-less";
    }))
    .pipe(gulp.dest('./src/public'));
});

gulp.task('sass', function () {
    return gulp.src([
    './src/**/*.scss',
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(rename(function (path) {
        path.dirname = "css";
        path.basename += "-sass";
    }))
    .pipe(gulp.dest('./src/public'));
});

gulp.task('build', function () {
    gulp.start('less');
    gulp.start('sass');
})

gulp.task('watch', function() {
    gulp.start('less');
    gulp.start('sass');
    gulp.watch('./src/**/*.less', ['less']);
    gulp.watch('./src/**/*.scss', ['sass']);
});