"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./methods","./Type/Pred-Type","./at/at-Type","./at/q","./at/Map/Map","./at/Seq/Arraybang","./at/Seq/Seq","./at/Seq/Seqbang","./Try","./bang","./compare"],function(exports,js_0,methods_1,Pred_45Type_2,_64_45Type_3,_63_4,Map_5,Array_33_6,Seq_7,Seq_33_8,Try_9,_33_10,compare_11){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),defined_63=_ms.get(_$2,"defined?"),_$3=_ms.getModule(methods_1),freeze=_ms.get(_$3,"freeze"),_$4=_ms.getModule(Pred_45Type_2),Any=_ms.get(_$4,"Any"),Opt=_ms.get(_$4,"Opt"),_$6=_ms.lazyGetModule(_64_45Type_3),empty=_ms.lazyProp(_$6,"empty"),_$7=_ms.lazyGetModule(_63_4),_63_45or=_ms.lazyProp(_$7,"?-or"),Map=_ms.lazy(function(){
			return _ms.getDefaultExport(Map_5)
		}),_$8=_ms.lazyGetModule(Map_5),_63get=_ms.lazyProp(_$8,"?get"),Array_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Array_33_6)
		}),Seq=_ms.lazy(function(){
			return _ms.getDefaultExport(Seq_7)
		}),_$11=_ms.lazyGetModule(Seq_33_8),_43_43_62_33=_ms.lazyProp(_$11,"++>!"),_$12=_ms.lazyGetModule(Try_9),oh_45no_33=_ms.lazyProp(_$12,"oh-no!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_10)
		}),_$14=_ms.lazyGetModule(_33_10),_33call=_ms.lazyProp(_$14,"!call"),_$15=_ms.lazyGetModule(compare_11),_61_63=_ms.lazyProp(_$15,"=?");
		const opr=exports.opr=function(){
			const built={};
			const doc=built.doc="Fills in an Opt with a default value.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[void 0,1],1);
				_ms.assoc(built,[1,2],1);
				return built
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
			},built)
		}();
		const build=exports.build=function(){
			const built={};
			const doc=built.doc="Passes in a `yield` Function to `calls-yield`.\nReturns a Seq of what `calls-yield` called `yield` with.";
			const test=built.test=function test(){
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
			},built)
		}();
		const _switch=exports.switch=function(){
			const built={};
			const doc=built.doc="Calls the Function that `cases` associates with `val`.";
			const test=built.test=function test(){
				const n=function n(x){
					return _switch(x,function(){
						const built=new global.Map();
						_ms.assoc(built,1,function(){
							return "one"
						});
						_ms.assoc(built,2,function(){
							return "two"
						});
						_ms.assoc(built,switch_45else,function(){
							return "three"
						});
						return built
					}())
				};
				return _ms.unlazy(_33call)(n,function(){
					const built=new global.Map();
					_ms.assoc(built,[1],"one");
					_ms.assoc(built,[2],"two");
					_ms.assoc(built,[3],"three");
					return built
				}())
			};
			return _ms.set(function _switch(val,cases){
				_ms.checkContains(Any,val,"val");
				_ms.checkContains(_ms.sub(_ms.unlazy(Map),Any,Function),cases,"cases");
				return _ms.unlazy(_63_45or)(_ms.unlazy(_63get)(cases,val),_ms.lazy(function(){
					return _ms.sub(cases,switch_45else)
				}))()
			},built)
		}();
		const switch_45else=exports["switch-else"]=function(){
			const built={};
			const doc=built.doc="Special object used as default for `switch` statements.";
			return _ms.setName(built,"switch-else")
		}();
		const unreachable_33=exports["unreachable!"]=function(){
			const built={};
			const doc=built.doc="Call this to mark code as unreachable.";
			return _ms.set(function unreachable_33(){
				_ms.unlazy(oh_45no_33)("This should not be reachable.")
			},built)
		}();
		const TODO=exports.TODO=function(){
			const built={};
			const doc=built.doc="Placeholder for something which you really ought to implement one of these days.";
			return _ms.set(function TODO(){
				_ms.unlazy(oh_45no_33)("This function has not yet been implemented.")
			},built)
		}();
		const returning=exports.returning=function(){
			const built={};
			const doc=built.doc="Calls `do-after` and returns `returned`.";
			const test=built.test=function test(){
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
			},built)
		}();
		const name=exports.name="control";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9jb250cm9sLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7RUFnQkEsZ0NBQ0k7O0dBQUgsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLE9BQVUsR0FBTztvQkFDbkIsQ0FBRSxFQUFFLEdBQU87OztrQkFDWCxhQUFBLEVBQU0sU0FDUTtzQkFEWjs7S0FFRCxZQUFBLFdBQVEsSUFDQzthQUFSO0tBQUEsT0FFRzt3QkFMQztLQUFBO0lBQUE7R0FBQTs7RUFPUixvQ0FDTTs7R0FBTCxvQkFDQztHQUVELHNCQUNPLGVBQUE7OENBQUQsQ0FBRSxFQUFFLEdBQUssTUFBTyxTQUFBLE9BQ0s7S0FBekIsT0FBTTtZQUNOLE9BQU07SUFBQTtHQUFBO2tCQUNQLGVBQUssY0FDb0I7c0JBRFI7SUFDakI7SUFDQSxhQUFTLGdCQUFBLEVBQ0M7cUNBQUosUUFBUSxDQUFFO0lBQUE7SUFDaEIsY0FBWTs2Q0FDWixPQUFPOzs7RUFJUix1Q0FDTzs7R0FBTixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7SUFBTixRQUFLLFdBQUEsRUFDQztZQUFMLFFBQU8sWUFDQzs7c0JBQVAsRUFDTSxVQUFBO2NBQUo7TUFBQTtzQkFDRixFQUNNLFVBQUE7Y0FBSjtNQUFBO3NCQUNGLGNBQ2dCLFVBQUE7Y0FBZDtNQUFBOzs7OytCQUNFLFlBQ0M7O3FCQUFOLENBQUUsR0FBUTtxQkFDVixDQUFFLEdBQVE7cUJBQ1YsQ0FBRSxHQUFROzs7O2tCQUNYLGlCQUFBLElBQVEsTUFDdUI7c0JBRDNCOzhDQUFjLElBQUk7bURBQ1YsTUFBTTtvQkFBTSxNQUFNO0lBQUE7R0FBQTs7RUFDaEMscURBQ1k7O0dBQVgsb0JBQU07OztFQUVSLHVEQUNhOztHQUFaLG9CQUFNO2tCQUVKLHlCQUFBOzJCQUFPO0dBQUE7O0VBRVYsa0NBQ0s7O0dBQUosb0JBQU07a0JBRUosZUFBQTsyQkFBTztHQUFBOztFQUVWLDRDQUNVOztHQUFULG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs4Q0FBRCxDQUFFLEdBQUssTUFBTyxTQUFBLE9BQ0s7K0NBQWxCLEVBQUcsVUFBVSxFQUNHLFVBQUE7YUFBcEIsT0FBTTtLQUFBO0lBQUE7R0FBQTtrQkFDUixtQkFBQSxTQUFhLFdBQ2lCO3NCQURyQjtzQkFBYTtJQUN0QixXQUFTO1dBQ1Q7R0FBQTs7RUFuRkYsd0JBQUEiLCJmaWxlIjoiY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9