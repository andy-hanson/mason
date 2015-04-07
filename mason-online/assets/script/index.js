window.global = window

const isFirefox = /firefox/i.test(navigator.userAgent)

window.requirejs.config({
	paths: {
		mason: '../lib/mason',
		jquery: '../lib/jquery/dist/jquery.min'
	},
	scriptType: isFirefox ? 'text/javascript;version=1.8' : 'text/javascript'
})

// require([ 'mason/private/boot-order' ], () =>
//	require([ 'mason/meta/run-all-tests' ], rat => _ms.getModule(rat).default()))
require([ './mason-editor/mason-editor' ])
