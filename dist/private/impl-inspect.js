"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../at/Set/Id-Set","./../Object","./../String","./../to-string","./../Type/Method","./../Type/Type"],(exports,Id_45Set_0,Object_1,String_2,to_45string_3,Method_4,Type_5)=>{
	exports._get=_ms.lazy(()=>{
		let Id_45Set=_ms.getDefaultExport(Id_45Set_0),_$0=_ms.getModule(Object_1),_64properties=_ms.get(_$0,"@properties"),_64all_45properties=_ms.get(_$0,"@all-properties"),_$1=_ms.getModule(String_2),indent=_ms.get(_$1,"indent"),_$2=_ms.getModule(to_45string_3),inspect=_ms.get(_$2,"inspect"),_$3=_ms.getModule(Method_4),impl_33=_ms.get(_$3,"impl!"),_$4=_ms.getModule(Type_5),_61_62=_ms.get(_$4,"=>");
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
			return (_ms.contains(Object,_this)?`[${_this.constructor.name} ${_this}]`:`${_this}`)
		};
		impl_33(inspect,Boolean,inspect_45primitive);
		impl_33(inspect,Number,inspect_45primitive);
		impl_33(inspect,String,function(){
			let _this=this;
			let str=JSON.stringify(_this);
			return (_ms.contains(Object,_this)?`[String ${str}]`:str)
		});
		exports.default=impl_33(inspect,Symbol,function(){
			let _this=this;
			return (_ms.contains(Object,_this)?`[Symbol ${inspect(_this.valueOf())}]`:_this.toString())
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvcHJpdmF0ZS9pbXBsLWluc3BlY3QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFTQSxRQUFNLFFBQVEsT0FDUztPQXFDNEI7VUFyQzNDO1dBcUMyQztVQXBDakQsMEJBQ3lCO01BQXhCLGFBQVMsb0JBbUN1QztNQWxDaEQsdUJBQW1CLE9BQUcsU0FBUSxjQWtDa0I7TUFqQ2hELE1BQUssR0FpQzJDO01BaEM1QyxRQUFBLEtBQUEsU0FDTTtTQUFILEdBQUMsUUFBTyxPQUFRLG1CQStCeUIsTUEvQkYsZUFBRSxtQkFBRDs7YUFDL0M7S0FBQTtvQkE4QmdEOzs7O0VBMUJuRCx1QkFBb0IsNEJBQUEsSUFBSSxJQUFJO0dBQzNCLFNBQU8sZ0NBQWdDLElBQUk7R0FFM0MsZ0JBQWlCLENBQUEsY0FBWSxJQUFLLElBQUU7R0FFcEMsUUFDVTtJQUFULEdBQUEsQ0FBSSxVQUFTLFVBQ1E7WUFBbkI7V0FDRixHQUFBLFNBQ1E7WUFBTjtXQUNGLEdBQUEsU0FDUTtZQUFOO1dBRUU7WUFBSCxRQUFROzs7VUFFVCxHQUFDLGdCQUFZOztFQUVmLHdCQUNzQjtPQVE2QjtVQVI3QyxjQUFLLE9BUXdDLE9BUmhDLElBUWdDLG1DQVJELEdBUUM7O0VBTm5ELFFBQU0sUUFBUSxRQUFRO0VBQ3RCLFFBQU0sUUFBUSxPQUFPO0VBQ3JCLFFBQU0sUUFBUSxPQUNTO09BRzRCO0dBSGxELFFBQU0sZUFHNEM7VUFGN0MsY0FBSyxPQUV3QyxPQUZoQyxXQUFTLE9BQU07RUFBQTtrQkFDbEMsUUFBTSxRQUFRLE9BQ1M7T0FBNEI7VUFBN0MsY0FBSyxPQUF3QyxPQUFoQyxXQUFVLFFBQXNCIiwiZmlsZSI6InByaXZhdGUvaW1wbC1pbnNwZWN0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
