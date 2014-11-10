\ TODO: use

use
	..maps.Array-as-Map!
	..Dict
	es6-shim
	..Fun
	..maps.Dict-as-Map
	..maps.Hash-Map
	..math.Num
	source-map-support
	stack-displayname
	..Str
	..types.Type

source-map-support.install ()
es6-shim
\ stack-displayname \ Doesn't play nice with source-map-support

Type \ This makes it safe to type things.
Fun \ Get its impl! ready
Dict \ Dict.empty used by many Record-Type_s
Num
Hash-Map \ Provides _ms.map
Array-as-Map!
Dict-as-Map
Str \ Important to load this now, as it will help error messages
