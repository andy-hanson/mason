window.requirejs.config({
	paths: {
		codemirror: '../lib/codemirror/lib/codemirror',
		jquery: '../lib/jquery/dist/jquery.min'
	}
})

require([ './main' ], () => { }, err => { throw err })
