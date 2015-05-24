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
				const built=new global.Map();
				const incrementer=function(){
					const init_45state="a";
					const blank=0;
					const rules=function(){
						const a=function(){
							const built=new global.Map();
							_ms.assoc(built,1,R(1,"a"));
							_ms.assoc(built,0,fin);
							return built
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
				_ms.assoc(built,[incrementer,[1,1,1]],[1,1,1,0]);
				const busy_45beaver=function(){
					const init_45state="a";
					const blank=0;
					const rules=function(){
						const a=function(){
							const built=new global.Map();
							_ms.assoc(built,0,R(1,"b"));
							_ms.assoc(built,1,L(1,"c"));
							return built
						}();
						const b=function(){
							const built=new global.Map();
							_ms.assoc(built,0,L(1,"a"));
							_ms.assoc(built,1,R(1,"b"));
							return built
						}();
						const c=function(){
							const built=new global.Map();
							_ms.assoc(built,0,L(1,"b"));
							_ms.assoc(built,1,fin);
							return built
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
				_ms.assoc(built,[busy_45beaver,[]],[1,1,1,1,1,1]);
				const sorting_45test=function(){
					const init_45state="a";
					const blank=0;
					const rules=function(){
						const a=function(){
							const built=new global.Map();
							_ms.assoc(built,0,L(0,"e"));
							_ms.assoc(built,1,R(1,"a"));
							_ms.assoc(built,2,R(3,"b"));
							return built
						}();
						const b=function(){
							const built=new global.Map();
							_ms.assoc(built,0,L(0,"c"));
							_ms.assoc(built,1,R(1,"b"));
							_ms.assoc(built,2,R(2,"b"));
							return built
						}();
						const c=function(){
							const built=new global.Map();
							_ms.assoc(built,1,L(2,"d"));
							_ms.assoc(built,2,L(2,"c"));
							_ms.assoc(built,3,L(2,"e"));
							return built
						}();
						const d=function(){
							const built=new global.Map();
							_ms.assoc(built,1,L(1,"d"));
							_ms.assoc(built,2,L(2,"d"));
							_ms.assoc(built,3,R(1,"a"));
							return built
						}();
						const e=function(){
							const built=new global.Map();
							_ms.assoc(built,0,fin);
							_ms.assoc(built,1,L(1,"e"));
							return built
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
				_ms.assoc(built,[sorting_45test,[2,2,2,1,1,1]],[0,1,1,1,2,2,2,0]);
				return built
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
				for(;;){
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
				return res
			},"doc",doc,"test",test)
		}();
		const name=exports.name="turing";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vdHVyaW5nLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBYUMsa0JBQUksV0FBQSxRQUFRLFlBQ1M7VUFDcEI7VUFBUTtlQUFrQjtVQUFZO0dBQUE7RUFBQTtFQUN2QyxrQkFBSSxXQUFBLFFBQVEsWUFDUztVQUFwQjtVQUFRO2VBQWtCO1VBQWE7R0FBQTtFQUFBO0VBQ3hDLGdDQUNJO0dBQUgsVUFBTTs7Ozs7O0VBRVIsbURBQ1c7R0FBVixVQUFNO0dBQ04sV0FDTyxlQUFBOztJQUFOLDRCQUNhO0tBQVosbUJBQWE7S0FDYixZQUFPO0tBQ1Asc0JBQ007TUFBTCxrQkFDRTs7dUJBQUQsRUFBSyxFQUFFLEVBQUc7dUJBQ1YsRUFBSzs7Ozs7Ozs7Ozs7Ozs7O29CQUNSLENBQUUsWUFBWSxDQUFFLEVBQUUsRUFBRSxJQUFTLENBQUUsRUFBRSxFQUFFLEVBQUU7SUFFckMsOEJBQ2E7S0FBWixtQkFBYTtLQUNiLFlBQU87S0FDUCxzQkFDTTtNQUFMLGtCQUNFOzt1QkFBRCxFQUFLLEVBQUUsRUFBRzt1QkFDVixFQUFLLEVBQUUsRUFBRzs7O01BQ1gsa0JBQ0U7O3VCQUFELEVBQUssRUFBRSxFQUFHO3VCQUNWLEVBQUssRUFBRSxFQUFHOzs7TUFDWCxrQkFDRTs7dUJBQUQsRUFBSyxFQUFFLEVBQUc7dUJBQ1YsRUFBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBQ1IsQ0FBRSxjQUFZLElBQVMsQ0FBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7SUFFbkMsK0JBQ2M7S0FBYixtQkFBYTtLQUNiLFlBQU87S0FDUCxzQkFDTTtNQUFMLGtCQUNFOzt1QkFBRCxFQUFLLEVBQUUsRUFBRzt1QkFDVixFQUFLLEVBQUUsRUFBRzt1QkFDVixFQUFLLEVBQUUsRUFBRzs7O01BQ1gsa0JBQ0U7O3VCQUFELEVBQUssRUFBRSxFQUFHO3VCQUNWLEVBQUssRUFBRSxFQUFHO3VCQUNWLEVBQUssRUFBRSxFQUFHOzs7TUFDWCxrQkFDRTs7dUJBQUQsRUFBSyxFQUFFLEVBQUc7dUJBQ1YsRUFBSyxFQUFFLEVBQUc7dUJBQ1YsRUFBSyxFQUFFLEVBQUc7OztNQUNYLGtCQUNFOzt1QkFBRCxFQUFLLEVBQUUsRUFBRzt1QkFDVixFQUFLLEVBQUUsRUFBRzt1QkFDVixFQUFLLEVBQUUsRUFBRzs7O01BQ1gsa0JBQ0U7O3VCQUFELEVBQUs7dUJBQ0wsRUFBSyxFQUFFLEVBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBQ2IsQ0FBRSxlQUFhLENBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQVMsQ0FBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFOzs7a0JBRXBELHNCQUFBLEtBQUssWUFDYTtzQkFESDtJQUNmLFdBQXdDLDZCQUFsQyxtREFBYSx1REFBZTtJQUNsQyxXQUFPLE9BQUc7S0FDVCxZQUFBLFNBQU8sY0FDUzthQUFmLENBQUU7S0FBQSxPQUVDO2FBQUg7S0FBQTtJQUFBO0lBQ0YsVUFBVTtJQUNWLFVBQVU7SUFFVixRQUFRO0lBRUosT0FBQTtLQUFILDRCQUFjLEtBQUs7S0FDbkIsMEJBQWEsRUFBRSxNQUFNLE9BQU87S0FFNUIsWUFBSSxTQUFLLFlBQVUsTUFDRztVQUFkLE9BQUcsTUFBTTtNQUNoQjtLQUFBO0tBRUQsV0FBaUI7V0FDUjtLQUNULGFBQVMsS0FBSyxNQUFNOztNQUNOLFFBQUE7TUFDYixZQUFBLFlBQ1E7T0FBUCxZQUFJLE9BQUcsRUFBRyxJQUFHLE1BQU0sTUFBTSxLQUNFO1FBQzFCLGFBQUssS0FBSyxDQUFFO09BQUE7Y0FDYixJQUFFLEVBQUU7TUFBQSxPQUNMLFlBQUEsT0FBRyxFQUFFLElBQ0M7T0FDTCxhQUFLLEtBQUssQ0FBRTtjQUNaO01BQUEsT0FFRztjQUFILElBQUUsRUFBRTtNQUFBO0tBQUE7SUFBQTtXQUNQO0dBQUE7O0VBM0dGLHdCQUFBIiwiZmlsZSI6Im1ldGEvZGVtby90dXJpbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==