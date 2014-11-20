doc. "TODO"

use
	.bags.Array -> ->Array
	.bags.Bag -> map
	.js -> global
	.show

log!.
	doc. "TODO"
	|
		args = Array.prototype.slice.call `arguments`
		\ TODO: mkString
		str-args = ->Array (map args show)
		global.console.log (str-args.join  " ")
