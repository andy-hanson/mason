use
	.Impl-Type
	.Interface -> unchecked-implementor!
	.Method -> impl! impl-unchecked!
	..private.bootstrap -> sym-contains? Bool any? has-or-in-proto? false Fun

\ TODO: MOVE
contains?. Method
	doc. |:Bool type:Type value
		"TODO"
	impl-symbol. sym-contains?

Type = Interface
	doc. "TODO"

unchecked-implementor! Impl-Type Type
unchecked-implementor! Method Type

\ TODO: Move
\ TODO: Use `and`
impl-unchecked! contains? Interface |iface value
	case value
		any?_
			has-or-in-proto? _ iface.symbol-for-isa
		else
			false

unchecked-implementor! Fun Impl-Type

\TODO:MOVE
unchecked-implementor! Method Type
impl! contains? Method |method value
	has-or-in-proto? value method.impl-symbol

Type
