'use strict'

const
	babel = require('gulp-babel'),
	createServer = require('http-server').createServer,
	eslint = require('gulp-eslint'),
	gulp = require('gulp'),
	gulpJade = require('gulp-jade'),
	jade = require('jade'),
	plumber = require('gulp-plumber'),
	sourceMaps = require('gulp-sourcemaps'),
	stylus = require('gulp-stylus'),
	watch = require('gulp-watch')

// Doing 'lib' and 'mason' at the same time seems to cause crashes,
// so do 'mason' in a separate console if you want live updating of mason library.
gulp.task('default', [ 'view', 'style', 'lint', 'lib', 'image', 'script', 'serve' ])

function watchStream(name) {
	const glob = 'assets/' + name + '/**/*'
	return gulp.src(glob).pipe(watch(glob, { verbose: true })).pipe(plumber())
}

function simple(name, stream, outName) {
	if (outName === undefined)
		outName = name
	let _ = watchStream(name)
	if (stream !== undefined)
		_ = _.pipe(stream)
	return _.pipe(gulp.dest('public/' + outName))
}

gulp.task('view', function() {
	jade.filters.raw = jade.runtime.escape
	return simple('view', gulpJade({ jade: jade, pretty: true }), '')
})

gulp.task('style', function() { return simple('style', stylus()) })

gulp.task('lib', function() {
	return gulp.src('bower_components/**/*', { base: 'bower_components' })
	.pipe(watch('bower_components', { verbose: true }))
	.pipe(gulp.dest('public/lib'))
})

gulp.task('image', function() { return simple('image') })

gulp.task('mason', function() {
	return gulp.src('../js/**/*')
	.pipe(watch('../js/**/*', { verbose: true }))
	.pipe(gulp.dest('public/lib/mason'))
})

gulp.task('script', function() {
	return watchStream('script')
	.pipe(sourceMaps.init())
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
	.pipe(sourceMaps.write('.'))
	.pipe(gulp.dest('public/script'))
})

gulp.task('lint', function() {
	return gulp.src('assets/script/**/*.js')
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failOnError())
})

gulp.task('serve', function() {
	const port = 8000
	createServer({ root: 'public' }).listen(port)
	console.log('Serving at localhost:' + port + '/')
})
