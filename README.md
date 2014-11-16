# Mason

Mason is an experimental language compiling to JavaScript that uses data declarations as much as possible.


### Dicts

A dict is a collection of values given names. They go in indented blocks.

	\ This is a comment
	my-dict.
		one. 1
		two. 2
	my-dict.one \ 1
	my-dict.two \ 2

This makes a new dictionary `my-dict` and assigns values to it. So `my-dict.one` will be 1 and `my-dict.two` will be 2. And `my-dict` is itself a member of a dict.

Each `key. value` assignment is done within an indented block a code. (Use tabs to indent - leading/trailing spaces are syntax errors.)

Note that `dict.key` accesses a property while `key. value` defines one.

If a dict key has no written value, it will be `null`. Empty parentheses work the same way.

	this-is-null.
	() \ Also null

Dicts are like javascript's object literals, except that the result will be of type Dict and immutable.


### Lists

Lists are also written in blocks. Each line beginning with `. ` (remember the space) writes a new entry to the list.

	my-list.
		. 1
		. 2

You could also do it all in one line.
	my-list. [ 1 2 ]


### Maps

Maps are pretty much the same.

	my-map.
		1 -> 2
		2 -> 4


### Locals

You can do work inside of blocks.

	my-list.
		. 1
		\ This calls the function `+` on arguments 1 and 1 and puts the result in a new local variable `two`.
		two = + 1 1
		. two
	two \ Won't compile. Locals are block scoped.

	my-dict.
		one. 1
		\ Dict assignments become local variables.
		two. + one one

You can grab multiple values out of a dict like so:

	one two = my-dict
	\ one = my-dict.one
	\ two = my-dict.two


### Blocks

A block that is neither a list nor a dict has as its value the last line.

	two =
		one = 1
		+ 1 1


### Make functions, call functions

Functions are written as blocks preceded by `|` and a space-separated arguments list.

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

	identity 1 \ = 1

 When calling a function on the result of another function, you'll need to use parentheses.

	log! (identity (pair (two-of 1) (two-of 2)))

As you can see, it's more readable to declare local variables, as in `two-ones = two-of 1`. Every program can be written without any parentheses.


A dict block ending in a value will assign the dict's values to the last line. (So, the result may not be of type Dict.)
This is useful for defining functions with properties.

	my-fun =
		doc. "Whether `a` is equal to 3."
		test. |
			\ `!` is pronounced "assert"
			! (my-fun 3)
		|a
			=? a 3


### In/Out

You can make assertions before and after any block.

	half. |a
		in
			! (divisible? a 2)
		out
			\ `!=` is pronounced "assert equal". Don't confuse it with javascript's `!==`.
			!= (* res 2) a

		/ a 2

Note the special variable `res`, which is the function's return value.

There may one day be a way to turn off in/out conditions, so functionality should not depend on them running.


### Types

You can type local variables, function arguments, and function return values.

	one:Int. 1
	Str->Num. |:Num str:Str
		Num.parseFloat str

It's as if you wrote:

	one. 1
	!subsumes Int one "one"
	str->real. |str
		in
			!subsumes Str str "str"
		out
			!subsumes Real res "res"

		Number.parseFloat str

(Type checks happen *before* your own in and out conditions.)

Do not confuse Types with data structures.
Every data structure is a Type, but any predicate can be made into a type (such as with the standard library's `Pred-Type`).

A Type is any value implementing the Type interface, which has methods `subsumes?` and `!subsumes`.
`!subsumes` defaults to asserting `subsumes?`, but can also provide more useful information as to why it failed.


### Subscripts

`a[b]` is equivalent to `sub a b`. This is used by many types which can be parameterized.

	ints:Seq[Int] =
		. 1
		. 2


### Focus

`_` is a special variable known as the 'focus'.
You can think of it as the "it" variable - the thing you're dealing with at the moment.

You can assign to it as normal, as in `_ = 1`, or make it the main argument to a function with `|_`.

`fun_` is a special syntax for calling a single-argument function `fun` on the focus, equivalent to (fun _).

	two-and-a-half-of. |_:Num
		+ twice_ half_
		\ Equivalent to: + (twice _) (half _)

Also, writing a type in any context other than declaring a variable tests that type on the focus.

	is-str? = |_
		:Str
		\ Equivalent to: subsumes? Str _


### Case

`case` is Mason's only branching construct.

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
			:Real
				"Off by {- _ 7}"
			else
				"Try using a number..."

If your function has only one argument and its body is a case statement, you can even write it like this.

	rate-guess. |case
		\ Single argument becomes the focus.
		=? _ 7
			"You got it!"
		...

There is also `case!`, which is like `case` but doesn't return a value.


### Make modules

Every file is a module. Write your module the same way you do a dict - the entries will be the module's exports.
In addition, the last line in the file will become the module's default export. (If you don't want one, just end in `()`.)

### Use

You can make use of the exports of other modules like so:

	use
		\ Creates a new local `fs` equal to the module's default export.
		fs \ Module is in node_modules or is a builtin.

		.brother \ "./local.ms" or "./local/index.ms"
		..parent \ "../parent.ms" or "../parent/index.ms"
		...distant.cousin \ "../../a/b.ms" or "../../a/b/index.ms"

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

Multi-line quotes can be written in an indented block:

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


### Names

Names can contain any character except:

* Whitespace
* Brackets: `( ) [ ] { }`
* Special: ``" ` \ | : . ~``
* Reserved: `# $ , ; ' @`

Also, names can't be numbers or keywords.


### Mutables

Use `::=` to declare a mutable variable and `:=` to modify it.

	taxes ::= 100
	election ()
	taxes := 1000


### Loop!

`loop!` Will run the code in its body repeatedly until `end-loop!` is encountered.

	\ Prints "10 9 8 ... 1" on separate lines.
	i ::= 10
	loop!
		case!
			positive? i
				log! i
				i := decrement i
			else
				end-loop!
				log! "This line is never run."


### Generator functions

Generator functions are functions returning a generator - an object which yields values and receives responses from a context.
To make one, just use `~|` instead of `|`.

	x = incrementing ~|:Int
		\ Yield `1` to the context; it should send me back the value of `two`.
		two <~ 1
		three <~ two
		three
	!= x 3

`<~`, pronounced "yield", pauses the generator. Control returns to the context, which recieves the value on the right-hand side of the `<~` and may eventually return a value back to the generator to be assigned to the left-hand side of the `<~`.

The context has the choice of when/if to return to the generator again.
However, generators can only flow forwards, and can only be called back to once.

Note that the `~|` function returns a generator when it is called, but its "return" type is Int. A generator "returns" after a context calls it all the way to completion.

`incrementing` here a function taking a generator, running it, and returning its final value.
This kind of function is called a context, and they usually have names ending in `ing`.
For reference, here's what it might look like. (For a better understanding see [here](https://carldanley.com/ecmascript-6-generators/).)

	\ `gen-maker` is a function returning a generator - in other words, something specified by `~|`.
	incrementing. |gen-maker:Fun[Generator]
		gen:Generator = gen-maker ()
		last-value ::= 0
		loop!
			\ The `<~` statment that the generator is paused on will recieve `last-value`.
			value done = gen.next last-value
			last-value := value
			case! done
				_
					end-loop!
				else
					()
		\ This is the return value of the generator.
		last-value

It's also possible to yield without assigning.
For example, `streaming` allows you to specify a lazily-generated sequence.

	nats. streaming ~|
		i ::= 0
		loop!
			<~ i
			i := increment i

You can even let one generator delegate to another.
`<~~`, pronounced "Yield to", runs the yielded-to generator inside of the same context.

	one-two-one-two. ~|
		<~~ one-two ()
		<~~ one-two ()

	one-two. ~|
		<~ 1
		<~ 2

Note that it is a generator that is yielded to, not a generator function.

A more complex example:

	double. |x
		* x 2
	triple. |x
		* x 3

	doubled-then-tripled. |_:Seq
		streaming ~|
			<~~ each~ _ ~|x
				<~ double x
			<~~ each~ _ ~|x
				<~ triple x

 	\ 2 4 6 3 6 9
	doubled-then-tripled
		. 1
		. 2
		. 3


(Of course, you could just use `+ (map _ double) (map _ triple)`.)

Here `each~` is a function taking a generator function and returning a generator.
Functions of this sort usually end in `~`.

You can also use `<~~` for assignment just as with `<~`.

	increment-thrice. |x
		logging ~|
			incr1 <~~ increment~ x
			incr2 <~~ increment~ incr1
			<~~ increment~ incr2
	increment~. ~|x
		<~ "Incrementing {x}"
		x
	!= (increment-thrice 0) 3


### Lazy variables

Sometimes you don't know whether a value will actually be needed.

	two ~= + 1 1
	if! some-condition |
		do-something-with two

In the above code, "two" will only be evaluated at the place it is used - that is, just before `do-something-with` is called.

You can also pass a lazy value into a function like so:

	in-range. |n min max
		and (>=? n min) ~(<=? n max)

	\ The function must be marked as able to accept lazy values.
	\ It can also be called with plain values.
	and. |a:Bool ~b:Bool
		case
			a
				b \ Trigger computation of `b`
			else
				false \ Don't bother to compute `b`

Make sure you don't do something like this:

	small-enough ~= <= n max
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
			* x 2

All text after `region` and before the indented block is a comment.

Code in two different regions will still be evaluated as being in the same block - so the code above makes a single dict with members `one`, `two`, and `double`.

Regions are intended for dividing functions into groups, *not* for trying to fit obscenely huge functions on-screen. And, of course, you can always just use modules.


### Javascript

If you really need it...

	i ::= 2
	\ Post-increment and weak equality make this `true`.
	`i++ == "2"`

Note that javascript literals *not* analyzed by the compiler and has a tendency to fail if you don't understand the compiler well. They will likely be taken out in a future version.


### Remember, syntax is strict

Spaces, tabs, and newlines are all "keywords", so you have to use them just right. This code won't compile:

	a=b c=d \ Missing spaces, missing newline
	e .f [g] \ Unnecessary space
	h  i \ Two spaces
			j \ Two indents
	log!() \ Use `log! ()` if you really want to log null.


### Running

`sudo npm install; node --harmony src` will compile and run the code in src/std-ms.


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
