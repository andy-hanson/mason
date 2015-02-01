use
	..methods <! <?
	..private.bootstrap Fun Obj
	.Kind _ unchecked-implementor! implementor! implementor?
	.Method impl-unchecked!
	.Record-Type

Impl-Type = Kind
	doc. "
		TODO:REST
		Every Impl-Type should have a `prototype` property.


impl-unchecked! <? Impl-Type implementor?
impl-unchecked! <! Impl-Type implementor!

\ Needed since would normally done by default for `prototype`
unchecked-implementor! Record-Type Impl-Type
unchecked-implementor! Kind Impl-Type
unchecked-implementor! Fun Impl-Type

Self-Type. Record-Type
	doc. "TODO"
	members.
		prototype. Obj

<! Self-Type Impl-Type

self-type. |x:Obj
	Self-Type
		prototype. x

Impl-Type
