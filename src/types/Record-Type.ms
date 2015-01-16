use
	..private.bootstrap -> sym-type-of Dict set! Object Str Fun get proto-impl-contains?! get-or-undefined exists?
	..js-impl -> i=== build-str

record-type-post-construct = |rt
	\ Every Record-Type's instances know their type.
	set! rt.prototype sym-type-of |
		rt

make-record-constructor = |rt
	src = build-str |add
		access = |name
			"[\"{name}\"]"
		add "
			function ctr(_) \{
			if (!(this instanceof ctr)) return new ctr(_)

		add-member = |member
			acc = access member
			add "this{acc} = _{acc}"
			case!
				exists? rt.defaults
					case! get-or-undefined rt.defaults member
						exists? _
							\ TODO: arg to fun
							add "if (this{acc} === undefined) this{acc} = defaults{acc}(_)"
						else
							()
				else
					()

			case!
				i=== member "displayName"
					()
				else
					member-desc = Object.getOwnPropertyDescriptor rt.members member
					case!
						exists? member-desc.value
							case! member-desc.value
								_ \ Is true, in other words, no type
									()
								else
									\ TODO: Turn off in release mode.
									add "_ms.checkContains(members{acc}, this{acc}, \"{member}\")"
						else
							\ Type is accessed lazily.
							add "_ms.checkContains(members{acc}, this{acc}, \"{member}\")"

		case!
			exists? rt.optional-members
				(Object.getOwnPropertyNames rt.optional-members).forEach |member
					case!
						i=== member "displayName"
							()
						else
							acc = access member
							add "if (_{acc} !== undefined) \{"
							add "this{acc} = _{acc}"
							case! get-or-undefined rt.optional-members member
								_
									()
								else
									add "_ms.checkContains(optionalMembers{acc}, this{acc}, \"{member}\")"
							add "}"
			else
				()

		(Object.getOwnPropertyNames rt.members).forEach |member
			case!
				i=== member "displayName"
					case! get-or-undefined rt.members member
						:Str
							\ Accidental displayName property; ignore it.
							()
						else
							\ Type that demands a displayName property.
							add-member member
				else
					add-member member

		case! rt.make-callable
			exists?_
				add "
					var callBaby = makeCallable(this)
					Object.setPrototypeOf(callBaby, prototype)
					Object.assign(callBaby, this)
			else
				()
		case! rt.post-construct
			exists? _
				case!
					exists? rt.make-callable
						add "
							postConstruct(callBaby)
							return callBaby
					else
						add "postConstruct(this)"
			else
				case!
					exists? rt.make-callable
						add "return callBaby"
					else
						()
		add "}"
		add "ctr.prototype = prototype"
		add "return ctr"

	f = Fun "prototype" "members" "defaults" "makeCallable" "postConstruct" "optionalMembers" src
	f rt.prototype rt.members rt.defaults rt.make-callable rt.post-construct rt.optional-members

record-type-args =
	doc. "TODO"
	\ This must be explicit because of the way we construct Record-Type
	prototype. Object.create Object.prototype
	members.
		displayName. Str \ displayName is mandatory for types.
		members. Dict
		prototype. Object
	optional-members.
		defaults. Dict
		\ This takes in the members and outputs a Fun.
		make-callable. Fun
		optional-members. Dict
		post-construct. Fun
	defaults.
		prototype. |
			Object.create Object.prototype
	post-construct. record-type-post-construct
	make-callable. make-record-constructor

Record-Type = (make-record-constructor record-type-args) record-type-args

\ TODO: Consider moving
proto-impl-contains?! Record-Type.prototype |rt _
	Object.prototype.isPrototypeOf.call (get rt "prototype") _

Record-Type
