doc. "TODO"

use
	..assert -> ! !call
	..bags.? -> get-or
	..bags.Bag -> each!
	..Bool -> false or true
	..control -> build
	..Comparable -> =?
	..Dict
	..Fun -> apply ignore
	..maps.Map -> keys
	..methods -> empty
	..modules -> promise-all-modules
	..Object -> ?get-property own-properties own-enumerable-properties
	..pred-types -> Any
	..Str
	..Try -> annotate-errors Success try
	..types.Impl-Type
	..types.Interface -> concrete-implementors
	..types.Method -> impl! impl-for
	..types.Type -> contains?
	..types.util -> self-type

\ TODO: move
\ TODO: implement
detect-infinite-loop. |fun
	fun ()

\ TODO
test. |
	! =? [ "x" "y" "b" ] (build |yield
		dict =
			a.
				test.
					x. yield["x"]
					y. yield["y"]
			b. empty Dict
			impl! test-special (self-type b) yield["b"]
			c. () \ not testable
		maybe-test "dict" dict true

\ TODO: Better name (but not `test`, because that's a common module property)
test-special. Method
	doc. "TODO"
	default. ignore

\ TODO: MOVE THESE
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

impl! test-special Interface |_
	(impl-for test-special Impl-Type) _
	each! (?get-property _ "implementor-test") |test:Fun
		each! concrete-implementors_ |implementor
			test-test-fun implementor test "{_}.implementor-test of {implementor}" implementor

\ TODO: empty Set!
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

test-test-prop = |value value-test name \...test-args
	case! value-test
		:Fun
			test-test-fun value value-test name
		else
			()
	case! value-test
		:Dict
			each! keys_ |sub-name
				test-test-prop value _[sub-name] "{name}.{sub-name}"
		else
			()

test-test-fun = |value value-test:Fun name ...args
	annotate-errors "In {name}:\n" |
		\ TODO:ES6 value-test ...args
		got = detect-infinite-loop |
			apply value-test args
		case! got
			:Map
				! (contains? Fun value)
					"Test of {name} returned a Map, but the value is not callable."
				!call value _
			else
				()

test-all. |dir-path:Str
	(promise-all-modules dir-path).then |_:Bag
		each! _ test-module

\ TODO:ES6 Use module reflection
test-module.
	doc. "TODO"
	|module:Object
		module-name = get-or (?get-property module "displayName") "<anonymous module>"
		maybe-test module-name module true
