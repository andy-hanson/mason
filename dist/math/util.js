"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../at/at","./methods","./Number"],(exports,_64_0,methods_1,Number_2)=>{
	exports._get=_ms.lazy(()=>{
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),fold=_ms.get(_$2,"fold"),_$3=_ms.getModule(methods_1),_43=_ms.get(_$3,"+"),_47=_ms.get(_$3,"/"),_$4=_ms.getModule(Number_2),incr=_ms.get(_$4,"incr");
		const average=exports.average=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,1,2]],1);
				_ms.assoc(built,[[]],Number.NaN);
				return built
			};
			return _ms.set(function average(_64vals){
				_ms.checkContains(_ms.sub(_64,Number),_64vals,"@vals");
				let sum=0;
				let count=0;
				for(let _ of _64vals){
					sum=_43(sum,_);
					count=incr(count)
				};
				return _47(sum,count)
			},built)
		})();
		const sum=exports.sum=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2]],3);
				_ms.assoc(built,[[]],0);
				return built
			};
			return _ms.set(function sum(_64vals){
				_ms.checkContains(_ms.sub(_64,Number),_64vals,"@vals");
				return fold(_64vals,0,_43)
			},built)
		})();
		const name=exports.name=`util`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tYXRoL3V0aWwubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFLQSw4QkFDUSxLQUFBOztHQUFQLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLEVBQUUsRUFBRSxJQUFTO29CQUNqQixDQUFFLElBQVM7OztrQkFDWCxpQkFBQSxRQUNlOzhCQURULElBQUU7SUFDUixRQUFRO0lBQ1IsVUFBVTtJQUNMLFFBQUEsS0FBQSxRQUNLO1NBQUYsSUFBRSxJQUFJO1dBQ0osS0FBSztJQUFBO1dBQ2YsSUFBRSxJQUFJO0dBQUE7O0VBRVIsc0JBQ0ksS0FBQTs7R0FBSCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLElBQVM7b0JBQ2YsQ0FBRSxJQUFTOzs7a0JBQ1gsYUFBQSxRQUNlOzhCQURULElBQUU7V0FDUixLQUFLLFFBQU0sRUFBRTtHQUFBOztFQXhCZix3QkFBQSIsImZpbGUiOiJtYXRoL3V0aWwuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==