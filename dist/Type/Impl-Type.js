"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Trait"],(exports,Trait_0)=>{
	exports._get=_ms.lazy(()=>{
		let Trait=_ms.getDefaultExport(Trait_0),_$0=_ms.getModule(Trait_0),trait_33=_ms.get(_$0,"trait!"),unchecked_45trait_33=_ms.get(_$0,"unchecked-trait!");
		let Impl_45Type=exports.default=_ms.trait("Impl-Type",[],{},{});
		unchecked_45trait_33(Function,Impl_45Type);
		trait_33(Trait,Impl_45Type);
		let Self_45Type=exports["Self-Type"]=(()=>{
			let _=class Self_45Type{
				constructor(prototype){
					let _this=this;
					_ms.checkInstance(Object,prototype,"prototype");
					_ms.newProperty(_this,"prototype",prototype)
				}
			};
			_ms.traitDo(_,Impl_45Type);
			return _
		})();
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9JbXBsLVR5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFHQTtFQUlBLHFCQUFpQixTQUFTO0VBQzFCLFNBQU8sTUFBTTtFQUViLHFDQUFpQjs7SUFJTixZQUFBO1NBQ1Q7dUJBRG1CO3FCQUNuQixrQkFBYTtJQUFBO0dBQUE7aUJBTFEiLCJmaWxlIjoiVHlwZS9JbXBsLVR5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
