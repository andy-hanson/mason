use
	esast.dist.mangle-identifier
	..Boolean and implies not
	..private.bootstrap implContains pAdd
	..js defined? js! js=== js-instanceof js-sub js-typeof
	..private.js-impl buildStr
use-debug
	..!
	..compare =?
	..private.js-impl addOne
	..Try fails?
	.Type type-of

if! = |bool act
	case!
		bool
			act()
		else
			pass

flag? = |case
	defined?_
		js! (js=== _ false)
	else
		false

make-ctr = |ot
	debug prop-has-type? = |props prop
		# Type might be lazily defined, but don't trigger it yet.
		desc = Object.getOwnPropertyDescriptor props prop
		not (js=== desc.value null)

	real-prop? = |props prop
		# TODO:DISPLAYNAME Ignore accidental name.
		implies (js=== prop "name") ~
			# This looks funny since `contains?` isn't defined until methods.ms.
			not (js=== (js-typeof (js-sub props prop)) "string"

	access = |name
		"[\"{name}\"]"

	src = buildStr |add!
		name = mangle-identifier ot.name

		add! "
			return function {name}(_) \{
			if (!(this instanceof {name})) return new {name}(_)

		real-props = (Object.getOwnPropertyNames ot.props).filter |prop
			real-prop? ot.props prop

		extensible = flag? ot.extensible

		if! extensible |
			add! "Object.assign(this, _)"

		real-props.forEach |prop
			acc = access prop

			if! (not extensible) |
				add! "this{acc} = _{acc}"

			default? = and (defined? ot.defaults) ~(defined? (js-sub ot.defaults prop

			if! (default?) |
				add! "if (this{acc} === undefined) this{acc} = defaults{acc}(_)"

			debug case!
				prop-has-type? ot.props prop
					add! "_ms.checkContains(props{acc}, this{acc}, \"{prop}\")"
				default?
					pass
				else
					add! "
						if (!Object.prototype.hasOwnProperty.call(_, \"{prop}\"))
							throw new Error(\"Forgot to assign {prop}.\")

		if! (defined? ot.opt-props) |
			(Object.getOwnPropertyNames ot.opt-props).forEach |prop
				if! (real-prop? ot.opt-props prop) |
					acc = access prop
					add! "if (_{acc} !== undefined) \{"
					if! (not extensible) |
						add! "this{acc} = _{acc}"
					debug if! (prop-has-type? ot.opt-props prop) |
						# TODO: Debug mode only
						add! "_ms.checkContains(optProps{acc}, this{acc}, \"{prop}\")"
					add! "}"

		debug if! (not extensible) |
			check = "_ms.checkNoExtras(this, _, \"{ot.name}\")"
			case!
				defined? ot.opt-props
					add! check
				else
					n-props = real-props.length
					n-props-compare = case
						defined? real-props.name
							"{n-props}"
						else
							# TODO:DISPLAYNAME
							"(Object.prototype.hasOwnProperty.call(_, \"name\") ? {addOne n-props} : {n-props})"
					# If the conditions pass the check will definitely fail, and will give nice error info.
					add! "
						if (Object.keys(_).length > {n-props-compare})  \{
							{check}
							throw new Error(\"Unreachable\")
						}

		if! (defined? ot.make-callable) |
			# TODO:DISPLAYNAME `delete this.name` is OK because make-callable should provide the name.
			add! "
				const callBaby = makeCallable(this)
				Object.setPrototypeOf(callBaby, prototype)
				delete this.name
				Object.assign(callBaby, this)

		if! (defined? ot.post-construct) |
			post = case
				defined? ot.make-callable
					"callBaby"
				else
					"this"
			add! "postConstruct({post})"

		if! (defined? ot.make-callable) |
			add! "return callBaby"

		add! "}"

	make-ctr = Function "prototype" "props" "defaults" "makeCallable" "postConstruct" "optProps" src
	ctr = make-ctr ot.prototype ot.props ot.defaults ot.make-callable ot.post-construct ot.opt-props
	debug pAdd ctr "source" src
	ctr

obj-type-args =
	doc. "
		Impl-Type for Objects with specific properties.
		Obj-Types are nominal types;
		a value must be constructed by calling the Obj-Type in order to be contained by it.

		Note that there are Objects whose types are not Obj-Types;
		these include those of Wrap-Types and those made by constructor Functions, JavaScript-style.
	# This must be explicit because of the way we construct Obj-Type
	prototype. Object.create Object.prototype
	props.
		name. String
		props. Object
		prototype. Object
	opt-props.
		defaults. Object
		# This takes in the props and outputs a Function.
		make-callable. Function
		opt-props. Object
		post-construct. Function
		doc. String
		test. Function
		extensible. Boolean
	defaults.
		prototype. |
			Object.create Object.prototype
	post-construct. |_
		pAdd _.prototype "constructor" _
	make-callable. make-ctr
	test. |
		Vec2D = Obj-Type
			props.
				x. Number
				y. Number
		v = Vec2D
			x. 1
			y. 2
		! =? v.x 1
		! =? v.y 2
		! =? (type-of v) Vec2D
		! fails? |
			Vec2D
				x. "one"
				y. "two"
		! fails? |
			Vec2D
				x. 1
		! fails? |
			Vec2D
				x. 1
				y. 2
				z. 3

		Q = Obj-Type
			props.
				x.
			opt-props.
				y. Number
		q = Q
			x. 1
			y. 2
		! =? q.x 1
		! =? q.y 2
		! fails? |
			Q
				x. 1
				z. 3

		Ex = Obj-Type
			props.
				x.
			extensible. true
		ex = Ex
			x. 1
			y. 2
		! =? ex.y 2


Obj-Type = (make-ctr obj-type-args) obj-type-args

implContains Obj-Type |ot _
	js-instanceof _ ot

Obj-Type
