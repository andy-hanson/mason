use
	...Boolean and not
	...compare _ <?
	...js defined?
	...Object! p!
	...Type.Js-Method js-impl!
	...Type.Kind kind! self-kind!
	...Type.Tuple
	...Type.Wrap-Type
	..@ empty? iterator
	..@! empty!
	..@-Type empty
	.Map ?get
	.Map! assoc! un-assoc!
	.Map-Type
	.Sorted-Map!
use-debug
	...! !not

Splay-Tree!. Wrap-Type
	doc. "
		Default Sorted-Map! implementation.
		Binary tree that is good at accessing the same values many times.

Splay-Node = Tuple
	props. [ "key" "val!" "left!" "right!"

self-kind! Splay-Tree! Map-Type
	empty -> |
		Splay-Tree! undefined

js-impl! iterator Splay-Tree! |
	iter = ~!|_
		if! defined?_
			<~~ iter _.left!
			<~ [ _.key _.val! ]
			<~~ iter _.right!
	iter this.val

kind! Splay-Tree! Sorted-Map!
	empty? -> |_
		not (defined? _.val
	empty! -> !|_
		p! _ "val" undefined
	?get -> |_ key
		if and (not empty?_) ~(splay!? _ key)
			_.val.val!
	assoc! -> !|_ key val
		case!
			empty?_
				p! _ "val" (Splay-Node key val undefined undefined
			splay!? _ key
				p! _.val "val!" val
			else
				old-root = _.val
				debug !not empty? _
				p! _ "val" case
					<? old-root.key key
						old-right = old-root.right!
						p! old-root "right!" undefined
						Splay-Node key val old-root old-right
					else
						old-left = old-root.left!
						p! old-root "left!" undefined
						Splay-Node key val old-left old-root
	un-assoc! -> |_ key
		if and (not empty?_) ~(splay!? _ key)
			removed = _.val
			# Link out the root.
			p! _ "val" case
				has-left? removed
					right = removed.right # OK if null
					new-root = removed.left
					# Splay to make sure the new root has an empty right child.
					splay!? _ key
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
