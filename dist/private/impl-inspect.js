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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvcHJpdmF0ZS9pbXBsLWluc3BlY3QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFTQSxRQUFNLFFBQVEsT0FDTSxLQUFBOztHQUFuQixzQkFDTyxlQUFBOztvQkFBTixDQUFFO09BQUk7T0FBSztJQUFBLEdBQ1Y7OztrQkFLQSxVQUFBO1VBd0RlO1dBeERUO1lBd0RTO1dBdkRmLDBCQUN5QjtPQUF4QixZQUFRLFdBc0RNO09BckRkLHlCQUFtQixPQUFHLFNBQVEsS0FxRGhCO09BcERkLE1BQU8sR0FvRE87T0FuRFQsUUFBQSxLQUFBLE1BQ0s7VUFBSCxHQUFDLFFBQU8sbUJBa0RELE1BbER1QixlQUFHLG1CQUFEOztjQUN2QztNQUFBO3FCQWlEYzs7Ozs7RUE3Q2xCLHlCQUFvQiw0QkFBQSxJQUFJLElBQUksY0FDVztHQUF0QyxXQUFPLGdDQUFnQyxJQUFJO0dBRTNDLFdBQ1c7SUFBVixHQUFBLGNBQ1c7WUFBVjtJQUFBLE9BRUc7WUFBRixJQUFFOzs7R0FFTCxVQUNVO0lBQVQsR0FBQSxDQUFJLFVBQVMsVUFDUTtZQUFuQjtXQUNGLEdBQUEsU0FDUTtZQUFOO1dBQ0YsR0FBQSxTQUNRO1lBQU47V0FFRTtLQUFILFVBQU0sUUFBUTtZQUVWO01BQUgsZ0JBQUssSUFBSixNQUNPO2NBQU4sS0FBRyxPQUFPO2FBRVI7Y0FBSDtNQUFBO0tBQUE7SUFBQTtHQUFBO1VBRUgsR0FBQyxTQUFROztFQUdYLDBCQUNzQiw4QkFBQTtTQWlCSjtVQWpCVjtXQUFBLFlBaUJVO1VBaEJmLFNBQ087YUFBTixJQWVjOztvQkFiZCxHQWFjOzs7O0VBWGxCLFFBQU0sUUFBUSxRQUFRO0VBQ3RCLFFBQU0sUUFBUSxPQUFPO0VBRXJCLFFBQU0sUUFBUSxPQUNTLFVBQUE7U0FPTDtVQVBWO1dBQUEsWUFPVTtVQU5mLFNBQ087YUFBTixXQUFTLFFBS0s7O29CQUhmLGVBR2U7SUFBQTtHQUFBO0VBQUE7RUF6RWxCLHdCQUFBO2tCQXdFQSxRQUFNLFFBQVEsT0FDUyxVQUFBO1NBQUw7VUFBVjtXQUFBLFlBQVU7VUFDZixTQUNPO2FBQU4sV0FBUyxRQUZLOztvQkFBQSIsImZpbGUiOiJwcml2YXRlL2ltcGwtaW5zcGVjdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9