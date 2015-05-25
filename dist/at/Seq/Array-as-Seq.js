"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../control","../../Function","../../js","../../Type/Kind","../../Type/Method","../at","../at-Type","./Seq","../../math/Number"],function(exports,compare_0,control_1,Function_2,js_3,Kind_4,Method_5,_64_6,_64_45Type_7,Seq_8,Number_9){
	exports._get=_ms.lazy(function(){
		const _$4=_ms.getModule(compare_0),_60_63=_ms.get(_$4,"<?"),_$5=_ms.getModule(control_1),_if=_ms.get(_$5,"if"),_$6=_ms.getModule(Function_2),thunk=_ms.get(_$6,"thunk"),_$7=_ms.getModule(js_3),js_45sub=_ms.get(_$7,"js-sub"),_$8=_ms.getModule(Kind_4),kind_33=_ms.get(_$8,"kind!"),self_45kind_33=_ms.get(_$8,"self-kind!"),_$9=_ms.getModule(Method_5),impl_33=_ms.get(_$9,"impl!"),self_45impl_33=_ms.get(_$9,"self-impl!"),_$10=_ms.getModule(_64_6),count=_ms.get(_$10,"count"),_64_45Type=_ms.getDefaultExport(_64_45Type_7),_$11=_ms.getModule(_64_45Type_7),empty=_ms.get(_$11,"empty"),from_45stream=_ms.get(_$11,"from-stream"),Seq=_ms.getDefaultExport(Seq_8),_$12=_ms.getModule(Seq_8),_63nth=_ms.get(_$12,"?nth"),_$14=_ms.lazyGetModule(Number_9),Nat=_ms.lazyProp(_$14,"Nat");
		const doc=exports.doc="Javascript's native mutable Array type. TODO: `Array` vs `Array!`";
		kind_33(Array,Seq);
		impl_33(count,Array,function(_){
			return _.length
		});
		self_45kind_33(Array,_64_45Type);
		self_45impl_33(empty,Array,thunk([]));
		self_45impl_33(from_45stream,Array,function(stream){
			const arr=Array(0);
			for(let _ of stream[Symbol.iterator]()){
				arr.push(_)
			};
			return arr
		});
		impl_33(_63nth,Array,function(_,n){
			_ms.checkContains(_ms.unlazy(Nat),n,"n");
			return _if(_60_63(n,count(_)),_ms.lazy(function(){
				return js_45sub(_,n)
			}))
		});
		const name=exports.name="Array-as-Seq";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9BcnJheS1hcy1TZXEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFlQSxzQkFBTTtFQUVOLFFBQU0sTUFBTTtFQUVaLFFBQU0sTUFBTSxNQUFPLFNBQUEsRUFDQztVQUFuQjs7RUFFRCxlQUFXLE1BQU07RUFDakIsZUFBVyxNQUFNLE1BQU8sTUFBTTtFQUU5QixlQUFXLGNBQVksTUFBTyxTQUFBLE9BQ007R0FBbkMsVUFBTSxNQUFNO0dBQ1AsUUFBQSxLQUFBLDBCQUNNO0lBQVYsU0FBUztHQUFBO1VBQ1Y7RUFBQTtFQUVELFFBQU0sT0FBSyxNQUFPLFNBQUEsRUFBRSxFQUNLOztVQUF4QixJQUFJLE9BQUcsRUFBRSxNQUFLO1dBQUssU0FBTyxFQUFFO0dBQUE7RUFBQTtFQWhDN0Isd0JBQUEiLCJmaWxlIjoiYXQvU2VxL0FycmF5LWFzLVNlcS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9