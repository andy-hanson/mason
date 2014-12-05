use
	..assert -> !not
	..Bool
	..Comparable! -> <!
	.Map -> has-key?
	..types.Interface
	..types.Method
	..types.pred-types -> Any

set!. Method
	doc. |_ key:Any val:Any
		"TODO"

empty!. Method
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

<! Map! Map

Map!
