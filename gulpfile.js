// list dependencies
const {src, dest, watch, series} = require('gulp');
const browsersync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');
const fileinclude = require('gulp-file-include');

// create functions

var gulp        = require('gulp');
var deploy      = require('gulp-gh-pages');

/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
  return gulp.src("./build/**/*")
    .pipe(deploy())
});
  
// scss
function compilescss(){
    return src('src/scss/*.scss')
        .pipe(sass())
        .pipe(prefix())
        .pipe(minify())
        .pipe(dest('build/css'));
}

// js
function jsmin(){
    return src('src/js/*.js')
    .pipe(terser())
    .pipe(dest('build/js'));

}

// images
function optimizeimg(){
    return src('src/img/*.{jpg,png,svg}')
    .pipe(imagemin([
        imagemin.mozjpeg({ quality:80, progressive: true}),
        imagemin.optipng({optimizationLevel: 2}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('build/img'));
}

// webp images
function webpImage() {
    return src('build/img/*.{jpg,png,svg')
        .pipe(imagewebp())
        .pipe(dest('build/img'));
}

// file include

async function includeHTML(){
    return src([
        '*.html'
        // '!header.html',
        // '!footer.html'
    ])
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file',
    }))
    .pipe(dest('build'));
}

// browsersync tasks

function browsersyncServer(cb){
    browsersync.init({
        server: {
            baseDir: './build'
        }
    });
    cb();
}

function browsersyncReload(cb){
    browsersync.reload();
    cb();
}

// create watchtask
function watchTask(){
    watch('src/scss/**/*.scss', compilescss);
    watch('src/js/*.js', jsmin);
    watch('src/img/*.{jpeg,png,svg}', optimizeimg);
    watch('build/img/*.{jpeg,png,svg}', webpImage);
    watch('src/components/*.html', includeHTML).on('change', browsersync.reload);;
    // watch('*.html', browsersyncReload);
}

// default gulp
exports.default = series(
    compilescss,
    jsmin,
    optimizeimg,
    webpImage,
    includeHTML,
    browsersyncServer,
    watchTask
  );