doc. "TODO"

use
	..assert -> ! !call
	..bags.? -> get-or un-?
	..bags.Bag -> each!
	..Bool -> and false not or true
	..Comparable -> =?
	..console -> log!
	..Dict
	..Error -> annotate-errors oh-no! Success try
	..Fun -> call ignore
	..js -> global
	..maps.Identity-Map!
	..maps.Map -> ?get keys
	..Object -> ?get-property get-property has-property? own-properties own-enumerable-properties
	path
	..pred-types -> Any
	q-io.fs
	..Str
	..types.Impl-Type
	..types.Method -> impl! ?impl-for
	..types.Type -> subsumes?
	..types.util -> self-type

\ TODO
test-dict. |
	tested-x ::= false
	tested-y ::= false
	tested-b ::= false
	a.
		test.
			x. |
				tested-x := true
			y. |
				tested-y := true
	b. `{}`
	impl! (self-type b) test-special |
		tested-b := true
	c. |
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
						maybe-test "{type}.{name}" val
				else
					()

\ TODO: empty Grow-Set!
all-tested. `new global.Set()`

\ TODO:ES6 Use module reflection
test-module.
	doc. "TODO"
	|module
		module-name = get-or (?get-property module "displayName") "Anonymous module"
		maybe-test module-name module
		each! (own-enumerable-properties module) |name
			each! (?get-property module name) |_
				maybe-test name _

maybe-test. |name:Str value:Any
	\log! "Do I already have {value}?"
	case!
		all-tested.has value
			()
		else
			all-tested.add value
			test-special value
			case! value
				or :Dict :Fun
					each! own-enumerable-properties_ |prop-name
						next-name = "{name}.{prop-name}"
						each! (?get-property _ prop-name) |prop-val
							case! prop-name
								=? _ "test"
									test-test-prop value prop-val next-name
								else
									maybe-test next-name prop-val
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


test-all. |dirPath:Str
	x = (fs.listTree dirPath).then |files
		each! files |file
			case! file
				_.endsWith ".js"
					\ TODO:ES6 Don't use "require"
					p = "./{path.relative `__dirname` _}"
					annotate-errors ~"Testing {file}:\n" |
						test-module (`require` p)
				else
					()
	x.done ()
