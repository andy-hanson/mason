\ TODO: Put this somewhere else

use
	.private.bootstrap -> syms Object \ TODO
	.types.Method -> impl!

freeze. Method
	doc. "TODO"
	default. Object.freeze

sub. Method
	doc. "
		This method has no special meaning and shouldn't be used polymorphically.
		Implement it to be able to subscript like `a[b]`.

	impl-symbol. `_ms.symSub`

type-of. Method
	doc. "TODO"
	\ TODO: Should be able to just make it here. No need for syms.
	impl-symbol. syms.type-of

\ TODO: Find better place for this. math-methods?
length. Method
	doc. "TODO"

impl! type-of Object |_
	`_.constructor`
