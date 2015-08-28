"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Kind","../../Type/Method","../at","../at-Type","../q","./Heap-Priority-Queue","../../compare","../at","../q"],(exports,Kind_0,Method_1,_64_2,_64_45Type_3,_63_4,Heap_45Priority_45Queue_5,compare_6,_64_7,_63_8)=>{
	exports._get=_ms.lazy(()=>{
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),Method=_ms.getDefaultExport(Method_1),_$3=_ms.getModule(Method_1),self_45impl_33=_ms.get(_$3,"self-impl!"),_64=_ms.getDefaultExport(_64_2),_$5=_ms.getModule(_64_45Type_3),empty=_ms.get(_$5,"empty"),_63=_ms.getDefaultExport(_63_4),Heap_45Priority_45Queue=_ms.lazy(()=>_ms.getDefaultExport(Heap_45Priority_45Queue_5)),_$10=_ms.lazyGetModule(compare_6),_61_63=_ms.lazyProp(_$10,"=?"),_$11=_ms.lazyGetModule(_64_7),_43_43_33=_ms.lazyProp(_$11,"++!"),empty_63=_ms.lazyProp(_$11,"empty?"),_$12=_ms.lazyGetModule(_63_8),_63None=_ms.lazyProp(_$12,"?None"),_63some=_ms.lazyProp(_$12,"?some");
		const Priority_45Queue=new (Kind)((()=>{
			const built={};
			const doc=built.doc=`@ whose first item will always be the smallest.\nIteration order has no other guaranees,\nbut repeatedly calling ?pop! will give the values from least to greatest.`;
			const implmentor_45test=built["implmentor-test"]=function implmentor_45test(type){
				const _=empty(type);
				_ms.unlazy(_43_43_33)(_,[3,1,2]);
				_ms.assert(_ms.unlazy(_61_63),_ms.unlazy(_63some)(1),_63pop_33(_));
				_ms.assert(_ms.unlazy(_61_63),_ms.unlazy(_63some)(2),_63pop_33(_));
				_ms.assert(_ms.unlazy(_61_63),_ms.unlazy(_63some)(3),_63pop_33(_));
				_ms.assert(_ms.unlazy(empty_63),_);
				_ms.assert(_ms.unlazy(_61_63),_ms.unlazy(_63None),_63pop_33(_))
			};
			return _ms.setName(built,"Priority-Queue")
		})());
		kind_33(Priority_45Queue,_64);
		self_45impl_33(empty,Priority_45Queue,()=>{
			return empty(_ms.unlazy(Heap_45Priority_45Queue))
		});
		const _63pop_33=exports["?pop!"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`Takes a value from the front of the queue, unless empty?.`;
			const args=built.args=1;
			const returns=built.returns=_63;
			return _ms.setName(built,"?pop!")
		})());
		const name=exports.name=`Priority-Queue`;
		exports.default=Priority_45Queue;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvQC9Qcmlvcml0eS1RdWV1ZS9Qcmlvcml0eS1RdWV1ZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWFBLHVCQUFnQixLQUFJLE1BQ0ksS0FBQTs7R0FBdkIsb0JBQ0M7R0FJRCxpREFBbUIsMkJBQUEsS0FDSTtJQUF0QixRQUFJLE1BQU07MEJBQ04sRUFBRSxDQUFFLEVBQUUsRUFBRTtzREFDTSxHQUFHLFVBQUE7c0RBQ0gsR0FBRyxVQUFBO3NEQUNILEdBQUcsVUFBQTtvQ0FDTjtzREFDRSxVQUFBO0dBQUE7OztFQUVuQixRQUFNLGlCQUFlO0VBRXJCLGVBQVcsTUFBTSxpQkFDZ0IsSUFBQTtVQUFoQzs7RUFHRCxpQ0FBTyxLQUFJLFFBQ00sS0FBQTs7R0FBaEIsb0JBQU07R0FDTixzQkFBTTtHQUNOLDRCQUFTOzs7RUFyQ1Ysd0JBQUE7a0JBYUEiLCJmaWxlIjoiYXQvUHJpb3JpdHktUXVldWUvUHJpb3JpdHktUXVldWUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==