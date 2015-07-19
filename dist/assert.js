"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./compare","./at/at","./at/Map/Map","./Function","./show","./String","./Type/Pred-Type","./Type/Type","./compare","./math/methods","./show","./Try"],(exports,compare_0,_64_1,Map_2,Function_3,show_4,String_5,Pred_45Type_6,Type_7,compare_8,methods_9,show_10,Try_11)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_64=_ms.lazy(()=>{
			return _ms.getDefaultExport(_64_1)
		}),_$4=_ms.lazyGetModule(_64_1),map=_ms.lazyProp(_$4,"map"),Map=_ms.lazy(()=>{
			return _ms.getDefaultExport(Map_2)
		}),_$6=_ms.lazyGetModule(Function_3),Pred=_ms.lazyProp(_$6,"Pred"),_$7=_ms.lazyGetModule(show_4),repr=_ms.lazyProp(_$7,"repr"),_$8=_ms.lazyGetModule(String_5),indent=_ms.lazyProp(_$8,"indent"),_$9=_ms.lazyGetModule(Pred_45Type_6),Any=_ms.lazyProp(_$9,"Any"),_$10=_ms.lazyGetModule(Type_7),_61_62=_ms.lazyProp(_$10,"=>"),_$12=_ms.lazyGetModule(compare_8),same_63=_ms.lazyProp(_$12,"same?"),_$13=_ms.lazyGetModule(methods_9),_43=_ms.lazyProp(_$13,"+"),show=_ms.lazy(()=>{
			return _ms.getDefaultExport(show_10)
		}),_$15=_ms.lazyGetModule(Try_11),fails_45with_63=_ms.lazyProp(_$15,"fails-with?");
		const doc=exports.doc=`Advanced assertions.\nGenerally you should just use \`assert!\`.`;
		const assert_45call_33=exports["assert-call!"]=()=>{
			const built={};
			const doc=built.doc=`For each entry in args->result, asserts that calling \`fun\` with arguments of key will \`=?\` the value.`;
			const test=built.test=function test(){
				assert_45call_33(_ms.unlazy(_43),()=>{
					const built=new global.Map();
					_ms.assoc(built,[1,1],2);
					return built
				}());
				const nope=`+ of:\n\t1\n\t1\nShould =?:\n\t3\nGot:\n\t2`;
				_ms.assert(_ms.unlazy(fails_45with_63),nope,()=>{
					assert_45call_33(_ms.unlazy(_43),()=>{
						const built=new global.Map();
						_ms.assoc(built,[1,1],3);
						return built
					}())
				})
			};
			return _ms.set(function assert_45call_33(fun,args_45_62result){
				_ms.checkContains(Function,fun,"fun");
				_ms.checkContains(_ms.sub(_ms.unlazy(Map),Array,_ms.unlazy(Any)),args_45_62result,"args->result");
				assert_45call_45with_33(_61_63,fun,args_45_62result)
			},built)
		}();
		const assert_45call_45with_33=exports["assert-call-with!"]=()=>{
			const built={};
			const doc=built.doc=`Like !call but allows any equality predicate.`;
			const test=built.test=function test(){
				assert_45call_45with_33(_ms.sub(_ms.unlazy(same_63),_ms.unlazy(show)),_ms.unlazy(_43),()=>{
					const built=new global.Map();
					_ms.assoc(built,[1,2],`3`);
					return built
				}())
			};
			return _ms.set(function assert_45call_45with_33(equal_63,fun,args_45_62result){
				_ms.checkContains(_ms.unlazy(Pred),equal_63,"equal?");
				_ms.checkContains(Function,fun,"fun");
				_ms.checkContains(_ms.sub(_ms.unlazy(Map),Array,_ms.unlazy(Any)),args_45_62result,"args->result");
				for(let _ of args_45_62result){
					const args=_ms.checkContains(_ms.unlazy(_64),_ms.sub(_,0),"args");
					const expected_45res=_ms.sub(_,1);
					const actual=Function.apply.call(fun,null,[].concat(_ms.arr(args)));
					if(! _ms.bool(equal_63(actual,expected_45res)))throw _ms.error(`${_ms.show(fun)} of:\n\t${_ms.show(_ms.unlazy(indent)(_ms.unlazy(_61_62)(String,_ms.unlazy(map)(args,_ms.unlazy(repr)),`\n`)))}\nShould ${_ms.show(equal_63)}:\n\t${_ms.show(_ms.unlazy(indent)(_ms.unlazy(repr)(expected_45res)))}\nGot:\n\t${_ms.show(_ms.unlazy(indent)(_ms.unlazy(repr)(actual)))}`)
				}
			},built)
		}();
		const name=exports.name=`assert`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9hc3NlcnQubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7RUFnQkEsc0JBQ0M7RUFHRCxtREFDYTs7R0FBWixvQkFDQztHQUNELHNCQUNRLGVBQUE7SUFBUCxxQ0FDYzs7cUJBQWIsQ0FBRSxFQUFFLEdBQU87OztJQUNaLFdBQ0M7MkNBT21CLEtBQ08sSUFBQTtLQUExQixxQ0FDYzs7c0JBQWIsQ0FBRSxFQUFFLEdBQU87Ozs7O2tCQUNaLDBCQUFBLElBQWEsaUJBQzJCO3NCQURwQzs4Q0FBMEI7SUFDL0Isd0JBQWtCLE9BQUcsSUFBSTtHQUFBOztFQUUzQiwrREFDa0I7O0dBQWpCLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtJQUFQLDBGQUMrQjs7cUJBQTlCLENBQUUsRUFBRSxHQUFROzs7O2tCQUNaLGlDQUFBLFNBQVksSUFBYSxpQkFDMkI7O3NCQURwQzs4Q0FBMEI7SUFDdEMsUUFBQSxLQUFBLGlCQUNZO0tBQ2hCLHFEQUFTLEVBQUU7S0FDWCw2QkFBZSxFQUFFO0tBQ2pCLGlDQUFTLDJCQUFJO0tBQ0wsY0FBQSxTQUFPLE9BQU8saUNBQ3JCLFlBQUMsOERBQ1ksdUJBQVksdUJBQVksNEJBQzdCLDhEQUNPLDJFQUVBOzs7O0VBekRuQix3QkFBQSIsImZpbGUiOiJhc3NlcnQuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==