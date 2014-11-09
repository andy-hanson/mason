doc. "TODO"

`require("es6-shim")`
`require("./ms")`

use
	\ This is huge because I don't clean it up after playing around
	.--boot-order
	.? -> ?some ?none
	.Alias-Type
	.alias-types
	.Array-as-Map!
	.arithmetic
	.arithmetic-methods -> +
	.Array
	.assert -> ! !=
	.Bag -> each! map
	.bit-arithmetic
	.Bool -> and false not true
	.Compare -> =?
	.console -> log!
	.error -> annotate-errors oh-no! try-catch-finally
	.Fun -> ignore
	.Hash-Map
	.Impl-Type
	.Interface -> implementor!
	.Method -> impl!
	.Num
	.Object -> get-property has-property? own-property-names
	.pred-types -> Any Int Union
	.Record-Type
	.Seq
	.Str -> ->Str inspect
	.test -> test-module test-modules
	.tests.type-test
	.Type -> subsumes?

--boot-order

|
	test-modules "./src/std-js"
