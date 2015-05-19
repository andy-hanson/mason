use
	...Boolean and not
	...compare =?
	...methods sub
	...Type.Js-Method js-impl!
	...Type.Kind _ kind!
	...Type.Method _ impl!
	...Type.Pred-Type Any
	...Type.Type type-of
	..@ _ all? count empty? iterator map
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
js-impl! iterator Map ~|
	for! keys this
		<~ key. _ val. this[_]

region New methods
	?get. Method
		doc. "`?` containing the value corresponding to `key`, if any."
		args. [ "_" "key"

	has-key?. Method
		doc. "
			|:Boolean _ key:Any
			Whether the key is in the Map.
		args. [ "_" "key"
		default. |_ key
			not (empty? (?get _ key

	keys. Method
		doc. "Every key that the Map `has-key?`."
		args. 1

	values. Method
		doc. "Every value in the Map."
		args. 1
		default. |_
			map keys_ |key
				_[key]

	keys-values. Method
		doc. |:@[Any]
			"Every (key. val.)."
		args. 1
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
		|@key:@ get-value:Function
			map = empty Hash-Map!
			for! @key
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
