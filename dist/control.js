"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Bool","./Fun","./js","./methods","./Objbang","./Type/Pred-Type","./Type/Wrap-Type","./at/at-Type","./at/q","./at/Map/Map","./at/Seq/Arraybang","./at/Seq/Seq","./at/Seq/Seqbang","./Try","./bang","./compare","./math/methods"],function(exports,Bool_0,Fun_1,js_2,methods_3,Obj_33_4,Pred_45Type_5,Wrap_45Type_6,_64_45Type_7,_63_8,Map_9,Array_33_10,Seq_11,Seq_33_12,Try_13,_33_14,compare_15,methods_16){
	exports._get=_ms.lazy(function(){
		const Bool=_ms.getDefaultExport(Bool_0),Fun=_ms.getDefaultExport(Fun_1),_$3=_ms.getModule(Fun_1),Act=_ms.get(_$3,"Act"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),_$5=_ms.getModule(methods_3),freeze=_ms.get(_$5,"freeze"),_$6=_ms.getModule(Obj_33_4),p_33=_ms.get(_$6,"p!"),_$7=_ms.getModule(Pred_45Type_5),Any=_ms.get(_$7,"Any"),Opt=_ms.get(_$7,"Opt"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_6),_$10=_ms.lazyGetModule(_64_45Type_7),empty=_ms.lazyProp(_$10,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_8)
		}),_$11=_ms.lazyGetModule(_63_8),_63_45or=_ms.lazyProp(_$11,"?-or"),Map=_ms.lazy(function(){
			return _ms.getDefaultExport(Map_9)
		}),_$12=_ms.lazyGetModule(Map_9),_63get=_ms.lazyProp(_$12,"?get"),Array_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Array_33_10)
		}),Seq=_ms.lazy(function(){
			return _ms.getDefaultExport(Seq_11)
		}),_$15=_ms.lazyGetModule(Seq_33_12),_43_43_62_33=_ms.lazyProp(_$15,"++>!"),_$16=_ms.lazyGetModule(Try_13),oh_45no_33=_ms.lazyProp(_$16,"oh-no!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_14)
		}),_$18=_ms.lazyGetModule(_33_14),_33call=_ms.lazyProp(_$18,"!call"),_$19=_ms.lazyGetModule(compare_15),_61_63=_ms.lazyProp(_$19,"=?"),_$20=_ms.lazyGetModule(methods_16),_43=_ms.lazyProp(_$20,"+");
		const exports={};
		const opr=exports.opr=function(){
			const doc="Fills in an Opt with a default value.";
			const test=function(){
				const _k0=[undefined,1],_v0=1;
				const _k1=[1,2],_v1=1;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function(_,_default){
				_ms.checkContains(Opt,_,"_");
				return function(){
					if(_ms.bool(defined_63(_))){
						return _
					} else {
						return _ms.unlazy(_default)
					}
				}()
			},"doc",doc,"test",test,"displayName","opr")
		}();
		const build=exports.build=function(){
			const doc="Passes in a `yield` function to `calls-yield`.\nReturns a Seq of what `calls-yield` called `yield` with.";
			const test=function(){
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),[0,1],build(function(_yield){
					_yield(0);
					return _yield(1)
				}))
			};
			return _ms.set(function(calls_45yield){
				_ms.checkContains(Fun,calls_45yield,"calls-yield");
				const yielded=_ms.unlazy(empty)(_ms.unlazy(Array_33));
				const _yield=function(_){
					return _ms.unlazy(_43_43_62_33)(yielded,[_])
				};
				calls_45yield(_yield);
				return _ms.checkContains(_ms.unlazy(Seq),freeze(yielded),"res")
			},"doc",doc,"test",test,"displayName","build")
		}();
		const _switch=exports.switch=function(){
			const doc="Calls the Fun that `cases` associates with `val`.";
			const test=function(){
				const n=function(x){
					return _switch(x,function(){
						const _k0=1,_v0=function(){
							return "one"
						};
						const _k1=2,_v1=function(){
							return "two"
						};
						const _k2=switch_45else,_v2=function(){
							return "three"
						};
						return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
					}())
				};
				return _ms.unlazy(_33call)(n,function(){
					const _k0=[1],_v0="one";
					const _k1=[2],_v1="two";
					const _k2=[3],_v2="three";
					return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
				}())
			};
			return _ms.set(function(val,cases){
				_ms.checkContains(Any,val,"val");
				_ms.checkContains(_ms.sub(_ms.unlazy(Map),Any,Fun),cases,"cases");
				const dispatch=_ms.checkContains(Fun,_ms.unlazy(_63_45or)(_ms.unlazy(_63get)(cases,val),_ms.lazy(function(){
					return _ms.sub(cases,switch_45else)
				})),"dispatch");
				return dispatch()
			},"doc",doc,"test",test,"displayName","switch")
		}();
		const switch_45else=exports["switch-else"]=function(){
			const doc="Special object used as default for `switch` statements.";
			return {
				doc:doc,
				displayName:"switch-else"
			}
		}();
		const _if=exports.if=function(){
			const doc="Iff `condition`, evaluates `result` and puts it in a `?`.";
			const test=function(){
				const _k0=[true,1],_v0=_ms.unlazy(_63)(1);
				const _k1=[false,1],_v1=_ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function(condition,result){
				_ms.checkContains(Bool,condition,"condition");
				return _ms.checkContains(_ms.unlazy(_63),function(){
					if(_ms.bool(condition)){
						return _ms.unlazy(_63)(_ms.unlazy(result))
					} else {
						return _ms.unlazy(empty)(_ms.unlazy(_63))
					}
				}(),"res")
			},"doc",doc,"test",test,"displayName","if")
		}();
		const if_33=exports["if!"]=function(){
			const doc="Runs `result` iff `condition`.";
			const test=function(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),[0],build(function(_yield){
					return if_33(true,function(){
						return _yield(0)
					})
				}));
				return if_33(false,_ms.unlazy(oh_45no_33))
			};
			return _ms.set(function(condition,result){
				_ms.checkContains(Bool,condition,"condition");
				_ms.checkContains(Act,result,"result");
				if(_ms.bool(condition)){
					result()
				} else {
					null
				}
			},"doc",doc,"test",test,"displayName","if!")
		}();
		const unreachable_33=exports["unreachable!"]=function(){
			const doc="Call this to mark code as unreachable.";
			return _ms.set(function(){
				return _ms.unlazy(oh_45no_33)("This should not be reachable.")
			},"doc",doc,"displayName","unreachable!")
		}();
		const TODO=exports.TODO=function(){
			const doc="Placeholder for something which you really ought to implement one of these days.";
			return _ms.set(function(){
				return _ms.unlazy(oh_45no_33)("This function has not yet been implemented.")
			},"doc",doc,"displayName","TODO")
		}();
		const returning=exports.returning=function(){
			const doc="Calls `do-after` and returns `returned`.";
			const test=function(){
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),[0],build(function(_yield){
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),1,returning(1,function(){
						return _yield(0)
					}))
				}))
			};
			return _ms.set(function(returned,do_45after){
				_ms.checkContains(Any,returned,"returned");
				_ms.checkContains(Fun,do_45after,"do-after");
				do_45after(returned);
				return returned
			},"doc",doc,"test",test,"displayName","returning")
		}();
		const loop=exports.loop=function(){
			const doc="Maintains a value representing state, and continually applies `transform-state` to it until that returns an End-Loop.\nReturns the value inside that End-Loop.";
			const test=function(){
				const f=function(_){
					return function(){
						if(_ms.bool(_ms.unlazy(_61_63)(_,10))){
							return End_45Loop("end")
						} else {
							return _ms.unlazy(_43)(_,1)
						}
					}()
				};
				const _k0=[0,f],_v0="end";
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(init_45state,transform_45state){
				_ms.checkContains(Fun,transform_45state,"transform-state");
				const state=Ref_33(init_45state);
				const output=Ref_33(null);
				loop133:while(true){
					{
						const _=transform_45state(get(state));
						if(_ms.bool(_ms.contains(End_45Loop,_))){
							set_33(output,_.val);
							break loop133
						} else {
							set_33(state,_)
						}
					}
				};
				return get(output)
			},"doc",doc,"test",test,"displayName","loop")
		}();
		const End_45Loop=exports["End-Loop"]=Wrap_45Type(function(){
			const doc="Wrap a value in this to indicate that you want this to be the return value of the loop.";
			return {
				doc:doc,
				displayName:"End-Loop"
			}
		}());
		const Ref_33=exports["Ref!"]=Wrap_45Type(function(){
			const doc="Mutable holder of some value.\nCreate a Ref! by passing in the initial value.\nChange this at any time with `set!`.\nUse `get` at any time to get the current value.";
			return {
				doc:doc,
				displayName:"Ref!"
			}
		}());
		const set_33=exports["set!"]=function(){
			const doc="Change the current value.";
			const test=function(){
				const _=Ref_33(null);
				set_33(_,0);
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),get(_),0)
			};
			return _ms.set(function(_,new_45value){
				_ms.checkContains(Ref_33,_,"_");
				return p_33(_,"val",new_45value)
			},"doc",doc,"test",test,"displayName","set!")
		}();
		const mod_33=exports["mod!"]=function(){
			const doc="Gets the value, changes it, and sets it.";
			const test=function(){
				const _=Ref_33(0);
				mod_33(_,_ms.sub(_ms.unlazy(_43),1));
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),get(_),1)
			};
			return _ms.set(function(_,f){
				_ms.checkContains(Ref_33,_,"_");
				_ms.checkContains(Fun,f,"f");
				return set_33(_,f(get(_)))
			},"doc",doc,"test",test,"displayName","mod!")
		}();
		const get=exports.get=function(){
			const doc="Current value.";
			const test=function(){
				const _k0=[Ref_33(0)],_v0=0;
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(_){
				_ms.checkContains(Ref_33,_,"_");
				return _.val
			},"doc",doc,"test",test,"displayName","get")
		}();
		const displayName=exports.displayName="control";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9jb250cm9sLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztpQ0FxQkE7Ozs7Ozs7Ozs7Ozs7RUFBQSxnQ0FBSTtHQUNILFVBQU07R0FDTixXQUFPLFVBQ047SUFBQSxVQUFBLENBQUEsVUFBWSxPQUFPO0lBQ25CLFVBQUEsQ0FBRSxFQUFFLE9BQU87OztrQkFDWCxTQUFBLEVBQU0sU0FDTjtzQkFERTs7S0FFRCxZQUFBLFdBQUEsSUFDQzthQUFBO0tBQUEsT0FFQTt3QkFMSTtLQUFBO0lBQUE7R0FBQTs7RUFPUixvQ0FBTTtHQUNMLFVBQ0M7R0FFRCxXQUFPLFVBQ047OENBQUssQ0FBRSxFQUFFLEdBQUksTUFBUSxTQUFBLE9BQ3BCO0tBQUEsT0FBTTtZQUNOLE9BQU07SUFBQTtHQUFBO2tCQUNQLFNBQUssY0FDTDtzQkFEaUI7SUFDakI7SUFDQSxhQUFTLFNBQUEsRUFDUjtxQ0FBQSxRQUFhLENBQUU7SUFBQTtJQUNoQixjQUFBOzZDQUNBLE9BQUE7OztFQUdELHVDQUFPO0dBQ04sVUFBTTtHQUNOLFdBQU8sVUFDTjtJQUFBLFFBQUssU0FBQSxFQUNKO1lBQUEsUUFBQSxZQUFRO01BQ1AsVUFBQSxNQUFNLFVBQ0w7Y0FBQztNQUFBO01BQ0YsVUFBQSxNQUFNLFVBQ0w7Y0FBQztNQUFBO01BQ0YsVUFBQSxrQkFBZ0IsVUFDZjtjQUFDO01BQUE7Ozs7K0JBQ0osWUFBTztLQUNOLFVBQUEsQ0FBRSxPQUFRO0tBQ1YsVUFBQSxDQUFFLE9BQVE7S0FDVixVQUFBLENBQUUsT0FBUTs7OztrQkFDWCxTQUFBLElBQVEsTUFDUjtzQkFESTs4Q0FBYSxJQUFBO0lBQ2pCLGlDQUFTLDRDQUFXLE1BQUE7b0JBQWtCLE1BQUs7SUFBQTtXQUMzQztHQUFBOztFQUNGLHFEQUFZO0dBQ1gsVUFBTTtVQURLOzs7OztFQUdaLCtCQUFHO0dBQ0YsVUFBTTtHQUNOLFdBQU8sVUFDTjtJQUFBLFVBQUEsQ0FBQSxLQUFPLHVCQUFTO0lBQ2hCLFVBQUEsQ0FBQSxNQUFROzs7a0JBQ1IsU0FBRyxVQUFlLE9BQ2xCO3NCQURhOztLQUVaLFlBQUEsV0FDQzt3Q0FIZ0I7S0FBQSxPQUtoQjs7Ozs7O0VBRUoscUNBQUk7R0FDSCxVQUFNO0dBQ04sV0FBTyxVQUNOO3VDQUFLLENBQUUsR0FBSSxNQUFRLFNBQUEsT0FDbEI7WUFBQSxNQUFBLEtBQVUsVUFDVDthQUFBLE9BQU07S0FBQTtJQUFBO1dBQ1IsTUFBQTs7a0JBQ0EsU0FBQSxVQUFlLE9BQ2Y7c0JBRFU7c0JBQVk7SUFDakIsWUFDSixXQUNDO0tBQUE7SUFBQSxPQUVBO0tBQUE7SUFBQTtHQUFBOztFQUVMLHVEQUFhO0dBQ1osVUFBTTtrQkFDTCxVQUNBO2tDQUFRO0dBQUE7O0VBRVYsa0NBQUs7R0FDSixVQUFNO2tCQUNMLFVBQ0E7a0NBQVE7R0FBQTs7RUFFViw0Q0FBVTtHQUNULFVBQU07R0FDTixXQUFPLFVBQ047OENBQUssQ0FBRSxHQUFJLE1BQVEsU0FBQSxPQUNsQjsrQ0FBSyxFQUFFLFVBQVcsRUFBRyxVQUNwQjthQUFBLE9BQU07S0FBQTtJQUFBO0dBQUE7a0JBQ1IsU0FBQSxTQUFhLFdBQ2I7c0JBRFM7c0JBQWE7SUFDdEIsV0FBQTtXQUNBO0dBQUE7O0VBR0Qsa0NBQUs7R0FDSixVQUNDO0dBRUQsV0FBTyxVQUNOO0lBQUEsUUFBSyxTQUFBLEVBQUE7O01BQ0osK0JBQUcsRUFBRSxLQUNKO2NBQUEsV0FBVTtNQUFBLE9BRVY7OEJBQUUsRUFBRTtNQUFBO0tBQUE7SUFBQTtJQUNOLFVBQUEsQ0FBRSxFQUFGLE9BQVk7OztrQkFFWixTQUFBLGFBQVcsa0JBQ1g7c0JBRDJCO0lBQzNCLFlBQVEsT0FBQTtJQUNSLGFBQVMsT0FBSzt1QkFFYjtLQUFNO01BQUEsUUFBQSxrQkFBZ0IsSUFBQTtNQUNyQix5QkFBQyxXQUFELElBQ0M7T0FBQSxPQUFBLE9BQVk7T0FDWjthQUVBO09BQUEsT0FBQSxNQUFXO01BQUE7S0FBQTtJQUFBO1dBQ2QsSUFBQTtHQUFBOztFQUVGLHFDQUFVLHNCQUFTO0dBQ2xCLFVBQU07VUFEWTs7Ozs7RUFJbkIsNkJBQU0sc0JBQVM7R0FDZCxVQUNDO1VBRmE7Ozs7O0VBT2YsdUNBQUs7R0FDSixVQUFNO0dBQ04sV0FBTyxVQUNOO0lBQUEsUUFBSSxPQUFLO0lBQ1QsT0FBSyxFQUFFOzhDQUNQLElBQUssR0FBSztHQUFBO2tCQUNWLFNBQUEsRUFBTyxZQUNQO3NCQURFO1dBQ0YsS0FBRyxFQUFHLE1BQU47R0FBQTs7RUFFRix1Q0FBSztHQUNKLFVBQU07R0FDTixXQUFPLFVBQ047SUFBQSxRQUFJLE9BQUs7SUFDVCxPQUFLLDBCQUFJOzhDQUNULElBQUssR0FBSztHQUFBO2tCQUNWLFNBQUEsRUFBTyxFQUNQO3NCQURFO3NCQUFPO1dBQ1QsT0FBSyxFQUFFLEVBQUEsSUFBRztHQUFBOztFQUVaLGdDQUFJO0dBQ0gsVUFBTTtHQUNOLFdBQU8sVUFDTjtJQUFBLFVBQUEsQ0FBRSxPQUFNLFFBQVE7OztrQkFDaEIsU0FBQSxFQUNBO3NCQURFO1dBQ0Y7OztFQS9LSCxzQ0FBQSIsImZpbGUiOiJjb250cm9sLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=