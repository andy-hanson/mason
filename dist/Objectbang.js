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
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_,_ms.unlazy(prototype)(child))
			};
			return _ms.set(function empty_45Object_33(prototype){
				_ms.checkContains(_ms.sub(Opt,Object),prototype,"prototype");
				return Object.create(_ms.unlazy(opr)(prototype,Object.prototype))
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
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return p_43_33("string","a",1)
				})
			};
			return _ms.set(function p_43_33(_,name,val){
				_ms.checkContains(Object_33,_,"_");
				_ms.checkContains(Object_45Key,name,"name");
				Object.defineProperty(_,name,function(){
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
				Object.defineProperty(_,name,function(){
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
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_.a,2)
			};
			return _ms.set(function p_33(_,name,new_45val){
				_ms.checkContains(Object_33,_,"_");
				_ms.checkContains(Object_45Key,name,"name");
				_ms.unlazy(_33)(_ms.unlazy(p_63),_,name);
				js_45set(_,name,new_45val)
			},"doc",doc,"test",test)
		}();
		const p_45_33=exports["p-!"]=function(){
			const test=function test(){
				const _=empty_45Object_33();
				p_43mut_33(_,"a",1);
				p_45_33(_,"a");
				_ms.unlazy(_33not)(_ms.unlazy(p_63),_,"a")
			};
			return _ms.set(function p_45_33(_,name){
				_ms.checkContains(Object_33,_,"_");
				_ms.checkContains(Object_45Key,name,"name");
				_ms.unlazy(_33)(_ms.unlazy(p_63),_,name);
				js_45delete(_,name)
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
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_.a,1)
			};
			return _ms.set(function extend_33(_,extender){
				_ms.checkContains(Object_33,_,"_");
				_ms.checkContains(Object,extender,"extender");
				Object.assign(_,extender)
			},"doc",doc,"test",test)
		}();
		const name=exports.name="Object!";
		exports.default=Object_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9PYmplY3QhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFhQSxzQkFBTTtFQUVOLGdCQUFVLHVCQUNVO0dBQW5CLFVBQU07R0FDTixpQkFBVTs7Ozs7OztFQUVYLDJEQUNjO0dBQWIsVUFBTTtHQUNOLFdBQ1EsZUFBQTtJQUFQLFFBQUk7a0RBQ1k7SUFDaEIsWUFBUSxrQkFBYzt1Q0FDakIsd0JBQWE7R0FBQTtrQkFDbEIsMkJBQUEsVUFDcUI7OEJBRFgsSUFBSTtXQUNkLDhCQUFtQixVQUFVOzs7RUFFL0IsdUNBQ0k7R0FBSCxVQUFNO0dBQ04sV0FDUSxlQUFBO0lBQVAsUUFBSTtJQUNKLFFBQUksRUFBRyxJQUFHO3VDQUNMLElBQUk7eUNBRUMsVUFBQTtZQUFULFFBQUksRUFBRyxJQUFHO0lBQUE7eUNBRUQsVUFBQTtZQUFULFFBQUssU0FBUyxJQUFHO0lBQUE7R0FBQTtrQkFDakIsaUJBQUEsRUFBVSxLQUFnQixJQUNHO3NCQUQzQjtzQkFBYTtJQUNoQixzQkFBc0IsRUFBRSxlQUNJO0tBQTNCLGlCQUFZO0tBQ1osZUFBVTtLQUNWLFlBQU87Ozs7Ozs7OztFQUVWLDZDQUNPO0dBQU4sVUFBTTtHQUNOLFdBQU87a0JBQ0wsb0JBQUEsRUFBVSxLQUFnQixJQUNHO3NCQUQzQjtzQkFBYTtJQUNoQixzQkFBc0IsRUFBRSxlQUNJO0tBQTNCLGlCQUFZO0tBQ1osZUFBVTtLQUNWLFlBQU87S0FDUCxtQkFBYzs7Ozs7Ozs7OztFQUVqQixtQ0FDRztHQUFGLFVBQU07R0FDTixXQUNRLGVBQUE7SUFBUCxRQUFJO0lBQ0osV0FBTyxFQUFHLElBQUc7SUFDYixLQUFHLEVBQUcsSUFBRzt1Q0FDSixJQUFJO0dBQUE7a0JBQ1IsY0FBQSxFQUFVLEtBQWdCLFVBSTNCO3NCQUpHO3NCQUFhO3FDQUVWLEVBQUU7SUFFUixTQUFPLEVBQUUsS0FBSztHQUFBOztFQUVoQix1Q0FDSTtHQUFILFdBQ1EsZUFBQTtJQUFQLFFBQUk7SUFDSixXQUFPLEVBQUcsSUFBRztJQUNiLFFBQUksRUFBRzt3Q0FDQyxFQUFHO0dBQUE7a0JBQ1YsaUJBQUEsRUFBVSxLQUlYO3NCQUpHO3NCQUFhO3FDQUVWLEVBQUU7SUFFUixZQUFVLEVBQUU7R0FBQTs7RUFHZCw2Q0FDUTtHQUFQLFVBQU07R0FDTixXQUNRLGVBQUE7SUFBUCxRQUFJO0lBQ0osVUFBUSxZQUNDO0tBQVIsUUFBRzs7Ozs7dUNBQ0MsSUFBSTtHQUFBO2tCQUNSLG1CQUFBLEVBQVUsU0FDZTtzQkFEdkI7c0JBQWlCO0lBQ3BCLGNBQWMsRUFBRTtHQUFBOztFQXpGbEIsd0JBQUE7a0JBMkZBIiwiZmlsZSI6Ik9iamVjdGJhbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==