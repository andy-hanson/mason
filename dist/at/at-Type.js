"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../methods","./../Type/Kind","./../Type/Type","./at"],(exports,methods_0,Kind_1,Type_2,_64_3)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(methods_0),sub=_ms.get(_$0,"sub"),_$1=_ms.getModule(Kind_1),self_45kind_33=_ms.get(_$1,"self-kind!"),_$2=_ms.getModule(Type_2),_61_62=_ms.get(_$2,"=>"),_64=_ms.getDefaultExport(_64_3),_$3=_ms.getModule(_64_3),_43_43_33=_ms.get(_$3,"++!");
		const _64_45Type=exports.default=(()=>{
			const _=_ms.kind("@-Type",[],{},{
				[_ms.symbol(sub)](){
					const _this=this;
					return _this
				},
				[_ms.symbol(_61_62)](stream){
					const _this=this;
					return from_45stream(_this,stream)
				}
			});
			self_45kind_33(_64,_);
			return _
		})();
		const empty=exports.empty=_ms.method("empty",[]);
		const from_45stream=exports["from-stream"]=_ms.method("from-stream",[["stream",_64]],function(stream){
			const _this=this;
			_ms.checkContains(_64,stream,"stream");
			return (_=>{
				_43_43_33(_,stream);
				return _
			})(empty(_this))
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9ALVR5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFNQSxpQ0FDWSxLQUdUOztnQkFHRjtXQWFXO1lBQUE7SUFBQTtnQkFWWCxTQUFJO1dBVU87WUFUVixjQVNVLE1BVE87SUFBQTtHQUFBO0dBTmpCLGVBQVcsSUFBRTs7O0VBUWY7RUFLQSwrRUFBNEIsTUFBUCxTQUFBO1NBRVQ7cUJBRmdCO1VBRXRCLElBQ1U7SUFBZCxVQUFJLEVBQUU7O01BREYsTUFBTTtFQUFBIiwiZmlsZSI6ImF0L2F0LVR5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
