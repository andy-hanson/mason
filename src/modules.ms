use
	.$ _ $after
	.@ keep map
	.@.Array
	.js new
	.Type =>

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
	doc. "
		Gets a module at a given path.
		TODO: This can't be used by anyone not in the same directory as modules.ms.
	|module-path
		commonJS-require "./{path.relative this-module-directory module-path}"

$@module-in-dir.
	doc. "Every module in a directory and its subdirectories."
	|dir-path
		$after (q->es6-promise (fs.listTree dir-path)) |@file
			@js = keep @file |_
				_.endsWith ".js"
			=> Array (map @js get-module

\ TODO: Don't want dependency on `q`
q->es6-promise = |q-promise
	new $ |resolve reject
		q-promise.then resolve
		q-promise.catch reject
