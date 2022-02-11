const {
    series,
    parallel,
    dest,
    src
} = require('gulp');
const minify = require('gulp-minify');

const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));


const build_pug = (cb) => {
    return src('./src/*.pug') // pug files
        .pipe(pug({
            ...{pretty: true},
            ...require('./src/pug-data.json')
        }))
        .pipe(dest('./docs'));
}
const build_scss = (cb) => {
    return src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./docs/css'))
}
const build_js = (cb) => {
    return src('./src/js/**/*.js')
        .pipe(dest('./docs/js'))
}


const minify_html = (cb) => {
    return src('./docs/*.html')
        .pipe(minify())
        .pipe(dest('./docs'))
}
const minify_css = (cb) => {
    return src('./docs/css/*.css')
        .pipe(minify())
        .pipe(dest('./docs/css'))
}
const minify_js = (cb) => {
    return src('./docs/js/*.js')
        .pipe(minify())
        .pipe(dest('./docs/js'))
}

exports.dev = series(parallel(build_pug, build_scss, build_js));
exports.build = series(parallel(build_pug, build_scss, build_js), parallel(minify_html, minify_css, minify_js));