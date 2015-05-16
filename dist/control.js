"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Function","./js","./methods","./Objectbang","./Type/Pred-Type","./Type/Wrap-Type","./at/at-Type","./at/q","./at/Map/Map","./at/Seq/Arraybang","./at/Seq/Seq","./at/Seq/Seqbang","./Try","./bang","./compare","./math/methods"],function(exports,Function_0,js_1,methods_2,Object_33_3,Pred_45Type_4,Wrap_45Type_5,_64_45Type_6,_63_7,Map_8,Array_33_9,Seq_10,Seq_33_11,Try_12,_33_13,compare_14,methods_15){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Function_0),Action=_ms.get(_$2,"Action"),_$3=_ms.getModule(js_1),defined_63=_ms.get(_$3,"defined?"),_$4=_ms.getModule(methods_2),freeze=_ms.get(_$4,"freeze"),_$5=_ms.getModule(Object_33_3),p_33=_ms.get(_$5,"p!"),_$6=_ms.getModule(Pred_45Type_4),Any=_ms.get(_$6,"Any"),Opt=_ms.get(_$6,"Opt"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_5),_$9=_ms.lazyGetModule(_64_45Type_6),empty=_ms.lazyProp(_$9,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_7)
		}),_$10=_ms.lazyGetModule(_63_7),_63_45or=_ms.lazyProp(_$10,"?-or"),Map=_ms.lazy(function(){
			return _ms.getDefaultExport(Map_8)
		}),_$11=_ms.lazyGetModule(Map_8),_63get=_ms.lazyProp(_$11,"?get"),Array_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Array_33_9)
		}),Seq=_ms.lazy(function(){
			return _ms.getDefaultExport(Seq_10)
		}),_$14=_ms.lazyGetModule(Seq_33_11),_43_43_62_33=_ms.lazyProp(_$14,"++>!"),_$15=_ms.lazyGetModule(Try_12),oh_45no_33=_ms.lazyProp(_$15,"oh-no!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_13)
		}),_$17=_ms.lazyGetModule(_33_13),_33call=_ms.lazyProp(_$17,"!call"),_$18=_ms.lazyGetModule(compare_14),_61_63=_ms.lazyProp(_$18,"=?"),_$19=_ms.lazyGetModule(methods_15),_43=_ms.lazyProp(_$19,"+");
		const opr=exports.opr=function(){
			const doc="Fills in an Opt with a default value.";
			const test=function test(){
				const _k0=[void 0,1],_v0=1;
				const _k1=[1,2],_v1=1;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function opr(_,_default){
				_ms.checkContains(Opt,_,"_");
				return function(){
					if(_ms.bool(defined_63(_))){
						return _
					} else {
						return _ms.unlazy(_default)
					}
				}()
			},"doc",doc,"test",test)
		}();
		const build=exports.build=function(){
			const doc="Passes in a `yield` Function to `calls-yield`.\nReturns a Seq of what `calls-yield` called `yield` with.";
			const test=function test(){
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),[0,1],build(function(_yield){
					_yield(0);
					return _yield(1)
				}))
			};
			return _ms.set(function build(calls_45yield){
				_ms.checkContains(Function,calls_45yield,"calls-yield");
				const yielded=_ms.unlazy(empty)(_ms.unlazy(Array_33));
				const _yield=function _yield(_){
					return _ms.unlazy(_43_43_62_33)(yielded,[_])
				};
				calls_45yield(_yield);
				return _ms.checkContains(_ms.unlazy(Seq),freeze(yielded),"res")
			},"doc",doc,"test",test)
		}();
		const _switch=exports.switch=function(){
			const doc="Calls the Function that `cases` associates with `val`.";
			const test=function test(){
				const n=function n(x){
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
			return _ms.set(function _switch(val,cases){
				_ms.checkContains(Any,val,"val");
				_ms.checkContains(_ms.sub(_ms.unlazy(Map),Any,Function),cases,"cases");
				return _ms.unlazy(_63_45or)(_ms.unlazy(_63get)(cases,val),_ms.lazy(function(){
					return _ms.sub(cases,switch_45else)
				}))()
			},"doc",doc,"test",test)
		}();
		const switch_45else=exports["switch-else"]=function(){
			const doc="Special object used as default for `switch` statements.";
			return {
				doc:doc,
				name:"switch-else"
			}
		}();
		const _if=exports.if=function(){
			const doc="Iff `condition`, evaluates `result` and puts it in a `?`.";
			const test=function test(){
				const _k0=[true,1],_v0=_ms.unlazy(_63)(1);
				const _k1=[false,1],_v1=_ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function _if(condition,result){
				_ms.checkContains(Boolean,condition,"condition");
				return _ms.checkContains(_ms.unlazy(_63),function(){
					if(_ms.bool(condition)){
						return _ms.unlazy(_63)(_ms.unlazy(result))
					} else {
						return _ms.unlazy(empty)(_ms.unlazy(_63))
					}
				}(),"res")
			},"doc",doc,"test",test)
		}();
		const if_33=exports["if!"]=function(){
			const doc="Runs `result` iff `condition`.";
			const test=function test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),[0],build(function(_yield){
					return if_33(true,function(){
						return _yield(0)
					})
				}));
				return if_33(false,_ms.unlazy(oh_45no_33))
			};
			return _ms.set(function if_33(condition,result){
				_ms.checkContains(Boolean,condition,"condition");
				_ms.checkContains(Action,result,"result");
				if(_ms.bool(condition)){
					result()
				} else {}
			},"doc",doc,"test",test)
		}();
		const unreachable_33=exports["unreachable!"]=function(){
			const doc="Call this to mark code as unreachable.";
			return _ms.set(function unreachable_33(){
				return _ms.unlazy(oh_45no_33)("This should not be reachable.")
			},"doc",doc)
		}();
		const TODO=exports.TODO=function(){
			const doc="Placeholder for something which you really ought to implement one of these days.";
			return _ms.set(function TODO(){
				return _ms.unlazy(oh_45no_33)("This function has not yet been implemented.")
			},"doc",doc)
		}();
		const returning=exports.returning=function(){
			const doc="Calls `do-after` and returns `returned`.";
			const test=function test(){
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),[0],build(function(_yield){
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),1,returning(1,function(){
						return _yield(0)
					}))
				}))
			};
			return _ms.set(function returning(returned,do_45after){
				_ms.checkContains(Any,returned,"returned");
				_ms.checkContains(Function,do_45after,"do-after");
				do_45after(returned);
				return returned
			},"doc",doc,"test",test)
		}();
		const loop=exports.loop=function(){
			const doc="Maintains a value representing state, and continually applies `transform-state` to it until that returns an End-Loop.\nReturns the value inside that End-Loop.";
			const test=function test(){
				const f=function f(_){
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
			return _ms.set(function loop(init_45state,transform_45state){
				_ms.checkContains(Function,transform_45state,"transform-state");
				const state=Ref_33(init_45state);
				const output=Ref_33(null);
				loop131:while(true){
					{
						const _=transform_45state(get(state));
						if(_ms.bool(_ms.contains(End_45Loop,_))){
							set_33(output,_.val);
							break loop131
						} else {
							set_33(state,_)
						}
					}
				};
				return get(output)
			},"doc",doc,"test",test)
		}();
		const End_45Loop=exports["End-Loop"]=Wrap_45Type(function(){
			const doc="Wrap a value in this to indicate that you want this to be the return value of the loop.";
			return {
				doc:doc,
				name:"End-Loop"
			}
		}());
		const Ref_33=exports["Ref!"]=Wrap_45Type(function(){
			const doc="Mutable holder of some value.\nCreate a Ref! by passing in the initial value.\nChange this at any time with `set!`.\nUse `get` at any time to get the current value.";
			return {
				doc:doc,
				name:"Ref!"
			}
		}());
		const set_33=exports["set!"]=function(){
			const doc="Change the current value.";
			const test=function test(){
				const _=Ref_33(null);
				set_33(_,0);
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),get(_),0)
			};
			return _ms.set(function set_33(_,new_45value){
				_ms.checkContains(Ref_33,_,"_");
				return p_33(_,"val",new_45value)
			},"doc",doc,"test",test)
		}();
		const mod_33=exports["mod!"]=function(){
			const doc="Gets the value, changes it, and sets it.";
			const test=function test(){
				const _=Ref_33(0);
				mod_33(_,_ms.sub(_ms.unlazy(_43),1));
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),get(_),1)
			};
			return _ms.set(function mod_33(_,f){
				_ms.checkContains(Ref_33,_,"_");
				_ms.checkContains(Function,f,"f");
				return set_33(_,f(get(_)))
			},"doc",doc,"test",test)
		}();
		const get=exports.get=function(){
			const doc="Current value.";
			const test=function test(){
				const _k0=[Ref_33(0)],_v0=0;
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function get(_){
				_ms.checkContains(Ref_33,_,"_");
				return _.val
			},"doc",doc,"test",test)
		}();
		const name=exports.name="control";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9jb250cm9sLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztFQW9CQSxnQ0FDSTtHQUFILFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixVQUFBLENBQUUsT0FBVSxPQUFPO0lBQ25CLFVBQUEsQ0FBRSxFQUFFLE9BQU87OztrQkFDWCxhQUFBLEVBQU0sU0FDUTtzQkFEWjs7S0FFRCxZQUFBLFdBQUEsSUFDUzthQUFSO0tBQUEsT0FFRzt3QkFMQztLQUFBO0lBQUE7R0FBQTs7RUFPUixvQ0FDTTtHQUFMLFVBQ0M7R0FFRCxXQUNPLGVBQUE7OENBQUQsQ0FBRSxFQUFFLEdBQUssTUFBTyxTQUFBLE9BQ0s7S0FBekIsT0FBTTtZQUNOLE9BQU07SUFBQTtHQUFBO2tCQUNQLGVBQUssY0FDb0I7c0JBRFI7SUFDakI7SUFDQSxhQUFTLGdCQUFBLEVBQ0M7cUNBQUosUUFBUSxDQUFFO0lBQUE7SUFDaEIsY0FBWTs2Q0FDWixPQUFPOzs7RUFHUix1Q0FDTztHQUFOLFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixRQUFLLFdBQUEsRUFDQztZQUFMLFFBQU8sWUFDQztNQUFQLFVBQUEsTUFDTSxVQUFBO2NBQUo7TUFBQTtNQUNGLFVBQUEsTUFDTSxVQUFBO2NBQUo7TUFBQTtNQUNGLFVBQUEsa0JBQ2dCLFVBQUE7Y0FBZDtNQUFBOzs7OytCQUNFLFlBQ0M7S0FBTixVQUFBLENBQUUsT0FBUTtLQUNWLFVBQUEsQ0FBRSxPQUFRO0tBQ1YsVUFBQSxDQUFFLE9BQVE7Ozs7a0JBQ1gsaUJBQUEsSUFBUSxNQUN1QjtzQkFEM0I7OENBQWMsSUFBSTttREFDVixNQUFNO29CQUFNLE1BQU07SUFBQTtHQUFBOztFQUNoQyxxREFDWTtHQUFYLFVBQU07Ozs7OztFQUVQLCtCQUNHO0dBQUYsVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFVBQUEsQ0FBRSxLQUFLLHVCQUFTO0lBQ2hCLFVBQUEsQ0FBRSxNQUFNOzs7a0JBQ1IsYUFBRyxVQUFrQixPQUNPO3NCQURmOztLQUVaLFlBQUEsV0FDUzt3Q0FIVztLQUFBLE9BS2hCOzs7Ozs7RUFFUCxxQ0FDSTtHQUFILFVBQU07R0FDTixXQUNPLGVBQUE7dUNBQUQsQ0FBRSxHQUFLLE1BQU8sU0FBQSxPQUNLO1lBQXZCLE1BQUksS0FDTSxVQUFBO2FBQVQsT0FBTTtLQUFBO0lBQUE7V0FDUixNQUFJOztrQkFDSixlQUFBLFVBQWtCLE9BQ2E7c0JBRHJCO3NCQUFlO0lBRXBCLFlBQUosV0FDUztLQUFSO0lBQUEsT0FFRztHQUFBOztFQUVSLHVEQUNhO0dBQVosVUFBTTtrQkFFTCx5QkFBQTtrQ0FBUTtHQUFBOztFQUVWLGtDQUNLO0dBQUosVUFBTTtrQkFFTCxlQUFBO2tDQUFRO0dBQUE7O0VBRVYsNENBQ1U7R0FBVCxVQUFNO0dBQ04sV0FDTyxlQUFBOzhDQUFELENBQUUsR0FBSyxNQUFPLFNBQUEsT0FDSzsrQ0FBbEIsRUFBRyxVQUFVLEVBQ0csVUFBQTthQUFwQixPQUFNO0tBQUE7SUFBQTtHQUFBO2tCQUNSLG1CQUFBLFNBQWEsV0FDaUI7c0JBRHJCO3NCQUFhO0lBQ3RCLFdBQVM7V0FDVDtHQUFBOztFQUdELGtDQUNLO0dBQUosVUFDQztHQUVELFdBQ08sZUFBQTtJQUFOLFFBQUssV0FBQSxFQUFBOztNQUNKLCtCQUFHLEVBQUUsS0FDRTtjQUFOLFdBQVU7TUFBQSxPQUVQOzhCQUFELEVBQUU7TUFBQTtLQUFBO0lBQUE7SUFDTixVQUFBLENBQUUsRUFBRSxPQUFROzs7a0JBRVosY0FBQSxhQUFXLGtCQUN3QjtzQkFEUjtJQUMzQixZQUFRLE9BQUs7SUFDYixhQUFTLE9BQUs7dUJBRVQ7S0FBRTtNQUFBLFFBQUEsa0JBQWlCLElBQUk7TUFDMUIseUJBQUMsV0FBRCxJQUNTO09BQVIsT0FBSyxPQUFPO09BQ1o7YUFFRztPQUFILE9BQUssTUFBTTtNQUFBO0tBQUE7SUFBQTtXQUNkLElBQUk7R0FBQTs7RUFFTixxQ0FBVSxzQkFDUztHQUFsQixVQUFNOzs7Ozs7RUFHUCw2QkFBTSxzQkFDUztHQUFkLFVBQ0M7Ozs7OztFQUtGLHVDQUNLO0dBQUosVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFFBQUksT0FBSztJQUNULE9BQUssRUFBRTs4Q0FDRixJQUFBLEdBQUs7R0FBQTtrQkFDVixnQkFBQSxFQUFPLFlBQ1M7c0JBRGQ7V0FDRixLQUFHLEVBQUcsTUFBSztHQUFBOztFQUViLHVDQUNLO0dBQUosVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFFBQUksT0FBSztJQUNULE9BQUssMEJBQUk7OENBQ0osSUFBQSxHQUFLO0dBQUE7a0JBQ1YsZ0JBQUEsRUFBTyxFQUNVO3NCQURmO3NCQUFPO1dBQ1QsT0FBSyxFQUFHLEVBQUUsSUFBQTtHQUFBOztFQUVaLGdDQUNJO0dBQUgsVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFVBQUEsQ0FBRyxPQUFLLFFBQVE7OztrQkFDaEIsYUFBQSxFQUNNO3NCQURKO1dBQ0Y7OztFQTdLSCx3QkFBQSIsImZpbGUiOiJjb250cm9sLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=