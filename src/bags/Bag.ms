use
	.? -> get-or Opt->?
	..assert -> ! !not
	.Bag-Type
	..Bool -> and false not true
	..Comparable -> =?
	..Fun -> identity ignore Pred
	..Generator! -> gen-next!
	.Hash-Set!
	..js -> reference=?
	..math.Num -> divisible? Nat
	..methods -> => + - -! contains? empty empty? type-of
	..pred-types -> Any Opt
	..Ref -> get mod! ref set!
	.Seq -> seq=?
	.Stream -> streaming
	..Symbol
	..types.Interface
	..types.Method -> impl!

Bag = Interface
	doc. "TODO"
	implementor-test. |bag-type
		! (contains? Bag-Type bag-type) "Be sure to make your Bag type a Bag-Type."
		_ = empty bag-type
		! empty? _

iterator. Method
	doc. |:Generator! _
		"Creates a new Generator! which yields the values in the Bag. Should create a new one every time."
	symbol. Symbol.iterator

\ TODO: FURTHER REFORM
from-stream. Method
	doc. "TODO"
	default. |_ stream
		ignore _ \ TODO:Ignored vars
		stream

region Using iterator
	impl! contains? Bag
		doc. "TODO"
		test. |
			! contains? [ 0 ] 0
			!not contains? [ 0 ] 1
		|_ em:Any
			any? _ |em-compare
				=? em em-compare

	fold.
		doc. "TODO"
		test. |
			[ [ 1 2 3 ] 4 + ] -> 10
		|_:Bag start:Any folder:Fun[Any Any Any]
			acc = ref start
			each! _ |em
				mod! acc |x
					folder x em
			get acc

	each!. Method
		doc. "Calls do-for-each on every element in the Bag."
		test. |
			"TODO"
		default. |_ do-for-each:Fun
			\ TODO:ES6 `for (let value of _)`
			iter = iterator_
			loop!
				value done = gen-next! iter
				case!
					done
						end-loop!
					else
						do-for-each value

	any?.
		doc. "TODO"
		test. |
			! any? [ 0 1 ] =?[1]
			!not any? [ 0 1 ] =?[2]
		|_:Bag pred:Opt[Pred]
			\ TODO:SYNTAX Optional args
			p = get-or (Opt->? pred) identity
			\ TODO: keep=> Stream
			not (empty? (keep (=> Stream _) p

	all?.
		doc. "TODO"
		test. |
			! all? [ 0 0 ] =?[0]
			!not all? [ 0 1 ] =?[0]
		|_:Bag pred:Opt[Pred]
			\ TODO:SYNTAX Optional args
			p = get-or (Opt->? pred) identity
			not (any? _ |em
				not (p em)

	?find. |_ pred:Pred
		iter = iterator_
		\ TODO:SYNTAX Return from loop
		found = ref (empty ?
		loop!
			value done = gen-next! iter
			case!
				done
					end-loop!
				pred value
					set! found (=> ? [ value ]
					end-loop!
				else
					()
		get found

	count. Method
		doc. "Number of elements in it."
		default. |:Nat _
			fold _ 0 +[1]

	impl! empty? Bag
		doc. "Whether `count` will return 0."
		|:Bool _
			(gen-next! iterator_).done

region Using from-stream
	keep. Method
		doc. "Bag with only the elements that satisfy `keep-if?`."
		test. |
			[ [ 1 2 ] =?[2] ] -> [ 2 ]
		default. |_:Bag keep-if?:Pred
			keep=> type-of_ _ keep-if?

	keep=>.
		doc. "TODO"
		test. |
			"TODO"
		|Res-Type:Bag-Type _:Bag keep-if?:Pred
			from-stream Res-Type.prototype (streaming ~|
				iter = iterator_
				loop!
					value done = gen-next! iter
					case!
						done
							end-loop!
						keep-if? value
							<~ value
						else
							()

	map. Method
		doc. "TODO"
		test. |
			[ [ true false ] not ] -> [ false true ]
		default. |_:Bag mapper:Fun[Any Any]
			map=> type-of_ _ mapper

	map=>.
		doc. "TODO"
		test. |
			"TODO"
		|Res-Type:Bag-Type _:Bag mapper:Fun[Any Any]
			from-stream Res-Type.prototype (streaming ~|
				iter = iterator_
				loop!
					value done = gen-next! iter
					case!
						done
							end-loop!
						else
							<~ mapper value

	\ TODO: Better name?
	flat-map. Method
		doc. "TODO"
		test. |
			f = |case
				divisible? _ 2
					[ _ _ ]
				else
					[ _ ]
			[ [ 1 2 3 4 ] f ] -> [ 1 2 2 3 4 4 ]
		default. |_ mapper:Fun[Any Bag]
			flat-map=> type-of_ _ mapper

	flat-map=>.
		doc. "TODO"
		test. |
			"TODO"
		|Res-Type:Bag-Type _:Bag mapper:Fun[Any Bag]
			from-stream Res-Type.prototype (streaming ~|
				iter = iterator_
				loop!
					value done = gen-next! iter
					case! done
						_
							end-loop!
						else
							<~~ iterator (mapper value)

	impl! + Bag
		doc. "TODO"
		test. |
			[ [ 0 ] [ 1 ] ] -> [ 0 1 ]
		|:Bag _ add:Bag
			+=> type-of_ _ add

	+=>.
		doc. "TODO"
		test. |
			"TODO"
		|Res-Type:Bag-Type _:Bag add:Bag
			from-stream Res-Type.prototype (streaming ~|
				<~~ iterator_
				<~~ iterator add

	impl! - Bag
		doc. "
			Bag with the *first* instances of each in `remove` taken out.
			Most efficient for Sets.
		test. |
			[ [ 1 2 1 ] [ 1 ] ] -> [ 2 1 ]
		|:Bag _ remove:Bag
			-=> type-of_ _ remove

	-=>.
		doc. "TODO"
		test. |
			"TODO"
		|Res-Type:Bag-Type _:Bag remove:Bag
			from-stream Res-Type.prototype (streaming ~|
				iter = iterator_
				remove-us = => Hash-Set! remove
				loop!
					value done = gen-next! iter
					case!
						done
							end-loop!
						else
							case! value
								:remove-us
									-! remove-us [ value ]
								else
									<~ value

region Unsorted
	impl! =? Bag
		test. |
			! =? [ 1 ] [ 1 ]
		|a b
			and (reference=? (type-of a) (type-of b)) ~(seq=? a b

Bag
