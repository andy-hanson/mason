\ TODO: TEST

use
	..assert -> !
	..arithmetic-methods -> +
	..bags.? -> ?none get-or
	..bags.Array
	..bags.Bag -> empty? ?first-where flat-map map
	..bags.Seq -> seq=?
	..basic-methods -> freeze
	..Comparable -> =?
	..hash-code
	.Identity-Map!
	..js -> new
	..Object -> add-property!
	.Map -> ?get keys values
	.Map! -> set!
	..math.Num -> divisible?
	..pred-types -> Any
	..private.ms
	..Ref -> get mod! ref
	..Try -> oh-no!
	..types.Interface -> implementor!
	..types.Method -> impl!
	..types.Record-Type

Hash-Map = Record-Type
	doc. "TODO"
	\ TODO: impl! empty Hash-Map
	new-empty. |
		Hash-Map
			hash->bucket. new Identity-Map!
	test. |
		_ =
			1 -> 2
			3 -> 4
		! =? _[1] 2
		! =? _[3] 4
		! seq=? keys_ [ 1 3 ]
		! =? (?get _ 8) ?none

	members.
		hash->bucket. Identity-Map!

?bucket = |:?[Array] _ key:Any
	code = hash-code key
	?get _.hash->bucket code

?bucket-entry = |bucket:Array key:Any
	?first-where bucket |_
		=? key _.key

impl! ?get Hash-Map |:? _ key:Any
	\ TODO: empty Array!
	bucket = get-or (?bucket _ key) `[]`
	map (?bucket-entry bucket key) |be
		be.val

impl! keys Hash-Map |_
	buckets = values _.hash->bucket
	flat-map buckets |bucket
		map bucket |_
			_.key

impl! set! Hash-Map |hm key:Any val:Any
	case! ?bucket hm key
		empty?_
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

\ TODO: group-by 2
add-property! ms "map"  |
	hm = Hash-Map.new-empty ()
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

implementor! Hash-Map Map!

Hash-Map
