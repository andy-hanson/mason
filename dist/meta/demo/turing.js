"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/Seq/Dequebang","../../at/Seq/Seq","../../at/Seq/Seqbang","../../compare","../../control","../../math/methods","../../Obj","../../Type/Type","../../Type/Pred-Type"],function(exports,_64_0,Deque_33_1,Seq_2,Seq_33_3,compare_4,control_5,methods_6,Obj_7,Type_8,Pred_45Type_9){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_0),count=_ms.get(_$2,"count"),empty_63=_ms.get(_$2,"empty?"),Deque_33=_ms.getDefaultExport(Deque_33_1),Seq=_ms.getDefaultExport(Seq_2),_$5=_ms.getModule(Seq_33_3),_60_43_43_33=_ms.get(_$5,"<++!"),_43_43_62_33=_ms.get(_$5,"++>!"),set_45nth_33=_ms.get(_$5,"set-nth!"),_$6=_ms.getModule(compare_4),_61_63=_ms.get(_$6,"=?"),_$7=_ms.getModule(control_5),End_45Loop=_ms.get(_$7,"End-Loop"),if_33=_ms.get(_$7,"if!"),loop=_ms.get(_$7,"loop"),_$8=_ms.getModule(methods_6),_43=_ms.get(_$8,"+"),_45=_ms.get(_$8,"-"),Obj=_ms.getDefaultExport(Obj_7),_$9=_ms.getModule(Obj_7),p=_ms.get(_$9,"p"),_$10=_ms.getModule(Type_8),_61_62=_ms.get(_$10,"=>"),_$11=_ms.getModule(Pred_45Type_9),Any=_ms.get(_$11,"Any");
		const R=exports.R=_ms.set(function(written,new_45state){
			return {
				write:written,
				"go-right":true,
				state:new_45state
			}
		},"displayName","R");
		const L=exports.L=_ms.set(function(written,new_45state){
			return {
				write:written,
				"go-right":false,
				state:new_45state
			}
		},"displayName","L");
		const fin=exports.fin=function(){
			const doc="Stops the machine.";
			return {
				doc:doc,
				displayName:"fin"
			}
		}();
		const run_45turing=exports["run-turing"]=function(){
			const doc="http://rosettacode.org/wiki/Universal_Turing_machine";
			const test=_ms.set(function(){
				const incrementer=function(){
					const init_45state="a";
					const blank=0;
					const rules=function(){
						const a=function(){
							const _k0=1,_v0=R(1,"a");
							const _k1=0,_v1=fin;
							return _ms.map(_k0,_v0,_k1,_v1)
						}();
						return {
							a:a,
							displayName:"rules"
						}
					}();
					return {
						"init-state":init_45state,
						blank:blank,
						rules:rules,
						displayName:"incrementer"
					}
				}();
				const _k0=[incrementer,[1,1,1]],_v0=[1,1,1,0];
				const busy_45beaver=function(){
					const init_45state="a";
					const blank=0;
					const rules=function(){
						const a=function(){
							const _k0=0,_v0=R(1,"b");
							const _k1=1,_v1=L(1,"c");
							return _ms.map(_k0,_v0,_k1,_v1)
						}();
						const b=function(){
							const _k0=0,_v0=L(1,"a");
							const _k1=1,_v1=R(1,"b");
							return _ms.map(_k0,_v0,_k1,_v1)
						}();
						const c=function(){
							const _k0=0,_v0=L(1,"b");
							const _k1=1,_v1=fin;
							return _ms.map(_k0,_v0,_k1,_v1)
						}();
						return {
							a:a,
							b:b,
							c:c,
							displayName:"rules"
						}
					}();
					return {
						"init-state":init_45state,
						blank:blank,
						rules:rules,
						displayName:"busy-beaver"
					}
				}();
				const _k1=[busy_45beaver,[]],_v1=[1,1,1,1,1,1];
				const sorting_45test=function(){
					const init_45state="a";
					const blank=0;
					const rules=function(){
						const a=function(){
							const _k0=0,_v0=L(0,"e");
							const _k1=1,_v1=R(1,"a");
							const _k2=2,_v2=R(3,"b");
							return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
						}();
						const b=function(){
							const _k0=0,_v0=L(0,"c");
							const _k1=1,_v1=R(1,"b");
							const _k2=2,_v2=R(2,"b");
							return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
						}();
						const c=function(){
							const _k0=1,_v0=L(2,"d");
							const _k1=2,_v1=L(2,"c");
							const _k2=3,_v2=L(2,"e");
							return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
						}();
						const d=function(){
							const _k0=1,_v0=L(1,"d");
							const _k1=2,_v1=L(2,"d");
							const _k2=3,_v2=R(1,"a");
							return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
						}();
						const e=function(){
							const _k0=0,_v0=fin;
							const _k1=1,_v1=L(1,"e");
							return _ms.map(_k0,_v0,_k1,_v1)
						}();
						return {
							a:a,
							b:b,
							c:c,
							d:d,
							e:e,
							displayName:"rules"
						}
					}();
					return {
						"init-state":init_45state,
						blank:blank,
						rules:rules,
						displayName:"sorting-test"
					}
				}();
				const _k2=[sorting_45test,[2,2,2,1,2,2,1,2,1,2,1,2,1,2]],_v2=[0,1,1,1,1,1,2,2,2,2,2,2,2,2,2,0];
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
			},"displayName","test");
			return _ms.set(function(spec,init_45tape){
				_ms.checkContains(Seq,init_45tape,"init-tape");
				const _$75=spec,rules=_ms.checkContains(Obj,_$75.rules,"rules"),blank=_ms.checkContains(Any,_$75.blank,"blank"),init_45state=_ms.checkContains(Any,_$75["init-state"],"init-state");
				const tape=_61_62(Deque_33,function(){
					if(_ms.bool(empty_63(init_45tape))){
						return [blank]
					} else {
						return init_45tape
					}
				}());
				return _ms.checkContains(Seq,loop({
					idx:0,
					state:init_45state
				},function(prev){
					const pi=prev.idx;
					const symbol=_ms.sub(tape,pi);
					return function(){
						const _=_ms.sub(p(rules,prev.state),symbol);
						if(_ms.bool(_61_63(fin,_))){
							return End_45Loop(_61_62(Array,tape))
						} else {
							const _$88=_,write=_$88.write,go_45right=_$88["go-right"];
							set_45nth_33(tape,pi,write);
							const state=_.state;
							const idx=function(){
								if(_ms.bool(go_45right)){
									if_33(_61_63(pi,_45(count(tape),1)),function(){
										return _43_43_62_33(tape,[blank])
									});
									return _43(pi,1)
								} else if(_ms.bool(_61_63(pi,0))){
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
				}),"res")
			},"doc",doc,"test",test,"displayName","run-turing")
		}();
		const displayName=exports.displayName="turing";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vdHVyaW5nLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBYUMsMEJBQUksU0FBQSxRQUFRLFlBQ1M7VUFDcEI7VUFBUTtlQUFrQjtVQUFZO0dBQUE7RUFBQTtFQUN2QywwQkFBSSxTQUFBLFFBQVEsWUFDUztVQUFwQjtVQUFRO2VBQWtCO1VBQWE7R0FBQTtFQUFBO0VBQ3hDLGdDQUNJO0dBQUgsVUFBTTtVQUFIOzs7OztFQUVMLG1EQUNXO0dBQVYsVUFBTTtHQUNOLG1CQUNPLFVBQUE7SUFBTiw0QkFDYTtLQUFaLG1CQUFhO0tBQ2IsWUFBTztLQUNQLHNCQUNNO01BQUwsa0JBQ0U7T0FBRCxVQUFBLE1BQUssRUFBRSxFQUFHO09BQ1YsVUFBQSxNQUFLOzs7YUFGRDs7Ozs7WUFITTs7Ozs7OztJQU1iLFVBQUEsQ0FBRSxZQUFZLENBQUUsRUFBRSxFQUFFLFFBQVMsQ0FBRSxFQUFFLEVBQUUsRUFBRTtJQUVyQyw4QkFDYTtLQUFaLG1CQUFhO0tBQ2IsWUFBTztLQUNQLHNCQUNNO01BQUwsa0JBQ0U7T0FBRCxVQUFBLE1BQUssRUFBRSxFQUFHO09BQ1YsVUFBQSxNQUFLLEVBQUUsRUFBRzs7O01BQ1gsa0JBQ0U7T0FBRCxVQUFBLE1BQUssRUFBRSxFQUFHO09BQ1YsVUFBQSxNQUFLLEVBQUUsRUFBRzs7O01BQ1gsa0JBQ0U7T0FBRCxVQUFBLE1BQUssRUFBRSxFQUFHO09BQ1YsVUFBQSxNQUFLOzs7YUFSRDs7Ozs7OztZQUhNOzs7Ozs7O0lBWWIsVUFBQSxDQUFFLGNBQVksUUFBUyxDQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtJQUVuQywrQkFDYztLQUFiLG1CQUFhO0tBQ2IsWUFBTztLQUNQLHNCQUNNO01BQUwsa0JBQ0U7T0FBRCxVQUFBLE1BQUssRUFBRSxFQUFHO09BQ1YsVUFBQSxNQUFLLEVBQUUsRUFBRztPQUNWLFVBQUEsTUFBSyxFQUFFLEVBQUc7OztNQUNYLGtCQUNFO09BQUQsVUFBQSxNQUFLLEVBQUUsRUFBRztPQUNWLFVBQUEsTUFBSyxFQUFFLEVBQUc7T0FDVixVQUFBLE1BQUssRUFBRSxFQUFHOzs7TUFDWCxrQkFDRTtPQUFELFVBQUEsTUFBSyxFQUFFLEVBQUc7T0FDVixVQUFBLE1BQUssRUFBRSxFQUFHO09BQ1YsVUFBQSxNQUFLLEVBQUUsRUFBRzs7O01BQ1gsa0JBQ0U7T0FBRCxVQUFBLE1BQUssRUFBRSxFQUFHO09BQ1YsVUFBQSxNQUFLLEVBQUUsRUFBRztPQUNWLFVBQUEsTUFBSyxFQUFFLEVBQUc7OztNQUNYLGtCQUNFO09BQUQsVUFBQSxNQUFLO09BQ0wsVUFBQSxNQUFLLEVBQUUsRUFBRzs7O2FBbEJOOzs7Ozs7Ozs7WUFITzs7Ozs7OztJQXNCZCxVQUFBLENBQUUsZUFBYSxDQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsUUFBUyxDQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFOzs7a0JBRXBGLFNBQUssS0FBSyxZQUNhO3NCQURIO0lBQ3BCLFdBQXFDLDZCQUEvQixnREFBVSx1REFBZTtJQUMvQixXQUFPLE9BQUc7S0FDVCxZQUFBLFNBQU8sY0FDUzthQUFmLENBQUU7S0FBQSxPQUVDO2FBQUg7S0FBQTtJQUFBOzZCQU5ELElBT0QsS0FBSztTQUFNO1dBQVM7SUFBQSxFQUFhLFNBQUEsS0FDSTtLQUFwQyxTQUFLO0tBQ0wscUJBQVMsS0FBSzs7TUFDVCxnQkFBQyxFQUFFLE1BQU0sWUFBWTtNQUN6QixZQUFBLE9BQUcsSUFBSSxJQUNDO2NBQVAsV0FBVSxPQUFHLE1BQU07TUFBQSxPQUVoQjtPQUFILFdBQWlCO09BQ2pCLGFBQVMsS0FBSyxHQUFHO09BQ2pCLFlBQU87T0FDUDtRQUNDLFlBQUEsWUFDUTtTQUFQLE1BQUssT0FBRyxHQUFJLElBQUcsTUFBTSxNQUFNLElBQ0ssVUFBQTtpQkFBL0IsYUFBSyxLQUFLLENBQUU7U0FBQTtnQkFDYixJQUFFLEdBQUc7UUFBQSxPQUNOLFlBQUEsT0FBRyxHQUFHLElBQ0M7U0FBTixhQUFLLEtBQUssQ0FBRTtnQkFDWjtRQUFBLE9BRUc7Z0JBQUgsSUFBRSxHQUFHO1FBQUE7T0FBQTtjQVpKOzs7Ozs7Ozs7RUF2RlIsc0NBQUEiLCJmaWxlIjoibWV0YS9kZW1vL3R1cmluZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9