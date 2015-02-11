use
	..@ _ all? count each! map
	..@.? _ un-?
	..Bool _ and not
	..Fun _ identity
	..methods =? empty empty? freeze sub
	..Type type-of
	..Type.Impl-Type self-type
	..Type.Kind
	..Type.Method _ impl!
	..Type.Pred-Type Any
use~
	.Hash-Map!
	.Map! assoc!
debug use~
	..!
	..Bool false true
	..control build
	..math.methods +

Map. Kind
	doc. "Mapping from keys to values."

\ TODO: impl! sub Map-Type identity
impl! sub (self-type Map) identity

region New methods
	?get. Method
		doc. |:? _ key:Any
			"`?` containing the value corresponding to `key`, if any."

	has-key?. Method
		doc. |:Bool _ key:Any
			"Whether the key is in the Map."
		default. |_ key:Any
			not (empty? (?get _ key

	keys. Method
		doc. |:@ _
			"Every key that the Map `has-key?`."

	values. Method
		doc. |:@ _
			"Every value in the Map."
		default. |_
			map keys_ |key
				_[key]

	keys-values. Method
		doc. |:@[Any]
			"Every \{ key, val }."
		default. |_
			map keys_ |k
				key. k
				val. _[k]

region Old methods
	impl! =? Map |m1 m2
		and (=? (type-of m1) (type-of m2)) ~(map=? m1 m2

	impl! count Map
		test. |
			\ TODO:SYNTAX [ 1 -> 2, 3 -> 4 ]
			map =
				1 -> 2
				3 -> 4
			[ map ] -> 2
		|_
			count keys_

	impl! empty? Map |_
		empty? keys_

	impl! sub Map |map key:Any
		un-? (?get map key) ~"{map} does not contain {key}."

region Functions
	@pairs.
		doc. "TODO"
		test. |
			"TODO"
		|_:Map
			map keys_ |k
				key. k
				val. _[key]

	each-pair!.
		doc. "Calls `do-each` on each key and value."
		test. |
			! =? [ [ 1 2 ] [ 3 4 ] ] (build |yield
				\ TODO:SYNTAX [ 1 -> 2, 3 -> 4 ]
				map =
					1 -> 2
					3 -> 4
				each-pair! map |key val
					yield [ key val ]
		|_:Map do-each:Fun
			each! @pairs_ |_
				key val = _
				do-each key val

	make-map.
		doc. "Creates a Map whose values are the result of applying `get-value` to each key."
		test. |
			map = make-map [ 1 2 ] |x
				+ x 1
			! =? map[1] 2
			! =? map[2] 3
		|@key:@ get-value:Fun
			map = empty Hash-Map!
			each! @key |_
				assoc! map _ get-value_
			freeze map

	map=?.
		doc. "Whether the two maps have the same keys and the same associated values, regardless of the maps' types."
		test. |
			m1 =
				1 -> 2
				3 -> 4
			m2 =
				1 -> 2
			[ m1 m1 ] -> true
			[ m1 m2 ] -> false
		|a:Map b:Map
			and (=? (count a) (count b)) ~
				all? (keys a) |key
					?bk = ?get b key
					and (not (empty? ?bk)) ~(=? a[key] ?bk.val

Map
