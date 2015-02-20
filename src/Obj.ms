use
	.Bool _ and false not nor xor
	.compare =?
	.js defined? global js== js-typeof id=? js-sub
	.methods freeze
	.private.bootstrap Str
	.Symbol
	.Type => contains?
	.Type.Kind
use~
	.@ _ ++ all? count each! empty? keep
	.@.@-Type empty
	.@.? _ Opt->?
	.@.Id-Set!
	.@.Map _ make-map
	.control returning
	.Fun
	.Obj! empty-Obj! p+!
debug use~
	.!
	.@.Seq seq=?
	.@.Stream
	.Bool true
	.math.Num
	.Try fails?

Obj =
	doc. "
		Contains anything that can store keys.
		Everything shares Obj.prototype.
	global.Object

Obj-Key. Kind
	doc. "Can be used as a name for a property of an object."
	implementors. [ Str Symbol ]

can-get-p?.
	doc. "Whether it's safe to try to directly access properties."
	test. |
		[ () ] -> false
		[ undefined ] -> false
		[ 1 ] -> true
	|_
		not (js== _ ()

flag?.
	doc. "If it has a property for the flag, uses that. Otherwise false."
	test. |
		\ TODO:SYNTAX (a.)
		[ (a. true) "a" ] -> true
		[ (a. false) "a" ] -> false
		[ empty-Obj "a" ] -> false
	|obj flag:Obj-Key
		case ?p obj flag
			empty?_
				false
			else
				b:Bool = _.val
				b

~forbidden-fun-props = => Id-Set! [ "arguments" "caller" ]
@p-all.
	doc. "
		Every property name directly stored in an object.
		Includes non-enumerable properties and symbols.

	test. |
		obj = empty-Obj!()
		p+! obj "a" 0
		sym = Symbol "s"
		Obj.defineProperty obj sym
			value. 0
			enumerable. false
		! seq=? (@p-all obj) [ "a" sym ]
		\ But not "arguments" or "caller"
		[ @p-all ] -> => Stream [ "length" "name" "prototype" "doc" "test" "displayName" ]
	|:@[Obj-Key] _
		props = Obj.getOwnPropertyNames _
		\ TODO: case!, keep!
		own-names = case
			:Fun
				keep props |name
					not (contains? forbidden-fun-props name)
			else
				props
		++ own-names (Obj.getOwnPropertySymbols _

@p.
	doc. "
		Like @p-all, but excludes non-enumerable properties and symbols.
	test. |
		obj = empty-Obj!()
		Obj.defineProperty obj "a"
			value. 0
			enumerable. false
		sym = Symbol "s"
		Obj.defineProperty obj sym
			value. 0
			enumerable.
		! empty? (@p obj)
		[ @p ] -> [ "doc" "test" "displayName" ]
	|:@[Str] _
		case
			can-get-p?_
				Obj.keys _
			else
				[ ]

?p.
	doc. "`?` containing the value of the property, if it exists."
	test. |
		x =
			a. 1
			b. ()
		[ x "a" ] -> ? 1
		[ x "b" ] -> ? ()
		\ Does not inherit from prototype.
		[ x "toString" ] -> empty ?
	|_ name:Obj-Key
		case
			p? _ name
				? (js-sub _ name
			else
				empty ?

?p-with-proto.
	doc. "Like `?p`, but also looks through the prototype chain."
	test. |
		[ 1 "toString" ] -> ? Num.prototype.toString
		[ 1 "asdfghjkl" ] -> empty ?
	|_ name:Obj-Key
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
			b. ()
		[ x "a" ] -> 1
		[ x "b" ] -> ()
		debug ! fails? |
			p "c"
	|_ name:Obj-Key
		in
			! p? _ name

		js-sub _ name

p?.
	doc. "Whether there is a property by that name."
	test. |
		x = a. 1
		[ x "a" ] -> true
		[ x "b" ] -> false
		[ x "toString" ] -> false \ use p-with-proto? for that.
	|_ name:Obj-Key
		and can-get-p?_ ~(Obj.prototype.hasOwnProperty.call _ name

p-with-proto?.
	doc. "Like `p?` but looks through the prototype."
	test. |
		[ empty-Obj "toString" ] -> true
	|_ name:Obj-Key
		and can-get-p?_ ~(defined? (js-sub _ name

\ TODO: Move?
\ TODO: Handle recursive references.
inspect=?.
	doc. "
		For Objs, whether they are of the same type and have `=?` properties.
		For primitives, whether they are `=?`.
	test. |
		a =
			a. 1
		b =
			\ TODO:DISPLAYNAME
			displayName. "a"
			a. 1
		c =
			x. 3
		[ a b ] -> true
		[ a c ] -> false
		[ 1 1 ] -> true
		\ For functions, is identity
		[ inspect=? inspect=? ] -> true
	|:Bool a b
		\ Necessary because `js-typeof null` is "object"
		null-a = id=? a ()
		null-b = id=? b ()
		\ TODO: Not :Obj because that currently also includes Funs
		obj-a = and (not null-a) ~(id=? (js-typeof a) "object"
		obj-b = and (not null-b) ~(id=? (js-typeof b) "object"
		case
			nor obj-a obj-b
				id=? a b
			xor obj-a obj-b
				false
			else
				same-type = id=? (Obj.getPrototypeOf a) (Obj.getPrototypeOf b
				and same-type ~
					ak = Obj.getOwnPropertyNames a
					bk = Obj.getOwnPropertyNames b
					and (=? (count ak) (count bk)) ~
						all? ak |k
							=? (js-sub a k) (js-sub b k)

empty-Obj. Obj.freeze (Obj.create Obj.prototype

empty-Obj?.
	doc. "Whether there are no properties, not even hidden ones."
	test. |
		[ empty-Obj ] -> true
		[ Obj ] -> false
	|_:Obj
		empty? @p-all_

Obj->Map.
	doc. "A Map whose keys are property names and whose values are the properties' values."
	test. |
		[ (a. 1 b. 2) ] ->
			"a" -> 1
			"b" -> 2
	|_
		make-map @p_ p[_]

Map->Obj.
	doc. "Given a Map whose keys are Strs, creates an Obj whose Obj->Map is that."
	test. |
		\ TODO:SYNTAX [ "a" -> 1, "b" -> 2 ]
		map =
			"a" -> 1
			"b" -> 2
		[ map ] -> a. 1 b. 2
		! =? map (Obj->Map (Map->Obj map
		debug ! fails? |
			Map->Obj
				1 -> 2
	|_:Map
		returning empty-Obj!() |obj
			each! _ |pair
				p+! obj pair.key pair.val
			freeze obj

Obj
