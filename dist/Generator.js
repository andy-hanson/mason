"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Function","./Type/Method","./Type/Pred-Type"],(exports,Function_0,Method_1,Pred_45Type_2)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Function_0),call=_ms.get(_$2,"call"),Method=_ms.getDefaultExport(Method_1),Pred_45Type=_ms.getDefaultExport(Pred_45Type_2);
		const Generator=new (Pred_45Type)(()=>{
			const built={};
			const doc=built.doc=`A block of code which yields values and receives responses from a context.\nAlso known as a coroutine.`;
			const predicate=built.predicate=function predicate(_){
				return (_ms.contains(Object,_)&&_ms.contains(Function,_.next))
			};
			return _ms.setName(built,"Generator")
		}());
		const empty_45Generator=exports["empty-Generator"]=()=>{
			const built={};
			const doc=built.doc=`Does nothing.`;
			return _ms.set(call(function*(){}),built,"empty-Generator")
		}();
		const gen_45next_33=exports["gen-next!"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=`Continues until the next \`<~\`.`;
			const impl_45symbol=built["impl-symbol"]=`next`;
			return _ms.setName(built,"gen-next!")
		}());
		const name=exports.name=`Generator`;
		exports.default=Generator;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9HZW5lcmF0b3IubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFLQSxnQkFBVyxLQUFJLGlCQUNTOztHQUF2QixvQkFDQztHQUVELGdDQUFZLG1CQUFBLEVBQ0M7V0FBWixjQUFLLE9BQUQsaUJBQWUsU0FBUDs7OztFQUVkLHVEQUNnQjs7R0FBZixvQkFBTTtrQkFDTixLQUNRLFdBQUE7O0VBRVQseUNBQVcsS0FBSSxZQUNNOztHQUFwQixvQkFBTTtHQUNOLHlDQUFjOzs7RUFuQmYsd0JBQUE7a0JBS0EiLCJmaWxlIjoiR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=