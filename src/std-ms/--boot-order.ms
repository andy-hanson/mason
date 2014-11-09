use
	.Array-as-Map!
	.Dict
	.Fun
	source-map-support
	stack-displayname
	.Str
	.Type

source-map-support.install ()
\ stack-displayname \ Doesn't play nice with source-map-support

\ TODO: --boot-order.ms ?
Type \ This makes it safe to type things.
Fun \ Get its impl! ready
Array-as-Map!
Dict \ Dict.empty used by many Record-Type_s
Str \ Important to load this now, as it will help error messages
