'use strict'

require('source-map-support').install()
const
	argv = require('yargs').argv,
	babel = require('gulp-babel'),
	eslint = require('gulp-eslint'),
	fs = require('q-io/fs'),
	header = require('gulp-header'),
	gulp = require('gulp'),
	mason = require('gulp-mason'),
	mocha = require('gulp-mocha'),
	path = require('path'),
	plumber = require('gulp-plumber'),
	requirejs = require('requirejs'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch')
const listModules = require('mason-compile/dist/node-only/list-modules')

// Use --no-checks to turn of checks in compiled mason code.
const checks = argv.checks

const
	run = () => {
		const test = require('./dist/meta/run-all-tests')
		_ms.getModule(test).default()
	},
	runTests = () => {
		gulp.src('compiled-test/**/*.js', {read: false})
		.pipe(mocha())
	}

// Composite

gulp.task('default', [ 'watch' ])
// TODO: Can't compile and run in the same task or there will be bugs.
// gulp.task('all', [ 'compile-all' ], run)
gulp.task('compile-all', [ 'js', 'ms', 'list-modules' ])
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

gulp.task('ms', () => pipeMs(gulp.src(srcMs), true))
gulp.task('watch-ms', () => pipeMs(srcWatch(srcMs)))

// List modules

//TODO
const writeListModules = () => {
	return fs.remove('./dist/modules-list.js').catch(() => { }).then(() =>
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
		.pipe(babel(babelOpts))
		.pipe(header(
			'if (typeof define !== \'function\') var define = require(\'amdefine\')(module);'))
		.pipe(sourcemaps.write({ debug: true, sourceRoot: '/src' }))
		.pipe(gulp.dest(dist)),

	pipeMs = stream => {
		return stream
		.pipe(sourcemaps.init())
		.pipe(mason({ checks }))
		.pipe(sourcemaps.write({
			debug: true,
			includeContent: false,
			sourceRoot: './src'
		}))
		.pipe(gulp.dest(dist))
	},

	babelOpts = {
		modules: 'amd',
		whitelist: [ 'es6.destructuring', 'es6.modules', 'strict' ]
	}
