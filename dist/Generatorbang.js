"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Boolean","./Function","./Type/Js-Method","./Type/Pred-Type","./Type/Type"],function(exports,Boolean_0,Function_1,Js_45Method_2,Pred_45Type_3,Type_4){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),_$3=_ms.getModule(Function_1),call=_ms.get(_$3,"call"),Js_45Method=_ms.getDefaultExport(Js_45Method_2),Pred_45Type=_ms.getDefaultExport(Pred_45Type_3),_$6=_ms.getModule(Type_4),contains_63=_ms.get(_$6,"contains?");
		const Generator_33=Pred_45Type(function(){
			const doc="A block of code which yields values and receives responses from a context.\nAlso known as a coroutine.";
			const predicate=function predicate(_){
				return and(_ms.contains(Object,_),_ms.lazy(function(){
					return contains_63(Function,_.next)
				}))
			};
			return {
				doc:doc,
				predicate:predicate,
				name:"Generator!"
			}
		}());
		const empty_45Generator=exports["empty-Generator"]=function(){
			const doc="Does nothing.";
			return _ms.set(call(function*(){}),"doc",doc,"name","empty-Generator")
		}();
		const gen_45next_33=exports["gen-next!"]=Js_45Method(function(){
			const doc="Continues until the next `<~`.";
			const impl_45symbol="next";
			return {
				doc:doc,
				"impl-symbol":impl_45symbol,
				name:"gen-next!"
			}
		}());
		const name=exports.name="Generator!";
		exports.default=Generator_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9HZW5lcmF0b3IhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBT0EsbUJBQWEsc0JBQ1M7R0FBckIsVUFDQztHQUVELGdCQUFZLG1CQUFBLEVBQ0M7V0FBWixpQkFBSyxPQUFEO1lBQVUsWUFBVSxTQUFTOzs7Ozs7Ozs7RUFFbkMsNkRBQ2dCO0dBQWYsVUFBTTtrQkFDTixLQUNRLFdBQUE7O0VBRVQseUNBQVcsc0JBQ1M7R0FBbkIsVUFBTTtHQUNOLG9CQUFjOzs7Ozs7O0VBckJmLHdCQUFBO2tCQXVCQSIsImZpbGUiOiJHZW5lcmF0b3JiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=