use
	...Type.Kind _ kind! self-kind!
	...Type.Method _ self-impl!
	..@
	..@-Type empty
	..? ?-or
	.Map _ ?get
	.Map-Type
use~
	.Id-Map!
use-debug
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

Map!. Kind
	doc. "TODO"
	implementor-test. !|type
		Mt = Wrap-Type
			doc. "Mappable Thing; might be a Weak-Id-Map!, so must be a reference type."
		# Might be a Sorted-Map, so must be comparable.
		impl! compare Mt |a b
			compare a.val b.val
		# => Array because these must maintain by their identity for Weak-Id-Map!
		ks = => Array (map [ 1 3 5 4 2 ] Mt
		noweak = !|act
			unless! :Weak-Id-Map!
				act()
		_ = empty type
		noweak !|
			assert! empty? _
		do-adds = !|
			for! n in ks
				add! _ n (* 2 n.val)
		do-adds()
		for! n in ks
			assert! =? _[n] (* 2 n.val)
		?get _ (Mt 0
		assert! empty? (?get _ (Mt 0
		noweak !|
			assert! set=? keys_ (map [ 1 2 3 4 5 ] Mt
			empty! _
			assert! empty? _
			do-adds()
			un-assoc*! _ ks
			assert! empty? _

		# assoc! should overwrite previous values
		zero = Mt 0
		assoc! _ zero 0
		assoc! _ zero 1
		assert! =? _[zero] 1

self-kind! Map! Map-Type
self-impl! empty Map! |
	empty Id-Map!

assoc!. Method
	doc. "Set _[key] to val."
	args. [ "_" "key" "val"

assoc*!.
	doc. "Adds the other map's keys to mine, overriding my values."
	test. "See Map!.implementor-test."
	!|map:Map! to-add:Map
		for! to-add
			# TODO:SYNTAX Array destructure
			assoc! map _[0] _[1]

un-assoc!. Method
	doc. "
		If there is a value associated with `key`, removes it and returns the value associated.
	args. [ "_" "key"

un-assoc*!.
	doc. "Removes keys (and by proxy, their associated values)."
	!|map:Map! @to-delete:@
		for! @to-delete
			un-assoc! map _

add!. Method
	doc. "
		|_ key:Any val:Any
		assoc! key val, but fail if _[key] is set already.
	args. [ "_" "key" "val"
	default. !|_ key val
		in
			forbid! has-key? _ key throw! "Already have key {key}."
		assoc! _ key val

get-or-add!. Method
	doc. "map[key], and if it's not already there, fill it in with default-val."
	args. [ "_" "key" "~default-val"
	default. |map key ~default-val
		?-or (?get map key) ~
			assoc! map key default-val
			default-val

kind! Map! Map
