use
	..bags.Bag-Type
	..Dict
	..Fun
	..maps.Array-as-Map!
	..maps.Dict-as-Map
	..maps.Hash-Map
	..math.Num
	source-map-support -> install
	\stack-displayname
	..show
	..types.Type
	..types.show-Type

install
	hi.
\ stack-displayname \ Doesn't play nice with source-map-support

\ Invokes lazy thunk
load = |x
	x

load Type \ This makes it safe to type things.
load Fun \ Get its impl! ready
load Dict \ Record-Types have default `default` of `empty Dict`
load Hash-Map \ Provides _ms.map
load Bag-Type
load Num
load Array-as-Map!
load Dict-as-Map
load show \ Important to load this now, as it will help error messages
load show-Type
()
