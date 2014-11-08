doc. "TODO"

\ TODO: TESTS

use
	.? -> ?none ?some
	.Map -> ?get has-key? keys
	.arithmetic-methods -> +
	.basic-methods -> sub
	.Bool
	.checks -> !
	.js -> global
	.Method -> impl!
	.Object -> ?get-property add-property! get-property has-property?
	.pred-types -> Any
	.Str

Dict =
	empty. `_ms.Dict()`
	`_ms`.Dict

impl! keys Dict global.Object.getOwnPropertyNames

impl! + Dict |_ dict2:Dict
	\ doc
	\	Union

	union = `{}`
	names1 = keys_
	names2 = keys dict2
	names1.forEach |name
		add-property! union name
	names2.forEach |name
		add-property! union name
	Dict union

impl! ?get Dict |_ name:Str
	?get-property _ name

impl! has-key? Dict |dict key
	has-property? dict key

impl! sub Dict |dict key
	get-property dict key

\ TODO: implement iterator Dict -- or will harmony do it for me?

\ TODO: implementor! Dict Map and use sugar to implement methods

Dict

