# Types

### Type

A `Type` is anything that you can call these functions on:
* `subsumes?`
* `!subsumes`
	By default, this calls `subsumes?` and throws an error if false.
	It may also provide more information on why the instance was invalid.

There are three types of types: Pred-Types and Impl-Types.

### Pred-Type

A Pred-Type is simply a named predicate (function taking one argument and returning a Bool).

                Small. Pred-Type
                                nom. "Small"
                                subsumes?. |_
                                                and :Real ~(< _ 10)

You should generally not type the argument of `subsumes?`.

### Impl-Type

An Impl-Type is any type on which Methods may be implemented.
These are Fns, Interfaces, and Record-Types. (Classes may be on the way.)

Javascript often uses Fns as constructors, so every function is considered a Type.
Unfortunately, there is no way to test whether a Fn is a constructor or not.
In Mason you should avoid this pattern and use its type system.

### Record-Type

A Record-Type can be thought of as a way to tag dicts with a type.
Create one like so.

	Vec2D. Record-Type
		members.
			x. Real
			y. Real

	my-vec:Vec2D. Vec2D
		x. 1
		y. 2

	not-a-vec:Vec2D. \ This will fail. Just resembling a Vec2D is not enough.

	x. 1
	y. 2

	\ A Vec must have exactly the members `x` and `y`. So these will fail.
	half-vec. Vec2D
		x. 1
	vec3. Vec2D
		x. 1
		y. 2
		z. 3

`defaults` allows you to specify default values for your members.

	Vec2D. Record-Type
		...
		defaults.
			y. |v
				v.x

	working-half-vec. Vec2D
		x. 1
		\ y will be 1 as well.

You can also make your types callable.
This will make them expensive to create, so it's really only used for, e.g., Record-Type itself.

	Vec2D. Record-Type
		...
		make-callable. |v |a
			log! "{v} called on {a}"

	my-vec = Vec2D ...
	my-vec 3

### Method
Another Record-Type whose instances are callable is Method.
A Method is a function with different implementations for different types.
Specifically, they have to be Impl-Types, which is where the name comes from.
You can create one like so:

	sizeness. Method
		default. |a
			len (Object.keys a)

	impl! sizeness Number identity
	impl! sizeness Sq len
	impl! sizeness Boolean |case
		_
			1
		else
			0

	!= (sizeness 3 3)
	!= (sizeness (Sq 1 2 3)) 3
	!= (sizeness true)( 1

	\ When no impl! exists, the default kicks in.
	two = sizeness
		x. 1
		y. 2
	!= two 2

	\ Methods are theirselves types. The 'default' will not be considered.
	x:sizeness = 3 \ works
	x:sizeness = "hi" \ does not work

### Interface
An interface is a collection of methods that are often implemented together.
Sq is an example - all Sqs implement methods like + and len.
Type checking on an interface is O(1).

	Addish. Interface
		methods.
			. +
			. -

Mark the sub-types of an interface with `implementor!` They must theirselves be Impl-Types.

                implementor! Real Addish
                implementor! Set Addish

You can also do impl! on an interface.
