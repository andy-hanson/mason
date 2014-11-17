use
	.?
	.Bag
	..types.Interface -> implementor!
	..types.Method

Bag! = Interface
	doc. "TODO"

<+!. Method
	doc. |_ added:Bag
		"TODO"
+>!. Method
	doc. |_ added:Bag
		"TODO"
?<pop!. Method
	doc. |:? _
		"TODO"
?pop>!. Method
	doc. |:? _
		"TODO"
clear!. Method
	doc. |_
		"TODO"

implementor! Bag! Bag

Bag!

