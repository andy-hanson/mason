"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../compare","./Number","./methods"],(exports,compare_0,Number_1,methods_2)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(compare_0),_60_63=_ms.get(_$0,"<?"),_$1=_ms.getModule(Number_1),Int=_ms.get(_$1,"Int"),_$2=_ms.getModule(methods_2),_42=_ms.get(_$2,"*"),_45=_ms.get(_$2,"-"),_43=_ms.get(_$2,"+");
		let random_45int_45upto=exports["random-int-upto"]=function random_45int_45upto(max){
			_ms.checkInstance(Int,max,"max");
			return Math.floor(_42(Math.random(),max))
		};
		let random_45int=exports["random-int"]=function random_45int(min,max){
			_ms.checkInstance(Int,min,"min");
			_ms.checkInstance(Int,max,"max");
			let diff=_45(max,min);
			let random_45diff=random_45int_45upto(diff);
			return _43(min,random_45diff)
		};
		let random_45bool=exports["random-bool"]=function random_45bool(){
			return _60_63(Math.random(),0.5)
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvbWF0aC9yYW5kb20ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFLQSxtREFBa0IsNkJBQUEsSUFDTztxQkFESDtVQUNyQixXQUFZLElBQUUsY0FBYztFQUFBO0VBRTdCLHVDQUFhLHNCQUFBLElBQVEsSUFDTztxQkFEWDtxQkFBUTtHQUN4QixTQUFPLElBQUUsSUFBSTtHQUNiLGtCQUFjLG9CQUFnQjtVQUM5QixJQUFFLElBQUk7RUFBQTtFQUVQLHlDQUNjLHdCQUFBO1VBQWIsT0FBRyxjQUFjO0VBQUEiLCJmaWxlIjoibWF0aC9yYW5kb20uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
