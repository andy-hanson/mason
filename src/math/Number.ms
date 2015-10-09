import
	..compare _ =? <? <=? >? >=?
	..control opr
	..js id=? js-bar js< js<= js> js>= js+ js- js* js/ js-mod
	..Type.Method impl!
	..Type.Pred-Type _ Opt
	.methods + - * /

Int. new Pred-Type
	| A multiple of 1.
	| This only contains Numbers for which integer methods return sensible results, AKA safe ints.
	| This is anything between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER.
	name.
	predicate. Number.isSafeInteger

Nat. new Pred-Type
	| Any counting number, including `0`.
	name.
	predicate. |_
		and :Int (<=? 0 _)

region impl!
	todo  impl*!
	impl! compare Number .|other:Number
		- this other
	impl! =? Number .|other
		id=? this other
	impl! <? Number .|other:Number
		js< this other
	impl! <=? Number .|other:Number
		js<= this other
	impl! >? Number .|other:Number
		js> this other
	impl! >=? Number .|other:Number
		js>= this other
	impl! + Number .|other:Number
		js+ this other
	impl! - Number .|other:Number
		js- this other
	impl! * Number .|other:Number
		js* this other
	impl! / Number .|other:Number
		js/ this other

region Tests
	sign. |_:Number
		case
			<? 0 _
				1
			<? _ 0
				-1
			else
				0

region Integer arithmetic
	remainder. |numerator:Number denominator:Number
		| Remainder of `a` after dividing by `b`.
		| Sign of result is sign of `a`. Sign of `b` is ignored.
		js-mod numerator denominator

	int/. |a:Number b:Number
		| Integer division: throws out any remainder.
		| This is the default in other programming languages, but in Mason `/ 1 2` is 0.5, not 0.
		round-down (/ a b)

	modulo. |numerator:Number denominator:Number
		todo SYNTAX doc comment should be able to go *before* out
		out
			divisible? (- numerator res) denominator
		| Mathematical modulus.
		| Smallest positive number which can be added to a multiple of `denominator` to get `numerator`.
		case
			<? numerator 0
				+ (abs denominator) (remainder numerator denominator)
			else
				remainder numerator denominator

	divisible?. |a:Number b:Number
		| Whether an integer number of `b` can add up to `a`.
		=? 0 (remainder a b)

region Real arithmetic
	todo  Some of these are unnecessary...

	todo kill
	log-e. |_:Number
		Math.log _

	log. |base:Number n:Number
		| Mathematical logarithm.
		/ (log-e n) (log-e base)

	todo kill
	abs. |a:Number
		| Negates `a` until it is positive.
		Math.abs a

	todo kill
	pow. |a:Number b:Number
		| `a` raised to the power of `b`.
		Math.pow a b

	square. |_:Number
		* _ _

	square-root. |_:Number
		todo doc
		in
			assert! <=? 0 _ throw! "Can't take square root of negative number {_}."
		Math.sqrt _

region Rounding
	todo Kill all of these!

	round. |_:Number
		| Closest integer.
		| Rounds up to break ties.
		Math.round _

	round-down. |_:Number
		| Greatest integer no greater than `a`.
		Math.floor _

	round-up. |_:Number
		| Least integer no less than `a`.
		Math.ceil _

	round-towards-0. |_:Number
		| `round-down` if positive, else `round-up`.
		js-bar _ 0

region Near
	near?. |a b:Number sig-figs:Opt[Nat]
		| Whether they are within sig-figs precision.
		sig-figs := opr sig-figs 6
		case
			=? a 0
				near-0? b sig-figs
			=? b 0
				near-0? a sig-figs
			else
				avg-mag = / (+ (abs a) (abs b)) 2
				n-digits-avg-mag = round-down (log 10 avg-mag)
				scale = pow 10 (* -1 n-digits-avg-mag)
				scaled-diff = - (* a scale) (* b scale)
				epsilon = pow 10 (* -1 sig-figs)
				<? (abs scaled-diff) epsilon

	near-0?. |_ sig-figs:Opt[Nat]
		| Whether it is close to zero.
		| It must be `0.0...` where there are `sig-figs` 0s after the decimal point.
		sig-figs := opr sig-figs 6
		|| This is more accurate than `pow 0.1 sig-figs`
		max = pow 10 (* -1 sig-figs)
		<? abs_ max

region Utilities
	neg. |_:Number
		todo doc
		* -1 _

	mid. |a:Number b:Number
		todo doc
		/ (+ a b) 2
