use
	.methods * /
use-debug
	..! !call-with
	.Number near?

doc. "For dealing with angles. By default angles are in radians."

pi. Math.PI
pi/2. / pi 2
pi3/2. * pi 1.5
pi*2. * pi 2

sin.
	doc. "Y-value of the point on the unit circle this many radians counter-clockwise from +x."
	test. !|
		!call-with near? sin
			[ 0 ] -> 0
			[ pi/2 ] -> 1
			[ pi ] -> 0
			[ pi3/2 ] -> -1
	|radian-angle:Number
		Math.sin radian-angle

cos.
	doc. "X-value of the point on the unit circle this many radians counter-clockwise from +x."
	test. !|
		!call-with near? cos
			[ 0 ] -> 1
			[ pi/2 ] -> 0
			[ pi ] -> -1
			[ pi3/2 ] -> 0
	|radian-angle:Number
		Math.cos radian-angle

tan.
	doc. "`/ sin cos`"
	test. !|
		!call-with near? tan
			[ 0 ] -> 0
			[ pi ] -> 0
	|radian-angle:Number
		Math.tan radian-angle

acos.
	doc. "`cos res` should be `cos`."
	test. !|
		!call-with near? acos
			[ 0 ] -> pi/2
			[ 0.5 ] -> / pi 3
			[ 1 ] -> 0
	|cos:Number
		Math.acos cos

asin.
	doc. "`sin res` should be `sin`."
	test. !|
		!call-with near? asin
			[ 0 ] -> 0
			[ 0.5 ] -> / pi 6
			[ 1 ] -> pi/2
	|sin:Number
		Math.asin sin

atan.
	doc. "`tan res` should be `tan`."
	test. !|
		!call-with near? atan
			[ 0 ] -> 0
	|tan:Number
		Math.atan tan

region Convertion
	degrees-to-radians-factor. / pi 180
	degrees-to-radians.
		doc. "Converts an angle in degrees to one in radians."
		test. |
			[ 180 ] -> pi
		|degrees:Number
			* degrees degrees-to-radians-factor

	radians-to-degrees-factor. / 180 pi
	radians-to-degrees.
		doc. "Converts an angle in radians to one in degrees."
		test. |
			[ pi ] -> 180
		|radians:Number
			* radians radians-to-degrees-factor
