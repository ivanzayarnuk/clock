import gulp, { dest } from "gulp"; // Імпортуємо gulp функцію
import ghPages from "gulp-gh-pages";

const sass = require('gulp-sass')(require('sass'));



const ghDeploy = () => gulp.src('src/**/*').pipe(ghPages({
    remoteUrl: 'https://github.com/ivanzayarnuk/clock.git',
}));

export const deploy = gulp.series([ghDeploy]);