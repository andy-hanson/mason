use
	..Bool or
	..js defined? reference=?
	..methods <! <? contains?
	..private.bootstrap Fun Obj
	.Kind _ unchecked-implementor!
	.Method impl!
	.Obj-Type
use~
	..@ any?
	..Map each-pair!
debug use~
	.! _ !not

Impl-Type. Kind
	doc. "
		TODO:REST
		Every Impl-Type should have a `prototype` property.

impl! <? Impl-Type
	doc. "TODO"
	test. |
		A = Kind
			doc. "A"
		B = Kind
			doc. "B"
		C = Obj-Type
			members.
				c.
		<! B A
		<! C B
		! <? B A
		! <? C B
		! <? C A
		!not <? A B
	|implementor:Impl-Type kind:Kind
		case implementor
			:Kind
				any? _.super-kinds |super
					\ TODO: Just use `=? super kind` ?
					or (reference=? super kind) ~(<? super kind)
			else
				contains? kind implementor.prototype

impl! <! Impl-Type
	doc. "TODO"
	test. |
		"TODO"
		\ TODO: Assert no circular chains of <!.
	|implementor kind:Kind method-impls
		unchecked-implementor! implementor kind
		case! method-impls
			defined?_
				each-pair! _ |method implementation
					impl! method implementor implementation
			else
				()

unchecked-implementor! Obj-Type Impl-Type \ Obj-Type isa Obj-Type, so can't use <!
unchecked-implementor! Fun Impl-Type \ Fun isa Fun, so can't use <!
<! Kind Impl-Type

region Self-Type
	\ TODO: Wrap-Type
	Self-Type. Obj-Type
		doc. "TODO"
		members.
			prototype. Obj

	<! Self-Type Impl-Type

	self-type.
		doc. "TODO"
		test. |
			"TODO"
		|_:Obj
			Self-Type (prototype. _

Impl-Type
