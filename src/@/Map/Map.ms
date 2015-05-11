use
	...Bool and not
	...compare =?
	...Fun
	...Generator! each~
	...methods sub
	...Type.Type type-of
	...Type.Kind _ kind!
	...Type.Method _ impl!
	...Type.Pred-Type Any
	..@ _ all? count each! empty? iterator map
	..@-Type empty
	..? un-?
use~
	.Hash-Map!
	.Map! assoc!
use-debug
	...!
	...math.methods +

Map = Kind
	doc. "Mapping from keys to values."

kind! Map @
impl! iterator Map |_
	each~ keys_ ~|k
		<~ key. k val. _[k]

region New methods
	?get. Method
		doc. "
			|:? _ key:Any
			`?` containing the value corresponding to `key`, if any.

	has-key?. Method
		doc. "
			|:Bool _ key:Any
			Whether the key is in the Map.
		default. |_ key:Any
			not (empty? (?get _ key

	keys. Method
		doc. "Every key that the Map `has-key?`."

	values. Method
		doc. "Every value in the Map."
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
			map

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
