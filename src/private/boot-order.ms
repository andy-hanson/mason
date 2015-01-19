use
	source-map-support -> install
	\stack-displayname
install
	hi.
\ stack-displayname \ Doesn't play nice with source-map-support

use
	..methods
	..types.Type
	..Fun
	..@.Array \ <! Array @
	..maps.Hash-Map \ Provides _ms.map
	..show \ Important to load this now, as it will help error messages
	.bootstrap -> set! ms

set! ms "show" show

ignore = |
	()
\ TODO:Ignored vars
ignore Type Fun Array Hash-Map show
