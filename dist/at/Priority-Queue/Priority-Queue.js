"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Kind","../../Type/Method","../at","../q","../../compare","../at","../at-Type"],(exports,Kind_0,Method_1,_64_2,_63_3,compare_4,_64_5,_64_45Type_6)=>{
	exports._get=_ms.lazy(()=>{
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),Method=_ms.getDefaultExport(Method_1),_64=_ms.getDefaultExport(_64_2),_63=_ms.getDefaultExport(_63_3),_$7=_ms.lazyGetModule(compare_4),_61_63=_ms.lazyProp(_$7,"=?"),_$8=_ms.lazyGetModule(_64_5),_43_43_33=_ms.lazyProp(_$8,"++!"),empty_63=_ms.lazyProp(_$8,"empty?"),_$9=_ms.lazyGetModule(_64_45Type_6),empty=_ms.lazyProp(_$9,"empty");
		const Priority_45Queue=Kind(()=>{
			const built={};
			const doc=built.doc=`@ whose first item will always be the smallest.\nIteration order has no other guaranees,\nbut repeatedly calling ?pop! will give the values from least to greatest.`;
			const implementor_45test=built["implementor-test"]=function implementor_45test(type){
				const _=_ms.unlazy(empty)(type);
				_ms.unlazy(_43_43_33)(_,[3,1,2]);
				_ms.assert(_ms.unlazy(_61_63),_63(1),_63pop_33(_));
				_ms.assert(_ms.unlazy(_61_63),_63(2),_63pop_33(_));
				_ms.assert(_ms.unlazy(_61_63),_63(3),_63pop_33(_));
				_ms.assert(_ms.unlazy(empty_63),_)
			};
			return _ms.setName(built,"Priority-Queue")
		}());
		kind_33(Priority_45Queue,_64);
		const _63pop_33=exports["?pop!"]=Method(()=>{
			const built={};
			const doc=built.doc=`Takes a value from the front of the queue, unless empty?.`;
			const args=built.args=1;
			const returns=built.returns=_63;
			return _ms.setName(built,"?pop!")
		}());
		const name=exports.name=`Priority-Queue`;
		exports.default=Priority_45Queue;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1ByaW9yaXR5LVF1ZXVlL1ByaW9yaXR5LVF1ZXVlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBVUEsdUJBQWdCLFNBQ0k7O0dBQW5CLG9CQUNDO0dBR0QsbURBQW9CLDRCQUFBLEtBQ0k7SUFBdkIsMEJBQVU7MEJBQ04sRUFBRSxDQUFFLEVBQUUsRUFBRTtrQ0FDQSxJQUFFLEdBQUcsVUFBSztrQ0FDVixJQUFFLEdBQUcsVUFBSztrQ0FDVixJQUFFLEdBQUcsVUFBSztvQ0FDUDtHQUFBOzs7RUFFakIsUUFBTSxpQkFBZTtFQUdyQixpQ0FBTyxXQUNNOztHQUFaLG9CQUFNO0dBQ04sc0JBQU07R0FDTiw0QkFBUzs7O0VBN0JWLHdCQUFBO2tCQVVBIiwiZmlsZSI6ImF0L1ByaW9yaXR5LVF1ZXVlL1ByaW9yaXR5LVF1ZXVlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=