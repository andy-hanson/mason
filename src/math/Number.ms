import
	..compare _ =? <? <=? >? >=?
	..control opr
	..js id=? js< js<= js> js>= js+ js- js* js/ js-mod
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

	same-sign?. |a:Number b:Number
		<=? 0 (* a b)

region Integer arithmetic
	remainder. |numerator:Number denominator:Number
		| Remainder of `a` after dividing by `b`.
		| Sign of result is sign of `a`. Sign of `b` is ignored.
		js-mod numerator denominator

	int/. |a:Number b:Number
		| Integer division: throws out any remainder.
		| This is the default in other programming languages, but in Mason `/ 1 2` is 0.5, not 0.
		Math.floor (/ a b)

	modulo. |numerator:Number denominator:Number
		| Mathematical modulus.
		| Smallest positive number which can be added to a multiple of `denominator` to get `numerator`.
		case
			<? numerator 0
				+ (Math.abs denominator) (remainder numerator denominator)
			else
				remainder numerator denominator

	divisible?. |a:Number b:Number
		| Whether an integer number of `b` can add up to `a`.
		=? 0 (remainder a b)

region Real arithmetic
	todo  Some of these are unnecessary...

	log. |base:Number n:Number
		| Mathematical logarithm.
		/ (Math.log n) (Math.log base)

	square. |_:Number
		* _ _

	square-root. |_:Number
		todo doc
		assert <=? 0 _ throw "Can't take square root of negative number {_}."
		Math.sqrt _

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
				avg-mag = / (+ (Math.abs a) (Math.abs b)) 2
				n-digits-avg-mag = Math.floor (log 10 avg-mag)
				scale = Math.pow 10 (* -1 n-digits-avg-mag)
				scaled-diff = - (* a scale) (* b scale)
				epsilon = Math.pow 10 (* -1 sig-figs)
				<? (Math.abs scaled-diff) epsilon

	near-0?. |_ sig-figs:Opt[Nat]
		| Whether it is close to zero.
		| It must be `0.0...` where there are `sig-figs` 0s after the decimal point.
		sig-figs := opr sig-figs 6
		|| This is more accurate than `Math.pow 0.1 sig-figs`
		max = Math.pow 10 (* -1 sig-figs)
		<? Math.abs_ max

region Utilities
	neg. |_:Number
		todo doc
		* -1 _

	mid. |a:Number b:Number
		todo doc
		/ (+ a b) 2
