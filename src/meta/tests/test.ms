use
	...! _ !call
	...@.@ _ ++ each! flatten flat-map map
	...@.@-Type empty
	...@.? ?-or
	...@.Map.Map
	...@.Set.Id-Set!
	...$ _ $after $all $ing
	...Boolean and or
	...compare =?
	...control if
	...Function noop
	...Generator!
	...Object ?p p p? @p @p-all
	...Try $annotate-errors annotate-errors oh-no! Success try
	...Type.Impl-Type
	...Type.Kind _ concrete-implementors
	...Type.Method _ impl! impl-for
	...Type.Pred-Type ObjLit
	...Type.Type contains?
	..modules $@all-modules
use-debug
	...control build
	...Object! empty-Object!
	...Type.Method self-impl!

doc. "For running code in `test` properties."

# TODO
test. |
	! =? [ "x" "y" "b" ] (build |yield
		obj =
			a.
				test.
					x. |
						yield "x"
					y. |
						yield "y"
			b. empty-Object!()
			self-impl! test-special b |
				yield "b"
			c. () # not testable
		@$maybe-test "obj" obj true

# TODO: Better name (but not `test`, because that's a common module property)
test-special. Method
	doc. "
		Something special to do with this value when the test runner reacher it.
		May return a $.
	default. noop

# TODO: MOVE THESE
impl! test-special Impl-Type |type
	$all (flat-map (?p type "prototype") |prototype
		map (@p-all prototype) |name
			# Some prototype properties throw errors. For example, global.Map.size.
			# TODO:SYNTAX Inline fun
			x = try |
				?p prototype name
			case x
				:Success
					each! _.val |val
						@$maybe-test ~"{type}#{name}" val false
				else
					()

# TODO: MOVE THESE
impl! test-special Kind |_
	a = @$-from-any ((impl-for test-special Impl-Type) _
	b = flat-map (?p _ "implementor-test") |test:Function
		flat-map concrete-implementors_ |implementor
			@$test-test-fun implementor test ~"{_}.implementor-test of {implementor}" implementor
	++ a b


$test-all.
	doc. "Tests all modules in dir-path."
	|require:Function dir-path:String
		$after ($@all-modules require dir-path) |_
			$all (flat-map _ @$test-module)

$test-module.
	doc. "Treats an Object as a module and tests it."
	|module:Object
		$all (@$test-module module

# TODO:ES6 Use module reflection
@$test-module = |module:Object
	module-name = ?-or (?p module "displayName") "<anonymous module>"
	@$maybe-test module-name module true

# TODO: Make this local to a single run of $test-all.
all-tested = empty Id-Set!

# TODO: Better name
@$maybe-test = |~name value is-module
	case
		all-tested.has value
			[ ]
		else
			all-tested.add value
			@$test-single ~name value is-module

$test-fun.
	doc. "TODO"
	test. |
		"TODO"
	|_:Function
		$all (@$test-single "{_}" _ false)

@$test-single = |~name value is-module
	a = test-special value
	b = case value
		or is-module ~:ObjLit ~:Function
			flat-map @p_ |prop-name
				~next-name = "{name}.{prop-name}"
				prop-val = p _ prop-name
				case prop-name
					=? _ "test"
						@$test-test-prop value prop-val ~next-name
					=? _ "$test"
						@$test-$test-prop prop-val ~next-name
					else
						@$maybe-test ~next-name prop-val false
		and :Object ~(p? _ "test")
			@$test-test-prop _ _.test ~"{name}.test"
		else
			[]

	++ (@$-from-any a) b

@$test-test-prop = |value value-test ~name # TODO: ...test-args
	# Could be both Function and ObjLit
	# TODO: No it can't
	_ = value-test
	@$a = flatten (if :Function ~(@$test-test-fun value value-test ~name
	@$b = flatten (if :ObjLit ~(flat-map @p_ |sub-name
		@$test-test-prop value (p _ sub-name) ~"{name}.{sub-name}"
	++ @$a @$b

@$test-$test-prop = |value-$test:Function[Generator!] ~name
	. $annotate-errors ~"{name}: " ($ing value-$test

@$test-test-fun = |value value-test:Function ~name ...args
	~ano = "{name}: "
	_ = annotate-errors ~ano |
		value-test ...args
	case
		:Map
			! (contains? Function value) ~
				"Test of {name} returned a Map, but the value is not callable."
			annotate-errors ~ano |
				!call value _
			[ ]
		:$
			[ ($annotate-errors ~ano _) ]
		else
			[ ]

@$-from-any =
	|test-result
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
