"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./private/js-impl","./Try"],function(exports,js_45impl_0,Try_1){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_45impl_0),iAnd=_$2.iAnd,iOr=_$2.iOr,_$4=_ms.lazyGetModule(Try_1),oh_45no_33=_ms.lazyProp(_$4,"oh-no!");
		const not=exports.not=function(){
			const doc="Negation of a Boolean.";
			return _ms.set(function not(_){
				return function(){
					if(_){
						return false
					} else {
						return true
					}
				}()
			},"doc",doc)
		}();
		const and=exports.and=function(){
			const doc="True iff all conditions are true.\nEquivalent to `all? args`.\nAll arguments after the first may be lazy.\"";
			return _ms.set(iAnd,"doc",doc,"name","and")
		}();
		const nand=exports.nand=function(){
			const doc="Negation of and.";
			return _ms.set(function nand(){
				const args=[].slice.call(arguments,0);
				return not(Function.apply.call(and,null,[].concat(_ms.arr(args))))
			},"doc",doc)
		}();
		const or=exports.or=function(){
			const doc="True iff any condition is true.\nEquivalent to `any? args`.\nAll arguments after the first may be lazy.";
			return _ms.set(iOr,"doc",doc,"name","or")
		}();
		const nor=exports.nor=function(){
			const doc="Negation of or.";
			return _ms.set(function nor(){
				const args=[].slice.call(arguments,0);
				return not(Function.apply.call(or,null,[].concat(_ms.arr(args))))
			},"doc",doc)
		}();
		const implies=exports.implies=function(){
			const doc="Whether `then` is true whenever `if` is.\nAlways true when `if` is false.";
			return _ms.set(function implies(_if,then){
				return function(){
					if(_if){
						return _ms.unlazy(then)
					} else {
						return true
					}
				}()
			},"doc",doc)
		}();
		const xor=exports.xor=function(){
			const doc="True if `a` and `b` differ.";
			return _ms.set(function xor(a,b){
				return function(){
					if(a){
						return not(b)
					} else {
						return b
					}
				}()
			},"doc",doc)
		}();
		const name=exports.name="Boolean";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9Cb29sZWFuLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBS0EsZ0NBQ0k7R0FBSCxVQUFNO2tCQUlMLGFBQUEsRUFDUzs7S0FDUixHQUFBLEVBQ0M7YUFBQTtLQUFBLE9BRUc7YUFBSDtLQUFBO0lBQUE7R0FBQTs7RUFFSixnQ0FDSTtHQUFILFVBQ0M7a0JBV0Q7O0VBRUQsa0NBQ0s7R0FBSixVQUFNO2tCQVNMLGVBQ087O1dBQVAsd0JBQUssMkJBQUk7R0FBQTs7RUFFWCw4QkFDRztHQUFGLFVBQ0M7a0JBV0Q7O0VBRUQsZ0NBQ0k7R0FBSCxVQUFNO2tCQVNMLGNBQ087O1dBQVAsd0JBQUssMEJBQUc7R0FBQTs7RUFFVix3Q0FDUTtHQUFQLFVBQ0M7a0JBT0EsaUJBQUEsSUFBVyxLQUNhOztLQUN2QixHQUFBLElBQ0U7d0JBSFE7S0FBQSxPQUtOO2FBQUg7S0FBQTtJQUFBO0dBQUE7O0VBRUosZ0NBQ0k7R0FBSCxVQUFNO2tCQU1MLGFBQUEsRUFBVSxFQUNTOztLQUNsQixHQUFBLEVBQ0M7YUFBQSxJQUFJO0tBQUEsT0FFRDthQUFIO0tBQUE7SUFBQTtHQUFBOztFQXJHSix3QkFBQSIsImZpbGUiOiJCb29sZWFuLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=