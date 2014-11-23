\ Also see ..maps.Array-as-Map

use
	..assert -> ! !call
	.Bag -> builder build-next! build-result count each! empty? iterator map
	.Bag-Type -> empty
	..basic-methods -> freeze type-of
	..Bool -> and
	..Comparable -> =?
	..Fun -> call thunk
	..js -> global new
	..Num -> Nat
	..Object -> add-property!
	..pred-types -> Any Nullable
	.Seq -> seq=?
	..show
	.Stream -> streaming
	..types.Interface -> implementor!
	..types.Method ->  impl!
	..types.Type -> subsumes?
	..types.util -> self-type

Array =
	doc. "Javascript's native mutable Array type. TODO: `Array` vs `Array!`"
	global.Array

implementor! Array Seq

impl! count Array |_
	_.length
\ TODO:ES6 This should be implemented for me
impl! iterator Array ~|_
	len = count_
	`for (let i = 0; i < len; i++) yield _[i]`
	()

impl! =? Array
	test. |
		! =? [ 1 ] [ 1 ]
	|a b
		and (subsumes? Array b) ~(and (=? a.length b.length) ~(seq=? a b))

implementor! (self-type Array) Bag-Type
impl! empty (self-type Array) (thunk [])

impl! builder Array |
	`[]`
impl! build-next! Array |_ em
	_.push em
impl! build-result Array freeze

impl! type-of Array |
	Array

Array
