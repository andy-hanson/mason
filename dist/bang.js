"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Boolean","./compare","./at/at","./at/Map/Map","./control","./Function","./show","./String","./Try","./Type/Pred-Type","./Type/Type","./compare","./math/methods","./show","./Try"],function(exports,Boolean_0,compare_1,_64_2,Map_3,control_4,Function_5,show_6,String_7,Try_8,Pred_45Type_9,Type_10,compare_11,methods_12,show_13,Try_14){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_2)
		}),_$5=_ms.lazyGetModule(_64_2),each_33=_ms.lazyProp(_$5,"each!"),map=_ms.lazyProp(_$5,"map"),Map=_ms.lazy(function(){
			return _ms.getDefaultExport(Map_3)
		}),_$7=_ms.lazyGetModule(control_4),if_33=_ms.lazyProp(_$7,"if!"),_$8=_ms.lazyGetModule(Function_5),Pred=_ms.lazyProp(_$8,"Pred"),_$9=_ms.lazyGetModule(show_6),repr=_ms.lazyProp(_$9,"repr"),_$10=_ms.lazyGetModule(String_7),indent=_ms.lazyProp(_$10,"indent"),_$11=_ms.lazyGetModule(Try_8),oh_45no_33=_ms.lazyProp(_$11,"oh-no!"),_$12=_ms.lazyGetModule(Pred_45Type_9),Any=_ms.lazyProp(_$12,"Any"),_$13=_ms.lazyGetModule(Type_10),_61_62=_ms.lazyProp(_$13,"=>"),_$15=_ms.lazyGetModule(compare_11),same_63=_ms.lazyProp(_$15,"same?"),_$16=_ms.lazyGetModule(methods_12),_43=_ms.lazyProp(_$16,"+"),show=_ms.lazy(function(){
			return _ms.getDefaultExport(show_13)
		}),_$18=_ms.lazyGetModule(Try_14),fails_45with_63=_ms.lazyProp(_$18,"fails-with?");
		const doc=exports.doc="For making assertions.";
		const _33=function(){
			const doc="Pronounced 'assert'.\nIt may be called as:\n\t! fun arg arg arg ...\n\t\tCalls fun on the arguments.\n\t\tfun must return a Boolean.\n\t\tIf it returns false, an error will be thrown.\n\t\tThe error will contain information about fun and its arguments.\n\t! bool ~message\n\t\tSame as:\n\t\t\tif! (not bool) |\n\t\t\t\toh-no! message";
			const test=function(){
				return _ms.set(function(){
					_33(_61_63,1,1);
					_33(true,"a");
					const one_45not_45two="Expected =?\n\t1\n\t2";
					_33(_ms.unlazy(fails_45with_63),one_45not_45two,function(){
						return _33(_61_63,1,2)
					});
					return _33(_ms.unlazy(fails_45with_63),"a",function(){
						return _33(_61_63(1,2),"a")
					})
				},"displayName","test")
			}();
			return _ms.set(function(a){
				const args=[].slice.call(arguments,1);
				{
					const _=a;
					if(_ms.bool(_ms.contains(Function,_))){
						if(_ms.bool(Function.apply.call(_,null,[].concat(_ms.arr(args))))){} else {
							_ms.unlazy(oh_45no_33)(((("Expected "+_ms.show(a))+"\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(_61_62)(String,_ms.unlazy(map)(args,_ms.unlazy(repr)),"\n")))))
						}
					} else if(_ms.bool(_ms.contains(Boolean,_))){
						if(_ms.bool(not(_61_63(1,args.length)))){
							_ms.unlazy(oh_45no_33)("Use `! fun args...` or `! bool explanation`, never just `! bool`.")
						} else if(_ms.bool(_)){} else {
							_ms.unlazy(oh_45no_33)(_ms.sub(args,0))
						}
					} else {
						_ms.unlazy(oh_45no_33)((("First argument to `!` must be Function or Boolean. Got "+_ms.show(_))+"."))
					}
				}
			},"doc",doc,"test",test,"displayName","!")
		}();
		const _33not=exports["!not"]=function(){
			const doc="Like `!`, but inverts the condition.";
			const test=function(){
				return _ms.set(function(){
					_33not(false,"a");
					return _33not(_61_63,1,2)
				},"displayName","test")
			}();
			return _ms.set(function(a){
				const args=[].slice.call(arguments,1);
				{
					const _=a;
					if(_ms.bool(_ms.contains(Function,_))){
						if(_ms.bool(Function.apply.call(_,null,[].concat(_ms.arr(args))))){
							_ms.unlazy(oh_45no_33)(((("Unexpected "+_ms.show(a))+"\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(map)(args,_ms.unlazy(repr)).join("\n")))))
						} else {}
					} else if(_ms.bool(_ms.contains(Boolean,_))){
						_33(_61_63,1,args.length);
						if(_ms.bool(_)){
							_ms.unlazy(oh_45no_33)(_ms.sub(args,0))
						} else {}
					} else {
						_ms.unlazy(oh_45no_33)((("First argument to `!not` must be Function or Boolean. Got "+_ms.show(_))+"."))
					}
				}
			},"doc",doc,"test",test,"displayName","!not")
		}();
		const _33call=exports["!call"]=function(){
			const doc="For each entry in args->result, asserts that calling `fun` with arguments of key will `=?` the value.";
			const test=function(){
				return _ms.set(function(){
					_33call(_ms.unlazy(_43),function(){
						const _k0=[1,1],_v0=2;
						return _ms.map(_k0,_v0)
					}());
					const nope="+ of:\n\t1\n\t1\nShould =?:\n\t3\nGot:\n\t2";
					return _33(_ms.unlazy(fails_45with_63),nope,function(){
						return _33call(_ms.unlazy(_43),function(){
							const _k0=[1,1],_v0=3;
							return _ms.map(_k0,_v0)
						}())
					})
				},"displayName","test")
			}();
			return _ms.set(function(fun,args_45_62result){
				_ms.checkContains(Function,fun,"fun");
				_ms.checkContains(_ms.sub(_ms.unlazy(Map),Array,_ms.unlazy(Any)),args_45_62result,"args->result");
				return _33call_45with(_61_63,fun,args_45_62result)
			},"doc",doc,"test",test,"displayName","!call")
		}();
		const _33call_45with=exports["!call-with"]=function(){
			const doc="Like !call but allows any equality predicate.";
			const test=function(){
				return _ms.set(function(){
					return _33call_45with(_ms.sub(_ms.unlazy(same_63),_ms.unlazy(show)),_ms.unlazy(_43),function(){
						const _k0=[1,2],_v0="3";
						return _ms.map(_k0,_v0)
					}())
				},"displayName","test")
			}();
			return _ms.set(function(equal_63,fun,args_45_62result){
				_ms.checkContains(_ms.unlazy(Pred),equal_63,"equal?");
				_ms.checkContains(Function,fun,"fun");
				_ms.checkContains(_ms.sub(_ms.unlazy(Map),Array,_ms.unlazy(Any)),args_45_62result,"args->result");
				return _ms.unlazy(each_33)(args_45_62result,function(pair){
					const args=_ms.checkContains(_ms.unlazy(_64),pair.key,"args");
					const expected_45res=pair.val;
					const actual=Function.apply.call(fun,null,[].concat(_ms.arr(args)));
					return _ms.unlazy(if_33)(not(equal_63(actual,expected_45res)),function(){
						return _ms.unlazy(oh_45no_33)(_ms.lazy(function(){
							return (((((((((""+_ms.show(fun))+" of:\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(_61_62)(String,_ms.unlazy(map)(args,_ms.unlazy(repr)),"\n"))))+"\nShould ")+_ms.show(equal_63))+":\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(repr)(expected_45res))))+"\nGot:\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(repr)(actual))))
						}))
					})
				})
			},"doc",doc,"test",test,"displayName","!call-with")
		}();
		const displayName=exports.displayName="!";
		exports.default=_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy8hLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0VBbUJBLHNCQUFNO0VBRU4sb0JBQ0c7R0FBRixVQUNDO0dBV0QscUJBQ087bUJBQUEsVUFBQTtLQUFOLElBQUUsT0FBRyxFQUFFO0tBQ1AsSUFBRSxLQUFNO0tBQ1Isc0JBQ0M7S0FHRCxnQ0FBYyxnQkFDYSxVQUFBO2FBQTFCLElBQUUsT0FBRyxFQUFFO0tBQUE7WUFDUixnQ0FBZSxJQUNJLFVBQUE7YUFBbEIsSUFBRyxPQUFHLEVBQUUsR0FBSTtLQUFBO0lBQUE7O2tCQUNiLFNBQUEsRUFDUzs7SUFBSDtLQUFBLFFBQUE7S0FDTCx5QkFBQyxTQUFELElBQ1M7TUFDSCxnQ0FBSix5QkFBRSxTQUNPLFFBRUw7OEJBQ0Ysd0JBQVUsMkRBQ0csdUJBQVksdUJBQVk7TUFBQTtLQUFBLE9BQ3pDLHlCQUFDLFFBQUQsSUFDUTtNQUNGLFlBQUosSUFBSyxPQUFHLEVBQUUsZUFDWTs4QkFBYjtNQUFBLE9BQ1QsWUFBQSxHQUNDLFFBRUc7c0NBQUksS0FBSztNQUFBO0tBQUEsT0FFWDs2QkFBSyxxRUFBd0Q7Ozs7O0VBRXBFLHVDQUNLO0dBQUosVUFBTTtHQUNOLHFCQUNPO21CQUFBLFVBQUE7S0FBTixPQUFLLE1BQU87WUFDWixPQUFLLE9BQUcsRUFBRTtJQUFBOztrQkFDVixTQUFBLEVBQ1M7O0lBQUg7S0FBQSxRQUFBO0tBQ0wseUJBQUMsU0FBRCxJQUNTO01BQ0gsZ0NBQUoseUJBQUUsU0FDTzs4QkFDUCwwQkFBWSx3REFDRyw0QkFBaUI7TUFBQSxPQUU5QjtLQUFBLE9BQ04seUJBQUMsUUFBRCxJQUNRO01BQVAsSUFBRSxPQUFHLEVBQUU7TUFFRixZQUFKLEdBQ0M7c0NBQU8sS0FBSztNQUFBLE9BRVQ7S0FBQSxPQUVGOzZCQUFLLHdFQUEyRDs7Ozs7RUFFdkUseUNBQ007R0FBTCxVQUNDO0dBQ0QscUJBQ087bUJBQUEsVUFBQTtLQUFOLGtDQUNPO01BQU4sVUFBQSxDQUFFLEVBQUUsT0FBTzs7O0tBQ1osV0FDQztZQU9ELGdDQUFjLEtBQ00sVUFBQTthQUFuQixrQ0FDTztPQUFOLFVBQUEsQ0FBRSxFQUFFLE9BQU87Ozs7OztrQkFDYixTQUFBLElBQWEsaUJBQzJCO3NCQURwQzs4Q0FBMEI7V0FDOUIsZUFBVyxPQUFHLElBQUk7R0FBQTs7RUFFcEIscURBQ1c7R0FBVixVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTtZQUFOLHVGQUN3QjtNQUF2QixVQUFBLENBQUUsRUFBRSxPQUFROzs7OztrQkFDYixTQUFBLFNBQVksSUFBYSxpQkFDMkI7O3NCQURwQzs4Q0FBMEI7K0JBQ3BDLGlCQUFjLFNBQUEsS0FDSTtLQUF2Qiw2Q0FBUztLQUNULHFCQUFlO0tBQ2YsaUNBQVMsMkJBQUk7OEJBQ1IsSUFBSyxTQUFPLE9BQU8saUJBQ2dCLFVBQUE7O2NBQ3RDLHFCQUFDLGlFQUNZLHVCQUFZLHVCQUFZLCtCQUM3QixpRUFDTyw4RUFFQTtNQUFBO0tBQUE7SUFBQTtHQUFBOztFQWhJcEIsc0NBQUE7a0JBa0lBIiwiZmlsZSI6ImJhbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==