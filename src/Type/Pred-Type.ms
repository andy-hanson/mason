use
	..Function Pred
	..js defined? id=?
	..methods sub
	.Kind kind!
	.Method impl! self-impl!
	.Type _ => contains?
use~
	..@.@ any?
use-debug
	..compare =?

Pred-Type. class
	# TODO: class attributes
	# doc. "Arbitrary predicates can be made into types using Pred-Type."
	construct! params
		Object.assign this params
		assert! .name:String
		assert! .predicate:Pred

kind! Pred-Type Type
impl! contains? Pred-Type .|value
	.predicate value

region Opt
	Opt. new Pred-Type
		name.
		doc. "A value which could be anything, even undefined."
		predicate. |
			true

	self-impl! sub Opt
		doc. "Contains undefined or an instance of Exists-Type."
		|Exists-Type:Type
			ET = Exists-Type
			new Opt-Sub ET

	Opt-Sub = class
		# TODO: class attributes
		# doc. "Result of calling Opt[something]."

		construct! .Exists-Type:Type
			pass

	kind! Opt-Sub Type
	impl! contains? Opt-Sub .|_
		or (not defined?_) :.Exists-Type

Any. new Pred-Type
	name.
	doc. "Not undefined."
	test. !|
		assert! 0:Any
		assert! null:Any
		forbid! undefined:Any
	predicate. defined?

ObjLit. new Pred-Type
	name.
	doc. "Matches only Objects which have no type (other than Object itself)."
	test. !|
		assert! (a. 1):ObjLit
		forbid! ObjLit:ObjLit
	predicate. |_
		and :Object (id=? Object.getPrototypeOf_ Object.prototype)

Union.
	doc. "Type that matches one of several types. Analogous to `or`."
	test. !|
		# As these are all Impl-Types, it would be better to use a Kind.
		SBN = Union[String Boolean Number]
		assert! =? SBN.name "Union[String Boolean Number]"
		assert! "true":SBN
		assert! true:SBN
		assert! 1:SBN
		forbid! null:SBN

self-impl! sub Union |...types
	new Pred-Type
		name.
			names = @for types
				_.name
			"Union[{=> String names " "}]"
		predicate. |_
			any? types |type
				:type
