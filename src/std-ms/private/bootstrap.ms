doc. "
	Since most Mason modules use types heavily, we need untyped versions of functions in here to avoid dangerous recursive dependencies.

\ TODO: Make this as small as possible.

oh-no!. |~message
	msg = message
	`throw new global.Error(msg)`
	()

own-properties. |object
	(Object.getOwnPropertyNames object).concat (Object.getOwnPropertySymbols object)

global. `global`
get. |object key
	case `object[key]`
		exists?_
			_
		else
			oh-no! ~"Unexpected undefined member {key} of {object}"
get-or-undefined. |dict key
	`dict[key]`
set!. |dict key val
	global.Object.defineProperty dict key
		value. val
set-mutable!. |dict key val
	`dict[key] = val`
has?. |dict key
	Object.prototype.hasOwnProperty.call dict key
has-or-in-proto?. |dict key
	`dict[key] !== undefined`
!. |cond
	`if (!cond) throw new Error("I messed up!")`
	()
extend!. global.Object.assign
exists?. |a
	`a !== undefined`
any?. |a
	`a != null` \ Neither null nor undefined
true. `true`
false. `false`
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
		`typeof _ == typeOf`
type-of-check. |name
	|ignore _
		`typeof _ === name`

\ TODO: Separate Fun from Callable
type-of-sub?! Fun "function"

\ Every Fun is a type (including Fun itself), because every Fun may be a constructor.
proto-impl-sub?! Fun.prototype |fun _
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
				exists? _
					\ TODO
					~"Variable `{name}` is no {type}, is {subsumed}"
				else
					~"Variable `{name}` is undefined."

\ Don't set permanently because that will be done by `implementor! Fun Type`.
set-mutable! Fun.prototype syms.!sub type-!sub

()
