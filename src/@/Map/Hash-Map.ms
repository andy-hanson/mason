# TODO: TEST
use
	...compare =?
	...hash-code
	...js defined?
	...methods freeze
	...Type.Kind kind! self-kind!
	..@ empty! iterator map
	..@-Type empty
	..? ?None Opt->? ?some
	.Map _ assoc! ?get un-assoc!
	.Map-Type
use~ # TODO: use-debug
	...Type.Type =>
	..Seq.Seq seq=?
	.Map keys

Hash-Map. class
	do!
		self-kind! _ Map-Type
		kind! _ Map

	static
		empty |
			new this (new global.Map)

	# TODO: `data val:Id-Map`
	construct! val
		.val = val

	iterator ~!|
		for! bucket in .val.values()
			cur ::= bucket
			for!
				unless! defined? cur
					break!
				<~ [ cur.key cur.val! ]
				cur := cur.next!

	?get |key
		bucket = .val.get (hash-code key)
		entry = opt-bucket-entry bucket key
		map (Opt->? entry) |_
			_.val!

	assoc! !|key val
		hash = hash-code key
		bucket = .val.get hash
		case! opt-bucket-entry bucket key
			defined?_
				# TODO: Might not want to overwrite value...
				_.val! := val
			else
				# Add it at the front.
				.val.set hash (new Bucket key val bucket

	un-assoc! |key
		hash = hash-code key
		bucket = .val.get hash
		case bucket
			defined?_
				case
					=? _.key key
						case! bucket.next!
							defined?_
								.val.set key _
							else
								.val.delete hash
						?some _.val!
					else
						cur ::= bucket
						for
							next = cur.next!
							unless! defined? next
								break ?None
							if! =? next.key key
								cur.next! := next.next!
								break ?some next.val!
							cur := next
			else
				?None

	freeze !|
		freeze .val
		Object.freeze this

	empty! !|
		.val.clear()

	# TODO: class attributes
	# doc. "Default Map type. Depends on efficient `hash-code` of its keys."
	# TODO: Remove, just use Map.implementor-test.

# TODO: class attributes
Hash-Map.test = !|
	_ = => Hash-Map
		1 -> 2
		3 -> 4
	assert! =? _[1] 2
	assert! =? _[3] 4
	assert! seq=? _
		. [ 1 2
		. [ 3 4
	assert! seq=? keys_ [ 1 3 ]
	assert! =? ?None (?get _ 8)

region Private
	Bucket = class
		# TODO: `data key val! next!`
		construct! key val! next!
			.key = key
			.val! ::= val!
			.next! ::= next!

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
