"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./compare","./at/at","./at/Map/Map","./Function","./show","./String","./Try","./Type/Pred-Type","./Type/Type","./compare","./math/methods","./show","./Try"],function(exports,compare_0,_64_1,Map_2,Function_3,show_4,String_5,Try_6,Pred_45Type_7,Type_8,compare_9,methods_10,show_11,Try_12){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_61_63=_$2["=?"],_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_1)
		}),_$4=_ms.lazyGetModule(_64_1),map=_ms.lazyProp(_$4,"map"),Map=_ms.lazy(function(){
			return _ms.getDefaultExport(Map_2)
		}),_$6=_ms.lazyGetModule(Function_3),Pred=_ms.lazyProp(_$6,"Pred"),_$7=_ms.lazyGetModule(show_4),repr=_ms.lazyProp(_$7,"repr"),_$8=_ms.lazyGetModule(String_5),indent=_ms.lazyProp(_$8,"indent"),_$9=_ms.lazyGetModule(Try_6),oh_45no_33=_ms.lazyProp(_$9,"oh-no!"),_$10=_ms.lazyGetModule(Pred_45Type_7),Any=_ms.lazyProp(_$10,"Any"),_$11=_ms.lazyGetModule(Type_8),_61_62=_ms.lazyProp(_$11,"=>"),_$13=_ms.lazyGetModule(compare_9),same_63=_ms.lazyProp(_$13,"same?"),_$14=_ms.lazyGetModule(methods_10),_43=_ms.lazyProp(_$14,"+"),show=_ms.lazy(function(){
			return _ms.getDefaultExport(show_11)
		}),_$16=_ms.lazyGetModule(Try_12),fails_45with_63=_ms.lazyProp(_$16,"fails-with?");
		const doc=exports.doc="For making assertions.";
		const _33=function(){
			const doc="Pronounced 'assert'.\nIt may be called as:\n\t! fun arg arg arg ...\n\t\tCalls fun on the arguments.\n\t\tfun must return a Boolean.\n\t\tIf it returns false, an error will be thrown.\n\t\tThe error will contain information about fun and its arguments.\n\t! bool ~message\n\t\tSame as:\n\t\t\tunless! bool\n\t\t\t\toh-no! message";
			return _ms.set(function _33(a){
				const args=[].slice.call(arguments,1);
				{
					const _=a;
					if(_ms.contains(Function,_)){
						if(! Function.apply.call(_,null,[].concat(_ms.arr(args)))){
							_ms.unlazy(oh_45no_33)(((("Expected "+_ms.show(a))+"\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(_61_62)(String,_ms.unlazy(map)(args,_ms.unlazy(repr)),"\n")))))
						}
					} else if(_ms.contains(Boolean,_)){
						if(! _61_63(1,args.length)){
							_ms.unlazy(oh_45no_33)("Use `! fun args...` or `! bool explanation`, never just `! bool`.")
						};
						if(! _){
							_ms.unlazy(oh_45no_33)(_ms.sub(args,0))
						}
					} else {
						_ms.unlazy(oh_45no_33)((("First argument to `!` must be Function or Boolean. Got "+_ms.show(_))+"."))
					}
				}
			},"doc",doc)
		}();
		const _33not=exports["!not"]=function(){
			const doc="Like `!`, but inverts the condition.";
			return _ms.set(function _33not(a){
				const args=[].slice.call(arguments,1);
				{
					const _=a;
					if(_ms.contains(Function,_)){
						if(Function.apply.call(_,null,[].concat(_ms.arr(args)))){
							_ms.unlazy(oh_45no_33)(((("Unexpected "+_ms.show(a))+"\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(map)(args,_ms.unlazy(repr)).join("\n")))))
						} else {}
					} else if(_ms.contains(Boolean,_)){
						_33(_61_63,1,args.length);
						if(_){
							_ms.unlazy(oh_45no_33)(_ms.sub(args,0))
						} else {}
					} else {
						_ms.unlazy(oh_45no_33)((("First argument to `!not` must be Function or Boolean. Got "+_ms.show(_))+"."))
					}
				}
			},"doc",doc)
		}();
		const _33call=exports["!call"]=function(){
			const doc="For each entry in args->result, asserts that calling `fun` with arguments of key will `=?` the value.";
			return _ms.set(function _33call(fun,args_45_62result){
				return _33call_45with(_61_63,fun,args_45_62result)
			},"doc",doc)
		}();
		const _33call_45with=exports["!call-with"]=function(){
			const doc="Like !call but allows any equality predicate.";
			return _ms.set(function _33call_45with(equal_63,fun,args_45_62result){
				for(let _ of _ms.iterator(args_45_62result)){
					const args=_.key;
					const expected_45res=_.val;
					const actual=Function.apply.call(fun,null,[].concat(_ms.arr(args)));
					if(! equal_63(actual,expected_45res)){
						_ms.unlazy(oh_45no_33)(_ms.lazy(function(){
							return (((((((((""+_ms.show(fun))+" of:\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(_61_62)(String,_ms.unlazy(map)(args,_ms.unlazy(repr)),"\n"))))+"\nShould ")+_ms.show(equal_63))+":\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(repr)(expected_45res))))+"\nGot:\n\t")+_ms.show(_ms.unlazy(indent)(_ms.unlazy(repr)(actual))))
						}))
					}
				}
			},"doc",doc)
		}();
		const name=exports.name="!";
		exports.default=_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy8hLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0VBaUJBLHNCQUFNO0VBRU4sb0JBQ0c7R0FBRixVQUNDO2tCQXNCQSxhQUFBLEVBQ1M7O0lBQUg7S0FBQSxRQUFBO0tBQ0wsZ0JBQUMsU0FBRCxHQUNTO01BQVIseUJBQVEseUJBQUUsUUFDTzs4QkFDZix3QkFBVSwyREFDRyx1QkFBWSx1QkFBWTtNQUFBO0tBQUEsT0FDeEMsZ0JBQUMsUUFBRCxHQUNRO01BQVAsS0FBUSxPQUFHLEVBQUUsYUFDVzs4QkFBZjtNQUFBO01BQ1QsS0FBUSxFQUNDO3NDQUFELEtBQUs7TUFBQTtLQUFBLE9BRVY7NkJBQUsscUVBQXdEOzs7OztFQUVwRSx1Q0FDSztHQUFKLFVBQU07a0JBSUwsZ0JBQUEsRUFDUzs7SUFBSDtLQUFBLFFBQUE7S0FDTCxnQkFBQyxTQUFELEdBQ1M7TUFDSCx1QkFBSix5QkFBRSxRQUNPOzhCQUNQLDBCQUFZLHdEQUNHLDRCQUFpQjtNQUFBLE9BRTlCO0tBQUEsT0FDTixnQkFBQyxRQUFELEdBQ1E7TUFBUCxJQUFFLE9BQUcsRUFBRTtNQUVGLEdBQUosRUFDQztzQ0FBTyxLQUFLO01BQUEsT0FFVDtLQUFBLE9BRUY7NkJBQUssd0VBQTJEOzs7OztFQUV2RSx5Q0FDTTtHQUFMLFVBQ0M7a0JBZUEsaUJBQUEsSUFBYSxpQkFDMkI7V0FBeEMsZUFBVyxPQUFHLElBQUk7R0FBQTs7RUFFcEIscURBQ1c7R0FBVixVQUFNO2tCQUlMLHdCQUFBLFNBQVksSUFBYSxpQkFDMkI7SUFBL0MsUUFBQSxrQkFBQSxrQkFDWTtLQUFoQixXQUFTO0tBQ1QscUJBQWU7S0FDZixpQ0FBUywyQkFBSTtLQUNiLEtBQVEsU0FBTyxPQUFPLGdCQUNZOztjQUNoQyxxQkFBQyxpRUFDWSx1QkFBWSx1QkFBWSwrQkFDN0IsaUVBQ08sOEVBRUE7TUFBQTtLQUFBO0lBQUE7R0FBQTs7RUF4SHBCLHdCQUFBO2tCQTBIQSIsImZpbGUiOiJiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=