"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Function","../../Generator","../../Type/Kind","../../Type/Method","../../Type/Wrap-Type","../at","../at-Type","./Seq","./Seq"],(exports,Function_0,Generator_1,Kind_2,Method_3,Wrap_45Type_4,_64_5,_64_45Type_6,Seq_7,Seq_8)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Function_0),thunk=_ms.get(_$2,"thunk"),Generator=_ms.getDefaultExport(Generator_1),_$3=_ms.getModule(Generator_1),empty_45Generator=_ms.get(_$3,"empty-Generator"),_$4=_ms.getModule(Kind_2),kind_33=_ms.get(_$4,"kind!"),self_45kind_33=_ms.get(_$4,"self-kind!"),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),self_45impl_33=_ms.get(_$5,"self-impl!"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_4),_$7=_ms.getModule(_64_5),iterator=_ms.get(_$7,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_6),_$8=_ms.getModule(_64_45Type_6),empty=_ms.get(_$8,"empty"),from_45stream=_ms.get(_$8,"from-stream"),Seq=_ms.getDefaultExport(Seq_7),_$11=_ms.lazyGetModule(Seq_8),seq_61_63=_ms.lazyProp(_$11,"seq=?");
		const Stream=Wrap_45Type(()=>{
			const built={};
			const doc=built.doc=`A Stream is a @ whose elements are the outputs of a Generator.\nUnlike a Generator, a Stream can be used multiple times.`;
			const wrapped_45type=built["wrapped-type"]=_ms.sub(Function,Generator);
			const test=built.test=function test(){
				const _=Stream(function*(){
					(yield 1);
					(yield 2)
				});
				_ms.assert(_ms.unlazy(seq_61_63),_,[1,2]);
				_ms.assert(_ms.unlazy(seq_61_63),_,[1,2])
			};
			return _ms.setName(built,"Stream")
		}());
		self_45kind_33(Stream,_64_45Type);
		self_45impl_33(empty,Stream,thunk(Stream(()=>{
			return empty_45Generator
		})));
		self_45impl_33(from_45stream,Stream,_=>{
			return Stream(()=>{
				return iterator(_)
			})
		});
		impl_33(iterator,Stream,function(){
			const _this=this;
			return _this.val()
		});
		kind_33(Stream,Seq);
		const name=exports.name=`Stream`;
		exports.default=Stream;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TdHJlYW0ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFZQSxhQUFRLGdCQUNTOztHQUFoQixvQkFDQztHQUVELG1EQUFjLFNBQVM7R0FDdkIsc0JBQ1EsZUFBQTtJQUFQLFFBQUksT0FDVSxXQUFBO1lBQVY7WUFDQTtJQUFBO3FDQUNVLEVBQUUsQ0FBRSxFQUFFO3FDQUVOLEVBQUUsQ0FBRSxFQUFFO0dBQUE7OztFQUV0QixlQUFXLE9BQU87RUFDbEIsZUFBVyxNQUFNLE9BQVEsTUFBTyxPQUNRLElBQUE7VUFBdkM7RUFBQTtFQUNELGVBQVcsY0FBWSxPQUFRLEdBQ0M7VUFBL0IsT0FDUSxJQUFBO1dBQVAsU0FBUTtHQUFBO0VBQUE7RUFFVixRQUFNLFNBQVMsT0FDUyxVQUFBO1NBQXZCO1VBQUE7O0VBQ0QsUUFBTSxPQUFPO0VBbENiLHdCQUFBO2tCQVlBIiwiZmlsZSI6ImF0L1NlcS9TdHJlYW0uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==