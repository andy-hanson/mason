use
	.$ _ $after
	.@ keep map
	.@.Array
	.js new
	.methods =>
	.private.js-impl i-require

\ TODO: Portability
commonJS-require. `require`

\ TODO: Syntax for old CommonJS requires?
path = commonJS-require "path"
fs = commonJS-require "q-io/fs"

get-global-module.
	doc. "KLUDGE: `use` syntax works with ES6 modules"
	|name
		commonJS-require name

get-module.
	doc. "TODO"
	|module-path
		commonJS-require "./{path.relative this-module-directory module-path}"

$@module-in-dir.
	doc. "TODO"
	|dir-path
		$after (q->es6-promise (fs.listTree dir-path)) |files:Array
			js = keep files |_
				_.endsWith ".js"
			=> Array (map js get-module

q->es6-promise = |q-promise
	new $ |resolve reject
		q-promise.then resolve
		q-promise.catch reject
