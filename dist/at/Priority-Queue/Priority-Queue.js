"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Kind","../../Type/Method","../at","../at-Type","../q","./Heap-Priority-Queue"],(exports,Kind_0,Method_1,_64_2,_64_45Type_3,_63_4,Heap_45Priority_45Queue_5)=>{
	exports._get=_ms.lazy(()=>{
		const Kind=_ms.getDefaultExport(Kind_0),_$0=_ms.getModule(Kind_0),kind_33=_ms.get(_$0,"kind!"),Method=_ms.getDefaultExport(Method_1),_$1=_ms.getModule(Method_1),self_45impl_33=_ms.get(_$1,"self-impl!"),_64=_ms.getDefaultExport(_64_2),_$2=_ms.getModule(_64_45Type_3),empty=_ms.get(_$2,"empty"),_63=_ms.getDefaultExport(_63_4),Heap_45Priority_45Queue=_ms.lazy(()=>_ms.getDefaultExport(Heap_45Priority_45Queue_5));
		const Priority_45Queue=exports.default=new (Kind)((()=>{
			const built={};
			built[`name`]="Priority-Queue";
			return built
		})());
		kind_33(Priority_45Queue,_64);
		self_45impl_33(empty,Priority_45Queue,()=>{
			return empty(_ms.unlazy(Heap_45Priority_45Queue))
		});
		const _63pop_33=exports["?pop!"]=new (Method)((()=>{
			const built={};
			built[`name`]="?pop!";
			const args=built.args=1;
			const returns=built.returns=_63;
			return built
		})());
		const name=exports.name=`Priority-Queue`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9Qcmlvcml0eS1RdWV1ZS9Qcmlvcml0eS1RdWV1ZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVNBLHVDQUFnQixLQUFJLE1BQ0ksS0FBQTs7U0FHdkIsUUFBQTs7O0VBRUQsUUFBTSxpQkFBZTtFQUVyQixlQUFXLE1BQU0saUJBQ2dCLElBQUE7VUFBaEM7O0VBR0QsaUNBQU8sS0FBSSxRQUNNLEtBQUE7O1NBQ2hCLFFBQUE7R0FDQSxzQkFBTTtHQUNOLDRCQUFTOzs7RUF6QlYsd0JBQUEiLCJmaWxlIjoiYXQvUHJpb3JpdHktUXVldWUvUHJpb3JpdHktUXVldWUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
