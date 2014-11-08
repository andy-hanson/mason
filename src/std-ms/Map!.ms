use
	.Bool
	.Interface -> implementor!
	.Method
	.Map -> ?get has?
	.pred-types -> Any

clear!. Method
	doc. |_
		"Removes all entries."

delete!. Method
	doc. |:Bool _ key
		"If there is a value associated with `key`, removes it and returns `true`."

set!. Method
	doc. |_ key:Any val:Any
		"TODO"

Map! = Interface
	doc. "TODO"
	methods.
		. clear!
		. delete!
		. set!

\ TODO: Its own file, and bindings.
\ Identity-Map!. global.Map

implementor! Map! Map

Map!
