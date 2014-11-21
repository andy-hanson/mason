use
	..private.bootstrap -> Dict oh-no! set! syms Object has? ms Str get-or-undefined any? true Fun get extend! exists? Bool false proto-impl-sub?!

record-type-post-construct = |rt
	\ Every Record-Type's instances know their type.
	set! rt.prototype syms.type-of |
		rt

make-record-constructor = |rt
	|baby-members:Dict
		baby = Object.create rt.prototype
		(Object.getOwnPropertyNames baby-members).forEach |member-name
			case! Object.getOwnPropertyDescriptor baby-members member-name
				has? _ "value"
					val = _.value
					case! member-name
						`_ === "displayName"`
							ms.checkSubsumes Str _ "displayName"
						has? rt.members _
							case! get-or-undefined rt.members member-name
								`_ == true`
									()
								any?_
									\ Can't use `!subsumes` because it may not exist yet
									ms.checkSubsumes _ val member-name
						else
							case! rt.extensible
								_
									()
								else
									oh-no! ~"Tried to give {member-name} to non-extensible type {rt} with members {rt.members}"

					Object.defineProperty baby member-name
						value. val
						enumerable. true
						writable. member-name.endsWith "!"

				has? _ "get"
					case!
						member-name.endsWith "!"
							oh-no! "Can not define mutable property lazily."
						else
							()

					\ TODO: Type the result, somehow
					Object.defineProperty baby member-name
						get. _.get
						enumerable. true

				else
					oh-no! ~"Descriptor for {member-name} has neither value nor get; is {_}."

		(Object.getOwnPropertyNames rt.members).forEach |case!
			`_ === "displayName"`
				()
			has? baby-members _
				()
			has? rt.defaults _
				Object.defineProperty baby _
					enumerable. true
					make-default:Fun = get rt.defaults _
					value. make-default baby
			else
				oh-no! ~"Member `{_}` not specified, and no default is available."

		\ TODO: Decide whether I really want this.
		\case! rt.extensible
		\	_
		\		()
		\	else
		\		Object.preventExtensions baby

		call-baby = case rt.make-callable
			any? _
				make-callable:Fun = _
				callable = make-callable baby
				Object.setPrototypeOf callable (Object.getPrototypeOf baby)
				extend! callable baby
				callable
			else
				baby

		case! rt.post-construct
			exists?_
				_ call-baby rt.members
			else
				()

		call-baby

record-type-args =
	doc. "TODO"
	\ This must be explicit because of the way we construct Record-Type
	prototype. Object.create Object.prototype
	members.
		displayName. Str \ displayName is mandatory for types.
		members. Dict
		defaults. Dict
		prototype. Object
		post-construct. Fun
		extensible. Bool
		\ This takes in the members and outputs a Fun.
		make-callable. Fun
	defaults.
		defaults. |
			Dict.empty
		prototype. |_
			Object.create Object.prototype
		post-construct. | |
			()
		extensible. |
			false
		make-callable. |
			()
	post-construct. record-type-post-construct
	extensible. true
	make-callable. make-record-constructor

Record-Type = (make-record-constructor record-type-args) record-type-args

\ TODO: Consider moving
proto-impl-sub?! Record-Type.prototype |rt _
	Object.prototype.isPrototypeOf.call (get rt "prototype") _

Record-Type
