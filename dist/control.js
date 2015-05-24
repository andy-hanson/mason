"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./methods","./Type/Pred-Type","./at/at-Type","./at/q","./at/Map/Map","./at/Seq/Arraybang","./at/Seq/Seq","./at/Seq/Seqbang","./Try","./bang","./compare"],function(exports,js_0,methods_1,Pred_45Type_2,_64_45Type_3,_63_4,Map_5,Array_33_6,Seq_7,Seq_33_8,Try_9,_33_10,compare_11){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),defined_63=_ms.get(_$2,"defined?"),_$3=_ms.getModule(methods_1),freeze=_ms.get(_$3,"freeze"),_$4=_ms.getModule(Pred_45Type_2),Any=_ms.get(_$4,"Any"),Opt=_ms.get(_$4,"Opt"),_$6=_ms.lazyGetModule(_64_45Type_3),empty=_ms.lazyProp(_$6,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_4)
		}),_$7=_ms.lazyGetModule(_63_4),_63_45or=_ms.lazyProp(_$7,"?-or"),Map=_ms.lazy(function(){
			return _ms.getDefaultExport(Map_5)
		}),_$8=_ms.lazyGetModule(Map_5),_63get=_ms.lazyProp(_$8,"?get"),Array_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Array_33_6)
		}),Seq=_ms.lazy(function(){
			return _ms.getDefaultExport(Seq_7)
		}),_$11=_ms.lazyGetModule(Seq_33_8),_43_43_62_33=_ms.lazyProp(_$11,"++>!"),_$12=_ms.lazyGetModule(Try_9),oh_45no_33=_ms.lazyProp(_$12,"oh-no!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_10)
		}),_$14=_ms.lazyGetModule(_33_10),_33call=_ms.lazyProp(_$14,"!call"),_$15=_ms.lazyGetModule(compare_11),_61_63=_ms.lazyProp(_$15,"=?");
		const opr=exports.opr=function(){
			const doc="Fills in an Opt with a default value.";
			const test=function test(){
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
				const built=new global.Map();
				_ms.assoc(built,[true,1],_ms.unlazy(_63)(1));
				_ms.assoc(built,[false,1],_ms.unlazy(empty)(_ms.unlazy(_63)));
				return built
			};
			return _ms.set(function _if(condition,result){
				_ms.checkContains(Boolean,condition,"condition");
				return function(){
					if(_ms.bool(condition)){
						return _ms.unlazy(_63)(_ms.unlazy(result))
					} else {
						return _ms.unlazy(empty)(_ms.unlazy(_63))
					}
				}()
			},"doc",doc,"test",test)
		}();
		const unless=exports.unless=function(){
			const doc="`if` with negated condition.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[true,1],_ms.unlazy(empty)(_ms.unlazy(_63)));
				_ms.assoc(built,[false,1],_ms.unlazy(_63)(1));
				return built
			};
			return _ms.set(function unless(condition,result){
				_ms.checkContains(Boolean,condition,"condition");
				return function(){
					if(_ms.bool(condition)){
						return _ms.unlazy(empty)(_ms.unlazy(_63))
					} else {
						return _ms.unlazy(_63)(_ms.unlazy(result))
					}
				}()
			},"doc",doc,"test",test)
		}();
		const unreachable_33=exports["unreachable!"]=function(){
			const doc="Call this to mark code as unreachable.";
			return _ms.set(function unreachable_33(){
				_ms.unlazy(oh_45no_33)("This should not be reachable.")
			},"doc",doc)
		}();
		const TODO=exports.TODO=function(){
			const doc="Placeholder for something which you really ought to implement one of these days.";
			return _ms.set(function TODO(){
				_ms.unlazy(oh_45no_33)("This function has not yet been implemented.")
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
		const name=exports.name="control";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9jb250cm9sLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztFQWdCQSxnQ0FDSTtHQUFILFVBQU07R0FDTixXQUNPLGVBQUE7O29CQUFOLENBQUUsT0FBVSxHQUFPO29CQUNuQixDQUFFLEVBQUUsR0FBTzs7O2tCQUNYLGFBQUEsRUFBTSxTQUNRO3NCQURaOztLQUVELFlBQUEsV0FBUSxJQUNDO2FBQVI7S0FBQSxPQUVHO3dCQUxDO0tBQUE7SUFBQTtHQUFBOztFQU9SLG9DQUNNO0dBQUwsVUFDQztHQUVELFdBQ08sZUFBQTs4Q0FBRCxDQUFFLEVBQUUsR0FBSyxNQUFPLFNBQUEsT0FDSztLQUF6QixPQUFNO1lBQ04sT0FBTTtJQUFBO0dBQUE7a0JBQ1AsZUFBSyxjQUNvQjtzQkFEUjtJQUNqQjtJQUNBLGFBQVMsZ0JBQUEsRUFDQztxQ0FBSixRQUFRLENBQUU7SUFBQTtJQUNoQixjQUFZOzZDQUNaLE9BQU87OztFQUlSLHVDQUNPO0dBQU4sVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFFBQUssV0FBQSxFQUNDO1lBQUwsUUFBTyxZQUNDOztzQkFBUCxFQUNNLFVBQUE7Y0FBSjtNQUFBO3NCQUNGLEVBQ00sVUFBQTtjQUFKO01BQUE7c0JBQ0YsY0FDZ0IsVUFBQTtjQUFkO01BQUE7Ozs7K0JBQ0UsWUFDQzs7cUJBQU4sQ0FBRSxHQUFRO3FCQUNWLENBQUUsR0FBUTtxQkFDVixDQUFFLEdBQVE7Ozs7a0JBQ1gsaUJBQUEsSUFBUSxNQUN1QjtzQkFEM0I7OENBQWMsSUFBSTttREFDVixNQUFNO29CQUFNLE1BQU07SUFBQTtHQUFBOztFQUNoQyxxREFDWTtHQUFYLFVBQU07Ozs7OztFQUVQLCtCQUNHO0dBQUYsVUFBTTtHQUNOLFdBQ08sZUFBQTs7b0JBQU4sQ0FBRSxLQUFLLG1CQUFTO29CQUNoQixDQUFFLE1BQU07OztrQkFDUixhQUFBLFVBQWtCLE9BQ087c0JBRGY7O0tBRVQsWUFBQSxXQUNTO3dDQUhRO0tBQUEsT0FLYjs7Ozs7O0VBRVAsc0NBQ087R0FBTixVQUFNO0dBQ04sV0FDTyxlQUFBOztvQkFBTixDQUFFLEtBQUs7b0JBQ1AsQ0FBRSxNQUFNLG1CQUFTOzs7a0JBQ2pCLGdCQUFBLFVBQWtCLE9BQ087c0JBRGY7O0tBRVQsWUFBQSxXQUNTOztZQUVMO3dDQUxhO0tBQUE7SUFBQTtHQUFBOztFQU9yQix1REFDYTtHQUFaLFVBQU07a0JBRUoseUJBQUE7MkJBQU87R0FBQTs7RUFFVixrQ0FDSztHQUFKLFVBQU07a0JBRUosZUFBQTsyQkFBTztHQUFBOztFQUVWLDRDQUNVO0dBQVQsVUFBTTtHQUNOLFdBQ08sZUFBQTs4Q0FBRCxDQUFFLEdBQUssTUFBTyxTQUFBLE9BQ0s7K0NBQWxCLEVBQUcsVUFBVSxFQUNHLFVBQUE7YUFBcEIsT0FBTTtLQUFBO0lBQUE7R0FBQTtrQkFDUixtQkFBQSxTQUFhLFdBQ2lCO3NCQURyQjtzQkFBYTtJQUN0QixXQUFTO1dBQ1Q7R0FBQTs7RUEzR0Ysd0JBQUEiLCJmaWxlIjoiY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9