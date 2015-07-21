use
	..Function Pred
	..js defined? id=?
	..methods sub
	.Kind kind!
	.Method impl! self-impl!
	.Obj-Type
	.Type _ => contains?
use~
	..@.@ any?
use-debug
	..compare =?

Pred-Type. Obj-Type
	doc. "Arbitrary predicates can be made into types using Pred-Type."
	props.
		name. String
		predicate. Pred
	extensible. true

kind! Pred-Type Type
impl! contains? Pred-Type .|value
	.predicate value

region Opt
	Opt. Pred-Type
		doc. "A value which could be anything, even undefined."
		predicate. |
			true

	self-impl! sub Opt
		doc. "Contains null, undefined, or an instance of Exists-Type."
		|Exists-Type:Type
			ET = Exists-Type
			Opt-Sub
				Exists-Type. ET

	Opt-Sub = Obj-Type
		doc. "Result of calling Opt[something]."
		props.
			Exists-Type. Type
	kind! Opt-Sub Type
	impl! contains? Opt-Sub .|_
		or (not defined?_) (contains? .Exists-Type _

Any. Pred-Type
	doc. "Not undefined."
	test. !|
		assert! contains? Any 0
		assert! contains? Any null
		forbid! contains? Any undefined
	predicate. defined?

ObjLit. Pred-Type
	doc. "Matches only Objects which have no type (other than Object itself)."
	test. !|
		assert! contains? ObjLit (a. 1
		forbid! contains? ObjLit ObjLit
	predicate. |_
		and :Object (id=? (Object.getPrototypeOf _) Object.prototype

Union.
	doc. "Type that matches one of several types. Analogous to `or`."
	test. !|
		# As these are all Impl-Types, it would be better to use a Kind.
		SBN = Union[String Boolean Number]
		assert! =? SBN.name "Union[String Boolean Number]"
		assert! contains? SBN "true"
		assert! contains? SBN true
		assert! contains? SBN 3
		forbid! contains? SBN null

self-impl! sub Union |...types
	Pred-Type
		name. "Union[{=> String types " "}]"
		predicate. |_
			any? types |type
				contains? type _
