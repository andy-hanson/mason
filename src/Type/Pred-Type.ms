use
	..Bool not or true
	..Comparable! <!
	..Fun ignore Pred
	.Impl-Type self-type
	..js defined?
	..methods contains? sub
	..private.bootstrap Str
	.Method impl!
	.Record-Type
	..Type
debug use~
	..! _ !not
	..Bool

Pred-Type = Record-Type
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

	Opt-Sub = Record-Type
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
