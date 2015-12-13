"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../js","./../private/bootstrap","./Trait","./Type"],(exports,js_0,bootstrap_1,Trait_2,Type_3)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(js_0),js_45sub=_ms.get(_$0,"js-sub"),_$1=_ms.getModule(bootstrap_1),msDef=_ms.get(_$1,"msDef"),_$2=_ms.getModule(Trait_2),trait_33=_ms.get(_$2,"trait!"),_$3=_ms.getModule(Type_3),extract=_ms.get(_$3,"extract");
		let Record=exports.default=_ms.trait("Record",[],{
			[_ms.symbol(extract)](_){
				let _this=this;
				return (_ms.hasInstance(_this,_)?field_45values(_this,_):null)
			}
		},{
			toString(){
				let _this=this;
				return `(${_this.constructor.name} ${field_45values(_this.constructor,_this).join(` `)})`
			}
		});
		let field_45values=function field_45values(cls,instance){
			return cls["field-names"].map(_=>js_45sub(instance,_))
		};
		msDef("beRecord",(_,field_45names)=>{
			_ms.newProperty(_,"field-names",field_45names);
			return trait_33(_,Record)
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9SZWNvcmQubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFNQTtlQUtFLFVBQVU7UUFJMEM7V0FIOUMsaUJBRzhDLE1BSDdDLEdBQU8sZUFHc0MsTUFIbkIsR0FBRTtHQUFBO0VBQUE7O1FBR2lCO1dBQW5ELElBQW1ELDBCQUExQixlQUEwQiw4QkFBWTs7O0VBRWxFLG1CQUFnQix3QkFBQSxJQUFJO1VBQ25CLDBCQUFzQixTQUFPLFNBQVU7RUFBQTtFQUV4QyxNQUFPLFdBQVcsQ0FBQSxFQUFDO21CQUNqQixnQkFBZTtVQUNoQixTQUFRLEVBQUM7RUFBQSIsImZpbGUiOiJUeXBlL1JlY29yZC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
