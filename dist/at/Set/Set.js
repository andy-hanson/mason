"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../Type/Type","./../at","./Hash-Set"],(exports,compare_0,Type_1,_64_2,Hash_45Set_3)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),same_63=_ms.get(_$0,"same?"),_$1=_ms.getModule(Type_1),_61_62=_ms.get(_$1,"=>"),has_45instance_63=_ms.get(_$1,"has-instance?"),type_45of=_ms.get(_$1,"type-of"),_64=_ms.getDefaultExport(_64_2),_$2=_ms.getModule(_64_2),all_63=_ms.get(_$2,"all?"),count=_ms.get(_$2,"count"),empty=_ms.get(_$2,"empty"),_64keep=_ms.get(_$2,"@keep"),Hash_45Set=_ms.lazy(()=>_ms.getDefaultExport(Hash_45Set_3));
		let Set=exports.default=_ms.trait("Set",[_64],{
			[_ms.symbol(empty)](){
				let _this=this;
				return empty(_ms.unlazy(Hash_45Set))
			}
		},{
			[_ms.symbol(_61_63)](other){
				let _this=this;
				return ((same_63(type_45of,_this,other)&&same_63(count,_this,other))&&all_63(_this,_=>{
					return _ms.hasInstance(other,_)
				}))
			}
		});
		let intersect=exports.intersect=_ms.method("intersect",["@intersect-with"],function(_64intersect_45with){
			let _this=this;
			return _64keep(_this,_ms.sub(has_45instance_63,_61_62(Set,_64intersect_45with)))
		});
		let set_61_63=exports["set=?"]=function set_61_63(a,b){
			_ms.checkInstance(_64,a,"a");
			_ms.checkInstance(_64,b,"b");
			return _61_63(_61_62(Set,a),_61_62(Set,b))
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXQvU2V0Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBT0EseUNBQVc7ZUFLVCxTQUNPO1FBU0Y7V0FUSjs7O2VBRUYsU0FBSSxNQUNLO1FBTUg7V0FMTCxFQUFLLFFBQU0sVUFLTixNQUxtQixRQUFRLFFBQU0sTUFLakMsTUFMNEMsU0FBUSxPQUtwRCxNQUxnRSxHQUNBOzRCQUFuRSxNQUFEO0lBQUE7R0FBQTtFQUFBO0VBRUgsMkVBQW1CLFNBQUEsb0JBQ2U7T0FDM0I7VUFBTixRQUFNLGNBQUssa0JBQWUsT0FBRyxJQUFJO0VBQUE7RUFFbEMsK0JBQVEsbUJBQUEsRUFBSSxFQUNHO3FCQURMO3FCQUFJO1VBRWIsT0FBSSxPQUFHLElBQUksR0FBSSxPQUFHLElBQUk7RUFBQSIsImZpbGUiOiJhdC9TZXQvU2V0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
