doc. "TODO"

use
	.bags.Array
	.bags.Bag -> map
	.basic-methods -> =>
	.js -> global
	.show

log!.
	doc. "TODO"
	|
		args = Array.prototype.slice.call `arguments`
		\ TODO: make-String
		str-args = => Array (map args show)
		global.console.log (str-args.join  " ")
