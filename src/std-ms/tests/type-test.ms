\ TODO: Probably move these tests into types.ms

use
	..assert -> !=
	..basic-methods -> type-of
	..Interface -> implementor!
	..Method -> impl!
	..Num
	..Record-Type

Vec2D. Record-Type
	members.
		x. Num
		y. Num

v. Vec2D
	x. 1
	y. 2

!= v.x 1
!= (type-of v) Vec2D

x. Method
	nom. "x"

\ TODO: use `getter`
impl! x Vec2D |v
	v.x

impl! x Num |n
	n

!= (x v) 1
!= (x 2) 2

Has-X. Interface
	nom. "Has-X"
	methods.
		. x

implementor! Vec2D Has-X
implementor! Num Has-X

a:Has-X = v
b:Has-X = 1

