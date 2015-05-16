"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./control"],function(exports,control_0){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.lazyGetModule(control_0),opr=_ms.lazyProp(_$2,"opr");
		const regexp=exports.regexp=function regexp(pattern,_63flags){
			_ms.checkContains(String,pattern,"pattern");
			const flags=_ms.unlazy(opr)(_63flags,"");
			return RegExp(pattern,flags)
		};
		const name=exports.name="RegExp";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9SZWdFeHAubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFJQSw0QkFBUyxnQkFBQSxRQUFlLFNBQ007cUJBRGI7R0FDaEIsNEJBQVksU0FBUTtVQUNwQixPQUFPLFFBQVE7RUFBQTtFQU5oQix3QkFBQSIsImZpbGUiOiJSZWdFeHAuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==