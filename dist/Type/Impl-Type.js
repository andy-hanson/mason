"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../private/bootstrap","./Kind","./Obj-Type","../bang","../compare","../Objbang","./Kind","./Method","./Type"],function(exports,bootstrap_0,Kind_1,Obj_45Type_2,_33_3,compare_4,Obj_33_5,Kind_6,Method_7,Type_8){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(bootstrap_0),Fun=_ms.get(_$2,"Fun"),Obj=_ms.get(_$2,"Obj"),Kind=_ms.getDefaultExport(Kind_1),_$3=_ms.getModule(Kind_1),kind_33=_ms.get(_$3,"kind!"),unchecked_45kind_33=_ms.get(_$3,"unchecked-kind!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_2),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_3)
		}),_$6=_ms.lazyGetModule(_33_3),_33not=_ms.lazyProp(_$6,"!not"),_$7=_ms.lazyGetModule(compare_4),_61_63=_ms.lazyProp(_$7,"=?"),_$8=_ms.lazyGetModule(Obj_33_5),empty_45Obj_33=_ms.lazyProp(_$8,"empty-Obj!"),_$9=_ms.lazyGetModule(Kind_6),kind_63=_ms.lazyProp(_$9,"kind?"),_$10=_ms.lazyGetModule(Method_7),impl_33=_ms.lazyProp(_$10,"impl!"),_$11=_ms.lazyGetModule(Type_8),contains_63=_ms.lazyProp(_$11,"contains?");
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
		unchecked_45kind_33(Fun,Impl_45Type);
		kind_33(Kind,Impl_45Type);
		const Self_45Type=exports["Self-Type"]=Obj_45Type(function(){
			const doc="Impl-Type with exactly one member.\nCalling impl! on it will directly modify an Obj to contain method implementations.";
			const props=function(){
				const prototype=Obj;
				return {
					prototype:prototype,
					displayName:"props"
				}
			}();
			const test=function(){
				return _ms.set(function(){
					const x=_ms.unlazy(empty_45Obj_33)();
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
				_ms.checkContains(Obj,_,"_");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0ltcGwtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBWUEsa0JBQVksZUFDSTtHQUFmLFVBQ0M7R0FFRCxxQkFDTzttQkFBQSxVQUFBO0tBQU4sUUFBSSxlQUNJO01BQVAsVUFBTTs7Ozs7O0tBQ1AsUUFBSSxlQUNJO01BQVAsVUFBTTs7Ozs7O0tBQ1AsUUFBSSxxQkFDUTtNQUFYLHNCQUNNO09BQUwsUUFBQTs7Ozs7Ozs7Ozs7S0FDRixRQUFNLEVBQUU7S0FDUixRQUFNLEVBQUU7eUNBQ0EsRUFBRTt5Q0FDRixFQUFFO3lDQUNGLEVBQUU7bURBQ0MsRUFBRTtJQUFBOzs7Ozs7OztFQUVmLG9CQUFnQixXQUFTO0VBQ3pCLG9CQUFnQixJQUFJO0VBQ3BCLFFBQU0sS0FBSztFQUlWLHVDQUFXLHFCQUNRO0dBQWxCLFVBQ0M7R0FFRCxzQkFDTTtJQUFMLGdCQUFXOzs7Ozs7R0FDWixxQkFDTzttQkFBQSxVQUFBO0tBQU47aURBQ2lCLFlBQVUsR0FDSSxVQUFBO2FBQTlCO0tBQUE7dUVBQ2UsR0FBRztJQUFBOzs7Ozs7Ozs7RUFFckIsUUFBTSxZQUFVO0VBRWhCLGlEQUFZO2tCQUFBLFNBQUEsRUFDSztzQkFESDtXQUNiLFlBQVU7ZUFBWTtJQUFBO0dBQUE7O0VBcER4QixzQ0FBQTtrQkFzREEiLCJmaWxlIjoiVHlwZS9JbXBsLVR5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==