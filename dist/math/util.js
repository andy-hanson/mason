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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvbWF0aC91dGlsLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBS0EsOEJBQ1EsS0FBQTs7R0FBUCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLEVBQUUsSUFBUztvQkFDakIsQ0FBRSxJQUFTOzs7a0JBQ1gsaUJBQUEsUUFDZTs4QkFEVCxJQUFFO0lBQ1IsUUFBUTtJQUNSLFVBQVU7SUFDTCxRQUFBLEtBQUEsUUFDSztTQUFGLElBQUUsSUFBSTtXQUNKLEtBQUs7SUFBQTtXQUNmLElBQUUsSUFBSTtHQUFBOztFQUVSLHNCQUNJLEtBQUE7O0dBQUgsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsRUFBRSxJQUFTO29CQUNmLENBQUUsSUFBUzs7O2tCQUNYLGFBQUEsUUFDZTs4QkFEVCxJQUFFO1dBQ1IsS0FBSyxRQUFNLEVBQUU7R0FBQTs7RUF4QmYsd0JBQUEiLCJmaWxlIjoibWF0aC91dGlsLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=