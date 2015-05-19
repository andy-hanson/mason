"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../bang","../../at/at","../../at/Seq/Seq","../../at/Seq/Stream","../../compare","../../math/Number","../../math/methods","../../Type/Type"],function(exports,_33_0,_64_1,Seq_2,Stream_3,compare_4,Number_5,methods_6,Type_7){
	exports._get=_ms.lazy(function(){
		const _33=_ms.getDefaultExport(_33_0),_$3=_ms.getModule(_64_1),fold_45map=_$3["fold-map"],_$4=_ms.getModule(Seq_2),reverse=_$4.reverse,tail=_$4.tail,take_45while_39=_$4["take-while'"],Stream=_ms.getDefaultExport(Stream_3),_$6=_ms.getModule(compare_4),_61_63=_$6["=?"],_60_61_63=_$6["<=?"],_$7=_ms.getModule(Number_5),Nat=_$7.Nat,_$8=_ms.getModule(methods_6),_43=_$8["+"],_45=_$8["-"],_$9=_ms.getModule(Type_7),_61_62=_$9["=>"];
		const fibs=function(){
			const rec=function* rec(prev,cur){
				(yield cur);
				return (yield* rec(cur,_43(prev,cur)))
			};
			return Stream(_ms.sub(rec,0,1))
		}();
		const zeckendorf=exports.zeckendorf=function(){
			const doc="http://rosettacode.org/wiki/Zeckendorf_number_representation";
			return _ms.set(function zeckendorf(n){
				const z_45fibs=tail(fibs);
				const candidate_45fibs=reverse(take_45while_39(z_45fibs,function(_){
					return _60_61_63(_,n)
				}));
				const _$28=fold_45map(candidate_45fibs,n,function(left,fib){
					return function(){
						const _=fib;
						if(_60_61_63(_,left)){
							const here=1;
							const next=_45(left,_);
							return {
								here:here,
								next:next
							}
						} else {
							const here=0;
							const next=left;
							return {
								here:here,
								next:next
							}
						}
					}()
				}),mapped=_$28.mapped,folded=_$28.folded;
				_33(_61_63,0,folded);
				return _61_62(String,mapped)
			},"doc",doc)
		}();
		const name=exports.name="zeckendorf";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vemVja2VuZG9yZi5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVVBLHFCQUNNO0dBQUwsVUFBUSxjQUFBLEtBQVMsSUFDTztXQUFwQjtXQUNDLFFBQUEsSUFBSSxJQUFLLElBQUUsS0FBSztHQUFBO1VBQ3JCLGVBQU8sSUFBSSxFQUFFO0VBQUE7RUFFZCw4Q0FDVztHQUFWLFVBQU07a0JBTUwsb0JBQUEsRUFDSztJQUFMLGVBQVMsS0FBSztJQUNkLHVCQUFpQixRQUFTLGdCQUFZLFNBQVEsU0FBQSxFQUNDO1lBQTlDLFVBQUksRUFBRTtJQUFBO0lBQ1AsV0FBZ0IsV0FBUyxpQkFBZSxFQUFHLFNBQUEsS0FBSyxJQUNHOztNQUE3QyxRQUFBO01BQ0osR0FBQSxVQUFJLEVBQUUsTUFDSTtPQUFULFdBQU07T0FDTixXQUFNLElBQUUsS0FBSzs7Ozs7YUFFVjtPQUFILFdBQU07T0FDTixXQUFNOzs7Ozs7OztJQUNULElBQUUsT0FBRyxFQUFFO1dBQ1AsT0FBRyxPQUFPO0dBQUE7O0VBcENaLHdCQUFBIiwiZmlsZSI6Im1ldGEvZGVtby96ZWNrZW5kb3JmLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=