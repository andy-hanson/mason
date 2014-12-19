use
	..assert -> !
	.Bag -> flat-map iterator keep map
	.Bag-Type
	..Bool -> and
	..Comparable -> =?
	..Comparable! -> <!
	..Fun -> ignore Pred thunk
	..Generator!
	..math.Num -> Nat
	..methods -> => + - contains? empty
	..pred-types -> Any
	..Ref -> get mod! ref
	.Seq -> drop seq=? slice take
	..types.Method -> impl!
	..types.Record-Type
	..types.util -> self-type

Stream = Record-Type
	doc. "
		A Stream is a Bag whose elements are the outputs of a Generator!.
		Unlike a Generator!, a Stream can be used multiple times.

	members.
		make-iterator. Fun[Generator!]

<! Stream Seq
impl! iterator Stream |_
	_.make-iterator ()

impl! =? Stream |s1 s2
	and (contains? Stream s2) (seq=? s1 s2)

streaming.
	doc. "Creates a Stream whose values are the yields of the Generator! produced by make-gen."
	test. |
		_ = streaming ~|
			<~ 1
			<~ 2
		! seq=? _ [ 1 2 ]
		\ They can be used twice!
		! seq=? _ [ 1 2 ]
	|make-gen:Fun[Generator!]
		Stream
			make-iterator. make-gen

empty-stream = streaming ~|
	()
<! (self-type Stream) Bag-Type
impl! empty (self-type Stream) (thunk empty-stream)


region Overrides
	impl! map Stream |_ mapper:Fun
		streaming ~|
			iter = iterator_
			loop!
				value done = iter.next ()
				case!
					done
						end-loop!
					else
						<~ mapper value

	impl! keep Stream |_ keep-if?:Pred
		streaming ~|
			iter = iterator_
			loop!
				value done = iter.next ()
				case!
					done
						end-loop!
					keep-if? value
						<~ value
					else
						()

	impl! flat-map Stream |_ mapper:Fun[Any Bag]
		streaming ~|
			x:Bag = _
			iter = iterator x
			loop!
				value done = iter.next ()
				case! done
					_
						end-loop!
					else
						<~~ iterator (mapper value)

	impl! take Stream |_ count-to-take:Nat
		streaming ~|
			iter = iterator_
			i = ref 0
			loop!
				case!
					=? (get i) count-to-take
						end-loop!
					else
						value done = iter.next ()
						case!
							done
								end-loop!
							else
								<~ value
								mod! i +[1]

	impl! drop Stream |_ count-to-drop:Nat
		streaming ~|
			iter = iterator_
			i = ref 0
			loop!
				case!
					=? (get i) count-to-drop
						end-loop!
					else
						case!
							(iter.next ()).done
								end-loop!
							else
								mod! i +[1]
			<~~ iter

	impl! slice Stream |_ start:Nat end:Nat
		take (drop _ start) (- end start)

	impl! + Stream |_ bag2:Bag
		streaming ~|
			<~~ iterator_
			<~~ iterator bag2

impl! => (self-type Stream) Bag |Stream _
	ignore Stream \ TODO:Ignored vars
	streaming |
		iterator_

Stream
