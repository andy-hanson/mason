doc. "
	Funs for dealing with angles.
	By default angles are in radians.

use
	..js global
	.methods * /
	.Num _
debug use
	..! !call-near

Math = global.Math

pi. Math.PI
pi/2. / pi 2
pi3/2. * pi 1.5
pi*2. * pi 2

sin.
	doc. "Y-value of the point on the unit circle this many radians counter-clockwise from +x."
	test. |
		!call-near sin
			[ 0 ] -> 0
			[ pi/2 ] -> 1
			[ pi ] -> 0
			[ pi3/2 ] -> -1
	|radian-angle:Num
		Math.sin radian-angle

cos.
	doc. "X-value of the point on the unit circle this many radians counter-clockwise from +x."
	test. |
		!call-near cos
			[ 0 ] -> 1
			[ pi/2 ] -> 0
			[ pi ] -> -1
			[ pi3/2 ] -> 0
	|radian-angle:Num
		Math.cos radian-angle

tan.
	doc. "`/ sin cos`"
	test. |
		!call-near tan
			[ 0 ] -> 0
			[ pi ] -> 0
	|_:Num
		Math.tan _

acos.
	doc. "`cos res` should be `n`."
	test. |
		!call-near acos
			[ 0 ] -> pi/2
			[ 0.5 ] -> / pi 3
			[ 1 ] -> 0
	|n:Num
		Math.acos n

asin.
	doc. "`sin res` should be `n`."
	test. |
		!call-near asin
			[ 0 ] -> 0
			[ 0.5 ] -> / pi 6
			[ 1 ] -> pi/2
	|n:Num
		Math.asin n

atan.
	doc. "`tan res` should be `n`."
	test. |
		!call-near atan
			[ 0 ] -> 0
	|n:Num
		Math.atan n

region Convertion
	degrees-to-radians-factor. / pi 180
	degrees-to-radians.
		doc. "Converts an angle in degrees to one in radians."
		test. |
			[ 180 ] -> pi
		|degrees:Num
			* degrees degrees-to-radians-factor

	radians-to-degrees-factor. / 180 pi
	radians-to-degrees.
		doc. "Converts an angle in radians to one in degrees."
		test. |
			[ pi ] -> 180
		|radians:Num
			* radians radians-to-degrees-factor
