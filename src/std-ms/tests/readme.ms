doc. "Making sure the code in README.md actually works."

use
	..arithmetic-methods -> + - * /
	..assert -> ! != !fails
	..bags.Bag -> map
	..bags.Seq -> seq=? take
	..bags.Stream -> streaming
	..Bool -> and not
	..Comparable -> =? >? >=? <=?
	..Fun -> call
	..Generator -> each~
	..math.Num -> decrement divisible? increment Int
	..Str

my-dict.
	one. 1
	two. 2
!= my-dict.one 1
!= my-dict.two 2

this-is-null.
!= this-is-null `null`
!= () `null`
\! (not (subsumes? Any this-is-null))
\! (not (subsumes? Any ()))

my-list.
	. 1
	. 2
!= my-list `[ 1, 2 ]`
!= [ 1 2 ] `[ 1, 2 ]`

my-map.
	1 -> 2
	2 -> 4
!= my-map[1] 2
!= my-map[2] 4

my-list-2.
	. 1
	two = + 1 1
	. two
!= my-list my-list-2
my-dict-2.
	one. 1
	two. + 1 1
!= my-dict my-dict-2

one two = my-dict-2
!= one 1
!= two 2

two-2 =
	one = 1
	+ 1 1
!= two-2 2

identity = |a
	a
!= (identity 1) 1
two-of = |a
	. a
	. a
!= (two-of 1) [ 1 1 ]
pair = |a b
	first. a
	second. b
!= (pair 1 2)
	first. 1
	second. 2

!= (identity (pair (two-of 1) (two-of 2)))
	first. [ 1 1 ]
	second. [ 2 2 ]

half. |a
	in
		! (divisible? a 2)
	out
		!= (* res 2) a

	/ a 2

!fails |
	half 1
!= (half 2) 1

one-1:Int. 1
Str->Num. |:Num str:Str
	Num.parseFloat str
!= (Str->Num "3") 3

ints:Seq[Int] =
	. 1
	. 2

twice = |x
	* 2 x

two-and-a-half-of. |_:Num
	+ twice_ half_
!= (two-and-a-half-of 2) 5

is-str?. |_
	:Str
! (is-str? "")

rate-guess. |case
	=? _ 7
		"You got it!"
	:Num
		"Off by {- _ 7}"
	else
		"Try using a number..."

!= (rate-guess 7) "You got it!"
!= (rate-guess 9) "Off by 2"
!= (rate-guess "seven") "Try using a number..."

!= "One plus one is {+ 1 1}." "One plus one is 2."

x = "
	We hold these truths to be self-evident,
	that one plus one is {+ 1 1}.

!= x "
	We hold these truths to be self-evident,
	that one plus one is 2.

!= "\t\n\{\\" `"\t\n{\\"`

taxes ::= 100
!= taxes 100
taxes := 1000
!= taxes 1000

\ TODO: empty Array!
arr = `[]`
log! = |_
	arr.push _

call |
	i ::= 10
	loop!
		case!
			>? i 0
				log! i
				i := decrement i
			else
				end-loop!
				log! "This line is never run"

!= arr [ 10 9 8 7 6 5 4 3 2 1 ]


incrementing. |gen-maker:Fun[Generator]
	gen:Generator = gen-maker ()
	last-value ::= 0
	loop!
		value done = gen.next (increment last-value)
		last-value := value
		case! done
			_
				end-loop!
			else
				()
	last-value

y = incrementing ~|:Int
	two <~ 1
	three <~ two
	three
!= y 3

nats. streaming ~|
	i ::= 0
	loop!
		<~ i
		i := increment i
! (seq=? (take nats 3) [ 0 1 2 ])

one-two-one-two. ~|
	<~~ one-two ()
	<~~ one-two ()

one-two. ~|
	<~ 1
	<~ 2

! (seq=? (streaming one-two-one-two) [ 1 2 1 2 ])

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

! (seq=? (doubled-then-tripled [ 1 2 3 ]) [ 2 4 6 3 6 9 ])
dt2. |_:Seq
	+ (map _ double) (map _ triple)
! (seq=? (dt2 [ 1 2 3 ]) [ 2 4 6 3 6 9 ])

\ TODO: empty Array!
log = `[]`
logging. |gen-maker:Fun[Generator]
	gen = gen-maker ()
	last-value ::= ()
	loop!
		value done = gen.next ()
		case! done
			_
				last-value := value
				end-loop!
			else
				log.push value
	last-value

increment-thrice. |x
	logging ~|
		incr1 <~~ increment~ x
		incr2 <~~ increment~ incr1
		<~~ increment~ incr2
increment~. ~|x
	<~ "Incrementing {x}"
	increment x
!= (increment-thrice 0) 3
!= log [ "Incrementing 0" "Incrementing 1" "Incrementing 2" ]

in-range. |n min max
	and (>=? n min) ~(<=? n max)
! (in-range 1 0 2)
! (not (in-range 3 0 2))

ii ::= 2
! `ii++ == "2"`

