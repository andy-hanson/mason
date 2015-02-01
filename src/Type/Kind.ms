use
	..Bool or true
	..js defined? global js-sub reference=?
	..private.bootstrap Str Array Obj Symbol set!
	.Method impl! propagate-method-down!
	..methods contains?
	.Record-Type
use~
	..@ _ any? flat-map
	..Map each-pair!
	.Impl-Type
debug use~
	..@.Stream
	..! _ !not
	..Comparable =? <?
	..Comparable! <!
	..methods =>
	.Method

Kind = Record-Type
	doc. "
		A Kind is like a tag you can apply to a Concrete-Type to signify that it belongs in some category.
		That category is typically a group of types all of which implement the same set of methods.
		Type checking for Kind membership is O(1).
		-
		The `prototype` on a Kind is not meant to be used as a prototype.
		It stores the impl!_s that have been done on the Kind0.
		impl! and implementor! make sure that Concrete-Types receive the methods of their kinds.
		They require the Kind to correctly track super-kinds and implementors.

	test. |
		region Inheritance chans - one way
			A = Kind
				doc. "A"
			B = Kind
				doc. "B"
			C = Record-Type
				members.
					c.
			<! B A
			<! C B
			c = C
				c. 1
			! contains? A c

		region Inheritance chains
			X = Kind
				doc. "X"
			Y = Kind
				doc. "Y"
			Z = Record-Type
				members.
					x.
			<! Z Y
			<! Y X
			z = Z
				x. 1
			! contains? X z

		region Method makes sure to do impl! on all Concrete-Type_s inheriting from an Kind.
			asdf = Method
				doc. "asdf_s its arguments."
			impl! asdf X |
				1
			! =? (asdf z) 1
			! contains? X z
	members.
		displayName. Str
		~super-kinds. Array \ TODO: [~Kind]
		prototype. Obj
		implementors. Array \ TODO: [~Impl-Type]
		symbol-for-isa. Symbol
	extensible.
	defaults.
		super-kinds. |
			global.Array 0
		prototype. |
			Obj.create ()
		implementors. |
			global.Array 0
		symbol-for-isa. |_
			name:Str = _.displayName
			Symbol "isa-{name}"
	post-construct. |_
		set! _.prototype _.symbol-for-isa true

\ Making something an instance of Impl-Type is difficult because implementor! checks that it's already an Impl-Type...
unchecked-implementor!.
	doc. "TODO"
	|implementor kind
		kind.implementors.push implementor
		case! implementor
			:Kind
				_.super-kinds.push kind
			else
				()
		inherit-methods! implementor kind

own-properties = |_
	(Obj.getOwnPropertyNames _).concat (Obj.getOwnPropertySymbols _)

inherit-methods! = |implementor kind
	rec! = |kind
		(own-properties kind.prototype).forEach |name
			\ TODO: use getp
			propagate-method-down! implementor name (js-sub kind.prototype name)
		kind.super-kinds.forEach rec!
	rec! kind

\ TODO: Assert no circular chains of implementor!.
\ Typically one would use `<!`.
implementor!.
	doc. "TODO"
	\ TODO: implementor:Impl-Type
	|implementor kind:Kind method-impls
		unchecked-implementor! implementor kind
		case! method-impls
			defined?_
				each-pair! _ |method implementation
					impl! method implementor implementation
			else
				()

\ Typically one would use `<?`.
implementor?.
	doc. "TODO"
	test. |
		A = Kind
			doc. "A"
		B = Kind
			doc. "B"
		C = Record-Type
			members.
				c.
		<! B A
		<! C B
		! <? B A
		! <? C B
		! <? C A
		!not <? A B
	|implementor:Impl-Type kind:Kind
		case implementor
			:Record-Type
				contains? kind implementor.prototype
			:Kind
				any? _.super-kinds |super
					\ TODO: Just use `=? super kind` ?
					or (reference=? super kind) ~(implementor? super kind)

\ TODO: Use Stream
concrete-implementors.
	doc. "TODO"
	test. |
		X = Kind
			doc. "X"
		Y = Kind
			doc. "Y"
		Z = Record-Type
			members.
				z.
		W = Record-Type
			members.
				w.
		implementor! Y X
		implementor! Z X
		implementor! W Y
		[ X ] -> => Stream [ W Z ]
	|:@ kind:Kind
		flat-map kind.implementors |case
			:Kind
				concrete-implementors_
			else
				[ _ ]

Kind
