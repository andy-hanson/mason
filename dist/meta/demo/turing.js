"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/Seq/Dequebang","../../at/Seq/Seq","../../at/Seq/Seqbang","../../compare","../../control","../../math/methods","../../Obj","../../Type/Type","../../Type/Pred-Type"],function(exports,_64_0,Deque_33_1,Seq_2,Seq_33_3,compare_4,control_5,methods_6,Obj_7,Type_8,Pred_45Type_9){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_0),count=_ms.get(_$2,"count"),empty_63=_ms.get(_$2,"empty?"),Deque_33=_ms.getDefaultExport(Deque_33_1),Seq=_ms.getDefaultExport(Seq_2),_$5=_ms.getModule(Seq_33_3),_60_43_43_33=_ms.get(_$5,"<++!"),_43_43_62_33=_ms.get(_$5,"++>!"),set_45nth_33=_ms.get(_$5,"set-nth!"),_$6=_ms.getModule(compare_4),_61_63=_ms.get(_$6,"=?"),_$7=_ms.getModule(control_5),End_45Loop=_ms.get(_$7,"End-Loop"),if_33=_ms.get(_$7,"if!"),loop=_ms.get(_$7,"loop"),_$8=_ms.getModule(methods_6),_43=_ms.get(_$8,"+"),_45=_ms.get(_$8,"-"),Obj=_ms.getDefaultExport(Obj_7),_$9=_ms.getModule(Obj_7),p=_ms.get(_$9,"p"),_$10=_ms.getModule(Type_8),_61_62=_ms.get(_$10,"=>"),_$11=_ms.getModule(Pred_45Type_9),Any=_ms.get(_$11,"Any");
		const R=exports.R=function(){
			return _ms.set(function(written,new_45state){
				return {
					write:written,
					"go-right":true,
					state:new_45state
				}
			},"displayName","R")
		}();
		const L=exports.L=function(){
			return _ms.set(function(written,new_45state){
				return {
					write:written,
					"go-right":false,
					state:new_45state
				}
			},"displayName","L")
		}();
		const fin=exports.fin=function(){
			const doc="Stops the machine.";
			return {
				doc:doc,
				displayName:"fin"
			}
		}();
		const run_45turing=exports["run-turing"]=function(){
			const doc="http://rosettacode.org/wiki/Universal_Turing_machine";
			const test=function(){
				return _ms.set(function(){
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
				},"displayName","test")
			}();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vdHVyaW5nLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBYUMsNEJBQUk7a0JBQUEsU0FBQSxRQUFRLFlBQ1M7V0FDcEI7V0FBUTtnQkFBa0I7V0FBWTtJQUFBO0dBQUE7O0VBQ3ZDLDRCQUFJO2tCQUFBLFNBQUEsUUFBUSxZQUNTO1dBQXBCO1dBQVE7Z0JBQWtCO1dBQWE7SUFBQTtHQUFBOztFQUN4QyxnQ0FDSTtHQUFILFVBQU07Ozs7OztFQUVSLG1EQUNXO0dBQVYsVUFBTTtHQUNOLHFCQUNPO21CQUFBLFVBQUE7S0FBTiw0QkFDYTtNQUFaLG1CQUFhO01BQ2IsWUFBTztNQUNQLHNCQUNNO09BQUwsa0JBQ0U7UUFBRCxVQUFBLE1BQUssRUFBRSxFQUFHO1FBQ1YsVUFBQSxNQUFLOzs7Ozs7Ozs7Ozs7Ozs7S0FDUixVQUFBLENBQUUsWUFBWSxDQUFFLEVBQUUsRUFBRSxRQUFTLENBQUUsRUFBRSxFQUFFLEVBQUU7S0FFckMsOEJBQ2E7TUFBWixtQkFBYTtNQUNiLFlBQU87TUFDUCxzQkFDTTtPQUFMLGtCQUNFO1FBQUQsVUFBQSxNQUFLLEVBQUUsRUFBRztRQUNWLFVBQUEsTUFBSyxFQUFFLEVBQUc7OztPQUNYLGtCQUNFO1FBQUQsVUFBQSxNQUFLLEVBQUUsRUFBRztRQUNWLFVBQUEsTUFBSyxFQUFFLEVBQUc7OztPQUNYLGtCQUNFO1FBQUQsVUFBQSxNQUFLLEVBQUUsRUFBRztRQUNWLFVBQUEsTUFBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FDUixVQUFBLENBQUUsY0FBWSxRQUFTLENBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0tBRW5DLCtCQUNjO01BQWIsbUJBQWE7TUFDYixZQUFPO01BQ1Asc0JBQ007T0FBTCxrQkFDRTtRQUFELFVBQUEsTUFBSyxFQUFFLEVBQUc7UUFDVixVQUFBLE1BQUssRUFBRSxFQUFHO1FBQ1YsVUFBQSxNQUFLLEVBQUUsRUFBRzs7O09BQ1gsa0JBQ0U7UUFBRCxVQUFBLE1BQUssRUFBRSxFQUFHO1FBQ1YsVUFBQSxNQUFLLEVBQUUsRUFBRztRQUNWLFVBQUEsTUFBSyxFQUFFLEVBQUc7OztPQUNYLGtCQUNFO1FBQUQsVUFBQSxNQUFLLEVBQUUsRUFBRztRQUNWLFVBQUEsTUFBSyxFQUFFLEVBQUc7UUFDVixVQUFBLE1BQUssRUFBRSxFQUFHOzs7T0FDWCxrQkFDRTtRQUFELFVBQUEsTUFBSyxFQUFFLEVBQUc7UUFDVixVQUFBLE1BQUssRUFBRSxFQUFHO1FBQ1YsVUFBQSxNQUFLLEVBQUUsRUFBRzs7O09BQ1gsa0JBQ0U7UUFBRCxVQUFBLE1BQUs7UUFDTCxVQUFBLE1BQUssRUFBRSxFQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBQ2IsVUFBQSxDQUFFLGVBQWEsQ0FBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVMsQ0FBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTs7OztrQkFFcEYsU0FBSyxLQUFLLFlBQ2E7c0JBREg7SUFDcEIsV0FBcUMsNkJBQS9CLGdEQUFVLHVEQUFlO0lBQy9CLFdBQU8sT0FBRztLQUNULFlBQUEsU0FBTyxjQUNTO2FBQWYsQ0FBRTtLQUFBLE9BRUM7YUFBSDtLQUFBO0lBQUE7NkJBTkQsSUFPRCxLQUFLO1NBQU07V0FBUztJQUFBLEVBQWEsU0FBQSxLQUNJO0tBQXBDLFNBQUs7S0FDTCxxQkFBUyxLQUFLOztNQUNULGdCQUFDLEVBQUUsTUFBTSxZQUFZO01BQ3pCLFlBQUEsT0FBRyxJQUFJLElBQ0M7Y0FBUCxXQUFVLE9BQUcsTUFBTTtNQUFBLE9BRWhCO09BQUgsV0FBaUI7T0FDakIsYUFBUyxLQUFLLEdBQUc7T0FDakIsWUFBTztPQUNQO1FBQ0MsWUFBQSxZQUNRO1NBQVAsTUFBSyxPQUFHLEdBQUksSUFBRyxNQUFNLE1BQU0sSUFDSyxVQUFBO2lCQUEvQixhQUFLLEtBQUssQ0FBRTtTQUFBO2dCQUNiLElBQUUsR0FBRztRQUFBLE9BQ04sWUFBQSxPQUFHLEdBQUcsSUFDQztTQUFOLGFBQUssS0FBSyxDQUFFO2dCQUNaO1FBQUEsT0FFRztnQkFBSCxJQUFFLEdBQUc7UUFBQTtPQUFBOzs7Ozs7Ozs7O0VBbkdaLHNDQUFBIiwiZmlsZSI6Im1ldGEvZGVtby90dXJpbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==