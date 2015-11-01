"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../control","./../to-string","./Impl-Type","./Method","./Type"],(exports,control_0,to_45string_1,Impl_45Type_2,Method_3,Type_4)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(control_0),opr=_ms.get(_$0,"opr"),to_45string=_ms.getDefaultExport(to_45string_1),Impl_45Type=_ms.getDefaultExport(Impl_45Type_2),_$1=_ms.getModule(Method_3),impl_33=_ms.get(_$1,"impl!"),_$2=_ms.getModule(Type_4),contains_63=_ms.get(_$2,"contains?");
		const Enum=exports.default=(()=>{
			const _=class Enum{
				constructor(params){
					_ms.newProperty(this,"name",params.name);
					_ms.newProperty(this,"prototype",opr(params.prototype,_ms.lazy(()=>Object.create(Object.prototype))));
					_ms.newProperty(this,"values",params.values);
					for(let value_45name of this.values){
						const enum_45val=Object.create(this.prototype);
						_ms.newProperty(enum_45val,"name",value_45name);
						_ms.newProperty(this,`${value_45name}`,enum_45val)
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
			_ms.kindDo(_,Impl_45Type);
			return _
		})();
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9FbnVtLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBT0EsMkJBQVk7O0lBSUEsWUFBQTtxQkFDVixZQUFRO3FCQUNSLGlCQUFhLElBQUksOEJBQW1CLGNBQWM7cUJBQ2xELGNBQVU7S0FFTCxRQUFBLGdCQUFjLFlBQ087TUFBekIsaUJBQVcsY0FBYztzQkFDekIsa0JBQWdCO3NCQUNoQixLQUFNLEdBQUMsZUFBZTtLQUFBO3FCQUN2Qiw2QkFBeUI7S0FDekIsa0JBQVk7S0FDWixRQUFNLFlBQVUsS0FDTzthQUFyQixHQUFDLGVBQVk7OztnQkFFaEIsY0FBVztXQUMwQjtZQUFwQyxvQ0FBb0MsZ0JBQVc7SUFBQTtHQUFBO2dCQW5CaEMiLCJmaWxlIjoiVHlwZS9FbnVtLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
