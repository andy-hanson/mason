"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./control","./Str"],function(exports,control_0,Str_1){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.lazyGetModule(control_0),opr=_ms.lazyProp(_$2,"opr"),Str=_ms.lazy(function(){
			return _ms.getDefaultExport(Str_1)
		});
		const regexp=exports.regexp=function(){
			return _ms.set(function(pattern,_63flags){
				_ms.checkContains(_ms.unlazy(Str),pattern,"pattern");
				const flags=_ms.unlazy(opr)(_63flags,"");
				return RegExp(pattern,flags)
			},"displayName","regexp")
		}();
		const displayName=exports.displayName="RegExp";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9SZWdFeHAubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQU9BLHNDQUFTO2tCQUFBLFNBQUEsUUFBWSxTQUNNOztJQUExQiw0QkFBWSxTQUFRO1dBQ3BCLE9BQU8sUUFBUTtHQUFBOztFQVRoQixzQ0FBQSIsImZpbGUiOiJSZWdFeHAuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==