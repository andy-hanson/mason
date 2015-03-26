use
	..Bool _ and false implies not
	..private.bootstrap Fun impl-contains?! Obj p+! Str
	..js defined? js=== js-instanceof js-sub js-typeof
	..private.js-impl buildStr
use-debug
	..!
	..Bool true
	..compare =?
	..private.js-impl addOne
	..math.Num
	..Try fails?
	..Type type-of

if! = |bool act
	case!
		bool
			act ()
		else
			()

flag? = |case
	defined?_
		_
	else
		false

make-ctr = |ot
	debug prop-has-type? = |props prop
		\ Type might be lazily defined, but don't trigger it yet.
		desc = Obj.getOwnPropertyDescriptor props prop
		not (js=== desc.value true)

	real-prop? = |props prop
		\ Ignore accidental displayName.
		implies (js=== prop "displayName") ~
			\ This looks funny since `contains?` isn't defined until methods.ms.
			not (js=== (js-typeof (js-sub props prop)) "string"

	access = |name
		"[\"{name}\"]"

	src = buildStr |add!
		add! "
			return function ctr(_) \{
			if (!(this instanceof ctr)) return new ctr(_)

		real-props = (Obj.getOwnPropertyNames ot.props).filter |prop
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
					()
				else
					add! "
						if (!Object.prototype.hasOwnProperty.call(_, \"{prop}\"))
							throw new Error(\"Forgot to assign {prop}.\")

		if! (defined? ot.opt-props) |
			(Obj.getOwnPropertyNames ot.opt-props).forEach |prop
				if! (real-prop? ot.opt-props prop) |
					acc = access prop
					add! "if (_{acc} !== undefined) \{"
					if! (not extensible) |
						add! "this{acc} = _{acc}"
					debug if! (prop-has-type? ot.opt-props prop) |
						\ TODO: Debug mode only
						add! "_ms.checkContains(optProps{acc}, this{acc}, \"{prop}\")"
					add! "}"

		debug if! (not extensible) |
			check = "_ms.checkNoExtras(this, _, \"{ot.displayName}\")"
			case!
				defined? ot.opt-props
					add! check
				else
					n-props = real-props.length
					n-props-compare = case
						defined? real-props.displayName
							"{n-props}"
						else
							"(Object.prototype.hasOwnProperty.call(_, \"displayName\") ? {addOne n-props} : {n-props})"
					\ If the conditions pass the check will definitely fail, and will give nice error info.
					add! "
						if (Object.keys(_).length > {n-props-compare})  \{
							{check}
							throw new Error(\"Unreachable\")
						}

		if! (defined? ot.make-callable) |
			add! "
				var callBaby = makeCallable(this)
				Object.setPrototypeOf(callBaby, prototype)
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

	make-ctr = Fun "prototype" "props" "defaults" "makeCallable" "postConstruct" "optProps" src
	ctr = make-ctr ot.prototype ot.props ot.defaults ot.make-callable ot.post-construct ot.opt-props
	debug p+! ctr "source" src
	ctr

obj-type-args =
	doc. "
		Impl-Type for Objs with specific properties.
		Obj-Types are nominal types;
		a value must be constructed by calling the Obj-Type in order to be contained by it.
		-
		Note that there are Objs whose types are not Obj-Types;
		these include those of Wrap-Types and those made by constructor Funs, JavaScript-style.
	\ This must be explicit because of the way we construct Obj-Type
	prototype. Obj.create Obj.prototype
	props.
		displayName. Str \ displayName is mandatory for types.
		props. Obj
		prototype. Obj
	opt-props.
		defaults. Obj
		\ This takes in the props and outputs a Fun.
		make-callable. Fun
		opt-props. Obj
		post-construct. Fun
		doc. Str
		test. Fun
		extensible. Bool
	defaults.
		prototype. |
			Obj.create Obj.prototype
	post-construct. |_
		p+! _.prototype "constructor" _
	make-callable. make-ctr
	test. |
		Vec2D = Obj-Type
			props.
				x. Num
				y. Num
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
				y. Num
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
			extensible.
		ex = Ex
			x. 1
			y. 2
		! =? ex.y 2


Obj-Type = (make-ctr obj-type-args) obj-type-args

impl-contains?! Obj-Type |ot _
	js-instanceof _ ot

Obj-Type
