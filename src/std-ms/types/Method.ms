use
	..bags.? -> un-?
	..bags.Bag -> each!
	..Comparable -> =?
	.Impl-Type
	.Interface
	..maps.Map -> keys
	..Object -> ?get-property
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
		default = method.default
		impl-symbol = method.impl-symbol
		|target
			impl ::= ()
			\ Don't use `case` because that adds to the stacktrace.
			case! target
				any? _
					impl := get-or-undefined target impl-symbol
					case! impl
						exists?_
							()
						else
							impl := default
				else
					impl := default
			method-impl:Fun = impl
			\ TODO:ES6 method-impl(...arguments)
			Fun.prototype.apply.call method-impl () `arguments`
	extensible. true

impl-direct-unchecked! = |method special implementation
	set! special method.impl-symbol implementation

\ TODO: This will add to the prototype of an interface inheriting from another interface.
\ We only want to write to one interface's prototype.
\ Also, inherited methods should be set-mutable!
impl-unchecked!. |method implementor implementation
	impl-direct-unchecked! method implementor.prototype implementation
	method.implementing-types.push implementor
	case! implementor
		:Interface
			_.implementors.forEach |sub
				impl-unchecked! method sub implementation
			_.direct-implementors.forEach |sub
				impl-direct! method sub implementation
		else
			()

impl!.
	doc. "TODO"
	|method:Method implementor:Impl-Type implementation:Fun
		impl-unchecked! method implementor implementation

impl-direct!.
	doc. "`special` will directly implement the method as a singleton. TODO:REST"
	|method:Method special:Object implementation:Fun
		impl-direct-unchecked! method special implementation

impl?.
	doc. "TODO"
	|method:Method type:Impl-Type
		has-or-in-proto? type.prototype method.impl-symbol

?impl-for. |method:Method type:Impl-Type
	?get-property type.prototype method.impl-symbol

impl-for. |method:Method type:Impl-Type
	un-? (?impl-for method type)

Method
