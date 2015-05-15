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
			const test=function(){
				return _ms.set(function(){
					const _k0=[void 0,1],_v0=1;
					const _k1=[1,2],_v1=1;
					return _ms.map(_k0,_v0,_k1,_v1)
				},"displayName","test")
			}();
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
			const doc="Passes in a `yield` Function to `calls-yield`.\nReturns a Seq of what `calls-yield` called `yield` with.";
			const test=function(){
				return _ms.set(function(){
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),[0,1],build(function(_yield){
						_yield(0);
						return _yield(1)
					}))
				},"displayName","test")
			}();
			return _ms.set(function(calls_45yield){
				_ms.checkContains(Function,calls_45yield,"calls-yield");
				const yielded=_ms.unlazy(empty)(_ms.unlazy(Array_33));
				const _yield=function(){
					return _ms.set(function(_){
						return _ms.unlazy(_43_43_62_33)(yielded,[_])
					},"displayName","yield")
				}();
				calls_45yield(_yield);
				return _ms.checkContains(_ms.unlazy(Seq),freeze(yielded),"res")
			},"doc",doc,"test",test,"displayName","build")
		}();
		const _switch=exports.switch=function(){
			const doc="Calls the Function that `cases` associates with `val`.";
			const test=function(){
				return _ms.set(function(){
					const n=function(){
						return _ms.set(function(x){
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
						},"displayName","n")
					}();
					return _ms.unlazy(_33call)(n,function(){
						const _k0=[1],_v0="one";
						const _k1=[2],_v1="two";
						const _k2=[3],_v2="three";
						return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
					}())
				},"displayName","test")
			}();
			return _ms.set(function(val,cases){
				_ms.checkContains(Any,val,"val");
				_ms.checkContains(_ms.sub(_ms.unlazy(Map),Any,Function),cases,"cases");
				return _ms.unlazy(_63_45or)(_ms.unlazy(_63get)(cases,val),_ms.lazy(function(){
					return _ms.sub(cases,switch_45else)
				}))()
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
				return _ms.set(function(){
					const _k0=[true,1],_v0=_ms.unlazy(_63)(1);
					const _k1=[false,1],_v1=_ms.unlazy(empty)(_ms.unlazy(_63));
					return _ms.map(_k0,_v0,_k1,_v1)
				},"displayName","test")
			}();
			return _ms.set(function(condition,result){
				_ms.checkContains(Boolean,condition,"condition");
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
				return _ms.set(function(){
					_ms.unlazy(_33)(_ms.unlazy(_61_63),[0],build(function(_yield){
						return if_33(true,function(){
							return _yield(0)
						})
					}));
					return if_33(false,_ms.unlazy(oh_45no_33))
				},"displayName","test")
			}();
			return _ms.set(function(condition,result){
				_ms.checkContains(Boolean,condition,"condition");
				_ms.checkContains(Action,result,"result");
				if(_ms.bool(condition)){
					result()
				} else {}
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
				return _ms.set(function(){
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),[0],build(function(_yield){
						return _ms.unlazy(_33)(_ms.unlazy(_61_63),1,returning(1,function(){
							return _yield(0)
						}))
					}))
				},"displayName","test")
			}();
			return _ms.set(function(returned,do_45after){
				_ms.checkContains(Any,returned,"returned");
				_ms.checkContains(Function,do_45after,"do-after");
				do_45after(returned);
				return returned
			},"doc",doc,"test",test,"displayName","returning")
		}();
		const loop=exports.loop=function(){
			const doc="Maintains a value representing state, and continually applies `transform-state` to it until that returns an End-Loop.\nReturns the value inside that End-Loop.";
			const test=function(){
				return _ms.set(function(){
					const f=function(){
						return _ms.set(function(_){
							return function(){
								if(_ms.bool(_ms.unlazy(_61_63)(_,10))){
									return End_45Loop("end")
								} else {
									return _ms.unlazy(_43)(_,1)
								}
							}()
						},"displayName","f")
					}();
					const _k0=[0,f],_v0="end";
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(init_45state,transform_45state){
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
				return _ms.set(function(){
					const _=Ref_33(null);
					set_33(_,0);
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),get(_),0)
				},"displayName","test")
			}();
			return _ms.set(function(_,new_45value){
				_ms.checkContains(Ref_33,_,"_");
				return p_33(_,"val",new_45value)
			},"doc",doc,"test",test,"displayName","set!")
		}();
		const mod_33=exports["mod!"]=function(){
			const doc="Gets the value, changes it, and sets it.";
			const test=function(){
				return _ms.set(function(){
					const _=Ref_33(0);
					mod_33(_,_ms.sub(_ms.unlazy(_43),1));
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),get(_),1)
				},"displayName","test")
			}();
			return _ms.set(function(_,f){
				_ms.checkContains(Ref_33,_,"_");
				_ms.checkContains(Function,f,"f");
				return set_33(_,f(get(_)))
			},"doc",doc,"test",test,"displayName","mod!")
		}();
		const get=exports.get=function(){
			const doc="Current value.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[Ref_33(0)],_v0=0;
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(_){
				_ms.checkContains(Ref_33,_,"_");
				return _.val
			},"doc",doc,"test",test,"displayName","get")
		}();
		const displayName=exports.displayName="control";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9jb250cm9sLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztFQW9CQSxnQ0FDSTtHQUFILFVBQU07R0FDTixxQkFDTzttQkFBQSxVQUFBO0tBQU4sVUFBQSxDQUFFLE9BQVUsT0FBTztLQUNuQixVQUFBLENBQUUsRUFBRSxPQUFPOzs7O2tCQUNYLFNBQUEsRUFBTSxTQUNRO3NCQURaOztLQUVELFlBQUEsV0FBQSxJQUNTO2FBQVI7S0FBQSxPQUVHO3dCQUxDO0tBQUE7SUFBQTtHQUFBOztFQU9SLG9DQUNNO0dBQUwsVUFDQztHQUVELHFCQUNPO21CQUFBLFVBQUE7K0NBQUQsQ0FBRSxFQUFFLEdBQUssTUFBTyxTQUFBLE9BQ0s7TUFBekIsT0FBTTthQUNOLE9BQU07S0FBQTtJQUFBOztrQkFDUCxTQUFLLGNBQ29CO3NCQURSO0lBQ2pCO0lBQ0EsdUJBQVM7b0JBQUEsU0FBQSxFQUNDO3NDQUFKLFFBQVEsQ0FBRTtLQUFBOztJQUNoQixjQUFZOzZDQUNaLE9BQU87OztFQUdSLHVDQUNPO0dBQU4sVUFBTTtHQUNOLHFCQUNPO21CQUFBLFVBQUE7S0FBTixrQkFBSztxQkFBQSxTQUFBLEVBQ0M7Y0FBTCxRQUFPLFlBQ0M7UUFBUCxVQUFBLE1BQ00sVUFBQTtnQkFBSjtRQUFBO1FBQ0YsVUFBQSxNQUNNLFVBQUE7Z0JBQUo7UUFBQTtRQUNGLFVBQUEsa0JBQ2dCLFVBQUE7Z0JBQWQ7UUFBQTs7Ozs7Z0NBQ0UsWUFDQztNQUFOLFVBQUEsQ0FBRSxPQUFRO01BQ1YsVUFBQSxDQUFFLE9BQVE7TUFDVixVQUFBLENBQUUsT0FBUTs7Ozs7a0JBQ1gsU0FBQSxJQUFRLE1BQ3VCO3NCQUQzQjs4Q0FBYyxJQUFJO21EQUNWLE1BQU07b0JBQU0sTUFBTTtJQUFBO0dBQUE7O0VBQ2hDLHFEQUNZO0dBQVgsVUFBTTs7Ozs7O0VBRVAsK0JBQ0c7R0FBRixVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTtLQUFOLFVBQUEsQ0FBRSxLQUFLLHVCQUFTO0tBQ2hCLFVBQUEsQ0FBRSxNQUFNOzs7O2tCQUNSLFNBQUcsVUFBa0IsT0FDTztzQkFEZjs7S0FFWixZQUFBLFdBQ1M7d0NBSFc7S0FBQSxPQUtoQjs7Ozs7O0VBRVAscUNBQ0k7R0FBSCxVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTt3Q0FBRCxDQUFFLEdBQUssTUFBTyxTQUFBLE9BQ0s7YUFBdkIsTUFBSSxLQUNNLFVBQUE7Y0FBVCxPQUFNO01BQUE7S0FBQTtZQUNSLE1BQUk7OztrQkFDSixTQUFBLFVBQWtCLE9BQ2E7c0JBRHJCO3NCQUFlO0lBRXBCLFlBQUosV0FDUztLQUFSO0lBQUEsT0FFRztHQUFBOztFQUVSLHVEQUNhO0dBQVosVUFBTTtrQkFFTCxVQUFBO2tDQUFRO0dBQUE7O0VBRVYsa0NBQ0s7R0FBSixVQUFNO2tCQUVMLFVBQUE7a0NBQVE7R0FBQTs7RUFFViw0Q0FDVTtHQUFULFVBQU07R0FDTixxQkFDTzttQkFBQSxVQUFBOytDQUFELENBQUUsR0FBSyxNQUFPLFNBQUEsT0FDSztnREFBbEIsRUFBRyxVQUFVLEVBQ0csVUFBQTtjQUFwQixPQUFNO01BQUE7S0FBQTtJQUFBOztrQkFDUixTQUFBLFNBQWEsV0FDaUI7c0JBRHJCO3NCQUFhO0lBQ3RCLFdBQVM7V0FDVDtHQUFBOztFQUdELGtDQUNLO0dBQUosVUFDQztHQUVELHFCQUNPO21CQUFBLFVBQUE7S0FBTixrQkFBSztxQkFBQSxTQUFBLEVBQUE7O1FBQ0osK0JBQUcsRUFBRSxLQUNFO2dCQUFOLFdBQVU7UUFBQSxPQUVQO2dDQUFELEVBQUU7UUFBQTtPQUFBO01BQUE7O0tBQ04sVUFBQSxDQUFFLEVBQUUsT0FBUTs7OztrQkFFWixTQUFBLGFBQVcsa0JBQ3dCO3NCQURSO0lBQzNCLFlBQVEsT0FBSztJQUNiLGFBQVMsT0FBSzt1QkFFVDtLQUFFO01BQUEsUUFBQSxrQkFBaUIsSUFBSTtNQUMxQix5QkFBQyxXQUFELElBQ1M7T0FBUixPQUFLLE9BQU87T0FDWjthQUVHO09BQUgsT0FBSyxNQUFNO01BQUE7S0FBQTtJQUFBO1dBQ2QsSUFBSTtHQUFBOztFQUVOLHFDQUFVLHNCQUNTO0dBQWxCLFVBQU07Ozs7OztFQUdQLDZCQUFNLHNCQUNTO0dBQWQsVUFDQzs7Ozs7O0VBS0YsdUNBQ0s7R0FBSixVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTtLQUFOLFFBQUksT0FBSztLQUNULE9BQUssRUFBRTsrQ0FDRixJQUFBLEdBQUs7SUFBQTs7a0JBQ1YsU0FBQSxFQUFPLFlBQ1M7c0JBRGQ7V0FDRixLQUFHLEVBQUcsTUFBSztHQUFBOztFQUViLHVDQUNLO0dBQUosVUFBTTtHQUNOLHFCQUNPO21CQUFBLFVBQUE7S0FBTixRQUFJLE9BQUs7S0FDVCxPQUFLLDBCQUFJOytDQUNKLElBQUEsR0FBSztJQUFBOztrQkFDVixTQUFBLEVBQU8sRUFDVTtzQkFEZjtzQkFBTztXQUNULE9BQUssRUFBRyxFQUFFLElBQUE7R0FBQTs7RUFFWixnQ0FDSTtHQUFILFVBQU07R0FDTixxQkFDTzttQkFBQSxVQUFBO0tBQU4sVUFBQSxDQUFHLE9BQUssUUFBUTs7OztrQkFDaEIsU0FBQSxFQUNNO3NCQURKO1dBQ0Y7OztFQTdLSCxzQ0FBQSIsImZpbGUiOiJjb250cm9sLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=