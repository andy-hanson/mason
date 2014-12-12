use
	..assert -> !
	..Comparable -> =?
	..Fun -> thunk
	.Hash-Map!
	.Map! -> set!
	..math.Num -> divisible?
	..methods -> + empty freeze
	..Object! -> add-property!
	..private.bootstrap -> ms
	..Ref -> get mod! ref
	..types.Alias-Type
	..types.Method -> impl!
	..types.util -> self-type

Hash-Map = Alias-Type
	alias-of. Hash-Map!

impl! empty (self-type Hash-Map) (thunk (freeze (empty Hash-Map!

\ TODO: group-by 2
add-property! ms "map"  |...args
	hm = empty Hash-Map!
	n = args.length
	! divisible? n 2

	i = ref 0
	loop!
		case! get i
			=? _ n
				end-loop!
			else
				set! hm `args[_]` `args[_ + 1]`
				mod! i +[2]

	freeze hm

Hash-Map
