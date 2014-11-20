use
	..assert -> !
	..bags.? -> un-?
	..bags.Bag -> each! empty?
	..Comparable -> =?
	..Error -> fails?
	.Impl-Type
	.Interface
	..maps.Map -> keys
	..math.Num
	..Object -> ?get-property add-property!
	..private.bootstrap -> Str Symbol Fun Array oh-no! true any? get-or-undefined exists? set! has? has-or-in-proto? get
	.Record-Type

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
		implementing-types. Array
	defaults.
		impl-symbol. |_
			Symbol _.displayName
		default. |_
			|target
				oh-no! ~"{_} not implemented for {target}"
		implementing-types. |
			`[]`
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
			Fun.prototype.apply.call method-impl () `arguments`
	extensible. true

\ TODO: This will add to the prototype of an interface inheriting from another interface.
\ We only want to write to one interface's prototype.
\ Also, inherited methods should be set-mutable!
impl-unchecked!. |method implementor implementation
	set! implementor.prototype method.impl-symbol implementation
	method.implementing-types.push implementor
	case! implementor
		:Interface
			_.implementors.forEach |sub
				impl-unchecked! method sub implementation
		else
			()

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

impl-double! = |method:Method implementor-0:Impl-Type implementor-1:Impl-Type implementation:Fun
	dispatcher = case ?get-property implementor-0.prototype method.impl-symbol
		empty?_
			m = method
			dd = Double-Dispatcher
				method. m
				first-type. implementor-0
				impl-symbol. Symbol "{m} for {implementor-0}"
			add-property! implementor-0.prototype method.impl-symbol dd
			dd
		else
			\ TODO: case _.val
			dd = _.val
			case dd
				:Double-Dispatcher
					_
				else
					oh-no! "
						Can't define double dispatch of {method} for {implementor-0}.
						A single-dispatch implementation already exists: {dd}."

	add-property! implementor-1.prototype dispatcher.impl-symbol implementation


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
					oh-no! "Can't double-dispatch {_.method} for undefined."

			impl = get-or-undefined target-2 _.impl-symbol
			case!
				exists? impl
					double-impl:Fun = impl
				else
					oh-no! "Can't double-dispatch {_.method} for {_.first-type} on {target-2}"
			Fun.prototype.apply.call impl () `arguments`

impl?.
	doc. "TODO"
	|method:Method type:Impl-Type
		has-or-in-proto? type.prototype method.impl-symbol

?impl-for. |method:Method type:Impl-Type
	?get-property type.prototype method.impl-symbol

impl-for. |method:Method type:Impl-Type
	un-? (?impl-for method type)

Method
