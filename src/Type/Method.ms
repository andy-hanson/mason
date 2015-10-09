import
	global _ JSON
	..js defined? js=== js-delete js-instanceof js-sub js-typeof
	..private.bootstrap containsImplSymbol implContains msDef pAdd
import~
	..@.? un-?
	.Impl-Type _ Self-Type
	.Kind
	..Object ?p p-with-proto?

flag? = |_
	and defined?_ _

random-digits = |
	Math.random().toString().slice 2

build-str = |builder
	built-str ::= ""
	builder !|part
		built-str := "{built-str}{part}\n"
	built-str

str-lit = |str
	JSON.stringify str

Method. class Function
	todo doc

	construct! params
		method-name = params.name
		todo  :String
		assert! defined? method-name throw! "Must provide method name."

		default? = defined? params.default
		wrap? = defined? params.wrap
		allow-null? = flag? params.allow-null?
		assert! or (not allow-null?) default? throw! "Method with `allow-null?` must have `default."

		secret-name = "__method_{method-name}_{random-digits()}"

		impl-symbol = case params.impl-symbol
			defined?_
				_
			else
				Symbol method-name

		has-args? = defined? params.args
		num-args = case params.args
			js=== js-typeof_ "number"
				_
			js-instanceof _ Array
				_.length
			not defined?_
				-1

		src = build-str |add!
			access-method = "global[{str-lit secret-name}]"

			impl = case impl-symbol
				js=== js-typeof_ "symbol"
					"a[{access-method}[\"impl-symbol\"]]"
				:String
					"a[{str-lit _}]"

			if! default?
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
						1
							"a"
						2
							"a, b"
						3
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

		switch! num-args
			1
				super! "a" src
			2
				super! "a" "b" src
			3
				super! "a" "b" "c" src
			else
				super! "a" "b" "c" "d" src

		todo ES6 Shouldn't be necessary
		todo See https://code.google.com/p/v8/issues/detail?id=4087
		Object.setPrototypeOf this Method.prototype

		pAdd global secret-name this

		js-delete params "name"
		js-delete params "impl-symbol"
		Object.assign this params
		.impl-symbol = impl-symbol
		Object.defineProperty this "name"
			value. method-name

	todo Consider making kind! Method Type. Then this is redundant.
	"toString" |
		.name

impl!. !|method:Method implementor:Impl-Type implementation:Function
	do-impl! method implementor implementation

impl-double!. !|method:Method implementor-0:Impl-Type implementor-1:Impl-Type implementation:Function
	dispatcher = case
		writable? implementor-0.prototype method.impl-symbol
			dd = new Double-Dispatcher method
			do-impl! method implementor-0 dd
			dd
		else
			_ = js-sub implementor-0.prototype method.impl-symbol
			assert! :Double-Dispatcher throw! "
				Can't define double dispatch of {method} for {implementor-0}.
				A single-dispatch implementation already exists: {_}.
			_

	do-impl! dispatcher implementor-1 implementation

self-impl!. !|method:Method implementor:Object implementation:Function
	todo doc
	impl! method (new Self-Type implementor) implementation

?impl-for. |method:Method type:Impl-Type
	| Implementation of a method for a particular Impl-Type.
	| Does not reference method.default or impls on super-types.
	| Empty if the type would use method.default.
	?self-impl-for method type.prototype

impl-for. |method:Method type:Impl-Type
	| impl-for that fails when there is no implementation.
	un-? (?impl-for method type) ~"{method} not implemented for {type}."

?self-impl-for. |method:Method object
	todo doc
	?p object method.impl-symbol

self-impl-for. |method:Method object
	todo doc
	un-? (?self-impl-for method object) ~"{method} not implemented on {object}."

region Private
	writable? = |obj property
		desc = Object.getOwnPropertyDescriptor obj property
		or (not defined? desc) desc.writable

	todo Not public
	propagate-method-down!. !|implementor method-symbol implementation
		todo :Impl-Type :Symbol :Function
		unless! Object.prototype.hasOwnProperty.call implementor.prototype method-symbol
			case! implementor
				:Kind
					for! sub-implementor in _.implementors
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
	|| "method" can be a Method or a Double-Dispatcher.
	do-impl! = !|method implementor implementation
		in
			assert! writable? implementor.prototype method.impl-symbol throw!
				"Can not redefine method {method} for {implementor}."

		Object.defineProperty implementor.prototype method.impl-symbol
			value. implementation
			writable. false
			configurable. false
			enumerable. false

		if! implementor:Kind
			for! implementor.implementors
				propagate-method-down! _ method.impl-symbol implementation

	Double-Dispatcher = class Function
		construct! method
			impl-symbol = Symbol "{method.name}_double_dispatch"
			secret-name = "__double_dispatch_{random-digits()}"
			pAdd global secret-name impl-symbol

			super! "
				target2 = arguments[0]
				if (target2 === undefined)
					throw new Error("Can't double-dispatch {method.name} for undefined.")
				impl = target2[global.{secret-name}]
				if (impl === undefined)
					throw new Error(`Can't double-dispatch {method.name} for $\{this} on $\{target2}.`)
				return impl.apply(this, arguments)

			todo ES6 Shouldn't be necessary
			Object.setPrototypeOf this Double-Dispatcher.prototype

			.method = method
			.impl-symbol = impl-symbol
			Object.defineProperty this "name"
				value. "{method.name}__double-dispatcher"

contains? = new Method
	| Whether some collection of things as as an element `instance`.
	name.
	args.
		. "type"
		. "instance"
	impl-symbol. containsImplSymbol
msDef "contains" contains?

method-contains? = |method value
	p-with-proto? value method.impl-symbol

implContains Method method-contains?
