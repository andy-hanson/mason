"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../control","../Object","../to-string","./Impl-Type","./Kind","./Method","./Type"],(exports,control_0,Object_1,to_45string_2,Impl_45Type_3,Kind_4,Method_5,Type_6)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(control_0),opr=_ms.get(_$0,"opr"),_$1=_ms.getModule(Object_1),p_43_33=_ms.get(_$1,"p+!"),to_45string=_ms.getDefaultExport(to_45string_2),Impl_45Type=_ms.getDefaultExport(Impl_45Type_3),_$2=_ms.getModule(Kind_4),kind_33=_ms.get(_$2,"kind!"),_$3=_ms.getModule(Method_5),impl_33=_ms.get(_$3,"impl!"),_$4=_ms.getModule(Type_6),contains_63=_ms.get(_$4,"contains?");
		const Enum=exports.default=(()=>{
			const _=class Enum{
				constructor(params){
					_ms.newProperty(this,"name",params.name);
					_ms.newProperty(this,"prototype",opr(params.prototype,_ms.lazy(()=>Object.create(Object.prototype))));
					_ms.newProperty(this,"values",params.values);
					for(let value_45name of this.values){
						const enum_45val=Object.create(this.prototype);
						_ms.newProperty(enum_45val,"name",value_45name);
						p_43_33(this,value_45name,enum_45val)
					};
					_ms.newProperty(this.prototype,"constructor",this);
					const enum_45name=this.name;
					impl_33(to_45string,this,function(){
						return `${enum_45name}.${this.name}`
					})
				}
				[_ms.symbol(contains_63)](_){
					const _this=this;
					return Object.prototype.isPrototypeOf.call(_this.prototype,_)
				}
			};
			kind_33(_,Impl_45Type);
			return _
		})();
		const name=exports.name=`Enum`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9FbnVtLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBU0EsMkJBQ1csS0FHUDtTQURIO0lBR1csWUFBQSxPQUNNO3FCQUFoQixZQUFRO3FCQUNSLGlCQUFhLElBQUksOEJBYWpCO3FCQVpBLGNBQVU7S0FFTCxRQUFBLGdCQUFjLFlBQ087TUFBekIsaUJBU0QsY0FUMEI7c0JBQ3pCLGtCQUFnQjtNQUNoQixRQUFJLEtBQUssYUFBVztLQUFBO3FCQUNyQiw2QkFBeUI7S0FDekIsa0JBQVk7S0FDWixRQUFNLFlBQVUsS0FDTyxVQUFBO2FBQXJCLEdBQUMsZUFBWTs7O0lBRWhCLFlBQUEsY0FBVyxFQUNDO1dBQXlCO1lBQXBDLG9DQUFvQyxnQkFBVztJQUFBO0dBQUE7R0FqQi9DLFFBQU0sRUFBRTtVQURUO0VBQUE7RUFaRCx3QkFBQSIsImZpbGUiOiJUeXBlL0VudW0uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
