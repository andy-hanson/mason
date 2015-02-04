\ TODO: TEST

use
	..@ flat-map map'
	..@.? _ Opt->?
	..@.Stream
	..hash-code
	.Identity-Map!
	..js defined?
	..methods =? <! empty empty! freeze
	..Obj
	..Obj! p!
	..Type.Impl-Type self-type
	..Type.Method impl!
	..Type.Record-Type
	..Map ?get keys values
	.Map! _ assoc! un-assoc!
debug use
	..!
	..@.Seq seq=?

Bucket-Entry = Record-Type
	doc. "
		Value mapped to by hash->bucket.
		If multiple keys have the same hash, next! will be set to another Bucket-Entry.
		(The "bucket" is this linked list of Bucket-Entries.)
	members.
		key.
		val!.
		next!.

Hash-Map! = Record-Type
	doc. "Default Map! type. Depends on efficient `hash-code` of its keys."
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
	map' (Opt->? entry) |be
		be.val!

impl! keys Hash-Map! |_
	buckets = values _.hash->bucket
	flat-map buckets |bucket
		Stream ~|
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
			p! _ "val!" val
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
	freeze _.hash->bucket
	Obj.freeze _

impl! empty! Hash-Map! |_
	empty! _.hash->bucket

impl! empty (self-type Hash-Map!) |
	Hash-Map!
		hash->bucket. empty Identity-Map!

Hash-Map!