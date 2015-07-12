"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Boolean","./Function","./Type/Js-Method","./Type/Pred-Type","./Type/Type"],function(exports,Boolean_0,Function_1,Js_45Method_2,Pred_45Type_3,Type_4){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),_$3=_ms.getModule(Function_1),call=_ms.get(_$3,"call"),Js_45Method=_ms.getDefaultExport(Js_45Method_2),Pred_45Type=_ms.getDefaultExport(Pred_45Type_3),_$6=_ms.getModule(Type_4),contains_63=_ms.get(_$6,"contains?");
		const Generator_33=Pred_45Type(function(){
			const built={};
			const doc=built.doc=`A block of code which yields values and receives responses from a context.\nAlso known as a coroutine.`;
			const predicate=built.predicate=function predicate(_){
				return and(_ms.contains(Object,_),_ms.lazy(function(){
					return contains_63(Function,_.next)
				}))
			};
			return _ms.setName(built,"Generator!")
		}());
		const empty_45Generator=exports["empty-Generator"]=function(){
			const built={};
			const doc=built.doc=`Does nothing.`;
			return _ms.set(call(function*(){}),built,"empty-Generator")
		}();
		const gen_45next_33=exports["gen-next!"]=Js_45Method(function(){
			const built={};
			const doc=built.doc=`Continues until the next \`<~\`.`;
			const impl_45symbol=built["impl-symbol"]=`next`;
			return _ms.setName(built,"gen-next!")
		}());
		const name=exports.name=`Generator!`;
		exports.default=Generator_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9HZW5lcmF0b3IhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBT0EsbUJBQVksc0JBQ1M7O0dBQXBCLG9CQUNDO0dBRUQsZ0NBQVksbUJBQUEsRUFDQztXQUFaLGlCQUFLLE9BQUQ7WUFBVSxZQUFVLFNBQVM7Ozs7O0VBRW5DLDZEQUNnQjs7R0FBZixvQkFBTTtrQkFDTixLQUNRLFdBQUE7O0VBRVQseUNBQVcsc0JBQ1M7O0dBQW5CLG9CQUFNO0dBQ04seUNBQWM7OztFQXJCZix3QkFBQTtrQkFPQSIsImZpbGUiOiJHZW5lcmF0b3JiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=