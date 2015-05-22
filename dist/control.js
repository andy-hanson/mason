"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./methods","./Type/Pred-Type","./Type/Wrap-Type","./at/at-Type","./at/q","./at/Map/Map","./at/Seq/Arraybang","./at/Seq/Seq","./at/Seq/Seqbang","./Try","./bang","./compare","./math/methods"],function(exports,js_0,methods_1,Pred_45Type_2,Wrap_45Type_3,_64_45Type_4,_63_5,Map_6,Array_33_7,Seq_8,Seq_33_9,Try_10,_33_11,compare_12,methods_13){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),defined_63=_ms.get(_$2,"defined?"),_$3=_ms.getModule(methods_1),freeze=_ms.get(_$3,"freeze"),_$4=_ms.getModule(Pred_45Type_2),Any=_ms.get(_$4,"Any"),Opt=_ms.get(_$4,"Opt"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_3),_$7=_ms.lazyGetModule(_64_45Type_4),empty=_ms.lazyProp(_$7,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_5)
		}),_$8=_ms.lazyGetModule(_63_5),_63_45or=_ms.lazyProp(_$8,"?-or"),Map=_ms.lazy(function(){
			return _ms.getDefaultExport(Map_6)
		}),_$9=_ms.lazyGetModule(Map_6),_63get=_ms.lazyProp(_$9,"?get"),Array_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Array_33_7)
		}),Seq=_ms.lazy(function(){
			return _ms.getDefaultExport(Seq_8)
		}),_$12=_ms.lazyGetModule(Seq_33_9),_43_43_62_33=_ms.lazyProp(_$12,"++>!"),_$13=_ms.lazyGetModule(Try_10),oh_45no_33=_ms.lazyProp(_$13,"oh-no!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_11)
		}),_$15=_ms.lazyGetModule(_33_11),_33call=_ms.lazyProp(_$15,"!call"),_$16=_ms.lazyGetModule(compare_12),_61_63=_ms.lazyProp(_$16,"=?"),_$17=_ms.lazyGetModule(methods_13),_43=_ms.lazyProp(_$17,"+");
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
				let state=init_45state;
				let output=null;
				while(true){
					{
						const _=transform_45state(state);
						if(_ms.bool(_ms.contains(End_45Loop,_))){
							output=_.val;
							break
						} else {
							state=_
						}
					}
				};
				return output
			},"doc",doc,"test",test)
		}();
		const End_45Loop=exports["End-Loop"]=Wrap_45Type(function(){
			const doc="Wrap a value in this to indicate that you want this to be the return value of the loop.";
			return {
				doc:doc,
				name:"End-Loop"
			}
		}());
		const name=exports.name="control";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9jb250cm9sLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztFQWtCQSxnQ0FDSTtHQUFILFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixVQUFBLENBQUUsT0FBVSxPQUFPO0lBQ25CLFVBQUEsQ0FBRSxFQUFFLE9BQU87OztrQkFDWCxhQUFBLEVBQU0sU0FDUTtzQkFEWjs7S0FFRCxZQUFBLFdBQVEsSUFDQzthQUFSO0tBQUEsT0FFRzt3QkFMQztLQUFBO0lBQUE7R0FBQTs7RUFPUixvQ0FDTTtHQUFMLFVBQ0M7R0FFRCxXQUNPLGVBQUE7OENBQUQsQ0FBRSxFQUFFLEdBQUssTUFBTyxTQUFBLE9BQ0s7S0FBekIsT0FBTTtZQUNOLE9BQU07SUFBQTtHQUFBO2tCQUNQLGVBQUssY0FDb0I7c0JBRFI7SUFDakI7SUFDQSxhQUFTLGdCQUFBLEVBQ0M7cUNBQUosUUFBUSxDQUFFO0lBQUE7SUFDaEIsY0FBWTs2Q0FDWixPQUFPOzs7RUFHUix1Q0FDTztHQUFOLFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixRQUFLLFdBQUEsRUFDQztZQUFMLFFBQU8sWUFDQztNQUFQLFVBQUEsTUFDTSxVQUFBO2NBQUo7TUFBQTtNQUNGLFVBQUEsTUFDTSxVQUFBO2NBQUo7TUFBQTtNQUNGLFVBQUEsa0JBQ2dCLFVBQUE7Y0FBZDtNQUFBOzs7OytCQUNFLFlBQ0M7S0FBTixVQUFBLENBQUUsT0FBUTtLQUNWLFVBQUEsQ0FBRSxPQUFRO0tBQ1YsVUFBQSxDQUFFLE9BQVE7Ozs7a0JBQ1gsaUJBQUEsSUFBUSxNQUN1QjtzQkFEM0I7OENBQWMsSUFBSTttREFDVixNQUFNO29CQUFNLE1BQU07SUFBQTtHQUFBOztFQUNoQyxxREFDWTtHQUFYLFVBQU07Ozs7OztFQUVQLCtCQUNHO0dBQUYsVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFVBQUEsQ0FBRSxLQUFLLHVCQUFTO0lBQ2hCLFVBQUEsQ0FBRSxNQUFNOzs7a0JBQ1IsYUFBRyxVQUFrQixPQUNPO3NCQURmOztLQUVaLFlBQUEsV0FDUzt3Q0FIVztLQUFBLE9BS2hCOzs7Ozs7RUFFUix1REFDYTtHQUFaLFVBQU07a0JBRUwseUJBQUE7a0NBQVE7R0FBQTs7RUFFVixrQ0FDSztHQUFKLFVBQU07a0JBRUwsZUFBQTtrQ0FBUTtHQUFBOztFQUVWLDRDQUNVO0dBQVQsVUFBTTtHQUNOLFdBQ08sZUFBQTs4Q0FBRCxDQUFFLEdBQUssTUFBTyxTQUFBLE9BQ0s7K0NBQWxCLEVBQUcsVUFBVSxFQUNHLFVBQUE7YUFBcEIsT0FBTTtLQUFBO0lBQUE7R0FBQTtrQkFDUixtQkFBQSxTQUFhLFdBQ2lCO3NCQURyQjtzQkFBYTtJQUN0QixXQUFTO1dBQ1Q7R0FBQTs7RUFJRCxrQ0FDSztHQUFKLFVBQ0M7R0FFRCxXQUNPLGVBQUE7SUFBTixRQUFLLFdBQUEsRUFBQTs7TUFDSiwrQkFBRyxFQUFFLEtBQ0U7Y0FBTixXQUFVO01BQUEsT0FFUDs4QkFBRCxFQUFFO01BQUE7S0FBQTtJQUFBO0lBQ04sVUFBQSxDQUFFLEVBQUUsT0FBUTs7O2tCQUVaLGNBQUEsYUFBVyxrQkFDd0I7c0JBRFI7SUFDM0IsVUFBVTtJQUNWLFdBQVc7SUFFUCxXQUFBO0tBQUc7TUFBQSxRQUFBLGtCQUFnQjtNQUNyQix5QkFBQyxXQUFELElBQ1M7Y0FBRTtPQUNWO01BQUEsT0FFRzthQUFNO01BQUE7S0FBQTtJQUFBO1dBQ1o7R0FBQTs7RUFFRixxQ0FBVSxzQkFDUztHQUFsQixVQUFNOzs7Ozs7RUE3SFIsd0JBQUEiLCJmaWxlIjoiY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9