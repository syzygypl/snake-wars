const gulp = require('gulp');
const ts = require('gulp-typescript').createProject('tsconfig.json');
const nodemon = require('gulp-nodemon');

gulp.task('default', ['watch']);

gulp.task('build', () =>
    gulp.src('app/**')
        .pipe(ts())
        .pipe(gulp.dest('dist'))
);

gulp.task('watch', ['build'], () =>
    nodemon({
        script: 'index.js', // run ES5 code
        watch: 'app/', // watch ES2015 code
        ext: 'ts js html',
        tasks: ['build'] // compile synchronously onChange
    })
);
