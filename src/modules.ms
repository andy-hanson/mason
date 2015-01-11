use
	.bags.Array
	.bags.Bag -> flat-map
	.control -> if
	.js-impl -> i-require

\ TODO: Portability
commonJS-require. i-require

\ TODO: Syntax for old CommonJS requires?
path = commonJS-require "path"
fs = commonJS-require "q-io/fs"

get-module.
	doc. "TODO"
	|module-path
		commonJS-require "./{path.relative this-module-directory module-path}"

\ TODO: Better pattern for returning promises
promise-all-modules.
	doc. "TODO"
	|dir-path
		(fs.listTree dir-path).then |files:Array
			flat-map files |_
				if (_.endsWith ".js") |
					get-module_
