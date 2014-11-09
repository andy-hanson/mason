doc. "TODO"

use
	.? -> get-or
	.Bag -> each!
	.Bool -> and
	.console -> log!
	.Error -> annotate-errors oh-no!
	.Fun -> ignore
	.Object -> ?get-property get-property has-property? own-property-names
	.Map -> get
	.Method -> impl! impl-for
	path
	.pred-types -> Any
	q-io.fs
	.Str

\ TODO: Better name (but not `test`, because that's a common module property)
test-special. Method
	doc. "TODO"

impl! test-special Method |_
	each! _.implementing-types |type
		maybe-test "{_.displayName} for {type}" (impl-for _ type)

\ TODO:ES6 Use module reflection
test-module.
	doc. "TODO"
	|module
		name = get-or (?get-property module "displayName") "Anonymous module"
		maybe-test name module
		each! (Object.keys module) |name
			prop = get-property module name
			case! prop
				:Any
					maybe-test name (get-property module name)
				else
					oh-no! "Property {name} of {module} is undefined."

maybe-test = |name:Str value:Any
	annotate-errors ~"In {name}:\n" |
		case! value
			:test-special
				test-special _
			else
				()
		case! value
			and :Object ~(has-property? _ "test")
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
