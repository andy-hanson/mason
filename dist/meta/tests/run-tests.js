"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../bang","../../at/at","../../at/at-Type","../../at/q","../../at/Map/Map","../../at/Set/Id-Setbang","../../cash","../../Boolean","../../compare","../../Function","../../Generatorbang","../../js","../../Object","../../Try","../../Type/Impl-Type","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../../Type/Type","../../control","../../Objectbang","../../Type/Method"],function(exports,_33_0,_64_1,_64_45Type_2,_63_3,Map_4,Id_45Set_33_5,$_6,Boolean_7,compare_8,Function_9,Generator_33_10,js_11,Object_12,Try_13,Impl_45Type_14,Kind_15,Method_16,Pred_45Type_17,Type_18,control_19,Object_33_20,Method_21){
	exports._get=_ms.lazy(function(){
		const _33=_ms.getDefaultExport(_33_0),_$2=_ms.getModule(_33_0),_33call=_ms.get(_$2,"!call"),_64=_ms.getDefaultExport(_64_1),_$4=_ms.getModule(_64_45Type_2),empty=_ms.get(_$4,"empty"),_$5=_ms.getModule(_63_3),_63_45or=_ms.get(_$5,"?-or"),Map=_ms.getDefaultExport(Map_4),Id_45Set_33=_ms.getDefaultExport(Id_45Set_33_5),$=_ms.getDefaultExport($_6),_$8=_ms.getModule($_6),$all=_ms.get(_$8,"$all"),$ing=_ms.get(_$8,"$ing"),_$9=_ms.getModule(Boolean_7),and=_ms.get(_$9,"and"),or=_ms.get(_$9,"or"),_$10=_ms.getModule(compare_8),_61_63=_ms.get(_$10,"=?"),_$11=_ms.getModule(Function_9),noop=_ms.get(_$11,"noop"),Generator_33=_ms.getDefaultExport(Generator_33_10),_$13=_ms.getModule(js_11),defined_63=_ms.get(_$13,"defined?"),_$14=_ms.getModule(Object_12),_63p=_ms.get(_$14,"?p"),p=_ms.get(_$14,"p"),p_63=_ms.get(_$14,"p?"),_64p=_ms.get(_$14,"@p"),_64p_45all=_ms.get(_$14,"@p-all"),_$15=_ms.getModule(Try_13),$annotate_45errors=_ms.get(_$15,"$annotate-errors"),annotate_45errors=_ms.get(_$15,"annotate-errors"),_63try=_ms.get(_$15,"?try"),Impl_45Type=_ms.getDefaultExport(Impl_45Type_14),Kind=_ms.getDefaultExport(Kind_15),_$17=_ms.getModule(Kind_15),concrete_45implementors=_ms.get(_$17,"concrete-implementors"),Method=_ms.getDefaultExport(Method_16),_$18=_ms.getModule(Method_16),impl_33=_ms.get(_$18,"impl!"),impl_45for=_ms.get(_$18,"impl-for"),_$19=_ms.getModule(Pred_45Type_17),ObjLit=_ms.get(_$19,"ObjLit"),_$20=_ms.getModule(Type_18),contains_63=_ms.get(_$20,"contains?"),_$22=_ms.lazyGetModule(control_19),build=_ms.lazyProp(_$22,"build"),_$23=_ms.lazyGetModule(Object_33_20),empty_45Object_33=_ms.lazyProp(_$23,"empty-Object!"),_$24=_ms.lazyGetModule(Method_21),self_45impl_33=_ms.lazyProp(_$24,"self-impl!");
		const doc=exports.doc="For running code in `test` properties.";
		const test=exports.test=function test(){
			_33(_61_63,["x","y","b"],_ms.unlazy(build)(function(_yield){
				const obj=function(){
					const built={};
					const a=built.a=function(){
						const built={};
						const test=built.test=function(){
							const built={};
							const x=built.x=function x(){
								return _yield("x")
							};
							const y=built.y=function y(){
								return _yield("y")
							};
							return _ms.setName(built,"test")
						}();
						return _ms.setName(built,"a")
					}();
					const b=built.b=_ms.unlazy(empty_45Object_33)();
					_ms.unlazy(self_45impl_33)(test_45special,b,function(){
						return _yield("b")
					});
					const c=built.c=null;
					return _ms.setName(built,"obj")
				}();
				return _64$maybe_45test("obj",obj,true)
			}))
		};
		const test_45special=exports["test-special"]=Method(function(){
			const built={};
			const doc=built.doc="Something special to do with this value when the test runner reacher it.\nMay return a $.";
			const args=built.args=1;
			const allow_45null_63=built["allow-null?"]=true;
			const _default=built.default=noop;
			return _ms.setName(built,"test-special")
		}());
		impl_33(test_45special,Impl_45Type,function(type){
			return $all(function(){
				const built=[];
				for(let prototype of _63p(type,"prototype")[Symbol.iterator]()){
					for(let name of _64p_45all(prototype)[Symbol.iterator]()){
						const _63prop_45val=_63try(function(){
							return p(prototype,name)
						});
						for(let prop_45val of _63prop_45val[Symbol.iterator]()){
							_ms.addMany(built,_64$maybe_45test(_ms.lazy(function(){
								return (((""+_ms.show(type))+"#")+_ms.show(name))
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
					for(let test of _63p(_,"implementor-test")[Symbol.iterator]()){
						for(let implementor of concrete_45implementors(_)[Symbol.iterator]()){
							_ms.addMany(built,_64$test_45test_45fun(implementor,test,_ms.lazy(function(){
								return (((""+_ms.show(_))+".implementor-test of ")+_ms.show(implementor))
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
			const doc=built.doc="Tests all modules.";
			return _ms.set(function $test_45all(_64all_45modules){
				_ms.checkContains(_ms.sub(_64,Object),_64all_45modules,"@all-modules");
				return $all(function(){
					const built=[];
					for(let _ of _64all_45modules[Symbol.iterator]()){
						_ms.addMany(built,_64$test_45module(_))
					};
					return built
				}())
			},built)
		}();
		const $test_45module=exports["$test-module"]=function(){
			const built={};
			const doc=built.doc="Treats an Object as a module and tests it.";
			return _ms.set(function $test_45module(_module){
				_ms.checkContains(Object,_module,"module");
				return $all(_64$test_45module(_module))
			},built)
		}();
		const _64$test_45module=function _64$test_45module(_module){
			_ms.checkContains(Object,_module,"module");
			const module_45name=_63_45or(_63p(_module,"name"),"<anonymous module>");
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
			const doc=built.doc="TODO";
			const test=built.test=function test(){};
			return _ms.set(function $test_45fun(_){
				_ms.checkContains(Function,_,"_");
				return $all(_64$test_45single((""+_ms.show(_)),_,false))
			},built)
		}();
		const _64$test_45single=function _64$test_45single(name,value,is_45module){
			return function(){
				const built=[];
				for(;;){
					_ms.addMany(built,_64$_45from_45any(test_45special(value)));
					{
						const _=value;
						if(_ms.bool(or(is_45module,_ms.lazy(function(){
							return _ms.contains(ObjLit,_)
						}),_ms.lazy(function(){
							return _ms.contains(Function,_)
						})))){
							for(let prop_45name of _64p(_)[Symbol.iterator]()){
								const next_45name=_ms.lazy(function(){
									return (((""+_ms.show(_ms.unlazy(name)))+".")+_ms.show(prop_45name))
								});
								const prop_45val=p(_,prop_45name);
								{
									const _=prop_45name;
									if(_ms.bool(_61_63(_,"test"))){
										_ms.addMany(built,_64$test_45test_45prop(value,prop_45val,_ms.lazy(function(){
											return _ms.unlazy(next_45name)
										})))
									} else if(_ms.bool(_61_63(_,"$test"))){
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
						} else if(_ms.bool(and(_ms.contains(Object,_),_ms.lazy(function(){
							return p_63(_,"test")
						})))){
							_ms.addMany(built,_64$test_45test_45prop(_,_.test,_ms.lazy(function(){
								return ((""+_ms.show(_ms.unlazy(name)))+".test")
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
						for(let sub_45name of _64p(_)[Symbol.iterator]()){
							_ms.addMany(built,_64$test_45test_45prop(value,p(_,sub_45name),_ms.lazy(function(){
								return (((""+_ms.show(_ms.unlazy(name)))+".")+_ms.show(sub_45name))
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
				return ((""+_ms.show(_ms.unlazy(name)))+": ")
			}),$ing(value_45$test)));
			return built
		};
		const _64$test_45test_45fun=function _64$test_45test_45fun(value,value_45test,name){
			const args=[].slice.call(arguments,3);
			_ms.checkContains(Function,value_45test,"value-test");
			const ano=_ms.lazy(function(){
				return ((""+_ms.show(_ms.unlazy(name)))+": ")
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
							return (("Test of "+_ms.show(_ms.unlazy(name)))+" returned a Map, but the value is not callable.")
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
						throw _ms.error("Test must return Map or $.")
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
						for(let _ of _[Symbol.iterator]()){
							if(! _ms.bool(_ms.contains($,_))){
								throw _ms.error(("Result of test should be $, @[$], or undefined. Got: "+_ms.show(_)))
							}
						};
						return _
					} else if(_ms.bool(_ms.contains($,_))){
						return [_]
					} else if(_ms.bool(defined_63(_))){
						throw _ms.error(("Result of test should be $, @[$], or undefined. Got: "+_ms.show(_)))
					} else {
						return []
					}
				}()
			}
		}();
		const name=exports.name="run-tests";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL3Rlc3RzL3J1bi10ZXN0cy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQXlCQSxzQkFBTTtFQUdOLHdCQUNRLGVBQUE7R0FBUCxJQUFFLE9BQUcsQ0FBRyxJQUFJLElBQUksdUJBQWEsU0FBQSxPQUNLO0lBQWpDLG9CQUNLOztLQUFKLDBCQUNFOztNQUFELGdDQUNLOztPQUFKLGdCQUNJLFlBQUE7ZUFBSCxPQUFPO09BQUE7T0FDUixnQkFDSSxZQUFBO2VBQUgsT0FBTztPQUFBOzs7OztLQUNWO2dDQUNXLGVBQWEsRUFDRyxVQUFBO2FBQTFCLE9BQU87S0FBQTtLQUNSLGdCQUFHOzs7V0FDSixpQkFBYyxNQUFLLElBQUk7R0FBQTtFQUFBO0VBR3pCLDZDQUFjLGlCQUNNOztHQUFuQixvQkFDQztHQUVELHNCQUFNO0dBQ04sMkNBQWE7R0FDYiw2QkFBUzs7O0VBR1YsUUFBTSxlQUFhLFlBQVcsU0FBQSxLQUNJO1VBQWpDOztZQUFVLGFBQWEsS0FBRyxLQUFNLGdDQUNVO0tBQXBDLFFBQUEsUUFBUSxXQUFPLDhCQUNTO01BQzVCLG9CQUFZLE9BQ00sVUFBQTtjQUFqQixFQUFFLFVBQVU7TUFBQTtNQUNSLFFBQUEsY0FBWSxpQ0FDUzt5QkFBckI7ZUFBZSxHQTFDWCxZQTBDWSxxQkFBTztPQUFBLEdBQU8sV0FBUztNQUFBO0tBQUE7SUFBQTs7OztFQUcvQyxRQUFNLGVBQWEsS0FBTSxTQUFBLEVBQ0M7OztXQUVyQjt1QkFBQyxrQkFBYyxXQUFTLGVBQWEsYUFBVztLQUM5QyxRQUFBLFFBQVEsS0FBRyxFQUFHLHVDQUNpQjtNQUE5QixRQUFBLGVBQWUsd0JBQXFCLHNCQUNDO3lCQUFyQyxzQkFBZ0IsWUFBWTtlQUFPLEdBbkQvQixZQW1EZ0Msc0NBQXdCO09BQUEsR0FBYztNQUFBO0tBQUE7S0FDaEY7SUFBQTs7OztFQUVGLGlEQUNVOztHQUFULG9CQUFNO2tCQUNM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