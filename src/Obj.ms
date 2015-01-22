use
	.Bool -> and false not nor true xor
	.Comparable -> =?
	.js -> any? defined? global js-typeof reference=? js-sub
	.methods -> => + empty empty? freeze
	.pred-types -> Union
	.Symbol
	.types.Method -> impl!
	.types.util -> self-type
use~
	.!
	.@ -> all? count each! keep
	.@.? -> Opt->?
	.@.Identity-Set!
	.@.Seq -> seq=?
	.@.Stream
	.Fun -> call
	.maps.Map -> each-pair! make-map
	.Obj! -> p+! p+mut! p-!
	.Try -> !debug-fails?

Obj =
	doc. "
		Contains anything that can store keys.
		Everything shares Obj.prototype.
	global.Object

Str = global.String \ Can't have dependency on Str.ms
~Obj-Key = Union[Str Symbol]

flag?. |obj flag:Str
	\ TODO: use `and`
	case obj
		:Obj
			case js-sub obj flag
				defined?_
					b:Bool = _
					b
				else
					false
		else
			false

~forbidden-fun-props = => Identity-Set! [ "arguments" "caller" ]
@p-all.
	doc. "
		Every property name directly stored in an object.
		Includes non-enumerable properties and symbols.

	test. |
		obj = empty Obj!
		p+! obj "a" 0
		sym = Symbol "s"
		Obj.defineProperty obj sym
			value. 0
			enumerable. false
		! seq=? (@p-all obj) [ "a" sym ]
	|:@[Obj-Key] _:Obj
		\ TODO: Only forbidden if is a Fun
		\ TODO: Lazy +
		own-names = keep (=> Stream (Obj.getOwnPropertyNames _)) |name
			not (forbidden-fun-props.has name)
		+ own-names (Obj.getOwnPropertySymbols _)

@p.
	doc. "
		Like @p-all, but excludes non-enumerable properties and symbols.
	test. |
		obj = empty Obj!
		Obj.defineProperty obj "a"
			value. 0
			enumerable. false
		sym = Symbol "s"
		Obj.defineProperty obj sym
			value. 0
			enumerable.
		! empty? (@p obj)
	|:@[Str] _:Obj
		Obj.keys _

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
		x = empty Obj
		[ x "toString" ] -> ? Obj.prototype.toString
		[ x "asdfghjkl" ] -> empty ?
	|obj name:Obj-Key
		case obj
			any?_
				Opt->? (js-sub obj name)
			else
				empty ?

p.
	doc. "TODO"
	test. |
		x =
			a. 1
			b. ()
		[ x "a" ] -> 1
		[ x "b" ] -> ()

		!debug-fails? |
			p "c"
	|_:Obj name:Obj-Key
		in
			! p? _ name
			\ TODO: decide
			\ ! (contains? Any (js-sub _ name)) ~"{_}.{name} is missing"
		js-sub _ name

p?.
	doc. "
		Whether there is a property by that name.
		It may be null/undefined.
	test. |
		x =
			a. 1
		[ x "a" ] -> true
		[ x "b" ] -> false
		[ x "toString" ] -> false \ use has-property-or-in-prototype? for that.
	|obj name:Obj-Key
		Obj.prototype.hasOwnProperty.call obj name

p-with-proto?.
	doc. "Like `p?` but looks through the prototype."
	test. |
		[ (empty Obj) "toString" ] -> true
	|obj:Obj name:Obj-Key
		not (reference=? (js-sub obj name) undefined)

\ TODO: Move?
\ TODO: Handle recursive references.
inspect=?.
	doc. "
		For Objs, whether they are of the same type and have `=?` members.
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
		null-a = reference=? a ()
		null-b = reference=? b ()
		\ TODO: Not :Obj because that currently also includes Funs
		obj-a = and (not null-a) ~(reference=? (js-typeof a) "object")
		obj-b = and (not null-b) ~(reference=? (js-typeof b) "object")
		case
			nor obj-a obj-b
				reference=? a b
			xor obj-a obj-b
				false
			else
				same-type = reference=? (Obj.getPrototypeOf a) (Obj.getPrototypeOf b)
				and same-type ~
					ak = Obj.getOwnPropertyNames a
					bk = Obj.getOwnPropertyNames b
					and (=? (count ak) (count bk)) ~
						all? ak |k
							=? (js-sub a k) (js-sub b k)

\ TODO: Move?
frozen?. |_
	Obj.isFrozen _

\ TODO: Move elsewhere in this file
\ TODO: Test these
impl! empty (self-type Obj) |
	Obj.freeze (Obj.create Obj.prototype)

empty-Obj?.
	doc. "TODO"
	test. |
		[ (empty Obj) ] -> true
		[ Obj ] -> false
	|_:Obj
		empty? (@p-all _

empty-Obj!.
	doc. "TODO"
	test. |
		_ = empty Obj!
		p+mut! _ "a" 1
		empty-Obj! _
		! empty-Obj? _
	|_:Obj
		each! @p-all_ p-![_]

Obj->Map.
	doc. "TODO"
	test. |
		\ TODO:SYNTAX [ a. 1, b. 2 ]
		obj = call |
			a. 1
			b. 2
		[ obj ] ->
			"a" -> 1
			"b" -> 2
	|_:Obj
		make-map @p-all_ p[_]

Map->Obj.
	doc. "TODO"
	test. |
		\ TODO:SYNTAX [ "a" -> 1, "b" -> 2 ]
		map =
			"a" -> 1
			"b" -> 2
		[ map ] ->
			a. 1
			b. 2
		!debug-fails? |
			Map->Obj
				1 -> 2
	|_:Map
		obj = empty Obj!
		each-pair! _ |key val
			p+! obj key val
		freeze obj

Obj
