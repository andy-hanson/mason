"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Function","../../Generatorbang","../../Type/Js-Method","../../Type/Kind","../../Type/Wrap-Type","../at","../at-Type","./Seq","../../bang","./Seq"],function(exports,Function_0,Generator_33_1,Js_45Method_2,Kind_3,Wrap_45Type_4,_64_5,_64_45Type_6,Seq_7,_33_8,Seq_9){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Function_0),thunk=_ms.get(_$2,"thunk"),Generator_33=_ms.getDefaultExport(Generator_33_1),_$3=_ms.getModule(Generator_33_1),empty_45Generator=_ms.get(_$3,"empty-Generator"),_$4=_ms.getModule(Js_45Method_2),js_45impl_33=_ms.get(_$4,"js-impl!"),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),self_45kind_33=_ms.get(_$5,"self-kind!"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_4),_$7=_ms.getModule(_64_5),iterator=_ms.get(_$7,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_6),_$8=_ms.getModule(_64_45Type_6),empty=_ms.get(_$8,"empty"),from_45stream=_ms.get(_$8,"from-stream"),Seq=_ms.getDefaultExport(Seq_7),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_8)
		}),_$12=_ms.lazyGetModule(Seq_9),seq_61_63=_ms.lazyProp(_$12,"seq=?");
		const Stream=Wrap_45Type(function(){
			const built={};
			const doc=built.doc=`A Stream is a @ whose elements are the outputs of a Generator!.\nUnlike a Generator!, a Stream can be used multiple times.`;
			const wrapped_45type=built["wrapped-type"]=_ms.sub(Function,Generator_33);
			const test=built.test=function test(){
				const _=Stream(function*(){
					(yield 1);
					(yield 2)
				});
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63),_,[1,2]);
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),_,[1,2])
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TdHJlYW0ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQWFBLGFBQVEsc0JBQ1M7O0dBQWhCLG9CQUNDO0dBRUQsbURBQWMsU0FBUztHQUN2QixzQkFDTyxlQUFBO0lBQU4sUUFBSSxPQUNVLFdBQUE7WUFBVjtZQUNBO0lBQUE7MENBQ0ksRUFBRSxDQUFFLEVBQUU7aURBRU4sRUFBRSxDQUFFLEVBQUU7R0FBQTs7O0VBRWhCLGVBQVcsT0FBTyxxQkFDTTs7bUJBQXZCLE1BQVMsTUFBTyxPQUNRLFVBQUE7V0FBdkI7R0FBQTttQkFDRCxjQUFnQixTQUFBLEVBQ0M7V0FBaEIsT0FDUSxVQUFBO1lBQVAsU0FBUTtJQUFBO0dBQUE7OztFQUVYLGFBQVMsU0FBUyxPQUNRLFVBQUE7VUFBekI7O0VBQ0QsUUFBTSxPQUFPO0VBbkNiLHdCQUFBO2tCQWFBIiwiZmlsZSI6ImF0L1NlcS9TdHJlYW0uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==