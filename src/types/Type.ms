use
	..assert -> !
	.Impl-Type
	.Interface -> unchecked-implementor!
	.Method -> impl! impl-unchecked!
	..private.bootstrap -> sym-subsumes? Bool any? has-or-in-proto? false Fun Object

subsumes?. Method
	doc. |:Bool type:Type subsumed
		"TODO"
	impl-symbol. sym-subsumes?

Type = Interface
	doc. "TODO"

unchecked-implementor! Impl-Type Type
unchecked-implementor! Method Type

\ TODO: Move
\ TODO: Use `and`
impl-unchecked! subsumes? Interface |iface subsumed
	case subsumed
		any?_
			has-or-in-proto? _ iface.symbol-for-isa
		else
			false

unchecked-implementor! Fun Impl-Type

\TODO:MOVE
unchecked-implementor! Method Type
impl! subsumes? Method |method subsumed
	case subsumed
		:Object
			has-or-in-proto? _ method.impl-symbol
		else
			false

Type
