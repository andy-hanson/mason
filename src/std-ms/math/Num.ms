use
	..arithmetic-methods -> + - * /
	..assert -> ! != !fails
	..bags.? -> get-or Opt->?
	..Bool -> and not
	..Comparable -> =? <? >? <=? >=? compare
	..js -> global
	..Object -> get-property
	..pred-types -> Opt
	..types.Method -> impl!
	..types.Pred-Type
	..types.Type -> subsumes?

Num = global.Number
Math = global.Math

region Constants
	infinity. `Num.POSITIVE_INFINITY` \get-property Num "POSITIVE_INFINITY"
	-infinity. `Num.NEGATIVE_INFINITY` \get-property Num "NEGATIVE_INFINITY"
	not-a-number. Num.NaN
	max-safe-integer. `Num.MAX_SAFE_INTEGER`\get-property Num "MAX_SAFE_INTEGER"
	pi. Math.PI
	pi/2. `pi / 2`
	pi3/2. `pi * 3 / 2`
	pi*2. `pi * 2`

Int. Pred-Type
	doc. "TODO"
	test. |
		! (subsumes? Int 1)
		! (not (subsumes? Int 1.1))
		! (subsumes? Int max-safe-integer)
		! (not (subsumes? Int (increment max-safe-integer)))
	predicate. |_
		and :Num ~(Num.isSafeInteger (_.valueOf ()))

Nat. Pred-Type
	doc. "TODO"
	test. |
		! (subsumes? Nat 0)
		! (not (subsumes? Nat -1))
	predicate. |_
		and :Int ~(>=? _ 0)


impl! compare Num |a b:Num
	`a - b`
impl! =? Num |a _
	and :Num ~`a === _`
impl! <? Num |a b:Num
	`a < b`
impl! >? Num |a b:Num
	`a > b`
impl! <=? Num |a b:Num
	`a <= b`
impl! >=? Num |a b:Num
	`a >= b`

impl! + Num |a b:Num
	`a + b`
impl! - Num |a b:Num
	`a - b`
impl! * Num |a b:Num
	`a * b`
impl! / Num |a b:Num
	`a / b`

region Integer arithmetic
	remainder.
		doc. "
			Remainder of `a` after dividing by `b`.
			Sign of result is sign of `a`. Sign of `b` is ignored.

		test. |
			!= 1 (remainder 3 2)
			!= -1 (remainder -3 2)
		|a:Num b:Num
			`a % b`

	divisible?.
		doc. "Whether an integer number of `b` can add up to `a`."
		test. |
			! (divisible? 4 2)
			! (divisible? 4 -2)
			! (not (divisible? 3 2))
		|a:Num b:Num
			=? 0 (remainder a b)

	even?. |_:Num
		divisible? _ 2

	odd?. |_:Num
		not even?_

	increment. |_:Num
		+ _ 1

	decrement. |_:Num
		- _ 1

	neg. |_:Num
		* _ -1

region Real arithmetic
	log-e. |_:Num
		Math.log _

	log.
		doc. "TODO"
		test. |
			\ TODO: spread !near
			! (near? (log 10 0.01) -2)
			!= (log 2 8) 3
		|base:Num n:Num
			/ (log-e n) (log-e base)

	abs.
		doc. "Negates `a` until it is positive."
		test. |
			!= (abs 1) 1
			!= (abs -1) 1
		|a:Num
			Math.abs a

	pow.
		doc. "`a` raised to the power of `b`."
		test. |
			!= 8 (pow 2 3)
		|a:Num b:Num
			`Math.pow(a, b)`

	square. |_:Num
		* _ _

	square-root.
		test. |
			!= (square-root 4) 2
			!fails |
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
			!= (round -0.5) 0
			!= (round 0.5) 1
		|_:Num
			Math.round _

	round-down.
		doc. "Greatest integer no greater than `a`."
		test. |
			!= (round-down -0.5) -1
			!= (round-down 0.5) 0
		|_:Num
			Math.floor _

	round-up.
		doc. "Least integer no less than `a`."
		test. |
			!= (round-up -0.5) 0
			!= (round-up 0.5) 1
		|_:Num
			Math.ceil _

	round-towards-0.
		doc. "`round-down` if positive, else `round-up`."
		test. |
			!= (round-towards-0 -0.5) 0
			!= (round-towards-0 0.5) 0
		|_:Num
			`_ | 0`

region Near
	near?. Method
		doc. "POOP"

	impl! near? Num
		test. |
			! (near? 1000.9 1000 3)
			! (not (near? 1000.9 1000 4))
			! (near? 0.001001 0.001 3)
			! (not (near? 0.001001 0.001 4))
			! (not (near? 0.001 -0.001 1)) "Numbers with different signs are never near"
			region Behaves like `near-0?` when an arg is 0
				! (near? 0.00999 0 2)
				! (near? 0 0.00999 2)
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

	near-0?. Method
		doc. "
			Whether it is close to zero.
			It must be `0.0...` where there are `sig-figs` 0s after the decimal point.

	impl! near-0? Num
		test. |
			! (near-0? 0.00999 2)
			! (not (near-0? 0.01 2))
		\ TODO: Optional arguments
		|_ sig-figs:Opt[Nat]
			sfs = get-or (Opt->? sig-figs) 6
			\ This is more accurate than `pow 0.1 sfs`
			max = pow 10 (neg sfs)
			<? abs_ max

Num
