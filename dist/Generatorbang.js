"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./at/at-Type","./at/q","./Boolean","./Function","./Js-Method","./private/js-impl","./Type/Type","./Type/Pred-Type","./bang","./at/Seq/Seq","./at/Seq/Stream","./compare"],function(exports,_64_0,_64_45Type_1,_63_2,Boolean_3,Function_4,Js_45Method_5,js_45impl_6,Type_7,Pred_45Type_8,_33_9,Seq_10,Stream_11,compare_12){
	exports._get=_ms.lazy(function(){
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),iterator=_ms.get(_$2,"iterator"),_$3=_ms.getModule(_64_45Type_1),empty=_ms.get(_$3,"empty"),_63=_ms.getDefaultExport(_63_2),_$5=_ms.getModule(Boolean_3),and=_ms.get(_$5,"and"),_$6=_ms.getModule(Function_4),call=_ms.get(_$6,"call"),Js_45Method=_ms.getDefaultExport(Js_45Method_5),_$8=_ms.getModule(js_45impl_6),eachGenerator=_ms.get(_$8,"eachGenerator"),_$9=_ms.getModule(Type_7),contains_63=_ms.get(_$9,"contains?"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_8),_$10=_ms.getModule(Pred_45Type_8),Any=_ms.get(_$10,"Any"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_9)
		}),_$13=_ms.lazyGetModule(Seq_10),seq_61_63=_ms.lazyProp(_$13,"seq=?"),Stream=_ms.lazy(function(){
			return _ms.getDefaultExport(Stream_11)
		}),_$15=_ms.lazyGetModule(compare_12),_61_63=_ms.lazyProp(_$15,"=?");
		const Generator_33=Pred_45Type(function(){
			const doc="A block of code which yields values and receives responses from a context.\nAlso known as a coroutine.";
			const predicate=function(){
				return _ms.set(function(_){
					return and(_ms.contains(Object,_),_ms.lazy(function(){
						return contains_63(Function,_.next)
					}))
				},"displayName","predicate")
			}();
			return {
				doc:doc,
				predicate:predicate,
				displayName:"Generator!"
			}
		}());
		const empty_45Generator=exports["empty-Generator"]=function(){
			const doc="Does nothing.";
			return _ms.set(call(function*(){
				return null
			}),"doc",doc,"displayName","empty-Generator")
		}();
		const gen_45next_33=exports["gen-next!"]=Js_45Method(function(){
			const doc="Continues until the next `<~`.";
			const impl_45name="next";
			return {
				doc:doc,
				"impl-name":impl_45name,
				displayName:"gen-next!"
			}
		}());
		const if_126=exports["if~"]=function(){
			const doc="Runs through the sub-generator only if `condition`. Returns a `?` of the result.";
			const test=function(){
				return _ms.set(function(){
					const stream=_ms.unlazy(Stream)(function(){
						return _ms.set(function*(){
							const a=(yield* if_126(true,(yield* function*(){
								return _ms.set(function*(){
									(yield 1);
									return 2
								},"displayName","a")
							}())));
							_ms.unlazy(_33)(_ms.unlazy(_61_63),a,_63(2));
							const b=(yield* if_126(false,(yield* function*(){
								return _ms.set(function*(){
									return (yield 3)
								},"displayName","b")
							}())));
							return _ms.unlazy(_33)(_ms.unlazy(_61_63),b,empty(_63))
						},"displayName","stream")
					}());
					return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),stream,[1])
				},"displayName","test")
			}();
			return _ms.set(function*(condition,result){
				_ms.checkContains(Boolean,condition,"condition");
				_ms.checkContains(_ms.sub(Function,Generator_33),result,"result");
				return _ms.checkContains(_63,(yield* function*(){
					if(_ms.bool(condition)){
						const _=(yield* result(null));
						return _63(_)
					} else {
						return empty(_63)
					}
				}()),"res")
			},"doc",doc,"test",test,"displayName","if~")
		}();
		const each_126=exports["each~"]=function(){
			const doc="A Generator! that goes through every element of `_`, yielding to `do-each` of it.";
			const test=function(){
				return _ms.set(function(){
					const x=_ms.unlazy(Stream)(function(){
						return _ms.set(function*(){
							return (yield* each_126([1,2,3],function*(em){
								return (yield em)
							}))
						},"displayName","x")
					}());
					return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),x,[1,2,3])
				},"displayName","test")
			}();
			return _ms.set(function(_,do_45each){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(_ms.sub(Function,Any,Generator_33),do_45each,"do-each");
				return eachGenerator(iterator(_),do_45each)
			},"doc",doc,"test",test,"displayName","each~")
		}();
		const displayName=exports.displayName="Generator!";
		exports.default=Generator_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9HZW5lcmF0b3IhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztFQWdCQSxtQkFBYSxzQkFDUztHQUFyQixVQUNDO0dBRUQsMEJBQVk7bUJBQUEsU0FBQSxFQUNDO1lBQVosaUJBQUssT0FBRDthQUFVLFlBQVUsU0FBUzs7Ozs7Ozs7OztFQUVuQyw2REFDZ0I7R0FBZixVQUFNO2tCQUNOLEtBQ08sV0FBQTtXQUFOO0dBQUE7O0VBRUYseUNBQVcsc0JBQ1M7R0FBbkIsVUFBTTtHQUNOLGtCQUFZOzs7Ozs7O0VBRWIsc0NBQ0k7R0FBSCxVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTtLQUFOLDBDQUNrQjtxQkFBQSxXQUFBO09BQWpCLFFBQU0sUUFBQSxPQUFJLEtBQ08sbUJBQUE7dUJBQUEsV0FBQTtnQkFBYjtnQkFDSDtRQUFBOzswQ0FDSSxFQUFHLElBQUU7T0FDVixRQUFNLFFBQUEsT0FBSSxNQUNRLG1CQUFBO3VCQUFBLFdBQUE7Z0JBQWQsT0FBQTtRQUFBOztpREFDQyxFQUFHLE1BQU07TUFBQTs7a0RBQ1AsT0FBTyxDQUFFO0lBQUE7O2tCQUNoQixVQUFHLFVBQWtCLE9BQzJCO3NCQURuQzs4QkFBZSxTQUFTOzZCQUFwQyxJQUVFO0tBQUgsWUFBQSxXQUNTO01BQVIsUUFBTSxRQUFBLE9BQU87YUFDYixJQUFFO0tBQUEsT0FFQzthQUFILE1BQU07S0FBQTtJQUFBOzs7RUFFViwwQ0FDTTtHQUFMLFVBQU07R0FDTixxQkFDTzttQkFBQSxVQUFBO0tBQU4scUNBQ2E7cUJBQUEsV0FBQTtjQUFSLFFBQUEsU0FBTSxDQUFFLEVBQUUsRUFBRSxHQUFNLFVBQUEsR0FDRTtlQUFwQixPQUFBO09BQUE7TUFBQTs7a0RBQ0csRUFBRSxDQUFFLEVBQUUsRUFBRTtJQUFBOztrQkFDaEIsU0FBQSxFQUFJLFVBQ2dDO3NCQURsQzs4QkFBVSxTQUFTLElBQUk7V0FDekIsY0FBYyxTQUFBLEdBQVU7R0FBQTs7RUE1RDFCLHNDQUFBO2tCQWdFQSIsImZpbGUiOiJHZW5lcmF0b3JiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=