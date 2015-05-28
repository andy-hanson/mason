"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../bang","../../at/Seq/Seq","../../at/Seq/Stream","../../compare","../../math/Number","../../math/methods","../../Type/Type"],function(exports,_33_0,Seq_1,Stream_2,compare_3,Number_4,methods_5,Type_6){
	exports._get=_ms.lazy(function(){
		const _33=_ms.getDefaultExport(_33_0),_$3=_ms.getModule(Seq_1),reverse=_ms.get(_$3,"reverse"),tail=_ms.get(_$3,"tail"),take_45while_39=_ms.get(_$3,"take-while'"),Stream=_ms.getDefaultExport(Stream_2),_$5=_ms.getModule(compare_3),_61_63=_ms.get(_$5,"=?"),_60_61_63=_ms.get(_$5,"<=?"),_$6=_ms.getModule(Number_4),Nat=_ms.get(_$6,"Nat"),_$7=_ms.getModule(methods_5),_43=_ms.get(_$7,"+"),_45=_ms.get(_$7,"-"),_$8=_ms.getModule(Type_6),_61_62=_ms.get(_$8,"=>");
		const fibs=function(){
			const rec=function* rec(prev,cur){
				_ms.checkContains(Nat,prev,"prev");
				_ms.checkContains(Nat,cur,"cur");
				(yield cur);
				(yield* rec(cur,_43(prev,cur)))
			};
			return Stream(_ms.sub(rec,0,1))
		}();
		const zeckendorf=function(){
			const built={};
			const doc=built.doc="http://rosettacode.org/wiki/Zeckendorf_number_representation";
			const test=built.test=function test(){
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
				const digits=function(){
					const built=[];
					for(let _ of candidate_45fibs[Symbol.iterator]()){
						_ms.add(built,function(){
							if(_ms.bool(_60_61_63(_,left))){
								left=_45(left,_);
								return 1
							} else {
								return 0
							}
						}())
					};
					return built
				}();
				_33(_61_63,0,left);
				return _61_62(String,digits)
			},built)
		}();
		const name=exports.name="zeckendorf";
		exports.default=zeckendorf;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vemVja2VuZG9yZi5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVNBLHFCQUNNO0dBQUwsVUFBUyxjQUFBLEtBQVMsSUFDTztzQkFEWDtzQkFBUTtXQUNsQjtZQUNDLElBQUksSUFBSyxJQUFFLEtBQUs7R0FBQTtVQUNyQixlQUFPLElBQUksRUFBRTtFQUFBO0VBRWQsMkJBQ1c7O0dBQVYsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLEdBQVE7b0JBQ1YsQ0FBRSxHQUFRO29CQUNWLENBQUUsSUFBUztvQkFDWCxDQUFFLE1BQVc7OztrQkFDYixvQkFBQSxFQUNLO3NCQURIO0lBQ0YsZUFBUyxLQUFLO0lBQ2QsdUJBQWlCLFFBQVMsZ0JBQVksU0FBUSxTQUFBLEVBQ0M7WUFBOUMsVUFBSSxFQUFFO0lBQUE7SUFDUCxTQUFTO0lBQ1Q7O2FBQWMsS0FBQSxvQ0FDYzs7T0FDMUIsWUFBQSxVQUFJLEVBQUUsT0FDSTthQUFELElBQUUsS0FBSztlQUNmO09BQUEsT0FFRztlQUFIO09BQUE7TUFBQTtLQUFBOzs7SUFDSCxJQUFFLE9BQUcsRUFBRTtXQUNQLE9BQUcsT0FBTztHQUFBOztFQW5DWix3QkFBQTtrQkFlQSIsImZpbGUiOiJtZXRhL2RlbW8vemVja2VuZG9yZi5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9