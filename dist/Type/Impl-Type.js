"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Kind","./Obj-Type","../bang","../compare","../Objectbang","./Kind","./Method","./Type"],function(exports,Kind_0,Obj_45Type_1,_33_2,compare_3,Object_33_4,Kind_5,Method_6,Type_7){
	exports._get=_ms.lazy(function(){
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),unchecked_45kind_33=_ms.get(_$2,"unchecked-kind!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_1),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_2)
		}),_$5=_ms.lazyGetModule(_33_2),_33not=_ms.lazyProp(_$5,"!not"),_$6=_ms.lazyGetModule(compare_3),_61_63=_ms.lazyProp(_$6,"=?"),_$7=_ms.lazyGetModule(Object_33_4),empty_45Object_33=_ms.lazyProp(_$7,"empty-Object!"),_$8=_ms.lazyGetModule(Kind_5),kind_63=_ms.lazyProp(_$8,"kind?"),_$9=_ms.lazyGetModule(Method_6),impl_33=_ms.lazyProp(_$9,"impl!"),_$10=_ms.lazyGetModule(Type_7),contains_63=_ms.lazyProp(_$10,"contains?");
		const Impl_45Type=Kind(function(){
			const doc="TODO:REST\nEvery Impl-Type should have a `prototype` property.";
			const test=function test(){
				const A=Kind(function(){
					const doc="A";
					return {
						doc:doc,
						name:"A"
					}
				}());
				const B=Kind(function(){
					const doc="B";
					return {
						doc:doc,
						name:"B"
					}
				}());
				const C=Obj_45Type(function(){
					const props=function(){
						const c=null;
						return {
							c:c,
							name:"props"
						}
					}();
					return {
						props:props,
						name:"C"
					}
				}());
				kind_33(B,A);
				kind_33(C,B);
				_ms.unlazy(_33)(_ms.unlazy(kind_63),B,A);
				_ms.unlazy(_33)(_ms.unlazy(kind_63),C,B);
				_ms.unlazy(_33)(_ms.unlazy(kind_63),C,A);
				_ms.unlazy(_33not)(_ms.unlazy(kind_63),A,B)
			};
			return {
				doc:doc,
				test:test,
				name:"Impl-Type"
			}
		}());
		unchecked_45kind_33(Obj_45Type,Impl_45Type);
		unchecked_45kind_33(Function,Impl_45Type);
		kind_33(Kind,Impl_45Type);
		const Self_45Type=exports["Self-Type"]=Obj_45Type(function(){
			const doc="Impl-Type with exactly one member.\nCalling impl! on it will directly modify an Object to contain method implementations.";
			const props=function(){
				const prototype=Object;
				return {
					prototype:prototype,
					name:"props"
				}
			}();
			const test=function test(){
				const x=_ms.unlazy(empty_45Object_33)();
				_ms.unlazy(impl_33)(_ms.unlazy(contains_63),self_45type(x),function(){
					return 1
				});
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.unlazy(contains_63)(x),1)
			};
			return {
				doc:doc,
				props:props,
				test:test,
				name:"Self-Type"
			}
		}());
		kind_33(Self_45Type,Impl_45Type);
		const self_45type=exports["self-type"]=function self_45type(_){
			_ms.checkContains(Object,_,"_");
			return Self_45Type({
				prototype:_
			})
		};
		const name=exports.name="Impl-Type";
		exports.default=Impl_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0ltcGwtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBV0Esa0JBQVksZUFDSTtHQUFmLFVBQ0M7R0FFRCxXQUNRLGVBQUE7SUFBUCxRQUFJLGVBQ0k7S0FBUCxVQUFNOzs7Ozs7SUFDUCxRQUFJLGVBQ0k7S0FBUCxVQUFNOzs7Ozs7SUFDUCxRQUFJLHFCQUNRO0tBQVgsc0JBQ007TUFBTCxRQUFBOzs7Ozs7Ozs7OztJQUNGLFFBQU0sRUFBRTtJQUNSLFFBQU0sRUFBRTt3Q0FDQSxFQUFFO3dDQUNGLEVBQUU7d0NBQ0YsRUFBRTsyQ0FDQyxFQUFFO0dBQUE7Ozs7Ozs7RUFFZixvQkFBZ0IsV0FBUztFQUN6QixvQkFBZ0IsU0FBUztFQUN6QixRQUFNLEtBQUs7RUFJVix1Q0FBVyxxQkFDUTtHQUFsQixVQUNDO0dBRUQsc0JBQ007SUFBTCxnQkFBVzs7Ozs7O0dBQ1osV0FDUSxlQUFBO0lBQVA7Z0RBQ2lCLFlBQVUsR0FDSSxVQUFBO1lBQTlCO0lBQUE7K0RBQ2UsR0FBRztHQUFBOzs7Ozs7OztFQUVyQixRQUFNLFlBQVU7RUFFaEIsdUNBQVkscUJBQUEsRUFDUTtxQkFETjtVQUNiLFlBQVU7Y0FBWTtHQUFBO0VBQUE7RUFuRHhCLHdCQUFBO2tCQXFEQSIsImZpbGUiOiJUeXBlL0ltcGwtVHlwZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9