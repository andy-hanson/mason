"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../control","../../Function","../../js","../../private/js-impl","../../Type/Kind","../../Type/Method","../at","../at-Type","./Seq","../../math/Number"],function(exports,compare_0,control_1,Function_2,js_3,js_45impl_4,Kind_5,Method_6,_64_7,_64_45Type_8,Seq_9,Number_10){
	exports._get=_ms.lazy(function(){
		const _$4=_ms.getModule(compare_0),_60_63=_$4["<?"],_$5=_ms.getModule(control_1),_if=_$5.if,_$6=_ms.getModule(Function_2),thunk=_$6.thunk,_$7=_ms.getModule(js_3),js_45sub=_$7["js-sub"],_$8=_ms.getModule(js_45impl_4),arrayIterator=_$8.arrayIterator,_$9=_ms.getModule(Kind_5),kind_33=_$9["kind!"],self_45kind_33=_$9["self-kind!"],_$10=_ms.getModule(Method_6),impl_33=_$10["impl!"],self_45impl_33=_$10["self-impl!"],_$11=_ms.getModule(_64_7),count=_$11.count,iterator=_$11.iterator,_64_45Type=_ms.getDefaultExport(_64_45Type_8),_$12=_ms.getModule(_64_45Type_8),empty=_$12.empty,from_45stream=_$12["from-stream"],Seq=_ms.getDefaultExport(Seq_9),_$13=_ms.getModule(Seq_9),_63nth=_$13["?nth"],_$15=_ms.lazyGetModule(Number_10),Nat=_ms.lazyProp(_$15,"Nat");
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
			for(let _ of _ms.iterator(stream)){
				arr.push(_)
			};
			return arr
		});
		impl_33(_63nth,Array,function(_,n){
			return _if(_60_63(n,count(_)),_ms.lazy(function(){
				return js_45sub(_,n)
			}))
		});
		const name=exports.name="Array-as-Seq";
		exports.default=Array;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9BcnJheS1hcy1TZXEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFnQkEsc0JBQU07RUFFTixRQUFNLE1BQU07RUFFWixRQUFNLE1BQU0sTUFBTyxTQUFBLEVBQ0M7VUFBbkI7O0VBRUQsUUFBTSxTQUFTLE1BQU07RUFFckIsZUFBVyxNQUFNO0VBQ2pCLGVBQVcsTUFBTSxNQUFPLE1BQU07RUFFOUIsZUFBVyxjQUFZLE1BQU8sU0FBQSxPQUNNO0dBQW5DLFVBQU0sTUFBTTtHQUNQLFFBQUEsa0JBQUEsUUFDTTtJQUFWLFNBQVM7R0FBQTtVQUNWO0VBQUE7RUFFRCxRQUFNLE9BQUssTUFBTyxTQUFBLEVBQUUsRUFDSztVQUF4QixJQUFJLE9BQUcsRUFBRSxNQUFBO1dBQVUsU0FBTyxFQUFFO0dBQUE7RUFBQTtFQW5DN0Isd0JBQUE7a0JBcUNBIiwiZmlsZSI6ImF0L1NlcS9BcnJheS1hcy1TZXEuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==