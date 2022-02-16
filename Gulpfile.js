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

let build_dest = './docs' 

const build_pug = (cb) => {
    return src('./src/*.pug') // pug files
        .pipe(pug( JSON.parse( fs.readFileSync('./src/pug-data.json') ) ))
        .pipe(dest(build_dest))
}
const build_scss = (cb) => {
    return src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(build_dest + '/css'))
}
const build_js = (cb) => {
    return src('./src/js/**/*.js')
        .pipe(dest(build_dest + '/js'))
}

const watch_files = () => {
    
    build_dest = './dist';
    if(!fs.existsSync(build_dest)) {
        fs.mkdirSync(build_dest);
    }

    build_all()

    // Run live-server on docs dir
    // https://www.npmjs.com/package/live-server
    let output = execSync("npm ls live-server -g").toString(); // Check if live-server is installed
    if(!/.*live-server.*/.test(output)) {
        console.error("live-server is not installed.\nInstall it first 'npm install -g live-server' (https://www.npmjs.com/package/live-server)");
        process.exit(1);
    }

    spawn("live-server", [], {
        cwd: build_dest,
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

const build_all = parallel(build_pug, build_scss, build_js)

exports.build = build_all;
exports.dev = watch_files