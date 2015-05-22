# TODO: TEST
use
	...compare =?
	...hash-code
	...js defined?
	...methods freeze
	...Object! p!
	...Type.Js-Method js-impl!
	...Type.Kind kind! self-kind!
	...Type.Tuple
	...Type.Wrap-Type
	..@ iterator map
	..@! empty!
	..@-Type empty
	..? _ Opt->?
	.Map ?get values
	.Id-Map!
	.Map! _ assoc! un-assoc!
	.Map-Type
use-debug
	...!
	..Seq.Seq seq=?
	.Map keys

Hash-Map! = Wrap-Type
	doc. "Default Map! type. Depends on efficient `hash-code` of its keys."
	# TODO: Remove, just use Map.implementor-test.
	test. |
		_ =
			1 -> 2
			3 -> 4
		! =? _[1] 2
		! =? _[3] 4
		! seq=? _
			. [ 1 2
			. [ 3 4
		! seq=? keys_ [ 1 3 ]
		! =? (?get _ 8) (empty ?)
	# Wraps a map from hash codes to buckets.
	wrapped-type. Id-Map!

Bucket = Tuple
	props. [ "key" "val!" "next!"

self-kind! Hash-Map! Map-Type
	empty -> |
		Hash-Map! (empty Id-Map!

# All entries in the bucket have the same hash code.
# Find the first bucket that =? key.
opt-bucket-entry = |opt-bucket key
	cur ::= opt-bucket
	# TODO:SYNTAX Loop return value
	res ::= undefined
	for!
		unless! defined? cur
			break!
		if! =? cur.key key
			res := cur
		cur := cur.next!
	res

js-impl! iterator Hash-Map! ~|
	for! bucket in values this.val
		cur ::= bucket
		for!
			unless! defined? cur
				break!
			<~ [ cur.key cur.val! ]
			cur := cur.next!

kind! Hash-Map! Map!
	?get -> |_ key
		bucket = _.val.get (hash-code key
		entry = opt-bucket-entry bucket key
		map (Opt->? entry) |_
			_.val!

	assoc! -> |hm key val
		hash = hash-code key
		bucket = hm.val.get hash
		case! opt-bucket-entry bucket key
			defined?_
				# TODO: Might not want to overwrite value...
				p! _ "val!" val
			else
				# Add it at the front.
				hm.val.set hash (Bucket key val bucket

	un-assoc! -> |hm key
		hash = hash-code key
		bucket = hm.val.get hash
		case bucket
			defined?_
				case
					=? _.key key
						case! bucket.next!
							defined?_
								assoc! hm.val key _
							else
								un-assoc! hm.val hash
						? _.val!
					else
						# TODO:SYNTAX Loop return value
						cur ::= bucket
						res ::= empty ?
						for!
							next = cur.next!
							unless! defined?_ next
								break!
							if! =? next.key key
								p! cur "next!" next.next!
								res := ? next.val!
								break!
							cur := next
						res
			else
				empty ?

	freeze -> |_
		freeze _.val
		Object.freeze _

	empty! -> |_
		empty! _.val

Hash-Map!
