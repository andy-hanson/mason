use
	..Bool -> or true
	..Comparable! -> <!
	..js -> defined? global js-sub reference=?
	..private.bootstrap -> Str Array Obj Symbol set!
	.Method -> impl! propagate-method-down!
	..methods -> contains?
	.Record-Type
use~
	..! -> !not
	..@ -> any? flat-map
	..Comparable -> =? <?
	.Impl-Type
	..maps.Map -> each-pair!

Interface = Record-Type
	doc. "
		An Interface is like a tag you can apply to a Concrete-Type to signify that it belongs in some category.
		That category is typically a group of types all of which implement the same set of methods.
		Type checking for interface membership is O(1).
		-
		The `prototype` on an Interface is not meant to be used as a prototype.
		It stores the impl!_s that have been done on the interface.
		impl! and implementor! make sure that Concrete-Types receive the methods of their interfaces.
		They require the interface to correctly track super-interfaces and implementors.

	test. |
		region Inheritance chans - one way
			A = Interface
				doc. "A"
			B = Interface
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
			X = Interface
				doc. "X"
			Y = Interface
				doc. "Y"
			Z = Record-Type
				members.
					x.
			<! Z Y
			<! Y X
			z = Z
				x. 1
			! contains? X z

		region Method makes sure to do impl! on all Concrete-Type_s inheriting from an Interface.
			asdf = Method
				doc. "asdf_s its arguments."
			impl! asdf X |
				1
			! =? (asdf z) 1
			! contains? X z
	members.
		displayName. Str
		super-interfaces. Array \ TODO: [~Interface]
		prototype. Obj
		implementors. Array \ TODO: [~Impl-Type]
		symbol-for-isa. Symbol
	extensible.
	defaults.
		super-interfaces. |
			global.Array 0
		prototype. |
			Obj.create ()
		implementors. |
			global.Array 0
		symbol-for-isa. |_
			name:Str = _.displayName
			Symbol "isa-{name}"
	post-construct. |iface
		set! iface.prototype iface.symbol-for-isa true

\ Making something an instance of Impl-Type is difficult because implementor! checks that it's already an Impl-Type...
unchecked-implementor!.
	doc. "TODO"
	|implementor interface
		interface.implementors.push implementor
		case! implementor
			:Interface
				_.super-interfaces.push interface
			else
				()
		inherit-methods! implementor interface

own-properties = |_
	(Obj.getOwnPropertyNames _).concat (Obj.getOwnPropertySymbols _)

inherit-methods! = |implementor interface
	(own-properties interface.prototype).forEach |name
		\ TODO: use getp
		propagate-method-down! implementor name (js-sub interface.prototype name)
	interface.super-interfaces.forEach |_
		inherit-methods! implementor _

\ TODO: Assert no circular chains of implementor!.
\ Typically one would use `<!`.
implementor!.
	doc. "TODO"
	\ TODO: implementor:Impl-Type
	|implementor interface:Interface method-impls
		unchecked-implementor! implementor interface
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
		A = Interface
			doc. "A"
		B = Interface
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
	|implementor:Impl-Type interface:Interface
		case implementor
			:Record-Type
				contains? interface implementor.prototype
			:Interface
				any? _.super-interfaces |super
					\ TODO: Just use `=? super interface` ?
					or (reference=? super interface) ~(implementor? super interface)

\ TODO: Use Stream
concrete-implementors.
	doc. "TODO"
	test. |
		X = Interface
			doc. "X"
		Y = Interface
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
		[ X ] -> [ W Z ]
	|:@ interface:Interface
		flat-map interface.implementors |case
			:Interface
				concrete-implementors_
			else
				[ _ ]

Interface
