"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../Type/Trait","./../../Type/Type","./../at","./Set"],(exports,Trait_0,Type_1,_64_2,Set_3)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(Trait_0),trait_33=_ms.get(_$0,"trait!"),_$1=_ms.getModule(Type_1),has_45instance_63=_ms.get(_$1,"has-instance?"),_$2=_ms.getModule(_64_2),_43_43_33=_ms.get(_$2,"++!"),_45_45_33=_ms.get(_$2,"--!"),count=_ms.get(_$2,"count"),each_33=_ms.get(_$2,"each!"),empty_33=_ms.get(_$2,"empty!"),Set=_ms.getDefaultExport(Set_3);
		let Id_45Set=exports.default=global.Set;
		trait_33(Id_45Set,Set,(()=>{
			let built=new (global.Map)();
			_ms.setSub(built,count,function(){
				let _this=this;
				return _this.size
			});
			_ms.setSub(built,_43_43_33,function(_64added){
				let _this=this;
				each_33(_64added,_ms.methodBound(_this,"add"))
			});
			_ms.setSub(built,empty_33,function(){
				let _this=this;
				_this.clear()
			});
			_ms.setSub(built,_45_45_33,function(_64deleted){
				let _this=this;
				each_33(_64deleted,_ms.methodBound(_this,"delete"))
			});
			_ms.setSub(built,has_45instance_63,function(_){
				let _this=this;
				return _this.has(_)
			});
			return built
		})());
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXQvSWQtU2V0Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBUUEsNkJBQVE7RUFFUixTQUFPLFNBQU8sSUFDRyxLQUFBOztvQkFBaEIsTUFDVztRQWNWO1dBQUE7O29CQVhELFVBQVUsU0FBQTtRQVdUO0lBVkEsUUFBTSx5QkFVTjs7b0JBUkQsU0FDYTtRQU9aO0lBQUE7O29CQUpELFVBQVUsU0FBQTtRQUlUO0lBSEEsUUFBTSwyQkFHTjs7b0JBREQsa0JBQW9CLFNBQUE7UUFDbkI7V0FBQSxVQUFLO0dBQUEiLCJmaWxlIjoiYXQvU2V0L0lkLVNldC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
