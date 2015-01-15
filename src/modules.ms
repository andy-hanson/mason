use
	.$ -> $after
	.@ -> flat-map
	.@.Array
	.control -> if
	.js-impl -> i-require
	.js -> new

\ TODO: Portability
commonJS-require. i-require

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

\ TODO: Better pattern for returning promises
$all-modules.
	doc. "TODO"
	|dir-path
		$after (q->es6-promise (fs.listTree dir-path)) |files:Array
			flat-map files |_
				if (_.endsWith ".js") |
					get-module_

q->es6-promise = |q-promise
	new $ |resolve reject
		q-promise.then resolve
		q-promise.catch reject
