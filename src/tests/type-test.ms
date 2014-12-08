\ TODO: Move to types

use
	..assert -> !
	..basic-methods -> type-of
	..Comparable -> =?
	..Comparable! -> <!
	..Fun -> ignore
	..math.Num
	..types.Interface
	..types.Method -> impl!
	..types.Record-Type

Vec2D. Record-Type
	members.
		x. Num
		y. Num

v. Vec2D
	x. 1
	y. 2

! =? v.x 1
! =? (type-of v) Vec2D

x. Method
	nom. "x"

\ TODO: use `getter`
impl! x Vec2D |v
	v.x

impl! x Num |n
	n

! =? (x v) 1
! =? (x 2) 2

Has-X. Interface
	displayName. "Has-X"

<! Vec2D Has-X
<! Num Has-X

a:Has-X = v
b:Has-X = 1
ignore a b
()
