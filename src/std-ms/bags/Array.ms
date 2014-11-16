\ Also see ..maps.Array-as-Map

use
	..assert -> !=
	.Bag -> count each! iterator map seq=?
	..Bool -> and
	..Comparable -> =?
	..Fun -> call
	..js -> global new
	..Num -> Nat
	..Object -> add-property!
	..pred-types -> Any Nullable
	..Str -> ->Str
	.Stream -> streaming
	..types.Interface -> implementor!
	..types.Method ->  impl!
	..types.Type -> subsumes?

Array =
	doc. "Javascript's native mutable Array type."
	\new.
	\	doc. "New empty array. If `count` is provided it will be initialized to that size."
	\	|count:Nullable[Nat]
	\		case count
	\			:Any
	\				Array count
	\			else
	\				call Array
	global.Array

->Array.
	doc. "TODO"
	test. |
		x = streaming ~|
			<~ 0
		!= (->Array x) [ 0 ]
	|_:Bag
		arr ::= new Array
		each! _ |em
			arr.push em
		arr

implementor! Array Bag

impl! count Array |_
	_.length
\ TODO:ES6 This should be implemented for me
impl! iterator Array ~|_
	len = count_
	`for (let i = 0; i < len; i++) yield _[i]`
	()

impl! ->Str Array
	test. |
		!= (->Str [ 0 1 ]) "[ 0 1 ]"
	|_
		ems = ->Array (map _ ->Str)
		"[ {ems.join " "} ]"

impl! =? Array
	test. |
		!= [ 1 ] [ 1 ]
	|a b
		and (subsumes? Array b) ~(and (=? a.length b.length) ~(seq=? a b))

Array
