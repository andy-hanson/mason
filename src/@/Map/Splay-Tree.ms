import
	...compare _ <?
	...js defined?
	...Type.Kind kind!
	..@ empty! empty? iterator
	..@-Type empty
	.Map assoc! ?get un-assoc!
	.Sorted-Map

Splay-Tree. class
	| Default Sorted-Map implementation.
	| Binary tree that is good at accessing the same values many times.

	do!
		kind! _ Sorted-Map

	static
		empty |
			new this

	construct! .root:Splay-Node
		pass

	iterator |
		node-iter = ~!|_
			if! defined?_
				<~~ node-iter _.left!
				<~ [_.key _.val!]
				<~~ node-iter _.right!
		node-iter .root

	empty? |
		not defined? .root

	empty! !|
		.root := undefined

	?get |key
		if and (not empty? this) (splay!? this key)
			.root.val!


	assoc! !|key val
		case!
			empty? this
				.root := new Splay-Node key val undefined undefined
			splay!? this key
				.root.val! := val
			else
				old-root = .val
				forbid! empty? this
				.root := case
					<? old-root.key key
						old-right = old-root.right!
						old-root.right! := undefined
						new Splay-Node key val old-root old-right
					else
						old-left = old-root.left!
						old-root.left! := undefined
						new Splay-Node key val old-left old-root


	un-assoc! |key
		if and (not empty? this) (splay!? this key)
			removed = .root
			|| Link out the root.
			.root := case
				has-left? removed
					right = removed.right || OK if null
					new-root = removed.left
					|| Splay to make sure the new root has an empty right child.
					splay!? this key
					new-root.right! := right
					new-root
				else
					|| New tree is just right child - no left child to worry about.
					removed.right

			removed.val!

region Private
	Splay-Node = class
		construct! .key val! left! right!
			.val! ::= val!
			.left! ::= left!
			.right! ::= right!

	|| Searches for the key, bringing nodes up to the root along the way.
	|| Returns whether the root now matches the key.
	splay!? = |_ key
		dummy = new Splay-Node undefined undefined undefined undefined
		left ::= dummy
		right ::= dummy
		cur ::= _.root
		todo SYNTAX loop return value
		found ::= null
		for!
			case! compare key cur.key
				<? _ 0
					unless! has-left? cur
						found := false
						break!
					link-right! = !|new-right
						right.left! := new-right
						cur := new-right.left!
						right := new-right
					case!
						<? key cur.left!.key
							|| Rotate right
							old-left = cur.left!
							cur.left! := old-left.right!
							old-left.right! := cur
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
						left.right! := new-left
						cur := new-left.right!
						left := new-left
					case!
						<? cur.right!.key key
							|| Rotate left
							tmp = cur.right!
							cur.right! := tmp.left!
							tmp.left! := cur
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

		left.right! := cur.left!
		right.left! := cur.right!
		cur.left! := dummy.right!
		cur.right! := dummy.left!
		_.root := cur
		found

	has-left? = |node
		defined? node.left!

	has-right? = |node
		defined? node.right!
