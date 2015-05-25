use
	esast.dist.mangle-identifier
	..Boolean and implies not
	..js defined? js! js=== js-instanceof js-sub
	# Don't want to depend on Try because that can cause circular dependency problems.
	..private.js-impl buildStr methodArgNames ohNo
	..private.bootstrap implContains msDef containsImplSymbol
	.Obj-Type
use~
	..!
	..@.? un-?
	..control if
	..Function noop
	..Object p-with-proto?
	.Impl-Type _ self-type
	.Kind
use-debug
	..@.@-Type empty
	..@.?
	..compare =?
	..Function thunk
	..private.bootstrap pAdd
	..Try fails?

flag? = |case
	defined?_
		js! (js=== _ false)
	else
		false

method-src = |method
	buildStr |add!
		has-args? = defined? method.args
		arg-names = case
			has-args?
				methodArgNames case method.args
					:Number
						_
					js-instanceof _ Array # TODO: :Array
						_.length
			else
				"a, b, c, d"

		add! "return function {mangle-identifier method.name}({arg-names}) \{"
		if! flag? method.allow-null?
			debug unless! defined? method.default
				ohNo "Method with `allow-null?` must have `default`."
			add! "if (a == null) return def.apply(null, arguments)"

		impl = case
			defined? method.default
				"(a[\"{method.impl-symbol}\"] || def)"
			else
				"a[\"{method.impl-symbol}\"]"

		call = case
			defined? method.wrap
				"wrap({impl}, "
			else
				"{impl}("

		add! case
			has-args?
				"return {call}{arg-names})"
			else
				# TODO:ES6 (...args) => { call(...args) }
				"
					switch (arguments.length) \{
						case 1: return {call}a)
						case 2: return {call}a, b)
						case 3: return {call}a, b, c)
						case 4: return {call}a, b, c, d)
						default: throw new Error("Code not generated to accept " + arguments.length + " arguments.")
					}
		add! "}"

make-callable-method = |method
	src = method-src method
	f = Function "def" "wrap" src
	call = f method.default method.wrap
	debug pAdd call "source" src
	call

Method. Obj-Type
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

	test. !|
		m = Method
			allow-null?. true
			default. thunk "default"
		impl! m String (thunk "String")
		impl-double! m Number Number (thunk "Number Number")
		impl-double! m Number String (thunk "Number String")
		! =? (m null) "default"
		! =? (m "a") "String"
		! =? (m 1 1) "Number Number"
		! =? (m 1 "a") "Number String"
		debug ! fails? |
			m 1 m

		! =? "wrap-call-arg"
			wrap-method = Method
				default. |_
					"call-{_}"
				wrap. |impl arg
					"wrap-{impl arg}"
			wrap-method "arg"

	props.
		name. String
		impl-symbol. String
	opt-props.
		args. # TODO: Number or Array
		default. Function
		allow-null?. Boolean
		wrap. Function
	extensible. true
	defaults.
		# TODO:DISPLAYNAME
		# Shouldn't need to provide this, but otherwise defaults.name is a string and is called...
		name. !|
			ohNo "Must provide name."
		impl-symbol. |_
			"impl-{_.name}"
	make-callable. make-callable-method

impl!.
	doc. "Implements a Method for a type or types."
	test. "See Method.test."
	!|method:Method implementor:Impl-Type implementation:Function
		do-impl! method implementor implementation

impl-double!. !|method:Method implementor-0:Impl-Type implementor-1:Impl-Type implementation:Function
	dispatcher = case
		writable? implementor-0.prototype method.impl-symbol
			m = method
			dd = Double-Dispatcher
				name. "<double dispatcher>" # TODO: "<Double dispatcher for {m.name}>"
				method. m
				first-type. implementor-0
				impl-symbol. Symbol "<double dispatcher>" # TODO: "{m} for {implementor-0.name}"
			do-impl! method implementor-0 dd
			dd
		else
			case js-sub implementor-0.prototype method.impl-symbol
				:Double-Dispatcher
					_
				else
					ohNo "
						Can't define double dispatch of {method} for {implementor-0}.
						A single-dispatch implementation already exists: {_}.

	do-impl! dispatcher implementor-1 implementation

self-impl!.
	doc. "TODO"
	test. !|
		pass # TODO
	!|method:Method implementor:Object implementation:Function
		impl! method (self-type implementor) |implementor ...args
			noop implementor
			implementation ...args

?impl-for.
	doc. "
		Implementation of a method for a particular Impl-Type.
		Does not reference method.default or impls on super-types.
		Empty if the type would use method.default.
	test. |
		[ contains? Method ] -> ? method-contains?
		[ =? Method ] -> empty ?
	|method:Method type:Impl-Type
		# TODO: Object.ms Function
		desc = Object.getOwnPropertyDescriptor type.prototype method.impl-symbol
		if (and (defined? desc) ~(not desc.writable)) ~desc.value

impl-for.
	doc. "impl-for that fails when there is no implementation."
	test. |
		[ contains? Method ] -> method-contains?
		! (impl-for contains? Kind) Impl-Type Kind
	|method:Method type:Impl-Type
		un-? (?impl-for method type) ~"{method} not implemented for {type}."


region Private
	writable? = |obj property
		desc = Object.getOwnPropertyDescriptor obj property
		implies (defined? desc) ~desc.writable

	p? = |obj property
		defined? (js-sub obj property

	# TODO: Not public
	propagate-method-down!. !|implementor method-symbol implementation # TODO: :Impl-Type :Symbol :Function
		unless! p? implementor.prototype method-symbol
			case! implementor
				:Kind
					for! sub-implementor in _.implementors
						propagate-method-down! sub-implementor method-symbol implementation
				else
					# TODO: What to do in case of multiple inheritance collision?
					# Since this is inherited, it is mutable and can be overridden.
					Object.defineProperty _.prototype method-symbol
						value. implementation
						writable. true
						configurable. true
						enumerable. false

	# TODO: Multiple-inheritance proxy scheme for Obj-Type, Wrap-Type, Enum
	# "method" can be a Method or a Double-Dispatcher.
	do-impl! = !|method implementor implementation
		in
			unless! writable? implementor.prototype method.impl-symbol
				ohNo "Can not redefine method {method} for {implementor}."

		Object.defineProperty implementor.prototype method.impl-symbol
			value. implementation
			writable. false
			configurable. false
			enumerable. false

		if! contains? Kind implementor
			for! implementor.implementors
				propagate-method-down! _ method.impl-symbol implementation

	Double-Dispatcher = Obj-Type
		props.
			name. String
			method. Method
			first-type. # TODO: Impl-Type
			impl-symbol. Symbol
		make-callable. |_
			|...args
				target-2 = js-sub args 1

				! (defined? target-2) ~"Can't double-dispatch {_.method} for undefined."

				impl = js-sub target-2 _.impl-symbol
				debug case!
					defined? impl
						! contains? Function impl
					else
						ohNo ~"Can't double-dispatch {_.method} for {_.first-type} on {target-2}"
				impl ...args

method-contains? = |method value
	p-with-proto? value method.impl-symbol
implContains Method method-contains?

contains? = Method
	doc. "
		|:Boolean collection value
		Whether some collection of things as as an element `value`."
	# args. 2 TODO
	impl-symbol. containsImplSymbol
msDef "contains" contains?
