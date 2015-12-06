"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/q","./compare","./js","./math/methods","./Type/Method","./Type/primitive","./Type/Type"],(exports,_63_0,compare_1,js_2,methods_3,Method_4,primitive_5,Type_6)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(_63_0),_63_45_62nullable=_ms.get(_$0,"?->nullable"),_$1=_ms.getModule(compare_1),_61_63=_ms.get(_$1,"=?"),_$2=_ms.getModule(js_2),null_63=_ms.get(_$2,"null?"),_$3=_ms.getModule(methods_3),_43=_ms.get(_$3,"+"),_$4=_ms.getModule(Method_4),impl_33=_ms.get(_$4,"impl!"),_$5=_ms.getModule(primitive_5),Str=_ms.get(_$5,"Str"),_$6=_ms.getModule(Type_6),has_45instance_63=_ms.get(_$6,"has-instance?"),extract=_ms.get(_$6,"extract");
		impl_33(has_45instance_63,RegExp,function(_){
			let _this=this;
			return _this.test(_)
		});
		exports.default=impl_33(extract,RegExp,function(_,num_45extracteds){
			let _this=this;
			return _63_45_62nullable((_ms.hasInstance(Str,_)?_ms.some((()=>{
				let match=_this.exec(_);
				_this.lastIndex=0;
				return _63_45_62nullable(((! null_63(match)&&_61_63(match.length,_43(1,num_45extracteds)))?_ms.some((()=>{
					match.shift();
					return match
				})()):_ms.None))
			})()):_ms.None))
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvUmVnRXhwLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBU0EsUUFBTSxrQkFBYyxPQUFVLFNBQUE7T0FPNUI7VUFBQSxXQU5NO0VBQUE7a0JBRVIsUUFBTSxRQUFRLE9BQVUsU0FBQSxFQUFDO09BSXZCO1VBSEQsa0JBQWUsaUJBQUMsSUFBRCxpQkFDSTtJQUFsQixVQUVBLFdBRmM7SUFFZCxnQkFBYztXQUNkLGtCQUFlLENBQUEsQ0FBSyxFQUFJLFFBQU0sUUFBUSxPQUFHLGFBQWMsSUFBRSxFQUFFLGtDQUNnQjtLQUExRTtZQUNBO0lBQUEiLCJmaWxlIjoiUmVnRXhwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
