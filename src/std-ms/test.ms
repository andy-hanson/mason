doc. "TODO"

use
	.Bag -> each!
	.Bool -> and
	.console -> log!
	.Error -> annotate-errors
	.Fun -> ignore
	.Object -> get-property has-property? own-property-names
	.Map -> get
	.Method -> impl! impl-for
	path
	q-io.fs
	.Str

test. Method
	doc. "TODO"

impl! test Method |_
	each! _.implementing-types |type
		maybe-test "{_.displayName} for {type}" (impl-for _ type)

\ TODO:ES6 Use module reflection
test-module.
	doc. "TODO"
	|module
		maybe-test module
		each! (Object.keys module) |name
			maybe-test name (get-property module name)

maybe-test = |name value
	annotate-errors ~"In {name}:\n" |
		case! value
			:test
				test _
			else
				()
		case! value
			and :Object ~(has-property? value "test")
				value.test ()
			else
				()

test-modules. |dirPath:Str
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
