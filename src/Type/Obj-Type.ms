use
	..Bool _ false implies not
	..private.bootstrap Fun impl-contains?! Obj p+! Str
	..js defined? js=== js-instanceof js-sub js-typeof
	..private.js-impl i=== build-str
debug use~
	..!
	..Bool true
	..private.js-impl +1
	..math.Num
	..methods =?
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
	debug member-has-type? = |members member
		\ Type might be lazily defined, but don't trigger it yet.
		desc = Obj.getOwnPropertyDescriptor members member
		not (js=== desc.value true)

	real-member? = |members member
		\ Ignore accidental displayName.
		implies (i=== member "displayName") ~
			\ This looks funny since `contains?` isn't defined until methods.ms.
			not (js=== (js-typeof (js-sub members member)) "string"

	access = |name
		"[\"{name}\"]"

	src = build-str |add!
		add! "
			return function ctr(_) \{
			if (!(this instanceof ctr)) return new ctr(_)

		real-members = (Obj.getOwnPropertyNames ot.members).filter |member
			real-member? ot.members member

		extensible = flag? ot.extensible

		if! extensible |
			add! "Object.assign(this, _)"

		real-members.forEach |member
			acc = access member

			if! (not extensible) |
				add! "this{acc} = _{acc}"

			if! (defined? ot.defaults) |
				case! js-sub ot.defaults member
					defined?_
						add! "if (this{acc} === undefined) this{acc} = defaults{acc}(_)"
					else
						()

			debug add! case
				member-has-type? ot.members member
					"_ms.checkContains(members{acc}, this{acc}, \"{member}\")"
				else
					"
						if (!Object.prototype.hasOwnProperty.call(_, \"{member}\"))
							throw new Error(\"Forgot to assign {member}.\")

		if! (defined? ot.optional-members) |
			(Obj.getOwnPropertyNames ot.optional-members).forEach |member
				if! (real-member? ot.optional-members member) |
					acc = access member
					add! "if (_{acc} !== undefined) \{"
					if! (not extensible) |
						add! "this{acc} = _{acc}"
					debug if! (member-has-type? ot.optional-members member) |
						\ TODO: Debug mode only
						add! "_ms.checkContains(optionalMembers{acc}, this{acc}, \"{member}\")"
					add! "}"

		debug if! (not extensible) |
			\ TODO: Debug mode only
			check = "_ms.checkNoExtras(this, _, \"{ot.displayName}\")"
			case!
				defined? ot.optional-members
					add! check
				else
					n-members = real-members.length
					n-members-compare = case
						defined? real-members.displayName
							"{n-members}"
						else
							"(Object.prototype.hasOwnProperty.call(_, \"displayName\") ? {+1 n-members} : {n-members})"
					\ If the conditions pass the check will definitely fail, and will give nice error info.
					add! "
						if (Object.keys(_).length > {n-members-compare})  \{
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

	make-ctr = Fun "prototype" "members" "defaults" "makeCallable" "postConstruct" "optionalMembers" src
	ctr = make-ctr ot.prototype ot.members ot.defaults ot.make-callable ot.post-construct ot.optional-members
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
	members.
		displayName. Str \ displayName is mandatory for types.
		members. Obj
		prototype. Obj
	optional-members.
		defaults. Obj
		\ This takes in the members and outputs a Fun.
		make-callable. Fun
		optional-members. Obj
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
			members.
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
			members.
				x.
			optional-members.
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
			members.
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
