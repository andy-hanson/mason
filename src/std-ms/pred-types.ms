doc. "TODO"

use
	.assert -> !
	.basic-methods -> sub
	.Bool -> and not or true
	.control -> if!
	.fun -> Pred
	.js -> exists? global
	.Num
	.num-constants -> max-safe-integer
	.Str
	.Symbol
	.types.Interface -> implementor!
	.types.Method -> impl! impl-direct!
	.types.Pred-Type
	.types.Record-Type
	.types.singleton
	.types.Type -> !subsumes subsumes?

Opt. Pred-Type
	doc. "A value which could be null or undefined."
	predicate. |
		`true`

impl-direct! sub Opt
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
impl! !subsumes Opt-Sub |nt _
	if! :Any |
		!subsumes nt.Exists-Type _

Any. Pred-Type
	doc. "Not null or undefined."
	test. |
		! (subsumes? Any 0)
		! (not (subsumes? Any ()))
		! (not (subsumes? Any `undefined`))
	predicate. |_
		`_ != null`

Union. singleton
	doc. "Union[A B] is a type matching either an A or a B."
	test. |
		SI = Union[Str Bool]
		! (subsumes? SI "true")
		! (subsumes? SI true)
		! (not (subsumes? SI ()))

\ TODO: Variadic
impl! sub Union |u A:Type B:Type
	Pred-Type
		displayName. "Union[{A} {B}]"
		predicate. |_
			or :A ~:B

()
