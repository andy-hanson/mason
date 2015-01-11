use
	..assert -> ! !not
	..bags.Stream -> streaming
	..Bool -> and false not true
	..Comparable -> <? >?
	..Comparable! -> <!
	..control -> if
	..js -> defined?
	.Map -> ?get keys
	.Map! -> assoc! un-assoc!
	..methods -> contains? empty empty? empty!
	..Object! -> change-property!
	..Ref! -> get ref set!
	.Sorted-Map!
	..types.Method -> impl!
	..types.Record-Type
	..types.util -> self-type

Node = Record-Type
	members.
		key.
		val!.
		left!.
		right!.

Splay-Tree! = Record-Type
	doc. "TODO"
	members.
		root!.

\ TODO: Map-Type
impl! empty (self-type Splay-Tree!) |
	Splay-Tree!
		root!. undefined

has-left? = |node
	defined? node.left!

has-right? = |node
	defined? node.right!

\ Returns whether the root now matches the key.
splay! = |:Bool _ key
	in
		!not empty? _

	dummy = Node
		key. undefined
		val!. undefined
		left!. undefined
		right!. undefined
	left = ref dummy
	right = ref dummy
	cur = ref _.root!
	\ TODO:SYNTAX Loop return falue
	ref-found = ref false
	loop!
		cur':Node left':Node right':Node found = splay-step! (get cur) key (get left) (get right)
		set! cur cur'
		set! left left'
		set! right right'
		case! found
			:Bool
				set! ref-found _
				end-loop!
			else
				()

	final-left = get left
	final-right = get right
	final-cur = get cur
	change-property! final-left "right!" final-cur.left!
	change-property! final-right "left!" final-cur.right!
	change-property! final-cur "left!" dummy.right!
	change-property! final-cur "right!" dummy.left!
	change-property! _ "root!" final-cur
	get ref-found

splay-step! = |cur:Node key left:Node right:Node
	case
		<? key cur.key
			case
				has-left? cur
					link-right = |new-cur
						change-property! right "left!" new-cur
						cur'. new-cur.left!
						left'. left
						right'. new-cur
					case
						<? key cur.left!.key
							\ Rotate right
							tmp = cur.left!
							change-property! cur "left!" tmp.right!
							change-property! tmp "right!" cur
							case
								has-left? tmp
									link-right tmp
								else
									found. false
									cur'. tmp
									left'. left
									right'. right
						else
							link-right cur
				else
					found. false
					cur'. cur
					left'. left
					right'. right

		>? key cur.key
			case
				has-right? cur
					link-left = |new-cur
						change-property! left "right!" new-cur
						cur'. new-cur.right!
						left'. new-cur
						right'. right
					case
						>? key cur.right!.key
							\ Rotate left
							tmp = cur.right!
							change-property! cur "right!" tmp.left!
							change-property! tmp "left!" cur
							case
								has-right? tmp
									link-left tmp
								else
									found. false
									cur'. tmp
									left'. left
									right'. right
						else
							link-left cur
				else
					found. false
					cur'. cur
					left'. left
					right'. right
		else
			found. true
			cur'. cur
			left'. left
			right'. right

<! Splay-Tree! Sorted-Map!
	empty? -> |_
		not (defined? _.root!
	empty! -> |_
		change-property! _ "root!" undefined
	?get -> |_ key
		if (and (not empty?_) ~(splay! _ key)) |
			_.root!.val!

	keys -> |_
		streaming ~|
			get~ = ~|case!
				defined?_
					<~~ get~ _.left!
					<~ _.key
					<~~ get~ _.right!
				else
					()
			<~~ get~ _.root!

	assoc! -> |_ k v
		case!
			empty?_
				change-property! _ "root!" (Node
					key. k
					val!. v
					left!. undefined
					right!. undefined
			splay! _ k
				change-property! _.root! "val!" v
			else
				old-root = _.root!
				!not empty? _
				! contains? Node old-root
				change-property! _ "root!" case
					>? k old-root.key
						old-right = old-root.right!
						change-property! old-root "right!" undefined
						Node
							key. k
							val!. v
							left!. old-root
							right!. old-right
					else
						old-left = old-root.left!
						change-property! old-root "left!" undefined
						Node
							key. k
							val!. v
							left!. old-left
							right!. old-root

	un-assoc! -> |_ key

		if (and (not empty?_) ~(splay! _ key)) |
			removed = _.root
			\ Link out the root.
			change-property! _ "root!" case
				has-left? removed
					right = removed.right \ OK if null
					new-root = removed.left
					\ Splay to make sure the new root has an empty right child.
					splay! _ key
					change-property! new-root "right!" right
					new-root
				else
					\ New tree is just right child - no left child to worry about.
					removed.right

			removed.val


Splay-Tree!
