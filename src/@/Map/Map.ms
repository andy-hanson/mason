use
	...compare =?
	...methods sub
	...private.bootstrap msDef
	...to-string
	...Type.Kind _ kind!
	...Type.Method _ impl!
	...Type.Pred-Type Any
	...Type.Type => type-of
	..@ _ all? count empty? map~
	..@-Type empty
	..? ?-or un-?
use~
	.Id-Map
use-debug
	...math.methods +

Map. new Kind
	name.
	doc. "Mapping from keys to values."

kind! Map @

impl! to-string Map
	test. |
		m =
			1 -> 2
		[m] -> "Map\n\t1 -> 2"
	.|
		# TODO: map Map to Array
		# TODO:SYNTAX Array destructure
		parts = map~ this |pair
			"{pair[0]} -> {pair[1]}"
		"
			{.constructor.name}
				{=> String parts "\n\t"}

region New methods
	?get. new Method
		name.
		doc. "`?` containing the value corresponding to `key`, if any."
		args. ["_" "key"]

	has-key?. new Method
		name.
		doc. "
			|:Boolean _ key:Any
			Whether the key is in the Map.
		args. ["_" "key"]
		default. .|key
			not (empty? (?get this key))

	keys. new Method
		name.
		doc. "Every key that the Map `has-key?`."
		args. 1
		default. .|
			=> Array (map~ this |pair
				pair[0]

	values. new Method
		name.
		doc. "Every value in the Map."
		args. 1
		default. .|
			=> Array (map~ this |pair
				pair[1]

region Old methods
	impl! =? Map .|other
		and (=? (type-of this) (type-of other)) (map=? this other)

	impl! sub Map .|key:Any
		un-? (?get this key) ~"{this} does not contain {key}."

region Functions
	make-map.
		doc. "Creates a Map whose values are the result of applying `get-value` to each key."
		test. !|
			map = make-map [1 2] |x
				+ x 1
			assert! =? map[1] 2
			assert! =? map[2] 3
		# TODO: map-type param
		|@key:@ get-value:Function
			map = empty Id-Map
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
			[m1 m1] -> true
			[m1 m2] -> false
		|a:Map b:Map
			and (=? (count a) (count b))
				all? a |pair
					# TODO:SYNTAX Array destructure
					key = pair[0]
					val = pair[1]
					?bk = ?get b key
					and (not empty? ?bk) (=? val ?bk.val)

region Mutator methods
	assoc!. new Method
		name.
		doc. "Set _[key] to val."
		args. ["_" "key" "val"]
	msDef "assoc" assoc!

	assoc*!.
		doc. "Adds the other map~s keys to mine, overriding my values."
		test. "See Map.implementor-test."
		!|map:Map to-add:Map
			for! to-add
				# TODO:SYNTAX Array destructure
				assoc! map _[0] _[1]

	un-assoc!. new Method
		name.
		doc. "
			If there is a value associated with `key`, removes it and returns the value associated.
		args. ["_" "key"]

	un-assoc*!.
		doc. "Removes keys (and by proxy, their associated values)."
		!|map:Map @to-delete:@
			for! @to-delete
				un-assoc! map _

	add!. new Method
		name.
		doc. "
			|_ key:Any val:Any
			assoc! key val, but fail if _[key] is set already.
		args. ["_" "key" "val"]
		default. .!|key val
			in
				forbid! has-key? this key throw! "Already have key {key}."
			assoc! this key val

	get-or-add!. new Method
		name.
		doc. "map[key], and if it's not already there, fill it in with default-val."
		args. ["_" "key" "~default-val"]
		default. .|key ~default-val
			?-or (?get this key) ~
				assoc! this key default-val
				default-val
