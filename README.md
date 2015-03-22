# Mason

Mason is a language compiling to JavaScript that makes creating declarative data in a programmatic way easy.
It is currently in progress.


### Names

A name is sequence of characters not containing any of:

* Whitespace
* Groupings: `( ) [ ]`
* Special: `" \ | : . ~ _ ,`
* Reserved: ``` # ; { }``

Also, names can't start with a digit, and some names are reserved as keywords.
`^o^` and `a1-steak-sauce` are valid names; `use` (a keyword) and `1a` (starts with a digit) are not.


### Objs

An Obj is a collection of values given names.

	one. 1
	two. 2

Objs can be nested. An inner Obj is distinguished by being indented.

	my-obj.
		one. 1
		two. 2

`my-obj.one` will be `1` and `my-obj.two` will be `2`.
Note that `obj.property` accesses a property while `property. value` defines one.

If a property has no written value, it will be `true`.

	this-is-true.

You can also put it all on one line.

	my-obj. one. 1 two. 2
	\ Equivalent to:
	my-obj.
		one. 1
		two. 2

(Note that `one. 1 two. 2` on a line only defines one local, `one`, and tries to call `1` as a function on `two. 2`.)


### Arrays

Arrays are also written in indented blocks.
Each line beginning with `. ` (remember the space) writes a new entry to it.

	. 1
	. 2

Or on one line (note that a comma is not needed):

	[ 1 2 ]

### Maps

Maps follow the same pattern as Objs and Arrays.

	1 -> 2
	2 -> 4

Or on one line:

	[ 1 -> 2, 3 -> 4 ]


### Locals

You can do work inside of blocks.

	one-two.
		. 1
		log! "Building an Array!"
		. 2

Use `=` to create a new local variable.

	one = 1
	log! one
	\ Equivalent to:
	log! 1

Putting those together:

	my-list.
		. 1
		two = 2
		. two
	two \ Won't compile. Locals are accessible only in the block they are declared in and in its sub-blocks.

Obj assignments are also local variables.

	one. 1
	two. + one one

You can grab multiple values out of a Obj like so:

	one two = my-obj
	\ Equivalent to:
	one = my-obj.one
	two = my-obj.two

Names only refer to locals -- no globals, and instance variables must explicitly use property access `obj.prop`.


### Value blocks

A block that is not a Obj, Array, or Map has as its value the last line.

	two =
		one = 1
		+ 1 1

If you don't intend to return any particular value, just return `()` (null).


### Obj-value blocks

An Obj block ending in a value will assign properties to that value.
This is useful for defining Funs with properties.

	is-three?.
		doc. "Whether it's 3."
		|might-be-three
			=? might-be-three 3

	is-three?.doc \ "Whether it's 3."

Which brings us to:

### Make Funs, call Funs

Funs are written as indented blocks preceded by `|` and argument names (which create locals).

	identity. |a
		\ The body of a function is a block. In this case it returns the last line.
		a

The  body of a Fun can be any block.

	two-of. |a
		. a
		. a

Funs are called by listing their arguments, separated by spaces.

	identity 1

If it has no arguments, put `()` immediately after the name.

	do-stuff!()

 When calling a Fun on the result of another one, you can use parentheses to do it in the same line.

	log! (identity (two-of 1))

It's generally better to declare local variables for subexpressions.
That way, you never need parentheses.

You can leave off closing parentheses or brackets and they will be closed for you at the end of a surrounding syntactical group (such as a line, or line followed by an indented block).

	log! (identity (two-of 1

	log! (map [1 2 3] |x
		* x 2

One Fun, `sub`, has special syntax for calling.

Syntax | Equivalent
:-: | :-:
`a[b]` | `sub a b`
`a[b c]` | `sub a b c`
`a[(b c)]` | `sub a (b c)`

It's used to, among other things, get a value in a map.

	my-map.
		1 -> 2
	my-map[1] \ 2

You can also leave closing `]` off within a line, or closing `)` within a `[]`.

	a[b[c

	a[b (c d (e f] g


### In/Out

You can make assertions before and after any block using the `in` and `out` keywords.

	half. |a
		in
			\ `!` is a Fun, pronounced "assert".
			\ It applies a Fun to arguments and throws an error when the result isn't `true`.
			! divisible? a 2
		out
			! =? (* res 2) a

		/ a 2

Note the special local `res`, which is the Fun's return value.


### Types

A `Type` is anything which allows a certain set of values.
You can use `:` to assert the types of locals and the return values of Funs.

	one:Int. 1
	plus-one. |:Num add-to-me:Num
		+ add-to-me one

It's as if you wrote:

	one. 1
	! contains? Int one
	plus-one. |add-to-me
		in
			! contains? Num add-to-me
		out
			! contains? Num res

		+ add-to-me one

(Type checks happen *before* your own `in` and `out` blocks.)

Do not confuse Types with data structures.
Every data structure is a Type, but any predicate can be made into a type (via `ms.types.Pred-Type`).
A Type is *any* value implementing the Type interface, meaning it should implement the `contains?` method.


### Focus

`_` is a special variable known as the 'focus'.
You can think of it as the "it" variable - the thing you're dealing with at the moment.

You can assign to it as normal, as in `_ = 1`, or make it the main argument to a Fun with `|_`.

`fun_` is a special syntax for calling a single-argument Fun on the focus, equivalent to `(fun _)`.

	two-and-a-half-of. |_:Num
		+ twice_ half_
		\ Equivalent to:
		+ (twice _) (half _)

Also, writing a type in any context other than declaring a variable tests that type on the focus.

	is-str?. |_
		:Str
		\ Equivalent to:
		contains? Str _


### Case

`case` is Mason's only built-in branching construct.

	rate-guess. |a
		case
			=? a 7
				"You got it!"
			else
				"Nope."

The tests of a case are tried from top to bottom until one is `true`, and then the block associated with it is run and its value returned.
The `else` case happens when none of the above tests worked.
If no `else` is provided, an Error will be thrown if no tests match.

If you write an expression after `case` but before the indented  block, it becomes the focus.

	rate-guess. |a
		case a
			=? _ 7
				"You got it!"
			:Num
				"Off by {- _ 7}"
			else
				"Try using a number..."
		\ Equivalent to:
		_ = a
		case
			...

If your Fun has only one argument and its body is a case statement, you can even write it like this.

	rate-guess. |case
		\ Single argument becomes the focus.
		=? _ 7
			"You got it!"
		...

There is also `case!`, which is like `case` but always returns `()` (null).


### Strings

Text surrounded by `"` makes a string.

	"Hello world!"

Interpolate values into a string with `{}`:

	"One plus one is {+ 1 1}."

This calls the Method `show` on the value before adding it to the string.

Multi-line strings can be written in an indented block:

	"
		We hold these truths to be self-evident,
		that one plus one is {+ 1 1}.

`\` escapes certain special characters:

Escape | Output
:-: | :-:
`\t` | Tab
`\n` | New line
`\{` | `{`
`\\` | `\`


### Debug mode code

Some code is only used for testing that something works.
All code in `in` and `out` blocks is debug mode only.
Same for code in an Obj property whose name ends in "test".
You can also make arbitrary code debug-only like so:

	\ do-stuff!() only happens in debug mode
	debug do-stuff!()
	\ The whole block only happens in debug mode
	debug
		do-a!()
		do-b!()

Mason will complain about locals declared outside of debug code but used only within debug code.
Just use `debug use` to get around this.

	use
		\ Type checks do not count as debug-only locals,
		\ although the checks will still only happen in debug mode.
		.Num
	debug use
		.Num -> max-safe-int

	is-big?.
		doc. "Whether the number is super large."
		test. |
			! is-big? max-safe-int
		|_:Num
			>? _ 100


### Regions

You can organize your code using regions. Regions do nothing and are purely visual.

	region Nums
		one. 1
		two. 2

	region Funs
		double. |x
			* x two

All text after `region` and before the indented block is a comment.

Code in two different regions will still be evaluated as being in the same block - so the code above makes a single Obj with members `one`, `two`, and `double`.

Regions are often easier than having actually separate modules (up to a point).
You'll have to use judgment when deciding how to group your code into projects, directories, modules, regions, Funs, and locals.


### Lazy variables

Sometimes you don't know whether a value will actually be needed.
Use `~` before a local variable declaration to indicate that it is lazy.

	~two = + 1 1
	if some-condition |
		do-something-with two

In the above code, "two" will only be evaluated at the place it is used - that is, just before `do-something-with` is called.

A lazy variable will only be evaluated at most once -- the result is cached.

	~a =
		log! "Getting a..."
		1
	a \ Getting a...
	a \ Does not log

You can also pass a lazy variable into a Fun call by preceding an expression with `~`.

	in-range. |n min max
		and (>=? n min) ~(<? n max

	\ The Fun *must* be marked as able to accept lazy values.
	\ It can also be called with plain values.
	and. |a ~b
		case
			a
				\ Trigger computation of `b`.
				b
			else
				 \ Don't bother to compute `b`.
				false

There is no way to pass lazy values into a Fun that doesn't expect them.

Make sure you don't do something like this:

	~small-enough = <= n max
	and big-enough small-enough

In this case, `small-enough` will be evaluated *before* passing it to `and`.
This can be fixed with `and big-enough ~small-enough`.


### Make modules

Every file is a module.
Write your module the same way you do an Obj - the properties will be the module's exports.

If the module is a Obj-value block, the value part will become the module's default export.


### Use modules

You can make use of the exports of other modules like so:

	use
		\ Creates a new local `fs` equal to the module's default export.
		fs \ Module is in `node_modules` or globally installed.

		 \ "./brother.ms" or "./brother/index.ms"
		.brother
		\ "../parent.ms" or "../parent/index.ms"
		..parent
		\ "../../aunt/cousin.ms" or "../../aunt/cousin/index.ms"
		...aunt.cousin

		\ Creates locals `b` and `c` from the `a` module.
		a b c
		\ Does that, and also creates a local `a` equal to the default export.
		a _ b c

Mason is currently implemented in CommonJS and merely pretends to use EcmaScript 6 modules.
For now, you'll ocassionally have to use `use~`, which is like `use` but all locals are lazy.
This allows for recursive dependencies.


### Generator! Funs

`Generator!` Funs are Funs returning a `Generator!` -- a block of code which yields values and receives responses from a context.
These may also be known as coroutines.

More specifically, a `Generator!` is a mutable object which the context calls the `next` method on many times, which causes the generator to execute code up until the next yield.
(For a better understanding see [here](https://carldanley.com/ecmascript-6-generators/).)

To make one, just use `~|` instead of `|`.

	x = incrementing ~|:Int
		\ Yield `1` to the context; it should send me back the value of `two`.
		two <~ 1
		three <~ two
		three
	! =? x 3

`incrementing` here is a function taking a generator, running it, and returning its final value.
This kind of function is called a context, and they usually have names ending in `ing`.

`<~`, pronounced "yield", pauses the `Generator!`. Control returns to the context, which recieves the value on the right-hand side of the `<~` and may return a value back to the generator to be assigned to the left-hand side of the `<~`. (It may not, and doesn't have to return a value immediately -- a `Generator!` can be suspended for a long time.)

Note that the `~|` returns a `Generator!` when it is called, but its "return" type is Int. A generator "returns" after a context calls it all the way to completion.

It's also possible to yield without assigning.
For example, a `Stream` is a lazily-generated sequence whose values are the result of running code. The Stream doesn't recieve anything from the context, so there's no point having a left-hand side to each `<~`.

	one-two-three. Stream ~|
		<~ 1
		<~ 2
		<~ 3

You can even let one generator delegate to another.
`<~~`, pronounced "Yield to", runs the yielded-to generator inside of the same context.

	one-two-one-two. ~|
		<~~ yield-both 1 2
		<~~ yield-both 1 2

	yield-both. ~|a b
		<~ a
		<~ b

Note that it is a `Generator!` that is yielded to, not a `Fun`.

A more complex example:

	double. |x
		* x 2
	triple. |x
		* x 3

	doubled-then-tripled. |_:Bag
		streaming ~|
			<~~ each~ _ ~|x
				<~ double x
			<~~ each~ _ ~|x
				<~ triple x

	! =? (doubled-then-tripled [ 1 2 3 ]) [ 2 4 6 3 6 9 ]


(Of course, you could just use `+ (map _ double) (map _ triple)`.)

Here `each~` is a function taking a generator function and returning a generator.
Functions of this sort usually end in `~`.

You can also use `<~~` for assignment just as with `<~`.
The assigned-to value becomes the return value of the yielded-to generator.

	increment-thrice. |x
		logging ~|
			incr1 <~~ increment~ x
			incr2 <~~ increment~ incr1
			<~~ increment~ incr2
	increment~. ~|x
		<~ "Incrementing {x}"
		+ x 1
	! =? (increment-thrice 0) 3


### Remember, syntax is strict

Spaces, tabs, and newlines are all part of Mason's syntax, so you have to use them just right.

This code won't compile:

	a=b c=d \ Missing spaces, missing newline
	e .f \ Unnecessary space
	g  h \ Two spaces
	    j \ Must use tab to indent, not spaces
			i \ Must use only one tab


### Naming conventions

Some types make it hard to name a variable.

For example, `read-file` sounds like it returns the contents of the file immediately,
but in Javascript we can't do that. It actually returns a promise.
And `eventually-read-file` is too long a name.

Or, a method that gets a value out of a map but handles missing entries can't simply be called `get`,
which doesn't indicate that it returns an option. But `maybe-get` would be too long.

So, common types wrapping other values are associated with symbols,
so that names can easily indicate that they are wrapped.

Looks like | Means | Example
:-: | :-: | :-:
`?a` | `?` ("option") | `?find [ 1 3 5 ] even?`
`$a` | `$` ("promise") | `$read-file "Hello.txt"`
`@a` | `@` ("bag") | `@prime = [ 2 3 5 ]`
`a->b` | `Map` (from a to b) | `name->address`
`a~` | `Generator!` | `each~`
`a?` | `Bool` | `even?`

There are other uses of symbols in names:

Looks like | Means | Example
:-: | :-: | :-:
`a!` | Mutation or write-like I/O. | `log! "Hello, world!"`
`A!` | Mutable type. | `empty Map!`
`!` | Assertion. | `! <? 1 2`
`~a` | Lazy - *not* a convention. | `and a ~b`

An optional promise is `?$a`; a promise for an option is `$?a`.


### Running

Use one console to build continuously:

	npm install; ./gulp.sh

And in the other console, `./run` will run all tests.


### Editing

Go to `editor` and run `./gen-tmLanguage`.
Then put the resulting `Mason.tmLanguage` wherever is appropriate.

Sublime Text 3 users: `./gen-tmLanguage; cp ./Mason.tmLanguage ~/.config/sublime-text-3/Packages/User/Mason.tmLanguage`


### License

DO WHATEVER THE FUCK YOU WANT, PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0. You just DO WHATEVER THE FUCK YOU WANT.
