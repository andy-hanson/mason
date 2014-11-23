use
	..assert -> !
	..bags.? -> un-?
	..bags.Bag -> each! empty?
	..Comparable -> =?
	.Impl-Type
	.Interface
	..maps.Map -> keys
	..math.Num
	..Object -> ?get-property add-property!
	..private.bootstrap -> Str Symbol Fun Array oh-no! true any? get-or-undefined exists? set! set-mutable! has? has-or-in-proto? get
	.Record-Type
	..Try -> fails?

apply = Fun.prototype.apply

Method = Record-Type
	doc. "
		TODO:REST
		The `doc` of the method should be its signature, followed by a string of the meaning.
		For example:
			sizeness.
				doc. |:Int _
					"How big it is."
				...
	test. |
		thunk  = |x |
			x
		m = Method
			default. thunk "default"
		impl! m Str (thunk "Str")
		impl! m Num Num (thunk "Num Num")
		impl! m Num Str (thunk "Num Str")
		! =? (m ()) "default"
		! =? (m "a") "Str"
		! =? (m 1 1) "Num Num"
		! =? (m 1 "a") "Num Str"
		! fails? |
			m 1 m

	members.
		displayName. Str  \ Required!
		impl-symbol. Symbol
		default. Fun
	defaults.
		impl-symbol. |_
			Symbol _.displayName
		default. |_
			|target
				oh-no! ~"{_} not implemented for {target}"
	make-callable. |method
		|target
			impl ::= ()
			\ Don't use `case` because that adds to the stacktrace.
			case! target
				any?_
					impl := get-or-undefined target method.impl-symbol
					case! impl
						exists?_
							()
						else
							impl := method.default
				else
					impl := method.default
			method-impl:Fun = impl
			\ TODO:ES6 method-impl(...arguments)
			apply.call method-impl () `arguments`
	extensible. true

impl!.
	doc. "TODO"
	|a b c d
		case!
			exists? d
				impl-double! a b c d
			else
				impl-single! a b c

impl-single! = |method:Method implementor:Impl-Type implementation:Fun
	impl-unchecked! method implementor implementation

\ TODO: MOVE
writable? = |object property
	case `global.Object`.getOwnPropertyDescriptor object property
		exists?_
			_.writable
		else
			true

impl-double! = |method:Method implementor-0:Impl-Type implementor-1:Impl-Type implementation:Fun
	dispatcher = case
		writable? implementor-0.prototype method.impl-symbol
			m = method
			dd = Double-Dispatcher
				displayName. "<Double dispatcher for {m}>"
				method. m
				first-type. implementor-0
				impl-symbol. Symbol "{m} for {implementor-0.displayName}"
			impl-unchecked! method implementor-0 dd
			dd
		else
			case get implementor-0.prototype method.impl-symbol
				:Double-Dispatcher
					_
				else
					oh-no! "
						Can't define double dispatch of {method} for {implementor-0}.
						A single-dispatch implementation already exists: {_}.

	impl-unchecked! dispatcher implementor-1 implementation

\ TODO: This will add to the prototype of an interface inheriting from another interface.
\ We only want to write to one interface's prototype.
\ "method" can be a method or a double dispatcher
impl-unchecked!. |method implementor implementation
	in
		case!
			writable? implementor.prototype method.impl-symbol
				()
			else
				oh-no! "Can not redefine method {method} for {implementor}."

	set! implementor.prototype method.impl-symbol implementation
	case! implementor
		:Interface
			_.implementors.forEach |sub
				propagate-method-down! sub method.impl-symbol implementation
		else
			()

\ TODO: Not public
propagate-method-down!. |implementor method-symbol implementation \ TODO: :Impl-Type :Symbol :Fun
	case! implementor
		has-or-in-proto? _.prototype method-symbol
			() \ Respect overrides
		:Interface
			_.implementors.forEach |sub-implementor
				propagate-method-down! sub-implementor method-symbol implementation
		else
			\ Since this is inherited, it is mutable and can be overridden.
			set-mutable! _.prototype method-symbol implementation


Double-Dispatcher = Record-Type
	members.
		method. Method
		first-type. Impl-Type
		impl-symbol. Symbol
	make-callable. |_
		|ignore target-2
			case!
				exists? target-2
					()
				else
					oh-no! ~"Can't double-dispatch {_.method} for undefined."

			impl = get-or-undefined target-2 _.impl-symbol
			case!
				exists? impl
					double-impl:Fun = impl
				else
					oh-no! ~"Can't double-dispatch {_.method} for {_.first-type} on {target-2}"
			apply.call impl () `arguments`

impl?.
	doc. "TODO"
	|method:Method type:Impl-Type
		has-or-in-proto? type.prototype method.impl-symbol

?impl-for. |method:Method type:Impl-Type
	?get-property type.prototype method.impl-symbol

impl-for. |method:Method type:Impl-Type
	un-? (?impl-for method type)

Method
