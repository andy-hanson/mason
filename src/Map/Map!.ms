use
	..@ _ each!
	..@.?
	..Comparable! <!
	..methods +! -! empty?
	..Type.Kind
	..Type.Method _ impl!
	..Type.Pred-Type Any
	..Map _ each-pair! ?get
debug use~
	..! _ !not
	..@ map
	..@.Array
	..@.Set set=?
	..Bool not
	..Comparable =? compare
	..control if!
	..methods => * empty empty!
	..Type.Record-Type
	..Map has-key? keys
	.Weak-Identity-Map!


Map! = Kind
	doc. "
		TODO:REST
		-!: Takes a @ of keys to remove.
		+!: Adds another map.
	implementor-test. |type
		\ Might be a Weak-Identity-Map!, so must be a reference type.
		Mappable-Thing = Record-Type
			members.
				data.
		\ Might be a Sorted-Map, so must be comparable.
		impl! compare Mappable-Thing |a b
			compare a.data b.data
		mt = |n
			Mappable-Thing
				data. n
		\ => Array because these must maintain by their identity for Weak-Identity-Map!
		ks = => Array (map [ 1 3 5 4 2 ] mt
		noweak = |do
			if! (not :Weak-Identity-Map!) do
		_ = empty type
		noweak |
			! empty? _
		each! ks |n
			add! _ n (* 2 n.data)
		each! ks |n
			! =? _[n] (* 2 n.data)
		?get _ (mt 0)
		! empty? (?get _ (mt 0))
		noweak |
			! =? (mt 1) (mt 1)
			! set=? keys_ (map [ 1 2 3 4 5 ] mt)
			empty! _
			! empty? _

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
	|_ to-delete:@
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

get-or-add!. Method
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
