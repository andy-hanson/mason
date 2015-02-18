use
	...methods <!
	...Type.Impl-Type self-type
	...Type.Kind
	...Type.Method _ impl!
	...Type.Pred-Type Any
	...@ _ each! empty?
	..@-Type empty
	..?
	..Map _ each-pair! ?get
	.Map-Type
use~
	.Hash-Map!
debug use~
	...! _ !not
	...Bool not
	...control if!
	...math.methods *
	...methods =? compare
	...Type =>
	...Type.Wrap-Type
	...@ map
	..@! empty!
	..Array
	..Set set=?
	..Map has-key? keys
	.Weak-Identity-Map!

Map! = Kind
	doc. "TODO"
	implementor-test. |type
		Mt = Wrap-Type
			doc. "Mappable Thing; might be a Weak-Identity-Map!, so must be a reference type."
		\ Might be a Sorted-Map, so must be comparable.
		impl! compare Mt |a b
			compare a.val b.val
		\ => Array because these must maintain by their identity for Weak-Identity-Map!
		ks = => Array (map [ 1 3 5 4 2 ] Mt
		noweak = |do
			if! (not :Weak-Identity-Map!) do
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

		\ assoc! should overwrite previous values
		zero = Mt 0
		assoc! _ zero 0
		assoc! _ zero 1
		! =? _[zero] 1

<! (self-type Map!) Map-Type
impl! empty (self-type Map!) |
	empty Hash-Map!

assoc!. Method
	doc. |_ key:Any val:Any
		"Set _[key] to val."

assoc*!.
	doc. "Adds the other map's keys to mine, overriding my values."
	test. "See Map!.implementor-test."
	|_:Map! to-add:Map
		each-pair! to-add assoc![_]

un-assoc!. Method
	doc. |:? _ key
		"If there is a value associated with `key`, removes it and returns the value associated."

un-assoc*!.
	doc. "Removes keys (and by proxy, their associated values)."
	|_ @to-delete:@
		each! @to-delete un-assoc![_]

add!. Method
	doc. |_ key:Any val:Any
		"assoc! key val, but fail if _[key] is set already."
	default. |_ key:Any val:Any
		in
			!not (has-key? _ key) ~"
				Already have key {key}.
		assoc! _ key val

get-or-add!. Method
	doc. "map[key], and if it's not already there, fill it in with default-val."
	default. |map key:Any ~default-val
		case ?get map key
			empty?_
				assoc! map key default-val
				default-val
			else
				_.val

<! Map! Map

Map!
