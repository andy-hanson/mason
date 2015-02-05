use
	..Bool and
	..js any? defined? js-sub
	..methods contains?
	..private.bootstrap Fun
	.Impl-Type
	.Kind _ unchecked-implementor!
	.Method _ impl! impl-unchecked!
use~
	..Obj _ p-with-proto?

Type. Kind
	doc. "
		Anything implementing contains?.
		Types are generally used to succinctly make assertions about values.
	test. |
		"TODO"

unchecked-implementor! Impl-Type Type
unchecked-implementor! Method Type

\ TODO: Move
impl-unchecked! contains? Kind |kind _
	and any?_ ~(defined? (js-sub _ kind.symbol-for-isa))

unchecked-implementor! Fun Impl-Type

\TODO:MOVE
unchecked-implementor! Method Type
impl! contains? Method |method value
	p-with-proto? value method.impl-symbol

type-of.
	doc. "TODO"
	test. |
		[ () ] -> Obj
	|obj
		case
			any? obj
				case obj.constructor
					defined?_
						_
					else
						Obj
			else
				Obj

Type
