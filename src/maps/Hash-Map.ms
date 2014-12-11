\ TODO: TEST

use
	..assert -> !
	..bags.? -> get-or
	..bags.Array
	..bags.Bag -> count ?first-where flat-map map
	..bags.Seq -> seq=?
	..Bool -> false true
	..Comparable -> =?
	..Comparable! -> <!
	..hash-code
	.Identity-Map!
	..Object
	..Object! -> add-property!
	.Map -> ?get keys values
	.Map! -> delete! set!
	..math.Num -> divisible?
	..methods -> + empty empty? freeze
	..private.bootstrap -> ms
	..Ref -> get mod! ref
	..Try -> oh-no!
	..types.Method -> impl!
	..types.Record-Type
	..types.util -> self-type

Hash-Map = Record-Type
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

?bucket = |:?[Array] _ key
	code = hash-code key
	?get _.hash->bucket code

?bucket-entry = |bucket:Array key
	?first-where bucket |_
		=? key _.key

impl! ?get Hash-Map |:? _ key
	\ TODO: empty Array!
	bucket = get-or (?bucket _ key) `[]`
	map (?bucket-entry bucket key) |be
		be.val

impl! keys Hash-Map |_
	buckets = values _.hash->bucket
	flat-map buckets |bucket
		map bucket |_
			_.key

impl! set! Hash-Map |hm key val
	case! ?bucket hm key
		empty?_
			\ TODO: empty Array!
			new-bucket = `[]`
			\ TODO: push! new-bucket
			k = key
			v = val
			new-bucket.push
				key. k
				val. v
			set! hm.hash->bucket (hash-code key) new-bucket
		else
			\ TODO
			bucket = _.val
			oh-no! "Hash collision for {key} and {bucket[0].key}"
			\ be = ?bucket-entry bucket key
			\ if it's there: set-property! be "val" val

impl! delete! Hash-Map |hm key
	case ?bucket hm key
		empty?_
			false
		else
			! =? count_ 1 \ TODO
			delete! hm.hash->bucket (hash-code key
			true

\ TODO: group-by 2
add-property! ms "map"  |
	hm = empty Hash-Map
	args = `arguments`
	n = args.length
	! divisible? n 2

	i = ref 0
	loop!
		case! get i
			=? _ n
				end-loop!
			else
				set! hm `args[_]` `args[_ + 1]`
				mod! i +[2]

	freeze hm

impl! freeze Hash-Map |_
	freeze _.hash->bucket
	Object.freeze _

<! Hash-Map Map!

impl! empty (self-type Hash-Map) |
	Hash-Map
		hash->bucket. empty Identity-Map!

Hash-Map
