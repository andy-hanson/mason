doc. "TODO"

use
	..arithmetic-methods -> /
	..assert -> ! !=
	..bags.? -> get-or Opt->?
	..bags.Bag -> each!
	..maps.Map -> keys
	.Num -> infinity Nat near? pi/2 pi pi3/2
	..pred-types -> Opt
	..js -> global

Math = global.Math

\ TODO: doc, test, move
\ TODO: Optional parameters
!near = |a b sig-figs:Opt[Nat]
	sfs = get-or (Opt->? sig-figs) 6
	! (near? a b sfs) ~"{a} ≠ {b} (to within {sfs} digits)"

\ TODO: doc, test, move
!apply-near = |fun apps
	each! (keys apps) |key
		!near (fun key) apps[key]

sin.
	doc. "Y-value of the point on the unit circle this many radians counter-clockwise from +x."
	test. |
		!apply-near sin
			0 -> 0
			pi/2 -> 1
			pi -> 0
			pi3/2 -> -1
	|radian-angle:Num
		Math.sin radian-angle

cos.
	doc. "X-value of the point on the unit circle this many radians counter-clockwise from +x."
	test. |
		!apply-near cos
			0 -> 1
			pi/2 -> 0
			pi -> -1
			pi3/2 -> 0
	|radian-angle:Num
		Math.cos radian-angle

tan.
	doc. "`/ sin cos`"
	test. |
		!apply-near tan
			0 -> 0
			pi -> 0
	|_:Num
		Math.tan _

acos.
	doc. "`cos res` should be `n`."
	test. |
		!apply-near acos
			0 -> pi/2
			0.5 -> / pi 3
			1 -> 0
	|n:Num
		Math.acos n

asin.
	doc. "`sin res` should be `n`."
	test. |
		!apply-near asin
			0 -> 0
			0.5 -> / pi 6
			1 -> pi/2
	|n:Num
		Math.asin n

atan.
	doc. "`tan res` should be `n`"
	test. |
		!apply-near atan
			0 -> 0
	|n:Num
		Math.atan n
