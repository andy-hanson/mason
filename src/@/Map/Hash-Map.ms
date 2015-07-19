# TODO: TEST
use
	...compare =?
	...hash-code
	...js defined?
	...methods freeze
	...Object p!
	...Type.Js-Method js-impl!
	...Type.Kind kind! self-kind!
	...Type.Tuple
	...Type.Wrap-Type
	..@ empty! iterator map
	..@-Type empty
	..? _ Opt->?
	.Id-Map
	.Map _ assoc! ?get un-assoc! values
	.Map-Type
use-debug
	..Seq.Seq seq=?
	.Map keys

Hash-Map. Wrap-Type
	doc. "Default Map type. Depends on efficient `hash-code` of its keys."
	# TODO: Remove, just use Map.implementor-test.
	test. !|
		_ =
			1 -> 2
			3 -> 4
		assert! =? _[1] 2
		assert! =? _[3] 4
		assert! seq=? _
			. [ 1 2
			. [ 3 4
		assert! seq=? keys_ [ 1 3 ]
		assert! =? (?get _ 8) (empty ?)
	# Wraps a map from hash codes to buckets.
	wrapped-type. Id-Map

Bucket = Tuple
	props. [ "key" "val!" "next!"

self-kind! Hash-Map Map-Type
	empty -> |
		Hash-Map (empty Id-Map

# All entries in the bucket have the same hash code.
# Find the first bucket that =? key.
opt-bucket-entry = |opt-bucket key
	cur ::= opt-bucket
	for
		unless! defined? cur
			break undefined
		if! =? cur.key key
			break cur
		cur := cur.next!

js-impl! iterator Hash-Map .~!|
	for! bucket in values .val
		cur ::= bucket
		for!
			unless! defined? cur
				break!
			<~ [ cur.key cur.val! ]
			cur := cur.next!

kind! Hash-Map Map
	?get -> |_ key
		bucket = _.val.get (hash-code key
		entry = opt-bucket-entry bucket key
		map (Opt->? entry) |_
			_.val!

	assoc! -> !|hm key val
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
						cur ::= bucket
						for
							next = cur.next!
							unless! defined?_ next
								break empty ?
							if! =? next.key key
								p! cur "next!" next.next!
								break ? next.val!
							cur := next
			else
				empty ?

	freeze -> |_
		freeze _.val
		Object.freeze _

	empty! -> !|_
		empty! _.val
