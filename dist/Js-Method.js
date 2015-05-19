"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./Object","./Type/Obj-Type","./Type/Pred-Type","./bang","./compare","./Type/Type"],function(exports,js_0,Object_1,Obj_45Type_2,Pred_45Type_3,_33_4,compare_5,Type_6){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),js_45sub=_$2["js-sub"],_$3=_ms.getModule(Object_1),Object_45Key=_$3["Object-Key"],Obj_45Type=_ms.getDefaultExport(Obj_45Type_2),_$5=_ms.getModule(Pred_45Type_3),Any=_$5.Any,_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_4)
		}),_$8=_ms.lazyGetModule(compare_5),_61_63=_ms.lazyProp(_$8,"=?"),_$9=_ms.lazyGetModule(Type_6),contains_63=_ms.lazyProp(_$9,"contains?");
		const Js_45Method=Obj_45Type(function(){
			const doc="A Js-Method allows you to call a JavaScript-style method as a function.\nUnlike a Mason Method, for a Js-Method,\nthe first argument becomes `this` within the implementation's body.";
			const props=function(){
				const name=String;
				const impl_45name=String;
				return {
					name:name,
					"impl-name":impl_45name
				}
			}();
			const extensible=true;
			const make_45callable=function make_45callable(_){
				const impl=(("a[\""+_ms.show(_["impl-name"]))+"\"]");
				return Function("a","b","c","d",(((((((("switch (arguments.length) {\n\tcase 0: throw new Error(\"Js-Methods always need at least one argument.\")\n\tcase 1: return "+_ms.show(impl))+"()\n\tcase 2: return ")+_ms.show(impl))+"(b)\n\tcase 3: return ")+_ms.show(impl))+"(b, c)\n\tcase 4: return ")+_ms.show(impl))+"(b, c, d)\n\tcase 5: throw new Error(\"Does not support this many arguments.\")\n}"))
			};
			return {
				doc:doc,
				props:props,
				extensible:extensible,
				"make-callable":make_45callable,
				name:"Js-Method"
			}
		}());
		const send=exports.send=function(){
			const doc="Calls `target`'s js-method `name` with the given arguments.";
			return _ms.set(function send(target,name){
				const args=[].slice.call(arguments,2);
				const impl=js_45sub(target,name);
				return impl.apply(target,args)
			},"doc",doc)
		}();
		const send_33=exports["send!"]=send;
		const name=exports.name="Js-Method";
		exports.default=Js_45Method;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9Kcy1NZXRob2QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQVVBLGtCQUFZLHFCQUNRO0dBQW5CLFVBQ0M7R0FPRCxzQkFDTTtJQUFMLFdBQU07SUFDTixrQkFBVzs7Ozs7O0dBQ1osaUJBQVk7R0FDWixzQkFBZ0IseUJBQUEsRUFDQztJQUFoQixXQUFRLGtCQUFLO1dBRWIsU0FBVSxJQUFJLElBQUksSUFBSSxJQUNyQixnSkFFaUIseUNBQ0EsMENBQ0EsNkNBQ0E7Ozs7Ozs7Ozs7RUFJcEIsa0NBQ0s7R0FBSixVQUFNO2tCQUdMLGNBQUEsT0FBVyxLQUN1Qjs7SUFBbEMsV0FBTyxTQUFPLE9BQU87V0FFckIsV0FBVyxPQUFPO0dBQUE7O0VBRXBCLCtCQUFPO0VBN0NQLHdCQUFBO2tCQWlEQSIsImZpbGUiOiJKcy1NZXRob2QuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==