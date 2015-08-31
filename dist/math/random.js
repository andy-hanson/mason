"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","./Number","./methods"],(exports,compare_0,Number_1,methods_2)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_60_63=_ms.get(_$2,"<?"),_$3=_ms.getModule(Number_1),Int=_ms.get(_$3,"Int"),_$4=_ms.getModule(methods_2),_42=_ms.get(_$4,"*"),_45=_ms.get(_$4,"-"),_43=_ms.get(_$4,"+");
		const random_45int_45upto=exports["random-int-upto"]=function random_45int_45upto(max){
			_ms.checkContains(Int,max,"max");
			return Math.floor(_42(Math.random(),max))
		};
		const random_45int=exports["random-int"]=function random_45int(min,max){
			_ms.checkContains(Int,min,"min");
			_ms.checkContains(Int,max,"max");
			const diff=_45(max,min);
			const random_45diff=random_45int_45upto(diff);
			return _43(min,random_45diff)
		};
		const random_45bool=exports["random-bool"]=function random_45bool(){
			return _60_63(Math.random(),0.5)
		};
		const name=exports.name=`random`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvbWF0aC9yYW5kb20ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFLQSxxREFBa0IsNkJBQUEsSUFDTztxQkFESDtVQUNyQixXQUFZLElBQUUsY0FBYztFQUFBO0VBRTdCLHlDQUFhLHNCQUFBLElBQVEsSUFDTztxQkFEWDtxQkFBUTtHQUN4QixXQUFPLElBQUUsSUFBSTtHQUNiLG9CQUFjLG9CQUFnQjtVQUM5QixJQUFFLElBQUk7RUFBQTtFQUVQLDJDQUNjLHdCQUFBO1VBQWIsT0FBRyxjQUFjO0VBQUE7RUFkbEIsd0JBQUEiLCJmaWxlIjoibWF0aC9yYW5kb20uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==