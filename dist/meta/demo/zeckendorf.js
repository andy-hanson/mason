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
				(yield* rec(cur,_43(prev,cur)))
			};
			return Stream(_ms.sub(rec,0,1))
		}();
		const zeckendorf=exports.zeckendorf=function(){
			const doc="http://rosettacode.org/wiki/Zeckendorf_number_representation";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[0],"");
				_ms.assoc(built,[1],"1");
				_ms.assoc(built,[19],"101001");
				_ms.assoc(built,[1111],"100001010000001");
				return built
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vemVja2VuZG9yZi5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVVBLHFCQUNNO0dBQUwsVUFBUyxjQUFBLEtBQVMsSUFDTztzQkFEWDtzQkFBUTtXQUNsQjtZQUNDLElBQUksSUFBSyxJQUFFLEtBQUs7R0FBQTtVQUNyQixlQUFPLElBQUksRUFBRTtFQUFBO0VBRWQsOENBQ1c7R0FBVixVQUFNO0dBQ04sV0FDTyxlQUFBOztvQkFBTixDQUFFLEdBQVE7b0JBQ1YsQ0FBRSxHQUFRO29CQUNWLENBQUUsSUFBUztvQkFDWCxDQUFFLE1BQVc7OztrQkFDYixvQkFBQSxFQUNLO3NCQURIO0lBQ0YsZUFBUyxLQUFLO0lBQ2QsdUJBQWlCLFFBQVMsZ0JBQVksU0FBUSxTQUFBLEVBQ0M7WUFBOUMsVUFBSSxFQUFFO0lBQUE7SUFDUCxTQUFTO0lBQ1QsYUFBUyxJQUFJLGlCQUFnQixTQUFBLEVBQUE7O01BQzVCLFlBQUEsVUFBSSxFQUFFLE9BQ0k7WUFBRCxJQUFFLEtBQUs7Y0FDZjtNQUFBLE9BRUc7Y0FBSDtNQUFBO0tBQUE7SUFBQTtJQUNGLElBQUUsT0FBRyxFQUFFO1dBQ1AsT0FBRyxPQUFPO0dBQUE7O0VBbkNaLHdCQUFBIiwiZmlsZSI6Im1ldGEvZGVtby96ZWNrZW5kb3JmLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=