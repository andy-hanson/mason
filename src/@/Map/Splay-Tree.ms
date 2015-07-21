use
	...compare _ <?
	...js defined?
	...Object p!
	...Type.Method impl! self-impl!
	...Type.Kind kind! self-kind!
	...Type.Tuple
	...Type.Wrap-Type
	..@ empty! empty? iterator
	..@-Type empty
	.Map assoc! ?get un-assoc!
	.Map-Type
	.Sorted-Map

Splay-Tree. Wrap-Type
	doc. "
		Default Sorted-Map implementation.
		Binary tree that is good at accessing the same values many times.

Splay-Node = Tuple
	props. [ "key" "val!" "left!" "right!"

self-kind! Splay-Tree Map-Type
self-impl! empty Splay-Tree |
	Splay-Tree undefined

impl! iterator Splay-Tree .|
	iter = ~!|_
		if! defined?_
			<~~ iter _.left!
			<~ [ _.key _.val! ]
			<~~ iter _.right!
	iter .val

kind! Splay-Tree Sorted-Map

impl! empty? Splay-Tree .|
	not defined? .val

impl! empty! Splay-Tree .!|
	p! this "val" undefined

impl! ?get Splay-Tree .|key
	if and (not empty? this) (splay!? this key)
		.val.val!

impl! assoc! Splay-Tree .!|key val
	case!
		empty? this
			p! this "val" (Splay-Node key val undefined undefined
		splay!? this key
			p! .val "val!" val
		else
			old-root = .val
			debug forbid! empty? this
			p! this "val" case
				<? old-root.key key
					old-right = old-root.right!
					p! old-root "right!" undefined
					Splay-Node key val old-root old-right
				else
					old-left = old-root.left!
					p! old-root "left!" undefined
					Splay-Node key val old-left old-root

impl! un-assoc! Splay-Tree .|key
	if and (not empty? this) (splay!? this key)
		removed = .val
		# Link out the root.
		p! this "val" case
			has-left? removed
				right = removed.right # OK if null
				new-root = removed.left
				# Splay to make sure the new root has an empty right child.
				splay!? this key
				p! new-root "right!" right
				new-root
			else
				# New tree is just right child - no left child to worry about.
				removed.right
		removed.val

region Implementation
	# Searches for the key, bringing nodes up to the root along the way.
	# Returns whether the root now matches the key.
	splay!? = |_ key
		dummy = Splay-Node undefined undefined undefined undefined
		left ::= dummy
		right ::= dummy
		cur ::= _.val
		# TODO:SYNTAX loop return value
		found ::= null
		for!
			case! compare key cur.key
				<? _ 0
					unless! has-left? cur
						found := false
						break!
					link-right! = !|new-right
						p! right "left!" new-right
						cur := new-right.left!
						right := new-right
					case!
						<? key cur.left!.key
							# Rotate right
							old-left = cur.left!
							p! cur "left!" old-left.right!
							p! old-left "right!" cur
							unless! has-left? old-left
								cur := old-left
								found := false
								break!
							cur := old-left
							link-right! old-left
						else
							link-right! cur
				<? 0 _
					unless! has-right? cur
						found := false
						break!
					link-left! = !|new-left
						p! left "right!" new-left
						cur := new-left.right!
						left := new-left
					case!
						<? cur.right!.key key
							# Rotate left
							tmp = cur.right!
							p! cur "right!" tmp.left!
							p! tmp "left!" cur
							unless! has-right? tmp
								cur := tmp
								found := false
								break!
							link-left! tmp
						else
							link-left! cur
				else
					found := true
					break!

		p! left "right!" cur.left!
		p! right "left!" cur.right!
		p! cur "left!" dummy.right!
		p! cur "right!" dummy.left!
		p! _ "val" cur
		found

	has-left? = |node
		defined? node.left!
	has-right? = |node
		defined? node.right!
