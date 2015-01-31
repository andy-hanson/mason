use
	..Bool _ false implies not
	..private.bootstrap set! Obj Str Fun proto-impl-contains?!
	..js defined? js=== js-instanceof js-sub js-typeof
	..js-impl i=== build-str
debug use~
	..!
	..Bool true
	..Comparable =?
	..js-impl +1
	..math.Num
	..Try fails?
	.util type-of

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

make-record-constructor = |rt
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

		real-members = (Obj.getOwnPropertyNames rt.members).filter |member
			real-member? rt.members member

		extensible = flag? rt.extensible

		if! extensible |
			add! "Object.assign(this, _)"

		real-members.forEach |member
			acc = access member

			if! (not extensible) |
				add! "this{acc} = _{acc}"

			if! (defined? rt.defaults) |
				case! js-sub rt.defaults member
					defined?_
						add! "if (this{acc} === undefined) this{acc} = defaults{acc}(_)"
					else
						()

			debug add! case
				member-has-type? rt.members member
					"_ms.checkContains(members{acc}, this{acc}, \"{member}\")"
				else
					"
						if (!Object.prototype.hasOwnProperty.call(_, \"{member}\"))
							throw new Error(\"Forgot to assign {member}.\")

		if! (defined? rt.optional-members) |
			(Obj.getOwnPropertyNames rt.optional-members).forEach |member
				if! (real-member? rt.optional-members member) |
					acc = access member
					add! "if (_{acc} !== undefined) \{"
					if! (not extensible) |
						add! "this{acc} = _{acc}"
					debug if! (member-has-type? rt.optional-members member) |
						\ TODO: Debug mode only
						add! "_ms.checkContains(optionalMembers{acc}, this{acc}, \"{member}\")"
					add! "}"

		debug if! (not extensible) |
			\ TODO: Debug mode only
			check = "_ms.checkNoExtras(this, _, \"{rt.displayName}\")"
			case!
				defined? rt.optional-members
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

		if! (defined? rt.make-callable) |
			add! "
				var callBaby = makeCallable(this)
				Object.setPrototypeOf(callBaby, prototype)
				Object.assign(callBaby, this)

		if! (defined? rt.post-construct) |
			post = case
				defined? rt.make-callable
					"callBaby"
				else
					"this"
			add! "postConstruct({post})"

		if! (defined? rt.make-callable) |
			add! "return callBaby"

		add! "}"

	make-ctr = Fun "prototype" "members" "defaults" "makeCallable" "postConstruct" "optionalMembers" src
	make-ctr rt.prototype rt.members rt.defaults rt.make-callable rt.post-construct rt.optional-members

record-type-args =
	doc. "TODO"
	\ This must be explicit because of the way we construct Record-Type
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
	post-construct. |rt
		set! rt.prototype "constructor" rt
	make-callable. make-record-constructor
	test. |
		Vec2D = Record-Type
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

		Q = Record-Type
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

		Ex = Record-Type
			members.
				x.
			extensible.
		ex = Ex
			x. 1
			y. 2
		! =? ex.y 2


Record-Type = (make-record-constructor record-type-args) record-type-args

\ This has to be done specially because `impl!` can only be done on Methods,
\ and Method is a Record-Type, so  `contains?` gets called.
proto-impl-contains?! Record-Type.prototype |rt _
	js-instanceof _ rt

Record-Type
