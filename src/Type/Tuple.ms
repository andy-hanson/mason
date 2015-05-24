use
	esast.dist.mangle-identifier
	..js defined? js-instanceof
	..private.bootstrap implContains pAdd
	..private.js-impl buildStr
	.Impl-Type
	.Kind kind!
	.Method self-impl!
	.Obj-Type
	.Type extract
use-debug
	..!
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

Tuple = Obj-Type
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

		# TODO: Mangle names!
		args = props.map |_
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

		type-args = props.map |_
			"{_.id}_type"
		make-ctr = Function "postConstruct" ...type-args src
		types = props.map |prop
			prop.type
		ctr = make-ctr tuple.post-construct ...types
		debug pAdd ctr "source" src
		ctr

	post-construct. |_
		pAdd _.prototype "constructor" _
		accesses = (_.props.map get-prop).map |_
			"_{access _.name}"
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
		! =? 1 v.x
		! =? 2 v.y
		case! v
			:Vec2 x y
				! =? 1 x
				! =? 2 y

implContains Tuple |tuple _
	js-instanceof _ tuple

kind! Tuple Impl-Type

Tuple
