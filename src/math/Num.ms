use
	..arithmetic-methods -> + - * /
	..assert -> ! !not !call? !not-call?
	..bags.? -> get-or Opt->?
	..Bool -> and false true
	..Comparable -> =? <? >? <=? >=? compare
	..js -> global
	..Object -> get-property
	..pred-types -> Opt
	..private.operators -> op-bar op=== op< op> op<= op>= op+ op- op* op/ op%
	..show -> inspect-impl
	..Try -> fails?
	..types.Method -> impl!
	..types.Pred-Type
	..types.Type -> contains?

Num = global.Number
Math = global.Math

Int. Pred-Type
	doc. "
		A multiple of 1.
		This only contains Nums for which integer methods return sensible results, AKA safe ints.
		This is anything between min-safe-integer and max-safe-integer.
	test. |
		!call? contains?[Int]
			. 1
			. min-safe-integer
			. max-safe-integer
		!not-call? contains?[Int]
			. 1.1
			. - min-safe-integer 1
			. max-safe-integer
	predicate. |_
		Num.isSafeInteger _

Nat. Pred-Type
	doc. "Any counting number, including `0`."
	test. |
		! contains? Nat 0
		!not contains? Nat -1
	predicate. |_
		and :Int ~(>=? _ 0)

impl! compare Num -
impl! =? Num |a b
	op=== a b
impl! <? Num |a b:Num
	op< a b
impl! >? Num |a b:Num
	op> a b
impl! <=? Num |a b:Num
	op<= a b
impl! >=? Num |a b:Num
	op>= a b
impl! + Num |a b:Num
	op+ a b
impl! - Num |a b:Num
	op- a b
impl! * Num |a b:Num
	op* a b
impl! / Num |a b:Num
	op/ a b

region Tests
	sign.
		test. |
			[ -8 ] -> -1
			[ 0 ] -> 0
			[ 8 ] -> 1
			\ [ not-a-number ] -> not-a-number
		|_:Num
			case
				>? _ 0
					1
				<? _ 0
					-1
				=? _ 0
					0
				else
					not-a-number

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
		|numerator:Num denominator:Num
			op% numerator denominator

	modulo.
		doc. "
			Mathematical modulus.
			Smallest positive number which can be added to a multiple of `denominator` to get `numerator`."
		test. |
			[ 2 3 ] -> 2
			[ 2 -3 ] -> 2
			[ -2 3 ] -> 1
			[ -2 -3 ] -> 1
		|numerator:Num denominator:Num
			out
				divisible? (- numerator res) denominator
			case
				<? numerator 0
					+ (abs denominator) (remainder numerator denominator)
				else
					remainder numerator denominator

	divisible?.
		doc. "Whether an integer number of `b` can add up to `a`."
		test. |
			! divisible? 4 2
			! divisible? 4 -2
			!not divisible? 3 2
		|a:Num b:Num
			=? 0 (remainder a b)

	\ TODO: remove?
	neg. |_:Num
		* _ -1

region Real arithmetic
	log-e. |_:Num
		Math.log _

	log.
		doc. "Mathematical logarithm."
		test. |
			! near? (log 10 0.01) -2
			[ 2 8 ] -> 3
		|base:Num n:Num
			/ (log-e n) (log-e base)

	abs.
		doc. "Negates `a` until it is positive."
		test. |
			[ 1 ] -> 1
			[ -1 ] -> 1
		|a:Num
			Math.abs a

	pow.
		doc. "`a` raised to the power of `b`."
		test. |
			[ 2 3 ] -> 8
		|a:Num b:Num
			Math.pow a b

	square. |_:Num
		* _ _

	square-root.
		test. |
			[ 4 ] -> 2
			! fails? |
				square-root -1
		|_:Num
			in
				! (>=? _ 0) "Can't take square root of negative number {_}."
			Math.sqrt _

region Rounding
	round.
		doc. "
			Closest integer to `a`.
			Rounds up to break ties.

		test. |
			[ -0.5 ] -> 0
			[ 0.5 ] -> 1
		|_:Num
			Math.round _

	round-down.
		doc. "Greatest integer no greater than `a`."
		test. |
			[ -0.5 ] -> -1
			[ 0.5 ] -> 0
		|_:Num
			Math.floor _

	round-up.
		doc. "Least integer no less than `a`."
		test. |
			[ -0.5 ] -> 0
			[ 0.5 ] -> 1
		|_:Num
			Math.ceil _

	round-towards-0.
		doc. "`round-down` if positive, else `round-up`."
		test. |
			[ -0.5 ] -> 0
			[ 0.5 ] -> 0
		|_:Num
			op-bar _ 0

region Near
	\ TODO: Move to math-methods.ms
	near?. Method
		doc. "POOP"

	impl! near? Num
		doc. "TODO"
		test. |
			[ 1000.9 1000 3 ] -> true
			[ 1000.9 1000 4 ] -> false
			[ 0.001001 0.001 3 ] -> true
			[ 0.001001 0.001 4 ] -> false
			[ 0.001 -0.001 1 ] -> false \ Numbers with different signs are never near.
			region Behaves like `near-0?` when an arg is 0
				[ 0.00999 0 2 ] -> true
				[ 0 0.00999 2 ] -> true
		\ TODO: Optional arguments
		|a b:Num sig-figs:Opt[Nat]
			sfs = get-or (Opt->? sig-figs) 6
			case
				=? a 0
					near-0? b sfs
				=? b 0
					near-0? a sfs
				else
					\ TODO `avg` function?
					avg-mag = / (+ (abs a) (abs b)) 2
					n-digits-avg-mag = round-down (log 10 avg-mag)
					scale = pow 10 (neg n-digits-avg-mag)
					scaled-diff = - (* a scale) (* b scale)
					epsilon = pow 10 (neg sfs)
					<? (abs scaled-diff) epsilon

	\ TODO: math-methods.ms
	near-0?. Method
		doc. "
			Whether it is close to zero.
			It must be `0.0...` where there are `sig-figs` 0s after the decimal point.

	impl! near-0? Num
		test. |
			[ 0.00999 2 ] -> true
			[ 0.01 2 ] -> false
		\ TODO: Optional arguments
		|_ sig-figs:Opt[Nat]
			sfs = get-or (Opt->? sig-figs) 6
			\ This is more accurate than `pow 0.1 sfs`
			max = pow 10 (neg sfs)
			<? abs_ max

impl! inspect-impl Num
	test. |
		[ 12 ] -> "12"
		[ -1.0 ] -> "-1"
	|_
		base = 10
		_.toString base

region Constants
	infinity. get-property Num "POSITIVE_INFINITY"
	-infinity. get-property Num "NEGATIVE_INFINITY"
	not-a-number. Num.NaN
	max-safe-integer. get-property Num "MAX_SAFE_INTEGER"
	min-safe-integer. get-property Num "MIN_SAFE_INTEGER"
	pi. Math.PI
	pi/2. / pi 2
	pi3/2. * pi 1.5
	pi*2. * pi 2

Num