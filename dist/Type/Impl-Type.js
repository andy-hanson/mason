"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Kind","./Obj-Type","../bang","../compare","../Objectbang","./Kind","./Method","./Type"],function(exports,Kind_0,Obj_45Type_1,_33_2,compare_3,Object_33_4,Kind_5,Method_6,Type_7){
	exports._get=_ms.lazy(function(){
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_$2["kind!"],unchecked_45kind_33=_$2["unchecked-kind!"],Obj_45Type=_ms.getDefaultExport(Obj_45Type_1),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_2)
		}),_$5=_ms.lazyGetModule(_33_2),_33not=_ms.lazyProp(_$5,"!not"),_$6=_ms.lazyGetModule(compare_3),_61_63=_ms.lazyProp(_$6,"=?"),_$7=_ms.lazyGetModule(Object_33_4),empty_45Object_33=_ms.lazyProp(_$7,"empty-Object!"),_$8=_ms.lazyGetModule(Kind_5),kind_63=_ms.lazyProp(_$8,"kind?"),_$9=_ms.lazyGetModule(Method_6),impl_33=_ms.lazyProp(_$9,"impl!"),_$10=_ms.lazyGetModule(Type_7),contains_63=_ms.lazyProp(_$10,"contains?");
		const Impl_45Type=Kind(function(){
			const doc="TODO:REST\nEvery Impl-Type should have a `prototype` property.";
			return {
				doc:doc,
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
			return {
				doc:doc,
				props:props,
				name:"Self-Type"
			}
		}());
		kind_33(Self_45Type,Impl_45Type);
		const self_45type=exports["self-type"]=function self_45type(_){
			return Self_45Type({
				prototype:_
			})
		};
		const name=exports.name="Impl-Type";
		exports.default=Impl_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0ltcGwtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBV0Esa0JBQVksZUFDSTtHQUFmLFVBQ0M7Ozs7OztFQWlCRixvQkFBZ0IsV0FBUztFQUN6QixvQkFBZ0IsU0FBUztFQUN6QixRQUFNLEtBQUs7RUFJVix1Q0FBVyxxQkFDUTtHQUFsQixVQUNDO0dBRUQsc0JBQ007SUFBTCxnQkFBVzs7Ozs7Ozs7Ozs7O0VBT2IsUUFBTSxZQUFVO0VBRWhCLHVDQUFZLHFCQUFBLEVBQ1E7VUFBbkIsWUFBVTtjQUFZO0dBQUE7RUFBQTtFQW5EeEIsd0JBQUE7a0JBcURBIiwiZmlsZSI6IlR5cGUvSW1wbC1UeXBlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=