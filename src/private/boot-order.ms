use
	source-map-support install
	\ stack-displayname \ Doesn't play nice with source-map-support
install()

\ TODO:SYNTAX use!
use
	..Type \ This turns on type checks!
	..Fun
	..@.Array \ <! Array @
	..Map.Hash-Map \ Provides _ms.map
	..show \ Important to load this now, as it will help error messages

Array Type Fun Hash-Map show

\ TODO: remove once test.ms gets this using use!
ignore-me. 3
