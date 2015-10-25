import
	.Boolean xor
	.compare =?
	.js defined? exists? id=? js-delete js-set js-sub js-typeof
	.Type.Kind
	.Type.Type =>
import~
	.@.@ ++ all? count empty? @keep
	.@.? ?-or Opt->? ?None
	.@.Map.Map _ make-map
	.@.Set.Id-Set

Object-Key. new Kind
	| Can be used as a name for a property of an object.
	name.
	implementors. [String Symbol]

flag?. |:Boolean obj flag:Object-Key
	| If it has a property for the flag, uses that. Otherwise false.
	?-or (?property obj flag) false

~forbidden-fun-props = => Id-Set ['arguments 'caller]
@all-properties. |_
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

@properties. |_
	| Like @all-properties, but excludes non-enumerable properties and symbols.
	case
		exists?_
			Object.keys_
		else
			[]

?property. |_ prop-name:Object-Key
	| `?` containing the value of the property, if it exists.
	if property? _ prop-name
		js-sub _ prop-name

?property-with-proto. |_ prop-name:Object-Key
	| Like `?property`, but also looks through the prototype chain.
	case
		exists?_
			Opt->? (js-sub _ prop-name)
		else
			?None

property?. |_ prop-name:Object-Key
	| Whether there is a property by that name.
	and exists?_ (Object.prototype.hasOwnProperty.call _ prop-name)

property-with-proto?. |_ prop-name:Object-Key
	| Like `property?` but looks through the prototype.
	and exists?_ (defined? (js-sub _ prop-name))

todo  Handle recursive references.
object=?. |a b
	| For Objects, whether they are of the same type and have `=?` properties.
	| For primitives, whether they are `=?`.
	todo  Not :Object because that currently also includes Functions
	obj-a = and (not (id=? a null)) (id=? (js-typeof a) 'object)
	obj-b = and (not (id=? b null)) (id=? (js-typeof b) 'object)
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

empty-Object. Object.freeze (new Object)

empty-Object?. |_:Object
	| Whether there are no properties, not even hidden ones.
	empty? @all-properties_

Object->Map. |_
	| A Map whose keys are property names and whose values are the properties' values.
	make-map @all-properties_ |prop
		js-sub _ prop

Map->Object. |_:Map
	| Given a Map whose keys are Strings, creates an Object whose Object->Map is that.
	with new Object as obj
		for! elem of _
			todo SYNTAX Array destructure
			js-set obj elem[0] elem[1]

region Mutator methods
	delete-property!. !|_:Object prop-name:Object-Key
		assert! property? _ prop-name
		js-delete _ prop-name

object-merge. |...objects
	Object.assign (new Object) ...objects

object-select. |obj:Object ...@keys
	with new Object as kept
		for! key of @keys
			js-set kept key (js-sub obj key)

map-object-values. |obj:Object mapper:Function
	with new Object as mapped
		for! key of @properties obj
			js-set mapped key (mapper (js-sub obj key))
