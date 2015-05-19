"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","esast/dist/mangle-identifier","../js","../Object","../Objectbang","./Impl-Type","./Obj-Type","./Pred-Type","../bang","../compare","./Type"],function(exports,mangle_45identifier_0,js_1,Object_2,Object_33_3,Impl_45Type_4,Obj_45Type_5,Pred_45Type_6,_33_7,compare_8,Type_9){
	exports._get=_ms.lazy(function(){
		const mangle_45identifier=_ms.getDefaultExport(mangle_45identifier_0),_$3=_ms.getModule(js_1),js_45sub=_ms.get(_$3,"js-sub"),_$4=_ms.getModule(Object_2),Object_45Key=_ms.get(_$4,"Object-Key"),_$5=_ms.getModule(Object_33_3),p_43_33=_ms.get(_$5,"p+!"),Impl_45Type=_ms.getDefaultExport(Impl_45Type_4),Obj_45Type=_ms.getDefaultExport(Obj_45Type_5),_$8=_ms.getModule(Pred_45Type_6),Any=_ms.get(_$8,"Any"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_7)
		}),_$11=_ms.lazyGetModule(compare_8),_61_63=_ms.lazyProp(_$11,"=?"),_$12=_ms.lazyGetModule(Type_9),contains_63=_ms.lazyProp(_$12,"contains?");
		const Js_45Method=Obj_45Type(function(){
			const doc="A Js-Method allows you to call a JavaScript-style method as a function.\nUnlike a Mason Method, for a Js-Method,\nthe first argument becomes `this` within the implementation's body.";
			const test=function test(){
				const toString=Js_45Method(function(){
					const impl_45symbol="toString";
					return {
						"impl-symbol":impl_45symbol,
						name:"toString"
					}
				}());
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),toString(1),"1")
			};
			const props=function(){
				const name=String;
				const impl_45symbol=Object_45Key;
				return {
					name:name,
					"impl-symbol":impl_45symbol
				}
			}();
			const extensible=true;
			const make_45callable=function make_45callable(jsm){
				const impl=function(){
					const _=jsm["impl-symbol"];
					if(_ms.bool(_ms.contains(String,_))){
						return (("a[\""+_ms.show(_))+"\"]")
					} else if(_ms.bool(_ms.contains(Symbol,_))){
						return "a[symbol]"
					} else throw new Error("No branch of `case` matches.")
				}();
				const src=(((((((((("return function "+_ms.show(mangle_45identifier(jsm.name)))+"(a, b, c, d) {\n\tswitch (arguments.length) {\n\t\tcase 0: throw new Error(\"Js-Methods always need at least one argument.\")\n\t\tcase 1: return ")+_ms.show(impl))+"()\n\t\tcase 2: return ")+_ms.show(impl))+"(b)\n\t\tcase 3: return ")+_ms.show(impl))+"(b, c)\n\t\tcase 4: return ")+_ms.show(impl))+"(b, c, d)\n\t\tcase 5: throw new Error(\"Does not support this many arguments.\")\n\t}\n}");
				const make_45method=Function("symbol",src);
				return make_45method(jsm["impl-symbol"])
			};
			return {
				doc:doc,
				test:test,
				props:props,
				extensible:extensible,
				"make-callable":make_45callable,
				name:"Js-Method"
			}
		}());
		const send=exports.send=function(){
			const doc="Calls `target`'s js-method `name` with the given arguments.";
			const test=function test(){
				const _k0=[1,"toFixed",2],_v0="1.00";
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function send(target,name){
				const args=[].slice.call(arguments,2);
				_ms.checkContains(Any,target,"target");
				_ms.checkContains(Object_45Key,name,"name");
				const impl=js_45sub(target,name);
				_ms.unlazy(_33)(_ms.unlazy(contains_63)(Function,impl),_ms.lazy(function(){
					return (((("Js-Method "+_ms.show(name))+" not implemented by ")+_ms.show(target))+".")
				}));
				return impl.apply(target,args)
			},"doc",doc,"test",test)
		}();
		const send_33=exports["send!"]=send;
		const js_45impl_33=exports["js-impl!"]=function js_45impl_33(method,type,implementation){
			_ms.checkContains(Js_45Method,method,"method");
			_ms.checkContains(Impl_45Type,type,"type");
			_ms.checkContains(Function,implementation,"implementation");
			return p_43_33(type.prototype,method["impl-symbol"],implementation)
		};
		const name=exports.name="Js-Method";
		exports.default=Js_45Method;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0pzLU1ldGhvZC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBYUEsa0JBQVkscUJBQ1E7R0FBbkIsVUFDQztHQUdELFdBQ08sZUFBQTtJQUFOLGVBQVcsc0JBQ1M7S0FBbkIsb0JBQWM7Ozs7Ozs4Q0FDVCxTQUFTLEdBQUk7R0FBQTtHQUNwQixzQkFDTTtJQUFMLFdBQU07SUFDTixvQkFBYTs7Ozs7O0dBQ2QsaUJBQVk7R0FDWixzQkFBZ0IseUJBQUEsSUFDRztJQUFsQjtLQUFZLFFBQUE7S0FDWCx5QkFBQyxPQUFELElBQ087YUFBTCxrQkFBSztZQUNQLHlCQUFDLE9BQUQsSUFDTzthQUFMO0tBQUE7O0lBR0gsVUFDQyxzQ0FBaUIsb0JBQWtCLDJLQUdqQiwyQ0FDQSw0Q0FDQSwrQ0FDQTtJQUluQixvQkFBYyxTQUFVLFNBQVE7V0FDaEMsY0FBWTs7Ozs7Ozs7Ozs7RUFFZCxrQ0FDSztHQUFKLFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixVQUFBLENBQUUsRUFBRyxVQUFTLE9BQVE7OztrQkFDdEIsY0FBQSxPQUFXLEtBQ3VCOztzQkFEM0I7c0JBQVM7SUFDaEIsV0FBTyxTQUFPLE9BQU87NENBQ0YsU0FBUztZQUFRLDBCQUFXLHdDQUEwQjs7V0FDekUsV0FBVyxPQUFPO0dBQUE7O0VBRXBCLCtCQUFPO0VBRVAsdUNBQVcsc0JBQUEsT0FBaUIsS0FBZSxlQUN1QjtxQkFEaEQ7cUJBQWU7cUJBQXlCO1VBQ3pELFFBQUksZUFBZSxzQkFBbUI7RUFBQTtFQTVEdkMsd0JBQUE7a0JBOERBIiwiZmlsZSI6IlR5cGUvSnMtTWV0aG9kLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=