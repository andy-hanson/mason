# Type

A `Type` is something that `contains?` a certain set of values.

When declaring a local, including in function arguments, use `:` to assert a value's type. This calls `contains?` and asserts that the result is true.

	use
		mason.math.methods +
		mason.math.Num Int

	one:Int = 1
	plus-one = |:Int n:Int
		+ n one
	plus-one 1
	# Uncomment this and it will fail:
	# plus-one "one"

# Making Types

Under construction...



# Naming

Mason uses sigils to indicate type.
This is just a convention and may not always be appropriate.

Looks like | Means | Example
:-: | :-: | :-:
`?a` | `?` (option) | `?find`
`$a` | `$` (promise) | `$read-file "Hello.txt"`
`@a` | `@` (bag) | `@prime = [ 2 3 5 ]`
`a->b` | `Map` (from a to b) | `name->address`
`a~` | `Generator!` | `each~`
`a?` | `Bool` | `even?`

An optional promise is `?$a`; a promise for an option is `$?a`.

Middle text

No

more

Other uses of symbols in names:

Looks like | Means | Example
:-: | :-: | :-:
`a!` | Mutation or write-like I/O | `log! "Hello, world!"`
`A!` | Mutable type | `empty Map!`
`!` | Assertion | `! <? 1 2`
