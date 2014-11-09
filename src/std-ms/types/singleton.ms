use
	..Bag -> each!
	..Dict
	..js -> global
	..Str -> ->Str
	.Impl-Type
	.Interface -> unchecked-implementor!
	.Method -> impl!

\ Object.ms requires singleton.ms, so must make our own
Object = global.Object
add-property! = |object name val
	Object.defineProperty object name
		value. val
		enumerable. `true`
has-property? = |object name
	Object.prototype.hasOwnProperty.call object name

singleton =
	doc. "TODO"
	|opts:Dict
		super:Impl-Type = case
			has-property? opts "super"
				opts.super
			else
				Object
		proto = Object.create super.prototype
		single = Object.create proto
		add-property! single "prototype" proto
		Object.assign single opts
		\ Every singleton is an Impl-Type, so you can call impl! as usual.
		unchecked-implementor! single Impl-Type
		\ TODO (dependency order makes this hard)
		\impl! ->Str single |
		\	name
		single

singleton
