use
	source-map-support install
	\stack-displayname
install
	hi.
\ stack-displayname \ Doesn't play nice with source-map-support

use
	..methods
	..Type
	..Fun
	..@.Array \ <! Array @
	..Map.Hash-Map \ Provides _ms.map
	..show \ Important to load this now, as it will help error messages
	.bootstrap set! ms

set! ms "show" show

ignore = |
	()
\ TODO:Ignored vars
ignore methods Type Fun Array Hash-Map show
