const { src, 
        dest, 
        series, 
        parallel, 
        watch } = require('gulp');
        
const sass = require('gulp-sass');
const browsersync = require('browser-sync').create();

function cssTask() {
    return src('app/scss/**/*.scss')
        .pipe(sass({ outputStyle: "expanded" }).on('error', sass.logError))
        .pipe(dest('app/css'))
        .pipe(browsersync.stream()) //1
}

// Static server
function browserSync(done) {
    browsersync.init({
      server: {
        baseDir: 'app'
      },
      port: 3000
    });
    done();
}

function reload(done) {
    browsersync.reload();
    done();
}

// Watch files
function watcher(done) {
    watch('app/scss/**/*.scss', cssTask);
    watch('app/*.html', reload);
    watch('app/*.js', reload); // 2
    done();
}

exports.default = parallel(watcher, browserSync);