"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../Function","../../js","../../Type/Kind","../../Type/Method","../at","../at-Type","./Seq","../../math/Number"],function(exports,compare_0,Function_1,js_2,Kind_3,Method_4,_64_5,_64_45Type_6,Seq_7,Number_8){
	exports._get=_ms.lazy(function(){
		const _$4=_ms.getModule(compare_0),_60_63=_ms.get(_$4,"<?"),_$5=_ms.getModule(Function_1),thunk=_ms.get(_$5,"thunk"),_$6=_ms.getModule(js_2),js_45sub=_ms.get(_$6,"js-sub"),_$7=_ms.getModule(Kind_3),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),_$8=_ms.getModule(Method_4),impl_33=_ms.get(_$8,"impl!"),self_45impl_33=_ms.get(_$8,"self-impl!"),_$9=_ms.getModule(_64_5),count=_ms.get(_$9,"count"),_64_45Type=_ms.getDefaultExport(_64_45Type_6),_$10=_ms.getModule(_64_45Type_6),empty=_ms.get(_$10,"empty"),from_45stream=_ms.get(_$10,"from-stream"),Seq=_ms.getDefaultExport(Seq_7),_$11=_ms.getModule(Seq_7),_63nth=_ms.get(_$11,"?nth"),_$13=_ms.lazyGetModule(Number_8),Nat=_ms.lazyProp(_$13,"Nat");
		const doc=exports.doc=`Javascript's native mutable Array type. TODO: \`Array\` vs \`Array!\``;
		kind_33(Array,Seq);
		impl_33(count,Array,function(_){
			return _.length
		});
		self_45kind_33(Array,_64_45Type);
		self_45impl_33(empty,Array,thunk([]));
		self_45impl_33(from_45stream,Array,function(stream){
			const arr=Array(0);
			for(let _ of stream){
				arr.push(_)
			};
			return arr
		});
		impl_33(_63nth,Array,function(_,n){
			_ms.checkContains(_ms.unlazy(Nat),n,"n");
			return _ms.bool(_60_63(n,count(_)))?_ms.some(function(){
				return js_45sub(_,n)
			}()):_ms.None
		});
		const name=exports.name=`Array-as-Seq`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9BcnJheS1hcy1TZXEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFjQSxzQkFBTTtFQUVOLFFBQU0sTUFBTTtFQUVaLFFBQU0sTUFBTSxNQUFPLFNBQUEsRUFDQztVQUFuQjs7RUFFRCxlQUFXLE1BQU07RUFDakIsZUFBVyxNQUFNLE1BQU8sTUFBTTtFQUU5QixlQUFXLGNBQVksTUFBTyxTQUFBLE9BQ007R0FBbkMsVUFBTSxNQUFNO0dBQ1AsUUFBQSxLQUFBLE9BQ007SUFBVixTQUFTO0dBQUE7VUFDVjtFQUFBO0VBRUQsUUFBTSxPQUFLLE1BQU8sU0FBQSxFQUFFLEVBQ0s7O21CQUFyQixPQUFHLEVBQUUsTUFBSyx3QkFDQztXQUFiLFNBQU8sRUFBRTtHQUFBOztFQWhDWCx3QkFBQSIsImZpbGUiOiJhdC9TZXEvQXJyYXktYXMtU2VxLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=