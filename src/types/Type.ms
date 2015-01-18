use
	..Bool -> false
	.Impl-Type
	.Interface -> unchecked-implementor!
	.Method -> impl! impl-unchecked!
	..methods -> contains?
	..private.bootstrap -> any? has-or-in-proto? Fun

Type = Interface
	doc. "TODO"
	test. |
		"TODO"

unchecked-implementor! Impl-Type Type
unchecked-implementor! Method Type

\ TODO: Move
impl-unchecked! contains? Interface |iface _
	case
		any?_
			has-or-in-proto? _ iface.symbol-for-isa
		else
			false
	\ TODO:PERF \and any?_ ~(has-or-in-proto? _ iface.symbol-for-isa)

unchecked-implementor! Fun Impl-Type

\TODO:MOVE
unchecked-implementor! Method Type
impl! contains? Method |method value
	has-or-in-proto? value method.impl-symbol

Type
