const {
    parallel,
    dest,
    src,
    watch
} = require('gulp');
const {spawn, execSync} = require('child_process');
const fs = require('fs');

const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));

const build_pug = (cb) => {
    return src('./src/*.pug') // pug files
        .pipe(pug( JSON.parse( fs.readFileSync('./src/pug-data.json') ) ))
        .pipe(dest('./docs'))
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

const watch_files = () => {
    parallel(build_scss, build_js, build_pug)

    // Run live-server on docs dir
    // https://www.npmjs.com/package/live-server
    let output = execSync("npm ls live-server -g").toString(); // Check if live-server is installed
    if(!/.*live-server.*/.test(output)) {
        console.error("live-server is not installed.\nInstall it first 'npm install -g live-server' (https://www.npmjs.com/package/live-server)");
        process.exit(1);
    }

    spawn("live-server", [], {
        cwd: './docs/',
        env: process.env,
        detached: true,
        shell: true
    });

    watch('src/sass/*.scss', (cb) => {
        build_scss();
        cb()
    });
    watch('src/js/*.js', (cb) => {
        build_js();
        cb();
    });
    watch('src/*.pug', (cb) => {
        build_pug();
        cb();
    });
}

exports.build = parallel(build_pug, build_scss, build_js);
exports.dev = watch_files