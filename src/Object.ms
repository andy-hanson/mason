use
	.Boolean xor
	.compare =?
	.js defined? id=? js== js-delete js-set js-sub js-typeof
	.methods freeze
	.to-string inspect
	.Type.Kind
	.Type.Pred-Type Opt
	.Type.Type => contains?
use~
	.@.@ ++ all? count empty? keep
	.@.@-Type empty
	.@.? _ ?-or Opt->?
	.@.Map.Map _ make-map
	.@.Set.Id-Set
	.control opr
use-debug
	.@.? ?None ?some
	.@.Set.Set set=?
	.Try fails? fails-with?

Object-Key. new Kind
	doc. "Can be used as a name for a property of an object."
	implementors. [ String Symbol ]

can-get-p?.
	doc. "Whether it's safe to try to directly access properties."
	test. |
		[ null ] -> false
		[ undefined ] -> false
		[ 1 ] -> true
	|_
		not js== _ null

flag?.
	doc. "If it has a property for the flag, uses that. Otherwise false."
	test. |
		# TODO:SYNTAX (a.)
		[ (a. true) "a" ] -> true
		[ (a. false) "a" ] -> false
		[ empty-Object "a" ] -> false
	|:Boolean obj flag:Object-Key
		?-or (?p obj flag) false

~forbidden-fun-props = => Id-Set [ "arguments" "caller" ]
@p-all.
	doc. "
		Every property name directly stored in an object.
		Includes non-enumerable properties and symbols.
	test. !|
		obj = empty-Object!()
		p+! obj "a" 0
		sym = Symbol "s"
		Object.defineProperty obj sym
			value. 0
			enumerable. false
		assert! set=? (@p-all [ 0 0 ]) [ "0" "1" "length" ]
		assert! set=? (@p-all obj) [ "a" sym ]
		# But not "arguments" or "caller"
		# TODO:DISPLAYNAME
		assert! set=? (@p-all @p-all) [ "length" "name" "prototype" "doc" "test" "name" ]
	|_
		props = Object.getOwnPropertyNames_
		# TODO: case!, keep!
		own-names = case
			:Function
				keep props |name
					not contains? forbidden-fun-props name
			else
				props
		++ own-names (Object.getOwnPropertySymbols _

@p.
	doc. "
		Like @p-all, but excludes non-enumerable properties and symbols.
	test. !|
		obj = empty-Object!()
		Object.defineProperty obj "a"
			value. 0
			enumerable. false
		sym = Symbol "s"
		Object.defineProperty obj sym
			value. 0
			enumerable. true
		assert! empty? (@p obj)
		assert! set=? (@p @p) [ "doc" "test" ]
	|case
		can-get-p?_
			Object.keys_
		else
			[ ]

?p.
	doc. "`?` containing the value of the property, if it exists."
	test. |
		x =
			a. 1
			b. null
		[ x "a" ] -> ?some 1
		[ x "b" ] -> ?some null
		# Does not inherit from prototype.
		[ x "toString" ] -> empty ?
	|_ name:Object-Key
		if p? _ name
			js-sub _ name

?p-with-proto.
	doc. "Like `?p`, but also looks through the prototype chain."
	test. |
		[ 1 "toString" ] -> ?some Number.prototype.toString
		[ 1 "asdfghjkl" ] -> ?None
	|_ name:Object-Key
		case
			can-get-p?_
				Opt->? (js-sub _ name
			else
				empty ?

p.
	doc. "Gets the value of a property. Does not include properties in the prototype."
	test. |
		x =
			a. 1
			b. null
		[ x "a" ] -> 1
		[ x "b" ] -> null
		debug assert! fails? |
			p "c"
	|_ name:Object-Key
		in
			assert! p? _ name

		js-sub _ name

p?.
	doc. "Whether there is a property by that name."
	test. |
		x = a. 1
		[ x "a" ] -> true
		[ x "b" ] -> false
		[ x "toString" ] -> false # use p-with-proto? for that.
	|_ name:Object-Key
		and can-get-p?_ (Object.prototype.hasOwnProperty.call _ name)

p-with-proto?.
	doc. "Like `p?` but looks through the prototype."
	test. |
		[ empty-Object "toString" ] -> true
	|_ name:Object-Key
		and can-get-p?_ (defined? (js-sub _ name

# TODO: Handle recursive references.
object=?.
	doc. "
		For Objects, whether they are of the same type and have `=?` properties.
		For primitives, whether they are `=?`.
	test. |
		a =
			a. 1
		b =
			# TODO:DISPLAYNAME
			name. "a"
			a. 1
		c =
			x. 3
		[ a b ] -> true
		[ a c ] -> false
		[ 1 1 ] -> true
		# For functions, is identity
		[ object=? object=? ] -> true
	|a b
		# Necessary because `js-typeof null` is "object"
		null-a = id=? a null
		null-b = id=? b null
		# TODO: Not :Object because that currently also includes Functions
		obj-a = and (not null-a) (id=? (js-typeof a) "object"
		obj-b = and (not null-b) (id=? (js-typeof b) "object"
		case
			not or obj-a obj-b
				id=? a b
			xor obj-a obj-b
				false
			else
				same-type = id=? (Object.getPrototypeOf a) (Object.getPrototypeOf b
				and same-type
					ak = Object.getOwnPropertyNames a
					bk = Object.getOwnPropertyNames b
					and (=? (count ak) (count bk))
						all? ak |k
							=? (js-sub a k) (js-sub b k)

empty-Object. Object.freeze (Object.create Object.prototype

empty-Object?.
	doc. "Whether there are no properties, not even hidden ones."
	test. |
		[ empty-Object ] -> true
		[ Object ] -> false
	|_:Object
		empty? @p-all_

Object->Map.
	doc. "A Map whose keys are property names and whose values are the properties' values."
	test. |
		[ (a. 1 b. 2) ] ->
			"a" -> 1
			"b" -> 2
	|_
		make-map @p_ p[_]

Map->Object.
	doc. "Given a Map whose keys are Strings, creates an Object whose Object->Map is that."
	test. |
		# TODO:SYNTAX [ "a" -> 1, "b" -> 2 ]
		map =
			"a" -> 1
			"b" -> 2
		[ map ] -> a. 1 b. 2
		assert! =? map (Object->Map (Map->Object map
		debug assert! fails? |
			Map->Object
				1 -> 2
	|_:Map
		with empty-Object!() as obj
			for! elem in _
				# TODO:SYNTAX Array destructure
				p+! obj elem[0] elem[1]
			freeze obj

prototype.
	doc. "Gets prototype of an object."
	test. |
		[ empty-Object ] -> Object.prototype
		[ Object-Key ] -> Kind.prototype
	Object.getPrototypeOf

region Mutator methods
	# TODO: just use new Object or Object.create
	empty-Object!.
		doc. "Creates a new Object! with no properties and the given prototype."
		test. !|
			_ = empty-Object!()
			assert! empty-Object? _
			child = empty-Object! _
			assert! =? _ (prototype child
		|prototype:Opt[Object]
			Object.create (opr prototype Object.prototype

	p+!.
		doc. "Adds a new immutable property."
		test. !|
			_ = empty-Object!()
			p+! _ "a" 1
			assert! =? _.a 1
			assert! fails? |
				p+! _ "a" 2
			assert! fails? |
				p+! "string" "a" 1
		!|_:Object name:Object-Key val
			Object.defineProperty _ name
				enumerable. true
				writable. false
				value. val

	p+mut!.
		doc. "Adds a new mutable property."
		test. "See `p!`"
		!|_:Object name:Object-Key val
			Object.defineProperty _ name
				enumerable. true
				writable. true
				value. val
				configurable. true

	p!.
		doc. "Modifies an already-existing property."
		test. !|
			_ = empty-Object!()
			p+mut! _ "a" 1
			p! _ "a" 2
			assert! =? _.a 2
		!|_:Object name:Object-Key new-val
			in
				assert! p? _ name

			js-set _ name new-val

	p-!.
		test. !|
			_ = empty-Object!()
			p+mut! _ "a" 1
			p-! _ "a"
			forbid! p? _ "a"
		!|_:Object name:Object-Key
			in
				assert! p? _ name

			js-delete _ name

	# TODO: Don't bother, just `spread p+!`
	extend!.
		doc. "Adds all the properties in `extender` to `_`."
		test. !|
			_ = empty-Object!()
			extend! _
				a. 1
			assert! =? _.a 1
		!|_:Object extender:Object
			Object.assign _ extender

send.
	doc. "Calls `target`'s method `name` with the given arguments."
	test. |
		[ 1 "toFixed" 2 ] -> "1.00"
		assert! fails-with? "Method \"toFixed\" not implemented by \"1\"." !|
			send! "1" "toFixed"
	|target name:Object-Key ...args
		impl = js-sub target name
		assert! impl:Function throw! "Method {inspect name} not implemented by {inspect target}."
		impl.apply target args

send!. send

object-merge. |...objects
	Object.assign (new Object) ...objects
