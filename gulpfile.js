"use strict"

var
	del = require('del'),
	gulp = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch')
var ms = require('./src/compile/gulp-ms')

var src_ms = 'src/**/*.ms'
var src_js = 'src/**/*.js'

var dest = 'js'

function pipeMs(stream) {
	return stream
	.pipe(sourcemaps.init())
	.pipe(ms())
	.pipe(sourcemaps.write('.', {
		debug: true,
		includeContent: false,
		sourceRoot: './src'
	}))
	.pipe(gulp.dest(dest))
}

gulp.task('clean', function(cb) {
	del(dest, cb)
})

gulp.task('js', function() {
	gulp.src(src_js)
	.pipe(gulp.dest(dest))
})

gulp.task('ms', function() {
	pipeMs(gulp.src(src_ms))
})

gulp.task('watch', function() {
	pipeMs(gulp.src(src_ms).pipe(watch(src_ms)))
	gulp.src(src_js).pipe(gulp.dest(dest))
})

gulp.task('default', [ 'watch' ])
