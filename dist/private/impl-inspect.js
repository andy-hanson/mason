"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../at/Set/Id-Set","../js","../Object","../String","../to-string","../Type/Method","../Type/Type"],(exports,Id_45Set_0,js_1,Object_2,String_3,to_45string_4,Method_5,Type_6)=>{
	exports._get=_ms.lazy(()=>{
		const Id_45Set=_ms.getDefaultExport(Id_45Set_0),_$0=_ms.getModule(js_1),js_45typeof=_ms.get(_$0,"js-typeof"),_$1=_ms.getModule(Object_2),_64p=_ms.get(_$1,"@p"),_64p_45all=_ms.get(_$1,"@p-all"),_$2=_ms.getModule(String_3),indent=_ms.get(_$2,"indent"),_$3=_ms.getModule(to_45string_4),inspect=_ms.get(_$3,"inspect"),_$4=_ms.getModule(Method_5),impl_33=_ms.get(_$4,"impl!"),_$5=_ms.getModule(Type_6),_61_62=_ms.get(_$5,"=>");
		impl_33(inspect,Object,(()=>{
			const built={};
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[{
					a:1,
					b:2
				}],`Object
	a. 1
	b. 2`);
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
			const prop_45name=(()=>{
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
			return `${prop_45name}. ${str}`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvcHJpdmF0ZS9pbXBsLWluc3BlY3QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFVQSxRQUFNLFFBb0JFLE9BbkJZLEtBQUE7O0dBQW5CLHNCQUNPLGVBQUE7O29CQUFOLENBQUU7T0FBSTtPQUFLO0lBQUEsR0FDVjs7O2tCQUtBLFVBQUE7VUF3RGU7V0F4RFQ7WUF3RFM7V0E1Q1YsMEJBVm9CO09BQXhCLFlBQVEsV0FzRE07T0FyRGQseUJBQW1CLE9BQUcsU0FBUSxLQXFEaEI7T0FwRGQsTUFBTyxHQW9ETztPQW5EVCxRQUFBLEtBQUEsTUFDSztVQUFILEdBQUMsUUFBTyxtQkFrREQsTUFsRHVCLGVBQUcsbUJBQUQ7O2NBQ3ZDO01BQUE7cUJBaURjOzs7OztFQTdDbEIseUJBQW9CLDRCQUFBLElBQUksSUFBSSxjQUNXO0dBQXRDLFdBQU8sZ0NBQWdDLElBQUk7R0FFM0Msa0JBQ2dCO0lBQWYsR0FBQSxjQUNXO1lBQVY7SUFBQSxPQUVHO1lBQUYsSUFBRTs7O0dBRUwsVUFDVTtJQUFULEdBQUEsQ0FBSSxVQUFTLFVBQ1E7WUFBbkI7V0FDRixHQUFBLFNBQ1E7WUFBTjtXQUNGLEdBQUEsU0FDUTtZQUFOO1dBRUU7S0FBSCxVQUFNLFFBQVE7WUFFVjtNQUFILGdCQUFLLElBQUosTUFDTztjQUFOLEtBQUcsT0FBTzthQUVSO2NBQUg7TUFBQTtLQUFBO0lBQUE7R0FBQTtVQUVILEdBQUMsZ0JBQWE7O0VBR2hCLDBCQUNzQiw4QkFBQTtTQWlCSjtVQWpCVjtXQUFBLFlBaUJVO1VBaEJmLFNBQ087YUFBTixJQWVjOztvQkFiZCxHQWFjOzs7O0VBWGxCLFFBQU0sUUFBUSxRQUFRO0VBQ3RCLFFBQU0sUUFBUSxPQUFPO0VBRXJCLFFBQU0sUUFBUSxPQUNTLFVBQUE7U0FPTDtVQVBWO1dBQUEsWUFPVTtVQU5mLFNBQ087YUFBTixXQUFTLFFBS0s7O29CQUhmLGVBR2U7SUFBQTtHQUFBO0VBQUE7RUExRWxCLHdCQUFBO2tCQXlFQSxRQUFNLFFBQVEsT0FDUyxVQUFBO1NBQUw7VUFBVjtXQUFBLFlBQVU7VUFDZixTQUNPO2FBQU4sV0FBUyxRQUZLOztvQkFBQSIsImZpbGUiOiJwcml2YXRlL2ltcGwtaW5zcGVjdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9