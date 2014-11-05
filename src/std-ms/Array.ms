use
	.assert -> !=
	.Bag -> count each! iterator map
	.Fun -> call
	.Interface -> implementor!
	.js -> global new
	.Method ->  impl!
	.Num -> Nat
	.Object -> add-property!
	.pred-types -> Any Nullable
	.Seq -> seqing
	.Str -> ->Str

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

impl! count Array |_
	_.length

\ TODO:ES6 This should be implemented for me.
impl! iterator Array ~|_
	len = count_
	`for (let i = 0; i < len; i++) yield _[i]`
	()

->Array.
	doc. "TODO"
	test. |
		x = seqing ~|
			<~ 0
		!= (->Array x) (Array.of 0)
	|_:Bag
		arr ::= new Array
		each! _ |em
			arr.push em
		arr

impl! ->Str Array
	test. |
		!= (->Str (Array.of 0 1)) "Array 0 1"
	|_
		ems = ->Array (map _ ->Str)
		"Array {ems.join " "}"

implementor! Array Seq

Array
