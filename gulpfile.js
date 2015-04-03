'use strict'

require('source-map-support').install()
require('es6-shim')
const
	babel = require('gulp-babel'),
	fs = require('q-io/fs'),
	header = require('gulp-header'),
	gulp = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch')

gulp.task('default', [ 'watch' ])

gulp.task('watch', [ 'watch-js', 'watch-ms', 'watch-list-modules' ])

gulp.task('run', function() {
	const test = require('./js/meta/run-all-tests')
	_ms.getModule(test)['run-all-tests']()
})

function writeListModules() {
	// Required lazily because 'js' task must run first.
	const listModules = require('./js/meta/compile/list-modules')
	return listModules('./js').then(function(js) {
		return fs.write('./js/modules-list.js', js)
	}).done()
}
gulp.task('list-modules', [ 'js', 'ms' ], writeListModules)
gulp.task('watch-list-modules', [ 'js', 'ms', 'list-modules' ], function() {
	const src = [ srcMs, srcJs ]
	return watch(src, { verbose: true }, writeListModules)
})

// TODO: Run-all-tests does not work yet.
// Need to figure out how to do reflection on requirejs modules.
gulp.task('run-requirejs', function() {
	const requirejs = require('requirejs')
	requirejs.config({
		baseUrl: 'js',
		nodeRequire: require
	})
	const test = requirejs('meta/test')
	_ms.getModule(test)
})

gulp.task('test-compile', function() {
	require('./js/meta/compile/test-compile')()
})

const srcMs = 'src/**/*.ms', srcJs = 'src/**/*.js'
const dest = 'js'

function pipeMs(stream) {
	// This can only be required after we've created it, so 'ms' task depends on 'js'.
	const ms = require('./js/meta/compile/gulp-ms')
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

function pipeJs(stream) {
	return stream
	.pipe(sourcemaps.init())
	.pipe(babel({
		modules: 'amd',
		whitelist: [
			'es6.arrowFunctions',
			'es6.classes',
			'es6.destructuring',
			'es6.modules',
			'es6.parameters.rest',
			'es6.spread',
			'es6.properties.shorthand',
			'es6.templateLiterals',
			'strict'
		]
	}))
	.pipe(header(
		'if (typeof define !== \'function\') var define = require(\'amdefine\')(module);'))
	.pipe(sourcemaps.write('.', {
		debug: true,
		sourceRoot: '/src'
	}))
	.pipe(gulp.dest(dest))
}

gulp.task('js', function() { return pipeJs(gulp.src(srcJs)) })
gulp.task('watch-js', function() { return pipeJs(gulp.src(srcJs).pipe(watch(srcJs))) })

gulp.task('ms', [ 'js' ], function() { return pipeMs(gulp.src(srcMs)) })
gulp.task('watch-ms', [ 'js' ], function() { return pipeMs(gulp.src(srcMs).pipe(watch(srcMs))) })

gulp.task('lint', function() {
	// For some reason, requiring this makes es6-shim unhappy.
	// So, can't lint and do other things in the same task.
	const eslint = require('gulp-eslint')
	return gulp.src([ './*.js', srcJs ])
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failOnError())
})
