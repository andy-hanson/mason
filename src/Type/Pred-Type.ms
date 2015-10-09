import
	..Function Pred
	..js defined? id=?
	..methods sub
	.Kind kind!
	.Method impl! self-impl!
	.Type _ => contains?
import~
	..@.@ any?

Pred-Type. class
	| Arbitrary predicates can be made into types using Pred-Type.
	construct! params
		Object.assign this params
		assert! .name:String
		assert! .predicate:Pred

kind! Pred-Type Type
impl! contains? Pred-Type .|value
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

	Opt-Sub = class
		| Result of calling Opt[something].
		construct! .Exists-Type:Type
			pass

	kind! Opt-Sub Type
	impl! contains? Opt-Sub .|_
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
			names = @for types
				_.name
			"Union[{=> String names " "}]"
		predicate. |_
			any? types |type
				:type
