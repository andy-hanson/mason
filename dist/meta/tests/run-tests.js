"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../assert","../../at/at","../../at/at-Type","../../at/q","../../at/Map/Id-Map","../../at/Map/Map","../../at/Set/Id-Set","../../cash","../../compare","../../Function","../../Generator","../../js","../../Object","../../Try","../../Type/Impl-Type","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../../Type/Type","../../control","../../Object","../../Type/Method"],(exports,assert_0,_64_1,_64_45Type_2,_63_3,Id_45Map_4,Map_5,Id_45Set_6,$_7,compare_8,Function_9,Generator_10,js_11,Object_12,Try_13,Impl_45Type_14,Kind_15,Method_16,Pred_45Type_17,Type_18,control_19,Object_20,Method_21)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(assert_0),assert_45call_33=_ms.get(_$2,"assert-call!"),assert_45this_45call_33=_ms.get(_$2,"assert-this-call!"),_64=_ms.getDefaultExport(_64_1),_$4=_ms.getModule(_64_45Type_2),empty=_ms.get(_$4,"empty"),_$5=_ms.getModule(_63_3),_63_45or=_ms.get(_$5,"?-or"),Id_45Map=_ms.getDefaultExport(Id_45Map_4),Map=_ms.getDefaultExport(Map_5),Id_45Set=_ms.getDefaultExport(Id_45Set_6),$=_ms.getDefaultExport($_7),_$9=_ms.getModule($_7),$all=_ms.get(_$9,"$all"),$ing=_ms.get(_$9,"$ing"),_$10=_ms.getModule(compare_8),_61_63=_ms.get(_$10,"=?"),_$11=_ms.getModule(Function_9),noop=_ms.get(_$11,"noop"),Generator=_ms.getDefaultExport(Generator_10),_$13=_ms.getModule(js_11),defined_63=_ms.get(_$13,"defined?"),_$14=_ms.getModule(Object_12),_63p=_ms.get(_$14,"?p"),p=_ms.get(_$14,"p"),p_63=_ms.get(_$14,"p?"),_64p=_ms.get(_$14,"@p"),_64p_45all=_ms.get(_$14,"@p-all"),_$15=_ms.getModule(Try_13),$annotate_45errors=_ms.get(_$15,"$annotate-errors"),annotate_45errors=_ms.get(_$15,"annotate-errors"),_63try=_ms.get(_$15,"?try"),Impl_45Type=_ms.getDefaultExport(Impl_45Type_14),Kind=_ms.getDefaultExport(Kind_15),_$17=_ms.getModule(Kind_15),concrete_45implementors=_ms.get(_$17,"concrete-implementors"),Method=_ms.getDefaultExport(Method_16),_$18=_ms.getModule(Method_16),impl_33=_ms.get(_$18,"impl!"),impl_45for=_ms.get(_$18,"impl-for"),_$19=_ms.getModule(Pred_45Type_17),ObjLit=_ms.get(_$19,"ObjLit"),_$20=_ms.getModule(Type_18),contains_63=_ms.get(_$20,"contains?"),_$22=_ms.lazyGetModule(control_19),build=_ms.lazyProp(_$22,"build"),_$23=_ms.lazyGetModule(Object_20),empty_45Object_33=_ms.lazyProp(_$23,"empty-Object!"),_$24=_ms.lazyGetModule(Method_21),self_45impl_33=_ms.lazyProp(_$24,"self-impl!");
		const doc=exports.doc=`For running code in \`test\` properties.`;
		const test=exports.test=function test(){
			_ms.assert(_61_63,[`x`,`y`,`b`],_ms.unlazy(build)(_yield=>{
				const obj=(()=>{
					const built={};
					const a=built.a=(()=>{
						const built={};
						const test=built.test=(()=>{
							const built={};
							const x=built.x=function x(){
								_yield(`x`)
							};
							const y=built.y=function y(){
								_yield(`y`)
							};
							return _ms.setName(built,"test")
						})();
						return _ms.setName(built,"a")
					})();
					const b=built.b=_ms.unlazy(empty_45Object_33)();
					_ms.unlazy(self_45impl_33)(test_45special,b,()=>{
						_yield(`b`)
					});
					const c=built.c=null;
					return _ms.setName(built,"obj")
				})();
				return _64$maybe_45test(`obj`,obj,true)
			}))
		};
		const test_45special=exports["test-special"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`Something special to do with this value when the test runner reacher it.\nMay return a $.`;
			const args=built.args=1;
			const allow_45null_63=built["allow-null?"]=true;
			const _default=built.default=noop;
			return _ms.setName(built,"test-special")
		})());
		impl_33(test_45special,Impl_45Type,function(){
			const _this=this;
			return $all((()=>{
				const built=[];
				for(let prototype of _63p(_this,`prototype`)){
					for(let name of _64p_45all(prototype)){
						const _63prop_45val=_63try(()=>{
							return p(prototype,name)
						});
						for(let proto_45fun of _63prop_45val){
							_ms.addMany(built,_64$maybe_45test(_ms.lazy(()=>{
								return `${_this.name}#${name.toString()}`
							}),proto_45fun,false,true))
						}
					}
				};
				return built
			})())
		});
		impl_33(test_45special,Kind,function(){
			const _this=this;
			return (()=>{
				const built=[];
				for(;;){
					_ms.addMany(built,_64$_45from_45any(impl_45for(test_45special,Impl_45Type)(_this)));
					for(let test of _63p(_this,`implementor-test`)){
						for(let implementor of concrete_45implementors(_this)){
							_ms.addMany(built,_64$test_45test_45fun(implementor,test,_ms.lazy(()=>{
								return `${_this}.implementor-test of ${implementor}`
							}),false,implementor))
						}
					};
					break
				};
				return built
			})()
		});
		const $test_45all=exports["$test-all"]=(()=>{
			const built={};
			const doc=built.doc=`Tests all modules.`;
			return _ms.set(function $test_45all(_64all_45modules){
				_ms.checkContains(_64,_64all_45modules,"@all-modules");
				return $all((()=>{
					const built=[];
					for(let _ of _64all_45modules){
						_ms.addMany(built,_64$test_45module(_))
					};
					return built
				})())
			},built)
		})();
		const $test_45module=exports["$test-module"]=(()=>{
			const built={};
			const doc=built.doc=`Treats an Object as a module and tests it.`;
			return _ms.set(function $test_45module(_45module){
				_ms.checkContains(Object,_45module,"-module");
				return $all(_64$test_45module(_45module))
			},built)
		})();
		const _64$test_45module=function _64$test_45module(_45module){
			_ms.checkContains(Object,_45module,"-module");
			const module_45name=_63_45or(_63p(_45module,`name`),`<anonymous module>`);
			return _64$maybe_45test(module_45name,_45module,true)
		};
		const all_45tested=empty(Id_45Set);
		const _64$maybe_45test=function _64$maybe_45test(name,value,is_45module,is_45proto_45prop){
			return (()=>{
				if(all_45tested.has(value)){
					return []
				} else {
					all_45tested.add(value);
					return _64$test_45single(_ms.lazy(()=>{
						return _ms.unlazy(name)
					}),value,is_45module,is_45proto_45prop)
				}
			})()
		};
		const $test_45fun=exports["$test-fun"]=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){};
			return _ms.set(function $test_45fun(_){
				_ms.checkContains(Function,_,"_");
				return $all(_64$test_45single(`${_}`,_,false,false))
			},built)
		})();
		const $test_45single=exports["$test-single"]=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){};
			return _ms.set(function $test_45single(_){
				return $all(_64$test_45single("",_,false,false))
			},built)
		})();
		const _64$test_45single=function _64$test_45single(name,value,is_45module,is_45proto_45prop){
			return (()=>{
				const built=[];
				for(;;){
					_ms.addMany(built,_64$_45from_45any(test_45special(value)));
					{
						const _=value;
						if(((is_45module||_ms.contains(ObjLit,_))||_ms.contains(Function,_))){
							for(let prop_45name of _64p(_)){
								const next_45name=_ms.lazy(()=>{
									return `${_ms.unlazy(name)}.${prop_45name}`
								});
								const prop_45val=p(_,prop_45name);
								{
									const _=prop_45name;
									if(_61_63(_,`test`)){
										_ms.addMany(built,_64$test_45test_45prop(value,prop_45val,_ms.lazy(()=>{
											return _ms.unlazy(next_45name)
										}),is_45proto_45prop))
									} else if(_61_63(_,`$test`)){
										_ms.addMany(built,_64$test_45$test_45prop(prop_45val,_ms.lazy(()=>{
											return _ms.unlazy(next_45name)
										}),is_45proto_45prop))
									} else {
										_ms.addMany(built,_64$maybe_45test(_ms.lazy(()=>{
											return _ms.unlazy(next_45name)
										}),prop_45val,false,false))
									}
								}
							}
						} else if((_ms.contains(Object,_)&&p_63(_,`test`))){
							_ms.addMany(built,_64$test_45test_45prop(_,_.test,_ms.lazy(()=>{
								return `${_ms.unlazy(name)}.test`
							}),false))
						} else {}
					};
					break
				};
				return built
			})()
		};
		const _64$test_45test_45prop=function _64$test_45test_45prop(value,value_45test,name,is_45proto_45prop){
			return (()=>{
				const built=[];
				for(;;){
					const _=value_45test;
					if(_ms.contains(Function,_)){
						_ms.addMany(built,_64$test_45test_45fun(value,value_45test,_ms.lazy(()=>{
							return _ms.unlazy(name)
						}),is_45proto_45prop))
					};
					if(_ms.contains(ObjLit,_)){
						for(let sub_45name of _64p(_)){
							_ms.addMany(built,_64$test_45test_45prop(value,p(_,sub_45name),_ms.lazy(()=>{
								return `${_ms.unlazy(name)}.${sub_45name}`
							}),false))
						}
					};
					break
				};
				return built
			})()
		};
		const _64$test_45$test_45prop=function _64$test_45$test_45prop(value_45$test,name){
			_ms.checkContains(_ms.sub(Function,Generator),value_45$test,"value-$test");
			const built=[];
			_ms.add(built,$annotate_45errors(_ms.lazy(()=>{
				return `${_ms.unlazy(name)}: `
			}),$ing(value_45$test)));
			return built
		};
		const _64$test_45test_45fun=function _64$test_45test_45fun(value,value_45test,name,is_45proto_45prop){
			const args=[].slice.call(arguments,4);
			_ms.checkContains(Function,value_45test,"value-test");
			const ano=_ms.lazy(()=>{
				return `${_ms.unlazy(name)}: `
			});
			const _=annotate_45errors(_ms.lazy(()=>{
				return _ms.unlazy(ano)
			}),()=>{
				return value_45test(...args)
			});
			return (()=>{
				if((_ms.contains(Map,_)||_ms.contains(Id_45Map,_))){
					if(! contains_63(Function,value))throw _ms.error((()=>{
						return `Test of ${_ms.unlazy(name)} returned a Map, but the value is not callable.`
					})());
					annotate_45errors(_ms.lazy(()=>{
						return _ms.unlazy(ano)
					}),()=>{
						if(is_45proto_45prop){
							assert_45this_45call_33(value,_)
						} else {
							assert_45call_33(value,_)
						}
					});
					return []
				} else if(_ms.contains($,_)){
					return [$annotate_45errors(_ms.lazy(()=>{
						return _ms.unlazy(ano)
					}),_)]
				} else if(defined_63(_)){
					return annotate_45errors(_ms.lazy(()=>{
						return _ms.unlazy(ano)
					}),()=>{
						throw _ms.error(`Test must return Map or $.`)
					})
				} else {
					return []
				}
			})()
		};
		const _64$_45from_45any=function _64$_45from_45any(test_45result){
			return (()=>{
				const _=test_45result;
				if(_ms.contains(_64,_)){
					for(let elem of _){
						if(! contains_63($,elem))throw _ms.error(`Result of test should be $, @[$], or undefined.\nGot @ containing: ${elem}`)
					};
					return _
				} else if(_ms.contains($,_)){
					return [_]
				} else if(defined_63(_)){
					throw _ms.error(`Result of test should be $, @[$], or undefined. Got: ${_}`)
				} else {
					return []
				}
			})()
		};
		const name=exports.name=`run-tests`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvbWV0YS90ZXN0cy9ydW4tdGVzdHMubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUF5QkEsc0JBQU07RUFHTix3QkFDUSxlQUFBO2NBQUMsT0FBRyxDQUFHLElBQUksSUFBSSx1QkFBYSxRQUNLO0lBQXZDLFVBQ0ssS0FBQTs7S0FBSixnQkFDRSxLQUFBOztNQUFELHNCQUNLLEtBQUE7O09BQUosZ0JBQ0ssWUFBQTtRQUFKLE9BQU87O09BQ1IsZ0JBQ0ssWUFBQTtRQUFKLE9BQU87Ozs7OztLQUNWO2dDQUNXLGVBQWEsRUFDSSxJQUFBO01BQTNCLE9BQU87O0tBQ1IsZ0JBQUc7OztXQUNKLGlCQUFjLE1BQUssSUFBSTtHQUFBO0VBQUE7RUFHekIsNkNBQWMsS0FBSSxRQUNNLEtBQUE7O0dBQXZCLG9CQUNDO0dBRUQsc0JBQU07R0FDTiwyQ0FBYTtHQUNiLDZCQUFTOzs7RUFHVixRQUFNLGVBQWEsWUFDWSxVQUFBO1NBb0JhO1VBcEIzQyxLQUFVOztZQUFBLGFBQWEsS0FvQm9CLE1BcEJYLGFBQ1U7S0FBcEMsUUFBQSxRQUFRLFdBQU8sV0FDUztNQUM1QixvQkFBWSxPQUNNLElBQUE7Y0FBakIsRUFBRSxVQUFVO01BQUE7TUFDUixRQUFBLGVBQWEsY0FDUzt5QkFJdEI7ZUFBZSxHQVVxQixjQVZSO1VBQWtCLFlBQVUsTUFBTTtNQUFBO0tBQUE7SUFBQTs7OztFQUl0RSxRQUFNLGVBQWEsS0FDTyxVQUFBO1NBS2tCO1VBSHZDOztXQUFBO3VCQUFDLGtCQUFjLFdBQVMsZUFBYSxhQUdFO0tBRnJDLFFBQUEsUUFBUSxLQUU2QixNQUZwQixvQkFDaUI7TUFBakMsUUFBQSxlQUFlLHdCQUNxQixPQUFLO3lCQUF6QyxzQkFBZ0IsWUFBWTtlQUFPLEdBQUMsNkJBQTJCO1VBQWMsTUFBTTtNQUFBO0tBQUE7S0FDekY7SUFBQTs7OztFQUVGLHVDQUNVLEtBQUE7O0dBQVQsb0JBQU07a0JBQ0wscUJBQUEsaUJBQ2dDO3NCQURuQjtXQUNiLEtBQVU7O2FBQUEsS0FBQSxpQkFDWTt3QkFBakIsa0JBQWE7S0FBQTs7Ozs7RUFFcEIsNkNBQ2EsS0FBQTs7R0FBWixvQkFBTTtrQkFDTCx3QkFBQSxVQUNjO3NCQUROO1dBQ1IsS0FBTSxrQkFBYztHQUFBOztFQUd0Qix3QkFBaUIsMkJBQUEsVUFDYztxQkFETjtHQUN4QixvQkFBYyxTQUFNLEtBQUcsVUFBUyxRQUFRO1VBQ3hDLGlCQUFhLGNBQVksVUFBUTtFQUFBO0VBR2xDLG1CQUFhLE1BQU07RUFHbkIsdUJBQWdCLDBCQUFBLEtBQU0sTUFBTSxZQUFVLGtCQUNhO1VBQzlDO0lBQUgsR0FBQSxpQkFBZSxPQUNLO1lBQW5CO0lBQUEsT0FFRztLQUFILGlCQUFlO1lBQ2Y7O1FBQW9CLE1BQU0sWUFBVTtJQUFBO0dBQUE7RUFBQTtFQUV2Qyx1Q0FDVSxLQUFBOztHQUFULG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtrQkFDUCxxQkFBQSxFQUNVO3NCQURSO1dBQ0YsS0FBTSxrQkFBZSxHQUFDLElBQUksRUFBRSxNQUFNO0dBQUE7O0VBRXBDLDZDQUNhLEtBQUE7O0dBQVosb0JBQU07R0FDTixzQkFDUSxlQUFBO2tCQUNQLHdCQUFBLEVBQ0M7V0FBRCxLQUFNLGtCQUFlLEdBQUUsRUFBRSxNQUFNO0dBQUE7O0VBRWpDLHdCQUFpQiwyQkFBQSxLQUFNLE1BQU0sWUFBVSxrQkFDYTtVQUUvQzs7V0FBQTt1QkFBQyxrQkFBYSxlQUFhO0tBQ3hCO01BQUEsUUFBQTtNQUNMLEdBQUEsRUFBRywwQkFBVyxPQUFELGtCQUFTLFNBQUQsSUFDUztPQUF4QixRQUFBLGVBQWEsS0FBRSxHQUNDO1FBQXBCO2dCQUFjLHVCQUFROztRQUN0QixpQkFBVyxFQUFFLEVBQUU7UUFFVDtTQUFBLFFBQUE7U0FDTCxHQUFBLE9BQUcsRUFBRyxRQUNLOzRCQUFOLHVCQUFpQixNQUFNOzthQUFvQjtTQUFBLE9BQ2hELEdBQUEsT0FBRyxFQUFHLFNBQ007NEJBQVAsd0JBQWtCOzthQUFvQjtTQUFBLE9BRXZDOzRCQUFDOzthQUF3QixXQUFTLE1BQU07U0FBQTtRQUFBO09BQUE7TUFBQSxPQUUvQyxHQUFBLGNBQUssT0FBRCxJQUFTLEtBQUcsRUFBRyxTQUNNO3lCQUFwQix1QkFBaUIsRUFBRTtlQUFTO1VBQWE7TUFBQSxPQUUxQztLQUFBO0tBQ0w7SUFBQTs7OztFQUVGLDZCQUFvQixnQ0FBQSxNQUFNLGFBQVcsS0FBTSxrQkFDa0M7VUFFeEU7O1dBQUE7S0FBSCxRQUFJO0tBR0osZ0JBQUssU0FBRCxHQUNTO3dCQUFSLHNCQUFnQixNQUFNOztTQUFpQjtLQUFBO0tBQzVDLGdCQUFLLE9BQUQsR0FDTztNQUFMLFFBQUEsY0FBWSxLQUFFLEdBQ0M7eUJBQWYsdUJBQWlCLE1BQU8sRUFBRSxFQUFFO2VBQVksdUJBQVE7VUFBVztNQUFBO0tBQUE7S0FDakU7SUFBQTs7OztFQUVGLDhCQUFxQixpQ0FBQSxjQUFnQyxLQUNLOzZCQUR6QixTQUFTOztpQkFDdkM7V0FBbUI7TUFBVyxLQUFLOzs7RUFFdEMsNEJBQW1CLCtCQUFBLE1BQU0sYUFBb0IsS0FBTSxrQkFDcUI7O3FCQURwQztHQUNuQztXQUFROztHQUNSLFFBQUk7O01BQ3NCLElBQUE7V0FBekIsYUFBVyxHQUFBO0dBQUE7VUFFUjtJQUNILEdBQUEsY0FBSSxJQUFELGlCQUFNLFNBQUQsSUFDTztLQUFOLEtBQUEsWUFBVSxTQUFTLHVCQUNZLEtBQUE7YUFBckM7O0tBQ0Y7O1FBQ3VCLElBQUE7TUFDakIsR0FBSixrQkFDYTtPQUFaLHdCQUFrQixNQUFNO01BQUEsT0FFckI7T0FBSCxpQkFBYSxNQUFNO01BQUE7S0FBQTtZQUN0QjtJQUFBLE9BQ0QsZ0JBQUMsRUFBRCxHQUNFO1lBQUQsQ0FBRzs7UUFBc0I7SUFBQSxPQUMxQixHQUFBLFdBQVEsR0FDQztZQUFSOztRQUN1QixJQUFBO01BQXRCLGdCQUFROztXQUVOO1lBQUg7SUFBQTtHQUFBO0VBQUE7RUFFSCx3QkFBZSwyQkFBQSxjQUNXO1VBQXBCO0lBQUEsUUFBQTtJQUNKLGdCQUFDLElBQUQsR0FDRTtLQUFJLFFBQUEsUUFBUSxFQUNDO01BQUwsS0FBQSxZQUFVLEVBQUUsc0JBQ25CLHNFQUNtQjs7WUFDckI7SUFBQSxPQUNELGdCQUFDLEVBQUQsR0FDRTtZQUFELENBQUU7SUFBQSxPQUNILEdBQUEsV0FBUSxHQUNDO0tBQVIsZ0JBQVEsd0RBQXNEO1dBRTNEO1lBQUg7SUFBQTtHQUFBO0VBQUE7RUFwTUgsd0JBQUEiLCJmaWxlIjoibWV0YS90ZXN0cy9ydW4tdGVzdHMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==