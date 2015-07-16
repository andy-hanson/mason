"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../assert","../../at/at","../../at/at-Type","../../at/q","../../at/Map/Map","../../at/Set/Id-Setbang","../../cash","../../compare","../../Function","../../Generatorbang","../../js","../../Object","../../Try","../../Type/Impl-Type","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../../Type/Type","../../control","../../Objectbang","../../Type/Method"],function(exports,assert_0,_64_1,_64_45Type_2,_63_3,Map_4,Id_45Set_33_5,$_6,compare_7,Function_8,Generator_33_9,js_10,Object_11,Try_12,Impl_45Type_13,Kind_14,Method_15,Pred_45Type_16,Type_17,control_18,Object_33_19,Method_20){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(assert_0),assert_45call_33=_ms.get(_$2,"assert-call!"),_64=_ms.getDefaultExport(_64_1),_$4=_ms.getModule(_64_45Type_2),empty=_ms.get(_$4,"empty"),_$5=_ms.getModule(_63_3),_63_45or=_ms.get(_$5,"?-or"),Map=_ms.getDefaultExport(Map_4),Id_45Set_33=_ms.getDefaultExport(Id_45Set_33_5),$=_ms.getDefaultExport($_6),_$8=_ms.getModule($_6),$all=_ms.get(_$8,"$all"),$ing=_ms.get(_$8,"$ing"),_$9=_ms.getModule(compare_7),_61_63=_ms.get(_$9,"=?"),_$10=_ms.getModule(Function_8),noop=_ms.get(_$10,"noop"),Generator_33=_ms.getDefaultExport(Generator_33_9),_$12=_ms.getModule(js_10),defined_63=_ms.get(_$12,"defined?"),_$13=_ms.getModule(Object_11),_63p=_ms.get(_$13,"?p"),p=_ms.get(_$13,"p"),p_63=_ms.get(_$13,"p?"),_64p=_ms.get(_$13,"@p"),_64p_45all=_ms.get(_$13,"@p-all"),_$14=_ms.getModule(Try_12),$annotate_45errors=_ms.get(_$14,"$annotate-errors"),annotate_45errors=_ms.get(_$14,"annotate-errors"),_63try=_ms.get(_$14,"?try"),Impl_45Type=_ms.getDefaultExport(Impl_45Type_13),Kind=_ms.getDefaultExport(Kind_14),_$16=_ms.getModule(Kind_14),concrete_45implementors=_ms.get(_$16,"concrete-implementors"),Method=_ms.getDefaultExport(Method_15),_$17=_ms.getModule(Method_15),impl_33=_ms.get(_$17,"impl!"),impl_45for=_ms.get(_$17,"impl-for"),_$18=_ms.getModule(Pred_45Type_16),ObjLit=_ms.get(_$18,"ObjLit"),_$19=_ms.getModule(Type_17),contains_63=_ms.get(_$19,"contains?"),_$21=_ms.lazyGetModule(control_18),build=_ms.lazyProp(_$21,"build"),_$22=_ms.lazyGetModule(Object_33_19),empty_45Object_33=_ms.lazyProp(_$22,"empty-Object!"),_$23=_ms.lazyGetModule(Method_20),self_45impl_33=_ms.lazyProp(_$23,"self-impl!");
		const doc=exports.doc=`For running code in \`test\` properties.`;
		const test=exports.test=function test(){
			_ms.assert(_61_63,[`x`,`y`,`b`],_ms.unlazy(build)(function(_yield){
				const obj=function(){
					const built={};
					const a=built.a=function(){
						const built={};
						const test=built.test=function(){
							const built={};
							const x=built.x=function x(){
								return _yield(`x`)
							};
							const y=built.y=function y(){
								return _yield(`y`)
							};
							return _ms.setName(built,"test")
						}();
						return _ms.setName(built,"a")
					}();
					const b=built.b=_ms.unlazy(empty_45Object_33)();
					_ms.unlazy(self_45impl_33)(test_45special,b,function(){
						return _yield(`b`)
					});
					const c=built.c=null;
					return _ms.setName(built,"obj")
				}();
				return _64$maybe_45test(`obj`,obj,true)
			}))
		};
		const test_45special=exports["test-special"]=Method(function(){
			const built={};
			const doc=built.doc=`Something special to do with this value when the test runner reacher it.\nMay return a $.`;
			const args=built.args=1;
			const allow_45null_63=built["allow-null?"]=true;
			const _default=built.default=noop;
			return _ms.setName(built,"test-special")
		}());
		impl_33(test_45special,Impl_45Type,function(type){
			return $all(function(){
				const built=[];
				for(let prototype of _63p(type,`prototype`)){
					for(let name of _64p_45all(prototype)){
						const _63prop_45val=_63try(function(){
							return p(prototype,name)
						});
						for(let prop_45val of _63prop_45val){
							_ms.addMany(built,_64$maybe_45test(_ms.lazy(function(){
								return `${_ms.show(type)}#${_ms.show(name)}`
							}),prop_45val,false))
						}
					}
				};
				return built
			}())
		});
		impl_33(test_45special,Kind,function(_){
			return function(){
				const built=[];
				for(;;){
					_ms.addMany(built,_64$_45from_45any(impl_45for(test_45special,Impl_45Type)(_)));
					for(let test of _63p(_,`implementor-test`)){
						for(let implementor of concrete_45implementors(_)){
							_ms.addMany(built,_64$test_45test_45fun(implementor,test,_ms.lazy(function(){
								return `${_ms.show(_)}.implementor-test of ${_ms.show(implementor)}`
							}),implementor))
						}
					};
					break
				};
				return built
			}()
		});
		const $test_45all=exports["$test-all"]=function(){
			const built={};
			const doc=built.doc=`Tests all modules.`;
			return _ms.set(function $test_45all(_64all_45modules){
				_ms.checkContains(_ms.sub(_64,Object),_64all_45modules,"@all-modules");
				return $all(function(){
					const built=[];
					for(let _ of _64all_45modules){
						_ms.addMany(built,_64$test_45module(_))
					};
					return built
				}())
			},built)
		}();
		const $test_45module=exports["$test-module"]=function(){
			const built={};
			const doc=built.doc=`Treats an Object as a module and tests it.`;
			return _ms.set(function $test_45module(_module){
				_ms.checkContains(Object,_module,"module");
				return $all(_64$test_45module(_module))
			},built)
		}();
		const _64$test_45module=function _64$test_45module(_module){
			_ms.checkContains(Object,_module,"module");
			const module_45name=_63_45or(_63p(_module,`name`),`<anonymous module>`);
			return _64$maybe_45test(module_45name,_module,true)
		};
		const all_45tested=empty(Id_45Set_33);
		const _64$maybe_45test=function _64$maybe_45test(name,value,is_45module){
			return function(){
				if(_ms.bool(all_45tested.has(value))){
					return []
				} else {
					all_45tested.add(value);
					return _64$test_45single(_ms.lazy(function(){
						return _ms.unlazy(name)
					}),value,is_45module)
				}
			}()
		};
		const $test_45fun=exports["$test-fun"]=function(){
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){};
			return _ms.set(function $test_45fun(_){
				_ms.checkContains(Function,_,"_");
				return $all(_64$test_45single(`${_ms.show(_)}`,_,false))
			},built)
		}();
		const _64$test_45single=function _64$test_45single(name,value,is_45module){
			return function(){
				const built=[];
				for(;;){
					_ms.addMany(built,_64$_45from_45any(test_45special(value)));
					{
						const _=value;
						if(_ms.bool(((is_45module||_ms.contains(ObjLit,_))||_ms.contains(Function,_)))){
							for(let prop_45name of _64p(_)){
								const next_45name=_ms.lazy(function(){
									return `${_ms.show(_ms.unlazy(name))}.${_ms.show(prop_45name)}`
								});
								const prop_45val=p(_,prop_45name);
								{
									const _=prop_45name;
									if(_ms.bool(_61_63(_,`test`))){
										_ms.addMany(built,_64$test_45test_45prop(value,prop_45val,_ms.lazy(function(){
											return _ms.unlazy(next_45name)
										})))
									} else if(_ms.bool(_61_63(_,`$test`))){
										_ms.addMany(built,_64$test_45$test_45prop(prop_45val,_ms.lazy(function(){
											return _ms.unlazy(next_45name)
										})))
									} else {
										_ms.addMany(built,_64$maybe_45test(_ms.lazy(function(){
											return _ms.unlazy(next_45name)
										}),prop_45val,false))
									}
								}
							}
						} else if(_ms.bool((_ms.contains(Object,_)&&p_63(_,`test`)))){
							_ms.addMany(built,_64$test_45test_45prop(_,_.test,_ms.lazy(function(){
								return `${_ms.show(_ms.unlazy(name))}.test`
							})))
						} else {}
					};
					break
				};
				return built
			}()
		};
		const _64$test_45test_45prop=function _64$test_45test_45prop(value,value_45test,name){
			return function(){
				const built=[];
				for(;;){
					const _=value_45test;
					if(_ms.contains(Function,_)){
						_ms.addMany(built,_64$test_45test_45fun(value,value_45test,_ms.lazy(function(){
							return _ms.unlazy(name)
						})))
					};
					if(_ms.contains(ObjLit,_)){
						for(let sub_45name of _64p(_)){
							_ms.addMany(built,_64$test_45test_45prop(value,p(_,sub_45name),_ms.lazy(function(){
								return `${_ms.show(_ms.unlazy(name))}.${_ms.show(sub_45name)}`
							})))
						}
					};
					break
				};
				return built
			}()
		};
		const _64$test_45$test_45prop=function _64$test_45$test_45prop(value_45$test,name){
			_ms.checkContains(_ms.sub(Function,Generator_33),value_45$test,"value-$test");
			const built=[];
			_ms.add(built,$annotate_45errors(_ms.lazy(function(){
				return `${_ms.show(_ms.unlazy(name))}: `
			}),$ing(value_45$test)));
			return built
		};
		const _64$test_45test_45fun=function _64$test_45test_45fun(value,value_45test,name){
			const args=[].slice.call(arguments,3);
			_ms.checkContains(Function,value_45test,"value-test");
			const ano=_ms.lazy(function(){
				return `${_ms.show(_ms.unlazy(name))}: `
			});
			const _=annotate_45errors(_ms.lazy(function(){
				return _ms.unlazy(ano)
			}),function(){
				return Function.apply.call(value_45test,null,[].concat(_ms.arr(args)))
			});
			return function(){
				if(_ms.bool(_ms.contains(Map,_))){
					if(! _ms.bool(contains_63(Function,value)))throw _ms.error(function(){
						return `Test of ${_ms.show(_ms.unlazy(name))} returned a Map, but the value is not callable.`
					}());
					annotate_45errors(_ms.lazy(function(){
						return _ms.unlazy(ano)
					}),function(){
						return assert_45call_33(value,_)
					});
					return []
				} else if(_ms.bool(_ms.contains($,_))){
					return [$annotate_45errors(_ms.lazy(function(){
						return _ms.unlazy(ano)
					}),_)]
				} else if(_ms.bool(defined_63(_))){
					return annotate_45errors(_ms.lazy(function(){
						return _ms.unlazy(ano)
					}),function(){
						throw _ms.error(`Test must return Map or $.`)
					})
				} else {
					return []
				}
			}()
		};
		const _64$_45from_45any=function(){
			return function(test_45result){
				return function(){
					const _=test_45result;
					if(_ms.bool(_ms.contains(_64,_))){
						for(let _ of _){
							if(! _ms.bool(_ms.contains($,_)))throw _ms.error(`Result of test should be $, @[$], or undefined. Got: ${_ms.show(_)}`)
						};
						return _
					} else if(_ms.bool(_ms.contains($,_))){
						return [_]
					} else if(_ms.bool(defined_63(_))){
						throw _ms.error(`Result of test should be $, @[$], or undefined. Got: ${_ms.show(_)}`)
					} else {
						return []
					}
				}()
			}
		}();
		const name=exports.name=`run-tests`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL3Rlc3RzL3J1bi10ZXN0cy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQXdCQSxzQkFBTTtFQUdOLHdCQUNRLGVBQUE7Y0FBQyxPQUFHLENBQUcsSUFBSSxJQUFJLHVCQUFhLFNBQUEsT0FDSztJQUF2QyxvQkFDSzs7S0FBSiwwQkFDRTs7TUFBRCxnQ0FDSzs7T0FBSixnQkFDSSxZQUFBO2VBQUgsT0FBTzs7T0FDUixnQkFDSSxZQUFBO2VBQUgsT0FBTzs7Ozs7O0tBQ1Y7Z0NBQ1csZUFBYSxFQUNHLFVBQUE7YUFBMUIsT0FBTzs7S0FDUixnQkFBRzs7O1dBQ0osaUJBQWMsTUFBSyxJQUFJO0dBQUE7RUFBQTtFQUd6Qiw2Q0FBYyxpQkFDTTs7R0FBbkIsb0JBQ0M7R0FFRCxzQkFBTTtHQUNOLDJDQUFhO0dBQ2IsNkJBQVM7OztFQUdWLFFBQU0sZUFBYSxZQUFXLFNBQUEsS0FDSTtVQUFqQzs7WUFBVSxhQUFhLEtBQUcsS0FBTSxhQUNVO0tBQXBDLFFBQUEsUUFBUSxXQUFPLFdBQ1M7TUFDNUIsb0JBQVksT0FDTSxVQUFBO2NBQWpCLEVBQUUsVUFBVTtNQUFBO01BQ1IsUUFBQSxjQUFZLGNBQ1M7eUJBQXJCO2VBQWUsWUFBQyxrQkFBTztVQUFPLFdBQVM7TUFBQTtLQUFBO0lBQUE7Ozs7RUFHL0MsUUFBTSxlQUFhLEtBQU0sU0FBQSxFQUNDOzs7V0FFckI7dUJBQUMsa0JBQWMsV0FBUyxlQUFhLGFBQVc7S0FDOUMsUUFBQSxRQUFRLEtBQUcsRUFBRyxvQkFDaUI7TUFBOUIsUUFBQSxlQUFlLHdCQUFxQixHQUNDO3lCQUFyQyxzQkFBZ0IsWUFBWTtlQUFPLFlBQUMsbUNBQXdCO1VBQWM7TUFBQTtLQUFBO0tBQ2hGO0lBQUE7Ozs7RUFFRixpREFDVTs7R0FBVCxvQkFBTTtrQkFDTCxxQkFBQSxpQkFDc0I7OEJBRFQsSUFBRTtXQUNmOzthQUFVLEtBQUEsaUJBQ1k7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