use
	..assert -> !not
	..Bool
	.Map -> has-key?
	..types.Interface -> implementor!
	..types.Method
	..types.pred-types -> Any

set!. Method
	doc. |_ key:Any val:Any
		"TODO"

clear!. Method
	doc. |_
		"Removes all entries."

delete!. Method
	doc. |:Bool _ key
		"If there is a value associated with `key`, removes it and returns `true`."

add!. Method
	doc. |_ key:Any val:Any
		"TODO"
	default. |_ key:Any val:Any
		in
			!not (has-key? _ key) ~"
				Already have key {key}.
		set! _ key val

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
