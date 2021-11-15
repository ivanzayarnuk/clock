import gulp, { dest } from "gulp"; // Імпортуємо gulp функцію
import gpug from "gulp-pug"; // Імпортуємо gulp-pug - функцію
import del from "del";
import ws from "gulp-webserver";
import image from 'gulp-image';
import autoprefixer from 'gulp-autoprefixer';
import miniCSS from 'gulp-csso';
import bro from 'gulp-bro';
import babelify from 'babelify';
import ghPages from "gulp-gh-pages";
import exp from "constants";
// import sass from 'gulp-sass';

const sass = require('gulp-sass')(require('sass'));

const routes = {    // Створюємо обєкти  адресов
    pug: {
        watch: "src/**/*.pug",
        src: 'src/*.pug',
        dest: 'build'
    },
    img: {
        src: 'src/img/**/*.*', // Всі файли із папки і під папок
        dest: 'build/img'
    },
    scss: {
        watch: 'src/scss/**/*.scss',
        src: 'src/scss/style.scss',
        dest: 'build/css'
    },
    js: {
        watch: 'src/js/**/*.js',
        src: 'src/js/main.js',
        dest: 'build/js'
    }

};

const pug = () => gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest)); 
const clear = () => del(routes.pug.dest); // Очистить папку build

const webserver = () => gulp.src(routes.pug.dest).pipe(ws({ livereload: true, open: true }));
const img = () => gulp.src(routes.img.src).pipe(image()).pipe(gulp.dest(routes.img.dest));
const styles = () => gulp.src(routes.scss.src)
                .pipe(sass().on('error', sass.logError))
                .pipe(autoprefixer({                       //Добавляэм автопрефыксер для совмістімості з іншими браузерами
                    browsers: ["last 2 version"],  // Совмістім з 2 останніми версіями
                }))
                .pipe(miniCSS())
                .pipe(gulp.dest(routes.scss.dest));

const js = () => gulp.src(routes.js.src).pipe(bro({
    transform: [babelify.configure({ presets: ['@babel/preset-env'] })] // фу-я bro викликає ф-ю babelify.configure
})).pipe(gulp.dest(routes.js.dest));

const ghDeploy = () => gulp.src('build/**/*').pipe(ghPages({
    remoteUrl: 'https://github.com/ivanzayarnuk/clock.git',
}));

const watch = () => { // watch - функція відслідковує задані файли і передає на обробку іншим функціям
    gulp.watch(routes.pug.watch, pug)
    gulp.watch(routes.img.src, img);
    gulp.watch(routes.scss.watch, styles);
    gulp.watch(routes.js.watch,js)

};

const prepare = gulp.series([clear, img]); // Робимо окрему серію задач для функції очистки Тобто підготовки
const assets = gulp.series([pug, styles, js]); // Викликаємо серію задач для компіляції 
const live = gulp.parallel([webserver, watch]); // Паралельне виконання задач


export const build = gulp.series([prepare, assets]);
export const dev =  gulp.series([build, live]); // Послідовне виконання задач
export const deploy = gulp.series([build, ghDeploy]);