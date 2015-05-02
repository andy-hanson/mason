'use strict'

require('./es6-shim')
require('source-map-support').install()
const
	babel = require('gulp-babel'),
	fs = require('q-io/fs'),
	header = require('gulp-header'),
	gulp = require('gulp'),
	path = require('path'),
	plumber = require('gulp-plumber'),
	requirejs = require('requirejs'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch')

gulp.task('default', [ 'watch' ])

gulp.task('compile-all', [ 'js', 'ms', 'list-modules' ])
gulp.task('watch', [ 'watch-js', 'watch-ms', 'watch-list-modules' ])
gulp.task('all', [ 'compile-all' ], run)

function run() {
	require('es6-shim')
	const test = require('./dist/meta/run-all-tests')
	_ms.getModule(test).default()
}

gulp.task('run', run)
gulp.task('run-requirejs', function() {
	require('es6-shim')
	const test = requirejs(path.join(__dirname, 'dist/meta/run-all-tests'))
	_ms.getModule(test).default()
})

function src(glob) { return gulp.src(glob) }
function watchVerbose(glob, then) { return watch(glob, { verbose: true }, then) }
function srcWatch(glob) { return src(glob).pipe(watchVerbose(glob)).pipe(plumber()) }

function writeListModules() {
	// Required lazily because 'js' task must run first.
	const listModules = require('./dist/meta/compile/node-only/list-modules')
	return listModules('./dist', { exclude: /meta\/compile\/node-only\/.*/ }).then(function(js) {
		return fs.write('./dist/modules-list.js', js)
	}).done()
}
gulp.task('list-modules', [ 'js', 'ms' ], writeListModules)
gulp.task('watch-list-modules', [ 'list-modules' ], function() {
	const src = [ srcJs, srcMs ]
	return watchVerbose(src, writeListModules)
})

gulp.task('test-compile', function() {
	require('./dist/meta/compile/node-only/test-compile').test()
})
gulp.task('perf-test-compile', function() {
	require('./dist/meta/compile/node-only/test-compile').perfTest()
})

const
	srcMs = 'src/**/*.ms',
	srcJs = 'src/**/*.js',
	dist = 'dist'

function pipeMs(stream) {
	// This can only be required after we've created it, so 'ms' task depends on 'js'.
	const ms = require('./dist/meta/compile/node-only/gulp-mason')
	return stream
	.pipe(sourcemaps.init())
	.pipe(ms({ verbose: true }))
	.pipe(sourcemaps.write({
		debug: true,
		includeContent: false,
		sourceRoot: './src'
	}))
	.pipe(gulp.dest(dist))
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
	.pipe(sourcemaps.write({
		debug: true,
		sourceRoot: '/src'
	}))
	.pipe(gulp.dest(dist))
}

gulp.task('js', function() {
	return pipeJs(src(srcJs))
})
gulp.task('watch-js', function() { return pipeJs(srcWatch(srcJs)) })

gulp.task('ms', [ 'js' ], function() { return pipeMs(src(srcMs)) })
gulp.task('watch-ms', [ 'js' ], function() { return pipeMs(srcWatch(srcMs)) })

gulp.task('lint', function() {
	// For some reason, requiring this makes es6-shim unhappy.
	// So, can't lint and do other things in the same task.
	const eslint = require('gulp-eslint')
	return src([ './*.js', srcJs ])
	.pipe(eslint())
	.pipe(eslint.format())
})
