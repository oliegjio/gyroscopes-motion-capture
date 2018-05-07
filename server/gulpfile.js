var gulp = require('gulp')
var typescript = require('gulp-typescript')
var gulpWatch = require('gulp-watch')

var typescriptProject = typescript.createProject('tsconfig.json')

var typescriptDest = 'source/js/'

gulp.task('default', function() {
    return gulpWatch('assets/ts/**/*.ts', function() {
        typescriptProject.src()
        .pipe(typescriptProject())
        .js.pipe(gulp.dest(typescriptDest))
    })
})