doc. "TODO"

use
	..assert -> ! !call
	..bags.? -> get-or un-?
	..bags.Bag -> each!
	..Bool -> and false not or true
	..Comparable -> =?
	..console -> log!
	..Dict
	..Fun -> call ignore
	..js -> global
	..maps.Identity-Map!
	..maps.Map -> ?get keys
	..modules -> promise-all-modules
	..Object -> ?get-property get-property has-property? own-properties own-enumerable-properties
	..pred-types -> Any
	..Str
	..Try -> annotate-errors oh-no! Success try
	..types.Impl-Type
	..types.Method -> impl! ?impl-for
	..types.Type -> subsumes?
	..types.util -> self-type

\ TODO
test. |
	tested-x ::= false
	tested-y ::= false
	tested-b ::= false
	dict =
		a.
			test.
				x. |
					tested-x := true
				y. |
					tested-y := true
		b. `{}` \ TODO: empty Dict
		impl! test-special (self-type b) |
			tested-b := true
		c. () \ not testable
	maybe-test "dict" dict true
	! tested-x
	! tested-y
	! tested-b

\ TODO: Better name (but not `test`, because that's a common module property)
test-special. Method
	doc. "TODO"
	default. ignore

impl! test-special Impl-Type |type
	each! (?get-property type "prototype") |prototype
		each! (own-properties prototype) |name
			\ Some prototype properties throw errors. For example, global.Map.size.
			\ TODO: Inline fun
			x = try |
				?get-property prototype name
			case x
				:Success
					each! _.val |val
						maybe-test "{type}#{name}" val false
				else
					()

\ TODO: empty Grow-Set!
all-tested. `new global.Set()`

\ TODO: Better name
maybe-test. |name:Str value:Any is-module:Bool
	case!
		all-tested.has value
			()
		else
			all-tested.add value
			test-special value
			case! value
				\ TODO: variadic `or`
				or is-module ~(or :Dict ~:Fun)
					each! own-enumerable-properties_ |prop-name
						next-name = "{name}.{prop-name}"
						each! (?get-property _ prop-name) |prop-val
							case! prop-name
								=? _ "test"
									test-test-prop value prop-val next-name
								else
									maybe-test next-name prop-val false
				else
					()

test-test-prop = |value value-test name
	case value-test
		:Fun
			annotate-errors "In {name}:\n" |
				case! call value-test
					:Map
						! (subsumes? Fun value)
							"Test of {name} returned a Map, but the value is not callable."
						!call value _
					else
						()
		else
			()
	case! value-test
		:Dict
			each! keys_ |sub-name
				test-test-prop value _[sub-name] "{name}.{sub-name}"
		else
			()


test-all. |dir-path:Str
	p = (promise-all-modules dir-path).then |_
		each! _ test-module
	p.done ()

\ TODO:ES6 Use module reflection
test-module.
	doc. "TODO"
	|module
		module-name = get-or (?get-property module "displayName") "<anonymous module>"
		maybe-test module-name module true
