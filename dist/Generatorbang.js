"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./at/at-Type","./at/q","./Bool","./Fun","./Js-Method","./private/js-impl","./Obj","./Type/Type","./Type/Pred-Type","./bang","./at/Seq/Seq","./at/Seq/Stream","./compare"],function(exports,_64_0,_64_45Type_1,_63_2,Bool_3,Fun_4,Js_45Method_5,js_45impl_6,Obj_7,Type_8,Pred_45Type_9,_33_10,Seq_11,Stream_12,compare_13){
	exports._get=_ms.lazy(function(){
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),iterator=_ms.get(_$2,"iterator"),_$3=_ms.getModule(_64_45Type_1),empty=_ms.get(_$3,"empty"),_63=_ms.getDefaultExport(_63_2),Bool=_ms.getDefaultExport(Bool_3),_$5=_ms.getModule(Bool_3),and=_ms.get(_$5,"and"),Fun=_ms.getDefaultExport(Fun_4),_$6=_ms.getModule(Fun_4),call=_ms.get(_$6,"call"),Js_45Method=_ms.getDefaultExport(Js_45Method_5),_$8=_ms.getModule(js_45impl_6),eachGenerator=_ms.get(_$8,"eachGenerator"),Obj=_ms.getDefaultExport(Obj_7),_$10=_ms.getModule(Type_8),contains_63=_ms.get(_$10,"contains?"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_9),_$11=_ms.getModule(Pred_45Type_9),Any=_ms.get(_$11,"Any"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_10)
		}),_$14=_ms.lazyGetModule(Seq_11),seq_61_63=_ms.lazyProp(_$14,"seq=?"),Stream=_ms.lazy(function(){
			return _ms.getDefaultExport(Stream_12)
		}),_$16=_ms.lazyGetModule(compare_13),_61_63=_ms.lazyProp(_$16,"=?");
		const exports={};
		const Generator_33=Pred_45Type(function(){
			const doc="A block of code which yields values and receives responses from a context.\nAlso known as a coroutine.";
			const predicate=function(_){
				return and(_ms.contains(Obj,_),_ms.lazy(function(){
					return contains_63(Fun,_.next)
				}))
			};
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
				const stream=_ms.unlazy(Stream)(function*(){
					const a=(yield* if_126(true,function*(){
						(yield 1);
						return 2
					}));
					_ms.unlazy(_33)(_ms.unlazy(_61_63),a,_63(2));
					const b=(yield* if_126(false,function*(){
						return (yield 3)
					}));
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),b,empty(_63))
				});
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),stream,[1])
			};
			return _ms.set(function*(condition,result){
				_ms.checkContains(Bool,condition,"condition");
				_ms.checkContains(_ms.sub(Fun,Generator_33),result,"result");
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
				const x=_ms.unlazy(Stream)(function*(){
					return (yield* each_126([1,2,3],function*(em){
						return (yield em)
					}))
				});
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),x,[1,2,3])
			};
			return _ms.set(function(_,do_45each){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(_ms.sub(Fun,Any,Generator_33),do_45each,"do-each");
				return eachGenerator(iterator(_),do_45each)
			},"doc",doc,"test",test,"displayName","each~")
		}();
		exports.default=Generator_33;
		const displayName=exports.displayName="Generator!";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9HZW5lcmF0b3IhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztpQ0FpQkE7Ozs7Ozs7RUFBQSxtQkFBYSxzQkFBUztHQUNyQixVQUNDO0dBRUQsZ0JBQVksU0FBQSxFQUFDO1dBQ1osaUJBQUssSUFBRDtZQUFPLFlBQVUsSUFBSTs7O1VBTEw7Ozs7OztFQU90Qiw2REFBZ0I7R0FDZixVQUFNO2tCQUNOLEtBQU8sV0FBQTtXQUNOO0dBQUE7O0VBRUYseUNBQVcsc0JBQVM7R0FDbkIsVUFBTTtHQUNOLGtCQUFZO1VBRk87Ozs7OztFQUlwQixzQ0FBSTtHQUNILFVBQU07R0FDTixXQUFPLFVBQUE7SUFDTixnQ0FBa0IsV0FBQTtLQUNqQixRQUFNLFFBQUEsT0FBSSxLQUFPLFdBQUE7TUFDYixPQUFBO2FBQ0g7S0FBQTt3Q0FDSSxFQUFHLElBQUU7S0FDVixRQUFNLFFBQUEsT0FBSSxNQUFRLFdBQUE7YUFDZCxPQUFBO0tBQUE7K0NBQ0MsRUFBRyxNQUFNO0lBQUE7aURBQ1AsT0FBTyxDQUFFO0dBQUE7a0JBQ2hCLFVBQUcsVUFBZSxPQUFzQjtzQkFBM0I7OEJBQVksSUFBSTs2QkFBNUIsSUFDRTtLQUNILFlBQUEsV0FBUztNQUNSLFFBQU0sUUFBQSxPQUFPO2FBQ2IsSUFBRTtLQUFBLE9BQ0M7YUFDSCxNQUFNO0tBQUE7SUFBQTs7O0VBRVYsMENBQU07R0FDTCxVQUFNO0dBQ04sV0FBTyxVQUFBO0lBQ04sMkJBQWEsV0FBQTtZQUNSLFFBQUEsU0FBTSxDQUFFLEVBQUUsRUFBRSxHQUFNLFVBQUEsR0FBRTthQUNwQixPQUFBO0tBQUE7SUFBQTtpREFDRyxFQUFFLENBQUUsRUFBRSxFQUFFO0dBQUE7a0JBQ2hCLFNBQUEsRUFBSSxVQUEyQjtzQkFBN0I7OEJBQVUsSUFBSSxJQUFJO1dBQ3BCLGNBQWMsU0FBQSxHQUFVO0dBQUE7O2tCQUkxQjtFQWpFQSxzQ0FBQSIsImZpbGUiOiJHZW5lcmF0b3JiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=