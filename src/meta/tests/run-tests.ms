use
	...assert assert-call! assert-this-call!
	...@.@
	...@.@-Type empty
	...@.? ?-or
	...@.Map.Id-Map
	...@.Map.Map
	...@.Set.Id-Set
	...$ _ $all $ing
	...compare =?
	...Generator
	...js defined?
	...Object ?p p p? @p @p-all
	...Try $annotate-errors annotate-errors ?try
	...Type.Impl-Type
	...Type.Kind _ concrete-implementors
	...Type.Method _ impl! impl-for
	...Type.Pred-Type ObjLit
	...Type.Type contains?
use-debug
	...control build
	...Object empty-Object!
	...Type.Method self-impl!

doc. "For running code in `test` properties."

# TODO
test. !|
	assert! =? [ "x" "y" "b" ] (build |yield
		obj =
			a.
				test.
					x. !|
						yield "x"
					y. !|
						yield "y"
			b. empty-Object!()
			self-impl! test-special b !|
				yield "b"
			c. null # not testable
		@$maybe-test "obj" obj true

# TODO: Better name (but not `test`, because that's a common module property)
test-special. new Method
	doc. "
		Something special to do with this value when the test runner reacher it.
		May return a $.
	args. 1
	allow-null?. true
	default. !|
		pass

# TODO: MOVE THESE
impl! test-special Impl-Type .|
	$all @for prototype in ?p this "prototype"
		for! name in @p-all prototype
			# Some prototype properties throw errors. For example, global.Map.size.
			?prop-val = ?try |
				p prototype name
			for! proto-fun in ?prop-val
				# if! contains? Function proto-fun
				#	for! (?p proto-fun "test")
				#	... @$test-proto-fun _ ~"{this}#{name}"
				# Must call name.toString() because Symbols can not implicitly convert.
				... @$maybe-test ~"{this.name}#{name.toString()}" proto-fun false true


# TODO: MOVE THESE
impl! test-special Kind .|
	# TODO:SYNTAX Just build without @for
	@for
		... @$-from-any ((impl-for test-special Impl-Type) this)
		for! test in ?p this "implementor-test"
			for! implementor in concrete-implementors this
				... @$test-test-fun implementor test ~"{this}.implementor-test of {implementor}" false implementor
		break!

$test-all.
	doc. "Tests all modules."
	|@all-modules:@ # TODO: @[Object]
		$all @for @all-modules
			... @$test-module_

$test-module.
	doc. "Treats an Object as a module and tests it."
	|-module:Object
		$all (@$test-module -module

# TODO:ES6 Use module reflection
@$test-module = |-module:Object
	module-name = ?-or (?p -module "name") "<anonymous module>"
	@$maybe-test module-name -module true

# TODO: Make this local to a single run of $test-all.
all-tested = empty Id-Set

# TODO: Better name
@$maybe-test = |~name value is-module is-proto-prop
	case
		all-tested.has value
			[ ]
		else
			all-tested.add value
			@$test-single ~name value is-module is-proto-prop

$test-fun.
	doc. "TODO"
	test. !|
		pass # TODO
	|_:Function
		$all (@$test-single "{_}" _ false false)

$test-single.
	doc. "TODO"
	test. !|
		pass # TODO
	|_
		$all (@$test-single "" _ false false)

@$test-single = |~name value is-module is-proto-prop
	# TODO:SYNTAX Just build without @for
	@for
		... @$-from-any (test-special value)
		case! value
			or is-module :ObjLit :Function
				for! prop-name in @p_
					~next-name = "{name}.{prop-name}"
					prop-val = p _ prop-name
					# TODO:SYNTAX switch!
					case! prop-name
						=? _ "test"
							... @$test-test-prop value prop-val ~next-name is-proto-prop
						=? _ "$test"
							... @$test-$test-prop prop-val ~next-name is-proto-prop
						else
							... @$maybe-test ~next-name prop-val false false

			and :Object (p? _ "test")
				... @$test-test-prop _ _.test ~"{name}.test" false
			else
				pass
		break!

@$test-test-prop = |value value-test ~name is-proto-prop # TODO: ...test-args
	# TODO:SYNTAX Just build without @for
	@for
		_ = value-test
		# Could be both Function and ObjLit
		# TODO: No it can't
		if! :Function
			... @$test-test-fun value value-test ~name is-proto-prop
		if! :ObjLit
			for! sub-name in @p_
				... @$test-test-prop value (p _ sub-name) ~"{name}.{sub-name}" false
		break!

@$test-$test-prop = |value-$test:Function[Generator] ~name
	. $annotate-errors ~"{name}: " ($ing value-$test

@$test-test-fun = |value value-test:Function ~name is-proto-prop ...args
	~ano = "{name}: "
	_ = annotate-errors ~ano |
		value-test ...args
	case
		# TODO: just :Map
		or :Map :Id-Map
			assert! contains? Function value throw!
				"Test of {name} returned a Map, but the value is not callable."
			annotate-errors ~ano !|
				case!
					is-proto-prop
						assert-this-call! value _
					else
						assert-call! value _
			[ ]
		:$
			[ ($annotate-errors ~ano _
		defined?_
			annotate-errors ~ano !|
				throw! "Test must return Map or $."
		else
			[ ]

@$-from-any = |test-result
	case test-result
		:@
			for! elem in _
				assert! contains? $ elem throw! "
					Result of test should be $, @[$], or undefined.
					Got @ containing: {elem}
			_
		:$
			[ _ ]
		defined?_
			throw! "Result of test should be $, @[$], or undefined. Got: {_}"
		else
			[ ]
