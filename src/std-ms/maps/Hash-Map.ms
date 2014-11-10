\ TODO: TEST

use
	..assert -> ! !=
	..arithmetic-methods -> +
	..bags.? -> ?none get-or
	..bags.Array -> ->Array
	..bags.Bag -> ?first-where count empty? flat-map map
	..basic-methods -> freeze
	..Bool -> not
	..Comparable -> =?
	..Error -> oh-no!
	..hash-code
	.Identity-Map!
	..js -> global new
	..Object -> get-property add-property!
	.Map -> ?get keys values
	.Map! -> set!
	..math.Num -> even?
	..pred-types -> Any
	..types.Interface -> implementor!
	..types.Method -> impl!
	..types.Record-Type

\ TODO (long term): could be more efficient.

Hash-Map = Record-Type
	doc. "TODO"
	\ TODO: `new-empty` method
	new-empty. |
		Hash-Map
			hash->bucket. new Identity-Map!
	test. |
		_ =
			1 -> 2
			3 -> 4
		!= _[1] 2
		!= _[3] 4
		!= (->Array keys_) (Array.of 1 3)
		!= (?get _ 8) ?none

	members.
		hash->bucket. Identity-Map!

?bucket = |:?[Array] _ key:Any
	code = hash-code key
	?get _.hash->bucket code

?bucket-entry = |bucket:Array key:Any
	?first-where bucket |_
		=? key _.key

impl! ?get Hash-Map |:? _ key:Any
	\ TODO: Array!.empty
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
			oh-no! "Hash collision for {key} and {`bucket[0].key`}"
			\ be = ?bucket-entry bucket key
			\ if it's there: set-property! be "val" val

add-property! (get-property global "_ms") "map"  |
	hm = Hash-Map.new-empty ()
	i ::= 0
	args = `arguments`
	n-args = args.length

	! (even? n-args)

	loop!
		case!
			=? i n-args
				end-loop!
			else
				set! hm `args[i]` `args[i + 1]`
				i := + i 2

	freeze hm

impl! freeze Hash-Map |_
	freeze _.hash->bucket
	Object.freeze _

implementor! Hash-Map Map!

Hash-Map
