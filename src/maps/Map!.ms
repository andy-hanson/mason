use
	..assert -> ! !not
	..bags.?
	..bags.Bag -> each!
	..Comparable -> =?
	..Comparable! -> <!
	.Map -> each-pair! ?get has-key?
	..methods -> +! -! empty empty?
	..pred-types -> Any
	..types.Interface
	..types.Method -> impl!

Map! = Interface
	doc. "
		TODO:REST
		-!: Takes a Bag of keys to remove.
		+!: Adds another map.
	implementor-test. |type
		\ Not using primitives for the test since Weak-Identity-Map! won't allow it.
		_ = empty  type
		add! _ Map Map!
		! =? _[Map] Map!
		+! _
			Map -> Interface
			Interface -> Interface
		! =? _[Map] Interface
		! =? _[Interface] Interface
		un-assoc! _ Interface
		! empty? (?get _ Interface)
		\ TODO: empty! test
		\ TODO: keys, values

assoc!. Method
	doc. |_ key:Any val:Any
		"TODO"

un-assoc!. Method
	doc. |:? _ key
		"If there is a value associated with `key`, removes it and returns the value associated."

impl! -! Map!
	doc. "TODO"
	test. |
		"TODO"
	|_ to-delete:Bag
		each! to-delete |em
			un-assoc! _ em

add!. Method
	doc. |_ key:Any val:Any
		"TODO"
	default. |_ key:Any val:Any
		in
			!not (has-key? _ key) ~"
				Already have key {key}.
		assoc! _ key val

get-or-update!. Method
	doc. "TODO"
	default. |map key:Any ~default-val
		case ?get map key
			empty?_
				assoc! map key default-val
				default-val
			else
				_.val


impl! +! Map!
	doc. "TODO"
	test. |
		"TODO"
	|_ to-add:Map
		each-pair! to-add assoc![_]

<! Map! Map

Map!
