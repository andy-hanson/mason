import
	global _ JSON
	..js defined? js=== js-delete js-instanceof js-sub js-typeof
	..private.bootstrap addProperty implContains msDef
import~
	..@.? un-?
	.Impl-Type _ Self-Type
	.Kind
	..Object ?property property-with-proto?

flag? = |_
	and defined?_ _

random-digits = |
	Math.random().toString().slice 2

build-str = |builder
	built-str = ""
	builder !|part
		built-str := "{built-str}{part}\n"
	built-str

str-lit = |str
	JSON.stringify str

Method. class Function
	todo doc

	construct params
		method-name = params.name
		todo  :String
		assert defined? method-name throw "Must provide method name."

		default? = defined? params.default
		wrap? = defined? params.wrap
		allow-null? = flag? params.allow-null?
		assert or (not allow-null?) default? throw "Method with `allow-null?` must have `default."

		secret-name = "__method_{method-name}_{random-digits()}"

		impl-symbol = case params.impl-symbol
			defined?_
				_
			else
				Symbol method-name

		has-args? = defined? params.args
		num-args = case params.args
			js=== js-typeof_ 'number
				_
			js-instanceof _ Array
				_.length
			not defined?_
				-1

		src = build-str |add!
			access-method = "global[{str-lit secret-name}]"

			impl = switch js-typeof impl-symbol
				'symbol
					"a[{access-method}[\"impl-symbol\"]]"
				'string
					"a[{str-lit impl-symbol}]"

			if default?
				no-impl = case
					allow-null?
						"a == null || {impl} === undefined"
					else
						todo  Just implement it for Object?
						"{impl} === undefined"
				call = case
					wrap?
						"{access-method}.wrap.apply(null, [{access-method}.default].concat(Array.prototype.slice.call(arguments)))"
					else
						"{access-method}.default.apply(a, Array.prototype.slice.call(arguments, 1))"
				add! "if ({no-impl}) return {call}"

			wrap = "{access-method}.wrap"

			add! case
				has-args?
					args = switch num-args
						0
							'a
						1
							"a, b"
						2
							"a, b, c"

					case
						wrap?
							"return {wrap}({impl}, {args})"
						else
							|| Don't need leading `a, `
							"return {impl}({args.slice 3})"
				wrap?
					"
						switch (arguments.length) \{
							case 1: return {wrap}({impl}, a)
							case 2: return {wrap}({impl}, a, b)
							case 3: return {wrap}({impl}, a, b, c)
							case 4: return {wrap}({impl}, a, b, c, d)
							default: throw new Error(`Code not generated to handle $\{arguments.length} arguments.`)
						}
				else
					"
						switch (arguments.length) \{
							case 1: return {impl}()
							case 2: return {impl}(b)
							case 3: return {impl}(b, c)
							case 4: return {impl}(b, c, d)
							default: throw new Error(`Code not generated to handle $\{arguments.length} args.`)
						}

		switch num-args
			0
				super 'a src
			1
				super 'a 'b src
			2
				super 'a 'b 'c src
			else
				super 'a 'b 'c 'd src

		todo ES6 Shouldn't be necessary
		todo See https://code.google.com/p/v8/issues/detail?id=4087
		Object.setPrototypeOf this Method.prototype

		addProperty global secret-name this

		js-delete params 'name
		js-delete params 'impl-symbol
		Object.assign this params
		.impl-symbol = impl-symbol
		Object.defineProperty this 'name
			value. method-name

	todo Consider making kind! Method Type. Then this is redundant.
	'toString |
		.name

msDef 'method |-name args default
	new Method
		name. -name
		args.
		if defined? default
			default.

impl!. !|_:Method implementor:Impl-Type implementation:Function
	do-impl! _ implementor implementation

impl-double!. !|_:Method implementor-0:Impl-Type implementor-1:Impl-Type implementation:Function
	dispatcher = case
		writable? implementor-0.prototype _.impl-symbol
			with new Double-Dispatcher _ as dd
				do-impl! _ implementor-0 dd
		else
			with js-sub implementor-0.prototype _.impl-symbol as impl
				assert impl:Double-Dispatcher throw "
					Can't define double dispatch of {_} for {implementor-0}.
					A single-dispatch implementation already exists: {impl}.

	do-impl! dispatcher implementor-1 implementation

self-impl!. !|_:Method implementor:Object implementation:Function
	todo doc
	impl! _ (new Self-Type implementor) implementation

?impl-for. |_:Method implementor:Impl-Type
	| Implementation of a method for a particular Impl-Type.
	| Does not reference method.default or impls on super-types.
	| Empty if the type would use method.default.
	?self-impl-for _ implementor.prototype

impl-for. |_:Method implementor:Impl-Type
	| impl-for that fails when there is no implementation.
	un-? (?impl-for _ implementor) ~"{_} not implemented for {implementor}."

?self-impl-for. |_:Method object
	todo doc
	?property object _.impl-symbol

self-impl-for. |_:Method object
	todo doc
	un-? (?self-impl-for _ object) ~"{_} not implemented on {object}."

region Private
	writable? = |obj property
		desc = Object.getOwnPropertyDescriptor obj property
		or (not defined? desc) desc.writable

	todo Not public
	propagate-method-down!. !|implementor method-symbol implementation
		todo :Impl-Type :Symbol :Function
		unless Object.prototype.hasOwnProperty.call implementor.prototype method-symbol
			case implementor
				:Kind
					for sub-implementor of _.implementors
						propagate-method-down! sub-implementor method-symbol implementation
				else
					todo What to do in case of multiple inheritance collision?
					|| Since this is inherited, it is mutable and can be overridden.
					Object.defineProperty _.prototype method-symbol
						value. implementation
						writable. true
						configurable. true
						enumerable. false

	todo Multiple-inheritance proxy scheme
	|| `_` can be a Method or a Double-Dispatcher.
	do-impl! = !|_ implementor implementation
		assert writable? implementor.prototype _.impl-symbol throw
			"Can not redefine method {_} for {implementor}."

		Object.defineProperty implementor.prototype _.impl-symbol
			value. implementation
			writable. false
			configurable. false
			enumerable. false

		if implementor:Kind
			for sub-impl of implementor.implementors
				propagate-method-down! sub-impl _.impl-symbol implementation

	Double-Dispatcher = class Function
		construct meth
			impl-symbol = Symbol "{meth.name}_double_dispatch"
			secret-name = "__double_dispatch_{random-digits()}"
			addProperty global secret-name impl-symbol

			super "
				target2 = arguments[0]
				if (target2 === undefined)
					throw new Error("Can't double-dispatch {meth.name} for undefined.")
				impl = target2[global.{secret-name}]
				if (impl === undefined)
					throw new Error(`Can't double-dispatch {meth.name} for $\{this} on $\{target2}.`)
				return impl.apply(this, arguments)

			todo ES6 Shouldn't be necessary
			Object.setPrototypeOf this Double-Dispatcher.prototype

			.method = meth
			.impl-symbol = impl-symbol
			Object.defineProperty this 'name
				value. "{meth.name}__double-dispatcher"

todo test
implContains Method .|_
	property-with-proto? _ .impl-symbol
