doc. "TODO"

`require("es6-shim")`
`require("./ms")`

use
	\ This is huge because I don't clean it up after playing around
	.? -> ?some ?none
	.alias-types
	.arithmetic
	.arithmetic-methods -> +
	.Array
	.assert -> ! !=
	.Bag -> each! map
	.bit-arithmetic
	.Bool -> and false
	.console -> log!
	.error -> annotate-errors oh-no! try-catch-finally
	.Fun -> ignore
	.Interface -> implementor!
	.Method -> impl!
	.Num
	.Object -> get-property has-property? own-property-names
	.pred-types -> Any Int Union
	.Record-Type
	source-map-support
	stack-displayname
	.Seq
	.Str -> ->Str inspect
	.test -> test-modules
	.tests.type-test
	.Type -> subsumes?

source-map-support.install ()
\stack-displayname

\ TODO: --boot-order.ms ?
Type \ This makes it safe to type things.
Str \ Important to load this now, as it will help error messages
Fun \ Get its impl! ready

|
	test-modules "./src/std-js"

	log! "Hello from mason!"
