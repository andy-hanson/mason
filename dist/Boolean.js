"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Type/primitive"],(exports,primitive_0)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(primitive_0),Bool=_ms.get(_$0,"Bool");
		let implies=exports.implies=function implies(if_63,then_63){
			_ms.checkInstance(Bool,if_63,"if?");
			return (if_63?_ms.unlazy(then_63):true)
		};
		let xor=exports.xor=function xor(a,b){
			_ms.checkInstance(Bool,a,"a");
			_ms.checkInstance(Bool,b,"b");
			return (a?! b:b)
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQm9vbGVhbi5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQUdBLDRCQUFVLGlCQUFBLE1BQVM7cUJBQUw7VUFHUixDQUFBLDBCQUFVO0VBQUE7RUFFaEIsb0JBQU0sYUFBQSxFQUFPO3FCQUFMO3FCQUFPO1VBRVQsQ0FBQSxFQUFHLEVBQUksRUFBRztFQUFBIiwiZmlsZSI6IkJvb2xlYW4uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
