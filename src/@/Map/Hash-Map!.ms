# TODO: TEST
use
	...compare =?
	...hash-code
	...js defined?
	...methods freeze
	...Object! p!
	...Type.Kind kind! self-kind!
	...Type.Method impl! self-impl!
	...Type.Wrap-Type
	..@ flat-map map
	..@! empty!
	..@-Type empty
	..Seq.Stream
	..? _ Opt->?
	.Map ?get keys values
	.Id-Map!
	.Map! _ assoc! un-assoc!
	.Map-Type
use-debug
	...!
	..Seq.Seq seq=?

Hash-Map! = Wrap-Type
	doc. "Default Map! type. Depends on efficient `hash-code` of its keys."
	test. |
		_ =
			1 -> 2
			3 -> 4
		! =? _[1] 2
		! =? _[3] 4
		! seq=? keys_ [ 1 3 ]
		! =? (?get _ 8) (empty ?)
	# Wraps a map from hash codes to buckets.
	wrapped-type. Id-Map!

kind! Hash-Map! Map!

self-kind! Hash-Map! Map-Type
self-impl! empty Hash-Map! |
	Hash-Map! (empty Id-Map!

opt-bucket = |_ key
	_.val.get (hash-code key

opt-bucket-entry = |opt-bucket key
	case opt-bucket
		defined?_
			case
				=? _.key key
					_
				else
					opt-bucket-entry _.next! key
		else
			undefined

impl! ?get Hash-Map! |:? _ key
	bucket = opt-bucket _ key
	entry = opt-bucket-entry bucket key
	map (Opt->? entry) |be
		be.val!

impl! keys Hash-Map! |_
	buckets = values _.val
	flat-map buckets |_
		Stream ~|
			cur ::= _
			for!
				unless! defined? cur
					break!
				<~ cur.key
				cur := cur.next!

# TODO: impl! values, similarly

impl! assoc! Hash-Map! |hm key val
	bucket = opt-bucket hm key
	case! opt-bucket-entry bucket key
		defined?_
			p! _ "val!" val
		else
			# Add it at the front.
			k = key # TODO:SYNTAX
			hm.val.set (hash-code key)
				key. k # TODO:SYNTAX
				val!. val
				next!. bucket

impl! un-assoc! Hash-Map! |hm key
	bucket = opt-bucket hm key
	case bucket
		defined?_
			case
				=? _.key key
					case! bucket.next!
						defined?_
							assoc! hm.val key _
						else
							un-assoc! hm.val (hash-code key
					? _.val!
				else
					delete-from-next-bucket! = |prev-bucket
						next = prev-bucket.next!
						case next
							defined?_
								case
									=? next.key key
										p! prev-bucket "next!" next.next!
										? next.val!
									else
										delete-from-next-bucket! next
							else
								empty ?

					delete-from-next-bucket! bucket
		else
			empty ?

impl! freeze Hash-Map! |_
	freeze _.val
	Object.freeze _

impl! empty! Hash-Map! |_
	empty! _.val

Hash-Map!
