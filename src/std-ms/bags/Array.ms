\ Also see ..maps.Array-as-Map

use
	..assert -> !=
	.Bag -> count each! iterator map
	..Bool -> and
	..Comparable -> =?
	..Fun -> call
	..js -> global new
	..Num -> Nat
	..Object -> add-property!
	..pred-types -> Any Nullable
	.Seq -> seq=?
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
	of.
		doc. "TODO"
		|
			Object.freeze (Array.prototype.slice.call `arguments`)
	global.Array

->Array.
	doc. "TODO"
	test. |
		x = streaming ~|
			<~ 0
		!= (->Array x) (Array.of 0)
	|_:Bag
		arr ::= new Array
		each! _ |em
			arr.push em
		arr

implementor! Array Seq

impl! count Array |_
	_.length
\ TODO:ES6 This should be implemented for me
impl! iterator Array ~|_
	len = count_
	`for (let i = 0; i < len; i++) yield _[i]`
	()

impl! ->Str Array
	test. |
		!= (->Str (Array.of 0 1)) "Array 0 1"
	|_
		ems = ->Array (map _ ->Str)
		"Array {ems.join " "}"

impl! =? Array
	test. |
		!= (Array.of 1) (Array.of 1)
	|a b
		and (subsumes? Array b) ~(and (=? a.length b.length) ~(seq=? a b))

Array
