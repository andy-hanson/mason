use
	...Bool _ and not
	...compare <?
	...control if loop End-Loop
	...js defined?
	...Obj! p!
	...Type.Kind kind! self-kind!
	...Type.Obj-Type
	...@ empty?
	..@! empty!
	..@-Type empty
	..Stream
	..Map ?get keys
	.Map! assoc! un-assoc!
	.Map-Type
	.Sorted-Map!
use-debug
	...! _ !not
	...compare =?

Splay-Tree! = Obj-Type
	doc. "
		Default Sorted-Map! implementation.
		Binary tree that is good at accessing the same values many times.
	props.
		root!.

self-kind! Splay-Tree! Map-Type
	empty -> |
		Splay-Tree!
			root!. undefined

kind! Splay-Tree! Sorted-Map!
	empty? -> |_
		not (defined? _.root!
	empty! -> |_
		p! _ "root!" undefined
	?get -> |_ key
		if (and (not empty?_) ~(splay!? _ key)) ~_.root!.val!
	keys -> |_
		Stream ~|
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
				p! _ "root!" (key. k val!. v left!. undefined right!. undefined
			splay!? _ k
				p! _.root! "val!" v
			else
				old-root = _.root!
				debug !not empty? _
				p! _ "root!" case
					<? old-root.key k
						old-right = old-root.right!
						p! old-root "right!" undefined
						(key. k val!. v left!. old-root right!. old-right
					else
						old-left = old-root.left!
						p! old-root "left!" undefined
						(key. k val!. v left!. old-left right!. old-root
	un-assoc! -> |_ key
		if (and (not empty?_) ~(splay!? _ key)) ~
			removed = _.root!
			# Link out the root.
			p! _ "root!" case
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
	splay!? = |:Bool _ key
		in
			!not empty? _

		dummy = left!. undefined right!. undefined
		start = left. dummy right. dummy cur. _.root!
		left right cur found = loop start splay-step![key]
		p! left "right!" cur.left!
		p! right "left!" cur.right!
		p! cur "left!" dummy.right!
		p! cur "right!" dummy.left!
		p! _ "root!" cur
		found

	splay-step! = |key _
		not-found = |end
			End-Loop (found. false cur. end left. _.left right. _.right
		case
			<? key _.cur.key
				case
					has-left? _.cur
						link-right = |new-cur
							p! _.right "left!" new-cur
							(cur. new-cur.left! left. _.left right. new-cur
						case
							<? key _.cur.left!.key
								# Rotate right
								tmp = _.cur.left!
								p! _.cur "left!" tmp.right!
								p! tmp "right!" _.cur
								case
									has-left? tmp
										link-right tmp
									else
										not-found tmp
							else
								link-right _.cur
					else
						not-found _.cur

			<? _.cur.key key
				case
					has-right? _.cur
						link-left = |new-cur
							p! _.left "right!" new-cur
							(cur. new-cur.right! left. new-cur right. _.right
						case
							<? _.cur.right!.key key
								# Rotate left
								tmp = _.cur.right!
								p! _.cur "right!" tmp.left!
								p! tmp "left!" _.cur
								case
									has-right? tmp
										link-left tmp
									else
										not-found tmp
							else
								link-left _.cur
					else
						not-found _.cur
			else
				debug ! =? key _.cur.key
				End-Loop (found. true cur. _.cur left. _.left right. _.right

	has-left? = |node
		defined? node.left!
	has-right? = |node
		defined? node.right!


Splay-Tree!
