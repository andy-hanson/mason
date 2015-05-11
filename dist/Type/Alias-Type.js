"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../methods","../private/bootstrap","./Kind","./Method","./Obj-Type","./Type","../bang","../at/q","../compare"],function(exports,methods_0,bootstrap_1,Kind_2,Method_3,Obj_45Type_4,Type_5,_33_6,_63_7,compare_8){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(methods_0),sub=_ms.get(_$2,"sub"),_$3=_ms.getModule(bootstrap_1),Str=_ms.get(_$3,"Str"),_$4=_ms.getModule(Kind_2),kind_33=_ms.get(_$4,"kind!"),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_4),Type=_ms.getDefaultExport(Type_5),_$7=_ms.getModule(Type_5),contains_63=_ms.get(_$7,"contains?"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_6)
		}),_$9=_ms.lazyGetModule(_33_6),_33not=_ms.lazyProp(_$9,"!not"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_7)
		}),_$11=_ms.lazyGetModule(compare_8),_61_63=_ms.lazyProp(_$11,"=?");
		const exports={};
		const Alias_45Type=Obj_45Type(function(){
			const doc="Contains the same instances as another type (officially), but has its own meaning and identity.";
			const test=function(){
				const A=Alias_45Type(function(){
					const alias_45of=Str;
					return {
						"alias-of":alias_45of,
						displayName:"A"
					}
				}());
				_ms.unlazy(_33)(contains_63,A,"0");
				return _ms.unlazy(_33not)(_ms.unlazy(_61_63),A,Str)
			};
			const props=function(){
				const displayName=Str;
				const alias_45of=Type;
				return {
					displayName:displayName,
					"alias-of":alias_45of
				}
			}();
			const extensible=true;
			return {
				doc:doc,
				test:test,
				props:props,
				extensible:extensible,
				displayName:"Alias-Type"
			}
		}());
		kind_33(Alias_45Type,Type);
		impl_33(contains_63,Alias_45Type,function(_,value){
			return contains_63(_["alias-of"],value)
		});
		impl_33(sub,Alias_45Type,function(){
			const test=function(){
				const _632=Alias_45Type(function(){
					const alias_45of=_ms.unlazy(_63);
					return {
						"alias-of":alias_45of,
						displayName:"?2"
					}
				}());
				const _k0=[_632,Str],_v0=_ms.sub(_ms.unlazy(_63),Str);
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(_){
				const args=[].slice.call(arguments,1);
				return Function.apply.call(sub,null,[].concat(_["alias-of"],_ms.arr(args)))
			},"test",test)
		}());
		exports.default=Alias_45Type;
		const displayName=exports.displayName="Alias-Type";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0FsaWFzLVR5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lDQVlBOzs7Ozs7O0VBQUEsbUJBQWEscUJBQ1E7R0FBcEIsVUFBTTtHQUNOLFdBQ08sVUFBQTtJQUFOLFFBQUksdUJBQ1U7S0FBYixpQkFBVTtZQUFHOzs7OztvQkFDWixZQUFVLEVBQUc7aURBQ1AsRUFBRTtHQUFBO0dBQ1gsc0JBQ007SUFBTCxrQkFBYTtJQUNiLGlCQUFVO1dBREw7Ozs7O0dBRU4saUJBQUE7VUFUb0I7Ozs7Ozs7O0VBV3JCLFFBQU0sYUFBVztFQUdqQixRQUFNLFlBQVUsYUFBWSxTQUFBLEVBQUUsTUFDSztVQUFsQyxZQUFVLGNBQVc7RUFBQTtFQUd0QixRQUFNLElBQUksdUJBQ1U7R0FBbkIsV0FDTyxVQUFBO0lBQU4sV0FBSyx1QkFDVTtLQUFkO1lBQWM7Ozs7O0lBQ2YsVUFBQSxDQUFFLEtBQUcsaUNBQVc7OztrQkFDaEIsU0FBQSxFQUNTOzsrQkFBVCxtQkFBSSxzQkFBVztHQUFBOztrQkFFakI7RUF2Q0Esc0NBQUEiLCJmaWxlIjoiVHlwZS9BbGlhcy1UeXBlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=