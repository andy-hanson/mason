# Mason

Mason is an experimental language compiling to JavaScript that uses data declarations as much as possible.


### Names

Names can contain any character except:

* Whitespace
* Groupings: `( ) [ ]`
* Special: `" \ | : . ~ _`
* Reserved: ``` # ; ' , { }``

Also, names can't be numbers or keywords.

So, `^o^` is a valid name.


### Dicts

A dict is a collection of values given names. Dicts are like javascript's object literals, except that the result will be of type Dict and immutable.

	one. 1
	two. 2

Dicts can be nested. An inner dict is distinguished by being indented. (Use tabs to indent - leading/trailing spaces are syntax errors.)

	my-dict.
		one. 1
		two. 2

`my-dict.one` will be `1` and `my-dict.two` will be `2`.

	\ After a `\`, the rest of the text on that line is a comment.
	x.
		my-dict.
			one. 1
			two. 2
	x.my-dict \ Refers to the dict itself
	x.my-dict.one \ 1
	x.my-dict.two \ 2

Note that `dict.key` accesses a property while `key. value` defines one.

If a dict key has no written value, it will be `true`. Empty parentheses mean `null`.

	this-is-true.
	() \ null


### Lists

Lists are also written in indented blocks. Each line beginning with `. ` (remember the space) writes a new entry to the list.

	. 1
	. 2

You could also do it all in one line using `[]`.

	[ 1 2 ]

Lists are immutable and of type Array.


### Subscripts

`a[b]` is equivalent to `sub a b`.
`a[b c]` is equivalent to `sub a b c`; `a[(b c)] is equivalent to `sub a (b c)`.
`sub` is a Method. There's no documentation for Methods yet, but you can treat them like functions which work on a wide variety of types.


### Maps

Maps follow the same pattern as Lists and Dicts.

	1 -> 2
	2 -> 4

You can use `sub` to get the value associated with a key.

	my-map.
		1 -> 2
		2 -> 4
	my-map[1] \ 2
	my-map[2] \ 4


### Locals

You can do work inside of blocks.

	my-list.
		. 1
		log! "Building a list!"
		. 2

Use `=` to create a new local variable.

	one = 1
	log! one \ logs "1"

So, you can create locals inside of blocks.

	my-list.
		. 1
		\ This calls the function `+` on arguments 1 and 1.
		\ It puts the result in a new local variable `two`.
		two = + 1 1
		. two
	two \ Won't compile. Locals are block scoped.

Dict assignments are also local variables.

	one. 1
	two. + one one

You can grab multiple values out of a dict like so:

	one two = my-dict
	\ Equivalent to:
	one = my-dict.one
	two = my-dict.two


### Value blocks

A block that is neither a list nor a dict has as its value the last line.

	two =
		one = 1
		+ 1 1


### Dict value blocks

A dict block ending in a value will assign the dict's values as members of the value of the last line.
(So, the result may not be of type Dict.)
This is useful for defining functions with properties.

	is-three?.
		doc. "Whether `a` is equal to 3."
		|a
			=? a 3

Which brings us to:

### Make functions, call functions

Functions are written as indented blocks preceded by `|` and a argument names.

	identity = |a
		\ The body of a function is a block. In this case it returns the last line.
		a

	\ So a function can return a list...
	two-of = |a
		. a
		. a

	\ Or a dict.
	pair = |a b
		first. a
		second. b

Functions are called by listing their arguments, separated by spaces.

	identity 1 \ 1

 When calling a function on the result of another function, you'll need to use parentheses.

	log! (identity (pair (two-of 1) (two-of 2)))

As you can see, it's more readable to declare local variables, as in `two-ones = two-of 1`.
Every program can be written without any parentheses.

You can leave off closing parentheses or brackets and they will be closed for you at the end of another type of group (including at the end of a line).

	log! (identity (pair (two-of 1) (two-of 2

	a[b[c \ Same as a[b[c]]

	a[b (c d (e f] g \ Same as a[b (c d (e f))] g

	log! (map [1 2 3] |x
		* x 2


### In/Out

You can make assertions before and after any block using the `in` and `out` keywords.

	half. |a
		in
			\ `!` is a function, pronounced "assert".
			\ It applies a function to arguments and throws an error when the result isn't `true`.
			! divisible? a 2
		out
			! =? (* res 2) a

		/ a 2

Note the special variable `res`, which is the function's return value.

There may one day be a way to turn off in/out conditions, so you shouldn't depend on them running.


### Types

A `Type` is anything which contains a certain set of values. For example, "primes" is a type.
You can use `:` to type local variables, function arguments, and function return values.

	one:Int. 1
	Str->Num. |:Num str:Str
		Num.parseFloat str

It's as if you wrote:

	one. 1
	! contains? Int one
	Str->Num. |str
		in
			! contains? Str str
		out
			! contains? Num res

		Num.parseFloat str

(Type checks happen *before* your own `in` and `out` blocks.)

Do not confuse Types with data structures.
Every data structure is a Type, but any predicate can be made into a type (such as with the standard library's `Pred-Type`).
A Type is *any* value implementing the Type interface, meaning it should implement the `contains?` method.


### Parameterized types

Many types implement `sub`, which allows them to take parameters before checking.

	ints:Bag[Int] = [ 1 2 ]
	\ Equivalent to:
	Int-Bag = sub Bag Int
	ints:Int-Bag = [ 1 2 ]


### Focus

`_` is a special variable known as the 'focus'.
You can think of it as the "it" variable - the thing you're dealing with at the moment.

You can assign to it as normal, as in `_ = 1`, or make it the main argument to a function with `|_`.

`fun_` is a special syntax for calling a single-argument function `fun` on the focus, equivalent to (fun _).

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

The tests of a case are tried from top to bottom until one matches, and then the value of that block is returned.
The `else` case happens when none of the above tests worked.
If no `else` is provided, an exception will be thrown if no tests match.

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

If your function has only one argument and its body is a case statement, you can even write it like this.

	rate-guess. |case
		\ Single argument becomes the focus.
		=? _ 7
			"You got it!"
		...

There is also `case!`, which is like `case` but doesn't return a value.


### Make modules

Every file is a module.
Write your module the same way you do a dict - the entries will be the module's exports.

The last line in the file will become the module's default export. See below for what a "default" export is.
(If you don't want one, just end in `()`.)

### Use modules

You can make use of the exports of other modules like so:

	use
		\ The body of a `use` block can not contain code.
		\ It's a mini-language specifically for importing other modules.
		\ It creates many local variables for use by this module.

		\ Creates a new local `fs` equal to the module's default export.
		fs \ Module is in node_modules or is a builtin.

		 \ "./local.ms" or "./local/index.ms"
		.brother
		\ "../parent.ms" or "../parent/index.ms"
		..parent
		\ "../../aunt/cousin.ms" or "../../aunt/cousin/index.ms"
		...aunt.cousin

		\ `a` is the default export; `b` and `c` are the exports with those names.
		a -> b c

Mason is currently implemented in CommonJS but will switch to ES6 modules as soon as possible.
For now, module imports are lazy -- which allows (most) recursive dependencies.


### Strings

Text surrounded by `"` makes a string.

	"Hello world!"

Interpolate values into a string with `{}`:

	"One plus one is {+ 1 1}."

This calls the `->Str` method on the value before adding it to the string.

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


### Generator functions

Generator functions are functions returning a generator - a block of code which yields values and receives responses from a context.

Code inside of generator functions can yield values to a context and wait to recieve a value back.
Generators may also be known as coroutines.

More specifically, generator functions are functions returning a Generator, a mutable object which the context calls the `next` method on many times, which causes the generator to execute the next group of code.
(For a better understanding see [here](https://carldanley.com/ecmascript-6-generators/).)

To make one, just use `~|` instead of `|`.

	x = incrementing ~|:Int
		\ Yield `1` to the context; it should send me back the value of `two`.
		two <~ 1
		three <~ two
		three
	! =? x 3

`incrementing` here a function taking a generator, running it, and returning its final value.
This kind of function is called a context, and they usually have names ending in `ing`.

`<~`, pronounced "yield", pauses the generator. Control returns to the context, which recieves the value on the right-hand side of the `<~` and may eventually return a value back to the generator to be assigned to the left-hand side of the `<~`.

The context may choose to stop execution forever, or to pause execution until some resource is ready.
However, generators can only flow forwards, and can only be called back to once.

Note that the `~|` function returns a generator when it is called, but its "return" type is Int. A generator "returns" after a context calls it all the way to completion.

It's also possible to yield without assigning.
For example, `streaming` allows you to specify a Stream, a lazily-generated sequence whose values are the result of running code.

	nats. streaming ~|
		\ This creates a Ref, a mutable object whose value can be changed over time.
		i = ref 0
		loop!
			<~ (get i)
			set! i (+ (get i) 1)

You can even let one generator delegate to another.
`<~~`, pronounced "Yield to", runs the yielded-to generator inside of the same context.

	one-two-one-two. ~|
		<~~ yield-both 1 2
		<~~ yield-both 1 2

	yield-both. ~|a b
		<~ a
		<~ b

Note that it is a generator that is yielded to, not a generator function.

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


### Lazy variables

Sometimes you don't know whether a value will actually be needed.
Use `~` before a local variable declaration to indicate that it is lazy.

	~two = + 1 1
	if some-condition |
		do-something-with two

In the above code, "two" will only be evaluated at the place it is used - that is, just before `do-something-with` is called.

And don't worry, a lazy value will only be evaluated at most once.

	~a =
		log! "Getting a..."
		1
	a \ Getting a...
	a \ Does not log

You can also pass a lazy value into a function by preceding it with `~`.

	in-range. |n min max
		and (>=? n min) ~(<=? n max)

	\ The function *must* be marked as able to accept lazy values.
	\ It can also be called with plain values.
	and. |a ~b
		case
			a
				\ Trigger computation of `b`.
				b
			else
				 \ Don't bother to compute `b`.
				false

Unfortunately, there's no way to pass lazy values into a function that doesn't expect them.

Make sure you don't do something like this:

	~small-enough = <= n max
	and big-enough small-enough

In this case, `small-enough` will be evaluated *before* passing it to `and`.
This can be fixed with `and big-enough ~small-enough`.


### Regions

You can organize your code using regions.

	region Numbers
		one. 1
		two. 2

	region Functions
		double. |x
			* x two

All text after `region` and before the indented block is a comment.

Code in two different regions will still be evaluated as being in the same block - so the code above makes a single dict with members `one`, `two`, and `double`.

Regions are intended for dividing functions into groups, *not* for trying to fit obscenely huge functions on-screen. And, of course, you can always just use modules.


### Remember, syntax is strict

Spaces, tabs, and newlines are all part of Mason's syntax, so you have to use them just right.

This code won't compile:

	a=b c=d \ Missing spaces, missing newline
	e .f \ Unnecessary space
	g  h \ Two spaces
			i \ Two indents
	log!() \ Use `log! ()` if you really want to log null.


### Naming conventions

Looks like | Means | Example
:-: | :-: | :-:
`x!` | Mutation. | `log! "Hello, world!"`
`X!` | Mutable type. | `new-map = empty Map!`
`!` | Assertion. | `! <? 1 2`
`~x` | Lazy - *not* a convention. | `and a ~b`
`x~` | Generator. | `<~~ each~ @files file-lines~`
`?x` | Using the `?` ("maybe") type. | `?find [ 1 3 5 ] even?`
`x?` | Predicate - returns a Bool. | `even? 2`
`$x` | Using the `$` ("promise") type. | `$read-file "Hello.txt"`
`@x` | Using the `@` ("bag") type. | `@primes = [ 2 3 5 ]`

### Building / Running

First: `sudo npm install; ./build-all; ./run`
When making changes, it's faster to use `build-continuously` in one console and `run` in another.

### Editing

Go to `editor` and run `./gen-tmLanguage`.
Then put the resulting `Mason.tmLanguage` wherever is appropriate.

Sublime Text 3 users: `./gen-tmLanguage; cp ./Mason.tmLanguage ~/.config/sublime-text-3/Packages/User/Mason.tmLanguage`


### `std` Documentation

Documentation for a value is provided through its `doc` property.

For now you'll have to look through the code to see the documentation.

One day I'll write a program to go through all of those and generate something easier.


### License

DO WHATEVER THE FUCK YOU WANT, PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0. You just DO WHATEVER THE FUCK YOU WANT.
