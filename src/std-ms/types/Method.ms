use
<<<<<<< HEAD
	..bags.Bag -> each!
	..Comparable -> =?
	.Impl-Type
	.Interface
	..maps.Map -> keys
	..Object -> ?get-property
	..private.bootstrap -> Str Symbol Fun Array oh-no! true any? get-or-undefined exists? set! has? has-or-in-proto? get
=======
	.Impl-Type
	.Interface
	..private.bootstrap -> Str Symbol Fun Array oh-no! true any? get-or-undefined exists? set! Object has? has-or-in-proto? get
>>>>>>> 9ddb097... Added missing files
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

<<<<<<< HEAD
impl-direct-unchecked! = |method special implementation
	set! special method.impl-symbol implementation

\ TODO: This will add to the prototype of an interface inheriting from another interface.
\ We only want to write to one interface's prototype.
\ Also, inherited methods should be set-mutable!
impl-unchecked!. |method implementor implementation
	impl-direct-unchecked! method implementor.prototype implementation
	method.implementing-types.push implementor
	case! implementor
=======
\ TODO: This will add to the prototype of an interface inheriting from another interface.
\ We only want to write to one interface's prototype.
\ Also, inherited methods should be set-mutable!
impl-unchecked!. |method type implementation
	\ TODO: Use set-in-proto!
	set! type.prototype method.impl-symbol implementation
	method.implementing-types.push type
	case! type
>>>>>>> 9ddb097... Added missing files
		:Interface
			_.implementors.forEach |sub
				impl-unchecked! method sub implementation
		else
			()

<<<<<<< HEAD
impl!.
	doc. "TODO"
	|method:Method implementor:Impl-Type implementation:Fun
		impl-unchecked! method implementor implementation

impl-direct!.
	doc. "`special` will directly implement the method as a singleton. TODO:REST"
	|method:Method special:Object implementation:Fun
		impl-direct-unchecked! method special implementation
=======
impl-direct!.
	doc. "`special` will directly implement the method as a singleton. TODO:REST"
	|method:Method special:Object implementation:Fun
		set! special method.impl-symbol implementation

impl!.
	doc. "TODO"
	|method:Method type:Impl-Type implementation:Fun
		in
			case!
				impl? method type
					\ TODO: REMOVE
					msg = "Already have {method} for {type}. Did you mean `impl-override!`?"
					`console.log(msg)`
					oh-no! ~"Already have {method} for {type}. Did you mean `impl-override!`?"
				else
					()

		impl-unchecked! method type implementation

impl-override!.
	doc. "TODO"
	|method:Method type:Impl-Type implementation:Fun
		in
			case!
				impl-direct? method type
					()
					\ TODO: This has false positives becuase we can't tell the difference between
					\ methods defined directly and false positives created by implementor!
					\ oh-no! "Can't override {method} - already defined exactly on {type}"
				impl? method type
					()
				else
					oh-no! ~"No need to override {method} for {type}"

		impl-unchecked! method type implementation

\ TODO: This gives false positives when interfaces copy methods
impl-direct?.
	doc. "TODO"
	|method:Method type:Impl-Type
		has? type.prototype method.impl-symbol
>>>>>>> 9ddb097... Added missing files

impl?.
	doc. "TODO"
	|method:Method type:Impl-Type
		has-or-in-proto? type.prototype method.impl-symbol

<<<<<<< HEAD
?impl-for. |method:Method type:Impl-Type
	?get-property type.prototype method.impl-symbol
=======
impl-for. |method:Method type:Impl-Type
	get type.prototype method.impl-symbol
>>>>>>> 9ddb097... Added missing files

Method
