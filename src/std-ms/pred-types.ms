doc. "TODO"

use
	.arithmetic -> increment
	.assert -> !
	.basic-methods -> sub
	.Bool -> and if! not or true
	.fun -> Pred
	.js -> exists? global
	.Method -> impl! impl-direct!
	.Num
	.num-constants -> max-safe-integer
	.Pred-Type
	.Record-Type
	.singleton
	.Str
	.Symbol
	.Type -> !subsumes subsumes?

\ TODO: Rename to Opt
Opt. Pred-Type
	doc. "TODO"
	predicate. |
		`true`

impl-direct! sub Opt |Exists-Type
	ET = Exists-Type
	Opt-Sub
		Exists-Type. ET

Opt-Sub = Record-Type
	doc. "TODO"
	members.
		Exists-Type. Type

impl! subsumes? Opt-Sub |nt _
	or (not :Any) ~(subsumes? nt.Exists-Type _)

impl! !subsumes Opt-Sub |nt _
	if! :Any |
		!subsumes nt.Exists-Type _

Any. Pred-Type
	doc. "Not null or undefined."
	test. |
		! (subsumes? Any 0)
		! (subsumes? Any ())
		! (not (subsumes? Any `undefined`))
	predicate. |_
		`_ !== undefined`

Union. singleton
	doc. "Union[A B] is a type matching either an A or a B."
	test. |
		SI = Union[Str Bool]
		! (subsumes? SI "true")
		! (subsumes? SI true)
		! (not (subsumes? SI ()))

\ TODO: Variadic
impl! sub Union |ignore A:Type B:Type
	Pred-Type
		displayName. "Union[{A} {B}]"
		predicate. |_
			or :A ~:B

()
