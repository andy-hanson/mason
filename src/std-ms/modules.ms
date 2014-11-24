use
	.bags.Array
	.bags.Bag -> flat-map
	.control -> if
	path
	q-io.fs

\ TODO: Portability
use-file. `require`

\ TODO: Better pattern for returning promises
promise-all-modules.
	doc. "TODO"
	|dir-path
		(fs.listTree dir-path).then |files:Array
			flat-map files |_
				if (_.endsWith ".js") |
					use-file "./{path.relative `__dirname` _}"
