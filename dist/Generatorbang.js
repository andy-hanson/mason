"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Function","./Type/Js-Method","./Type/Pred-Type","./Type/Type"],function(exports,Function_0,Js_45Method_1,Pred_45Type_2,Type_3){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Function_0),call=_ms.get(_$2,"call"),Js_45Method=_ms.getDefaultExport(Js_45Method_1),Pred_45Type=_ms.getDefaultExport(Pred_45Type_2),_$5=_ms.getModule(Type_3),contains_63=_ms.get(_$5,"contains?");
		const Generator_33=Pred_45Type(function(){
			const built={};
			const doc=built.doc=`A block of code which yields values and receives responses from a context.\nAlso known as a coroutine.`;
			const predicate=built.predicate=function predicate(_){
				return (_ms.contains(Object,_)&&contains_63(Function,_.next))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9HZW5lcmF0b3IhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBTUEsbUJBQVksc0JBQ1M7O0dBQXBCLG9CQUNDO0dBRUQsZ0NBQVksbUJBQUEsRUFDQztXQUFaLGNBQUssT0FBRCxJQUFTLFlBQVUsU0FBUzs7OztFQUVsQyw2REFDZ0I7O0dBQWYsb0JBQU07a0JBQ04sS0FDUSxXQUFBOztFQUVULHlDQUFXLHNCQUNTOztHQUFuQixvQkFBTTtHQUNOLHlDQUFjOzs7RUFwQmYsd0JBQUE7a0JBTUEiLCJmaWxlIjoiR2VuZXJhdG9yYmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9