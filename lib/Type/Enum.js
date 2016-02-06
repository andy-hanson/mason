"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../control","./../to-string","./Impl-Type","./Method","./Type"],(exports,control_0,to_45string_1,Impl_45Type_2,Method_3,Type_4)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(control_0),opr=_ms.get(_$0,"opr"),to_45string=_ms.getDefaultExport(to_45string_1),Impl_45Type=_ms.getDefaultExport(Impl_45Type_2),_$1=_ms.getModule(Method_3),impl_33=_ms.get(_$1,"impl!"),_$2=_ms.getModule(Type_4),has_45instance_63=_ms.get(_$2,"has-instance?");
		let Enum=exports.default=(()=>{
			let _=class Enum{
				constructor(params){
					let _this=this;
					_ms.newProperty(_this,"name",params.name);
					_ms.newProperty(_this,"prototype",opr(params.prototype,_ms.lazy(()=>Object.create(Object.prototype))));
					_ms.newProperty(_this,"values",params.values);
					for(let value_45name of _this.values){
						let enum_45val=Object.create(_this.prototype);
						_ms.newProperty(enum_45val,"name",value_45name);
						_ms.newProperty(_this,`${value_45name}`,enum_45val)
					};
					_ms.newProperty(_this.prototype,"constructor",_this);
					let enum_45name=_this.name;
					impl_33(to_45string,_this,function(){
						let _this=this;
						return `${enum_45name}.${_this.name}`
					})
				}
				[_ms.symbol(has_45instance_63)](_){
					let _this=this;
					return Object.prototype.isPrototypeOf.call(_this.prototype,_)
				}
			};
			_ms.traitDo(_,Impl_45Type);
			return _
		})();
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9FbnVtLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBT0EseUJBQVk7O0lBSUQsWUFBQSxPQUNNOztxQkFBZixhQUFRO3FCQUNSLGtCQUFhLElBQUksOEJBQW1CLGNBQWM7cUJBQ2xELGVBQVU7S0FFTixRQUFBLGdCQUFjLGFBQ087TUFBeEIsZUFBVyxjQUFjO3NCQUN6QixrQkFBZ0I7c0JBQ2hCLE1BQU0sR0FBQyxlQUFjO0tBQUE7cUJBQ3RCLDhCQUF5QjtLQUN6QixnQkFBWTtLQUNaLFFBQU0sWUFBVSxNQUNPLFVBQUE7O2FBQXJCLEdBQUMsZUFBWTs7O0lBRWhCLFlBQUMsb0JBQWlCLEVBQ0E7O1lBQWpCLG9DQUFvQyxnQkFBWTtJQUFBO0dBQUE7aUJBbkJoQyIsImZpbGUiOiJUeXBlL0VudW0uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
