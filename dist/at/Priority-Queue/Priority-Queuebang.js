"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Kind","../../Type/Method","../atbang","../q","../../bang","../../compare","../at","../atbang","../at-Type"],function(exports,Kind_0,Method_1,_64_33_2,_63_3,_33_4,compare_5,_64_6,_64_33_7,_64_45Type_8){
	exports._get=_ms.lazy(function(){
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_$2["kind!"],Method=_ms.getDefaultExport(Method_1),_64_33=_ms.getDefaultExport(_64_33_2),_63=_ms.getDefaultExport(_63_3),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_4)
		}),_$8=_ms.lazyGetModule(compare_5),_61_63=_ms.lazyProp(_$8,"=?"),_$9=_ms.lazyGetModule(_64_6),empty_63=_ms.lazyProp(_$9,"empty?"),_$10=_ms.lazyGetModule(_64_33_7),_43_43_33=_ms.lazyProp(_$10,"++!"),_$11=_ms.lazyGetModule(_64_45Type_8),empty=_ms.lazyProp(_$11,"empty");
		const Priority_45Queue_33=Kind(function(){
			const doc="@ whose first item will always be the smallest.\nIteration order has no other guaranees,\nbut repeatedly calling ?pop! will give the values from least to greatest.";
			return {
				doc:doc,
				name:"Priority-Queue!"
			}
		}());
		kind_33(Priority_45Queue_33,_64_33);
		const _63pop_33=exports["?pop!"]=Method(function(){
			const doc="Takes a value from the front of the queue, unless empty?.";
			const args=1;
			const returns=_63;
			return {
				doc:doc,
				args:args,
				returns:returns,
				name:"?pop!"
			}
		}());
		const name=exports.name="Priority-Queue!";
		exports.default=Priority_45Queue_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1ByaW9yaXR5LVF1ZXVlL1ByaW9yaXR5LVF1ZXVlIS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBWUEsMEJBQWtCLGVBQ0k7R0FBckIsVUFDQzs7Ozs7O0VBV0YsUUFBTSxvQkFBZ0I7RUFHdEIsaUNBQU8saUJBQ007R0FBWixVQUFNO0dBQ04sV0FBTTtHQUNOLGNBQVM7Ozs7Ozs7O0VBL0JWLHdCQUFBO2tCQWlDQSIsImZpbGUiOiJhdC9Qcmlvcml0eS1RdWV1ZS9Qcmlvcml0eS1RdWV1ZWJhbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==