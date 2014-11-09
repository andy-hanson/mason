\ TODO: Put this somewhere else

use
	.--bootstrap -> syms Object
	.Method -> impl!

freeze. Method
	doc. "TODO"
	default. |_
		Object.freeze _

sub. Method
	doc. "
		This method has no special meaning and shouldn't be used polymorphically.
		Implement it to be able to subscript like `a[b]`.

	impl-symbol. `_ms.symSub`

type-of. Method
	doc. "TODO"
	\ TODO: Should be able to just make it here. No need for syms.
	impl-symbol. syms.type-of

impl! type-of Object |_
	`_.constructor`
