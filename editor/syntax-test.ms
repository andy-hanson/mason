use
	mason -> fun! profit:Real

"d. 1"

()[]{}

~1
~(+ 1 1)
~"string"
"unclosed string"
~"{_}"
~|
	1
a = 1
a := 1
a ::= 1
a ~= 1
a <~ 1
a <~~ 1

and or nand nor loop! break!

`js literal`

""
"
	{interpolation}
	\{not interpolation}

"\"" was a string
"One plus one is {1 + 1}."

"bad string

\ comment
	\ comment.

\ Names can include numbers, but not start with them.
a1
1a

a.b! c

123.45

:Type

focus-call_

action!

action!_

sum. = |_:Pair
	+ fst_ snd_

|:RetType arg:Type arg:Type \ function
	fun-body

x = 3
x:Int = 3
\ TODO: Get highlighting working for the first variable...
x:Int y:Str = 3
x. 3
x:Int. 3
\ TODO: Get highlighting working for the first variable...
x:Int y:Str~b. 3

\ Putting it all together:
sum.
	doc. "Adds up all the numbers"
	|:Num list:LList
		out
			>= res 0

		case list
			:Cons
				rest:Num = sum tail_
				+ head_ rest
			:Nil
				Nil
			else
				uh-oh! "Did not expect {_}"
