"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Function","./Type/Js-Method","./Type/Pred-Type","./Type/Type"],(exports,Function_0,Js_45Method_1,Pred_45Type_2,Type_3)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Function_0),call=_ms.get(_$2,"call"),Js_45Method=_ms.getDefaultExport(Js_45Method_1),Pred_45Type=_ms.getDefaultExport(Pred_45Type_2),_$5=_ms.getModule(Type_3),contains_63=_ms.get(_$5,"contains?");
		const Generator=Pred_45Type(()=>{
			const built={};
			const doc=built.doc=`A block of code which yields values and receives responses from a context.\nAlso known as a coroutine.`;
			const predicate=built.predicate=function predicate(_){
				return (_ms.contains(Object,_)&&contains_63(Function,_.next))
			};
			return _ms.setName(built,"Generator")
		}());
		const empty_45Generator=exports["empty-Generator"]=()=>{
			const built={};
			const doc=built.doc=`Does nothing.`;
			return _ms.set(call(function*(){}),built,"empty-Generator")
		}();
		const gen_45next_33=exports["gen-next!"]=Js_45Method(()=>{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9HZW5lcmF0b3IubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFNQSxnQkFBVyxnQkFDUzs7R0FBbkIsb0JBQ0M7R0FFRCxnQ0FBWSxtQkFBQSxFQUNDO1dBQVosY0FBSyxPQUFELElBQVMsWUFBVSxTQUFTOzs7O0VBRWxDLHVEQUNnQjs7R0FBZixvQkFBTTtrQkFDTixLQUNRLFdBQUE7O0VBRVQseUNBQVcsZ0JBQ1M7O0dBQW5CLG9CQUFNO0dBQ04seUNBQWM7OztFQXBCZix3QkFBQTtrQkFNQSIsImZpbGUiOiJHZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==