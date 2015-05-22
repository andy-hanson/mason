"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/Seq/Dequebang","../../at/Seq/Seq","../../at/Seq/Seqbang","../../compare","../../js","../../math/methods","../../Object","../../Type/Type","../../Type/Pred-Type"],function(exports,_64_0,Deque_33_1,Seq_2,Seq_33_3,compare_4,js_5,methods_6,Object_7,Type_8,Pred_45Type_9){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_0),count=_ms.get(_$2,"count"),empty_63=_ms.get(_$2,"empty?"),Deque_33=_ms.getDefaultExport(Deque_33_1),Seq=_ms.getDefaultExport(Seq_2),_$5=_ms.getModule(Seq_33_3),_60_43_43_33=_ms.get(_$5,"<++!"),_43_43_62_33=_ms.get(_$5,"++>!"),set_45nth_33=_ms.get(_$5,"set-nth!"),_$6=_ms.getModule(compare_4),_61_63=_ms.get(_$6,"=?"),_$7=_ms.getModule(js_5),id_61_63=_ms.get(_$7,"id=?"),_$8=_ms.getModule(methods_6),_43=_ms.get(_$8,"+"),_45=_ms.get(_$8,"-"),_$9=_ms.getModule(Object_7),p=_ms.get(_$9,"p"),_$10=_ms.getModule(Type_8),_61_62=_ms.get(_$10,"=>"),_$11=_ms.getModule(Pred_45Type_9),Any=_ms.get(_$11,"Any");
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
			const test=function test(){
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
							name:"rules"
						}
					}();
					return {
						"init-state":init_45state,
						blank:blank,
						rules:rules,
						name:"incrementer"
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
							name:"rules"
						}
					}();
					return {
						"init-state":init_45state,
						blank:blank,
						rules:rules,
						name:"busy-beaver"
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
							name:"rules"
						}
					}();
					return {
						"init-state":init_45state,
						blank:blank,
						rules:rules,
						name:"sorting-test"
					}
				}();
				const _k2=[sorting_45test,[2,2,2,1,1,1]],_v2=[0,1,1,1,2,2,2,0];
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
			};
			return _ms.set(function run_45turing(spec,init_45tape){
				_ms.checkContains(Seq,init_45tape,"init-tape");
				const _$75=spec,rules=_ms.checkContains(Object,_$75.rules,"rules"),blank=_ms.checkContains(Any,_$75.blank,"blank"),init_45state=_ms.checkContains(Any,_$75["init-state"],"init-state");
				const tape=_61_62(Deque_33,function(){
					if(_ms.bool(empty_63(init_45tape))){
						return [blank]
					} else {
						return init_45tape
					}
				}());
				let index=0;
				let state=init_45state;
				let res=null;
				while(true){
					const symbol_45here=_ms.sub(tape,index);
					const rule_45here=_ms.sub(p(rules,state),symbol_45here);
					if(_ms.bool(id_61_63(rule_45here,fin))){
						res=_61_62(Array,tape);
						break
					};
					const _$93=rule_45here,write=_$93.write,go_45right=_$93["go-right"];
					state=rule_45here.state;
					set_45nth_33(tape,index,write);
					index=function(){
						const _=index;
						if(_ms.bool(go_45right)){
							if(_ms.bool(_61_63(_,_45(count(tape),1)))){
								_43_43_62_33(tape,[blank])
							};
							return _43(_,1)
						} else if(_ms.bool(_61_63(_,0))){
							_60_43_43_33(tape,[blank]);
							return 0
						} else {
							return _45(_,1)
						}
					}()
				};
				return _ms.checkContains(Seq,res,"res")
			},"doc",doc,"test",test)
		}();
		const name=exports.name="turing";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vdHVyaW5nLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBYUMsa0JBQUksV0FBQSxRQUFRLFlBQ1M7VUFDcEI7VUFBUTtlQUFrQjtVQUFZO0dBQUE7RUFBQTtFQUN2QyxrQkFBSSxXQUFBLFFBQVEsWUFDUztVQUFwQjtVQUFRO2VBQWtCO1VBQWE7R0FBQTtFQUFBO0VBQ3hDLGdDQUNJO0dBQUgsVUFBTTs7Ozs7O0VBRVIsbURBQ1c7R0FBVixVQUFNO0dBQ04sV0FDTyxlQUFBO0lBQU4sNEJBQ2E7S0FBWixtQkFBYTtLQUNiLFlBQU87S0FDUCxzQkFDTTtNQUFMLGtCQUNFO09BQUQsVUFBQSxNQUFLLEVBQUUsRUFBRztPQUNWLFVBQUEsTUFBSzs7Ozs7Ozs7Ozs7Ozs7O0lBQ1IsVUFBQSxDQUFFLFlBQVksQ0FBRSxFQUFFLEVBQUUsUUFBUyxDQUFFLEVBQUUsRUFBRSxFQUFFO0lBRXJDLDhCQUNhO0tBQVosbUJBQWE7S0FDYixZQUFPO0tBQ1Asc0JBQ007TUFBTCxrQkFDRTtPQUFELFVBQUEsTUFBSyxFQUFFLEVBQUc7T0FDVixVQUFBLE1BQUssRUFBRSxFQUFHOzs7TUFDWCxrQkFDRTtPQUFELFVBQUEsTUFBSyxFQUFFLEVBQUc7T0FDVixVQUFBLE1BQUssRUFBRSxFQUFHOzs7TUFDWCxrQkFDRTtPQUFELFVBQUEsTUFBSyxFQUFFLEVBQUc7T0FDVixVQUFBLE1BQUs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQ1IsVUFBQSxDQUFFLGNBQVksUUFBUyxDQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtJQUVuQywrQkFDYztLQUFiLG1CQUFhO0tBQ2IsWUFBTztLQUNQLHNCQUNNO01BQUwsa0JBQ0U7T0FBRCxVQUFBLE1BQUssRUFBRSxFQUFHO09BQ1YsVUFBQSxNQUFLLEVBQUUsRUFBRztPQUNWLFVBQUEsTUFBSyxFQUFFLEVBQUc7OztNQUNYLGtCQUNFO09BQUQsVUFBQSxNQUFLLEVBQUUsRUFBRztPQUNWLFVBQUEsTUFBSyxFQUFFLEVBQUc7T0FDVixVQUFBLE1BQUssRUFBRSxFQUFHOzs7TUFDWCxrQkFDRTtPQUFELFVBQUEsTUFBSyxFQUFFLEVBQUc7T0FDVixVQUFBLE1BQUssRUFBRSxFQUFHO09BQ1YsVUFBQSxNQUFLLEVBQUUsRUFBRzs7O01BQ1gsa0JBQ0U7T0FBRCxVQUFBLE1BQUssRUFBRSxFQUFHO09BQ1YsVUFBQSxNQUFLLEVBQUUsRUFBRztPQUNWLFVBQUEsTUFBSyxFQUFFLEVBQUc7OztNQUNYLGtCQUNFO09BQUQsVUFBQSxNQUFLO09BQ0wsVUFBQSxNQUFLLEVBQUUsRUFBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUNiLFVBQUEsQ0FBRSxlQUFhLENBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVMsQ0FBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFOzs7a0JBRXBELHNCQUFLLEtBQUssWUFDYTtzQkFESDtJQUNwQixXQUF3Qyw2QkFBbEMsbURBQWEsdURBQWU7SUFDbEMsV0FBTyxPQUFHO0tBQ1QsWUFBQSxTQUFPLGNBQ1M7YUFBZixDQUFFO0tBQUEsT0FFQzthQUFIO0tBQUE7SUFBQTtJQUNGLFVBQVU7SUFDVixVQUFVO0lBRVYsUUFBUTtJQUVKLFdBQUE7S0FBSCw0QkFBYyxLQUFLO0tBQ25CLDBCQUFhLEVBQUUsTUFBTSxPQUFPO0tBRTVCLFlBQUksU0FBSyxZQUFVLE1BQ0c7VUFBZCxPQUFHLE1BQU07TUFDaEI7S0FBQTtLQUVELFdBQWlCO1dBQ1I7S0FDVCxhQUFTLEtBQUssTUFBTTs7TUFDTixRQUFBO01BQ2IsWUFBQSxZQUNRO09BQVAsWUFBSSxPQUFHLEVBQUcsSUFBRyxNQUFNLE1BQU0sS0FDRTtRQUMxQixhQUFLLEtBQUssQ0FBRTtPQUFBO2NBQ2IsSUFBRSxFQUFFO01BQUEsT0FDTCxZQUFBLE9BQUcsRUFBRSxJQUNDO09BQ0wsYUFBSyxLQUFLLENBQUU7Y0FDWjtNQUFBLE9BRUc7Y0FBSCxJQUFFLEVBQUU7TUFBQTtLQUFBO0lBQUE7NkJBakNOLElBa0NEOzs7RUEzR0Ysd0JBQUEiLCJmaWxlIjoibWV0YS9kZW1vL3R1cmluZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9