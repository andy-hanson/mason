"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../at/Set/Id-Set","../js","../Object","../String","../to-string","../Type/Method","../Type/Type"],(exports,Id_45Set_0,js_1,Object_2,String_3,to_45string_4,Method_5,Type_6)=>{
	exports._get=_ms.lazy(()=>{
		const Id_45Set=_ms.getDefaultExport(Id_45Set_0),_$3=_ms.getModule(js_1),js_45typeof=_ms.get(_$3,"js-typeof"),_$4=_ms.getModule(Object_2),_64p=_ms.get(_$4,"@p"),_64p_45all=_ms.get(_$4,"@p-all"),_$5=_ms.getModule(String_3),indent=_ms.get(_$5,"indent"),_$6=_ms.getModule(to_45string_4),inspect=_ms.get(_$6,"inspect"),_$7=_ms.getModule(Method_5),impl_33=_ms.get(_$7,"impl!"),_$8=_ms.getModule(Type_6),_61_62=_ms.get(_$8,"=>");
		impl_33(inspect,Object,(()=>{
			const built={};
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[{
					a:1,
					b:2
				}],`Object\n\ta. 1\n\tb. 2`);
				return built
			};
			return _ms.set(function(){
				const _this=this;
				return (()=>{
					switch(_this.toString){
						case Object.prototype.toString:{
							const props=_64p_45all(_this);
							const enumerable_45props=_61_62(Id_45Set,_64p(_this));
							let s=`${_this.constructor.name}`;
							for(let _ of props){
								s=`${s}\n\t${inspect_45property(_this,_,_ms.contains(enumerable_45props,_))}`
							};
							return s
						}
						default:return _this.toString()
					}
				})()
			},built)
		})());
		const inspect_45property=function inspect_45property(obj,key,enumerable_63){
			const desc=Object.getOwnPropertyDescriptor(obj,key);
			const name=(()=>{
				if(enumerable_63){
					return key
				} else {
					return `[${key}]`
				}
			})();
			const str=(()=>{
				if((desc.get&&desc.set)){
					return `[Getter/Setter]`
				} else if(desc.get){
					return `[Getter]`
				} else if(desc.set){
					return `[Setter]`
				} else {
					const str=inspect(desc.value);
					return (()=>{
						if(_ms.contains(str,`\n`)){
							return `\n${indent(str)}`
						} else {
							return str
						}
					})()
				}
			})();
			return `${name}. ${str}`
		};
		const inspect_45primitive=function inspect_45primitive(){
			const _this=this;
			return (()=>{
				switch(js_45typeof(_this)){
					case `object`:{
						return `[${_this.constructor.name} ${_this}]`
					}
					default:return `${_this}`
				}
			})()
		};
		impl_33(inspect,Boolean,inspect_45primitive);
		impl_33(inspect,Number,inspect_45primitive);
		impl_33(inspect,String,function(){
			const _this=this;
			return (()=>{
				switch(js_45typeof(_this)){
					case `object`:{
						return `[String ${inspect(_this.valueOf())}]`
					}
					default:return JSON.stringify(_this)
				}
			})()
		});
		const name=exports.name=`impl-inspect`;
		exports.default=impl_33(inspect,Symbol,function(){
			const _this=this;
			return (()=>{
				switch(js_45typeof(_this)){
					case `object`:{
						return `[Symbol ${inspect(_this.valueOf())}]`
					}
					default:return _this.toString()
				}
			})()
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvcHJpdmF0ZS9pbXBsLWluc3BlY3QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFTQSxRQUFNLFFBQVEsT0FDTSxLQUFBOztHQUFuQixzQkFDTyxlQUFBOztvQkFBTixDQUFFO09BQUk7T0FBSztJQUFBLEdBQ1Y7OztrQkFLQSxVQUFBO1VBd0RlO1dBeERUO1lBd0RTO01BdkRmLEtBQUEsMEJBQ3lCO09BQXhCLFlBQVEsV0FzRE07T0FyRGQseUJBQW1CLE9BQUcsU0FBUSxLQXFEaEI7T0FwRGQsTUFBTyxHQW9ETztPQW5EVCxRQUFBLEtBQUEsTUFDSztVQUFILEdBQUMsUUFBTyxtQkFrREQsTUFsRHVCLGVBQUcsbUJBQUQ7O2NBQ3ZDO01BQUE7cUJBaURjOzs7OztFQTdDbEIseUJBQW9CLDRCQUFBLElBQUksSUFBSSxjQUNXO0dBQXRDLFdBQU8sZ0NBQWdDLElBQUk7R0FFM0MsV0FDVztJQUFWLEdBQUEsY0FDVztZQUFWO0lBQUEsT0FFRztZQUFGLElBQUU7OztHQUVMLFVBQ1U7SUFBVCxHQUFBLENBQUksVUFBUyxVQUNRO1lBQW5CO1dBQ0YsR0FBQSxTQUNRO1lBQU47V0FDRixHQUFBLFNBQ1E7WUFBTjtXQUVFO0tBQUgsVUFBTSxRQUFRO1lBRVY7TUFBSCxnQkFBSyxJQUFKLE1BQ087Y0FBTixLQUFHLE9BQU87YUFFUjtjQUFIO01BQUE7S0FBQTtJQUFBO0dBQUE7VUFFSCxHQUFDLFNBQVE7O0VBR1gsMEJBQ3NCLDhCQUFBO1NBaUJKO1VBakJWO1dBQUEsWUFpQlU7S0FoQmhCLEtBQUMsU0FDTzthQUFOLElBZWM7O29CQWJkLEdBYWM7Ozs7RUFYbEIsUUFBTSxRQUFRLFFBQVE7RUFDdEIsUUFBTSxRQUFRLE9BQU87RUFFckIsUUFBTSxRQUFRLE9BQ1MsVUFBQTtTQU9MO1VBUFY7V0FBQSxZQU9VO0tBTmhCLEtBQUMsU0FDTzthQUFOLFdBQVMsUUFLSzs7b0JBSGYsZUFHZTtJQUFBO0dBQUE7RUFBQTtFQXpFbEIsd0JBQUE7a0JBd0VBLFFBQU0sUUFBUSxPQUNTLFVBQUE7U0FBTDtVQUFWO1dBQUEsWUFBVTtLQUNoQixLQUFDLFNBQ087YUFBTixXQUFTLFFBRks7O29CQUFBIiwiZmlsZSI6InByaXZhdGUvaW1wbC1pbnNwZWN0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=