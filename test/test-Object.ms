import
	msl.@.? _ ?None ?some
	msl.@.Set.Set set=?
	msl.js defined?
	msl.Object can-get-p? empty-Object empty-Object? empty-Object! extend! flag? map-object-values Map->Object object=? Object-Key Object->Map p p? p! @p ?p p-with-proto? ?p-with-proto @p-all p+! p+mut! p-! prototype send send!
	msl.Try fails? fails-with?
	.tests

tests "Object"
	can-get-p? ->
		[null] -> false
		[undefined] -> false
		[1] -> true

	flag? ->
		[(a. true) "a"] -> true
		[(a. false) "a"] -> false
		[empty-Object "a"] -> false

	@p-all -> !|
		obj = empty-Object!()
		p+! obj "a" 0
		sym = Symbol "s"
		Object.defineProperty obj sym
			value. 0
			enumerable. false
		assert! set=? (@p-all [0 0]) ["0" "1" "length"]
		assert! set=? (@p-all obj) ["a" sym]
		|| But not "arguments" or "caller"
		assert! set=? (@p-all @p-all) ["length" "name" "prototype"]

	@p -> !|
		obj = empty-Object!
		Object.defineProperty obj "a"
			value. 0
			enumerable. false
		sym = Symbol "s"
		Object.defineProperty obj sym
			value. 0
			enumerable. true
		assert! empty? (@p obj)
		assert! set=? (@p @p) []

	?p ->
		x = a. 1 b. null
		[x "a"] -> ?some 1
		[x "b"] -> ?some null
		|| Does not inherit from prototype.
		[x "toString"] -> empty ?

	?p-with-proto ->
		[1 "toString"] -> ?some Number.prototype.toString
		[1 "asdfghjkl"] -> ?None

	p ->
		x = a. 1 b. null
		[x "a"] -> 1
		[x "b"] -> null
		assert! fails? |
			p "c"

	p? ->
		x = a. 1
		[x "a"] -> true
		[x "b"] -> false
		[x "toString"] -> false || use p-with-proto? for that.

	p-with-proto? ->
		[empty-Object "toString"] -> true

	object=? ->
		a = a. 1
		b = a. 1
		c = x. 3
		[a b] -> true
		[a c] -> false
		[1 1] -> true
		|| For functions, is identity
		[object=? object=?] -> true

	empty-Object? ->
		[empty-Object] -> true
		[Object] -> false

	Object->Map ->
		[(a. 1 b. 2)] ->
			"a" -> 1
			"b" -> 2

	Map->Object ->
		todo SYNTAX ["a" -> 1, "b" -> 2]
		map =
			"a" -> 1
			"b" -> 2
		[map] -> a. 1 b. 2
		assert! =? map (Object->Map (Map->Object map))
		assert! fails? |
			Map->Object
				1 -> 2

	prototype ->
		[empty-Object] -> Object.prototype
		[Object-Key] -> Kind.prototype

	empty-Object! -> !|
		_ = empty-Object!()
		assert! empty-Object? _
		child = empty-Object! _
		assert! =? _ (prototype child)

	p+! -> !|
		_ = empty-Object!()
		p+! _ "a" 1
		assert! =? _.a 1
		assert! fails? |
			p+! _ "a" 2
		assert! fails? |
			p+! "string" "a" 1

	p! -> !|
		_ = empty-Object!()
		p+mut! _ "a" 1
		p! _ "a" 2
		assert! =? _.a 2


	p-! -> !|
		_ = empty-Object!()
		p+mut! _ "a" 1
		p-! _ "a"
		forbid! p? _ "a"

	extend! -> !|
		_ = empty-Object!()
		extend! _ (a. 1)
		assert! =? _.a 1

	send -> |
		[1 "toFixed" 2] -> "1.00"
		assert! fails-with? "Method \"toFixed\" not implemented by \"1\"." !|
			send! "1" "toFixed"

	map-object-values ->
		[(a. 1 b. undefined) defined?] -> a. true b. false
