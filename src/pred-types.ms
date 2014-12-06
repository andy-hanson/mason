doc. "TODO"

use
	.assert -> ! !not
	.basic-methods -> sub
	.Bool -> not or true
	.Comparable! -> <!
	.Str
	.types.Method -> impl!
	.types.Pred-Type
	.types.Record-Type
	.types.singleton
	.types.Type -> contains?
	.types.util -> self-type

region Opt
	\ TODO: Does Opt need to exist?

	Opt. Pred-Type
		doc. "A value which could be null or undefined."
		predicate. |
			`true`

	impl! sub (self-type Opt)
		doc. "Contains null, undefined, or an instance of Exists-Type."
		|Exists-Type
			ET = Exists-Type
			Opt-Sub
				Exists-Type. ET

	Opt-Sub = Record-Type
		doc. "Result of calling Opt[something]."
		members.
			Exists-Type. Type
	<! Opt-Sub Type
	impl! contains? Opt-Sub |nt _
		or (not :Any) ~(contains? nt.Exists-Type _)

Any. Pred-Type
	doc. "Not null or undefined."
	test. |
		! contains? Any 0
		!not contains? Any ()
		!not contains? Any `undefined`
	predicate. |_
		_ \ TODO:Ignored vars
		`_ != null`

Union. singleton
	doc. "Union[A B] is a type matching either an A or a B."
	test. |
		SB = Union[Str Bool]
		! contains? SB "true"
		! contains? SB true
		!not contains? SB ()

\ TODO: Variadic
impl! sub Union |u A:Type B:Type
	u \ TODO:Ignored vars
	Pred-Type
		displayName. "some union"\ "Union[{A} {B}]" \ TODO
		predicate. |_
			or :A ~:B

()