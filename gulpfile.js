const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const del = require('del');
const notify = require('gulp-notify');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const path = require('path');


gulp.task('svgstore', () => {
    return gulp
        .src('app/img/icons/*.svg')
        // .pipe(svgmin((file) => {
        //     const prefix = path.basename(file.relative, path.extname(file.relative));
        //     return {
        //         plugins: [{
        //             cleanupIDs: {
        //                 prefix: prefix + '-',
        //                 minify: true
        //             }
        //         }]
        //     }
        // }))
        .pipe(svgstore({
            inlineSvg: false
        }))
        .pipe(gulp.dest('build'));
});


gulp.task('serve', ['sass', 'js'], () => {

   browserSync.init({
       server: './app'
   });

   gulp.watch('app/scss/**/*.scss', ['sass']);
   gulp.watch('app/scss/**/*.css', ['sass']);
   gulp.watch('app/js/**/*.js', ['js']);
   gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('sass', () => {
   return gulp.src('app/scss/style.scss')
       .pipe(sass().on('error', notify.onError()))
       .pipe(gulp.dest('app/css'))
       .pipe(browserSync.stream());
});

gulp.task('js', () => {

   return gulp.src([
       'app/js/libs/jquery.js',
       // 'app/js/libs/jquery.enllax.js',
       'app/js/libs/fm.revealator.jquery.js',
       'app/js/libs/jquery.mask.js',
       'app/js/slider.js',
       'app/js/video.slider.js',
       'app/js/callback.form.js',
       'app/js/google.map.js',
       'app/js/common.js'
   ])
       .pipe(concat('main.js'))
       .pipe(gulp.dest('app/js'))
       .pipe(browserSync.stream());

});

gulp.task('imagemin', () => {

   return gulp.src('app/img/**/*')
       // .pipe(cache(imagemin()))
       .pipe(gulp.dest('build/img'));

});

gulp.task('build', ['removebuild', 'sass', 'js'], () => {

    gulp.src('app/**/*.html')
        .pipe(gulp.dest('build'));

    gulp.src('app/css/style.css')
        .pipe(postcss([
            autoprefixer({ browsers: ['last 10 versions'] }),
            cssnano()
        ]))
        .pipe(gulp.dest('build/css'));

    gulp.src('app/js/main.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));

    gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('build/fonts'));

});

gulp.task('clearcache', () => {
    return cache.clearAll();
});

gulp.task('removebuild', () => {
    return del('build')
});

gulp.task('default', ['serve']);
