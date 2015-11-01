"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../Type/Method","./../at","./../at-Type","./../q","./Heap-Priority-Queue"],(exports,Method_0,_64_1,_64_45Type_2,_63_3,Heap_45Priority_45Queue_4)=>{
	exports._get=_ms.lazy(()=>{
		const Method=_ms.getDefaultExport(Method_0),_64=_ms.getDefaultExport(_64_1),_$0=_ms.getModule(_64_45Type_2),empty=_ms.get(_$0,"empty"),_63=_ms.getDefaultExport(_63_3),Heap_45Priority_45Queue=_ms.lazy(()=>_ms.getDefaultExport(Heap_45Priority_45Queue_4));
		const Priority_45Queue=exports.default=_ms.kind("Priority-Queue",[_64],{
			[_ms.symbol(empty)](){
				const _this=this;
				return empty(_ms.unlazy(Heap_45Priority_45Queue))
			}
		},{});
		const _63pop_33=exports["?pop!"]=new (Method)((()=>{
			const built={};
			built.name="?pop!";
			const args=built.args=1;
			const returns=built.returns=_63;
			return built
		})());
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9Qcmlvcml0eS1RdWV1ZS9Qcmlvcml0eS1RdWV1ZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVFBLGtFQUFxQjtlQU1uQjtVQXlCTztXQXhCTjs7O0VBR0gsaUNBQU8sS0FBSSxRQUNNLEtBQUE7O2NBQ2hCO0dBQ0Esc0JBQU07R0FDTiw0QkFBUyIsImZpbGUiOiJhdC9Qcmlvcml0eS1RdWV1ZS9Qcmlvcml0eS1RdWV1ZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
