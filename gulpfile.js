'use strict'

require('source-map-support').install()
const
	argv = require('yargs').argv,
	babel = require('gulp-babel'),
	eslint = require('gulp-eslint'),
	fs = require('q-io/fs'),
	header = require('gulp-header'),
	gulp = require('gulp'),
	path = require('path'),
	plumber = require('gulp-plumber'),
	requirejs = require('requirejs'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch')

// Use --no-checks to turn of checks in compiled mason code.
const checks = argv.checks

const run = () => {
	const test = require('./dist/meta/run-all-tests')
	_ms.getModule(test).default()
}

// Composite

gulp.task('default', [ 'watch' ])
// TODO: Can't compile and run in the same task or there will be bugs.
// gulp.task('all', [ 'compile-all' ], run)
gulp.task('compile-all', [ 'js', 'ms', 'list-modules' ])
gulp.task('all-minus-js', [ 'ms-minus-js' ], run)
gulp.task('watch', [ 'watch-js', 'watch-ms', 'watch-list-modules' ])

// Run

gulp.task('run', run)

gulp.task('run-requirejs', () => {
	const test = requirejs(path.join(__dirname, 'dist/meta/run-all-tests'))
	_ms.getModule(test).default()
})

// Compile

gulp.task('js', () => pipeJs(gulp.src(srcJs)))
gulp.task('watch-js', () => pipeJs(srcWatch(srcJs)))

gulp.task('ms', [ 'js' ], () => pipeMs(gulp.src(srcMs), true))
gulp.task('ms-minus-js', () => pipeMs(gulp.src(srcMs), true))
gulp.task('watch-ms', [ 'js' ], () => pipeMs(srcWatch(srcMs)))

// Lint

gulp.task('lint', () =>
	gulp.src([ './gulpfile.js', srcJs ]).pipe(eslint()).pipe(eslint.format()))

// Test

gulp.task('test-compile', () =>
	require('./dist/meta/compile/node-only/test-compile').test())

gulp.task('perf-test-compile', () =>
	require('./dist/meta/compile/node-only/test-compile').perfTest())

// List modules

const writeListModules = () => {
	const listModules = require('./dist/meta/compile/node-only/list-modules')
	return fs.remove('./dist/modules-list.js').then(() =>
		listModules('./dist', { exclude: /meta\/compile\/node-only\/.*/ }).then(js =>
			fs.write('./dist/modules-list.js', js)))
}

gulp.task('list-modules', [ 'js', 'ms' ], writeListModules)
gulp.task('watch-list-modules', [ 'list-modules' ], () =>
	watchVerbose([ srcJs, srcMs ], writeListModules))


// Helpers

const
	srcMs = 'src/**/*.ms',
	srcJs = 'src/**/*.js',
	dist = 'dist'

const
	watchVerbose = (glob, then) => watch(glob, { verbose: true }, then),

	srcWatch = glob => gulp.src(glob).pipe(watchVerbose(glob)).pipe(plumber()),

	pipeJs = stream =>
		stream
		.pipe(sourcemaps.init())
		.pipe(babel({
			modules: 'amd',
			whitelist: [ 'es6.destructuring', 'es6.modules', 'strict' ]
		}))
		.pipe(header(
			'if (typeof define !== \'function\') var define = require(\'amdefine\')(module);'))
		.pipe(sourcemaps.write({ debug: true, sourceRoot: '/src' }))
		.pipe(gulp.dest(dist)),

	pipeMs = stream => {
		const ms = require('./dist/meta/compile/node-only/gulp-mason')
		return stream
		.pipe(sourcemaps.init())
		.pipe(ms({ checks, verbose: true }))
		.pipe(sourcemaps.write({
			debug: true,
			includeContent: false,
			sourceRoot: './src'
		}))
		.pipe(gulp.dest(dist))
	}
