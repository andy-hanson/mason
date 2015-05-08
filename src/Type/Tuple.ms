use
	esast.dist.mangle-identifier
	..control if!
	..js defined? js-instanceof
	..private.bootstrap Fun impl-contains?! Obj p+! Str
	..private.js-impl buildStr
	.Impl-Type
	.Kind kind!
	.Method self-impl!
	.Obj-Type
	.Type extract
use-debug
	..!
	..compare =?
	..math.Num

access = |name
	"[\"{name}\"]"

get-prop = |case
	# TODO: pattern match :Array name type
	:Array
		name. _[0]
		id. mangle-identifier _[0]
		type. _[1]
	:Str
		name. _
		id. mangle-identifier_

Tuple = Obj-Type
	props.
		displayName. Str
		props. Obj
		prototype. Obj
	opt-props.
		# TODO make-callable. Fun
		post-construct. Fun
		doc. Str
		test. Fun
	defaults.
		prototype. |
			Obj.create Obj.prototype
	make-callable. |tuple
		props = tuple.props.map get-prop

		# TODO: Mangle names!
		args = props.map |_
			_.id
		argsStr = args.join ","

		src = buildStr |add!
			# TODO: Mangle name, use instead of `ctr`
			add! "
				return function ctr({argsStr}) \{
				if (!(this instanceof ctr)) return new ctr({argsStr})

			props.forEach |_
				if! (defined? _.type) |
					add! "_ms.checkContains({_.id}_type, {_.id}, \"{_.name}\")"

				add! "this{access _.name} = {_.id}"

			add! "
				if (arguments.length > {props.length})
					throw new Error("Only expected {props.length} args, got " + arguments.length)

			# TODO: make-callable

			if! (defined? tuple.post-construct) |
				add! "postConstruct(this)"

			add! "}"

		type-args = props.map |_
			"{_.id}_type"
		make-ctr = Fun "postConstruct" ...type-args src
		types = props.map |prop
			prop.type
		ctr = make-ctr tuple.post-construct ...types
		debug p+! ctr "source" src
		ctr

	post-construct. |_
		p+! _.prototype "constructor" _
		accesses = (_.props.map get-prop).map |_
			"_{access _.name}"
		extract-src = "return function(_) \{ return _ instanceof tuple ? [ {accesses.join ","} ] : null }"
		make-extractor = Fun "tuple" extract-src
		extractor = make-extractor _
		self-impl! extract _ extractor

	test. |
		Vec2 = Tuple
			props.
				. "x"
				. [ "y" Num
		v = Vec2 1 2
		! =? 1 v.x
		! =? 2 v.y
		case v
			:Vec2 x y
				! =? 1 x
				! =? 2 y

impl-contains?! Tuple |tuple _
	js-instanceof _ tuple

kind! Tuple Impl-Type

Tuple
