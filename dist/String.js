"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./compare","./js","./Type/Method","./Type/Pred-Type","./Type/primitive","./Type/Trait","./at/at"],(exports,compare_0,js_1,Method_2,Pred_45Type_3,primitive_4,Trait_5,_64_6)=>{
	exports._get=_ms.lazy(()=>{
		let compare=_ms.getDefaultExport(compare_0),_$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(js_1),id_61_63=_ms.get(_$1,"id=?"),_$2=_ms.getModule(Method_2),impl_33=_ms.get(_$2,"impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_3),_$3=_ms.getModule(primitive_4),Str=_ms.get(_$3,"Str"),Trait=_ms.getDefaultExport(Trait_5),_$4=_ms.lazyGetModule(_64_6),count=_ms.lazyProp(_$4,"count");
		let String_45Test=exports["String-Test"]=new (Trait)((()=>{
			let built={};
			built.name="String-Test";
			let implementors=built.implementors=[String,RegExp];
			return built
		})());
		let Char=exports.Char=new (Pred_45Type)((()=>{
			let built={};
			built.name="Char";
			let predicate=built.predicate=function predicate(_){
				return (_ms.hasInstance(Str,_)&&_61_63(_ms.unlazy(count)(_),1))
			};
			return built
		})());
		let indent=exports.indent=function indent(_){
			_ms.checkInstance(Str,_,"_");
			return _.replace(new (RegExp)(`\n`,"g"),`\n\t`)
		};
		impl_33(_61_63,String,function(other){
			let _this=this;
			return id_61_63(_this,other)
		});
		impl_33(compare,String,function(other){
			let _this=this;
			return _this.localeCompare(other)
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvU3RyaW5nLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBVUEseUNBQWEsS0FBSSxPQUNLLEtBQUE7O2NBQ3JCO0dBQ0Esb0NBQWMsQ0FBQyxPQUFPOzs7RUFFdkIsc0JBQU0sS0FBSSxhQUNTLEtBQUE7O2NBQ2xCO0dBQ0EsOEJBQWEsbUJBQUE7V0FDWixpQkFBSyxJQUFELElBQU0seUJBQVMsR0FBQztHQUFBOzs7RUFFdEIsMEJBQVMsZ0JBQUE7cUJBQUU7VUFHVCxVQUFVLEtBQUksUUFBUSxLQUFLLEtBQUk7O0VBR2pDLFFBQU0sT0FBRyxPQUFTLFNBQUE7T0FHakI7VUFGQSxTQUVBLE1BRlU7RUFBQTtFQUNYLFFBQU0sUUFBUSxPQUFTLFNBQUE7T0FDdEI7VUFBQSxvQkFBZTtFQUFBIiwiZmlsZSI6IlN0cmluZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
