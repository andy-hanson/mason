"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Function","../../Generatorbang","../../Type/Js-Method","../../Type/Kind","../../Type/Method","../../Type/Wrap-Type","../at","../at-Type","./Seq","../../bang","./Seq"],function(exports,Function_0,Generator_33_1,Js_45Method_2,Kind_3,Method_4,Wrap_45Type_5,_64_6,_64_45Type_7,Seq_8,_33_9,Seq_10){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Function_0),thunk=_ms.get(_$2,"thunk"),Generator_33=_ms.getDefaultExport(Generator_33_1),_$3=_ms.getModule(Generator_33_1),empty_45Generator=_ms.get(_$3,"empty-Generator"),_$4=_ms.getModule(Js_45Method_2),js_45impl_33=_ms.get(_$4,"js-impl!"),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),self_45kind_33=_ms.get(_$5,"self-kind!"),_$6=_ms.getModule(Method_4),self_45impl_33=_ms.get(_$6,"self-impl!"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_5),_$8=_ms.getModule(_64_6),iterator=_ms.get(_$8,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_7),_$9=_ms.getModule(_64_45Type_7),empty=_ms.get(_$9,"empty"),from_45stream=_ms.get(_$9,"from-stream"),Seq=_ms.getDefaultExport(Seq_8),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_9)
		}),_$13=_ms.lazyGetModule(Seq_10),seq_61_63=_ms.lazyProp(_$13,"seq=?");
		const Stream=Wrap_45Type(function(){
			const doc="A Stream is a @ whose elements are the outputs of a Generator!.\nUnlike a Generator!, a Stream can be used multiple times.";
			const wrapped_45type=_ms.sub(Function,Generator_33);
			const test=function test(){
				const _=Stream(function*(){
					(yield 1);
					(yield 2)
				});
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63),_,[1,2]);
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),_,[1,2])
			};
			return {
				doc:doc,
				"wrapped-type":wrapped_45type,
				test:test,
				name:"Stream"
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
		js_45impl_33(iterator,Stream,function(){
			return this.val()
		});
		const name=exports.name="Stream";
		exports.default=Stream;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TdHJlYW0ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQWNBLGFBQVMsc0JBQ1M7R0FBakIsVUFDQztHQUVELDZCQUFjLFNBQVM7R0FDdkIsV0FDTyxlQUFBO0lBQU4sUUFBSSxPQUNVLFdBQUE7WUFBVjtZQUNBO0lBQUE7MENBQ0ksRUFBRSxDQUFFLEVBQUU7aURBRU4sRUFBRSxDQUFFLEVBQUU7R0FBQTs7Ozs7Ozs7RUFFaEIsZUFBVyxPQUFPO0VBQ2xCLGVBQVcsTUFBTSxPQUFRLE1BQU8sT0FDUSxVQUFBO1VBQXZDO0VBQUE7RUFDRCxlQUFXLGNBQVksT0FBUSxTQUFBLEVBQ0M7VUFBL0IsT0FDUSxVQUFBO1dBQVAsU0FBUTtHQUFBO0VBQUE7RUFFVixRQUFNLE9BQU87RUFDYixhQUFTLFNBQVMsT0FDUSxVQUFBO1VBQXpCOztFQXBDRCx3QkFBQTtrQkFzQ0EiLCJmaWxlIjoiYXQvU2VxL1N0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9