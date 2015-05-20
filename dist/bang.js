"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./compare","./at/at","./at/Map/Map","./Function","./show","./String","./Try","./Type/Pred-Type","./Type/Type","./compare","./math/methods","./show","./Try"],function(exports,compare_0,_64_1,Map_2,Function_3,show_4,String_5,Try_6,Pred_45Type_7,Type_8,compare_9,methods_10,show_11,Try_12){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_1)
		}),_$4=_ms.lazyGetModule(_64_1),map=_ms.lazyProp(_$4,"map"),Map=_ms.lazy(function(){
			return _ms.getDefaultExport(Map_2)
		}),_$6=_ms.lazyGetModule(Function_3),Pred=_ms.lazyProp(_$6,"Pred"),_$7=_ms.lazyGetModule(show_4),repr=_ms.lazyProp(_$7,"repr"),_$8=_ms.lazyGetModule(String_5),indent=_ms.lazyProp(_$8,"indent"),_$9=_ms.lazyGetModule(Try_6),oh_45no_33=_ms.lazyProp(_$9,"oh-no!"),_$10=_ms.lazyGetModule(Pred_45Type_7),Any=_ms.lazyProp(_$10,"Any"),_$11=_ms.lazyGetModule(Type_8),_61_62=_ms.lazyProp(_$11,"=>"),_$13=_ms.lazyGetModule(compare_9),same_63=_ms.lazyProp(_$13,"same?"),_$14=_ms.lazyGetModule(methods_10),_43=_ms.lazyProp(_$14,"+"),show=_ms.lazy(function(){
			return _ms.getDefaultExport(show_11)
		}),_$16=_ms.lazyGetModule(Try_12),fails_45with_63=_ms.lazyProp(_$16,"fails-with?");
		const doc=exports.doc="For making assertions.";
		const _33=function(){
			const doc="Pronounced 'assert'.\nIt may be called as:\n\t! fun arg arg arg ...\n\t\tCalls fun on the arguments.\n\t\tfun must return a Boolean.\n\t\tIf it returns false, an error will be thrown.\n\t\tThe error will contain information about fun and its arguments.\n\t! bool ~message\n\t\tSame as:\n\t\t\tunless! bool\n\t\t\t\toh-no! message";
			const test=function test(){
				_33(_61_63,1,1);
				_33(true,"a");
				const one_45not_45two="Expected =?\n\t1\n\t2";
				_33(_ms.unlazy(fails_45with_63),one_45not_45two,function(){
					return _33(_61_63,1,2)
				});
				return _33(_ms.unlazy(fails_45with_63),"a",function(){
					return _33(_61_63(1,2),"a")
				})
			};
			return _ms.set(function _33(a){
				const args=[].slice.call(arguments,1);
				{
					const _=a;
					if(_ms.bool(_ms.contains(Function,_))){
						if(! _ms.bool(Function.apply.call(_,null,[].concat(_ms.arr(args))))){
							_ms.unlazy(oh_45no_33)(((("Expected "+_ms.show(a))+"\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(_61_62)(String,_ms.unlazy(map)(args,_ms.unlazy(repr)),"\n")))))
						}
					} else if(_ms.bool(_ms.contains(Boolean,_))){
						if(! _ms.bool(_61_63(1,args.length))){
							_ms.unlazy(oh_45no_33)("Use `! fun args...` or `! bool explanation`, never just `! bool`.")
						};
						if(! _ms.bool(_)){
							_ms.unlazy(oh_45no_33)(_ms.sub(args,0))
						}
					} else {
						_ms.unlazy(oh_45no_33)((("First argument to `!` must be Function or Boolean. Got "+_ms.show(_))+"."))
					}
				}
			},"doc",doc,"test",test)
		}();
		const _33not=exports["!not"]=function(){
			const doc="Like `!`, but inverts the condition.";
			const test=function test(){
				_33not(false,"a");
				return _33not(_61_63,1,2)
			};
			return _ms.set(function _33not(a){
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
			},"doc",doc,"test",test)
		}();
		const _33call=exports["!call"]=function(){
			const doc="For each entry in args->result, asserts that calling `fun` with arguments of key will `=?` the value.";
			const test=function test(){
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
			};
			return _ms.set(function _33call(fun,args_45_62result){
				_ms.checkContains(Function,fun,"fun");
				_ms.checkContains(_ms.sub(_ms.unlazy(Map),Array,_ms.unlazy(Any)),args_45_62result,"args->result");
				return _33call_45with(_61_63,fun,args_45_62result)
			},"doc",doc,"test",test)
		}();
		const _33call_45with=exports["!call-with"]=function(){
			const doc="Like !call but allows any equality predicate.";
			const test=function test(){
				return _33call_45with(_ms.sub(_ms.unlazy(same_63),_ms.unlazy(show)),_ms.unlazy(_43),function(){
					const _k0=[1,2],_v0="3";
					return _ms.map(_k0,_v0)
				}())
			};
			return _ms.set(function _33call_45with(equal_63,fun,args_45_62result){
				_ms.checkContains(_ms.unlazy(Pred),equal_63,"equal?");
				_ms.checkContains(Function,fun,"fun");
				_ms.checkContains(_ms.sub(_ms.unlazy(Map),Array,_ms.unlazy(Any)),args_45_62result,"args->result");
				for(let _ of args_45_62result[Symbol.iterator]()){
					const args=_ms.checkContains(_ms.unlazy(_64),_ms.sub(_,0),"args");
					const expected_45res=_ms.sub(_,1);
					const actual=Function.apply.call(fun,null,[].concat(_ms.arr(args)));
					if(! _ms.bool(equal_63(actual,expected_45res))){
						_ms.unlazy(oh_45no_33)(_ms.lazy(function(){
							return (((((((((""+_ms.show(fun))+" of:\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(_61_62)(String,_ms.unlazy(map)(args,_ms.unlazy(repr)),"\n"))))+"\nShould ")+_ms.show(equal_63))+":\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(repr)(expected_45res))))+"\nGot:\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(repr)(actual))))
						}))
					}
				}
			},"doc",doc,"test",test)
		}();
		const name=exports.name="!";
		exports.default=_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy8hLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0VBaUJBLHNCQUFNO0VBRU4sb0JBQ0c7R0FBRixVQUNDO0dBV0QsV0FDTyxlQUFBO0lBQU4sSUFBRSxPQUFHLEVBQUU7SUFDUCxJQUFFLEtBQU07SUFDUixzQkFDQztJQUdELGdDQUFjLGdCQUNhLFVBQUE7WUFBMUIsSUFBRSxPQUFHLEVBQUU7SUFBQTtXQUNSLGdDQUFlLElBQ0ksVUFBQTtZQUFsQixJQUFHLE9BQUcsRUFBRSxHQUFJO0lBQUE7R0FBQTtrQkFDYixhQUFBLEVBQ1M7O0lBQUg7S0FBQSxRQUFBO0tBQ0wseUJBQUMsU0FBRCxJQUNTO01BQVIsa0NBQVEseUJBQUUsU0FDTzs4QkFDZix3QkFBVSwyREFDRyx1QkFBWSx1QkFBWTtNQUFBO0tBQUEsT0FDeEMseUJBQUMsUUFBRCxJQUNRO01BQVAsY0FBUSxPQUFHLEVBQUUsY0FDVzs4QkFBZjtNQUFBO01BQ1QsY0FBUSxHQUNDO3NDQUFELEtBQUs7TUFBQTtLQUFBLE9BRVY7NkJBQUsscUVBQXdEOzs7OztFQUVwRSx1Q0FDSztHQUFKLFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixPQUFLLE1BQU87V0FDWixPQUFLLE9BQUcsRUFBRTtHQUFBO2tCQUNWLGdCQUFBLEVBQ1M7O0lBQUg7S0FBQSxRQUFBO0tBQ0wseUJBQUMsU0FBRCxJQUNTO01BQ0gsZ0NBQUoseUJBQUUsU0FDTzs4QkFDUCwwQkFBWSx3REFDRyw0QkFBaUI7TUFBQSxPQUU5QjtLQUFBLE9BQ04seUJBQUMsUUFBRCxJQUNRO01BQVAsSUFBRSxPQUFHLEVBQUU7TUFFRixZQUFKLEdBQ0M7c0NBQU8sS0FBSztNQUFBLE9BRVQ7S0FBQSxPQUVGOzZCQUFLLHdFQUEyRDs7Ozs7RUFFdkUseUNBQ007R0FBTCxVQUNDO0dBQ0QsV0FDTyxlQUFBO0lBQU4sa0NBQ087S0FBTixVQUFBLENBQUUsRUFBRSxPQUFPOzs7SUFDWixXQUNDO1dBT0QsZ0NBQWMsS0FDTSxVQUFBO1lBQW5CLGtDQUNPO01BQU4sVUFBQSxDQUFFLEVBQUUsT0FBTzs7Ozs7a0JBQ2IsaUJBQUEsSUFBYSxpQkFDMkI7c0JBRHBDOzhDQUEwQjtXQUM5QixlQUFXLE9BQUcsSUFBSTtHQUFBOztFQUVwQixxREFDVztHQUFWLFVBQU07R0FDTixXQUNPLGVBQUE7V0FBTix1RkFDd0I7S0FBdkIsVUFBQSxDQUFFLEVBQUUsT0FBUTs7OztrQkFDYix3QkFBQSxTQUFZLElBQWEsaUJBQzJCOztzQkFEcEM7OENBQTBCO0lBQ3JDLFFBQUEsS0FBQSxvQ0FDWTtLQUNoQixxREFBUyxFQUFFO0tBQ1gsNkJBQWUsRUFBRTtLQUNqQixpQ0FBUywyQkFBSTtLQUNiLGNBQVEsU0FBTyxPQUFPLGlCQUNZOztjQUNoQyxxQkFBQyxpRUFDWSx1QkFBWSx1QkFBWSwrQkFDN0IsaUVBQ08sOEVBRUE7TUFBQTtLQUFBO0lBQUE7R0FBQTs7RUF6SHBCLHdCQUFBO2tCQTJIQSIsImZpbGUiOiJiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=