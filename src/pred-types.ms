doc. "TODO"

use
	.assert -> ! !not
	.basic-methods -> sub
	.Bool -> not or true
	.Num
	.Str
	.Symbol
	.types.Interface -> implementor!
	.types.Method -> impl!
	.types.Pred-Type
	.types.Record-Type
	.types.singleton
	.types.Type -> subsumes?
	.types.util -> self-type

Opt. Pred-Type
	doc. "A value which could be null or undefined."
	predicate. |
		`true`

impl! sub (self-type Opt)
	doc. "Subsumes null, undefined, or an instance of Exists-Type."
	|Exists-Type
		ET = Exists-Type
		Opt-Sub
			Exists-Type. ET

Opt-Sub = Record-Type
	doc. "Result of calling Opt[something]."
	members.
		Exists-Type. Type

implementor! Opt-Sub Type
impl! subsumes? Opt-Sub |nt _
	or (not :Any) ~(subsumes? nt.Exists-Type _)

Any. Pred-Type
	doc. "Not null or undefined."
	test. |
		! subsumes? Any 0
		!not subsumes? Any ()
		!not subsumes? Any `undefined`
	predicate. |_
		_ \ TODO:Ignored vars
		`_ != null`

Union. singleton
	doc. "Union[A B] is a type matching either an A or a B."
	test. |
		SI = Union[Str Bool]
		! subsumes? SI "true"
		! subsumes? SI true
		!not subsumes? SI ()

\ TODO: Variadic
impl! sub Union |u A:Type B:Type
	u \ TODO:Ignored vars
	Pred-Type
		displayName. "some union"\ "Union[{A} {B}]"
		predicate. |_
			or :A ~:B

()
