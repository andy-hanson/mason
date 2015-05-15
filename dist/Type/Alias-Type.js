"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../methods","./Kind","./Method","./Obj-Type","./Type","../bang","../at/q","../compare"],function(exports,methods_0,Kind_1,Method_2,Obj_45Type_3,Type_4,_33_5,_63_6,compare_7){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(methods_0),sub=_ms.get(_$2,"sub"),_$3=_ms.getModule(Kind_1),kind_33=_ms.get(_$3,"kind!"),_$4=_ms.getModule(Method_2),impl_33=_ms.get(_$4,"impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_3),Type=_ms.getDefaultExport(Type_4),_$6=_ms.getModule(Type_4),contains_63=_ms.get(_$6,"contains?"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_5)
		}),_$8=_ms.lazyGetModule(_33_5),_33not=_ms.lazyProp(_$8,"!not"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_6)
		}),_$10=_ms.lazyGetModule(compare_7),_61_63=_ms.lazyProp(_$10,"=?");
		const Alias_45Type=Obj_45Type(function(){
			const doc="Contains the same instances as another type (officially), but has its own meaning and identity.";
			const test=function(){
				return _ms.set(function(){
					const A=Alias_45Type(function(){
						const alias_45of=String;
						return {
							"alias-of":alias_45of,
							displayName:"A"
						}
					}());
					_ms.unlazy(_33)(contains_63,A,"0");
					return _ms.unlazy(_33not)(_ms.unlazy(_61_63),A,String)
				},"displayName","test")
			}();
			const props=function(){
				const displayName=String;
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
				return _ms.set(function(){
					const _632=Alias_45Type(function(){
						const alias_45of=_ms.unlazy(_63);
						return {
							"alias-of":alias_45of,
							displayName:"?2"
						}
					}());
					const _k0=[_632,String],_v0=_ms.sub(_ms.unlazy(_63),String);
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(_){
				const args=[].slice.call(arguments,1);
				return Function.apply.call(sub,null,[].concat(_["alias-of"],_ms.arr(args)))
			},"test",test)
		}());
		const displayName=exports.displayName="Alias-Type";
		exports.default=Alias_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0FsaWFzLVR5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0VBV0EsbUJBQWEscUJBQ1E7R0FBcEIsVUFBTTtHQUNOLHFCQUNPO21CQUFBLFVBQUE7S0FBTixRQUFJLHVCQUNVO01BQWIsaUJBQVU7Ozs7OztxQkFDVCxZQUFVLEVBQUc7a0RBQ1AsRUFBRTtJQUFBOztHQUNYLHNCQUNNO0lBQUwsa0JBQWE7SUFDYixpQkFBVTs7Ozs7O0dBQ1gsaUJBQVk7Ozs7Ozs7OztFQUViLFFBQU0sYUFBVztFQUdqQixRQUFNLFlBQVUsYUFBWSxTQUFBLEVBQUUsTUFDSztVQUFsQyxZQUFVLGNBQVc7RUFBQTtFQUd0QixRQUFNLElBQUksdUJBQ1U7R0FBbkIscUJBQ087bUJBQUEsVUFBQTtLQUFOLFdBQUssdUJBQ1U7TUFBZDs7Ozs7O0tBQ0QsVUFBQSxDQUFFLEtBQUcsb0NBQWM7Ozs7a0JBQ25CLFNBQUEsRUFDUzs7K0JBQVQsbUJBQUksc0JBQVc7R0FBQTs7RUFwQ2pCLHNDQUFBO2tCQXNDQSIsImZpbGUiOiJUeXBlL0FsaWFzLVR5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==