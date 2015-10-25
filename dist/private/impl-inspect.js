"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../at/Set/Id-Set","./../js","./../Object","./../String","./../to-string","./../Type/Method","./../Type/Type"],(exports,Id_45Set_0,js_1,Object_2,String_3,to_45string_4,Method_5,Type_6)=>{
	exports._get=_ms.lazy(()=>{
		const Id_45Set=_ms.getDefaultExport(Id_45Set_0),_$0=_ms.getModule(js_1),js_45typeof=_ms.get(_$0,"js-typeof"),_$1=_ms.getModule(Object_2),_64properties=_ms.get(_$1,"@properties"),_64all_45properties=_ms.get(_$1,"@all-properties"),_$2=_ms.getModule(String_3),indent=_ms.get(_$2,"indent"),_$3=_ms.getModule(to_45string_4),inspect=_ms.get(_$3,"inspect"),_$4=_ms.getModule(Method_5),impl_33=_ms.get(_$4,"impl!"),_$5=_ms.getModule(Type_6),_61_62=_ms.get(_$5,"=>");
		impl_33(inspect,Object,function(){
			const _this=this;
			return (()=>{
				switch(_this.toString){
					case Object.prototype.toString:{
						const props=_64all_45properties(_this);
						const enumerable_45props=_61_62(Id_45Set,_64properties(_this));
						let s=`${_this.constructor.name}`;
						for(let _ of props){
							s=`${s}\n\t${inspect_45property(_this,_,_ms.contains(enumerable_45props,_))}`
						};
						return s
					}
					default:return _this.toString()
				}
			})()
		});
		const inspect_45property=function inspect_45property(obj,key,enumerable_63){
			const desc=Object.getOwnPropertyDescriptor(obj,key);
			const prop_45name=(enumerable_63?key:`[${key}]`);
			const str=(()=>{
				if((desc.get&&desc.set)){
					return `[Getter/Setter]`
				} else if(desc.get){
					return `[Getter]`
				} else if(desc.set){
					return `[Setter]`
				} else {
					const str=inspect(desc.value);
					return (_ms.contains(str,`\n`)?`\n${indent(str)}`:str)
				}
			})();
			return `${prop_45name}. ${str}`
		};
		const inspect_45primitive=function inspect_45primitive(){
			const _this=this;
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
			const _this=this;
			return (()=>{
				switch(js_45typeof(_this)){
					case "object":{
						return `[String ${inspect(_this.valueOf())}]`
					}
					default:return JSON.stringify(_this)
				}
			})()
		});
		const impl_45inspect=exports.default=impl_33(inspect,Symbol,function(){
			const _this=this;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvcHJpdmF0ZS9pbXBsLWluc3BlY3QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFVQSxRQUFNLFFBQVEsT0FDUztTQWdETDtVQWhEVjtXQWdEVTtVQS9DaEIsMEJBQ3lCO01BQXhCLFlBQVEsb0JBOENPO01BN0NmLHlCQUFtQixPQUFHLFNBQVEsY0E2Q2Y7TUE1Q2YsTUFBTyxHQTRDUTtNQTNDVixRQUFBLEtBQUEsTUFDSztTQUFILEdBQUMsUUFBTyxtQkEwQ0EsTUExQ3NCLGVBQUcsbUJBQUQ7O2FBQ3ZDO0tBQUE7b0JBeUNlOzs7O0VBckNsQix5QkFBb0IsNEJBQUEsSUFBSSxJQUFJO0dBQzNCLFdBQU8sZ0NBQWdDLElBQUk7R0FFM0Msa0JBQWlCLENBQUEsY0FBWSxJQUFLLElBQUU7R0FFcEMsVUFDVTtJQUFULEdBQUEsQ0FBSSxVQUFTLFVBQ1E7WUFBbkI7V0FDRixHQUFBLFNBQ1E7WUFBTjtXQUNGLEdBQUEsU0FDUTtZQUFOO1dBRUU7S0FBSCxVQUFNLFFBQVE7WUFDVCxjQUFLLElBQUosTUFBUyxLQUFHLE9BQU8sT0FBTTtJQUFBO0dBQUE7VUFFaEMsR0FBQyxnQkFBYTs7RUFHaEIsMEJBQ3NCO1NBaUJKO1VBakJWO1dBQUEsWUFpQlU7VUFoQmYsU0FDTTthQUFMLElBZWM7O29CQWJkLEdBYWM7Ozs7RUFYbEIsUUFBTSxRQUFRLFFBQVE7RUFDdEIsUUFBTSxRQUFRLE9BQU87RUFFckIsUUFBTSxRQUFRLE9BQ1M7U0FPTDtVQVBWO1dBQUEsWUFPVTtVQU5mLFNBQ007YUFBTCxXQUFTLFFBS0s7O29CQUhmLGVBR2U7SUFBQTtHQUFBO0VBQUE7RUFEbEIscUNBQUEsUUFBTSxRQUFRLE9BQ1M7U0FBTDtVQUFWO1dBQUEsWUFBVTtVQUNmLFNBQ007YUFBTCxXQUFTLFFBRks7O29CQUFBIiwiZmlsZSI6InByaXZhdGUvaW1wbC1pbnNwZWN0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
