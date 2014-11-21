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
	..show
	..types.Type

source-map-support.install
	hi.
es6-shim
\ stack-displayname \ Doesn't play nice with source-map-support

Type \ This makes it safe to type things.
Fun \ Get its impl! ready
Dict \ Dict.empty used by many Record-Type_s
Hash-Map \ Provides _ms.map
Num
Array-as-Map!
Dict-as-Map
show \ Important to load this now, as it will help error messages
()
