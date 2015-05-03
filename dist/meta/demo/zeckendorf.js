"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../bang","../../at/at","../../at/Seq/Seq","../../at/Seq/Stream","../../compare","../../math/Num","../../math/methods","../../Str","../../Type/Type"],function(exports,_33_0,_64_1,Seq_2,Stream_3,compare_4,Num_5,methods_6,Str_7,Type_8){
	exports._get=_ms.lazy(function(){
		const _33=_ms.getDefaultExport(_33_0),_$3=_ms.getModule(_64_1),fold_45map=_ms.get(_$3,"fold-map"),_$4=_ms.getModule(Seq_2),reverse=_ms.get(_$4,"reverse"),tail=_ms.get(_$4,"tail"),take_45while_39=_ms.get(_$4,"take-while'"),Stream=_ms.getDefaultExport(Stream_3),_$6=_ms.getModule(compare_4),_61_63=_ms.get(_$6,"=?"),_60_61_63=_ms.get(_$6,"<=?"),_$7=_ms.getModule(Num_5),Nat=_ms.get(_$7,"Nat"),_$8=_ms.getModule(methods_6),_43=_ms.get(_$8,"+"),_45=_ms.get(_$8,"-"),Str=_ms.getDefaultExport(Str_7),_$10=_ms.getModule(Type_8),_61_62=_ms.get(_$10,"=>");
		const exports={};
		const fibs=function(){
			const rec=function*(prev,cur){
				_ms.checkContains(Nat,prev,"prev");
				_ms.checkContains(Nat,cur,"cur");
				(yield cur);
				return (yield* rec(cur,_43(prev,cur)))
			};
			return Stream(_ms.sub(rec,0,1))
		}();
		const zeckendorf=exports.zeckendorf=function(){
			const doc="http://rosettacode.org/wiki/Zeckendorf_number_representation";
			const test=function(){
				const _k0=[0],_v0="";
				const _k1=[1],_v1="1";
				const _k2=[19],_v2="101001";
				const _k3=[1111],_v3="100001010000001";
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3)
			};
			return _ms.set(function(n){
				_ms.checkContains(Nat,n,"n");
				const z_45fibs=tail(fibs);
				const candidate_45fibs=reverse(take_45while_39(z_45fibs,function(_){
					return _60_61_63(_,n)
				}));
				const _$29=fold_45map(candidate_45fibs,n,function(left,fib){
					return function(){
						const _=fib;
						if(_ms.bool(_60_61_63(_,left))){
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
				}),mapped=_$29.mapped,folded=_$29.folded;
				_33(_61_63,0,folded);
				return _61_62(Str,mapped)
			},"doc",doc,"test",test,"displayName","zeckendorf")
		}();
		const displayName=exports.displayName="zeckendorf";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vemVja2VuZG9yZi5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7aUNBV0E7OztFQUFBLHFCQUFNO0dBQ0wsVUFBUSxVQUFBLEtBQVMsSUFDaEI7c0JBRFk7c0JBQVE7SUFDakIsT0FBQTtXQUNDLFFBQUEsSUFBQSxJQUFRLElBQUEsS0FBQTtHQUFBO1VBQ2IsZUFBTyxJQUFJLEVBQUU7RUFBQTtFQUVkLDhDQUFXO0dBQ1YsVUFBTTtHQUNOLFdBQU8sVUFDTjtJQUFBLFVBQUEsQ0FBRSxPQUFRO0lBQ1YsVUFBQSxDQUFFLE9BQVE7SUFDVixVQUFBLENBQUUsUUFBUztJQUNYLFVBQUEsQ0FBRSxVQUFXOzs7a0JBQ2IsU0FBQSxFQUNBO3NCQURFO0lBQ0YsZUFBUyxLQUFBO0lBQ1QsdUJBQWlCLFFBQVEsZ0JBQUEsU0FBcUIsU0FBQSxFQUM3QztZQUFBLFVBQUksRUFBSjtJQUFBO0lBQ0QsV0FBZ0IsV0FBQSxpQkFBQSxFQUEyQixTQUFBLEtBQUssSUFDL0M7O01BQUssUUFBQTtNQUNKLFlBQUEsVUFBSSxFQUFKLE9BQ0M7T0FBQSxXQUFNO09BQ04sV0FBTSxJQUFBLEtBQU87Y0FEYjs7OzthQUdBO09BQUEsV0FBTTtPQUNOLFdBQU07Y0FETjs7Ozs7OztJQUVILElBQUEsT0FBSyxFQUFMO1dBQ0EsT0FBQSxJQUFBO0dBQUE7O0VBckNGLHNDQUFBIiwiZmlsZSI6Im1ldGEvZGVtby96ZWNrZW5kb3JmLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=