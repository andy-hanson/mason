doc. "TODO"

use
	.Array -> ->Array
	.Bag -> map
	.js -> global
	.Str -> ->Str

log!.
	doc. "TODO"
	|
		args = Array.prototype.slice.call `arguments`
		\ TODO: mkString
		str-args = ->Array (map args ->Str)
		global.console.log (str-args.join  " ")
