
use
	..assert -> ! !=
<<<<<<< HEAD
	..bags.Bag -> each!
	..Fun
	.Impl-Type
	..maps.Map -> keys-values
	.Method -> impl!
	..pred-types -> Nullable
=======
	.Method -> impl!
>>>>>>> 9ddb097... Added missing files
	..private.bootstrap -> Str Array Object Symbol true set! get has-or-in-proto? set-mutable! oh-no! own-properties
	.Record-Type
	.Type -> subsumes?

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
			implementor! B A
			implementor! C B
			c = C
				c. 1
			a:A = c

		region Inheritance chains
			X = Interface
				doc. "X"
			Y = Interface
				doc. "Y"
			Z = Record-Type
				members.
					x.
			implementor! Z Y
			implementor! Y X
			z = Z
				x. 1
			x:X = z

		region Method makes sure to do impl! on all Concrete-Type_s inheriting from an Interface.
			asdf. Method
				doc. "asdf_s its arguments."
			impl! asdf X |
				1
			!= (asdf z) 1
			! (subsumes? X z)

	members.
		displayName. Str
		super-interfaces. Array \ TODO: [~Interface]
		prototype. Object
		methods. Array
		implementors. Array \ TODO: [~Impl-Type]
		symbol-for-isa. Symbol
	defaults.
		super-interfaces. |
			`[]`
		prototype. |_
			Object.create Object.prototype
		methods. |
			`[]`
		implementors. |
			`[]`
		symbol-for-isa. |_
			Symbol "isa-{_.displayName}"
	post-construct. |iface
		set! iface.prototype iface.symbol-for-isa true
		case! iface.super
			:Interface
				unchecked-implementor! iface _
			else
				()
	extensible. true

\ Making something an instance of Impl-Type is difficult because implementor! checks that it's already an Impl-Type...
unchecked-implementor!.
	doc. "TODO"
	|implementor interface
		interface.implementors.push implementor
		\get-methods-from-above! implementor interface
		case! implementor
			:Interface
				_.super-interfaces.push interface
			else
				()
		propagate-methods-down! implementor interface

propagate-methods-down! = |implementor interface
	case implementor
		:Interface
			\ TODO: each!
			_.implementors.forEach |itor
				propagate-methods-down! itor interface
		else
			get-methods-from-above! _ interface

\ implementor:Concrete-Type super:Interface
\ super is any interface in a chain of interfaces above implementor.
get-methods-from-above! = |implementor super
	(own-properties super.prototype).forEach |name
		case!
			has-or-in-proto? implementor.prototype name
				() \ Respect overrides
			else
				\ Since this is inherited, it is mutable and can be overridden.
				set-mutable! implementor.prototype name (get super.prototype name)
	super.super-interfaces.forEach |super-super
		get-methods-from-above! implementor super-super

implementor!.
	doc. "TODO"
<<<<<<< HEAD
	\ TODO: implementor:Impl-Type
	|implementor interface:Interface method-impls
		unchecked-implementor! implementor interface
		case! method-impls
			`_ == null`
				()
			else
				mi:Map = method-impls
				each! (keys-values mi) |_
					key:Method val:Fun = _
					impl! key implementor val
=======
	|implementor interface:Interface
		unchecked-implementor! implementor interface
>>>>>>> 9ddb097... Added missing files


Interface
