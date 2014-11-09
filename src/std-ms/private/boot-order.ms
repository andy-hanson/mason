\ TODO: use

use
	..maps.Array-as-Map!
	..Dict
	es6-shim
	..Fun
	..math.Num
	source-map-support
	stack-displayname
	..Str
	..types.Type

source-map-support.install ()
es6-shim
\ stack-displayname \ Doesn't play nice with source-map-support

\ TODO: --boot-order.ms ?
Type \ This makes it safe to type things.
Fun \ Get its impl! ready
Array-as-Map!
Dict \ Dict.empty used by many Record-Type_s
Str \ Important to load this now, as it will help error messages
Num
