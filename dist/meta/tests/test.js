"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../bang","../../at/at","../../at/at-Type","../../at/q","../../at/Map/Map","../../at/Set/Id-Setbang","../../cash","../../Boolean","../../compare","../../control","../../Function","../../Generatorbang","../../Object","../../Try","../../Type/Impl-Type","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../../Type/Type","../modules","../../control","../../Objectbang","../../Type/Method"],function(exports,_33_0,_64_1,_64_45Type_2,_63_3,Map_4,Id_45Set_33_5,$_6,Boolean_7,compare_8,control_9,Function_10,Generator_33_11,Object_12,Try_13,Impl_45Type_14,Kind_15,Method_16,Pred_45Type_17,Type_18,modules_19,control_20,Object_33_21,Method_22){
	exports._get=_ms.lazy(function(){
		const _33=_ms.getDefaultExport(_33_0),_$2=_ms.getModule(_33_0),_33call=_ms.get(_$2,"!call"),_64=_ms.getDefaultExport(_64_1),_$3=_ms.getModule(_64_1),_43_43=_ms.get(_$3,"++"),flatten=_ms.get(_$3,"flatten"),flat_45map=_ms.get(_$3,"flat-map"),map=_ms.get(_$3,"map"),_$4=_ms.getModule(_64_45Type_2),empty=_ms.get(_$4,"empty"),_$5=_ms.getModule(_63_3),_63_45or=_ms.get(_$5,"?-or"),Map=_ms.getDefaultExport(Map_4),Id_45Set_33=_ms.getDefaultExport(Id_45Set_33_5),$=_ms.getDefaultExport($_6),_$8=_ms.getModule($_6),$after=_ms.get(_$8,"$after"),$all=_ms.get(_$8,"$all"),$ing=_ms.get(_$8,"$ing"),_$9=_ms.getModule(Boolean_7),and=_ms.get(_$9,"and"),or=_ms.get(_$9,"or"),_$10=_ms.getModule(compare_8),_61_63=_ms.get(_$10,"=?"),_$11=_ms.getModule(control_9),_if=_ms.get(_$11,"if"),_$12=_ms.getModule(Function_10),noop=_ms.get(_$12,"noop"),Generator_33=_ms.getDefaultExport(Generator_33_11),_$14=_ms.getModule(Object_12),_63p=_ms.get(_$14,"?p"),p=_ms.get(_$14,"p"),p_63=_ms.get(_$14,"p?"),_64p=_ms.get(_$14,"@p"),_64p_45all=_ms.get(_$14,"@p-all"),_$15=_ms.getModule(Try_13),$annotate_45errors=_ms.get(_$15,"$annotate-errors"),annotate_45errors=_ms.get(_$15,"annotate-errors"),oh_45no_33=_ms.get(_$15,"oh-no!"),Success=_ms.get(_$15,"Success"),_try=_ms.get(_$15,"try"),Impl_45Type=_ms.getDefaultExport(Impl_45Type_14),Kind=_ms.getDefaultExport(Kind_15),_$17=_ms.getModule(Kind_15),concrete_45implementors=_ms.get(_$17,"concrete-implementors"),Method=_ms.getDefaultExport(Method_16),_$18=_ms.getModule(Method_16),impl_33=_ms.get(_$18,"impl!"),impl_45for=_ms.get(_$18,"impl-for"),_$19=_ms.getModule(Pred_45Type_17),ObjLit=_ms.get(_$19,"ObjLit"),_$20=_ms.getModule(Type_18),contains_63=_ms.get(_$20,"contains?"),_$21=_ms.getModule(modules_19),$_64all_45modules=_ms.get(_$21,"$@all-modules"),_$23=_ms.lazyGetModule(control_20),build=_ms.lazyProp(_$23,"build"),_$24=_ms.lazyGetModule(Object_33_21),empty_45Object_33=_ms.lazyProp(_$24,"empty-Object!"),_$25=_ms.lazyGetModule(Method_22),self_45impl_33=_ms.lazyProp(_$25,"self-impl!");
		const doc=exports.doc="For running code in `test` properties.";
		const test=exports.test=function(){
			return _ms.set(function(){
				return _33(_61_63,["x","y","b"],_ms.unlazy(build)(function(_yield){
					const obj=function(){
						const a=function(){
							const test=function(){
								const x=function(){
									return _ms.set(function(){
										return _yield("x")
									},"displayName","x")
								}();
								const y=function(){
									return _ms.set(function(){
										return _yield("y")
									},"displayName","y")
								}();
								return {
									x:x,
									y:y,
									displayName:"test"
								}
							}();
							return {
								test:test,
								displayName:"a"
							}
						}();
						const b=_ms.unlazy(empty_45Object_33)();
						_ms.unlazy(self_45impl_33)(test_45special,b,function(){
							return _yield("b")
						});
						const c=null;
						return {
							a:a,
							b:b,
							c:c,
							displayName:"obj"
						}
					}();
					return _64$maybe_45test("obj",obj,true)
				}))
			},"displayName","test")
		}();
		const test_45special=exports["test-special"]=Method(function(){
			const doc="Something special to do with this value when the test runner reacher it.\nMay return a $.";
			const _default=noop;
			return {
				doc:doc,
				default:_default,
				displayName:"test-special"
			}
		}());
		impl_33(test_45special,Impl_45Type,function(type){
			return $all(flat_45map(_63p(type,"prototype"),function(prototype){
				return flat_45map(_64p_45all(prototype),function(name){
					const x=_try(function(){
						return _ms.set(function(){
							return _63p(prototype,name)
						},"displayName","x")
					}());
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
			const b=flat_45map(_63p(_,"implementor-test"),function(){
				return _ms.set(function(test){
					_ms.checkContains(Function,test,"test");
					return flat_45map(concrete_45implementors(_),function(implementor){
						return _64$test_45test_45fun(implementor,test,_ms.lazy(function(){
							return (((""+_ms.show(_))+".implementor-test of ")+_ms.show(implementor))
						}),implementor)
					})
				},"displayName","b")
			}());
			return _43_43(a,b)
		});
		const $test_45all=exports["$test-all"]=function(){
			const doc="Tests all modules in dir-path.";
			return _ms.set(function(require,dir_45path){
				_ms.checkContains(Function,require,"require");
				_ms.checkContains(String,dir_45path,"dir-path");
				return $after($_64all_45modules(require,dir_45path),function(_){
					return $all(flat_45map(_,_64$test_45module))
				})
			},"doc",doc,"displayName","$test-all")
		}();
		const $test_45module=exports["$test-module"]=function(){
			const doc="Treats an Object as a module and tests it.";
			return _ms.set(function(_module){
				_ms.checkContains(Object,_module,"module");
				return $all(_64$test_45module(_module))
			},"doc",doc,"displayName","$test-module")
		}();
		const _64$test_45module=function(){
			return _ms.set(function(_module){
				_ms.checkContains(Object,_module,"module");
				const module_45name=_63_45or(_63p(_module,"displayName"),"<anonymous module>");
				return _64$maybe_45test(module_45name,_module,true)
			},"displayName","@$test-module")
		}();
		const all_45tested=empty(Id_45Set_33);
		const _64$maybe_45test=function(){
			return _ms.set(function(name,value,is_45module){
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
			},"displayName","@$maybe-test")
		}();
		const $test_45fun=exports["$test-fun"]=function(){
			const doc="TODO";
			const test=function(){
				return _ms.set(function(){
					return "TODO"
				},"displayName","test")
			}();
			return _ms.set(function(_){
				_ms.checkContains(Function,_,"_");
				return $all(_64$test_45single((""+_ms.show(_)),_,false))
			},"doc",doc,"test",test,"displayName","$test-fun")
		}();
		const _64$test_45single=function(){
			return _ms.set(function(name,value,is_45module){
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
			},"displayName","@$test-single")
		}();
		const _64$test_45test_45prop=function(){
			return _ms.set(function(value,value_45test,name){
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
			},"displayName","@$test-test-prop")
		}();
		const _64$test_45$test_45prop=function(){
			return _ms.set(function(value_45$test,name){
				_ms.checkContains(_ms.sub(Function,Generator_33),value_45$test,"value-$test");
				const _0=$annotate_45errors(_ms.lazy(function(){
					return ((""+_ms.show(_ms.unlazy(name)))+": ")
				}),$ing(value_45$test));
				return [_0]
			},"displayName","@$test-$test-prop")
		}();
		const _64$test_45test_45fun=function(){
			return _ms.set(function(value,value_45test,name){
				const args=[].slice.call(arguments,3);
				_ms.checkContains(Function,value_45test,"value-test");
				const ano=_ms.lazy(function(){
					return ((""+_ms.show(_ms.unlazy(name)))+": ")
				});
				const _=annotate_45errors(_ms.lazy(function(){
					return _ms.unlazy(ano)
				}),function(){
					return _ms.set(function(){
						return Function.apply.call(value_45test,null,[].concat(_ms.arr(args)))
					},"displayName","_")
				}());
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
					} else {
						return []
					}
				}()
			},"displayName","@$test-test-fun")
		}();
		const _64$_45from_45any=function(){
			return function(){
				return _ms.set(function(test_45result){
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
				},"displayName","@$-from-any")
			}()
		}();
		const displayName=exports.displayName="test";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL3Rlc3RzL3Rlc3QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUEwQkEsc0JBQU07RUFHTixrQ0FDTztrQkFBQSxVQUFBO1dBQU4sSUFBRSxPQUFHLENBQUcsSUFBSSxJQUFJLHVCQUFhLFNBQUEsT0FDSztLQUFqQyxvQkFDSztNQUFKLGtCQUNFO09BQUQscUJBQ0s7UUFBSixrQkFDSTt3QkFBQSxVQUFBO2lCQUFILE9BQU87U0FBQTs7UUFDUixrQkFDSTt3QkFBQSxVQUFBO2lCQUFILE9BQU87U0FBQTs7Ozs7Ozs7Ozs7OztNQUNWO2lDQUNXLGVBQWEsRUFDRyxVQUFBO2NBQTFCLE9BQU87TUFBQTtNQUNSLFFBQUc7Ozs7Ozs7O1lBQ0osaUJBQWMsTUFBSyxJQUFJO0lBQUE7R0FBQTs7RUFHekIsNkNBQWMsaUJBQ007R0FBbkIsVUFDQztHQUVELGVBQVM7Ozs7Ozs7RUFHVixRQUFNLGVBQWEsWUFBVyxTQUFBLEtBQ0k7VUFBakMsS0FBTSxXQUFVLEtBQUcsS0FBTSxhQUFhLFNBQUEsVUFDUztXQUE5QyxXQUFVLFdBQU8sV0FBWSxTQUFBLEtBQ0k7S0FFaEMsUUFBSSxlQUNLO3FCQUFBLFVBQUE7Y0FBUixLQUFHLFVBQVU7TUFBQTs7O01BQ1QsUUFBQTtNQUNKLHlCQUFDLFFBQUQsSUFDUTtjQUFQLFdBQVMsTUFBTyxTQUFBLElBQ0c7ZUFBbEI7Z0JBQWUsR0EzQ1QsWUEyQ1UscUJBQU87UUFBQSxHQUFPLElBQUk7T0FBQTtNQUFBLE9BRWhDO2NBQUg7TUFBQTtLQUFBO0lBQUE7R0FBQTtFQUFBO0VBR0wsUUFBTSxlQUFhLEtBQU0sU0FBQSxFQUNDO0dBQXpCLFFBQUksa0JBQWMsV0FBUyxlQUFhLGFBQVc7R0FDbkQsUUFBSSxXQUFVLEtBQUcsRUFBRyw4QkFBb0I7bUJBQUEsU0FBQSxLQUNhO3VCQURSO1lBQzVDLFdBQVMsd0JBQUEsR0FBd0IsU0FBQSxZQUNXO2FBQTNDLHNCQUFnQixZQUFZO2NBQU8sR0FwRDFCLFlBb0QyQixzQ0FBd0I7TUFBQSxHQUFjO0tBQUE7SUFBQTs7VUFDNUUsT0FBRyxFQUFFO0VBQUE7RUFHTixpREFDVTtHQUFULFVBQU07a0JBQ0wsU0FBQSxRQUFpQixXQUNlO3NCQUR4QjtzQkFBa0I7V0FDMUIsT0FBUSxrQkFBYyxRQUFRLFlBQVcsU0FBQSxFQUNDO1lBQXpDLEtBQU0sV0FBUyxFQUFFO0lBQUE7R0FBQTs7RUFFcEIsdURBQ2E7R0FBWixVQUFNO2tCQUNMLFNBQUEsUUFDYTtzQkFETjtXQUNQLEtBQU0sa0JBQWM7R0FBQTs7RUFHdEIsa0NBQWlCO2tCQUFBLFNBQUEsUUFDYTtzQkFETjtJQUN2QixvQkFBYyxTQUFNLEtBQUcsUUFBUSxlQUFlO1dBQzlDLGlCQUFhLGNBQVksUUFBTztHQUFBOztFQUdqQyxtQkFBYSxNQUFNO0VBR25CLGlDQUFnQjtrQkFBQSxTQUFBLEtBQU0sTUFBTSxZQUNTOztLQUNuQyxZQUFBLGlCQUFlLFFBQ0s7YUFBbkI7S0FBQSxPQUVHO01BQUgsaUJBQWU7YUFDZjt5QkFOYTtNQUFBLEdBTU8sTUFBTTtLQUFBO0lBQUE7R0FBQTs7RUFFN0IsaURBQ1U7R0FBVCxVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTtZQUFMO0lBQUE7O2tCQUNELFNBQUEsRUFDVTtzQkFEUjtXQUNGLEtBQU0sa0JBQWUsQ0F6RlgsWUF5RlksSUFBSSxFQUFFO0dBQUE7O0VBRTlCLGtDQUFpQjtrQkFBQSxTQUFBLEtBQU0sTUFBTSxZQUNTO0lBQXJDLFFBQUksZUFBYTtJQUNqQjtLQUFTLFFBQUE7S0FDUixZQUFBLEdBQUc7MEJBQVksT0FBRDtLQUFBOzBCQUFVLFNBQUQ7S0FBQSxLQUNTO2FBQS9CLFdBQVMsS0FBQSxHQUFLLFNBQUEsWUFDUztPQUF0QjtlQUFjLEdBaEdOLHVCQTJGSyxzQkFLUztPQUFBO09BQ3RCLGlCQUFXLEVBQUUsRUFBRTs7UUFDVixRQUFBO1FBQ0osWUFBQSxPQUFHLEVBQUcsU0FDSztnQkFBVix1QkFBaUIsTUFBTTs7O2VBQ3hCLFlBQUEsT0FBRyxFQUFHLFVBQ007Z0JBQVgsd0JBQWtCOzs7ZUFFZjtnQkFBSDs7WUFBd0IsV0FBUztRQUFBO09BQUE7TUFBQTtLQUFBLE9BQ3JDLFlBQUEsaUJBQUssT0FBRDthQUFVLEtBQUcsRUFBRztLQUFBLEtBQ007YUFBekIsdUJBQWlCLEVBQUU7Y0FBUyxFQTFHbkIsdUJBMkZLOztZQWlCWDthQUFIO0tBQUE7SUFBQTtXQUVGLE9BQUksa0JBQVksR0FBRztHQUFBOztFQUVwQix1Q0FBb0I7a0JBQUEsU0FBQSxNQUFNLGFBQVcsS0FDMEI7SUFFOUQsUUFBSTtJQUNKLFlBQU0sUUFBUyxpQkFBSSxTQUFEO1lBQVksc0JBQWdCLE1BQU07d0JBSmhCO0tBQUE7SUFBQTtJQUtwQyxZQUFNLFFBQVMsaUJBQUksT0FBRDtZQUFVLFdBQVMsS0FBQSxHQUFLLFNBQUEsV0FDUTthQUFqRCx1QkFBaUIsTUFBTyxFQUFFLEVBQUU7Y0FBWSxHQXRIOUIsdUJBZ0h5QixzQkFNYTtNQUFBO0tBQUE7SUFBQTtXQUNqRCxPQUFHLE1BQUk7R0FBQTs7RUFFUix3Q0FBcUI7a0JBQUEsU0FBQSxjQUFpQyxLQUNLOzhCQUQxQixTQUFTO0lBQ3pDLFNBQUU7WUFBbUIsRUExSFYsdUJBeUgwQztPQUNyQixLQUFLOzs7O0VBRXRDLHNDQUFtQjtrQkFBQSxTQUFBLE1BQU0sYUFBb0IsS0FDYTs7c0JBRHRCO0lBQ25DO1lBQVEsRUE3SEcsdUJBNEhpQzs7SUFFNUMsUUFBSTs7aUJBQ3NCO29CQUFBLFVBQUE7aUNBQXpCLG9DQUFXO0tBQUE7OztLQUVYLHlCQUFDLElBQUQsSUFDSTtNQUFILElBQUcsWUFBVSxTQUFTO3dCQUNRO2VBQTVCLGlDQVB3Qzs7O01BUTFDOztTQUNzQixVQUFBO2NBQXJCLFFBQU0sTUFBTTtNQUFBO2FBQ2I7S0FBQSxPQUNELHlCQUFDLEVBQUQsSUFDRTthQUFELENBQUc7O1NBQXNCO0tBQUEsT0FFdEI7YUFBSDtLQUFBO0lBQUE7R0FBQTs7RUFFSCxrQ0FDYTtvQkFBWDttQkFBQSxTQUFBLGNBQ1c7O01BQU4sUUFBQTtNQUNKLHlCQUFDLElBQUQsSUFDRTtjQUFELElBQUksRUFBRyxTQUFBLEVBQUE7O1NBQ04seUJBQUMsRUFBRCxJQUNFO2lCQUFEO1NBQUEsT0FFRztpQkFBSCxXQUFRLGtFQUFzRDtTQUFBO1FBQUE7T0FBQTtNQUFBLE9BQ2pFLHlCQUFDLEVBQUQsSUFDRTtjQUFELENBQUU7TUFBQSxPQUVDO2NBQUg7TUFBQTtLQUFBO0lBQUE7OztFQTNLSixzQ0FBQSIsImZpbGUiOiJtZXRhL3Rlc3RzL3Rlc3QuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==