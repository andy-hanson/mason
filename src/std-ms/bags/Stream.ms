use
	.Array -> ->Array
	..assert -> !=
	.Bag -> all? Bag-Type empty iterator seq=? zip
	..Bool -> and
	..Comparable -> =?
	..Fun -> identity thunk
	..Generator
	..Str -> ->Str
	..types.Interface -> implementor! implementor-direct!
	..types.Method -> impl! impl-direct!
	..types.Record-Type
	..types.Type -> subsumes?

Stream = Record-Type
	doc. "
		A Stream is a Bag whose elements are the outputs of a Generator.
		Unlike a Generator, a Stream can be used multiple times.

	members.
		make-iterator. Fun[Generator]

implementor! Stream Bag
impl! iterator Stream |_
	_.make-iterator ()

impl! =? Stream |s1 s2
	and (subsumes? Stream s2) (seq=? s1 s2)

impl! ->Str Stream
	test. |
		x = streaming ~|
			<~ 0
			<~ 1
		!= (->Str x) "Stream 0 1"
	|_
		"Stream {->Array_.join " "}"



->Stream. Method
	doc. "TODO"
impl! ->Stream Bag |_
	streaming |
		iterator_

streaming.
	doc. "Creates a Stream whose values are the yields of the generator produced by make-gen."
	test. |
		_ = streaming ~|
			<~ 1
			<~ 2
		!= ->Array_ [ 1 2 ]
		\ They can be used twice!
		!= ->Array_ [ 1 2 ]
	|make-gen:Fun[Generator]
		Stream
			make-iterator. make-gen

empty-stream = streaming ~|
	()
implementor-direct! Stream Bag-Type
impl-direct! empty Stream (thunk empty-stream)

Stream
