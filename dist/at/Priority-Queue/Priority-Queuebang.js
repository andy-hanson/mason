"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Kind","../../Type/Method","../atbang","../q","../../compare","../at","../atbang","../at-Type"],function(exports,Kind_0,Method_1,_64_33_2,_63_3,compare_4,_64_5,_64_33_6,_64_45Type_7){
	exports._get=_ms.lazy(function(){
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),Method=_ms.getDefaultExport(Method_1),_64_33=_ms.getDefaultExport(_64_33_2),_63=_ms.getDefaultExport(_63_3),_$7=_ms.lazyGetModule(compare_4),_61_63=_ms.lazyProp(_$7,"=?"),_$8=_ms.lazyGetModule(_64_5),empty_63=_ms.lazyProp(_$8,"empty?"),_$9=_ms.lazyGetModule(_64_33_6),_43_43_33=_ms.lazyProp(_$9,"++!"),_$10=_ms.lazyGetModule(_64_45Type_7),empty=_ms.lazyProp(_$10,"empty");
		const Priority_45Queue_33=Kind(function(){
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
			return _ms.setName(built,"Priority-Queue!")
		}());
		kind_33(Priority_45Queue_33,_64_33);
		const _63pop_33=exports["?pop!"]=Method(function(){
			const built={};
			const doc=built.doc=`Takes a value from the front of the queue, unless empty?.`;
			const args=built.args=1;
			const returns=built.returns=_63;
			return _ms.setName(built,"?pop!")
		}());
		const name=exports.name=`Priority-Queue!`;
		exports.default=Priority_45Queue_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1ByaW9yaXR5LVF1ZXVlL1ByaW9yaXR5LVF1ZXVlIS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVdBLDBCQUFpQixlQUNJOztHQUFwQixvQkFDQztHQUdELG1EQUFvQiw0QkFBQSxLQUNJO0lBQXZCLDBCQUFVOzBCQUNOLEVBQUUsQ0FBRSxFQUFFLEVBQUU7a0NBQ0EsSUFBRSxHQUFHLFVBQUs7a0NBQ1YsSUFBRSxHQUFHLFVBQUs7a0NBQ1YsSUFBRSxHQUFHLFVBQUs7b0NBQ1A7R0FBQTs7O0VBRWpCLFFBQU0sb0JBQWdCO0VBR3RCLGlDQUFPLGlCQUNNOztHQUFaLG9CQUFNO0dBQ04sc0JBQU07R0FDTiw0QkFBUzs7O0VBOUJWLHdCQUFBO2tCQVdBIiwiZmlsZSI6ImF0L1ByaW9yaXR5LVF1ZXVlL1ByaW9yaXR5LVF1ZXVlYmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9