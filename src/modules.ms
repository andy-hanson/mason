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

\ TODO: Better pattern for returning promises
promise-all-modules.
	doc. "TODO"
	|dir-path
		(fs.listTree dir-path).then |files:Array
			flat-map files |_
				if (_.endsWith ".js") |
					commonJS-require "./{path.relative this-module-directory _}"
