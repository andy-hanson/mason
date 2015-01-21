use
	.@.?
	.$ -> $catch
	.Bool -> and true
	.Comparable -> =?
	.Comparable! -> <!
	.control -> build
	.Fun -> Act thunk
	.js -> global
	.js-impl -> make-Error i-always-do-after i-oh-no! i-try
	.methods -> => contains? empty
	.Obj
	.Obj! -> p!
	.pred-types -> Any
	.Str
	.types.Interface
	.types.Record-Type
	.types.Type
use~
	.! -> !not

Try = Interface
	doc. "Result of running failable code."

Success. Record-Type
	doc. "Attempt that did not fail. _.val is the result of the attempted code."
	members.
		val.
Error.
	doc. "TODO"
	global.Error
<! Success Try
<! Error Try
\ TODO: Closed interfaces?

\ TODO: Make `make-Error` public?

oh-no!.
	doc. "
		Throws an Error.
		If `error` is a Str, it will be put into a new Error.
		If it is possible for the creation of `error` to fail, make it lazy.
	test. |
		\ TODO: ! fails-with? type | oh-no! type
		! fails-with? "a" |
			oh-no! "a"
	\ TODO: ~error
	|error
		i-oh-no! error

try.
	doc. "
		If `tried` throws an error, returns it; else returns Success of its result.
		If you don't care about the value of the error, use `?try` instead.
	test. |
		[ (thunk 1) ] -> Success
			val. 1
		! fails-with? "Oh no!" oh-no!
	|tried:Fun[Any]
		make-success = |x
			Success
				val. x
		i-try make-success tried

?try.
	doc. "`?` containing any successes."
	test. |
		[ (thunk 1) ] -> => ? [ 1 ]
		[ oh-no! ] -> empty ?
	|tried:Fun[Any]
		case try tried
			:Success
				=> ? [ _.val ]
			else
				empty ?

fails?.
	doc. "TODO"
	test. |
		! fails? |
			oh-no! ()
		!not fails? |
			()
	|_:Act
		contains? Error try_

!debug-fails?.
	doc. "TODO"
	test. |
		"TODO"
	|_:Act
		in
			! fails? _
		()

fails-with?.
	doc. "TODO"
	test. |
		"TODO"
	|with act:Act
		result = try act
		and (contains? Error result) ~
			case with
				:Type
					contains? _ result
				:Str
					=? result.message _

\ TODO: Just make it a Record-Type with message/stack properties whose default if `new Error(msg)`.stack
error-type.
	doc. "Makes a new custom error types."
	test. |
		() \ Relies on below TODO
		\ET = error-type
		\	doc. "ET"
		\x = ET "message"
		\! contains? Error x
		\! =? x.message "message"
	|opts
		\ TODO: Use Obj! functions instead of js's builtin Obj helpers
		it =
			displayName. undefined \ TODO: Ability to not have displayName
			|message:Str
				msg = message
				Obj.defineProperties this
					message.
						value. msg
						enumerable. true
						writable. true
					stack.
						value. (make-Error msg).stack
						enumerable. true
						writable. true
		Obj.assign it opts
		p! it "prototype" (Obj.create Error.prototype)
		it

always-do-after.
	doc. "Executes `finally-do`, even if there are errors."
	test. |
		! =? [ 0 ] (build |yield
			try |
				always-do-after oh-no! yield[0]
	|tried:Fun[Any] finally-do:Act
		i-always-do-after tried finally-do

annotate-errors.
	doc. "TODO"
	test. |
		"TODO"
	|~annotation:Str tried:Act
		case try tried
			:Success
				_.val
			else
				p! _ "stack" "{annotation}{_.stack}"
				p! _ "message" "{annotation}{_.message}"
				oh-no! _

$annotate-errors.
	doc. "TODO"
	test. |
		"TODO"
	|~annotation:Str $tried:$
		$catch $tried |_
			p! _ "stack" "{annotation}{_.stack}"
			p! _ "message" "{annotation}{_.message}"
			oh-no! _

Try
