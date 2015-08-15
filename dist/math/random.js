"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Number","./methods"],(exports,Number_0,methods_1)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Number_0),Int=_ms.get(_$2,"Int"),_$3=_ms.getModule(methods_1),_42=_ms.get(_$3,"*"),_45=_ms.get(_$3,"-"),_43=_ms.get(_$3,"+");
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
		const name=exports.name=`random`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvbWF0aC9yYW5kb20ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFJQSxxREFBa0IsNkJBQUEsSUFDTztxQkFESDtVQUNyQixXQUFZLElBQUUsY0FBYztFQUFBO0VBRTdCLHlDQUFhLHNCQUFBLElBQVEsSUFDTztxQkFEWDtxQkFBUTtHQUN4QixXQUFPLElBQUUsSUFBSTtHQUNiLG9CQUFjLG9CQUFnQjtVQUM5QixJQUFFLElBQUk7RUFBQTtFQVZQLHdCQUFBIiwiZmlsZSI6Im1hdGgvcmFuZG9tLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=