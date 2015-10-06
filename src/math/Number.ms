import
	..compare _ =? <? <=? >? >=?
	..control opr
	..js id=? js-bar js< js<= js> js>= js+ js- js* js/ js-mod
	..Type.Method impl!
	..Type.Pred-Type _ Opt
	.methods + - * /
import-debug
	..Function spread!
	..Try fails?

Int. new Pred-Type
	| A multiple of 1.
	| This only contains Numbers for which integer methods return sensible results, AKA safe ints.
	| This is anything between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER.
	name.
	test. !|
		assert-int! = !|_
			assert! _:Int
		forbid-int! = !|_
			forbid! _:Int
		spread! assert-int!
			. 1
			. Number.MIN_SAFE_INTEGER
			. Number.MAX_SAFE_INTEGER
		spread! forbid-int!
			. 1.1
			. - Number.MIN_SAFE_INTEGER 1
			. + Number.MAX_SAFE_INTEGER 1
	predicate. Number.isSafeInteger

Nat. new Pred-Type
	| Any counting number, including `0`.
	name.
	test. !|
		assert! 0:Nat
		forbid! -1:Nat
	predicate. |_
		and :Int (<=? 0 _)

region impl!
	todo  impl*!
	impl! compare Number .|other:Number
		- this other
	impl! =? Number
		test. |
			[Number.NaN Number.NaN] -> true
		.|other
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
	sign.
		test. |
			[-8] -> -1
			[0] -> 0
			[8] -> 1
		|_:Number
			case
				<? 0 _
					1
				<? _ 0
					-1
				else
					0

region Integer arithmetic
	remainder.
		| Remainder of `a` after dividing by `b`.
		| Sign of result is sign of `a`. Sign of `b` is ignored.
		test. |
			[2 3] -> 2
			[2 -3] -> 2
			[-2 3] -> -2
			[-2 -3] -> -2
		|numerator:Number denominator:Number
			js-mod numerator denominator

	int/.
		| Integer division: throws out any remainder.
		| This is the default in other programming languages, but in Mason `/ 1 2` is 0.5, not 0.
		test. |
			[3 2] -> 1
			[-3 2] -> -2
		|a:Number b:Number
			round-down (/ a b)

	modulo.
		| Mathematical modulus.
		| Smallest positive number which can be added to a multiple of `denominator` to get `numerator`.
		test. |
			[2 3] -> 2
			[2 -3] -> 2
			[-2 3] -> 1
			[-2 -3] -> 1
		|numerator:Number denominator:Number
			out
				divisible? (- numerator res) denominator
			case
				<? numerator 0
					+ (abs denominator) (remainder numerator denominator)
				else
					remainder numerator denominator

	divisible?.
		| Whether an integer number of `b` can add up to `a`.
		test. !|
			assert! divisible? 4 2
			assert! divisible? 4 -2
			forbid! divisible? 3 2
		|a:Number b:Number
			=? 0 (remainder a b)

region Real arithmetic
	todo  Some of these are unnecessary...

	log-e. |_:Number
		Math.log _

	log.
		| Mathematical logarithm.
		test. |
			assert! near? (log 10 0.01) -2
			[2 8] -> 3
		|base:Number n:Number
			/ (log-e n) (log-e base)

	abs.
		| Negates `a` until it is positive.
		test. |
			[1] -> 1
			[-1] -> 1
		|a:Number
			Math.abs a

	pow.
		| `a` raised to the power of `b`.
		test. |
			[2 3] -> 8
		|a:Number b:Number
			Math.pow a b

	square. |_:Number
		* _ _

	square-root.
		test. |
			[4] -> 2
			debug assert! fails? !|
				square-root -1
		|_:Number
			in
				assert! <=? 0 _ throw! "Can't take square root of negative number {_}."
			Math.sqrt _

region Rounding
	todo probably want to get rid of these.

	round.
		| Closest integer.
		| Rounds up to break ties.
		test. |
			[-0.5] -> -0
			[0.5] -> 1
		|_:Number
			Math.round _

	round-down.
		| Greatest integer no greater than `a`.
		test. |
			[-0.5] -> -1
			[0.5] -> 0
		|_:Number
			Math.floor _

	round-up.
		| Least integer no less than `a`.
		test. |
			[-0.5] -> -0
			[0.5] -> 1
		|_:Number
			Math.ceil _

	round-towards-0.
		| `round-down` if positive, else `round-up`.
		test. |
			[-0.5] -> 0
			[0.5] -> 0
		|_:Number
			js-bar _ 0

region Near
	near?.
		| Whether they are within sig-figs precision.
		test. |
			[1000.9 1000 3] -> true
			[1000.9 1000 4] -> false
			[0.001001 0.001 3] -> true
			[0.001001 0.001 4] -> false
			[0.001 -0.001 1] -> false || Numbers with different signs are never near.
			region Behaves like `near-0?` when an arg is 0
				[0.00999 0 2] -> true
				[0 0.00999 2] -> true
		|a b:Number sig-figs:Opt[Nat]
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

	near-0?.
		| Whether it is close to zero.
		| It must be `0.0...` where there are `sig-figs` 0s after the decimal point.
		test. |
			[0.00999 2] -> true
			[0.01 2] -> false
		|_ sig-figs:Opt[Nat]
			sig-figs := opr sig-figs 6
			|| This is more accurate than `pow 0.1 sig-figs`
			max = pow 10 (* -1 sig-figs)
			<? abs_ max

region Utilities
	neg.
		todo doc
		test. |
			[1] -> -1
			[0] -> -0
		|_:Number
			* -1 _

	mid.
		todo doc
		test. |
			[0 1] -> 0.5
		|a:Number b:Number
			/ (+ a b) 2
