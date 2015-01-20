use
	..Bool -> false implies not true
	..private.bootstrap -> sym-type-of set! Object Str Fun proto-impl-contains?!
	..js -> defined? js=== js-sub js-typeof
	..js-impl -> i=== build-str

make-record-constructor = |rt
	if! = |bool act
		case!
			bool
				act ()
			else
				()

	\ Type might be lazily defined
	member-has-type? = |members member
		desc = Object.getOwnPropertyDescriptor members member
		case desc.value
			_ \ Is true, in other words, no type
				false
			else
				true

	real-member? =  |members member
		\ Ignore accidental displayName.
		implies (i=== member "displayName") ~
			\ This looks funny since `contains?` isn't defined until methods.ms.
			not (js=== (js-typeof (js-sub members member)) "string"

	access = |name
		"[\"{name}\"]"

	src = build-str |add!
		add! "
			function ctr(_) \{
			if (!(this instanceof ctr)) return new ctr(_)

		(Object.getOwnPropertyNames rt.members).forEach |member
			if! (real-member? rt.members member) |
				acc = access member
				add! "this{acc} = _{acc}"
				if! (defined? rt.defaults) |
					case! js-sub rt.defaults member
						defined?_
							add! "if (this{acc} === undefined) this{acc} = defaults{acc}(_)"
						else
							()

				add! case
					member-has-type? rt.members member
						\ TODO: Debug mode only
						"_ms.checkContains(members{acc}, this{acc}, \"{member}\")"
					else
						\ TODO: Debug mode only
						"if (!Object.prototype.hasOwnProperty.call(_, \"{member}\")) throw new Error(\"Forgot to assign {member}.\")\n"

		if! (defined? rt.optional-members) |
			(Object.getOwnPropertyNames rt.optional-members).forEach |member
				if! (real-member? rt.optional-members member) |
					acc = access member
					add! "if (_{acc} !== undefined) \{"
					add! "this{acc} = _{acc}"
					if! (member-has-type? rt.optional-members member) |
						\ TODO: Debug mode only
						add! "_ms.checkContains(optionalMembers{acc}, this{acc}, \"{member}\")"
					add! "}"

		case!
			rt.extensible
				add! "Object.assign(this, _)"
			else
				\ TODO: Debug mode only
				check = "_ms.checkNoExtras(this, _, \"{rt.displayName}\")"
				case!
					defined? rt.optional-members
						add! check
					else
						n-members = (Object.getOwnPropertyNames rt.members).length
						\ If the condition passes the check will definitely fail, and will give nice error info.
						add! "if (Object.keys(_).length > {n-members}) \{ {check}; throw new Error(\"Unreachable\") }"

		if! (defined? rt.make-callable) |
			add! "var callBaby = makeCallable(this)"
			add! "Object.setPrototypeOf(callBaby, prototype)"
			add! "Object.assign(callBaby, this)"

		if! (defined? rt.post-construct) |
			post = case
				defined? rt.make-callable
					"callBaby"
				else
					"this"
			add! "postConstruct({post})"

		if! (defined? rt.make-callable) |
			add! "return callBaby"

		add! "
			}
			ctr.prototype = prototype
			return ctr

	f = Fun "prototype" "members" "defaults" "makeCallable" "postConstruct" "optionalMembers" src
	f rt.prototype rt.members rt.defaults rt.make-callable rt.post-construct rt.optional-members

record-type-args =
	doc. "TODO"
	\ This must be explicit because of the way we construct Record-Type
	prototype. Object.create Object.prototype
	members.
		displayName. Str \ displayName is mandatory for types.
		members. Object
		prototype. Object
	optional-members.
		defaults. Object
		\ This takes in the members and outputs a Fun.
		make-callable. Fun
		optional-members. Object
		post-construct. Fun
		doc. Str
		test. Fun
		extensible. Bool
	defaults.
		prototype. |
			Object.create Object.prototype
	post-construct. |rt
		\ Every Record-Type's instances know their type.
		set! rt.prototype sym-type-of |
			rt
	make-callable. make-record-constructor

Record-Type = (make-record-constructor record-type-args) record-type-args

\ This has to be done specially because `impl!` can only be done on Methods,
\ and Method is a Record-Type, so  `contains?` gets called.
proto-impl-contains?! Record-Type.prototype |rt _
	Object.prototype.isPrototypeOf.call rt.prototype _

Record-Type
