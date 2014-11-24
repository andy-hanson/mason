doc. "
	Since most Mason modules use types heavily, we need untyped versions of functions in here to avoid dangerous recursive dependencies.

\ TODO: Make this as small as possible.

\ TODO: Just use Try.oh-no!
oh-no!. |~message
	msg = message
	msg \ TODO:Ignored vars
	`throw new global.Error(msg)`
	()

own-properties. |object
	(Object.getOwnPropertyNames object).concat (Object.getOwnPropertySymbols object)

global. `global`

\ TODO: get-property
get. |object key
	case `object[key]`
		exists?_
			_
		else
			oh-no! ~"Unexpected undefined member {key} of {object}"
\ TODO: Use this instead of js literals where possible
get-or-undefined. |object key
	object \ TODO:Ignored vars
	key \ TODO:Ignored vars
	`object[key]`
set!. |object key val
	global.Object.defineProperty object key
		value. val
set-mutable!. |object key val
	global.Object.defineProperty object key
		value. val
		writable. true
has?. |dict key
	Object.prototype.hasOwnProperty.call dict key
has-or-in-proto?. |object key
	object \ TODO:Ignored vars
	key \ TODO:Ignored vars
	`object[key] !== undefined`
extend!. global.Object.assign

\ TODO: Make sure I'm using the right one!
exists?. |a
	a \ TODO:Ignored vars
	`a !== undefined`
any?. |a
	a \ TODO:Ignored vars
	`a != null` \ Neither null nor undefined

true. `true`
false. `false`

\ TODO: Use instead of `_ms`
ms. get global "_ms"

\ These must be Symbols because they are defined on builtin types.
syms.
	sub?. get ms "symSubsumes"
	!sub. get ms "symCheckSubsumes"
	type-of. global.Symbol "type-of"

\ TODO: See which of these are really necessary.
Array. global.Array
Bool. global.Boolean
Fun. global.Function
Num. global.Number
Symbol. global.Symbol

\ TODO: Rename to `direct-impl`, because I'm sometimes not calling this on a prototype
proto-impl-sub?!. |proto impl
	set! proto syms.sub? impl
proto-impl-!sub!. |proto impl
	set! proto syms.!sub impl
type-of-sub?!. |fun typeOf
	proto-impl-sub?! fun |ignore _
		ignore \ TODO:Ignored vars
		_ \ TODO:Ignored vars
		typeOf \ TODO:Ignored vars
		`typeof _ == typeOf`
type-of-check. |name
	name \ TODO: Ignored vars
	|ignore _
		ignore \ TODO:Ignored vars
		_ \ TODO:Ignored vars
		`typeof _ === name`

\ TODO: Separate Fun from Callable
type-of-sub?! Fun "function"

\ Every Fun is a type (including Fun itself), because every Fun may be a constructor.
proto-impl-sub?! Fun.prototype |fun _
	fun \ TODO:Ignored vars
	_ \ TODO:Ignored vars
	`_ instanceof fun`

type-of-sub?! Bool "boolean"

Str. global.String
type-of-sub?! Str "string"

Dict. ms.Dict

Object. global.Object
\ Everything non-primitive is an object.
isObj = Fun "ignore" "_" "
	if (_ === null) return false;
	switch (typeof _) \{
		case "boolean":
		case "undefined":
		case "number":
		case "string":
			return false
		default:
			return true
	}

proto-impl-sub?! Object isObj

type-of-sub?! Symbol "symbol"

type-of-sub?! Num "number"

\ TODO: Use subsumes? method
type-!sub. |type subsumed name \ TODO: name:Str
	impl = get type syms.sub?
	case! impl type subsumed
		_
			()
		else
			oh-no! case subsumed
				exists?_
					~"Variable `{name}` is no {type}, is {subsumed}"
				else
					~"Variable `{name}` is undefined."

\ Don't set permanently because that will be done by `implementor! Fun Type`.
set-mutable! Fun.prototype syms.!sub type-!sub

()
