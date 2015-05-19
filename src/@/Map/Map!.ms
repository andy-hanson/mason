use
	...Type.Kind _ kind! self-kind!
	...Type.Method _ self-impl!
	..@ _ each!
	..@-Type empty
	..? ?-or
	.Map _ ?get
	.Map-Type
use~
	.Hash-Map!
use-debug
	...! _ !not
	...compare _ =?
	...math.methods *
	...Type.Method impl!
	...Type.Wrap-Type
	...Type.Type =>
	..@ empty? map
	..@! empty!
	..Set.Set set=?
	.Map has-key? keys
	.Weak-Id-Map!

Map! = Kind
	doc. "TODO"
	implementor-test. |type
		Mt = Wrap-Type
			doc. "Mappable Thing; might be a Weak-Id-Map!, so must be a reference type."
		# Might be a Sorted-Map, so must be comparable.
		impl! compare Mt |a b
			compare a.val b.val
		# => Array because these must maintain by their identity for Weak-Id-Map!
		ks = => Array (map [ 1 3 5 4 2 ] Mt
		noweak = |do
			unless! :Weak-Id-Map!
				do()
		_ = empty type
		noweak |
			! empty? _
		do-adds = |
			each! ks |n
				add! _ n (* 2 n.val)
		do-adds()
		each! ks |n
			! =? _[n] (* 2 n.val)
		?get _ (Mt 0
		! empty? (?get _ (Mt 0
		noweak |
			! set=? keys_ (map [ 1 2 3 4 5 ] Mt
			empty! _
			! empty? _
			do-adds()
			un-assoc*! _ ks
			! empty? _

		# assoc! should overwrite previous values
		zero = Mt 0
		assoc! _ zero 0
		assoc! _ zero 1
		! =? _[zero] 1

self-kind! Map! Map-Type
self-impl! empty Map! |
	empty Hash-Map!

assoc!. Method
	doc. "Set _[key] to val."
	args. [ "_" "key" "val"

assoc*!.
	doc. "Adds the other map's keys to mine, overriding my values."
	test. "See Map!.implementor-test."
	|_:Map! to-add:Map
		each! to-add |pair
			assoc! _ pair.key pair.val

un-assoc!. Method
	doc. "
		If there is a value associated with `key`, removes it and returns the value associated.
	args. [ "_" "key"

un-assoc*!.
	doc. "Removes keys (and by proxy, their associated values)."
	|_ @to-delete:@
		each! @to-delete un-assoc![_]

add!. Method
	doc. "
		|_ key:Any val:Any
		assoc! key val, but fail if _[key] is set already.
	args. [ "_" "key" "val"
	default. |_ key val
		in
			!not (has-key? _ key) ~"
				Already have key {key}.
		assoc! _ key val

get-or-add!. Method
	doc. "map[key], and if it's not already there, fill it in with default-val."
	args. [ "_" "key" "~default-val"
	default. |map key ~default-val
		?-or (?get map key) ~
			assoc! map key default-val
			default-val

kind! Map! Map

Map!
