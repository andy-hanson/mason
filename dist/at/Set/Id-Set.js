"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../Type/Kind","./../../Type/Type","./../at","./Set"],(exports,Kind_0,Type_1,_64_2,Set_3)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(Kind_0),kind_33=_ms.get(_$0,"kind!"),_$1=_ms.getModule(Type_1),has_45instance_63=_ms.get(_$1,"has-instance?"),_$2=_ms.getModule(_64_2),_43_43_33=_ms.get(_$2,"++!"),_45_45_33=_ms.get(_$2,"--!"),count=_ms.get(_$2,"count"),each_33=_ms.get(_$2,"each!"),empty_33=_ms.get(_$2,"empty!"),Set=_ms.getDefaultExport(Set_3);
		let Id_45Set=exports.default=global.Set;
		kind_33(Id_45Set,Set,(()=>{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXQvSWQtU2V0Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBUUEsNkJBQVE7RUFFUixRQUFNLFNBQU8sSUFDRyxLQUFBOztvQkFBZixNQUNXO1FBY1Y7V0FBQTs7b0JBWEQsVUFBVSxTQUFBO1FBV1Q7SUFWQSxRQUFNLHlCQVVOOztvQkFSRCxTQUNhO1FBT1o7SUFBQTs7b0JBSkQsVUFBVSxTQUFBO1FBSVQ7SUFIQSxRQUFNLDJCQUdOOztvQkFERCxrQkFBb0IsU0FBQTtRQUNuQjtXQUFBLFVBQUs7R0FBQSIsImZpbGUiOiJhdC9TZXQvSWQtU2V0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
