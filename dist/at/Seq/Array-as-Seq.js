"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../control","../../Fun","../../js","../../private/js-impl","../../Type/Kind","../../Type/Method","../at","../at-Type","./Seq","../../math/Num"],function(exports,compare_0,control_1,Fun_2,js_3,js_45impl_4,Kind_5,Method_6,_64_7,_64_45Type_8,Seq_9,Num_10){
	exports._get=_ms.lazy(function(){
		const _$4=_ms.getModule(compare_0),_60_63=_ms.get(_$4,"<?"),_$5=_ms.getModule(control_1),_if=_ms.get(_$5,"if"),_$6=_ms.getModule(Fun_2),thunk=_ms.get(_$6,"thunk"),_$7=_ms.getModule(js_3),js_45sub=_ms.get(_$7,"js-sub"),_$8=_ms.getModule(js_45impl_4),arrayIterator=_ms.get(_$8,"arrayIterator"),_$9=_ms.getModule(Kind_5),kind_33=_ms.get(_$9,"kind!"),self_45kind_33=_ms.get(_$9,"self-kind!"),_$10=_ms.getModule(Method_6),impl_33=_ms.get(_$10,"impl!"),self_45impl_33=_ms.get(_$10,"self-impl!"),_$11=_ms.getModule(_64_7),each_33=_ms.get(_$11,"each!"),count=_ms.get(_$11,"count"),iterator=_ms.get(_$11,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_8),_$12=_ms.getModule(_64_45Type_8),empty=_ms.get(_$12,"empty"),from_45stream=_ms.get(_$12,"from-stream"),Seq=_ms.getDefaultExport(Seq_9),_$13=_ms.getModule(Seq_9),_63nth=_ms.get(_$13,"?nth"),_$15=_ms.lazyGetModule(Num_10),Nat=_ms.lazyProp(_$15,"Nat");
		const exports={};
		const doc=exports.doc="Javascript's native mutable Array type. TODO: `Array` vs `Array!`";
		kind_33(Array,Seq);
		impl_33(count,Array,function(_){
			return _.length
		});
		impl_33(iterator,Array,arrayIterator);
		self_45kind_33(Array,_64_45Type);
		self_45impl_33(empty,Array,thunk([]));
		self_45impl_33(from_45stream,Array,function(stream){
			const arr=Array(0);
			each_33(stream,function(em){
				return arr.push(em)
			});
			return arr
		});
		impl_33(_63nth,Array,function(_,n){
			_ms.checkContains(_ms.unlazy(Nat),n,"n");
			return _if(_60_63(n,count(_)),_ms.lazy(function(){
				return js_45sub(_,n)
			}))
		});
		exports.default=Array;
		const displayName=exports.displayName="Array-as-Seq";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9BcnJheS1hcy1TZXEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lDQWdCQTs7O0VBQUEsc0JBQU07RUFFTixRQUFNLE1BQU07RUFFWixRQUFNLE1BQU0sTUFBTyxTQUFBLEVBQUM7VUFDbkI7O0VBRUQsUUFBTSxTQUFTLE1BQU07RUFFckIsZUFBVyxNQUFNO0VBQ2pCLGVBQVcsTUFBTSxNQUFPLE1BQU07RUFFOUIsZUFBVyxjQUFZLE1BQU8sU0FBQSxPQUFNO0dBQ25DLFVBQU0sTUFBTTtHQUNaLFFBQU0sT0FBUSxTQUFBLEdBQUU7V0FDZixTQUFTO0dBQUE7VUFDVjtFQUFBO0VBRUQsUUFBTSxPQUFLLE1BQU8sU0FBQSxFQUFFLEVBQUs7O1VBQ3hCLElBQUksT0FBRyxFQUFFLE1BQUE7V0FBVSxTQUFPLEVBQUU7R0FBQTtFQUFBO2tCQUU3QjtFQXJDQSxzQ0FBQSIsImZpbGUiOiJhdC9TZXEvQXJyYXktYXMtU2VxLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=