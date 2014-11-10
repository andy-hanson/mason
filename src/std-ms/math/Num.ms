use
	..arithmetic-methods -> + - * /
	..assert -> ! !=
	..Bool -> and not
	..Comparable -> =? <? >? <=? >=? compare
	..js -> global
	..Object -> get-property
	..types.Method -> impl!
	..types.Pred-Type
	..types.Type -> subsumes?

Num = global.Number

region Constants
	not-a-number. Num.NaN
	max-safe-integer. get-property Num "MAX_SAFE_INTEGER"

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
<<<<<<< HEAD
impl! =? Num |a _
	and :Num ~`a === _`
=======
impl! =? Num |a b:Num
	`a === b`
>>>>>>> 9ddb097... Added missing files
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


Math = global.Math

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

	even?. |a:Num
		divisible? a 2
	odd?. |a:Num
		divisible? a 2

	increment. |a:Num
		+ a 1

	decrement. |a:Num
		- a 1

region Real arithmetic
	log-e. |a:Num
		Math.log a

	log. |a:Num b:Num
		/ (log-e a) (log-e b)

	square. |a:Num
		* a a

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

	square-root.
		test. |
			!= (square-root 4) 2
		|a:Num
			in
				>=? a 0
			`Math.sqrt(a)`

region Rounding
	round.
		doc. "
			Closest integer to `a`.
			Rounds up to break ties.

		test. |
			!= (round -0.5) 0
			!= (round 0.5) 1
		|a:Num
			Math.round a

	round-down.
		doc. "Greatest integer no greater than `a`."
		test. |
			!= (round-down -0.5) -1
			!= (round-down 0.5) 0
		|a:Num
			Math.floor a

	round-up.
		doc. "Least integer no less than `a`."
		test. |
			!= (round-up -0.5) 0
			!= (round-up 0.5) 1
		|a:Num
			Math.ceil a

	round-towards-0.
		doc. "`round-down` if positive, else `round-up`."
		test. |
			!= (round-towards-0 -0.5) 0
			!= (round-towards-0 0.5) 0
		|a:Num
			`a | 0`


Num
