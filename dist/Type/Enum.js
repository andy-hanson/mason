"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../control","./../to-string","./Impl-Type","./Method","./Type"],(exports,control_0,to_45string_1,Impl_45Type_2,Method_3,Type_4)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(control_0),opr=_ms.get(_$0,"opr"),to_45string=_ms.getDefaultExport(to_45string_1),Impl_45Type=_ms.getDefaultExport(Impl_45Type_2),_$1=_ms.getModule(Method_3),impl_33=_ms.get(_$1,"impl!"),_$2=_ms.getModule(Type_4),contains_63=_ms.get(_$2,"contains?");
		const Enum=exports.default=(()=>{
			const _=class Enum{
				constructor(params){
					const _this=this;
					_ms.newProperty(_this,"name",params.name);
					_ms.newProperty(_this,"prototype",opr(params.prototype,_ms.lazy(()=>Object.create(Object.prototype))));
					_ms.newProperty(_this,"values",params.values);
					for(let value_45name of _this.values){
						const enum_45val=Object.create(_this.prototype);
						_ms.newProperty(enum_45val,"name",value_45name);
						_ms.newProperty(_this,`${value_45name}`,enum_45val)
					};
					_ms.newProperty(_this.prototype,"constructor",_this);
					const enum_45name=_this.name;
					impl_33(to_45string,_this,function(){
						const _this=this;
						return `${enum_45name}.${_this.name}`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9FbnVtLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBT0EsMkJBQVk7O0lBSUQsWUFBQTtXQWUyQjtxQkFBQSxhQWQ1QjtxQkFjNEIsa0JBYnZCLElBQUksOEJBQW1CLGNBQWM7cUJBYWQsZUFaMUI7S0FFTixRQUFBLGdCQVVnQyxhQVRYO01BQXhCLGlCQUFXLGNBU3dCO3NCQVJuQyxrQkFBZ0I7c0JBUW1CLE1BUDdCLEdBQUMsZUFBZTtLQUFBO3FCQU9hO0tBTHBDLGtCQUtvQztLQUpwQyxRQUFNLFlBSThCLE1BSGI7WUFHYTthQUhsQyxHQUFDLGVBR2lDOzs7Z0JBRHJDLGNBQVc7V0FDMEI7WUFBcEMsb0NBQW9DLGdCQUFXO0lBQUE7R0FBQTtnQkFuQmhDIiwiZmlsZSI6IlR5cGUvRW51bS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
