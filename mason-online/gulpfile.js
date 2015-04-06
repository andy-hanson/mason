var
	babel = require('gulp-babel'),
	createServer = require('http-server').createServer,
	eslint = require('gulp-eslint'),
	gulp = require('gulp'),
	jade = require('gulp-jade'),
	plumber = require('gulp-plumber'),
	sourceMaps = require('gulp-sourcemaps'),
	stylus = require('gulp-stylus'),
	watch = require('gulp-watch')

gulp.task('default', [ 'view', 'style', 'lint', 'mason', 'lib', 'script', 'serve' ])

function watchStream(name) {
	var glob = 'assets/' + name + '/**/*'
	return gulp.src(glob).pipe(watch(glob, { verbose: true })).pipe(plumber())
}

function simple(name, stream, outName) {
	if (outName === undefined)
		outName = name
	var _ = watchStream(name)
	if (stream)
		_ = _.pipe(stream)
	return _.pipe(gulp.dest('public/' + outName))
}

gulp.task('view', function() { return simple('view', jade(), '') })

gulp.task('style', function() { return simple('style', stylus()) })

gulp.task('lib', function() {
	return gulp.src('bower_components/**/*', { base: 'bower_components' })
	.pipe(watch('bower_components', { verbose: true }))
	.pipe(gulp.dest('public/lib'))
})
gulp.task('mason', function() {
	return gulp.src('../js/**/*')
	.pipe(watch('../js/**/*', { verbose: true }))
	.pipe(gulp.dest('bower_components/mason'))
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
	var port = 8000
	createServer({ root: 'public' }).listen(port)
	console.log('Serving at localhost:' + port + '/')
})
