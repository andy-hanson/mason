"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../bang","../../at/at","../../at/at-Type","../../at/q","../../at/Map/Map","../../at/Set/Id-Setbang","../../cash","../../Boolean","../../compare","../../Function","../../Generatorbang","../../js","../../Object","../../Try","../../Type/Impl-Type","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../../Type/Type","../../control","../../Objectbang","../../Type/Method"],function(exports,_33_0,_64_1,_64_45Type_2,_63_3,Map_4,Id_45Set_33_5,$_6,Boolean_7,compare_8,Function_9,Generator_33_10,js_11,Object_12,Try_13,Impl_45Type_14,Kind_15,Method_16,Pred_45Type_17,Type_18,control_19,Object_33_20,Method_21){
	exports._get=_ms.lazy(function(){
		const _33=_ms.getDefaultExport(_33_0),_$2=_ms.getModule(_33_0),_33call=_ms.get(_$2,"!call"),_64=_ms.getDefaultExport(_64_1),_$4=_ms.getModule(_64_45Type_2),empty=_ms.get(_$4,"empty"),_$5=_ms.getModule(_63_3),_63_45or=_ms.get(_$5,"?-or"),Map=_ms.getDefaultExport(Map_4),Id_45Set_33=_ms.getDefaultExport(Id_45Set_33_5),$=_ms.getDefaultExport($_6),_$8=_ms.getModule($_6),$all=_ms.get(_$8,"$all"),$ing=_ms.get(_$8,"$ing"),_$9=_ms.getModule(Boolean_7),and=_ms.get(_$9,"and"),or=_ms.get(_$9,"or"),_$10=_ms.getModule(compare_8),_61_63=_ms.get(_$10,"=?"),_$11=_ms.getModule(Function_9),noop=_ms.get(_$11,"noop"),Generator_33=_ms.getDefaultExport(Generator_33_10),_$13=_ms.getModule(js_11),defined_63=_ms.get(_$13,"defined?"),_$14=_ms.getModule(Object_12),_63p=_ms.get(_$14,"?p"),p=_ms.get(_$14,"p"),p_63=_ms.get(_$14,"p?"),_64p=_ms.get(_$14,"@p"),_64p_45all=_ms.get(_$14,"@p-all"),_$15=_ms.getModule(Try_13),$annotate_45errors=_ms.get(_$15,"$annotate-errors"),annotate_45errors=_ms.get(_$15,"annotate-errors"),Success=_ms.get(_$15,"Success"),_try=_ms.get(_$15,"try"),Impl_45Type=_ms.getDefaultExport(Impl_45Type_14),Kind=_ms.getDefaultExport(Kind_15),_$17=_ms.getModule(Kind_15),concrete_45implementors=_ms.get(_$17,"concrete-implementors"),Method=_ms.getDefaultExport(Method_16),_$18=_ms.getModule(Method_16),impl_33=_ms.get(_$18,"impl!"),impl_45for=_ms.get(_$18,"impl-for"),_$19=_ms.getModule(Pred_45Type_17),ObjLit=_ms.get(_$19,"ObjLit"),_$20=_ms.getModule(Type_18),contains_63=_ms.get(_$20,"contains?"),_$22=_ms.lazyGetModule(control_19),build=_ms.lazyProp(_$22,"build"),_$23=_ms.lazyGetModule(Object_33_20),empty_45Object_33=_ms.lazyProp(_$23,"empty-Object!"),_$24=_ms.lazyGetModule(Method_21),self_45impl_33=_ms.lazyProp(_$24,"self-impl!");
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
						const _=_try(function(){
							return _63p(prototype,name)
						});
						if(_ms.contains(Success,_)){
							for(let prop_45val of _.val[Symbol.iterator]()){
								_ms.addMany(built,_64$maybe_45test(_ms.lazy(function(){
									return (((""+_ms.show(type))+"#")+_ms.show(name))
								}),prop_45val,false))
							}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL3Rlc3RzL3J1bi10ZXN0cy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQXlCQSxzQkFBTTtFQUdOLHdCQUNRLGVBQUE7R0FBUCxJQUFFLE9BQUcsQ0FBRyxJQUFJLElBQUksdUJBQWEsU0FBQSxPQUNLO0lBQWpDLG9CQUNLOztLQUFKLDBCQUNFOztNQUFELGdDQUNLOztPQUFKLGdCQUNJLFlBQUE7ZUFBSCxPQUFPO09BQUE7T0FDUixnQkFDSSxZQUFBO2VBQUgsT0FBTztPQUFBOzs7OztLQUNWO2dDQUNXLGVBQWEsRUFDRyxVQUFBO2FBQTFCLE9BQU87S0FBQTtLQUNSLGdCQUFHOzs7V0FDSixpQkFBYyxNQUFLLElBQUk7R0FBQTtFQUFBO0VBR3pCLDZDQUFjLGlCQUNNOztHQUFuQixvQkFDQztHQUVELHNCQUFNO0dBQ04sMkNBQWE7R0FDYiw2QkFBUzs7O0VBR1YsUUFBTSxlQUFhLFlBQVcsU0FBQSxLQUNJO1VBQWpDOztZQUFVLGFBQWEsS0FBRyxLQUFNLGdDQUNVO0tBQXBDLFFBQUEsUUFBUSxXQUFPLDhCQUNTO01BRTVCLFFBQUksS0FDSyxVQUFBO2NBQVIsS0FBRyxVQUFVO01BQUE7TUFDZCxnQkFBSyxRQUFELEdBQ1E7T0FBTixRQUFBLGNBQVkseUJBQ0s7MEJBQWpCO2dCQUFlLEdBNUNaLFlBNENhLHFCQUFPO1FBQUEsR0FBTyxXQUFTO09BQUE7TUFBQTtLQUFBO0lBQUE7Ozs7RUFHaEQsUUFBTSxlQUFhLEtBQU0sU0FBQSxFQUNDOzs7V0FFckI7dUJBQUMsa0JBQWMsV0FBUyxlQUFhLGFBQVc7S0FDOUMsUUFBQSxRQUFRLEtBQUcsRUFBRyx1Q0FDaUI7TUFBOUIsUUFBQSxlQUFlLHdCQUFxQixzQkFDQzt5QkFBckMsc0JBQWdCLFlBQVk7ZUFBTyxHQXJEL0IsWUFxRGdDLHNDQUF3QjtPQUFBLEdBQWM7TUFBQTtLQUFBO0tBQ2hGO0lBQUE7Ozs7RUFFRixpREFDVTs7R0FBVCxvQkFBTTtrQkFDTCxxQkFBQSxpQkFDc0I7OEJBRFQsSUFBRTtXQUNmOzthQUFVLEtBQUEsb0NBQ1k7d0JBQWpCLGtCQUFhO0tBQUE7Ozs7O0VBRXBCLHVEQUNhOztHQUFaLG9CQUFNO2tCQUNMLHdCQUFBLFFBQ2E7c0JBRE47V0FDUCxLQUFNLGtCQUFjO0dBQUE7O0VBR3RCLHdCQUFpQiwyQkFBQSxRQUNhO3FCQUROO0dBQ3ZCLG9CQUFjLFNBQU0sS0FBRyxRQUFRLFFBQVE7VUFDdkMsaUJBQWEsY0FBWSxRQUFPO0VBQUE7RUFHakMsbUJBQWEsTUFBTTtFQUduQix1QkFBZ0IsMEJBQUEsS0FBTSxNQUFNLFlBQ1M7O0lBQ25DLFlBQUEsaUJBQWUsUUFDSztZQUFuQjtJQUFBLE9BRUc7S0FBSCxpQkFBZTtZQUNmO3dCQU5hO0tBQUEsR0FNTyxNQUFNO0lBQUE7R0FBQTtFQUFBO0VBRTdCLGlEQUNVOztHQUFULG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtrQkFDUCxxQkFBQSxFQUNVO3NCQURSO1dBQ0YsS0FBTSxrQkFBZSxDQXpGWCxZQXlGWSxJQUFJLEVBQUU7R0FBQTs7RUFFOUIsd0JBQWlCLDJCQUFBLEtBQU0sTUFBTSxZQUNTOzs7V0FFakM7dUJBQUMsa0JBQWEsZUFBYTtLQUN4QjtNQUFBLFFBQUE7TUFDTCxZQUFBLEdBQUc7MkJBQVksT0FBRDtNQUFBOzJCQUFVLFNBQUQ7TUFBQSxLQUNTO09BQTFCLFFBQUEsZUFBYSxLQUFFLHNCQUNDO1FBQXBCO2dCQUFjLEdBbEdQLHVCQTJGSyxzQkFPVTtRQUFBO1FBQ3RCLGlCQUFXLEVBQUUsRUFBRTtRQUVUO1NBQUEsUUFBQTtTQUNMLFlBQUEsT0FBRyxFQUFHLFNBQ0s7NEJBQU4sdUJBQWlCLE1BQU07OztnQkFDNUIsWUFBQSxPQUFHLEVBQUcsVUFDTTs0QkFBUCx3QkFBa0I7OztnQkFFbkI7NEJBQUM7O2FBQXdCLFdBQVM7U0FBQTtRQUFBO09BQUE7TUFBQSxPQUV6QyxZQUFBLGlCQUFLLE9BQUQ7Y0FBVSxLQUFHLEVBQUc7TUFBQSxLQUNNO3lCQUFyQix1QkFBaUIsRUFBRTtlQUFTLEVBOUd4Qix1QkEyRks7O2FBcUJWO0tBQUE7S0FDTDtJQUFBOzs7O0VBRUYsNkJBQW9CLGdDQUFBLE1BQU0sYUFBVyxLQUMwQjs7O1dBRTFEO0tBQUgsUUFBSTtLQUdKLGdCQUFLLFNBQUQsR0FDUzt3QkFBUixzQkFBZ0IsTUFBTTt5QkFQUTtNQUFBO0tBQUE7S0FRbkMsZ0JBQUssT0FBRCxHQUNPO01BQUwsUUFBQSxjQUFZLEtBQUUsc0JBQ0M7eUJBQWYsdUJBQWlCLE1BQU8sRUFBRSxFQUFFO2VBQVksR0E3SHBDLHVCQW1IeUIsc0JBVW1CO09BQUE7TUFBQTtLQUFBO0tBQ3REO0lBQUE7Ozs7RUFFRiw4QkFBcUIsaUNBQUEsY0FBaUMsS0FDSzs2QkFEMUIsU0FBUzs7aUJBQ3ZDO1dBQW1CLEVBaklWLHVCQWdJMEM7TUFDckIsS0FBSzs7O0VBRXRDLDRCQUFtQiwrQkFBQSxNQUFNLGFBQW9CLEtBQ2E7O3FCQUR0QjtHQUNuQztXQUFRLEVBcElHLHVCQW1JaUM7O0dBRTVDLFFBQUk7O01BQ3NCLFVBQUE7K0JBQXpCLG9DQUFXO0dBQUE7O0lBRVgseUJBQUMsSUFBRCxJQUNJO0tBQUgsSUFBRyxZQUFVLFNBQVM7dUJBQ1E7Y0FBNUIsaUNBUHdDOzs7S0FRMUM7O1FBQ3NCLFVBQUE7YUFBckIsUUFBTSxNQUFNO0tBQUE7WUFDYjtJQUFBLE9BQ0QseUJBQUMsRUFBRCxJQUNFO1lBQUQsQ0FBRzs7UUFBc0I7SUFBQSxPQUMxQixZQUFBLFdBQVEsSUFDQztZQUFSOztRQUN1QixVQUFBO01BQXRCLGdCQUFRO0tBQUE7SUFBQSxPQUVOO1lBQUg7SUFBQTtHQUFBO0VBQUE7RUFFSCxrQ0FDYTtVQUFYLFNBQUEsY0FDVzs7S0FBTixRQUFBO0tBQ0oseUJBQUMsSUFBRCxJQUNFO01BQUksUUFBQSxLQUFBLHFCQUNDO09BQUwsMkJBQVMsRUFBRCxJQUNFO1FBQVQsZ0JBQVEsa0VBQXNEO09BQUE7TUFBQTthQUNoRTtLQUFBLE9BQ0QseUJBQUMsRUFBRCxJQUNFO2FBQUQsQ0FBRTtLQUFBLE9BQ0gsWUFBQSxXQUFRLElBQ0M7TUFBUixnQkFBUSxrRUFBc0Q7S0FBQSxPQUUzRDthQUFIO0tBQUE7SUFBQTtHQUFBO0VBQUE7RUFyTEosd0JBQUEiLCJmaWxlIjoibWV0YS90ZXN0cy9ydW4tdGVzdHMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==