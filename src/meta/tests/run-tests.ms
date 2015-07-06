use
	...! _ !call
	...@.@
	...@.@-Type empty
	...@.? ?-or
	...@.Map.Map
	...@.Set.Id-Set!
	...$ _ $all $ing
	...Boolean and or
	...compare =?
	...Function noop
	...Generator!
	...js defined?
	...Object ?p p p? @p @p-all
	...Try $annotate-errors annotate-errors Success try
	...Type.Impl-Type
	...Type.Kind _ concrete-implementors
	...Type.Method _ impl! impl-for
	...Type.Pred-Type ObjLit
	...Type.Type contains?
use-debug
	...control build
	...Object! empty-Object!
	...Type.Method self-impl!

doc. "For running code in `test` properties."

# TODO
test. !|
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
			c. null # not testable
		@$maybe-test "obj" obj true

# TODO: Better name (but not `test`, because that's a common module property)
test-special. Method
	doc. "
		Something special to do with this value when the test runner reacher it.
		May return a $.
	args. 1
	allow-null?. true
	default. noop

# TODO: MOVE THESE
impl! test-special Impl-Type |type
	$all @for prototype in ?p type "prototype"
		for! name in @p-all prototype
			# Some prototype properties throw errors. For example, global.Map.size.
			# TODO:SYNTAX Inline fun
			_ = try |
				?p prototype name
			if! :Success
				for! prop-val in _.val
					... @$maybe-test ~"{type}#{name}" prop-val false

# TODO: MOVE THESE
impl! test-special Kind |_
	# TODO:SYNTAX Just build without @for
	@for
		... @$-from-any ((impl-for test-special Impl-Type) _)
		for! test in ?p _ "implementor-test"
			for! implementor in concrete-implementors_
				... @$test-test-fun implementor test ~"{_}.implementor-test of {implementor}" implementor
		break!

$test-all.
	doc. "Tests all modules."
	|@all-modules:@[Object]
		$all @for @all-modules
			... @$test-module_

$test-module.
	doc. "Treats an Object as a module and tests it."
	|module:Object
		$all (@$test-module module

# TODO:ES6 Use module reflection
@$test-module = |module:Object
	module-name = ?-or (?p module "name") "<anonymous module>"
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
	test. !|
		pass # TODO
	|_:Function
		$all (@$test-single "{_}" _ false)

@$test-single = |~name value is-module
	# TODO:SYNTAX Just build without @for
	@for
		... @$-from-any (test-special value
		case! value
			or is-module ~:ObjLit ~:Function
				for! prop-name in @p_
					~next-name = "{name}.{prop-name}"
					prop-val = p _ prop-name
					# TODO:SYNTAX switch!
					case! prop-name
						=? _ "test"
							... @$test-test-prop value prop-val ~next-name
						=? _ "$test"
							... @$test-$test-prop prop-val ~next-name
						else
							... @$maybe-test ~next-name prop-val false

			and :Object ~(p? _ "test")
				... @$test-test-prop _ _.test ~"{name}.test"
			else
				pass
		break!

@$test-test-prop = |value value-test ~name # TODO: ...test-args
	# TODO:SYNTAX Just build without @for
	@for
		_ = value-test
		# Could be both Function and ObjLit
		# TODO: No it can't
		if! :Function
			... @$test-test-fun value value-test ~name
		if! :ObjLit
			for! sub-name in @p_
				... @$test-test-prop value (p _ sub-name) ~"{name}.{sub-name}"
		break!

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
			[ ($annotate-errors ~ano _
		defined?_
			annotate-errors ~ano !|
				oh-no! "Test must return Map or $."
		else
			[ ]

@$-from-any =
	|test-result
		case test-result
			:@
				for! _
					unless! :$
						oh-no! "Result of test should be $, @[$], or undefined. Got: {_}"
				_
			:$
				[ _ ]
			defined?_
				oh-no! "Result of test should be $, @[$], or undefined. Got: {_}"
			else
				[ ]

