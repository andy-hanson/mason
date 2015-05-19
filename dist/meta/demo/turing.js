"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/Seq/Dequebang","../../at/Seq/Seq","../../at/Seq/Seqbang","../../compare","../../control","../../math/methods","../../Object","../../Type/Type","../../Type/Pred-Type"],function(exports,_64_0,Deque_33_1,Seq_2,Seq_33_3,compare_4,control_5,methods_6,Object_7,Type_8,Pred_45Type_9){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_0),count=_$2.count,empty_63=_$2["empty?"],Deque_33=_ms.getDefaultExport(Deque_33_1),Seq=_ms.getDefaultExport(Seq_2),_$5=_ms.getModule(Seq_33_3),_60_43_43_33=_$5["<++!"],_43_43_62_33=_$5["++>!"],set_45nth_33=_$5["set-nth!"],_$6=_ms.getModule(compare_4),_61_63=_$6["=?"],_$7=_ms.getModule(control_5),End_45Loop=_$7["End-Loop"],loop=_$7.loop,_$8=_ms.getModule(methods_6),_43=_$8["+"],_45=_$8["-"],_$9=_ms.getModule(Object_7),p=_$9.p,_$10=_ms.getModule(Type_8),_61_62=_$10["=>"],_$11=_ms.getModule(Pred_45Type_9),Any=_$11.Any;
		const R=exports.R=function R(written,new_45state){
			return {
				write:written,
				"go-right":true,
				state:new_45state
			}
		};
		const L=exports.L=function L(written,new_45state){
			return {
				write:written,
				"go-right":false,
				state:new_45state
			}
		};
		const fin=exports.fin=function(){
			const doc="Stops the machine.";
			return {
				doc:doc,
				name:"fin"
			}
		}();
		const run_45turing=exports["run-turing"]=function(){
			const doc="http://rosettacode.org/wiki/Universal_Turing_machine";
			return _ms.set(function run_45turing(spec,init_45tape){
				const _$75=spec,rules=_$75.rules,blank=_$75.blank,init_45state=_$75["init-state"];
				const tape=_61_62(Deque_33,function(){
					if(empty_63(init_45tape)){
						return [blank]
					} else {
						return init_45tape
					}
				}());
				return loop({
					idx:0,
					state:init_45state
				},function(prev){
					const pi=prev.idx;
					const symbol=_ms.sub(tape,pi);
					return function(){
						const _=_ms.sub(p(rules,prev.state),symbol);
						if(_61_63(fin,_)){
							return End_45Loop(_61_62(Array,tape))
						} else {
							const _$88=_,write=_$88.write,go_45right=_$88["go-right"];
							set_45nth_33(tape,pi,write);
							const state=_.state;
							const idx=function(){
								if(go_45right){
									if(_61_63(pi,_45(count(tape),1))){
										_43_43_62_33(tape,[blank])
									};
									return _43(pi,1)
								} else if(_61_63(pi,0)){
									_60_43_43_33(tape,[blank]);
									return 0
								} else {
									return _45(pi,1)
								}
							}();
							return {
								state:state,
								idx:idx
							}
						}
					}()
				})
			},"doc",doc)
		}();
		const name=exports.name="turing";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vdHVyaW5nLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBYUMsa0JBQUksV0FBQSxRQUFRLFlBQ1M7VUFDcEI7VUFBUTtlQUFrQjtVQUFZO0dBQUE7RUFBQTtFQUN2QyxrQkFBSSxXQUFBLFFBQVEsWUFDUztVQUFwQjtVQUFRO2VBQWtCO1VBQWE7R0FBQTtFQUFBO0VBQ3hDLGdDQUNJO0dBQUgsVUFBTTs7Ozs7O0VBRVIsbURBQ1c7R0FBVixVQUFNO2tCQW1ETCxzQkFBSyxLQUFLLFlBQ2E7SUFBdkIsV0FBd0M7SUFDeEMsV0FBTyxPQUFHO0tBQ1QsR0FBQSxTQUFPLGFBQ1M7YUFBZixDQUFFO0tBQUEsT0FFQzthQUFIO0tBQUE7SUFBQTtXQUNGLEtBQUs7U0FBTTtXQUFTO0lBQUEsRUFBYSxTQUFBLEtBQ0k7S0FBcEMsU0FBSztLQUNMLHFCQUFTLEtBQUs7O01BQ1QsZ0JBQUMsRUFBRSxNQUFNLFlBQVk7TUFDekIsR0FBQSxPQUFHLElBQUksR0FDQztjQUFQLFdBQVUsT0FBRyxNQUFNO01BQUEsT0FFaEI7T0FBSCxXQUFpQjtPQUNqQixhQUFTLEtBQUssR0FBRztPQUNqQixZQUFPO09BQ1A7UUFDQyxHQUFBLFdBQ1E7U0FBUCxHQUFJLE9BQUcsR0FBSSxJQUFHLE1BQU0sTUFBTSxJQUNFO1VBQTNCLGFBQUssS0FBSyxDQUFFO1NBQUE7Z0JBQ2IsSUFBRSxHQUFHO1FBQUEsT0FDTixHQUFBLE9BQUcsR0FBRyxHQUNDO1NBQU4sYUFBSyxLQUFLLENBQUU7Z0JBQ1o7UUFBQSxPQUVHO2dCQUFILElBQUUsR0FBRztRQUFBO09BQUE7Ozs7Ozs7Ozs7RUFuR1osd0JBQUEiLCJmaWxlIjoibWV0YS9kZW1vL3R1cmluZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9