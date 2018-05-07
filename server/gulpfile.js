var gulp = require('gulp')
var typescript = require('gulp-typescript')
var watch = require('gulp-watch')
var pug = require('gulp-pug')

var typescriptProject = typescript.createProject('tsconfig.json')

var pugSource = 'assets/pug/**/*.pug'
var pugDestinaion = 'source/html/'

var typescriptSource = 'assets/ts/**/*.ts'
var typescriptDestination = 'source/js/'

gulp.task('typescript', function() {
    typescriptProject.src()
    .pipe(typescriptProject())
    .js.pipe(gulp.dest(typescriptDestination))
})

gulp.task('pug', function() {
    return gulp.src(pugSource)
    .pipe(pug())
    .pipe(gulp.dest(pugDestinaion))
})

gulp.task('default', function() {
    gulp.watch(typescriptSource, ['typescript'])
    gulp.watch(pugSource, ['pug'])
})

