use
	.--bootstrap -> syms Bool Str type-!sub any? has-or-in-proto? false Fun Object
	.Impl-Type
	.Interface -> unchecked-implementor!
	.Method -> impl! impl-unchecked!

subsumes?. Method
	doc. |:Bool type:Type subsumed
		"TODO"
	impl-symbol. syms.sub?

!subsumes. Method
	doc. |type:Type subsumed name:Str
		"TODO"
	impl-symbol. syms.!sub

Type = Interface
	doc. "TODO"
	test. |
		!subsumes Type Fun
	methods.
		. subsumes?
		. !subsumes

\ TODO: Determine which actually have to be unchecked

unchecked-implementor! Impl-Type Type
unchecked-implementor! Method Type

impl-unchecked! !subsumes Type type-!sub

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
