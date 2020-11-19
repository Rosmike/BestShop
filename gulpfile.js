const gulp = require("gulp");
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const notifier = require('node-notifier');
const entryPath = ".";



sass.compiler = require('sass');

function showError(err) {
    console.log("------------------");
    console.log(err.messageFormatted);
    console.log("------------------");

    notifier.notify({
        title: 'Błąd',
        message: err.messageFormatted
    });
}


function server(cb) {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    cb();
}

function makeCSS() {
    return gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "expanded" //d:nested, compact, compressed, expanded
        }).on('error', showError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

function watch(cb) {
    gulp.watch("./scss/**/*.scss", gulp.series(makeCSS));
    gulp.watch("/*.html").on('change', browserSync.reload);
    cb();
}

module.exports.makeCSS = makeCSS;
module.exports.watch = watch;
module.exports.default = gulp.series(server, makeCSS, watch)
// powoduje że wykonuje wszystkie zadania

