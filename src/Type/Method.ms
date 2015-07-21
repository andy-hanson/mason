use
	esast.dist.mangle-identifier
	..js defined? js=== js-sub js-typeof
	..private.bootstrap containsImplSymbol implContains msDef
	..private.js-impl buildStr methodArgNames
	.Obj-Type
use~
	..@.? un-?
	.Impl-Type _ self-type
	.Kind
	..Object p-with-proto?
use-debug
	..@.@-Type empty
	..@.?
	..assert assert-call!
	..compare =?
	..Try fails?

flag? = |_
	and defined?_ _

method-src = |method
	buildStr |add!
		has-args? = defined? method.args
		arg-names = case
			has-args?
				methodArgNames case method.args
					:Number # js=== (js-typeof _) "number" # TODO: :Number
						_
					:Array # js-instanceof _ Array # TODO: :Array
						_.length
			else
				"b,c,d"

		args = case
			js=== arg-names.length 0
				"a"
			else
				"a,{arg-names}"

		add! "return function {mangle-identifier method.name}({args}) \{"

		impl = case method.impl-symbol
			js=== (js-typeof _) "string" # TODO: :String
				"a[\"{_}\"]"
			:Symbol
				"a[symbol]"

		default? = defined? method.default
		wrap? = defined? method.wrap
		allow-null? = flag? method.allow-null?

		if! allow-null?
			assert! default? throw! "Method with `allow-null?` must have `default`."
		if! default?
			cond = case
				allow-null?
					"a == null || {impl} === undefined"
				else
					# TODO: Just implement it for Object
					"{impl} === undefined"
			add! case
				wrap?
					"if ({cond}) return wrap.apply(null, [def].concat(Array.prototype.slice.call(arguments)))"
				else
					"if ({cond}) return def.apply(a, Array.prototype.slice.call(arguments, 1))"

		add! case
			wrap?
				case
					has-args?
						"return wrap({impl},{args})"
					else
						"
							switch (arguments.length) \{
								case 1: return wrap({impl}, a)
								case 2: return wrap({impl}, a, b)
								case 3: return wrap({impl}, a, b, c)
								case 4: return wrap({impl}, a, b, c, d)
								default: throw new Error("Code not generated to handle "+arguments.length+"arguments.")
							}
			else
				case
					has-args?
						"return {impl}({arg-names})"
					else
						"
							switch (arguments.length) \{
								case 1: return {impl}()
								case 2: return {impl}(b)
								case 3: return {impl}(b,c)
								case 4: return {impl}(b,c,d)
								default: throw new Error("Code not generated to handle "+arguments.length+"arguments.")
							}

		add! "}"

make-callable-method = |method
	src = method-src method
	f = Function "symbol" "def" "wrap" src
	f method.impl-symbol method.default method.wrap

Method. Obj-Type
	doc. "
		A Method allows you to call a JavaScript-style method as a function.
		Unlike a Mason Method, for a Method,
		the first argument becomes `this` within the implementation's body.
		TODO: document `wrap`
	test. !|
		m = Method
			allow-null?. true
			default. |
				"default"
		impl! m String |
			"String"
		impl-double! m Number Number |
			"Number Number"
		impl-double! m Number String |
			"Number String"

		assert-call! m
			[ null ] -> "default"
			[ "a" ] -> "String"
			[ 1 1 ] -> "Number Number"
			[ 1 "a" ] -> "Number String"
		debug assert! fails? |
			m 1 m

		assert! =? "wrap-call-arg"
			wrap-method = Method
				default. .|
					"call-{this}"
				wrap. |impl arg
					"wrap-{impl.call arg}"
			wrap-method "arg"
	props.
		name. String
		impl-symbol. # TODO: Object-Key
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
			throw! "Must provide name."
		impl-symbol. |_
			"impl-{_.name}"
	make-callable. make-callable-method

impl!. !|method:Method implementor:Impl-Type implementation:Function
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
			_ = js-sub implementor-0.prototype method.impl-symbol
			assert! :Double-Dispatcher throw! "
				Can't define double dispatch of {method} for {implementor-0}.
				A single-dispatch implementation already exists: {_}.
			_

	do-impl! dispatcher implementor-1 implementation

self-impl!.
	doc. "TODO"
	test. !|
		pass # TODO
	!|method:Method implementor:Object implementation:Function
		impl! method (self-type implementor) implementation

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
		if and (defined? desc) (not desc.writable)
			desc.value

impl-for.
	doc. "impl-for that fails when there is no implementation."
	test. |
		[ contains? Method ] -> method-contains?
		# assert! (impl-for contains? Kind).call Impl-Type Kind
	|method:Method type:Impl-Type
		un-? (?impl-for method type) ~"{method} not implemented for {type}."


region Private
	writable? = |obj property
		desc = Object.getOwnPropertyDescriptor obj property
		or (not defined? desc) desc.writable

	p? = |obj property
		defined? (js-sub obj property)

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
			assert! writable? implementor.prototype method.impl-symbol throw!
				"Can not redefine method {method} for {implementor}."

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
			.|...args
				target-2 = js-sub args 0
				assert! defined? target-2 throw! "Can't double-dispatch {_.method} for undefined."
				impl = js-sub target-2 _.impl-symbol
				assert! defined? impl throw! "Can't double-dispatch {_.method} for {_.first-type} on {target-2}."
				assert! contains? Function impl
				Function.prototype.apply.call impl this args

contains? = Method
	doc. "
		|:Boolean collection value
		Whether some collection of things as as an element `value`."
	# args. 2 TODO
	impl-symbol. containsImplSymbol
msDef "contains" contains?

method-contains? = |method value
	p-with-proto? value method.impl-symbol

implContains Method method-contains?
