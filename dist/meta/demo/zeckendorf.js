"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../bang","../../at/at","../../at/Seq/Seq","../../at/Seq/Stream","../../compare","../../math/Number","../../math/methods","../../Type/Type"],function(exports,_33_0,_64_1,Seq_2,Stream_3,compare_4,Number_5,methods_6,Type_7){
	exports._get=_ms.lazy(function(){
		const _33=_ms.getDefaultExport(_33_0),_$3=_ms.getModule(_64_1),map=_ms.get(_$3,"map"),_$4=_ms.getModule(Seq_2),reverse=_ms.get(_$4,"reverse"),tail=_ms.get(_$4,"tail"),take_45while_39=_ms.get(_$4,"take-while'"),Stream=_ms.getDefaultExport(Stream_3),_$6=_ms.getModule(compare_4),_61_63=_ms.get(_$6,"=?"),_60_61_63=_ms.get(_$6,"<=?"),_$7=_ms.getModule(Number_5),Nat=_ms.get(_$7,"Nat"),_$8=_ms.getModule(methods_6),_43=_ms.get(_$8,"+"),_45=_ms.get(_$8,"-"),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>");
		const fibs=function(){
			const rec=function* rec(prev,cur){
				_ms.checkContains(Nat,prev,"prev");
				_ms.checkContains(Nat,cur,"cur");
				(yield cur);
				return (yield* rec(cur,_43(prev,cur)))
			};
			return Stream(_ms.sub(rec,0,1))
		}();
		const zeckendorf=exports.zeckendorf=function(){
			const doc="http://rosettacode.org/wiki/Zeckendorf_number_representation";
			const test=function test(){
				const _k0=[0],_v0="";
				const _k1=[1],_v1="1";
				const _k2=[19],_v2="101001";
				const _k3=[1111],_v3="100001010000001";
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3)
			};
			return _ms.set(function zeckendorf(n){
				_ms.checkContains(Nat,n,"n");
				const z_45fibs=tail(fibs);
				const candidate_45fibs=reverse(take_45while_39(z_45fibs,function(_){
					return _60_61_63(_,n)
				}));
				let left=n;
				const digits=map(candidate_45fibs,function(_){
					return function(){
						if(_ms.bool(_60_61_63(_,left))){
							left=_45(left,_);
							return 1
						} else {
							return 0
						}
					}()
				});
				_33(_61_63,0,left);
				return _61_62(String,digits)
			},"doc",doc,"test",test)
		}();
		const name=exports.name="zeckendorf";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vemVja2VuZG9yZi5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVVBLHFCQUNNO0dBQUwsVUFBUSxjQUFBLEtBQVMsSUFDTztzQkFEWDtzQkFBUTtXQUNqQjtXQUNDLFFBQUEsSUFBSSxJQUFLLElBQUUsS0FBSztHQUFBO1VBQ3JCLGVBQU8sSUFBSSxFQUFFO0VBQUE7RUFFZCw4Q0FDVztHQUFWLFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixVQUFBLENBQUUsT0FBUTtJQUNWLFVBQUEsQ0FBRSxPQUFRO0lBQ1YsVUFBQSxDQUFFLFFBQVM7SUFDWCxVQUFBLENBQUUsVUFBVzs7O2tCQUNiLG9CQUFBLEVBQ0s7c0JBREg7SUFDRixlQUFTLEtBQUs7SUFDZCx1QkFBaUIsUUFBUyxnQkFBWSxTQUFRLFNBQUEsRUFDQztZQUE5QyxVQUFJLEVBQUU7SUFBQTtJQUNQLFNBQVM7SUFDVCxhQUFTLElBQUksaUJBQWdCLFNBQUEsRUFBQTs7TUFDNUIsWUFBQSxVQUFJLEVBQUUsT0FDSTtZQUFELElBQUUsS0FBSztjQUNmO01BQUEsT0FFRztjQUFIO01BQUE7S0FBQTtJQUFBO0lBQ0YsSUFBRSxPQUFHLEVBQUU7V0FDUCxPQUFHLE9BQU87R0FBQTs7RUFuQ1osd0JBQUEiLCJmaWxlIjoibWV0YS9kZW1vL3plY2tlbmRvcmYuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==