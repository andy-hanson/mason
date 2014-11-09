doc. "TODO"

\ TODO: TESTS

use
	.? -> ?none ?some
	.arithmetic-methods -> +
	.basic-methods -> sub
	.Bool
	.checks -> !
	.Fun -> fun-copy
	.Interface -> implementor!
	.js -> global
	.Map -> ?get has-key? keys
	.Method -> impl!
	.Object -> ?get-property add-property! get-property has-property? own-properties
	.pred-types -> Any
	.properties
	.Str

Dict =
	doc. "TODO"
	test. |
		"TODO"

	empty. `_ms.Dict()`
	`_ms`.Dict

impl! + Dict |_ dict2:Dict
	union = `{}`
	names1 = keys_
	names2 = keys dict2
	names1.forEach |name
		add-property! union name
	names2.forEach |name
		add-property! union name
	Dict union

impl! ?get Dict ?get-property

impl! keys Dict own-properties
\ TODO: Sugar?
implementor! Dict Map

Dict

