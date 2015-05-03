"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Kind","../../Type/Method","../atbang","../../bang","../../compare","../at","../atbang","../at-Type","../q"],function(exports,Kind_0,Method_1,_64_33_2,_33_3,compare_4,_64_5,_64_33_6,_64_45Type_7,_63_8){
	exports._get=_ms.lazy(function(){
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),Method=_ms.getDefaultExport(Method_1),_64_33=_ms.getDefaultExport(_64_33_2),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_3)
		}),_$7=_ms.lazyGetModule(compare_4),_61_63=_ms.lazyProp(_$7,"=?"),_$8=_ms.lazyGetModule(_64_5),empty_63=_ms.lazyProp(_$8,"empty?"),_$9=_ms.lazyGetModule(_64_33_6),_43_43_33=_ms.lazyProp(_$9,"++!"),_$10=_ms.lazyGetModule(_64_45Type_7),empty=_ms.lazyProp(_$10,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_8)
		});
		const exports={};
		const Priority_45Queue_33=Kind(function(){
			const doc="@ whose first item will always be the smallest.\nIteration order has no other guaranees,\nbut repeatedly calling ?pop! will give the values from least to greatest.";
			const implementor_45test=function(type){
				const _=_ms.unlazy(empty)(type);
				_ms.unlazy(_43_43_33)(_,[3,1,2]);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.unlazy(_63)(1),_63pop_33(_));
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.unlazy(_63)(2),_63pop_33(_));
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.unlazy(_63)(3),_63pop_33(_));
				return _ms.unlazy(_33)(_ms.unlazy(empty_63),_)
			};
			return {
				doc:doc,
				"implementor-test":implementor_45test,
				displayName:"Priority-Queue!"
			}
		}());
		kind_33(Priority_45Queue_33,_64_33);
		const _63pop_33=exports["?pop!"]=Method(function(){
			const doc="Takes a value from the front of the queue, unless empty?.";
			return {
				doc:doc,
				displayName:"?pop!"
			}
		}());
		exports.default=Priority_45Queue_33;
		const displayName=exports.displayName="Priority-Queue!";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1ByaW9yaXR5LVF1ZXVlL1ByaW9yaXR5LVF1ZXVlIS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7aUNBWUE7Ozs7Ozs7RUFBQSwwQkFBa0IsZUFBSTtHQUNyQixVQUNDO0dBR0QseUJBQW1CLFNBQUEsS0FDbEI7SUFBQSwwQkFBSTswQkFDQSxFQUFFLENBQUUsRUFBRSxFQUFFO3VEQUNKLEdBQVIsVUFBVzt1REFDSCxHQUFSLFVBQVc7dURBQ0gsR0FBUixVQUFXO2dEQUNGO0dBQUE7VUFYVzs7Ozs7O0VBYXRCLFFBQUEsb0JBQUE7RUFHQSxpQ0FBTyxpQkFBTTtHQUNaLFVBQU07VUFETTs7Ozs7a0JBR2I7RUEvQkEsc0NBQUEiLCJmaWxlIjoiYXQvUHJpb3JpdHktUXVldWUvUHJpb3JpdHktUXVldWViYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=