"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Kind","./Obj-Type","../bang","../compare","../Objectbang","./Kind","./Method","./Type"],function(exports,Kind_0,Obj_45Type_1,_33_2,compare_3,Object_33_4,Kind_5,Method_6,Type_7){
	exports._get=_ms.lazy(function(){
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),unchecked_45kind_33=_ms.get(_$2,"unchecked-kind!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_1),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_2)
		}),_$5=_ms.lazyGetModule(_33_2),_33not=_ms.lazyProp(_$5,"!not"),_$6=_ms.lazyGetModule(compare_3),_61_63=_ms.lazyProp(_$6,"=?"),_$7=_ms.lazyGetModule(Object_33_4),empty_45Object_33=_ms.lazyProp(_$7,"empty-Object!"),_$8=_ms.lazyGetModule(Kind_5),kind_63=_ms.lazyProp(_$8,"kind?"),_$9=_ms.lazyGetModule(Method_6),impl_33=_ms.lazyProp(_$9,"impl!"),_$10=_ms.lazyGetModule(Type_7),contains_63=_ms.lazyProp(_$10,"contains?");
		const Impl_45Type=Kind(function(){
			const doc="TODO:REST\nEvery Impl-Type should have a `prototype` property.";
			const test=function(){
				return _ms.set(function(){
					const A=Kind(function(){
						const doc="A";
						return {
							doc:doc,
							displayName:"A"
						}
					}());
					const B=Kind(function(){
						const doc="B";
						return {
							doc:doc,
							displayName:"B"
						}
					}());
					const C=Obj_45Type(function(){
						const props=function(){
							const c=null;
							return {
								c:c,
								displayName:"props"
							}
						}();
						return {
							props:props,
							displayName:"C"
						}
					}());
					kind_33(B,A);
					kind_33(C,B);
					_ms.unlazy(_33)(_ms.unlazy(kind_63),B,A);
					_ms.unlazy(_33)(_ms.unlazy(kind_63),C,B);
					_ms.unlazy(_33)(_ms.unlazy(kind_63),C,A);
					return _ms.unlazy(_33not)(_ms.unlazy(kind_63),A,B)
				},"displayName","test")
			}();
			return {
				doc:doc,
				test:test,
				displayName:"Impl-Type"
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
					displayName:"props"
				}
			}();
			const test=function(){
				return _ms.set(function(){
					const x=_ms.unlazy(empty_45Object_33)();
					_ms.unlazy(impl_33)(_ms.unlazy(contains_63),self_45type(x),function(){
						return 1
					});
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.unlazy(contains_63)(x),1)
				},"displayName","test")
			}();
			return {
				doc:doc,
				props:props,
				test:test,
				displayName:"Self-Type"
			}
		}());
		kind_33(Self_45Type,Impl_45Type);
		const self_45type=exports["self-type"]=function(){
			return _ms.set(function(_){
				_ms.checkContains(Object,_,"_");
				return Self_45Type({
					prototype:_
				})
			},"displayName","self-type")
		}();
		const displayName=exports.displayName="Impl-Type";
		exports.default=Impl_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0ltcGwtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBV0Esa0JBQVksZUFDSTtHQUFmLFVBQ0M7R0FFRCxxQkFDTzttQkFBQSxVQUFBO0tBQU4sUUFBSSxlQUNJO01BQVAsVUFBTTs7Ozs7O0tBQ1AsUUFBSSxlQUNJO01BQVAsVUFBTTs7Ozs7O0tBQ1AsUUFBSSxxQkFDUTtNQUFYLHNCQUNNO09BQUwsUUFBQTs7Ozs7Ozs7Ozs7S0FDRixRQUFNLEVBQUU7S0FDUixRQUFNLEVBQUU7eUNBQ0EsRUFBRTt5Q0FDRixFQUFFO3lDQUNGLEVBQUU7bURBQ0MsRUFBRTtJQUFBOzs7Ozs7OztFQUVmLG9CQUFnQixXQUFTO0VBQ3pCLG9CQUFnQixTQUFTO0VBQ3pCLFFBQU0sS0FBSztFQUlWLHVDQUFXLHFCQUNRO0dBQWxCLFVBQ0M7R0FFRCxzQkFDTTtJQUFMLGdCQUFXOzs7Ozs7R0FDWixxQkFDTzttQkFBQSxVQUFBO0tBQU47aURBQ2lCLFlBQVUsR0FDSSxVQUFBO2FBQTlCO0tBQUE7dUVBQ2UsR0FBRztJQUFBOzs7Ozs7Ozs7RUFFckIsUUFBTSxZQUFVO0VBRWhCLGlEQUFZO2tCQUFBLFNBQUEsRUFDUTtzQkFETjtXQUNiLFlBQVU7ZUFBWTtJQUFBO0dBQUE7O0VBbkR4QixzQ0FBQTtrQkFxREEiLCJmaWxlIjoiVHlwZS9JbXBsLVR5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==