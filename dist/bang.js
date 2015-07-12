"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./compare","./at/at","./at/Map/Map","./Function","./show","./String","./Type/Pred-Type","./Type/Type","./compare","./math/methods","./show","./Try"],function(exports,compare_0,_64_1,Map_2,Function_3,show_4,String_5,Pred_45Type_6,Type_7,compare_8,methods_9,show_10,Try_11){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_1)
		}),_$4=_ms.lazyGetModule(_64_1),map=_ms.lazyProp(_$4,"map"),Map=_ms.lazy(function(){
			return _ms.getDefaultExport(Map_2)
		}),_$6=_ms.lazyGetModule(Function_3),Pred=_ms.lazyProp(_$6,"Pred"),_$7=_ms.lazyGetModule(show_4),repr=_ms.lazyProp(_$7,"repr"),_$8=_ms.lazyGetModule(String_5),indent=_ms.lazyProp(_$8,"indent"),_$9=_ms.lazyGetModule(Pred_45Type_6),Any=_ms.lazyProp(_$9,"Any"),_$10=_ms.lazyGetModule(Type_7),_61_62=_ms.lazyProp(_$10,"=>"),_$12=_ms.lazyGetModule(compare_8),same_63=_ms.lazyProp(_$12,"same?"),_$13=_ms.lazyGetModule(methods_9),_43=_ms.lazyProp(_$13,"+"),show=_ms.lazy(function(){
			return _ms.getDefaultExport(show_10)
		}),_$15=_ms.lazyGetModule(Try_11),fails_45with_63=_ms.lazyProp(_$15,"fails-with?");
		const doc=exports.doc=`For making assertions.`;
		const _33=function(){
			const built={};
			const doc=built.doc=`Pronounced 'assert'.\nIt may be called as:\n\t! fun arg arg arg ...\n\t\tCalls fun on the arguments.\n\t\tfun must return a Boolean.\n\t\tIf it returns false, an error will be thrown.\n\t\tThe error will contain information about fun and its arguments.\n\t! bool ~message\n\t\tSame as:\n\t\t\tunless! bool\n\t\t\t\toh-no! message`;
			const test=built.test=function test(){
				_33(_61_63,1,1);
				_33(true,`a`);
				const one_45not_45two=`Expected =?\n\t1\n\t2`;
				_33(_ms.unlazy(fails_45with_63),one_45not_45two,function(){
					return _33(_61_63,1,2)
				});
				_33(_ms.unlazy(fails_45with_63),`a`,function(){
					return _33(_61_63(1,2),`a`)
				})
			};
			return _ms.set(function _33(a){
				const args=[].slice.call(arguments,1);
				{
					const _=a;
					if(_ms.bool(_ms.contains(Function,_))){
						if(! _ms.bool(Function.apply.call(_,null,[].concat(_ms.arr(args))))){
							throw _ms.error(`Expected ${_ms.show(a)}\n\t${_ms.show(_ms.unlazy(indent)(_ms.unlazy(_61_62)(String,_ms.unlazy(map)(args,_ms.unlazy(repr)),`\n`)))}`)
						}
					} else if(_ms.bool(_ms.contains(Boolean,_))){
						if(! _ms.bool(_61_63(1,args.length))){
							throw _ms.error(`Use \`! fun args...\` or \`! bool explanation\`, never just \`! bool\`.`)
						};
						if(! _ms.bool(_)){
							throw _ms.error(_ms.sub(args,0))
						}
					} else {
						throw _ms.error(`First argument to \`!\` must be Function or Boolean. Got ${_ms.show(_)}.`)
					}
				}
			},built)
		}();
		const _33not=exports["!not"]=function(){
			const built={};
			const doc=built.doc=`Like \`!\`, but inverts the condition.`;
			const test=built.test=function test(){
				_33not(false,`a`);
				_33not(_61_63,1,2)
			};
			return _ms.set(function _33not(a){
				const args=[].slice.call(arguments,1);
				{
					const _=a;
					if(_ms.bool(_ms.contains(Function,_))){
						if(Function.apply.call(_,null,[].concat(_ms.arr(args)))){
							throw _ms.error(`Unexpected ${_ms.show(a)}\n\t${_ms.show(_ms.unlazy(indent)(_ms.unlazy(map)(args,_ms.unlazy(repr)).join(`\n`)))}`)
						}
					} else if(_ms.bool(_ms.contains(Boolean,_))){
						_33(_61_63,1,args.length);
						if(_){
							throw _ms.error(_ms.sub(args,0))
						}
					} else {
						throw _ms.error(`First argument to \`!not\` must be Function or Boolean. Got ${_ms.show(_)}.`)
					}
				}
			},built)
		}();
		const _33call=exports["!call"]=function(){
			const built={};
			const doc=built.doc=`For each entry in args->result, asserts that calling \`fun\` with arguments of key will \`=?\` the value.`;
			const test=built.test=function test(){
				_33call(_ms.unlazy(_43),function(){
					const built=new global.Map();
					_ms.assoc(built,[1,1],2);
					return built
				}());
				const nope=`+ of:\n\t1\n\t1\nShould =?:\n\t3\nGot:\n\t2`;
				return _33(_ms.unlazy(fails_45with_63),nope,function(){
					_33call(_ms.unlazy(_43),function(){
						const built=new global.Map();
						_ms.assoc(built,[1,1],3);
						return built
					}())
				})
			};
			return _ms.set(function _33call(fun,args_45_62result){
				_ms.checkContains(Function,fun,"fun");
				_ms.checkContains(_ms.sub(_ms.unlazy(Map),Array,_ms.unlazy(Any)),args_45_62result,"args->result");
				_33call_45with(_61_63,fun,args_45_62result)
			},built)
		}();
		const _33call_45with=exports["!call-with"]=function(){
			const built={};
			const doc=built.doc=`Like !call but allows any equality predicate.`;
			const test=built.test=function test(){
				_33call_45with(_ms.sub(_ms.unlazy(same_63),_ms.unlazy(show)),_ms.unlazy(_43),function(){
					const built=new global.Map();
					_ms.assoc(built,[1,2],`3`);
					return built
				}())
			};
			return _ms.set(function _33call_45with(equal_63,fun,args_45_62result){
				_ms.checkContains(_ms.unlazy(Pred),equal_63,"equal?");
				_ms.checkContains(Function,fun,"fun");
				_ms.checkContains(_ms.sub(_ms.unlazy(Map),Array,_ms.unlazy(Any)),args_45_62result,"args->result");
				for(let _ of args_45_62result){
					const args=_ms.checkContains(_ms.unlazy(_64),_ms.sub(_,0),"args");
					const expected_45res=_ms.sub(_,1);
					const actual=Function.apply.call(fun,null,[].concat(_ms.arr(args)));
					if(! _ms.bool(equal_63(actual,expected_45res))){
						throw _ms.error(`${_ms.show(fun)} of:\n\t${_ms.show(_ms.unlazy(indent)(_ms.unlazy(_61_62)(String,_ms.unlazy(map)(args,_ms.unlazy(repr)),`\n`)))}\nShould ${_ms.show(equal_63)}:\n\t${_ms.show(_ms.unlazy(indent)(_ms.unlazy(repr)(expected_45res)))}\nGot:\n\t${_ms.show(_ms.unlazy(indent)(_ms.unlazy(repr)(actual)))}`)
					}
				}
			},built)
		}();
		const name=exports.name=`!`;
		exports.default=_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy8hLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0VBZ0JBLHNCQUFNO0VBRU4sb0JBQ0U7O0dBQUQsb0JBQ0M7R0FXRCxzQkFDUSxlQUFBO0lBQVAsSUFBRSxPQUFHLEVBQUU7SUFDUCxJQUFFLEtBQU07SUFDUixzQkFDQztJQUdELGdDQUFjLGdCQUNhLFVBQUE7WUFBMUIsSUFBRSxPQUFHLEVBQUU7SUFBQTtJQUNSLGdDQUFlLElBQ0ksVUFBQTtZQUFsQixJQUFHLE9BQUcsRUFBRSxHQUFJOzs7a0JBQ1osYUFBQSxFQUNTOztJQUFKO0tBQUEsUUFBQTtLQUNMLHlCQUFDLFNBQUQsSUFDUztNQUFSLGtDQUFRLHlCQUFFLFNBQ087T0FBaEIsZ0JBQ0MscUJBQVUsd0RBQ0csdUJBQVksdUJBQVk7O1lBQ3hDLHlCQUFDLFFBQUQsSUFDUTtNQUFQLGNBQVEsT0FBRyxFQUFFLGNBQ1c7T0FBdkIsZ0JBQVE7O01BQ1QsY0FBUSxHQUNDO09BQVIsd0JBQU8sS0FBSztNQUFBO0tBQUEsT0FFVjtNQUFILGdCQUFRLHFFQUF3RDs7Ozs7RUFFcEUsdUNBQ0s7O0dBQUosb0JBQU07R0FDTixzQkFDUSxlQUFBO0lBQVAsT0FBSyxNQUFPO0lBQ1osT0FBSyxPQUFHLEVBQUU7R0FBQTtrQkFDVCxnQkFBQSxFQUNTOztJQUFKO0tBQUEsUUFBQTtLQUNMLHlCQUFDLFNBQUQsSUFDUztNQUFSLHVCQUFJLHlCQUFFLFFBQ087T0FBWixnQkFDQyx1QkFBWSxxREFDRyw0QkFBaUI7O1lBQ25DLHlCQUFDLFFBQUQsSUFDUTtNQUFQLElBQUUsT0FBRyxFQUFFO01BQ1AsR0FBSSxFQUNDO09BQUosd0JBQU8sS0FBSztNQUFBO0tBQUEsT0FFVjtNQUFILGdCQUFRLHdFQUEyRDs7Ozs7RUFFdkUseUNBQ007O0dBQUwsb0JBQ0M7R0FDRCxzQkFDTyxlQUFBO0lBQU4sa0NBQ087O3FCQUFOLENBQUUsRUFBRSxHQUFPOzs7SUFDWixXQUNDO1dBT0QsZ0NBQWMsS0FDTyxVQUFBO0tBQXBCLGtDQUNPOztzQkFBTixDQUFFLEVBQUUsR0FBTzs7Ozs7a0JBQ1osaUJBQUEsSUFBYSxpQkFDMkI7c0JBRHBDOzhDQUEwQjtJQUMvQixlQUFXLE9BQUcsSUFBSTtHQUFBOztFQUVwQixxREFDVzs7R0FBVixvQkFBTTtHQUNOLHNCQUNRLGVBQUE7SUFBUCx1RkFDd0I7O3FCQUF2QixDQUFFLEVBQUUsR0FBUTs7OztrQkFDWix3QkFBQSxTQUFZLElBQWEsaUJBQzJCOztzQkFEcEM7OENBQTBCO0lBQ3RDLFFBQUEsS0FBQSxpQkFDWTtLQUNoQixxREFBUyxFQUFFO0tBQ1gsNkJBQWUsRUFBRTtLQUNqQixpQ0FBUywyQkFBSTtLQUNiLGNBQVEsU0FBTyxPQUFPLGlCQUNZO01BQWpDLGdCQUNDLFlBQUMsOERBQ1ksdUJBQVksdUJBQVksNEJBQzdCLDhEQUNPLDJFQUVBOzs7OztFQWxIcEIsd0JBQUE7a0JBa0JBIiwiZmlsZSI6ImJhbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==