# TODO: TEST
use
	...compare =?
	...hash-code
	...js defined?
	...methods freeze
	...Type.Method impl! self-impl!
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
self-impl! empty Hash-Map |
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

impl! iterator Hash-Map .~!|
	for! bucket in values .val
		cur ::= bucket
		for!
			unless! defined? cur
				break!
			<~ [ cur.key cur.val! ]
			cur := cur.next!

kind! Hash-Map Map

impl! ?get Hash-Map .|key
	bucket = .val.get (hash-code key)
	entry = opt-bucket-entry bucket key
	map (Opt->? entry) |_
		_.val!

impl! assoc! Hash-Map .!|key val
	hash = hash-code key
	bucket = .val.get hash
	case! opt-bucket-entry bucket key
		defined?_
			# TODO: Might not want to overwrite value...
			_.val! := val
		else
			# Add it at the front.
			.val.set hash (Bucket key val bucket

impl! un-assoc! Hash-Map .|key
	hash = hash-code key
	bucket = .val.get hash
	case bucket
		defined?_
			case
				=? _.key key
					case! bucket.next!
						defined?_
							assoc! .val key _
						else
							un-assoc! .val hash
					? _.val!
				else
					cur ::= bucket
					for
						next = cur.next!
						unless! defined?_ next
							break empty ?
						if! =? next.key key
							cur.next! := next.next!
							break ? next.val!
						cur := next
		else
			empty ?

impl! freeze Hash-Map .!|
	freeze .val
	Object.freeze this

impl! empty! Hash-Map .!|
	empty! .val
