use
	..Bool and not or
	..Fun Pred
	..js defined? id=?
	..methods sub
	..Obj
	..private.bootstrap Str
	.Kind kind!
	.Method impl! self-impl!
	.Obj-Type
	.Type _ => contains?
use~
	..@.@ any?
use-debug
	..! _ !not
	..Bool
	..compare =?
	..math.Num

Pred-Type = Obj-Type
	doc. "Arbitrary predicates can be made into types using Pred-Type."
	props.
		displayName. Str
		predicate. Pred
	extensible.

kind! Pred-Type Type
impl! contains? Pred-Type |_ value
	_.predicate value

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
	impl! contains? Opt-Sub |nt _
		or (not defined?_) ~(contains? nt.Exists-Type _)

Any. Pred-Type
	doc. "Not undefined."
	test. |
		! contains? Any 0
		! contains? Any ()
		!not contains? Any undefined
	predicate. defined?

ObjLit. Pred-Type
	doc. "Matches only Objs which have no type (other than Obj itself)."
	test. |
		! contains? ObjLit (a. 1
		!not contains? ObjLit ObjLit
	predicate. |_
		and :Obj ~(id=? (Obj.getPrototypeOf _) Obj.prototype

Union.
	doc. "Type that matches one of several types. Analogous to `or`."
	test. |
		# As these are all Impl-Types, it would be better to use a Kind.
		SBN = Union[Str Bool Num]
		! =? SBN.displayName "Union[Str Bool Num]"
		! contains? SBN "true"
		! contains? SBN true
		! contains? SBN 3
		!not contains? SBN ()

self-impl! sub Union |...types
	Pred-Type
		displayName. "Union[{=> Str types " "}]"
		predicate. |_
			any? types |type
				contains? type _
Pred-Type
