"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./methods","./Type/Pred-Type","./Type/Wrap-Type","./at/at-Type","./at/q","./at/Map/Map","./at/Seq/Arraybang","./at/Seq/Seq","./at/Seq/Seqbang","./Try","./bang","./compare","./math/methods"],function(exports,js_0,methods_1,Pred_45Type_2,Wrap_45Type_3,_64_45Type_4,_63_5,Map_6,Array_33_7,Seq_8,Seq_33_9,Try_10,_33_11,compare_12,methods_13){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),defined_63=_$2["defined?"],_$3=_ms.getModule(methods_1),freeze=_$3.freeze,_$4=_ms.getModule(Pred_45Type_2),Any=_$4.Any,Opt=_$4.Opt,Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_3),_$7=_ms.lazyGetModule(_64_45Type_4),empty=_ms.lazyProp(_$7,"empty"),_63=_ms.lazy(function(){
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
			return _ms.set(function opr(_,_default){
				return function(){
					if(defined_63(_)){
						return _
					} else {
						return _ms.unlazy(_default)
					}
				}()
			},"doc",doc)
		}();
		const build=exports.build=function(){
			const doc="Passes in a `yield` Function to `calls-yield`.\nReturns a Seq of what `calls-yield` called `yield` with.";
			return _ms.set(function build(calls_45yield){
				const yielded=_ms.unlazy(empty)(_ms.unlazy(Array_33));
				const _yield=function _yield(_){
					return _ms.unlazy(_43_43_62_33)(yielded,[_])
				};
				calls_45yield(_yield);
				return freeze(yielded)
			},"doc",doc)
		}();
		const _switch=exports.switch=function(){
			const doc="Calls the Function that `cases` associates with `val`.";
			return _ms.set(function _switch(val,cases){
				return _ms.unlazy(_63_45or)(_ms.unlazy(_63get)(cases,val),_ms.lazy(function(){
					return _ms.sub(cases,switch_45else)
				}))()
			},"doc",doc)
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
			return _ms.set(function _if(condition,result){
				return function(){
					if(condition){
						return _ms.unlazy(_63)(_ms.unlazy(result))
					} else {
						return _ms.unlazy(empty)(_ms.unlazy(_63))
					}
				}()
			},"doc",doc)
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
			return _ms.set(function returning(returned,do_45after){
				do_45after(returned);
				return returned
			},"doc",doc)
		}();
		const loop=exports.loop=function(){
			const doc="Maintains a value representing state, and continually applies `transform-state` to it until that returns an End-Loop.\nReturns the value inside that End-Loop.";
			return _ms.set(function loop(init_45state,transform_45state){
				let state=init_45state;
				let output=null;
				while(true){
					{
						const _=transform_45state(state);
						if(_ms.contains(End_45Loop,_)){
							output=_.val;
							break
						} else {
							state=_
						}
					}
				};
				return output
			},"doc",doc)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9jb250cm9sLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztFQWtCQSxnQ0FDSTtHQUFILFVBQU07a0JBSUwsYUFBQSxFQUFNLFNBQ1E7O0tBQ2IsR0FBQSxXQUFBLEdBQ1M7YUFBUjtLQUFBLE9BRUc7d0JBTEM7S0FBQTtJQUFBO0dBQUE7O0VBT1Isb0NBQ007R0FBTCxVQUNDO2tCQU1BLGVBQUssY0FDb0I7SUFBekI7SUFDQSxhQUFTLGdCQUFBLEVBQ0M7cUNBQUosUUFBUSxDQUFFO0lBQUE7SUFDaEIsY0FBWTtXQUNaLE9BQU87R0FBQTs7RUFHUix1Q0FDTztHQUFOLFVBQU07a0JBY0wsaUJBQUEsSUFBUSxNQUN1QjttREFBbkIsTUFBTTtvQkFBTSxNQUFNO0lBQUE7R0FBQTs7RUFDaEMscURBQ1k7R0FBWCxVQUFNOzs7Ozs7RUFFUCwrQkFDRztHQUFGLFVBQU07a0JBSUwsYUFBRyxVQUFrQixPQUNPOztLQUMzQixHQUFBLFVBQ1M7d0NBSFc7S0FBQSxPQUtoQjs7Ozs7O0VBRVIsdURBQ2E7R0FBWixVQUFNO2tCQUVMLHlCQUFBO2tDQUFRO0dBQUE7O0VBRVYsa0NBQ0s7R0FBSixVQUFNO2tCQUVMLGVBQUE7a0NBQVE7R0FBQTs7RUFFViw0Q0FDVTtHQUFULFVBQU07a0JBS0wsbUJBQUEsU0FBYSxXQUNpQjtJQUE5QixXQUFTO1dBQ1Q7R0FBQTs7RUFJRCxrQ0FDSztHQUFKLFVBQ0M7a0JBVUEsY0FBQSxhQUFXLGtCQUN3QjtJQUFuQyxVQUFVO0lBQ1YsV0FBVztJQUVQLFdBQUE7S0FBRztNQUFBLFFBQUEsa0JBQWdCO01BQ3JCLGdCQUFDLFdBQUQsR0FDUztjQUFFO09BQ1Y7TUFBQSxPQUVHO2FBQU07TUFBQTtLQUFBO0lBQUE7V0FDWjtHQUFBOztFQUVGLHFDQUFVLHNCQUNTO0dBQWxCLFVBQU07Ozs7OztFQTdIUix3QkFBQSIsImZpbGUiOiJjb250cm9sLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=