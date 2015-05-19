"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./Object","./Type/Alias-Type","./Type/Pred-Type","./control","./bang","./compare","./Object","./Try"],function(exports,js_0,Object_1,Alias_45Type_2,Pred_45Type_3,control_4,_33_5,compare_6,Object_7,Try_8){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),js_45delete=_$2["js-delete"],js_45set=_$2["js-set"],_$3=_ms.getModule(Object_1),Object_45Key=_$3["Object-Key"],Alias_45Type=_ms.getDefaultExport(Alias_45Type_2),_$5=_ms.getModule(Pred_45Type_3),Opt=_$5.Opt,_$7=_ms.lazyGetModule(control_4),opr=_ms.lazyProp(_$7,"opr"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_5)
		}),_$9=_ms.lazyGetModule(_33_5),_33not=_ms.lazyProp(_$9,"!not"),_$10=_ms.lazyGetModule(compare_6),_61_63=_ms.lazyProp(_$10,"=?"),_$11=_ms.lazyGetModule(Object_7),empty_45Object_63=_ms.lazyProp(_$11,"empty-Object?"),p_63=_ms.lazyProp(_$11,"p?"),prototype=_ms.lazyProp(_$11,"prototype"),_$12=_ms.lazyGetModule(Try_8),fails_63=_ms.lazyProp(_$12,"fails?");
		const doc=exports.doc="For mutating Objects.";
		const Object_33=Alias_45Type(function(){
			const doc="Object which is at least partially mutable.";
			const alias_45of=Object;
			return {
				doc:doc,
				"alias-of":alias_45of,
				name:"Object!"
			}
		}());
		const empty_45Object_33=exports["empty-Object!"]=function(){
			const doc="Creates a new Object! with no properties and the given prototype.";
			return _ms.set(function empty_45Object_33(prototype){
				return Object.create(_ms.unlazy(opr)(prototype,Object.prototype))
			},"doc",doc)
		}();
		const p_43_33=exports["p+!"]=function(){
			const doc="Adds a new immutable property.";
			return _ms.set(function p_43_33(_,name,val){
				return Object.defineProperty(_,name,function(){
					const enumerable=true;
					const writable=false;
					const value=val;
					return {
						enumerable:enumerable,
						writable:writable,
						value:value
					}
				}())
			},"doc",doc)
		}();
		const p_43mut_33=exports["p+mut!"]=function(){
			const doc="Adds a new mutable property.";
			return _ms.set(function p_43mut_33(_,name,val){
				return Object.defineProperty(_,name,function(){
					const enumerable=true;
					const writable=true;
					const value=val;
					const configurable=true;
					return {
						enumerable:enumerable,
						writable:writable,
						value:value,
						configurable:configurable
					}
				}())
			},"doc",doc)
		}();
		const p_33=exports["p!"]=function(){
			const doc="Modifies an already-existing property.";
			return _ms.set(function p_33(_,name,new_45val){
				return js_45set(_,name,new_45val)
			},"doc",doc)
		}();
		const p_45_33=exports["p-!"]=function(){
			return _ms.set(function p_45_33(_,name){
				return js_45delete(_,name)
			})
		}();
		const extend_33=exports["extend!"]=function(){
			const doc="Adds all the properties in `extender` to `_`.";
			return _ms.set(function extend_33(_,extender){
				return Object.assign(_,extender)
			},"doc",doc)
		}();
		const name=exports.name="Object!";
		exports.default=Object_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9PYmplY3QhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFhQSxzQkFBTTtFQUVOLGdCQUFVLHVCQUNVO0dBQW5CLFVBQU07R0FDTixpQkFBVTs7Ozs7OztFQUVYLDJEQUNjO0dBQWIsVUFBTTtrQkFNTCwyQkFBQSxVQUNxQjtXQUFyQiw4QkFBbUIsVUFBVTs7O0VBRS9CLHVDQUNJO0dBQUgsVUFBTTtrQkFTTCxpQkFBQSxFQUFVLEtBQWdCLElBQ0c7V0FBN0Isc0JBQXNCLEVBQUUsZUFDSTtLQUEzQixpQkFBWTtLQUNaLGVBQVU7S0FDVixZQUFPOzs7Ozs7Ozs7RUFHViw2Q0FDTztHQUFOLFVBQU07a0JBRUwsb0JBQUEsRUFBVSxLQUFnQixJQUNHO1dBQTdCLHNCQUFzQixFQUFFLGVBQ0k7S0FBM0IsaUJBQVk7S0FDWixlQUFVO0tBQ1YsWUFBTztLQUNQLG1CQUFjOzs7Ozs7Ozs7O0VBR2pCLG1DQUNHO0dBQUYsVUFBTTtrQkFNTCxjQUFBLEVBQVUsS0FBZ0IsVUFJMUI7V0FBQSxTQUFPLEVBQUUsS0FBSztHQUFBOztFQUVoQix1Q0FDSTtrQkFLRixpQkFBQSxFQUFVLEtBSVY7V0FBQSxZQUFVLEVBQUU7R0FBQTtFQUFBO0VBR2QsNkNBQ1E7R0FBUCxVQUFNO2tCQU1MLG1CQUFBLEVBQVUsU0FDZTtXQUF6QixjQUFjLEVBQUU7R0FBQTs7RUEzRmxCLHdCQUFBO2tCQTZGQSIsImZpbGUiOiJPYmplY3RiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=