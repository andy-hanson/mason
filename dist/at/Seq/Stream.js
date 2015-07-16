"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Function","../../Generatorbang","../../Type/Js-Method","../../Type/Kind","../../Type/Wrap-Type","../at","../at-Type","./Seq","./Seq"],function(exports,Function_0,Generator_33_1,Js_45Method_2,Kind_3,Wrap_45Type_4,_64_5,_64_45Type_6,Seq_7,Seq_8){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Function_0),thunk=_ms.get(_$2,"thunk"),Generator_33=_ms.getDefaultExport(Generator_33_1),_$3=_ms.getModule(Generator_33_1),empty_45Generator=_ms.get(_$3,"empty-Generator"),_$4=_ms.getModule(Js_45Method_2),js_45impl_33=_ms.get(_$4,"js-impl!"),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),self_45kind_33=_ms.get(_$5,"self-kind!"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_4),_$7=_ms.getModule(_64_5),iterator=_ms.get(_$7,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_6),_$8=_ms.getModule(_64_45Type_6),empty=_ms.get(_$8,"empty"),from_45stream=_ms.get(_$8,"from-stream"),Seq=_ms.getDefaultExport(Seq_7),_$11=_ms.lazyGetModule(Seq_8),seq_61_63=_ms.lazyProp(_$11,"seq=?");
		const Stream=Wrap_45Type(function(){
			const built={};
			const doc=built.doc=`A Stream is a @ whose elements are the outputs of a Generator!.\nUnlike a Generator!, a Stream can be used multiple times.`;
			const wrapped_45type=built["wrapped-type"]=_ms.sub(Function,Generator_33);
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
		self_45kind_33(Stream,_64_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,empty,thunk(Stream(function(){
				return empty_45Generator
			})));
			_ms.assoc(built,from_45stream,function(_){
				return Stream(function(){
					return iterator(_)
				})
			});
			return built
		}());
		js_45impl_33(iterator,Stream,function(){
			return this.val()
		});
		kind_33(Stream,Seq);
		const name=exports.name=`Stream`;
		exports.default=Stream;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TdHJlYW0ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFZQSxhQUFRLHNCQUNTOztHQUFoQixvQkFDQztHQUVELG1EQUFjLFNBQVM7R0FDdkIsc0JBQ1EsZUFBQTtJQUFQLFFBQUksT0FDVSxXQUFBO1lBQVY7WUFDQTtJQUFBO3FDQUNVLEVBQUUsQ0FBRSxFQUFFO3FDQUVOLEVBQUUsQ0FBRSxFQUFFO0dBQUE7OztFQUV0QixlQUFXLE9BQU8scUJBQ007O21CQUF2QixNQUFTLE1BQU8sT0FDUSxVQUFBO1dBQXZCO0dBQUE7bUJBQ0QsY0FBZ0IsU0FBQSxFQUNDO1dBQWhCLE9BQ1EsVUFBQTtZQUFQLFNBQVE7SUFBQTtHQUFBOzs7RUFFWCxhQUFTLFNBQVMsT0FDUSxVQUFBO1VBQXpCOztFQUNELFFBQU0sT0FBTztFQWxDYix3QkFBQTtrQkFZQSIsImZpbGUiOiJhdC9TZXEvU3RyZWFtLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=