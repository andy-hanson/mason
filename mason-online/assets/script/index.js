window.global = window

window.requirejs.config({
	paths: {
		mason: '../lib/mason',
		jquery: '../lib/jquery/dist/jquery.min'
	}
})

// require([ 'mason/private/boot-order' ], () =>
//	require([ 'mason/meta/run-all-tests' ], rat => _ms.getModule(rat).default()))
require([ './mason-editor/mason-editor' ])
