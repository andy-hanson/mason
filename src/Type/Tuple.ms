use
	esast.dist.mangle-identifier
	..js defined? js-instanceof
	..private.bootstrap implContains
	..private.js-impl buildStr
	.Impl-Type
	.Kind kind!
	.Method self-impl!
	.Obj-Type
	.Type extract
use-debug
	..compare =?

access = |name
	"[\"{name}\"]"

get-prop = |case
	# TODO: pattern match :Array name type
	:Array
		name. _[0]
		id. mangle-identifier _[0]
		type. _[1]
	:String
		name. _
		id. mangle-identifier_

Tuple. Obj-Type
	props.
		name. String
		props. Object
		prototype. Object
	opt-props.
		# TODO make-callable. Function
		post-construct. Function
	extensible. true
	defaults.
		prototype. |
			Object.create Object.prototype
	make-callable. |tuple
		props = tuple.props.map get-prop

		args = @for props
			_.id
		argsStr = args.join ","

		src = buildStr |add!
			name = mangle-identifier tuple.name

			# TODO: Mangle name, use instead of `ctr`
			add! "
				return function {name}({argsStr}) \{
				if (!(this instanceof {name})) return new {name}({argsStr})

			for! props
				if! defined? _.type
					add! "_ms.checkContains({_.id}_type, {_.id}, \"{_.name}\")"

				add! "this{access _.name} = {_.id}"

			add! "
				if (arguments.length > {props.length})
					throw new Error("Only expected {props.length} args, got " + arguments.length)

			# TODO: make-callable

			if! defined? tuple.post-construct
				add! "postConstruct(this)"

			add! "}"

		type-args = @for props
			"{_.id}_type"
		make-ctr = Function "postConstruct" ...type-args src
		types = @for props
			_.type
		ctr = make-ctr tuple.post-construct ...types
		debug ctr.source = src
		ctr

	post-construct. !|_
		_.prototype.constructor = _
		accesses = @for prop in _.props
			"_{access (get-prop prop).name}"
		extract-src = "return function(_) \{ return _ instanceof tuple ? [ {accesses.join ","} ] : null }"
		make-extractor = Function "tuple" extract-src
		extractor = make-extractor _
		self-impl! extract _ extractor

	test. !|
		Vec2 = Tuple
			props.
				. "x"
				. [ "y" Number
		v = Vec2 1 2
		assert! =? 1 v.x
		assert! =? 2 v.y
		case! v
			:Vec2 x y
				assert! =? 1 x
				assert! =? 2 y

implContains Tuple .|_
	js-instanceof _ this

kind! Tuple Impl-Type
