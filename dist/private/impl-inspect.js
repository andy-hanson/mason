"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../at/Set/Id-Set","./../js","./../Object","./../String","./../to-string","./../Type/Method","./../Type/Type"],(exports,Id_45Set_0,js_1,Object_2,String_3,to_45string_4,Method_5,Type_6)=>{
	exports._get=_ms.lazy(()=>{
		let Id_45Set=_ms.getDefaultExport(Id_45Set_0),_$0=_ms.getModule(js_1),js_45typeof=_ms.get(_$0,"js-typeof"),_$1=_ms.getModule(Object_2),_64properties=_ms.get(_$1,"@properties"),_64all_45properties=_ms.get(_$1,"@all-properties"),_$2=_ms.getModule(String_3),indent=_ms.get(_$2,"indent"),_$3=_ms.getModule(to_45string_4),inspect=_ms.get(_$3,"inspect"),_$4=_ms.getModule(Method_5),impl_33=_ms.get(_$4,"impl!"),_$5=_ms.getModule(Type_6),_61_62=_ms.get(_$5,"=>");
		impl_33(inspect,Object,function(){
			let _this=this;
			return (()=>{
				switch(_this.toString){
					case Object.prototype.toString:{
						let _64props=_64all_45properties(_this);
						let enumerable_45props=_61_62(Id_45Set,_64properties(_this));
						let s=`${_this.constructor.name}`;
						for(let _ of _64props){
							s=`${s}\n\t${indent(inspect_45property(_this,_,_ms.contains(enumerable_45props,_)))}`
						};
						return s
					}
					default:return _this.toString()
				}
			})()
		});
		let inspect_45property=function inspect_45property(obj,key,enumerable_63){
			let desc=Object.getOwnPropertyDescriptor(obj,key);
			let prop_45name=(enumerable_63?key:`[${key}]`);
			let str=(()=>{
				if((desc.get&&desc.set)){
					return `[Getter/Setter]`
				} else if(desc.get){
					return `[Getter]`
				} else if(desc.set){
					return `[Setter]`
				} else {
					return inspect(desc.value)
				}
			})();
			return `${prop_45name}. ${str}`
		};
		let inspect_45primitive=function inspect_45primitive(){
			let _this=this;
			return (()=>{
				switch(js_45typeof(_this)){
					case "object":{
						return `[${_this.constructor.name} ${_this}]`
					}
					default:return `${_this}`
				}
			})()
		};
		impl_33(inspect,Boolean,inspect_45primitive);
		impl_33(inspect,Number,inspect_45primitive);
		impl_33(inspect,String,function(){
			let _this=this;
			return (()=>{
				switch(js_45typeof(_this)){
					case "object":{
						return `[String ${inspect(_this.valueOf())}]`
					}
					default:return JSON.stringify(_this)
				}
			})()
		});
		exports.default=impl_33(inspect,Symbol,function(){
			let _this=this;
			return (()=>{
				switch(js_45typeof(_this)){
					case "object":{
						return `[Symbol ${inspect(_this.valueOf())}]`
					}
					default:return _this.toString()
				}
			})()
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvcHJpdmF0ZS9pbXBsLWluc3BlY3QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFVQSxRQUFNLFFBQVEsT0FDUztPQThDTDtVQTlDVjtXQThDVTtVQTdDaEIsMEJBQ3lCO01BQXhCLGFBQVMsb0JBNENNO01BM0NmLHVCQUFtQixPQUFHLFNBQVEsY0EyQ2Y7TUExQ2YsTUFBSyxHQTBDVTtNQXpDWCxRQUFBLEtBQUEsU0FDTTtTQUFILEdBQUMsUUFBTyxPQUFRLG1CQXdDUixNQXhDOEIsZUFBRyxtQkFBRDs7YUFDL0M7S0FBQTtvQkF1Q2U7Ozs7RUFuQ2xCLHVCQUFvQiw0QkFBQSxJQUFJLElBQUk7R0FDM0IsU0FBTyxnQ0FBZ0MsSUFBSTtHQUUzQyxnQkFBaUIsQ0FBQSxjQUFZLElBQUssSUFBRTtHQUVwQyxRQUNVO0lBQVQsR0FBQSxDQUFJLFVBQVMsVUFDUTtZQUFuQjtXQUNGLEdBQUEsU0FDUTtZQUFOO1dBQ0YsR0FBQSxTQUNRO1lBQU47V0FFRTtZQUFILFFBQVE7OztVQUVULEdBQUMsZ0JBQWE7O0VBRWhCLHdCQUNzQjtPQWlCSjtVQWpCVjtXQUFBLFlBaUJVO1VBaEJmLFNBQ007YUFBTCxJQWVjOztvQkFiZCxHQWFjOzs7O0VBWGxCLFFBQU0sUUFBUSxRQUFRO0VBQ3RCLFFBQU0sUUFBUSxPQUFPO0VBRXJCLFFBQU0sUUFBUSxPQUNTO09BT0w7VUFQVjtXQUFBLFlBT1U7VUFOZixTQUNNO2FBQUwsV0FBUyxRQUtLOztvQkFIZixlQUdlO0lBQUE7R0FBQTtFQUFBO2tCQURsQixRQUFNLFFBQVEsT0FDUztPQUFMO1VBQVY7V0FBQSxZQUFVO1VBQ2YsU0FDTTthQUFMLFdBQVMsUUFGSzs7b0JBQUEiLCJmaWxlIjoicHJpdmF0ZS9pbXBsLWluc3BlY3QuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
