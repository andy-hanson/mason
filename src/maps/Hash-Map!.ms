\ TODO: TEST

use
	..assert -> !
	..@ -> flat-map map
	..@.? -> Opt->?
	..@.Seq -> seq=?
	..@.Stream -> streaming
	..Comparable -> =?
	..Comparable! -> <!
	..hash-code
	.Identity-Map!
	..js -> defined?
	.Map -> ?get keys values
	.Map! -> assoc! un-assoc!
	..methods -> => empty empty! freeze
	..Object
	..Object! -> change-property!
	..types.Method -> impl!
	..types.Record-Type
	..types.util -> self-type

Bucket-Entry = Record-Type
	doc. "
		TODO
		Explain how this is both Bucket and Bucket-Entry
	members.
		key.
		val!.
		next!.

Hash-Map! = Record-Type
	doc. "TODO"
	test. |
		_ =
			1 -> 2
			3 -> 4
		! =? _[1] 2
		! =? _[3] 4
		! seq=? keys_ [ 1 3 ]
		! =? (?get _ 8) (empty ?)

	members.
		hash->bucket. Identity-Map!

<! Hash-Map! Map!

opt-bucket = |_ key
	_.hash->bucket.get (hash-code key

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
	buckets = values _.hash->bucket
	flat-map buckets |bucket
		streaming ~|
			handle-bucket = ~|case!
				defined?_
					<~ _.key
					handle-bucket _.next!
				else
					()
			<~~ handle-bucket bucket

\ TODO: impl! values, similarly

impl! assoc! Hash-Map! |hm key val
	out
		! =? hm[key] val

	bucket = opt-bucket hm key
	case! opt-bucket-entry bucket
		defined?_
			change-property! _ "val!" val
		else
			k = key
			be = Bucket-Entry
				\ TODO:SYNTAX
				key. k
				val!. val
				next!. bucket
			hm.hash->bucket.set (hash-code key) be

impl! un-assoc! Hash-Map! |hm key
	bucket = opt-bucket hm key
	case bucket
		defined?_
			case
				=? _.key key
					case! bucket.next!
						defined?_
							assoc! hm.hash->bucket key _
						else
							un-assoc! hm.hash->bucket (hash-code key
					=> ? [ _.val! ]
				else
					delete-from-next-bucket! = |prev-bucket
						next = prev-bucket.next!
						case next
							defined?_
								case
									=? next.key key
										change-property! prev-bucket "next!" next.next!
										=> ? [ next.val! ]
									else
										delete-from-next-bucket! next
							else
								empty ?

					delete-from-next-bucket! bucket
		else
			empty ?

impl! freeze Hash-Map! |_
	freeze _.hash->bucket
	Object.freeze _

impl! empty! Hash-Map! |_
	empty! _.hash->bucket

impl! empty (self-type Hash-Map!) |
	Hash-Map!
		hash->bucket. empty Identity-Map!

Hash-Map!
