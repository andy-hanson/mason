"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../at/q","../Obj","../show","./Method","./Type","./Method"],function(exports,_63_0,Obj_1,show_2,Method_3,Type_4,Method_5){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_63_0),_63_45or=_ms.get(_$2,"?-or"),_$3=_ms.getModule(Obj_1),flag_63=_ms.get(_$3,"flag?"),_63p=_ms.get(_$3,"?p"),show=_ms.getDefaultExport(show_2),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),Type=_ms.getDefaultExport(Type_4),Method=_ms.lazy(function(){
			return _ms.getDefaultExport(Method_5)
		});
		const displayName=exports.displayName="show-Type";
		exports.default=impl_33(show,Type,function(){
			const test=_ms.set(function(){
				const _k0=[_ms.unlazy(Method)],_v0="Method";
				return _ms.map(_k0,_v0)
			},"displayName","test");
			return _ms.set(function(type,opts){
				return function(){
					if(_ms.bool(flag_63(opts,"repr"))){
						return show.default(type,opts)
					} else {
						return _63_45or(_63p(type,"displayName"),"<anonymous Type>")
					}
				}()
			},"test",test)
		}());
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL3Nob3ctVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBQUEsc0NBQUE7a0JBU0EsUUFBTSxLQUFLLGVBQ0k7R0FBZCxtQkFDTyxVQUFBO0lBQU4sVUFBQSx5QkFBZTs7O2tCQUNmLFNBQUEsS0FBSyxLQUNJOztLQUNSLFlBQUEsUUFBTSxLQUFNLFNBQ0s7YUFBaEIsYUFBYSxLQUFLO0tBQUEsT0FFZjthQUFILFNBQU0sS0FBRyxLQUFNLGVBQWU7S0FBQTtJQUFBO0dBQUEiLCJmaWxlIjoiVHlwZS9zaG93LVR5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==