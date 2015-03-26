use
	..Bool and
	..compare =? <? <=? compare
	..control opr
	..Obj p
	..js global id=? js-bar js< js<= js+ js- js* js/ js%
	..Type.Method impl!
	..Type.Pred-Type _ Opt
	.methods + - * /
use-debug
	..! _ !not
	..Bool false true
	..Fun spread!
	..Try fails?
	..Type contains?

Num =
	doc. "
		JavaScript's native Number type.
		Any floating-point value.
	global.Number

Math = global.Math

Int. Pred-Type
	doc. "
		A multiple of 1.
		This only contains Nums for which integer methods return sensible results, AKA safe ints.
		This is anything between min-safe-integer and max-safe-integer.
	test. |
		spread! ![contains?[Int]]
			. 1
			. min-safe-int
			. max-safe-int
		spread! !not[contains?[Int]]
			. 1.1
			. - min-safe-int 1
			. + max-safe-int 1
	predicate. |_
		Num.isSafeInteger _

Nat. Pred-Type
	doc. "Any counting number, including `0`."
	test. |
		! contains? Nat 0
		!not contains? Nat -1
	predicate. |_
		and :Int ~(<=? 0 _

region impl!
	impl! compare Num -
	impl! =? Num
		test. |
			[ not-a-number not-a-number ] -> true
		id=?
	impl! <? Num |a b:Num
		js< a b
	impl! <=? Num |a b:Num
		js<= a b
	impl! + Num |a b:Num
		js+ a b
	impl! - Num |a b:Num
		js- a b
	impl! * Num |a b:Num
		js* a b
	impl! / Num |a b:Num
		js/ a b

region Tests
	sign.
		test. |
			[ -8 ] -> -1
			[ 0 ] -> 0
			[ 8 ] -> 1
		|_:Num
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
		|numerator:Num denominator:Num
			js% numerator denominator

	int/.
		doc. "
			Integer division: throws out any remainder.
			This is the default in other programming languages, but in Mason `/ 1 2` is 0.5, not 0.
		test. |
			[ 3 2 ] -> 1
			[ -3 2 ] -> -2
		|a:Num b:Num
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
			debug ! fails? |
				square-root -1
		|_:Num
			in
				! (<=? 0 _) "Can't take square root of negative number {_}."
			Math.sqrt _

region Rounding
	round.
		doc. "
			Closest integer.
			Rounds up to break ties.
		test. |
			[ -0.5 ] -> -0
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
			[ -0.5 ] -> -0
			[ 0.5 ] -> 1
		|_:Num
			Math.ceil _

	round-towards-0.
		doc. "`round-down` if positive, else `round-up`."
		test. |
			[ -0.5 ] -> 0
			[ 0.5 ] -> 0
		|_:Num
			js-bar _ 0

region Near
	near?.
		doc. "Whether they are within sig-figs precision."
		test. |
			[ 1000.9 1000 3 ] -> true
			[ 1000.9 1000 4 ] -> false
			[ 0.001001 0.001 3 ] -> true
			[ 0.001001 0.001 4 ] -> false
			[ 0.001 -0.001 1 ] -> false \ Numbers with different signs are never near.
			region Behaves like `near-0?` when an arg is 0
				[ 0.00999 0 2 ] -> true
				[ 0 0.00999 2 ] -> true
		|a b:Num ?sig-figs:Opt[Nat]
			sig-figs = opr ?sig-figs 6
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
		|_ ?sig-figs:Opt[Nat]
			sig-figs = opr ?sig-figs 6
			\ This is more accurate than `pow 0.1 sig-figs`
			max = pow 10 (* -1 sig-figs)
			<? abs_ max

region Constants
	infinity. p Num "POSITIVE_INFINITY"
	-infinity. p Num "NEGATIVE_INFINITY"
	max-safe-int. p Num "MAX_SAFE_INTEGER"
	min-safe-int. p Num "MIN_SAFE_INTEGER"
	not-a-number. Num.NaN

Num
