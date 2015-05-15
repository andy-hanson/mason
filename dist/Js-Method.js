"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./Object","./Type/Obj-Type","./Type/Pred-Type","./bang","./compare","./Type/Type"],function(exports,js_0,Object_1,Obj_45Type_2,Pred_45Type_3,_33_4,compare_5,Type_6){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),js_45sub=_ms.get(_$2,"js-sub"),_$3=_ms.getModule(Object_1),Object_45Key=_ms.get(_$3,"Object-Key"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_2),_$5=_ms.getModule(Pred_45Type_3),Any=_ms.get(_$5,"Any"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_4)
		}),_$8=_ms.lazyGetModule(compare_5),_61_63=_ms.lazyProp(_$8,"=?"),_$9=_ms.lazyGetModule(Type_6),contains_63=_ms.lazyProp(_$9,"contains?");
		const Js_45Method=Obj_45Type(function(){
			const doc="A Js-Method allows you to call a JavaScript-style method as a function.\nUnlike a Mason Method, for a Js-Method,\nthe first argument becomes `this` within the implementation's body.";
			const test=function(){
				return _ms.set(function(){
					const toString=Js_45Method(function(){
						const impl_45name="toString";
						return {
							"impl-name":impl_45name,
							displayName:"toString"
						}
					}());
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),toString(1),"1")
				},"displayName","test")
			}();
			const props=function(){
				const displayName=String;
				const impl_45name=String;
				return {
					displayName:displayName,
					"impl-name":impl_45name
				}
			}();
			const extensible=true;
			const make_45callable=function(){
				return _ms.set(function(_){
					const impl=(("a[\""+_ms.show(_["impl-name"]))+"\"]");
					return Function("a","b","c","d",(((((((("switch (arguments.length) {\n\tcase 0: throw new Error(\"Js-Methods always need at least one argument.\")\n\tcase 1: return "+_ms.show(impl))+"()\n\tcase 2: return ")+_ms.show(impl))+"(b)\n\tcase 3: return ")+_ms.show(impl))+"(b, c)\n\tcase 4: return ")+_ms.show(impl))+"(b, c, d)\n\tcase 5: throw new Error(\"Does not support this many arguments.\")\n}"))
				},"displayName","make-callable")
			}();
			return {
				doc:doc,
				test:test,
				props:props,
				extensible:extensible,
				"make-callable":make_45callable,
				displayName:"Js-Method"
			}
		}());
		const send=exports.send=function(){
			const doc="Calls `target`'s js-method `name` with the given arguments.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[1,"toFixed",2],_v0="1.00";
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(target,name){
				const args=[].slice.call(arguments,2);
				_ms.checkContains(Any,target,"target");
				_ms.checkContains(Object_45Key,name,"name");
				const impl=js_45sub(target,name);
				_ms.unlazy(_33)(_ms.unlazy(contains_63)(Function,impl),_ms.lazy(function(){
					return (((("Js-Method "+_ms.show(name))+" not implemented by ")+_ms.show(target))+".")
				}));
				return impl.apply(target,args)
			},"doc",doc,"test",test,"displayName","send")
		}();
		const send_33=exports["send!"]=send;
		const displayName=exports.displayName="Js-Method";
		exports.default=Js_45Method;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9Kcy1NZXRob2QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQVVBLGtCQUFZLHFCQUNRO0dBQW5CLFVBQ0M7R0FHRCxxQkFDTzttQkFBQSxVQUFBO0tBQU4sZUFBVyxzQkFDUztNQUFuQixrQkFBWTs7Ozs7OytDQUNQLFNBQVMsR0FBSTtJQUFBOztHQUNwQixzQkFDTTtJQUFMLGtCQUFhO0lBQ2Isa0JBQVc7Ozs7OztHQUNaLGlCQUFZO0dBQ1osZ0NBQWdCO21CQUFBLFNBQUEsRUFDQztLQUFoQixXQUFRLGtCQUFLO1lBRWIsU0FBVSxJQUFJLElBQUksSUFBSSxJQUNyQixnSkFFaUIseUNBQ0EsMENBQ0EsNkNBQ0E7Ozs7Ozs7Ozs7OztFQUlwQixrQ0FDSztHQUFKLFVBQU07R0FDTixxQkFDTzttQkFBQSxVQUFBO0tBQU4sVUFBQSxDQUFFLEVBQUcsVUFBUyxPQUFROzs7O2tCQUN0QixTQUFBLE9BQVcsS0FDdUI7O3NCQUQzQjtzQkFBUztJQUNoQixXQUFPLFNBQU8sT0FBTzs0Q0FDRixTQUFTO1lBQVEsMEJBQVcsd0NBQTBCOztXQUN6RSxXQUFXLE9BQU87R0FBQTs7RUFFcEIsK0JBQU87RUE3Q1Asc0NBQUE7a0JBaURBIiwiZmlsZSI6IkpzLU1ldGhvZC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9