import
	...compare =?
	...methods sub
	...to-string _ inspect
	...Type.Type => type-of
	..@ _ all? count empty? @map~
	..@-Type empty
	..? ?-or un-?
import~
	.Id-Map

Map. kind @
	| Mapping from keys to values.

	to-string |
		inspect this

	inspect |
		todo  map Map to Array
		todo SYNTAX Array destructure
		todo @for~
		parts = @map~ this |pair
			"#(inspect pair[0]) -> #(inspect pair[1])"
		"
			#(.constructor.name)
				#(=> String parts "\n\t")

	=? |other
		and (=? (type-of this) (type-of other)) (map=? this other)

	sub |key
		un-? (?get this key) ~"#this does not contain #key."

region New methods
	?get. method |key
		| `?` containing the value corresponding to `key`, if any.
		abstract

	has-key?. method |key
		| Whether the key is in the Map.
		not empty? (?get this key)

	@keys. method |
		| Every key that the Map `has-key?`.
		todo @for:Array
		=> Array (@map~ this |pair
			pair[0]

	@values. method |
		| Every value in the Map.
		todo @for:Array
		=> Array (@map~ this |pair
			pair[1]

region Functions
	make-map. |@key:@ get-value:Function
		| Creates a Map whose values are the result of applying `get-value` to each key.
		todo  map-type param
		map = empty Id-Map
		for @key
			map[_] = get-value_
		map

	map=?. |a:Map b:Map
		| Whether the two maps have the same keys and the same associated values, regardless of the maps' types.
		and (=? (count a) (count b))
			all? a |pair
				todo SYNTAX Array destructure
				key = pair[0]
				val = pair[1]
				?bk = ?get b key
				and (not empty? ?bk) (=? val ?bk.val)

region Mutator methods
	get-or-add!. method |key ~default-val
		| map[key], and if it's not already there, fill it in with default-val.
		?-or (?get this key) ~
			this[key] = default-val
			default-val
