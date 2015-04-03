use
	..$ $resolved
	..private.bootstrap msCall
use~
	# TODO: Actually lazily get this module.
	..modules-list

# TODO
req. `require`

$get-module.
	doc. "TODO"
	|module-path
		$resolved (msCall "getModule" (req module-path
		# TODO
		# TODO:ES6 Shouldn't need `new`
		#new $ |resolve reject
		#	const get = |module-content
		#		resolve (msCall "getModule" module-content
		#	require [ module-path ] get reject

# TODO: Misnamed, takes no parameter.
# TODO: Lazily load text of modules. $resolved is a hack.
$@module-in-dir.
	doc. "Every module in a directory and its subdirectories."
	|
		$resolved modules-list
	# TODO
	# TODO:ES6 Shouldn't need `new`
	#new $ |resolve reject
	#	require [ '../modules-list' ] resolve reject
