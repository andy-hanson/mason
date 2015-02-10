use
	..Bool and not or true
	..Fun ignore Pred
	.Impl-Type self-type
	..js defined? reference=?
	..methods <! sub
	..Obj
	..private.bootstrap Str
	.Method impl!
	.Obj-Type
	..Type _ contains?
debug use~
	..! _ !not
	..Bool

Pred-Type = Obj-Type
	doc. "Arbitrary predicates can be made into types using Pred-Type."
	members.
		displayName. Str
		predicate. Pred
	extensible.

<! Pred-Type Type
impl! contains? Pred-Type |_ value
	_.predicate value

region Opt
	\ TODO: Optional args: Does Opt need to exist any more?
	Opt. Pred-Type
		doc. "A value which could be anything, even undefined."
		predicate. |
			true

	impl! sub (self-type Opt)
		doc. "Contains null, undefined, or an instance of Exists-Type."
		|Exists-Type:Type
			ET = Exists-Type
			Opt-Sub
				Exists-Type. ET

	Opt-Sub = Obj-Type
		doc. "Result of calling Opt[something]."
		members.
			Exists-Type. Type
	<! Opt-Sub Type
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
		and :Obj ~(reference=? (Obj.getPrototypeOf _) Obj.prototype

Union.
	doc. "Union[A B] is a type matching either an A or a B."
	test. |
		SB = Union[Str Bool]
		! contains? SB "true"
		! contains? SB true
		!not contains? SB ()

\ TODO: Variadic
impl! sub (self-type Union) |u A:Type B:Type
	ignore u \ TODO:Ignored vars
	Pred-Type
		displayName. "some union"\ "Union[{A} {B}]" \ TODO
		predicate. |_
			or :A ~:B

Pred-Type
