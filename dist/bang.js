"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Bool","./compare","./private/bootstrap","./at/at","./at/Map/Map","./control","./Fun","./show","./Str","./Try","./Type/Pred-Type","./Type/Type","./compare","./math/methods","./show","./Try"],function(exports,Bool_0,compare_1,bootstrap_2,_64_3,Map_4,control_5,Fun_6,show_7,Str_8,Try_9,Pred_45Type_10,Type_11,compare_12,methods_13,show_14,Try_15){
	exports._get=_ms.lazy(function(){
		const Bool=_ms.getDefaultExport(Bool_0),_$2=_ms.getModule(Bool_0),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(bootstrap_2),Fun=_ms.get(_$4,"Fun"),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_3)
		}),_$6=_ms.lazyGetModule(_64_3),each_33=_ms.lazyProp(_$6,"each!"),map=_ms.lazyProp(_$6,"map"),Map=_ms.lazy(function(){
			return _ms.getDefaultExport(Map_4)
		}),_$8=_ms.lazyGetModule(control_5),if_33=_ms.lazyProp(_$8,"if!"),_$9=_ms.lazyGetModule(Fun_6),Pred=_ms.lazyProp(_$9,"Pred"),_$10=_ms.lazyGetModule(show_7),repr=_ms.lazyProp(_$10,"repr"),Str=_ms.lazy(function(){
			return _ms.getDefaultExport(Str_8)
		}),_$11=_ms.lazyGetModule(Str_8),indent=_ms.lazyProp(_$11,"indent"),_$12=_ms.lazyGetModule(Try_9),oh_45no_33=_ms.lazyProp(_$12,"oh-no!"),_$13=_ms.lazyGetModule(Pred_45Type_10),Any=_ms.lazyProp(_$13,"Any"),_$14=_ms.lazyGetModule(Type_11),_61_62=_ms.lazyProp(_$14,"=>"),_$16=_ms.lazyGetModule(compare_12),same_63=_ms.lazyProp(_$16,"same?"),_$17=_ms.lazyGetModule(methods_13),_43=_ms.lazyProp(_$17,"+"),show=_ms.lazy(function(){
			return _ms.getDefaultExport(show_14)
		}),_$19=_ms.lazyGetModule(Try_15),fails_45with_63=_ms.lazyProp(_$19,"fails-with?");
		const exports={};
		const doc=exports.doc="For making assertions.";
		const _33=function(){
			const doc="Pronounced 'assert'.\nIt may be called as:\n\t! fun arg arg arg ...\n\t\tCalls fun on the arguments.\n\t\tfun must return a Bool\n\t\tIf it returns false, an error will be thrown.\n\t\tThe error will contain information about fun and its arguments.\n\t! bool ~message\n\t\tSame as:\n\t\t\tif! (not bool) |\n\t\t\t\toh-no! message";
			const test=function(){
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
			return _ms.set(function(a){
				const args=[].slice.call(arguments,1);
				{
					const _=a;
					if(_ms.bool(_ms.contains(Fun,_))){
						if(_ms.bool(Function.apply.call(_,null,[].concat(_ms.arr(args))))){
							null
						} else {
							_ms.unlazy(oh_45no_33)(((("Expected "+_ms.show(a))+"\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(_61_62)(_ms.unlazy(Str),_ms.unlazy(map)(args,_ms.unlazy(repr)),"\n")))))
						}
					} else if(_ms.bool(_ms.contains(Bool,_))){
						if(_ms.bool(not(_61_63(1,args.length)))){
							_ms.unlazy(oh_45no_33)("Use `! fun args...` or `! bool explanation`, never just `! bool`.")
						} else if(_ms.bool(_)){
							null
						} else {
							_ms.unlazy(oh_45no_33)(_ms.sub(args,0))
						}
					} else {
						_ms.unlazy(oh_45no_33)((("First argument to `!` must be Fun or Bool. Got "+_ms.show(_))+"."))
					}
				}
			},"doc",doc,"test",test,"displayName","!")
		}();
		const _33not=exports["!not"]=function(){
			const doc="Like `!`, but inverts the condition.";
			const test=function(){
				_33not(false,"a");
				return _33not(_61_63,1,2)
			};
			return _ms.set(function(a){
				const args=[].slice.call(arguments,1);
				{
					const _=a;
					if(_ms.bool(_ms.contains(Fun,_))){
						if(_ms.bool(Function.apply.call(_,null,[].concat(_ms.arr(args))))){
							_ms.unlazy(oh_45no_33)(((("Unexpected "+_ms.show(a))+"\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(map)(args,_ms.unlazy(repr)).join("\n")))))
						} else {
							null
						}
					} else if(_ms.bool(_ms.contains(Bool,_))){
						_33(_61_63,1,args.length);
						if(_ms.bool(_)){
							_ms.unlazy(oh_45no_33)(_ms.sub(args,0))
						} else {
							null
						}
					} else {
						_ms.unlazy(oh_45no_33)((("First argument to `!not` must be Fun or Bool. Got "+_ms.show(_))+"."))
					}
				}
			},"doc",doc,"test",test,"displayName","!not")
		}();
		const _33call=exports["!call"]=function(){
			const doc="For each entry in args->result, asserts that calling `fun` with arguments of key will `=?` the value.";
			const test=function(){
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
			return _ms.set(function(fun,args_45_62result){
				_ms.checkContains(Fun,fun,"fun");
				_ms.checkContains(_ms.sub(_ms.unlazy(Map),Array,_ms.unlazy(Any)),args_45_62result,"args->result");
				return _33call_45with(_61_63,fun,args_45_62result)
			},"doc",doc,"test",test,"displayName","!call")
		}();
		const _33call_45with=exports["!call-with"]=function(){
			const doc="Like !call but allows any equality predicate.";
			const test=function(){
				return _33call_45with(_ms.sub(_ms.unlazy(same_63),_ms.unlazy(show)),_ms.unlazy(_43),function(){
					const _k0=[1,2],_v0="3";
					return _ms.map(_k0,_v0)
				}())
			};
			return _ms.set(function(equal_63,fun,args_45_62result){
				_ms.checkContains(_ms.unlazy(Pred),equal_63,"equal?");
				_ms.checkContains(Fun,fun,"fun");
				_ms.checkContains(_ms.sub(_ms.unlazy(Map),Array,_ms.unlazy(Any)),args_45_62result,"args->result");
				return _ms.unlazy(each_33)(args_45_62result,function(pair){
					const args=_ms.checkContains(_ms.unlazy(_64),pair.key,"args");
					const expected_45res=pair.val;
					const actual=Function.apply.call(fun,null,[].concat(_ms.arr(args)));
					return _ms.unlazy(if_33)(not(equal_63(actual,expected_45res)),function(){
						return _ms.unlazy(oh_45no_33)(_ms.lazy(function(){
							return (((((((((""+_ms.show(fun))+" of:\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(_61_62)(_ms.unlazy(Str),_ms.unlazy(map)(args,_ms.unlazy(repr)),"\n"))))+"\nShould ")+_ms.show(equal_63))+":\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(repr)(expected_45res))))+"\nGot:\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(repr)(actual))))
						}))
					})
				})
			},"doc",doc,"test",test,"displayName","!call-with")
		}();
		exports.default=_33;
		const displayName=exports.displayName="!";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy8hLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztpQ0FvQkE7Ozs7Ozs7Ozs7O0VBQUEsc0JBQU07RUFFTixvQkFBRztHQUNGLFVBQ0M7R0FXRCxXQUFPLFVBQUE7SUFDTixJQUFFLE9BQUcsRUFBRTtJQUNQLElBQUUsS0FBTTtJQUNSLHNCQUNDO0lBR0QsZ0NBQWMsZ0JBQWEsVUFBQTtZQUMxQixJQUFFLE9BQUcsRUFBRTtJQUFBO1dBQ1IsZ0NBQWUsSUFBSSxVQUFBO1lBQ2xCLElBQUcsT0FBRyxFQUFFLEdBQUk7SUFBQTtHQUFBO2tCQUNiLFNBQUEsRUFBUzs7SUFDSDtLQUFBLFFBQUE7S0FDTCx5QkFBQyxJQUFELElBQUk7TUFDRSxnQ0FDSix5QkFBRSxTQUFPO09BQ1I7TUFBQSxPQUNHOzhCQUVGLHdCQUFVLDJGQUNZLHVCQUFZO01BQUE7S0FBQSxPQUN0Qyx5QkFBQyxLQUFELElBQUs7TUFDQyxZQUNKLElBQUssT0FBRyxFQUFFLGVBQVk7OEJBQ2I7TUFBQSxPQUNULFlBQUEsR0FBQztPQUNBO01BQUEsT0FDRztzQ0FDSSxLQUFLO01BQUE7S0FBQSxPQUNYOzZCQUNLLDZEQUFnRDs7Ozs7RUFFNUQsdUNBQUs7R0FDSixVQUFNO0dBQ04sV0FBTyxVQUFBO0lBQ04sT0FBSyxNQUFPO1dBQ1osT0FBSyxPQUFHLEVBQUU7R0FBQTtrQkFDVixTQUFBLEVBQVM7O0lBQ0g7S0FBQSxRQUFBO0tBQ0wseUJBQUMsSUFBRCxJQUFJO01BQ0UsZ0NBQ0oseUJBQUUsU0FBTzs4QkFFUCwwQkFBWSx3REFDRyw0QkFBaUI7TUFBQSxPQUM5QjtPQUNIO01BQUE7S0FBQSxPQUNILHlCQUFDLEtBQUQsSUFBSztNQUNKLElBQUUsT0FBRyxFQUFFO01BQ0YsWUFDSixHQUFDO3NDQUNPLEtBQUs7TUFBQSxPQUNUO09BQ0g7TUFBQTtLQUFBLE9BQ0M7NkJBQ0ssZ0VBQW1EOzs7OztFQUUvRCx5Q0FBTTtHQUNMLFVBQ0M7R0FDRCxXQUFPLFVBQUE7SUFDTixrQ0FBTztLQUNOLFVBQUEsQ0FBRSxFQUFFLE9BQU87OztJQUNaLFdBQ0M7V0FPRCxnQ0FBYyxLQUFNLFVBQUE7WUFDbkIsa0NBQU87TUFDTixVQUFBLENBQUUsRUFBRSxPQUFPOzs7OztrQkFDYixTQUFBLElBQVEsaUJBQTJCO3NCQUEvQjs4Q0FBcUI7V0FDekIsZUFBVyxPQUFHLElBQUk7R0FBQTs7RUFFcEIscURBQVc7R0FDVixVQUFNO0dBQ04sV0FBTyxVQUFBO1dBQ04sdUZBQXdCO0tBQ3ZCLFVBQUEsQ0FBRSxFQUFFLE9BQVE7Ozs7a0JBQ2IsU0FBQSxTQUFZLElBQVEsaUJBQTJCOztzQkFBL0I7OENBQXFCOytCQUMvQixpQkFBYyxTQUFBLEtBQUk7S0FDdkIsNkNBQVM7S0FDVCxxQkFBZTtLQUNmLGlDQUFTLDJCQUFJOzhCQUNSLElBQUssU0FBTyxPQUFPLGlCQUFnQixVQUFBOztjQUV0QyxxQkFBQyxpR0FDcUIsdUJBQVksK0JBQzFCLGlFQUNPLDhFQUVBO01BQUE7S0FBQTtJQUFBO0dBQUE7O2tCQUVwQjtFQW5JQSxzQ0FBQSIsImZpbGUiOiJiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=