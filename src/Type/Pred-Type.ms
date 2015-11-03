import
	..Function Pred
	..js defined? id=?
	..methods sub
	.Method self-impl!
	.Type _ => contains?
import~
	..@.@ any? @map

Pred-Type. class kind Type
	| Arbitrary predicates can be made into types using Pred-Type.
	construct params
		Object.assign this params
		assert .name:String
		assert .predicate:Pred

	contains? |value
		.predicate value

region Opt
	Opt. new Pred-Type
		| A value which could be anything, even undefined.
		name.
		predicate. |
			true

	self-impl! sub Opt
		| Contains undefined or an instance of Exists-Type.
		|Exists-Type:Type
			ET = Exists-Type
			new Opt-Sub ET

	Opt-Sub = class kind Type
		| Result of calling Opt[something].
		construct .Exists-Type:Type
			pass

		contains? |_
			or (not defined?_) :.Exists-Type

Any. new Pred-Type
	| Not undefined.
	name.
	predicate. defined?

ObjLit. new Pred-Type
	| Matches only Objects which have no type (other than Object itself).
	name.
	predicate. |_
		and :Object (id=? Object.getPrototypeOf_ Object.prototype)

Union.
	| Type that matches one of several types. Analogous to `or`.
	new Object

self-impl! sub Union |...types
	new Pred-Type
		name.
			names = @map types &.name
			"Union[{=> String names " "}]"
		predicate. |_
			any? types |possible-type
				:possible-type
