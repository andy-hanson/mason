doc. "TODO"

use
	..$ -> $after $all $resolved
	..assert -> ! !call
	..bags.? -> get-or
	..bags.Bag -> each! flat-map map
	..bags.Identity-Set!
	..Bool -> and false or true
	..control -> build if
	..Comparable -> =?
	..Dict
	..Fun -> apply ignore
	..maps.Map
	..methods -> + contains? empty
	..modules -> $all-modules
	..Object -> ?get-property get-property has-property? own-properties own-enumerable-properties
	..Str
	..Try -> annotate-errors oh-no! Success try
	..types.Impl-Type
	..types.Interface -> concrete-implementors
	..types.Method -> impl! impl-for
	..types.util -> self-type

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
		$maybe-test "dict" dict true

\ TODO: Better name (but not `test`, because that's a common module property)
test-special. Method
	doc. "
		May return a $. TODO:ETC.
	default. ignore

\ TODO: MOVE THESE
impl! test-special Impl-Type |type
	$all (flat-map (?get-property type "prototype") |prototype
		map (own-properties prototype) |name
			\ Some prototype properties throw errors. For example, global.Map.size.
			\ TODO:SYNTAX Inline fun
			x = try |
				?get-property prototype name
			case x
				:Success
					each! _.val |val
						$maybe-test "{type}#{name}" val false
				else
					()

\ TODO: MOVE THESE
impl! test-special Interface |_
	a = any->$ ((impl-for test-special Impl-Type) _
	b = flat-map (?get-property _ "implementor-test") |test:Fun
		map concrete-implementors_ |implementor
			$test-test-fun implementor test "{_}.implementor-test of {implementor}" implementor
	+ a b


$test-all. |dir-path:Str
	$after ($all-modules dir-path) |_
		$all (flat-map _ $test-module)

\ TODO:ES6 Use module reflection
$test-module.
	doc. "TODO"
	|module:Object
		module-name = get-or (?get-property module "displayName") "<anonymous module>"
		$maybe-test module-name module true

all-tested = empty Identity-Set!

\ TODO: Better name
$maybe-test. |:Bag[$] name:Str value is-module:Bool
	case
		all-tested.has value
			[ ($resolved ()) ]
		else
			all-tested.add value
			a = test-special value
			b = case value
				\ TODO: variadic `or`
				or is-module ~(or :Dict ~:Fun)
					flat-map own-enumerable-properties_ |prop-name
						next-name = "{name}.{prop-name}"
						prop-val = get-property _ prop-name
						case prop-name
							=? _ "test"
								$test-test-prop value prop-val next-name
							else
								$maybe-test next-name prop-val false
				and :Object ~(has-property? _ "test")
					$test-test-prop _ (get-property _ "test") "{name}.test"
				else
					[]

			+ (any->$ a) b

$test-test-prop = |:Bag[$] value value-test name \TODO: ...test-args
	\ Could be both Fun and Dict
	_ = value-test
	a = if :Fun |
		$test-test-fun value value-test name
	b = case
		:Dict
			\ TODO: flat-map pairs_ ?
			flat-map own-enumerable-properties_ |sub-name
				$test-test-prop value _[sub-name] "{name}.{sub-name}"
		else
			[]

	+ a b

$test-test-fun = |:$ value value-test:Fun name ...args
	a = annotate-errors ~"{name}: " |
		apply value-test args
	case a
		:Map
			! (contains? Fun value) ~
				"Test of {name} returned a Map, but the value is not callable."
			!call value _
			$resolved ()
		:$
			\ TODO: Handle errors in promise...
			_
		else
			$resolved ()

\ TODO: Handle errors in promise...
any->$ =
	doc. "TODO"
	|:Bag[$] test-result
		case test-result
			:Bag
				map _ |case
					:$
						_
					else
						oh-no! "Result of test should be $, Bag[$], or (). Got: {_}"
			:$
				[ _ ]
			else
				[ ]
