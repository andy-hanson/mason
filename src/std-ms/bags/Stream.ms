use
	.Array -> ->Array
	..arithmetic-methods -> + -
	..assert -> !
	.Bag -> all? drop flat-map iterator keep map seq=? slice take zip
	.Bag-Type -> empty
	..basic-methods -> =>
	..Bool -> and or
	..Comparable -> =?
	..Fun -> identity Pred thunk
	..Generator
	..math.Num -> Nat
	..pred-types -> Any
	..Str
	..types.Interface -> implementor!
	..types.Method -> impl!
	..types.Record-Type
	..types.Type -> subsumes?
	..types.util -> self-type

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

streaming.
	doc. "Creates a Stream whose values are the yields of the generator produced by make-gen."
	test. |
		_ = streaming ~|
			<~ 1
			<~ 2
		! seq=? _ [ 1 2 ]
		\ They can be used twice!
		! seq=? _ [ 1 2 ]
	|make-gen:Fun[Generator]
		Stream
			make-iterator. make-gen

empty-stream = streaming ~|
	()
implementor! (self-type Stream) Bag-Type
impl! empty (self-type Stream) (thunk empty-stream)


region Overrides
	impl! map Stream |_ mapper:Fun
		streaming ~|
			\ TODO:ES6 `for (let value of _)`
			iter = iterator_
			`for (let em of iter) yield mapper(em)`
			()

	impl! keep Stream |_ keep-if?:Pred
		streaming ~|
			\ TODO:ES6 `for (let value of _)`
			iter = iterator_
			ki = keep-if?
			`for (let em of iter) if (ki(em)) yield em`
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
			i ::= 0
			loop!
				value done = iter.next ()
				case!
					or done ~(=? i count-to-take)
						end-loop!
					else
						<~ value
						i := + i 1

	impl! drop Stream |_ count-to-drop:Nat
		streaming ~|
			iter = iterator_
			i ::= 0
			\ Discard count-to-drop values:
			loop!
				value done = iter.next ()
				i := + i 1
				case!
					or done ~(=? i count-to-drop)
						end-loop!
					else
						()
			\ And give out the rest
			loop!
				value done = iter.next ()
				case!
					done
						end-loop!
					else
						<~ value

	impl! slice Stream |_ start:Nat end:Nat
		take (drop _ start) (- end start)

	impl! + Stream |_ bag2:Bag
		streaming ~|
			<~~ iterator_
			<~~ iterator bag2

impl! => (self-type Stream) Bag |ignore _
	streaming |
		iterator_

Stream
