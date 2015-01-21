doc. "TODO"

use
	..$ -> $after $all
	..! -> !call
	..@ -> each! flat-map map
	..@.? -> get-or
	..@.Identity-Set!
	..Bool -> and false or true
	..control -> build
	..Comparable -> =?
	..Fun -> apply ignore
	..maps.Map
	..methods -> + contains? empty
	..modules -> $@module-in-dir
	..Obj -> ?p p p? @p @p-all
	..Obj!
	..pred-types -> ObjLit
	..Str
	..Try -> $annotate-errors annotate-errors oh-no! Success try
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
			b. empty Obj!
			impl! test-special (self-type b) yield["b"]
			c. () \ not testable
		@$maybe-test "dict" dict true

\ TODO: Better name (but not `test`, because that's a common module property)
test-special. Method
	doc. "
		May return a $. TODO:ETC.
	default. ignore

\ TODO: MOVE THESE
impl! test-special Impl-Type |type
	$all (flat-map (?p type "prototype") |prototype
		map (@p-all prototype) |name
			\ Some prototype properties throw errors. For example, global.Map.size.
			\ TODO:SYNTAX Inline fun
			x = try |
				?p prototype name
			case x
				:Success
					each! _.val |val
						@$maybe-test "{type}#{name}" val false
				else
					()

\ TODO: MOVE THESE
impl! test-special Interface |_
	a = any->@$ ((impl-for test-special Impl-Type) _
	b = flat-map (?p _ "implementor-test") |test:Fun
		flat-map concrete-implementors_ |implementor
			@$test-test-fun implementor test "{_}.implementor-test of {implementor}" implementor
	+ a b


$@test-all.
	doc. "TODO"
	|dir-path:Str
		$after ($@module-in-dir dir-path) |_
			$all (flat-map _ @$test-module)

$@test-module.
	doc. "TODO"
	|module:Obj
		$all (@$test-module module

\ TODO:ES6 Use module reflection
@$test-module = |module:Obj
	module-name = get-or (?p module "displayName") "<anonymous module>"
	@$maybe-test module-name module true

all-tested = empty Identity-Set!

\ TODO: Better name
@$maybe-test = |:@[$] name:Str value is-module:Bool
	case
		all-tested.has value
			[ ]
		else
			all-tested.add value
			a = test-special value
			b = case value
				\ TODO: variadic `or`
				or is-module ~(or :ObjLit ~:Fun)
					flat-map @p_ |prop-name
						next-name = "{name}.{prop-name}"
						prop-val = p _ prop-name
						case prop-name
							=? _ "test"
								@$test-test-prop value prop-val next-name
							else
								@$maybe-test next-name prop-val false
				and :Obj ~(p? _ "test")
					@$test-test-prop _ _.test "{name}.test"
				else
					[]

			+ (any->@$ a) b

@$test-test-prop = |:@[$] value value-test name \TODO: ...test-args
	\ Could be both Fun and Dict
	_ = value-test
	a = case
		:Fun
			@$test-test-fun value value-test name
		else
			[]
	b = case
		:ObjLit
			\ TODO: flat-map pairs_ ?
			flat-map @p_ |sub-name
				@$test-test-prop value (p _ sub-name) "{name}.{sub-name}"
		else
			[]

	+ a b

@$test-test-fun = |:@[$] value value-test:Fun name ...args
	~ano = "{name}: "
	_ = annotate-errors ~ano |
		apply value-test args
	case
		:Map
			! (contains? Fun value) ~
				"Test of {name} returned a Map, but the value is not callable."
			!call value _
			[ ]
		:$
			[ ($annotate-errors ~ano _) ]
		else
			[ ]

any->@$ =
	doc. "TODO"
	|:@[$] test-result
		case test-result
			:@
				map _ |case
					:$
						_
					else
						oh-no! "Result of test should be $, @[$], or (). Got: {_}"
			:$
				[ _ ]
			else
				[ ]
