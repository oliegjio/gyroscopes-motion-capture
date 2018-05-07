var gulp = require('gulp')
var typescript = require('gulp-typescript')
var watch = require('gulp-watch')
var pug = require('gulp-pug')

var typescriptProject = typescript.createProject('tsconfig.json')

gulp.task('app', function() {
    gulp.src('app.ts')
    .pipe(typescriptProject())
    .js.pipe(gulp.dest('.'))
})

gulp.task('typescript', function() {
    gulp.src('scripts/**/*.ts')
    .pipe(typescriptProject())
    .js.pipe(gulp.dest('scripts'))
})

gulp.task('pug', function() {
    gulp.src('views/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('views'))
})

gulp.task('default', function() {
    gulp.watch('scripts/**/*.ts', ['typescript'])
    gulp.watch('views/**/*.pug', ['pug'])
    gulp.watch('app.ts', ['app'])
})

