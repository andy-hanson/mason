"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./at/at-Type","./at/q","./Boolean","./Function","./Js-Method","./private/js-impl","./Type/Type","./Type/Pred-Type","./bang","./at/Seq/Seq","./at/Seq/Stream","./compare"],function(exports,_64_0,_64_45Type_1,_63_2,Boolean_3,Function_4,Js_45Method_5,js_45impl_6,Type_7,Pred_45Type_8,_33_9,Seq_10,Stream_11,compare_12){
	exports._get=_ms.lazy(function(){
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),iterator=_$2.iterator,_$3=_ms.getModule(_64_45Type_1),empty=_$3.empty,_63=_ms.getDefaultExport(_63_2),_$5=_ms.getModule(Boolean_3),and=_$5.and,_$6=_ms.getModule(Function_4),call=_$6.call,Js_45Method=_ms.getDefaultExport(Js_45Method_5),_$8=_ms.getModule(js_45impl_6),eachGenerator=_$8.eachGenerator,_$9=_ms.getModule(Type_7),contains_63=_$9["contains?"],Pred_45Type=_ms.getDefaultExport(Pred_45Type_8),_$10=_ms.getModule(Pred_45Type_8),Any=_$10.Any,_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_9)
		}),_$13=_ms.lazyGetModule(Seq_10),seq_61_63=_ms.lazyProp(_$13,"seq=?"),Stream=_ms.lazy(function(){
			return _ms.getDefaultExport(Stream_11)
		}),_$15=_ms.lazyGetModule(compare_12),_61_63=_ms.lazyProp(_$15,"=?");
		const Generator_33=Pred_45Type(function(){
			const doc="A block of code which yields values and receives responses from a context.\nAlso known as a coroutine.";
			const predicate=function predicate(_){
				return and(_ms.contains(Object,_),_ms.lazy(function(){
					return contains_63(Function,_.next)
				}))
			};
			return {
				doc:doc,
				predicate:predicate,
				name:"Generator!"
			}
		}());
		const empty_45Generator=exports["empty-Generator"]=function(){
			const doc="Does nothing.";
			return _ms.set(call(function*(){}),"doc",doc,"name","empty-Generator")
		}();
		const gen_45next_33=exports["gen-next!"]=Js_45Method(function(){
			const doc="Continues until the next `<~`.";
			const impl_45name="next";
			return {
				doc:doc,
				"impl-name":impl_45name,
				name:"gen-next!"
			}
		}());
		const if_126=exports["if~"]=function(){
			const doc="Runs through the sub-generator only if `condition`. Returns a `?` of the result.";
			return _ms.set(function* if_126(condition,result){
				return (yield* function*(){
					if(condition){
						const _=(yield* result());
						return _63(_)
					} else {
						return empty(_63)
					}
				}())
			},"doc",doc)
		}();
		const each_126=exports["each~"]=function(){
			const doc="A Generator! that goes through every element of `_`, yielding to `do-each` of it.";
			return _ms.set(function each_126(_,do_45each){
				return eachGenerator(iterator(_),do_45each)
			},"doc",doc)
		}();
		const name=exports.name="Generator!";
		exports.default=Generator_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9HZW5lcmF0b3IhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztFQWdCQSxtQkFBYSxzQkFDUztHQUFyQixVQUNDO0dBRUQsZ0JBQVksbUJBQUEsRUFDQztXQUFaLGlCQUFLLE9BQUQ7WUFBVSxZQUFVLFNBQVM7Ozs7Ozs7OztFQUVuQyw2REFDZ0I7R0FBZixVQUFNO2tCQUNOLEtBQ08sV0FBQTs7RUFFUix5Q0FBVyxzQkFDUztHQUFuQixVQUFNO0dBQ04sa0JBQVk7Ozs7Ozs7RUFFYixzQ0FDSTtHQUFILFVBQU07a0JBV0osaUJBQUcsVUFBa0IsT0FDMkI7V0FDN0M7S0FBSCxHQUFBLFVBQ1M7TUFBUixRQUFNLFFBQUE7YUFDTixJQUFFO0tBQUEsT0FFQzthQUFILE1BQU07S0FBQTtJQUFBO0dBQUE7O0VBRVYsMENBQ007R0FBTCxVQUFNO2tCQU1MLGtCQUFBLEVBQUksVUFDZ0M7V0FBcEMsY0FBYyxTQUFBLEdBQVU7R0FBQTs7RUE1RDFCLHdCQUFBO2tCQWdFQSIsImZpbGUiOiJHZW5lcmF0b3JiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=