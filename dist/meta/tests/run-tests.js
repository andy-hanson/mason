"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../bang","../../at/at","../../at/at-Type","../../at/q","../../at/Map/Map","../../at/Set/Id-Setbang","../../cash","../../compare","../../Function","../../Generatorbang","../../js","../../Object","../../Try","../../Type/Impl-Type","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../../Type/Type","../../control","../../Objectbang","../../Type/Method"],function(exports,_33_0,_64_1,_64_45Type_2,_63_3,Map_4,Id_45Set_33_5,$_6,compare_7,Function_8,Generator_33_9,js_10,Object_11,Try_12,Impl_45Type_13,Kind_14,Method_15,Pred_45Type_16,Type_17,control_18,Object_33_19,Method_20){
	exports._get=_ms.lazy(function(){
		const _33=_ms.getDefaultExport(_33_0),_$2=_ms.getModule(_33_0),_33call=_ms.get(_$2,"!call"),_64=_ms.getDefaultExport(_64_1),_$4=_ms.getModule(_64_45Type_2),empty=_ms.get(_$4,"empty"),_$5=_ms.getModule(_63_3),_63_45or=_ms.get(_$5,"?-or"),Map=_ms.getDefaultExport(Map_4),Id_45Set_33=_ms.getDefaultExport(Id_45Set_33_5),$=_ms.getDefaultExport($_6),_$8=_ms.getModule($_6),$all=_ms.get(_$8,"$all"),$ing=_ms.get(_$8,"$ing"),_$9=_ms.getModule(compare_7),_61_63=_ms.get(_$9,"=?"),_$10=_ms.getModule(Function_8),noop=_ms.get(_$10,"noop"),Generator_33=_ms.getDefaultExport(Generator_33_9),_$12=_ms.getModule(js_10),defined_63=_ms.get(_$12,"defined?"),_$13=_ms.getModule(Object_11),_63p=_ms.get(_$13,"?p"),p=_ms.get(_$13,"p"),p_63=_ms.get(_$13,"p?"),_64p=_ms.get(_$13,"@p"),_64p_45all=_ms.get(_$13,"@p-all"),_$14=_ms.getModule(Try_12),$annotate_45errors=_ms.get(_$14,"$annotate-errors"),annotate_45errors=_ms.get(_$14,"annotate-errors"),_63try=_ms.get(_$14,"?try"),Impl_45Type=_ms.getDefaultExport(Impl_45Type_13),Kind=_ms.getDefaultExport(Kind_14),_$16=_ms.getModule(Kind_14),concrete_45implementors=_ms.get(_$16,"concrete-implementors"),Method=_ms.getDefaultExport(Method_15),_$17=_ms.getModule(Method_15),impl_33=_ms.get(_$17,"impl!"),impl_45for=_ms.get(_$17,"impl-for"),_$18=_ms.getModule(Pred_45Type_16),ObjLit=_ms.get(_$18,"ObjLit"),_$19=_ms.getModule(Type_17),contains_63=_ms.get(_$19,"contains?"),_$21=_ms.lazyGetModule(control_18),build=_ms.lazyProp(_$21,"build"),_$22=_ms.lazyGetModule(Object_33_19),empty_45Object_33=_ms.lazyProp(_$22,"empty-Object!"),_$23=_ms.lazyGetModule(Method_20),self_45impl_33=_ms.lazyProp(_$23,"self-impl!");
		const doc=exports.doc=`For running code in \`test\` properties.`;
		const test=exports.test=function test(){
			_33(_61_63,[`x`,`y`,`b`],_ms.unlazy(build)(function(_yield){
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
					_33(contains_63(Function,value),_ms.lazy(function(){
						return function(){
							return `Test of ${_ms.show(_ms.unlazy(name))} returned a Map, but the value is not callable.`
						}()
					}));
					annotate_45errors(_ms.lazy(function(){
						return _ms.unlazy(ano)
					}),function(){
						return _33call(value,_)
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
							if(! _ms.bool(_ms.contains($,_))){
								throw _ms.error(`Result of test should be $, @[$], or undefined. Got: ${_ms.show(_)}`)
							}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL3Rlc3RzL3J1bi10ZXN0cy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQXdCQSxzQkFBTTtFQUdOLHdCQUNRLGVBQUE7R0FBUCxJQUFFLE9BQUcsQ0FBRyxJQUFJLElBQUksdUJBQWEsU0FBQSxPQUNLO0lBQWpDLG9CQUNLOztLQUFKLDBCQUNFOztNQUFELGdDQUNLOztPQUFKLGdCQUNJLFlBQUE7ZUFBSCxPQUFPOztPQUNSLGdCQUNJLFlBQUE7ZUFBSCxPQUFPOzs7Ozs7S0FDVjtnQ0FDVyxlQUFhLEVBQ0csVUFBQTthQUExQixPQUFPOztLQUNSLGdCQUFHOzs7V0FDSixpQkFBYyxNQUFLLElBQUk7R0FBQTtFQUFBO0VBR3pCLDZDQUFjLGlCQUNNOztHQUFuQixvQkFDQztHQUVELHNCQUFNO0dBQ04sMkNBQWE7R0FDYiw2QkFBUzs7O0VBR1YsUUFBTSxlQUFhLFlBQVcsU0FBQSxLQUNJO1VBQWpDOztZQUFVLGFBQWEsS0FBRyxLQUFNLGFBQ1U7S0FBcEMsUUFBQSxRQUFRLFdBQU8sV0FDUztNQUM1QixvQkFBWSxPQUNNLFVBQUE7Y0FBakIsRUFBRSxVQUFVO01BQUE7TUFDUixRQUFBLGNBQVksY0FDUzt5QkFBckI7ZUFBZSxZQUFDLGtCQUFPO1VBQU8sV0FBUztNQUFBO0tBQUE7SUFBQTs7OztFQUcvQyxRQUFNLGVBQWEsS0FBTSxTQUFBLEVBQ0M7OztXQUVyQjt1QkFBQyxrQkFBYyxXQUFTLGVBQWEsYUFBVztLQUM5QyxRQUFBLFFBQVEsS0FBRyxFQUFHLG9CQUNpQjtNQUE5QixRQUFBLGVBQWUsd0JBQXFCLEdBQ0M7eUJBQXJDLHNCQUFnQixZQUFZO2VBQU8sWUFBQyxtQ0FBd0I7VUFBYztNQUFBO0tBQUE7S0FDaEY7SUFBQTs7OztFQUVGLGlEQUNVOztHQUFULG9CQUFNO2tCQUNMLHFCQUFBLGlCQUNzQjs4QkFEVCxJQUFFO1dBQ2Y7O2FBQVUsS0FBQSxp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