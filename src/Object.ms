import
	.Boolean xor
	.compare =?
	.js defined? id=? js== js-delete js-set js-sub js-typeof
	.methods freeze
	.to-string inspect
	.Type.Kind
	.Type.Pred-Type Opt
	.Type.Type =>
import~
	.@.@ ++ all? count empty? @keep
	.@.@-Type empty
	.@.? _ ?-or Opt->?
	.@.Map.Map _ make-map
	.@.Set.Id-Set
	.control opr

Object-Key. new Kind
	| Can be used as a name for a property of an object.
	name.
	implementors. [String Symbol]

todo better name?
can-get-p?. |_
	| Whether it's safe to try to directly access properties.
	not js== _ null

flag?. |:Boolean obj flag:Object-Key
	| If it has a property for the flag, uses that. Otherwise false.
	?-or (?p obj flag) false

~forbidden-fun-props = => Id-Set ["arguments" "caller"]
@p-all. |_
	| Every property name directly stored in an object.
	| Includes non-enumerable properties and symbols.
	props = Object.getOwnPropertyNames_
	todo  Use keep! to modify props
	own-names = case
		:Function
			@keep props |_
				not :forbidden-fun-props
		else
			props
	++ own-names Object.getOwnPropertySymbols_

@p.
	| Like @p-all, but excludes non-enumerable properties and symbols.
	|case
		can-get-p?_
			Object.keys_
		else
			[]

?p. |_ prop-name:Object-Key
	| `?` containing the value of the property, if it exists.
	if p? _ prop-name
		js-sub _ prop-name

?p-with-proto. |_ prop-name:Object-Key
	| Like `?p`, but also looks through the prototype chain.
	case
		can-get-p?_
			Opt->? (js-sub _ prop-name)
		else
			todo  ?None
			empty ?

p. |_ prop-name:Object-Key
	| Gets the value of a property. Does not include properties in the prototype.
	assert! p? _ prop-name
	js-sub _ prop-name

p?. |_ prop-name:Object-Key
	| Whether there is a property by that name.
	and can-get-p?_ (Object.prototype.hasOwnProperty.call _ prop-name)

p-with-proto?.
	| Like `p?` but looks through the prototype.
	|_ prop-name:Object-Key
		and can-get-p?_ (defined? (js-sub _ prop-name))

todo  Handle recursive references.
object=?. |a b
	| For Objects, whether they are of the same type and have `=?` properties.
	| For primitives, whether they are `=?`.
	|| Necessary because `js-typeof null` is "object"
	null-a = id=? a null
	null-b = id=? b null
	todo  Not :Object because that currently also includes Functions
	obj-a = and (not null-a) (id=? (js-typeof a) "object")
	obj-b = and (not null-b) (id=? (js-typeof b) "object")
	case
		not or obj-a obj-b
			id=? a b
		xor obj-a obj-b
			false
		else
			same-type = id=? (Object.getPrototypeOf a) (Object.getPrototypeOf b)
			and same-type
				ak = Object.getOwnPropertyNames a
				bk = Object.getOwnPropertyNames b
				and (=? (count ak) (count bk))
					all? ak |k
						=? (js-sub a k) (js-sub b k)

empty-Object. Object.freeze (Object.create Object.prototype)

empty-Object?. |_:Object
	| Whether there are no properties, not even hidden ones.
	empty? @p-all_

Object->Map. |_
	| A Map whose keys are property names and whose values are the properties' values.
	make-map @p_ p[_]

Map->Object. |_:Map
	| Given a Map whose keys are Strings, creates an Object whose Object->Map is that.
	with empty-Object!() as obj
		for! elem in _
			todo SYNTAX Array destructure
			p+! obj elem[0] elem[1]
		freeze obj

todo kill
prototype.
	| Gets prototype of an object.
	Object.getPrototypeOf

region Mutator methods
	todo kill; just use new Object or Object.create
	empty-Object!. |prototype:Opt[Object]
		| Creates a new Object! with no properties and the given prototype.
		Object.create (opr prototype Object.prototype)

	p+!. !|_:Object prop-name:Object-Key val
		| Adds a new immutable property.
		Object.defineProperty _ prop-name
			enumerable. true
			writable. false
			value. val

	p+mut!. !|_:Object prop-name:Object-Key val
		| Adds a new mutable property.
		Object.defineProperty _ prop-name
			enumerable. true
			writable. true
			value. val
			configurable. true

	p!. !|_:Object prop-name:Object-Key new-val
		| Modifies an already-existing property.
		assert! p? _ prop-name
		js-set _ prop-name new-val

	p-!. !|_:Object prop-name:Object-Key
		assert! p? _ prop-name
		js-delete _ prop-name

	todo kill
	extend!. !|_:Object extender:Object
		| Adds all the properties in `extender` to `_`.
		Object.assign _ extender

send. |target method-name:Object-Key ...args
	| Calls `target`'s method `method-name` with the given arguments.
	impl = js-sub target method-name
	assert! impl:Function throw! "Method {inspect method-name} not implemented by {inspect target}."
	impl.apply target args

send!. send

object-merge. |...objects
	Object.assign (new Object) ...objects

map-object-values. |obj:Object mapper:Function
	with new Object as mapped
		for! key in @p obj
			p+! mapped key (mapper (p obj key))
