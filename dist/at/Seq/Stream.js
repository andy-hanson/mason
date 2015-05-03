"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Fun","../../Generatorbang","../../Type/Kind","../../Type/Method","../../Type/Wrap-Type","../at","../at-Type","./Seq","../../bang","./Seq"],function(exports,Fun_0,Generator_33_1,Kind_2,Method_3,Wrap_45Type_4,_64_5,_64_45Type_6,Seq_7,_33_8,Seq_9){
	exports._get=_ms.lazy(function(){
		const Fun=_ms.getDefaultExport(Fun_0),_$2=_ms.getModule(Fun_0),thunk=_ms.get(_$2,"thunk"),Generator_33=_ms.getDefaultExport(Generator_33_1),_$3=_ms.getModule(Generator_33_1),empty_45Generator=_ms.get(_$3,"empty-Generator"),_$4=_ms.getModule(Kind_2),kind_33=_ms.get(_$4,"kind!"),self_45kind_33=_ms.get(_$4,"self-kind!"),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),self_45impl_33=_ms.get(_$5,"self-impl!"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_4),_$7=_ms.getModule(_64_5),iterator=_ms.get(_$7,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_6),_$8=_ms.getModule(_64_45Type_6),empty=_ms.get(_$8,"empty"),from_45stream=_ms.get(_$8,"from-stream"),Seq=_ms.getDefaultExport(Seq_7),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_8)
		}),_$12=_ms.lazyGetModule(Seq_9),seq_61_63=_ms.lazyProp(_$12,"seq=?");
		const exports={};
		const Stream=Wrap_45Type(function(){
			const doc="A Stream is a @ whose elements are the outputs of a Generator!.\nUnlike a Generator!, a Stream can be used multiple times.";
			const wrapped_45type=_ms.sub(Fun,Generator_33);
			const test=function(){
				const _=Stream(function*(){
					(yield 1);
					return (yield 2)
				});
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63),_,[1,2]);
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),_,[1,2])
			};
			return {
				doc:doc,
				"wrapped-type":wrapped_45type,
				test:test,
				displayName:"Stream"
			}
		}());
		self_45kind_33(Stream,_64_45Type);
		self_45impl_33(empty,Stream,thunk(Stream(function(){
			return empty_45Generator
		})));
		self_45impl_33(from_45stream,Stream,function(_){
			return Stream(function(){
				return iterator(_)
			})
		});
		kind_33(Stream,Seq);
		impl_33(iterator,Stream,function(_){
			return _.val()
		});
		exports.default=Stream;
		const displayName=exports.displayName="Stream";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TdHJlYW0ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lDQWFBOzs7OztFQUFBLGFBQVMsc0JBQVM7R0FDakIsVUFDQztHQUVELDZCQUFjLElBQUc7R0FDakIsV0FBTyxVQUNOO0lBQUEsUUFBSSxPQUFTLFdBQ1o7S0FBRyxPQUFBO1lBQ0EsT0FBQTtJQUFBOzBDQUNJLEVBQUUsQ0FBRSxFQUFFO2lEQUVOLEVBQUUsQ0FBRSxFQUFFO0dBQUE7VUFYRTs7Ozs7OztFQWFsQixlQUFBLE9BQUE7RUFDQSxlQUFBLE1BQUEsT0FBd0IsTUFBTyxPQUFTLFVBQ3ZDO1VBQUE7RUFBQTtFQUNELGVBQUEsY0FBQSxPQUErQixTQUFBLEVBQzlCO1VBQUEsT0FBUSxVQUNQO1dBQUEsU0FBQTtHQUFBO0VBQUE7RUFFRixRQUFBLE9BQUE7RUFDQSxRQUFBLFNBQUEsT0FBdUIsU0FBQSxFQUN0QjtVQUFBOztrQkFFRDtFQXJDQSxzQ0FBQSIsImZpbGUiOiJhdC9TZXEvU3RyZWFtLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=