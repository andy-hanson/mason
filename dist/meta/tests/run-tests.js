"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../bang","../../at/at","../../at/at-Type","../../at/q","../../at/Map/Map","../../at/Set/Id-Setbang","../../cash","../../Boolean","../../compare","../../control","../../Function","../../Generatorbang","../../js","../../Object","../../Try","../../Type/Impl-Type","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../../Type/Type","../../control","../../Objectbang","../../Type/Method"],function(exports,_33_0,_64_1,_64_45Type_2,_63_3,Map_4,Id_45Set_33_5,$_6,Boolean_7,compare_8,control_9,Function_10,Generator_33_11,js_12,Object_13,Try_14,Impl_45Type_15,Kind_16,Method_17,Pred_45Type_18,Type_19,control_20,Object_33_21,Method_22){
	exports._get=_ms.lazy(function(){
		const _33=_ms.getDefaultExport(_33_0),_$2=_ms.getModule(_33_0),_33call=_ms.get(_$2,"!call"),_64=_ms.getDefaultExport(_64_1),_$3=_ms.getModule(_64_1),_43_43=_ms.get(_$3,"++"),flatten=_ms.get(_$3,"flatten"),flat_45map=_ms.get(_$3,"flat-map"),map=_ms.get(_$3,"map"),_$4=_ms.getModule(_64_45Type_2),empty=_ms.get(_$4,"empty"),_$5=_ms.getModule(_63_3),_63_45or=_ms.get(_$5,"?-or"),Map=_ms.getDefaultExport(Map_4),Id_45Set_33=_ms.getDefaultExport(Id_45Set_33_5),$=_ms.getDefaultExport($_6),_$8=_ms.getModule($_6),$all=_ms.get(_$8,"$all"),$ing=_ms.get(_$8,"$ing"),_$9=_ms.getModule(Boolean_7),and=_ms.get(_$9,"and"),or=_ms.get(_$9,"or"),_$10=_ms.getModule(compare_8),_61_63=_ms.get(_$10,"=?"),_$11=_ms.getModule(control_9),_if=_ms.get(_$11,"if"),_$12=_ms.getModule(Function_10),noop=_ms.get(_$12,"noop"),Generator_33=_ms.getDefaultExport(Generator_33_11),_$14=_ms.getModule(js_12),defined_63=_ms.get(_$14,"defined?"),_$15=_ms.getModule(Object_13),_63p=_ms.get(_$15,"?p"),p=_ms.get(_$15,"p"),p_63=_ms.get(_$15,"p?"),_64p=_ms.get(_$15,"@p"),_64p_45all=_ms.get(_$15,"@p-all"),_$16=_ms.getModule(Try_14),$annotate_45errors=_ms.get(_$16,"$annotate-errors"),annotate_45errors=_ms.get(_$16,"annotate-errors"),oh_45no_33=_ms.get(_$16,"oh-no!"),Success=_ms.get(_$16,"Success"),_try=_ms.get(_$16,"try"),Impl_45Type=_ms.getDefaultExport(Impl_45Type_15),Kind=_ms.getDefaultExport(Kind_16),_$18=_ms.getModule(Kind_16),concrete_45implementors=_ms.get(_$18,"concrete-implementors"),Method=_ms.getDefaultExport(Method_17),_$19=_ms.getModule(Method_17),impl_33=_ms.get(_$19,"impl!"),impl_45for=_ms.get(_$19,"impl-for"),_$20=_ms.getModule(Pred_45Type_18),ObjLit=_ms.get(_$20,"ObjLit"),_$21=_ms.getModule(Type_19),contains_63=_ms.get(_$21,"contains?"),_$23=_ms.lazyGetModule(control_20),build=_ms.lazyProp(_$23,"build"),_$24=_ms.lazyGetModule(Object_33_21),empty_45Object_33=_ms.lazyProp(_$24,"empty-Object!"),_$25=_ms.lazyGetModule(Method_22),self_45impl_33=_ms.lazyProp(_$25,"self-impl!");
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
			return $all(flat_45map(_63p(type,"prototype"),function(prototype){
				return flat_45map(_64p_45all(prototype),function(name){
					const x=_try(function(){
						return _63p(prototype,name)
					});
					return function(){
						const _=x;
						if(_ms.bool(_ms.contains(Success,_))){
							return flat_45map(_.val,function(val){
								return _64$maybe_45test(_ms.lazy(function(){
									return (((""+_ms.show(type))+"#")+_ms.show(name))
								}),val,false)
							})
						} else {
							return []
						}
					}()
				})
			}))
		});
		impl_33(test_45special,Kind,function(_){
			const a=_64$_45from_45any(impl_45for(test_45special,Impl_45Type)(_));
			const b=flat_45map(_63p(_,"implementor-test"),function(test){
				_ms.checkContains(Function,test,"test");
				return flat_45map(concrete_45implementors(_),function(implementor){
					return _64$test_45test_45fun(implementor,test,_ms.lazy(function(){
						return (((""+_ms.show(_))+".implementor-test of ")+_ms.show(implementor))
					}),implementor)
				})
			});
			return _43_43(a,b)
		});
		const $test_45all=exports["$test-all"]=function(){
			const built={};
			const doc=built.doc="Tests all modules.";
			return _ms.set(function $test_45all(_64all_45modules){
				_ms.checkContains(_ms.sub(_64,Object),_64all_45modules,"@all-modules");
				return $all(flat_45map(_64all_45modules,_64$test_45module))
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
			const a=test_45special(value);
			const b=function(){
				const _=value;
				if(_ms.bool(or(is_45module,_ms.lazy(function(){
					return _ms.contains(ObjLit,_)
				}),_ms.lazy(function(){
					return _ms.contains(Function,_)
				})))){
					return flat_45map(_64p(_),function(prop_45name){
						const next_45name=_ms.lazy(function(){
							return (((""+_ms.show(_ms.unlazy(name)))+".")+_ms.show(prop_45name))
						});
						const prop_45val=p(_,prop_45name);
						return function(){
							const _=prop_45name;
							if(_ms.bool(_61_63(_,"test"))){
								return _64$test_45test_45prop(value,prop_45val,_ms.lazy(function(){
									return _ms.unlazy(next_45name)
								}))
							} else if(_ms.bool(_61_63(_,"$test"))){
								return _64$test_45$test_45prop(prop_45val,_ms.lazy(function(){
									return _ms.unlazy(next_45name)
								}))
							} else {
								return _64$maybe_45test(_ms.lazy(function(){
									return _ms.unlazy(next_45name)
								}),prop_45val,false)
							}
						}()
					})
				} else if(_ms.bool(and(_ms.contains(Object,_),_ms.lazy(function(){
					return p_63(_,"test")
				})))){
					return _64$test_45test_45prop(_,_.test,_ms.lazy(function(){
						return ((""+_ms.show(_ms.unlazy(name)))+".test")
					}))
				} else {
					return []
				}
			}();
			return _43_43(_64$_45from_45any(a),b)
		};
		const _64$test_45test_45prop=function _64$test_45test_45prop(value,value_45test,name){
			const _=value_45test;
			const _64$a=flatten(_if(_ms.contains(Function,_),_ms.lazy(function(){
				return _64$test_45test_45fun(value,value_45test,_ms.lazy(function(){
					return _ms.unlazy(name)
				}))
			})));
			const _64$b=flatten(_if(_ms.contains(ObjLit,_),_ms.lazy(function(){
				return flat_45map(_64p(_),function(sub_45name){
					return _64$test_45test_45prop(value,p(_,sub_45name),_ms.lazy(function(){
						return (((""+_ms.show(_ms.unlazy(name)))+".")+_ms.show(sub_45name))
					}))
				})
			})));
			return _43_43(_64$a,_64$b)
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
						oh_45no_33("Test must return Map or $.")
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
						return map(_,function(_){
							return function(){
								if(_ms.bool(_ms.contains($,_))){
									return _
								} else {
									return oh_45no_33(("Result of test should be $, @[$], or undefined. Got: "+_ms.show(_)))
								}
							}()
						})
					} else if(_ms.bool(_ms.contains($,_))){
						return [_]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL3Rlc3RzL3J1bi10ZXN0cy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQTBCQSxzQkFBTTtFQUdOLHdCQUNRLGVBQUE7R0FBUCxJQUFFLE9BQUcsQ0FBRyxJQUFJLElBQUksdUJBQWEsU0FBQSxPQUNLO0lBQWpDLG9CQUNLOztLQUFKLDBCQUNFOztNQUFELGdDQUNLOztPQUFKLGdCQUNJLFlBQUE7ZUFBSCxPQUFPO09BQUE7T0FDUixnQkFDSSxZQUFBO2VBQUgsT0FBTztPQUFBOzs7OztLQUNWO2dDQUNXLGVBQWEsRUFDRyxVQUFBO2FBQTFCLE9BQU87S0FBQTtLQUNSLGdCQUFHOzs7V0FDSixpQkFBYyxNQUFLLElBQUk7R0FBQTtFQUFBO0VBR3pCLDZDQUFjLGlCQUNNOztHQUFuQixvQkFDQztHQUVELHNCQUFNO0dBQ04sMkNBQWE7R0FDYiw2QkFBUzs7O0VBR1YsUUFBTSxlQUFhLFlBQVcsU0FBQSxLQUNJO1VBQWpDLEtBQU0sV0FBVSxLQUFHLEtBQU0sYUFBYSxTQUFBLFVBQ1M7V0FBOUMsV0FBVSxXQUFPLFdBQVksU0FBQSxLQUNJO0tBRWhDLFFBQUksS0FDSyxVQUFBO2FBQVIsS0FBRyxVQUFVO0tBQUE7O01BQ1QsUUFBQTtNQUNKLHlCQUFDLFFBQUQsSUFDUTtjQUFQLFdBQVMsTUFBTyxTQUFBLElBQ0c7ZUFBbEI7Z0JBQWUsR0E3Q1QsWUE2Q1UscUJBQU87UUFBQSxHQUFPLElBQUk7T0FBQTtNQUFBLE9BRWhDO2NBQUg7TUFBQTtLQUFBO0lBQUE7R0FBQTtFQUFBO0VBR0wsUUFBTSxlQUFhLEtBQU0sU0FBQSxFQUNDO0dBQXpCLFFBQUksa0JBQWMsV0FBUyxlQUFhLGFBQVc7R0FDbkQsUUFBSSxXQUFVLEtBQUcsRUFBRyxvQkFBb0IsU0FBQSxLQUNhO3NCQURSO1dBQzVDLFdBQVMsd0JBQXFCLEdBQUcsU0FBQSxZQUNXO1lBQTNDLHNCQUFnQixZQUFZO2FBQU8sR0F0RDFCLFlBc0QyQixzQ0FBd0I7S0FBQSxHQUFjO0lBQUE7R0FBQTtVQUM1RSxPQUFHLEVBQUU7RUFBQTtFQUVOLGlEQUNVOztHQUFULG9CQUFNO2tCQUNMLHFCQUFBLGlCQUNzQjs4QkFEVCxJQUFFO1dBQ2YsS0FBTSxXQUFTLGlCQUFhO0dBQUE7O0VBRTlCLHVEQUNhOztHQUFaLG9CQUFNO2tCQUNMLHdCQUFBLFFBQ2E7c0JBRE47V0FDUCxLQUFNLGtCQUFjO0dBQUE7O0VBR3RCLHdCQUFpQiwyQkFBQSxRQUNhO3FCQUROO0dBQ3ZCLG9CQUFjLFNBQU0sS0FBRyxRQUFRLFFBQVE7VUFDdkMsaUJBQWEsY0FBWSxRQUFPO0VBQUE7RUFHakMsbUJBQWEsTUFBTTtFQUduQix1QkFBZ0IsMEJBQUEsS0FBTSxNQUFNLFlBQ1M7O0lBQ25DLFlBQUEsaUJBQWUsUUFDSztZQUFuQjtJQUFBLE9BRUc7S0FBSCxpQkFBZTtZQUNmO3dCQU5hO0tBQUEsR0FNTyxNQUFNO0lBQUE7R0FBQTtFQUFBO0VBRTdCLGlEQUNVOztHQUFULG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtrQkFDUCxxQkFBQSxFQUNVO3NCQURSO1dBQ0YsS0FBTSxrQkFBZSxDQXpGWCxZQXlGWSxJQUFJLEVBQUU7R0FBQTs7RUFFOUIsd0JBQWlCLDJCQUFBLEtBQU0sTUFBTSxZQUNTO0dBQXJDLFFBQUksZUFBYTtHQUNqQjtJQUFTLFFBQUE7SUFDUixZQUFBLEdBQUc7eUJBQVksT0FBRDtJQUFBO3lCQUFVLFNBQUQ7SUFBQSxLQUNTO1lBQS9CLFdBQVMsS0FBRSxHQUFHLFNBQUEsWUFDUztNQUF0QjtjQUFjLEdBaEdOLHVCQTJGSyxzQkFLUztNQUFBO01BQ3RCLGlCQUFXLEVBQUUsRUFBRTs7T0FDVixRQUFBO09BQ0osWUFBQSxPQUFHLEVBQUcsU0FDSztlQUFWLHVCQUFpQixNQUFNOzs7Y0FDeEIsWUFBQSxPQUFHLEVBQUcsVUFDTTtlQUFYLHdCQUFrQjs7O2NBRWY7ZUFBSDs7V0FBd0IsV0FBUztPQUFBO01BQUE7S0FBQTtJQUFBLE9BQ3JDLFlBQUEsaUJBQUssT0FBRDtZQUFVLEtBQUcsRUFBRztJQUFBLEtBQ007WUFBekIsdUJBQWlCLEVBQUU7YUFBUyxFQTFHbkIsdUJBMkZLOztXQWlCWDtZQUFIO0lBQUE7R0FBQTtVQUVGLE9BQUksa0JBQVksR0FBRztFQUFBO0VBRXBCLDZCQUFvQixnQ0FBQSxNQUFNLGFBQVcsS0FDMEI7R0FFOUQsUUFBSTtHQUNKLFlBQU0sUUFBUyxpQkFBSSxTQUFEO1dBQVksc0JBQWdCLE1BQU07dUJBSmhCO0lBQUE7R0FBQTtHQUtwQyxZQUFNLFFBQVMsaUJBQUksT0FBRDtXQUFVLFdBQVMsS0FBRSxHQUFHLFNBQUEsV0FDUTtZQUFqRCx1QkFBaUIsTUFBTyxFQUFFLEVBQUU7YUFBWSxHQXRIOUIsdUJBZ0h5QixzQkFNYTtLQUFBO0lBQUE7R0FBQTtVQUNqRCxPQUFHLE1BQUk7RUFBQTtFQUVSLDhCQUFxQixpQ0FBQSxjQUFpQyxLQUNLOzZCQUQxQixTQUFTOztpQkFDdkM7V0FBbUIsRUExSFYsdUJBeUgwQztNQUNyQixLQUFLOzs7RUFFdEMsNEJBQW1CLCtCQUFBLE1BQU0sYUFBb0IsS0FDYTs7cUJBRHRCO0dBQ25DO1dBQVEsRUE3SEcsdUJBNEhpQzs7R0FFNUMsUUFBSTs7TUFDc0IsVUFBQTsrQkFBekIsb0NBQVc7R0FBQTs7SUFFWCx5QkFBQyxJQUFELElBQ0k7S0FBSCxJQUFHLFlBQVUsU0FBUzt1QkFDUTtjQUE1QixpQ0FQd0M7OztLQVExQzs7UUFDc0IsVUFBQTthQUFyQixRQUFNLE1BQU07S0FBQTtZQUNiO0lBQUEsT0FDRCx5QkFBQyxFQUFELElBQ0U7WUFBRCxDQUFHOztRQUFzQjtJQUFBLE9BQzFCLFlBQUEsV0FBUSxJQUNDO1lBQVI7O1FBQ3VCLFVBQUE7TUFBdEIsV0FBUTtLQUFBO0lBQUEsT0FFTjtZQUFIO0lBQUE7R0FBQTtFQUFBO0VBRUgsa0NBQ2E7VUFBWCxTQUFBLGNBQ1c7O0tBQU4sUUFBQTtLQUNKLHlCQUFDLElBQUQsSUFDRTthQUFELElBQUksRUFBRyxTQUFBLEVBQUE7O1FBQ04seUJBQUMsRUFBRCxJQUNFO2dCQUFEO1FBQUEsT0FFRztnQkFBSCxXQUFRLGtFQUFzRDtRQUFBO09BQUE7TUFBQTtLQUFBLE9BQ2pFLHlCQUFDLEVBQUQsSUFDRTthQUFELENBQUU7S0FBQSxPQUVDO2FBQUg7S0FBQTtJQUFBO0dBQUE7RUFBQTtFQTlLSix3QkFBQSIsImZpbGUiOiJtZXRhL3Rlc3RzL3J1bi10ZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9