use
	..compare _ =? <? <=?
	..control opr
	..Object p
	..js id=? js-bar js< js<= js+ js- js* js/ js-mod
	..Type.Method impl!
	..Type.Pred-Type _ Opt
	.methods + - * /
use-debug
	..Function spread!
	..Try fails?
	..Type.Type contains?

Int. Pred-Type
	doc. "
		A multiple of 1.
		This only contains Numbers for which integer methods return sensible results, AKA safe ints.
		This is anything between min-safe-integer and max-safe-integer.
	test. !|
		assert-int! = !|_
			assert! contains? Int _
		forbid-int! = !|_
			forbid! contains? Int _
		spread! assert-int!
			. 1
			. min-safe-int
			. max-safe-int
		spread! forbid-int!
			. 1.1
			. - min-safe-int 1
			. + max-safe-int 1
	predicate. Number.isSafeInteger

Nat. Pred-Type
	doc. "Any counting number, including `0`."
	test. !|
		assert! contains? Nat 0
		forbid! contains? Nat -1
	predicate. |_
		and :Int (<=? 0 _

region impl!
	# TODO: impl*!
	impl! compare Number -
	impl! =? Number
		test. |
			[ not-a-number not-a-number ] -> true
		id=?
	impl! <? Number |a b:Number
		js< a b
	impl! <=? Number |a b:Number
		js<= a b
	impl! + Number |a b:Number
		js+ a b
	impl! - Number |a b:Number
		js- a b
	impl! * Number |a b:Number
		js* a b
	impl! / Number |a b:Number
		js/ a b

region Tests
	sign.
		test. |
			[ -8 ] -> -1
			[ 0 ] -> 0
			[ 8 ] -> 1
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
		doc. "
			Remainder of `a` after dividing by `b`.
			Sign of result is sign of `a`. Sign of `b` is ignored.
		test. |
			[ 2 3 ] -> 2
			[ 2 -3 ] -> 2
			[ -2 3 ] -> -2
			[ -2 -3 ] -> -2
		|numerator:Number denominator:Number
			js-mod numerator denominator

	int/.
		doc. "
			Integer division: throws out any remainder.
			This is the default in other programming languages, but in Mason `/ 1 2` is 0.5, not 0.
		test. |
			[ 3 2 ] -> 1
			[ -3 2 ] -> -2
		|a:Number b:Number
			round-down (/ a b

	modulo.
		doc. "
			Mathematical modulus.
			Smallest positive number which can be added to a multiple of `denominator` to get `numerator`."
		test. |
			[ 2 3 ] -> 2
			[ 2 -3 ] -> 2
			[ -2 3 ] -> 1
			[ -2 -3 ] -> 1
		|numerator:Number denominator:Number
			out
				divisible? (- numerator res) denominator
			case
				<? numerator 0
					+ (abs denominator) (remainder numerator denominator)
				else
					remainder numerator denominator

	divisible?.
		doc. "Whether an integer number of `b` can add up to `a`."
		test. !|
			assert! divisible? 4 2
			assert! divisible? 4 -2
			forbid! divisible? 3 2
		|a:Number b:Number
			=? 0 (remainder a b)

region Real arithmetic
	# TODO: Some of these are unnecessary...

	log-e. |_:Number
		Math.log _

	log.
		doc. "Mathematical logarithm."
		test. |
			assert! near? (log 10 0.01) -2
			[ 2 8 ] -> 3
		|base:Number n:Number
			/ (log-e n) (log-e base)

	abs.
		doc. "Negates `a` until it is positive."
		test. |
			[ 1 ] -> 1
			[ -1 ] -> 1
		|a:Number
			Math.abs a

	pow.
		doc. "`a` raised to the power of `b`."
		test. |
			[ 2 3 ] -> 8
		|a:Number b:Number
			Math.pow a b

	square. |_:Number
		* _ _

	square-root.
		test. |
			[ 4 ] -> 2
			debug assert! fails? !|
				square-root -1
		|_:Number
			in
				assert! <=? 0 _ throw! "Can't take square root of negative number {_}."
			Math.sqrt _

region Rounding
	round.
		doc. "
			Closest integer.
			Rounds up to break ties.
		test. |
			[ -0.5 ] -> -0
			[ 0.5 ] -> 1
		|_:Number
			Math.round _

	round-down.
		doc. "Greatest integer no greater than `a`."
		test. |
			[ -0.5 ] -> -1
			[ 0.5 ] -> 0
		|_:Number
			Math.floor _

	round-up.
		doc. "Least integer no less than `a`."
		test. |
			[ -0.5 ] -> -0
			[ 0.5 ] -> 1
		|_:Number
			Math.ceil _

	round-towards-0.
		doc. "`round-down` if positive, else `round-up`."
		test. |
			[ -0.5 ] -> 0
			[ 0.5 ] -> 0
		|_:Number
			js-bar _ 0

region Near
	near?.
		doc. "Whether they are within sig-figs precision."
		test. |
			[ 1000.9 1000 3 ] -> true
			[ 1000.9 1000 4 ] -> false
			[ 0.001001 0.001 3 ] -> true
			[ 0.001001 0.001 4 ] -> false
			[ 0.001 -0.001 1 ] -> false # Numbers with different signs are never near.
			region Behaves like `near-0?` when an arg is 0
				[ 0.00999 0 2 ] -> true
				[ 0 0.00999 2 ] -> true
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
		doc. "
			Whether it is close to zero.
			It must be `0.0...` where there are `sig-figs` 0s after the decimal point.
		test. |
			[ 0.00999 2 ] -> true
			[ 0.01 2 ] -> false
		|_ sig-figs:Opt[Nat]
			sig-figs := opr sig-figs 6
			# This is more accurate than `pow 0.1 sig-figs`
			max = pow 10 (* -1 sig-figs)
			<? abs_ max

region Constants
	infinity. p Number "POSITIVE_INFINITY"
	-infinity. p Number "NEGATIVE_INFINITY"
	max-safe-int. p Number "MAX_SAFE_INTEGER"
	min-safe-int. p Number "MIN_SAFE_INTEGER"
	not-a-number. Number.NaN
