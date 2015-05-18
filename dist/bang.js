"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Boolean","./compare","./at/at","./at/Map/Map","./Function","./show","./String","./Try","./Type/Pred-Type","./Type/Type","./compare","./math/methods","./show","./Try"],function(exports,Boolean_0,compare_1,_64_2,Map_3,Function_4,show_5,String_6,Try_7,Pred_45Type_8,Type_9,compare_10,methods_11,show_12,Try_13){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_2)
		}),_$5=_ms.lazyGetModule(_64_2),each_33=_ms.lazyProp(_$5,"each!"),map=_ms.lazyProp(_$5,"map"),Map=_ms.lazy(function(){
			return _ms.getDefaultExport(Map_3)
		}),_$7=_ms.lazyGetModule(Function_4),Pred=_ms.lazyProp(_$7,"Pred"),_$8=_ms.lazyGetModule(show_5),repr=_ms.lazyProp(_$8,"repr"),_$9=_ms.lazyGetModule(String_6),indent=_ms.lazyProp(_$9,"indent"),_$10=_ms.lazyGetModule(Try_7),oh_45no_33=_ms.lazyProp(_$10,"oh-no!"),_$11=_ms.lazyGetModule(Pred_45Type_8),Any=_ms.lazyProp(_$11,"Any"),_$12=_ms.lazyGetModule(Type_9),_61_62=_ms.lazyProp(_$12,"=>"),_$14=_ms.lazyGetModule(compare_10),same_63=_ms.lazyProp(_$14,"same?"),_$15=_ms.lazyGetModule(methods_11),_43=_ms.lazyProp(_$15,"+"),show=_ms.lazy(function(){
			return _ms.getDefaultExport(show_12)
		}),_$17=_ms.lazyGetModule(Try_13),fails_45with_63=_ms.lazyProp(_$17,"fails-with?");
		const doc=exports.doc="For making assertions.";
		const _33=function(){
			const doc="Pronounced 'assert'.\nIt may be called as:\n\t! fun arg arg arg ...\n\t\tCalls fun on the arguments.\n\t\tfun must return a Boolean.\n\t\tIf it returns false, an error will be thrown.\n\t\tThe error will contain information about fun and its arguments.\n\t! bool ~message\n\t\tSame as:\n\t\t\tif! (not bool)\n\t\t\t\toh-no! message";
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
						if(not(Function.apply.call(_,null,[].concat(_ms.arr(args))))){
							_ms.unlazy(oh_45no_33)(((("Expected "+_ms.show(a))+"\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(_61_62)(String,_ms.unlazy(map)(args,_ms.unlazy(repr)),"\n")))))
						}
					} else if(_ms.bool(_ms.contains(Boolean,_))){
						if(not(_61_63(1,args.length))){
							_ms.unlazy(oh_45no_33)("Use `! fun args...` or `! bool explanation`, never just `! bool`.")
						};
						if(not(_)){
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
				return _ms.unlazy(each_33)(args_45_62result,function(pair){
					const args=_ms.checkContains(_ms.unlazy(_64),pair.key,"args");
					const expected_45res=pair.val;
					const actual=Function.apply.call(fun,null,[].concat(_ms.arr(args)));
					if(not(equal_63(actual,expected_45res))){
						_ms.unlazy(oh_45no_33)(_ms.lazy(function(){
							return (((((((((""+_ms.show(fun))+" of:\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(_61_62)(String,_ms.unlazy(map)(args,_ms.unlazy(repr)),"\n"))))+"\nShould ")+_ms.show(equal_63))+":\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(repr)(expected_45res))))+"\nGot:\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(repr)(actual))))
						}))
					}
				})
			},"doc",doc,"test",test)
		}();
		const name=exports.name="!";
		exports.default=_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy8hLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0VBa0JBLHNCQUFNO0VBRU4sb0JBQ0c7R0FBRixVQUNDO0dBV0QsV0FDTyxlQUFBO0lBQU4sSUFBRSxPQUFHLEVBQUU7SUFDUCxJQUFFLEtBQU07SUFDUixzQkFDQztJQUdELGdDQUFjLGdCQUNhLFVBQUE7WUFBMUIsSUFBRSxPQUFHLEVBQUU7SUFBQTtXQUNSLGdDQUFlLElBQ0ksVUFBQTtZQUFsQixJQUFHLE9BQUcsRUFBRSxHQUFJO0lBQUE7R0FBQTtrQkFDYixhQUFBLEVBQ1M7O0lBQUg7S0FBQSxRQUFBO0tBQ0wseUJBQUMsU0FBRCxJQUNTO01BQVIsR0FBSSx3QkFBSyx5QkFBRSxTQUNROzhCQUNqQix3QkFBVSwyREFDRyx1QkFBWSx1QkFBWTtNQUFBO0tBQUEsT0FDeEMseUJBQUMsUUFBRCxJQUNRO01BQVAsR0FBSSxJQUFLLE9BQUcsRUFBRSxjQUNZOzhCQUFqQjtNQUFBO01BQ1QsR0FBSSxJQUFJLEdBQ0M7c0NBQUQsS0FBSztNQUFBO0tBQUEsT0FFVjs2QkFBSyxxRUFBd0Q7Ozs7O0VBRXBFLHVDQUNLO0dBQUosVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLE9BQUssTUFBTztXQUNaLE9BQUssT0FBRyxFQUFFO0dBQUE7a0JBQ1YsZ0JBQUEsRUFDUzs7SUFBSDtLQUFBLFFBQUE7S0FDTCx5QkFBQyxTQUFELElBQ1M7TUFDSCxnQ0FBSix5QkFBRSxTQUNPOzhCQUNQLDBCQUFZLHdEQUNHLDRCQUFpQjtNQUFBLE9BRTlCO0tBQUEsT0FDTix5QkFBQyxRQUFELElBQ1E7TUFBUCxJQUFFLE9BQUcsRUFBRTtNQUVGLFlBQUosR0FDQztzQ0FBTyxLQUFLO01BQUEsT0FFVDtLQUFBLE9BRUY7NkJBQUssd0VBQTJEOzs7OztFQUV2RSx5Q0FDTTtHQUFMLFVBQ0M7R0FDRCxXQUNPLGVBQUE7SUFBTixrQ0FDTztLQUFOLFVBQUEsQ0FBRSxFQUFFLE9BQU87OztJQUNaLFdBQ0M7V0FPRCxnQ0FBYyxLQUNNLFVBQUE7WUFBbkIsa0NBQ087TUFBTixVQUFBLENBQUUsRUFBRSxPQUFPOzs7OztrQkFDYixpQkFBQSxJQUFhLGlCQUMyQjtzQkFEcEM7OENBQTBCO1dBQzlCLGVBQVcsT0FBRyxJQUFJO0dBQUE7O0VBRXBCLHFEQUNXO0dBQVYsVUFBTTtHQUNOLFdBQ08sZUFBQTtXQUFOLHVGQUN3QjtLQUF2QixVQUFBLENBQUUsRUFBRSxPQUFROzs7O2tCQUNiLHdCQUFBLFNBQVksSUFBYSxpQkFDMkI7O3NCQURwQzs4Q0FBMEI7K0JBQ3BDLGlCQUFjLFNBQUEsS0FDSTtLQUF2Qiw2Q0FBUztLQUNULHFCQUFlO0tBQ2YsaUNBQVMsMkJBQUk7S0FDYixHQUFLLElBQUssU0FBTyxPQUFPLGlCQUNjOztjQUNwQyxxQkFBQyxpRUFDWSx1QkFBWSx1QkFBWSwrQkFDN0IsaUVBQ08sOEVBRUE7TUFBQTtLQUFBO0lBQUE7R0FBQTs7RUF6SHBCLHdCQUFBO2tCQTJIQSIsImZpbGUiOiJiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=