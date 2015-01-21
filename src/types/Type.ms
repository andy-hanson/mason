use
	..Bool -> and
	.Impl-Type
	.Interface -> unchecked-implementor!
	..js -> any? defined? js-sub
	.Method -> impl! impl-unchecked!
	..methods -> contains?
	..private.bootstrap -> Fun
use~
	..Obj -> p-with-proto?

Type = Interface
	doc. "TODO"
	test. |
		"TODO"

unchecked-implementor! Impl-Type Type
unchecked-implementor! Method Type

\ TODO: Move
impl-unchecked! contains? Interface |iface _
	and any?_ ~(defined? (js-sub _ iface.symbol-for-isa))

unchecked-implementor! Fun Impl-Type

\TODO:MOVE
unchecked-implementor! Method Type
impl! contains? Method |method value
	p-with-proto? value method.impl-symbol

Type
