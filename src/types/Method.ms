use
	..assert -> !
	..@.? -> un-?
	..Comparable -> =?
	.Impl-Type
	.Interface
	..js -> js-sub
	..math.Num
	..methods -> contains?
	..Object -> ?get-property
	..private.bootstrap -> Str Symbol Fun oh-no! get-or-undefined exists? set! set-mutable! has-or-in-proto? get writable?
	.Record-Type
	..Try -> !debug-fails?

make-callable-method = |method
	ret = case
		exists? method.wrap
			"return wrap(impl, Array.prototype.slice.call(arguments, 0))"
		else
			\ TODO:ES6 Splat call
			"return impl(a, b, c, d, e, f, g, h)"
	src = "
		return function(a, b, c, d, e, f, g,  h) \{
			var impl
			if (a == null)
				impl = def
			else \{
				impl = a["{method.impl-symbol}"]
				if (impl === undefined)
					impl = def
			}
			{ret}
		}
	f = Fun "def" "wrap" src
	f method.default method.wrap

Method = Record-Type
	doc. "
		TODO:REST
		The `doc` of the method should be its signature, followed by a string of the meaning.
		For example:
			sizeness.
				doc. |:Int _
					"How big it is."
				...
		The `wrap` property can replace the default calling mechanism.
		It will be given the implementation, then the method's arguments.
		You can use this to, for example, apply in/out conditions to every implementation.
			sizeness.
				wrap. |impl x
					out
						! >=? res 0
					impl x

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
		!debug-fails? |
			m 1 m

		! =? "wrap-call-arg"
			wrap-method = Method
				default. |_
					"call-{_}"
				wrap. |impl args
					\ TODO:Syntax splat call
					"wrap-{Fun.prototype.apply.call impl () args}"
			wrap-method "arg"

	members.
		displayName. Str  \ Required!
		impl-symbol. Str
		default. Fun
	optional-members.
		wrap. Fun
	defaults.
		impl-symbol. |_
			"impl-{_.displayName}"
		default. |_
			|target
				oh-no! ~"{_} not implemented for {target}"
	make-callable. make-callable-method

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
	dispatcher = case
		writable? implementor-0.prototype method.impl-symbol
			m = method
			dd = Double-Dispatcher
				displayName. "<double dispatcher>" \ TODO: "<Double dispatcher for {m.displayName}>"
				method. m
				first-type. implementor-0
				impl-symbol. Symbol "<double dispatcher>" \"{m} for {implementor-0.displayName}"
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
		writable? _.prototype method-symbol
			case!
				:Interface
					_.implementors.forEach |sub-implementor
						propagate-method-down! sub-implementor method-symbol implementation
				else
					\ Since this is inherited, it is mutable and can be overridden.
					set-mutable! _.prototype method-symbol implementation
		else
			()

Double-Dispatcher = Record-Type
	members.
		method. Method
		~first-type. Impl-Type
		impl-symbol. Symbol
	make-callable. |_
		|...args
			target-2 = js-sub args 1
			case!
				exists? target-2
					()
				else
					oh-no! ~"Can't double-dispatch {_.method} for undefined."

			impl = get-or-undefined target-2 _.impl-symbol
			case!
				exists? impl
					! contains? Fun impl
				else
					oh-no! ~"Can't double-dispatch {_.method} for {_.first-type} on {target-2}"
			Fun.prototype.apply.call impl () args

impl?.
	doc. "TODO"
	|method:Method type:Impl-Type
		has-or-in-proto? type.prototype method.impl-symbol

\ TODO: ?direct-impl-for
?impl-for.
	doc. "TODO"
	test. |
		"TODO"
	|method:Method type:Impl-Type
		?get-property type.prototype method.impl-symbol

impl-for.
	doc. "TODO"
	test. |
		"TODO"
	|method:Method type:Impl-Type
		un-? (?impl-for method type)

Method
