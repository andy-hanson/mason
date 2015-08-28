"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./compare","./at/at","./at/Map/Map","./at/Seq/Seq","./Function","./to-string","./String","./Type/Type","./compare","./math/methods","./to-string","./Try"],(exports,compare_0,_64_1,Map_2,Seq_3,Function_4,to_45string_5,String_6,Type_7,compare_8,methods_9,to_45string_10,Try_11)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_64=_ms.lazy(()=>_ms.getDefaultExport(_64_1)),_$4=_ms.lazyGetModule(_64_1),map=_ms.lazyProp(_$4,"map"),Map=_ms.lazy(()=>_ms.getDefaultExport(Map_2)),_$6=_ms.lazyGetModule(Seq_3),tail=_ms.lazyProp(_$6,"tail"),_$7=_ms.lazyGetModule(Function_4),Pred=_ms.lazyProp(_$7,"Pred"),_$8=_ms.lazyGetModule(to_45string_5),inspect=_ms.lazyProp(_$8,"inspect"),_$9=_ms.lazyGetModule(String_6),indent=_ms.lazyProp(_$9,"indent"),_$10=_ms.lazyGetModule(Type_7),_61_62=_ms.lazyProp(_$10,"=>"),_$12=_ms.lazyGetModule(compare_8),same_63=_ms.lazyProp(_$12,"same?"),_$13=_ms.lazyGetModule(methods_9),_43=_ms.lazyProp(_$13,"+"),to_45string=_ms.lazy(()=>_ms.getDefaultExport(to_45string_10)),_$15=_ms.lazyGetModule(Try_11),fails_45with_63=_ms.lazyProp(_$15,"fails-with?");
		const doc=exports.doc=`Advanced assertions.\nGenerally you should just use \`assert!\`.`;
		const assert_45call_33=exports["assert-call!"]=(()=>{
			const built={};
			const doc=built.doc=`For each entry in args->result, asserts that calling \`fun\` with arguments of key will \`=?\` the value.`;
			const test=built.test=function test(){
				assert_45call_33(_ms.unlazy(_43),(()=>{
					const built=new (global.Map)();
					_ms.assoc(built,[1,1],2);
					return built
				})());
				const nope=`+ of:\n\t1\n\t1\nShould =?:\n\t3\nGot:\n\t2`;
				_ms.assert(_ms.unlazy(fails_45with_63),nope,()=>{
					assert_45call_33(_ms.unlazy(_43),(()=>{
						const built=new (global.Map)();
						_ms.assoc(built,[1,1],3);
						return built
					})())
				})
			};
			return _ms.set(function assert_45call_33(fun,args_45_62result){
				_ms.checkContains(Function,fun,"fun");
				_ms.checkContains(_ms.unlazy(Map),args_45_62result,"args->result");
				assert_45call_45with_33(_61_63,fun,args_45_62result)
			},built)
		})();
		const assert_45this_45call_33=exports["assert-this-call!"]=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){};
			return _ms.set(function assert_45this_45call_33(fun,args_45_62result){
				_ms.checkContains(Function,fun,"fun");
				_ms.checkContains(_ms.unlazy(Map),args_45_62result,"args->result");
				for(let _ of args_45_62result){
					const args=_ms.checkContains(_ms.unlazy(_64),_ms.sub(_,0),"args");
					const expected_45res=_ms.sub(_,1);
					const actual=fun.apply(_ms.sub(args,0),_ms.unlazy(tail)(args));
					if(! _61_63(actual,expected_45res))throw _ms.error(`${fun} of:\n\t${_ms.unlazy(indent)(_ms.unlazy(_61_62)(String,_ms.unlazy(map)(args,_ms.unlazy(inspect)),`\n`))}\nShould ${_61_63}:\n\t${_ms.unlazy(indent)(_ms.unlazy(inspect)(expected_45res))}\nGot:\n\t${_ms.unlazy(indent)(_ms.unlazy(inspect)(actual))}`)
				}
			},built)
		})();
		const assert_45call_45with_33=exports["assert-call-with!"]=(()=>{
			const built={};
			const doc=built.doc=`Like !call but allows any equality predicate.`;
			const test=built.test=function test(){
				assert_45call_45with_33(_ms.sub(_ms.unlazy(same_63),_ms.unlazy(to_45string)),_ms.unlazy(_43),(()=>{
					const built=new (global.Map)();
					_ms.assoc(built,[1,2],`3`);
					return built
				})())
			};
			return _ms.set(function assert_45call_45with_33(equal_63,fun,args_45_62result){
				_ms.checkContains(_ms.unlazy(Pred),equal_63,"equal?");
				_ms.checkContains(Function,fun,"fun");
				_ms.checkContains(_ms.unlazy(Map),args_45_62result,"args->result");
				for(let _ of args_45_62result){
					const args=_ms.checkContains(_ms.unlazy(_64),_ms.sub(_,0),"args");
					const expected_45res=_ms.sub(_,1);
					const actual=fun(...args);
					if(! equal_63(actual,expected_45res))throw _ms.error(`${fun} of:\n\t${_ms.unlazy(indent)(_ms.unlazy(_61_62)(String,_ms.unlazy(map)(args,_ms.unlazy(inspect)),`\n`))}\nShould ${equal_63}:\n\t${_ms.unlazy(indent)(_ms.unlazy(inspect)(expected_45res))}\nGot:\n\t${_ms.unlazy(indent)(_ms.unlazy(inspect)(actual))}`)
				}
			},built)
		})();
		const name=exports.name=`assert`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvYXNzZXJ0Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBZ0JBLHNCQUNDO0VBR0QsK0NBQ2EsS0FBQTs7R0FBWixvQkFDQztHQUNELHNCQUNRLGVBQUE7SUFBUCxpQ0FDYyxLQUFBOztxQkFBYixDQUFFLEVBQUUsR0FBTzs7O0lBQ1osV0FDQzsyQ0FPbUIsS0FDTyxJQUFBO0tBQTFCLGlDQUNjLEtBQUE7O3NCQUFiLENBQUUsRUFBRSxHQUFPOzs7OztrQkFDWiwwQkFBQSxJQUFhLGlCQUN1QztzQkFEaEQ7O0lBQ0wsd0JBQWtCLE9BQUcsSUFBSTtHQUFBOztFQUUzQiwyREFDa0IsS0FBQTs7R0FBakIsb0JBQU07R0FDTixzQkFDUSxlQUFBO2tCQUNOLGlDQUFBLElBQWEsaUJBQ3VDO3NCQURoRDs7SUFDQSxRQUFBLEtBQUEsaUJBQ1k7S0FDaEIscURBQVMsRUFBRTtLQUNYLDZCQUFlLEVBQUU7S0FDakIsYUFBUyxrQkFBVSxLQUFLLG9CQUFTO0tBQ3pCLEtBQUEsT0FBRyxPQUFPLGdDQUNqQixHQUFDLG9EQUNZLHVCQUFZLDBCQUFlLGtCQUNoQyxxREFDVSxvRUFFQTs7OztFQUV0QiwyREFDa0IsS0FBQTs7R0FBakIsb0JBQU07R0FDTixzQkFDUSxlQUFBO0lBQVAsNkZBQ29DLEtBQUE7O3FCQUFuQyxDQUFFLEVBQUUsR0FBUTs7OztrQkFDWixpQ0FBQSxTQUFZLElBQWEsaUJBQ3VDOztzQkFEaEQ7O0lBQ1osUUFBQSxLQUFBLGlCQUNZO0tBQ2hCLHFEQUFTLEVBQUU7S0FDWCw2QkFBZSxFQUFFO0tBQ2pCLGFBQVMsSUFBSSxHQUFBO0tBQ0wsS0FBQSxTQUFPLE9BQU8sZ0NBQ3JCLEdBQUMsb0RBQ1ksdUJBQVksMEJBQWUsa0JBQ2hDLHVEQUNVLG9FQUVBOzs7O0VBM0V0Qix3QkFBQSIsImZpbGUiOiJhc3NlcnQuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==