| For running code in `test` properties.

import
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
import-debug
	...control build
	...Object empty-Object!
	...Type.Method self-impl!

test. !|
	assert! =? ["x" "y" "b"] (build |yield
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
			c. null || not testable
		@$maybe-test "obj" obj true

todo Better name (but not `test`, because that's a common module property)
test-special. new Method
	| Something special to do with this value when the test runner reacher it.
	| May return a $.
	name.
	args. 1
	allow-null?. true
	default. !|
		pass

todo MOVE THESE
impl! test-special Impl-Type .|
	$all @for prototype in ?p this "prototype"
		for! prop-name in @p-all prototype
			|| Some prototype properties throw errors. For example, global.Map.size.
			?prop-val = ?try |
				p prototype prop-name
			for! proto-fun in ?prop-val
				todo if! proto-fun:Function
				todo	for! (?p proto-fun "test")
				todo	... @$test-proto-fun _ ~"{this}#{prop-name}"
				|| Must call prop-name.toString() because Symbols can not implicitly convert.
				... @$maybe-test ~"{.name}#{prop-name.toString()}" proto-fun false true


todo MOVE THESE
impl! test-special Kind .|
	todo SYNTAX Just build without @for
	@for
		... @$-from-any ((impl-for test-special Impl-Type) this)
		for! test in ?p this "implementor-test"
			for! implementor in concrete-implementors this
				... @$test-test-fun implementor test ~"{this}.implementor-test of {implementor}" false implementor
		break!

$test-all.
	| Tests all modules.
	|@all-modules:@ todo  @[Object]
		$all @for @all-modules
			... @$test-module_

$test-module.
	| Treats an Object as a module and tests it.
	|-module:Object
		$all (@$test-module -module)

todo ES6 Use module reflection
@$test-module = |-module:Object
	module-name = ?-or (?p -module "name") "<anonymous module>"
	@$maybe-test module-name -module true

todo Make this local to a single run of $test-all.
all-tested = empty Id-Set

todo Better name
@$maybe-test = |~test-name value is-module is-proto-prop
	case
		all-tested.has value
			[]
		else
			all-tested.add value
			@$test-single ~test-name value is-module is-proto-prop

$test-fun.
	todo doc
	test. !|
		todo
		pass
	|_:Function
		$all (@$test-single "{_}" _ false false)

$test-single.
	todo doc
	test. !|
		todo
		pass
	|_
		$all (@$test-single "" _ false false)

@$test-single = |~test-name value is-module is-proto-prop
	todo SYNTAX Just build without @for
	@for
		... @$-from-any (test-special value)
		case! value
			or is-module :ObjLit :Function
				for! prop-name in @p_
					~next-name = "{test-name}.{prop-name}"
					prop-val = p _ prop-name
					todo SYNTAX switch!
					case! prop-name
						=? _ "test"
							... @$test-test-prop value prop-val ~next-name is-proto-prop
						=? _ "$test"
							... @$test-$test-prop prop-val ~next-name is-proto-prop
						else
							... @$maybe-test ~next-name prop-val false false

			and :Object (p? _ "test")
				... @$test-test-prop _ _.test ~"{test-name}.test" false
			else
				pass
		break!

@$test-test-prop = |value value-test ~test-name is-proto-prop
	todo  ...test-args
	todo SYNTAX Just build without @for
	@for
		_ = value-test
		|| Could be both Function and ObjLit
		todo No it can't
		if! :Function
			... @$test-test-fun value value-test ~test-name is-proto-prop
		if! :ObjLit
			for! sub-name in @p_
				... @$test-test-prop value (p _ sub-name) ~"{test-name}.{sub-name}" false
		break!

@$test-$test-prop = |value-$test:Function[Generator] ~test-name
	. $annotate-errors ~"{test-name}: " ($ing value-$test)

@$test-test-fun = |value value-test:Function ~test-name is-proto-prop ...args
	~ano = "{test-name}: "
	_ = annotate-errors ~ano |
		value-test ...args
	case
		todo just :Map
		or :Map :Id-Map
			assert! value:Function throw!
				"Test of {test-name} returned a Map, but the value is not callable."
			annotate-errors ~ano !|
				case!
					is-proto-prop
						assert-this-call! value _
					else
						assert-call! value _
			[]
		:$
			[($annotate-errors ~ano _)]
		defined?_
			annotate-errors ~ano !|
				throw! "Test must return Map or $."
		else
			[]

@$-from-any = |test-result
	case test-result
		:@
			for! elem in _
				assert! elem:$ throw! "
					Result of test should be $, @[$], or undefined.
					Got @ containing: {elem}
			_
		:$
			[_]
		defined?_
			throw! "Result of test should be $, @[$], or undefined. Got: {_}"
		else
			[]
