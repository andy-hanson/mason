use
	..Comparable <?
	..Comparable! <!
	.Interface _ unchecked-implementor! implementor! implementor?
	.Method impl-unchecked!
	..private.bootstrap Fun
	.Record-Type

Impl-Type = Interface
	doc. "
		TODO:REST
		Every Impl-Type should have a `prototype` property.

impl-unchecked! <? Impl-Type implementor?
impl-unchecked! <! Impl-Type implementor!

\ Needed since would normally done by default for `prototype`
unchecked-implementor! Record-Type Impl-Type
unchecked-implementor! Interface Impl-Type
unchecked-implementor! Fun Impl-Type

Impl-Type
