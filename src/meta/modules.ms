use
	path relative
	..$ _ $after
	..@ keep map'
	..compare sort
	..js new

# TODO:ES6 Use module reflection
commonJS-require. `require`

# TODO: Syntax for old CommonJS requires?
fs = commonJS-require "q-io/fs"

get-module.
	doc. "
		Gets a module at a given path.
		TODO: This can't be used by anyone not in the same directory as modules.ms.
	|module-path
		commonJS-require "./{relative this-module-directory module-path}"

$@module-in-dir.
	doc. "Every module in a directory and its subdirectories."
	|dir-path
		$after (q->es6-promise (fs.listTree dir-path)) |@file
			@js = keep @file |_
				_.endsWith ".js"
			# Sort so that modules load in deterministic order.
			map' (sort @js) get-module

# TODO: Don't want dependency on `q`
q->es6-promise = |q-promise
	new $ |resolve reject
		q-promise.then resolve
		q-promise.catch reject
