"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./Object","./Type/Alias-Type","./Type/Pred-Type","./control","./bang","./compare","./Object","./Try"],function(exports,js_0,Object_1,Alias_45Type_2,Pred_45Type_3,control_4,_33_5,compare_6,Object_7,Try_8){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),js_45delete=_ms.get(_$2,"js-delete"),js_45set=_ms.get(_$2,"js-set"),_$3=_ms.getModule(Object_1),Object_45Key=_ms.get(_$3,"Object-Key"),Alias_45Type=_ms.getDefaultExport(Alias_45Type_2),_$5=_ms.getModule(Pred_45Type_3),Opt=_ms.get(_$5,"Opt"),_$7=_ms.lazyGetModule(control_4),opr=_ms.lazyProp(_$7,"opr"),_33=_ms.lazy(function(){
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
			const test=function test(){
				const _=empty_45Object_33();
				_ms.unlazy(_33)(_ms.unlazy(empty_45Object_63),_);
				const child=empty_45Object_33(_);
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),_,_ms.unlazy(prototype)(child))
			};
			return _ms.set(function empty_45Object_33(_63prototype){
				_ms.checkContains(_ms.sub(Opt,Object),_63prototype,"?prototype");
				const prototype=_ms.unlazy(opr)(_63prototype,Object.prototype);
				return Object.create(prototype)
			},"doc",doc,"test",test)
		}();
		const p_43_33=exports["p+!"]=function(){
			const doc="Adds a new immutable property.";
			const test=function test(){
				const _=empty_45Object_33();
				p_43_33(_,"a",1);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_.a,1);
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return p_43_33(_,"a",2)
				});
				return _ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return p_43_33("string","a",1)
				})
			};
			return _ms.set(function p_43_33(_,name,val){
				_ms.checkContains(Object_33,_,"_");
				_ms.checkContains(Object_45Key,name,"name");
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
			},"doc",doc,"test",test)
		}();
		const p_43mut_33=exports["p+mut!"]=function(){
			const doc="Adds a new mutable property.";
			const test="See `p!`";
			return _ms.set(function p_43mut_33(_,name,val){
				_ms.checkContains(Object_33,_,"_");
				_ms.checkContains(Object_45Key,name,"name");
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
			},"doc",doc,"test",test)
		}();
		const p_33=exports["p!"]=function(){
			const doc="Modifies an already-existing property.";
			const test=function test(){
				const _=empty_45Object_33();
				p_43mut_33(_,"a",1);
				p_33(_,"a",2);
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),_.a,2)
			};
			return _ms.set(function p_33(_,name,new_45val){
				_ms.checkContains(Object_33,_,"_");
				_ms.checkContains(Object_45Key,name,"name");
				_ms.unlazy(_33)(_ms.unlazy(p_63),_,name);
				return js_45set(_,name,new_45val)
			},"doc",doc,"test",test)
		}();
		const p_45_33=exports["p-!"]=function(){
			const test=function test(){
				const _=empty_45Object_33();
				p_43mut_33(_,"a",1);
				p_45_33(_,"a");
				return _ms.unlazy(_33not)(_ms.unlazy(p_63),_,"a")
			};
			return _ms.set(function p_45_33(_,name){
				_ms.checkContains(Object_33,_,"_");
				_ms.checkContains(Object_45Key,name,"name");
				_ms.unlazy(_33)(_ms.unlazy(p_63),_,name);
				return js_45delete(_,name)
			},"test",test)
		}();
		const extend_33=exports["extend!"]=function(){
			const doc="Adds all the properties in `extender` to `_`.";
			const test=function test(){
				const _=empty_45Object_33();
				extend_33(_,function(){
					const a=1;
					return {
						a:a
					}
				}());
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),_.a,1)
			};
			return _ms.set(function extend_33(_,extender){
				_ms.checkContains(Object_33,_,"_");
				_ms.checkContains(Object,extender,"extender");
				return Object.assign(_,extender)
			},"doc",doc,"test",test)
		}();
		const name=exports.name="Object!";
		exports.default=Object_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9PYmplY3QhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFhQSxzQkFBTTtFQUVOLGdCQUFVLHVCQUNVO0dBQW5CLFVBQU07R0FDTixpQkFBVTs7Ozs7OztFQUVYLDJEQUNjO0dBQWIsVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFFBQUk7a0RBQ1k7SUFDaEIsWUFBUSxrQkFBYzs4Q0FDakIsd0JBQWE7R0FBQTtrQkFDbEIsMkJBQUEsYUFDc0I7OEJBRFgsSUFBSTtJQUNmLGdDQUFnQixhQUFXO1dBQzNCLGNBQWM7R0FBQTs7RUFFaEIsdUNBQ0k7R0FBSCxVQUFNO0dBQ04sV0FDTyxlQUFBO0lBQU4sUUFBSTtJQUNKLFFBQUksRUFBRyxJQUFHO3VDQUNMLElBQUk7eUNBRUMsVUFBQTtZQUFULFFBQUksRUFBRyxJQUFHO0lBQUE7Z0RBRUQsVUFBQTtZQUFULFFBQUssU0FBUyxJQUFHO0lBQUE7R0FBQTtrQkFDbEIsaUJBQUEsRUFBVSxLQUFnQixJQUNHO3NCQUQzQjtzQkFBYTtXQUNmLHNCQUFzQixFQUFFLGVBQ0k7S0FBM0IsaUJBQVk7S0FDWixlQUFVO0tBQ1YsWUFBTzs7Ozs7Ozs7O0VBR1YsNkNBQ087R0FBTixVQUFNO0dBQ04sV0FBTztrQkFDTixvQkFBQSxFQUFVLEtBQWdCLElBQ0c7c0JBRDNCO3NCQUFhO1dBQ2Ysc0JBQXNCLEVBQUUsZUFDSTtLQUEzQixpQkFBWTtLQUNaLGVBQVU7S0FDVixZQUFPO0tBQ1AsbUJBQWM7Ozs7Ozs7Ozs7RUFHakIsbUNBQ0c7R0FBRixVQUFNO0dBQ04sV0FDTyxlQUFBO0lBQU4sUUFBSTtJQUNKLFdBQU8sRUFBRyxJQUFHO0lBQ2IsS0FBRyxFQUFHLElBQUc7OENBQ0osSUFBSTtHQUFBO2tCQUNULGNBQUEsRUFBVSxLQUFnQixVQUkxQjtzQkFKRTtzQkFBYTtxQ0FFVCxFQUFFO1dBRVIsU0FBTyxFQUFFLEtBQUs7R0FBQTs7RUFFaEIsdUNBQ0k7R0FBSCxXQUNPLGVBQUE7SUFBTixRQUFJO0lBQ0osV0FBTyxFQUFHLElBQUc7SUFDYixRQUFJLEVBQUc7K0NBQ0MsRUFBRztHQUFBO2tCQUNYLGlCQUFBLEVBQVUsS0FJVjtzQkFKRTtzQkFBYTtxQ0FFVCxFQUFFO1dBRVIsWUFBVSxFQUFFO0dBQUE7O0VBR2QsNkNBQ1E7R0FBUCxVQUFNO0dBQ04sV0FDTyxlQUFBO0lBQU4sUUFBSTtJQUNKLFVBQVEsWUFDQztLQUFSLFFBQUc7Ozs7OzhDQUNDLElBQUk7R0FBQTtrQkFDVCxtQkFBQSxFQUFVLFNBQ2U7c0JBRHZCO3NCQUFpQjtXQUNuQixjQUFjLEVBQUU7R0FBQTs7RUE1RmxCLHdCQUFBO2tCQThGQSIsImZpbGUiOiJPYmplY3RiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=