use
	..@ _ all? count each! map
	..@.? _ un-?
	..Bool _ and not
	..Comparable =?
	..Fun _ identity
	..methods empty empty? freeze sub
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
	..methods +

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
			"TODO"
		|_
			count keys_

	impl! empty? Map |_
		empty? keys_

	impl! sub Map |map key:Any
		un-? (?get map key) ~"{map} does not contain {key}."

region Functions
	each-pair!.
		doc. "TODO"
		test. |
			"TODO"
		|_:Map do-each:Fun
			each! keys_ |key
				do-each key _[key]

	make-map.
		doc. "TODO"
		test. |
			map = make-map [ 1 2 ] |x
				+ x 1
			! =? map[1] 2
			! =? map[2] 3
		|keys:@ mapper:Fun
			map = empty Hash-Map!
			each! keys |key
				assoc! map key (mapper key)
			freeze map

	map=?.
		doc. "TODO"
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
