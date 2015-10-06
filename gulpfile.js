'use strict'

require('source-map-support').install()
const
	argv = require('yargs').argv,
	babel = require('gulp-babel'),
	fs = require('q-io/fs'),
	header = require('gulp-header'),
	gulp = require('gulp'),
	listModules = require('mason-node-util/dist/list-modules'),
	mason = require('gulp-mason'),
	path = require('path'),
	plumber = require('gulp-plumber'),
	requirejs = require('requirejs'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch')

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

//TODO: 'all'
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

gulp.task('just-list-modules', writeListModules)

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
			whitelist: [ 'es6.destructuring', 'es6.modules', 'es6.parameters', 'es6.spread', 'strict' ]
		}))
		.pipe(header(
			'if (typeof define !== \'function\') var define = require(\'amdefine\')(module);'))
		.pipe(sourcemaps.write({ debug: true, sourceRoot: '/src' }))
		.pipe(gulp.dest(dist)),

	pipeMs = stream =>
		stream
		.pipe(sourcemaps.init())

		.pipe(mason({
			checks,
			// Can't automatically import boot because some of these modules *are* boot.
			importBoot: false,
			// Can't use builtins because msl is what defines them.
			builtins: {
				'global': [ 'Array', 'Boolean', 'Error', 'Function', 'Math', 'Number', 'Object', 'RegExp', 'String', 'Symbol' ]
			},
			includeAmdefine: true,
			lazyModules: false
		}))
		.pipe(sourcemaps.write({
			debug: true,
			includeContent: false,
			sourceRoot: './src'
		}))
		.pipe(gulp.dest(dist))
