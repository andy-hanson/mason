"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../bang","../../at/at","../../at/at-Type","../../at/q","../../at/Map/Map","../../at/Set/Id-Setbang","../../cash","../../Boolean","../../compare","../../control","../../Function","../../Generatorbang","../../Object","../../Try","../../Type/Impl-Type","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../../Type/Type","../modules","../../control","../../Objectbang","../../Type/Method"],function(exports,_33_0,_64_1,_64_45Type_2,_63_3,Map_4,Id_45Set_33_5,$_6,Boolean_7,compare_8,control_9,Function_10,Generator_33_11,Object_12,Try_13,Impl_45Type_14,Kind_15,Method_16,Pred_45Type_17,Type_18,modules_19,control_20,Object_33_21,Method_22){
	exports._get=_ms.lazy(function(){
		const _33=_ms.getDefaultExport(_33_0),_$2=_ms.getModule(_33_0),_33call=_$2["!call"],_64=_ms.getDefaultExport(_64_1),_$3=_ms.getModule(_64_1),_43_43=_$3["++"],flatten=_$3.flatten,flat_45map=_$3["flat-map"],map=_$3.map,_$4=_ms.getModule(_64_45Type_2),empty=_$4.empty,_$5=_ms.getModule(_63_3),_63_45or=_$5["?-or"],Map=_ms.getDefaultExport(Map_4),Id_45Set_33=_ms.getDefaultExport(Id_45Set_33_5),$=_ms.getDefaultExport($_6),_$8=_ms.getModule($_6),$after=_$8.$after,$all=_$8.$all,$ing=_$8.$ing,_$9=_ms.getModule(Boolean_7),and=_$9.and,or=_$9.or,_$10=_ms.getModule(compare_8),_61_63=_$10["=?"],_$11=_ms.getModule(control_9),_if=_$11.if,_$12=_ms.getModule(Function_10),noop=_$12.noop,Generator_33=_ms.getDefaultExport(Generator_33_11),_$14=_ms.getModule(Object_12),_63p=_$14["?p"],p=_$14.p,p_63=_$14["p?"],_64p=_$14["@p"],_64p_45all=_$14["@p-all"],_$15=_ms.getModule(Try_13),$annotate_45errors=_$15["$annotate-errors"],annotate_45errors=_$15["annotate-errors"],oh_45no_33=_$15["oh-no!"],Success=_$15.Success,_try=_$15.try,Impl_45Type=_ms.getDefaultExport(Impl_45Type_14),Kind=_ms.getDefaultExport(Kind_15),_$17=_ms.getModule(Kind_15),concrete_45implementors=_$17["concrete-implementors"],Method=_ms.getDefaultExport(Method_16),_$18=_ms.getModule(Method_16),impl_33=_$18["impl!"],impl_45for=_$18["impl-for"],_$19=_ms.getModule(Pred_45Type_17),ObjLit=_$19.ObjLit,_$20=_ms.getModule(Type_18),contains_63=_$20["contains?"],_$21=_ms.getModule(modules_19),$_64all_45modules=_$21["$@all-modules"],_$23=_ms.lazyGetModule(control_20),build=_ms.lazyProp(_$23,"build"),_$24=_ms.lazyGetModule(Object_33_21),empty_45Object_33=_ms.lazyProp(_$24,"empty-Object!"),_$25=_ms.lazyGetModule(Method_22),self_45impl_33=_ms.lazyProp(_$25,"self-impl!");
		const doc=exports.doc="For running code in `test` properties.";
		const test_45special=exports["test-special"]=Method(function(){
			const doc="Something special to do with this value when the test runner reacher it.\nMay return a $.";
			const args=1;
			const allow_45null_63=true;
			const _default=noop;
			return {
				doc:doc,
				args:args,
				"allow-null?":allow_45null_63,
				default:_default,
				name:"test-special"
			}
		}());
		impl_33(test_45special,Impl_45Type,function(type){
			return $all(flat_45map(_63p(type,"prototype"),function(prototype){
				return flat_45map(_64p_45all(prototype),function(name){
					const x=_try(function(){
						return _63p(prototype,name)
					});
					return function(){
						const _=x;
						if(_ms.contains(Success,_)){
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
				return flat_45map(concrete_45implementors(_),function(implementor){
					return _64$test_45test_45fun(implementor,test,_ms.lazy(function(){
						return (((""+_ms.show(_))+".implementor-test of ")+_ms.show(implementor))
					}),implementor)
				})
			});
			return _43_43(a,b)
		});
		const $test_45all=exports["$test-all"]=function(){
			const doc="Tests all modules in dir-path.";
			return _ms.set(function $test_45all(require,dir_45path){
				return $after($_64all_45modules(require,dir_45path),function(_){
					return $all(flat_45map(_,_64$test_45module))
				})
			},"doc",doc)
		}();
		const $test_45module=exports["$test-module"]=function(){
			const doc="Treats an Object as a module and tests it.";
			return _ms.set(function $test_45module(_module){
				return $all(_64$test_45module(_module))
			},"doc",doc)
		}();
		const _64$test_45module=function _64$test_45module(_module){
			const module_45name=_63_45or(_63p(_module,"name"),"<anonymous module>");
			return _64$maybe_45test(module_45name,_module,true)
		};
		const all_45tested=empty(Id_45Set_33);
		const _64$maybe_45test=function _64$maybe_45test(name,value,is_45module){
			return function(){
				if(all_45tested.has(value)){
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
			const doc="TODO";
			return _ms.set(function $test_45fun(_){
				return $all(_64$test_45single((""+_ms.show(_)),_,false))
			},"doc",doc)
		}();
		const _64$test_45single=function _64$test_45single(name,value,is_45module){
			const a=test_45special(value);
			const b=function(){
				const _=value;
				if(or(is_45module,_ms.lazy(function(){
					return _ms.contains(ObjLit,_)
				}),_ms.lazy(function(){
					return _ms.contains(Function,_)
				}))){
					return flat_45map(_64p(_),function(prop_45name){
						const next_45name=_ms.lazy(function(){
							return (((""+_ms.show(_ms.unlazy(name)))+".")+_ms.show(prop_45name))
						});
						const prop_45val=p(_,prop_45name);
						return function(){
							const _=prop_45name;
							if(_61_63(_,"test")){
								return _64$test_45test_45prop(value,prop_45val,_ms.lazy(function(){
									return _ms.unlazy(next_45name)
								}))
							} else if(_61_63(_,"$test")){
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
				} else if(and(_ms.contains(Object,_),_ms.lazy(function(){
					return p_63(_,"test")
				}))){
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
			const _0=$annotate_45errors(_ms.lazy(function(){
				return ((""+_ms.show(_ms.unlazy(name)))+": ")
			}),$ing(value_45$test));
			return [_0]
		};
		const _64$test_45test_45fun=function _64$test_45test_45fun(value,value_45test,name){
			const args=[].slice.call(arguments,3);
			const ano=_ms.lazy(function(){
				return ((""+_ms.show(_ms.unlazy(name)))+": ")
			});
			const _=annotate_45errors(_ms.lazy(function(){
				return _ms.unlazy(ano)
			}),function(){
				return Function.apply.call(value_45test,null,[].concat(_ms.arr(args)))
			});
			return function(){
				if(_ms.contains(Map,_)){
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
				} else if(_ms.contains($,_)){
					return [$annotate_45errors(_ms.lazy(function(){
						return _ms.unlazy(ano)
					}),_)]
				} else {
					return []
				}
			}()
		};
		const _64$_45from_45any=function(){
			return function(test_45result){
				return function(){
					const _=test_45result;
					if(_ms.contains(_64,_)){
						return map(_,function(_){
							return function(){
								if(_ms.contains($,_)){
									return _
								} else {
									return oh_45no_33(("Result of test should be $, @[$], or undefined. Got: "+_ms.show(_)))
								}
							}()
						})
					} else if(_ms.contains($,_)){
						return [_]
					} else {
						return []
					}
				}()
			}
		}();
		const name=exports.name="test";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL3Rlc3RzL3Rlc3QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUEwQkEsc0JBQU07RUFtQk4sNkNBQWMsaUJBQ007R0FBbkIsVUFDQztHQUVELFdBQU07R0FDTixzQkFBYTtHQUNiLGVBQVM7Ozs7Ozs7OztFQUdWLFFBQU0sZUFBYSxZQUFXLFNBQUEsS0FDSTtVQUFqQyxLQUFNLFdBQVUsS0FBRyxLQUFNLGFBQWEsU0FBQSxVQUNTO1dBQTlDLFdBQVUsV0FBTyxXQUFZLFNBQUEsS0FDSTtLQUVoQyxRQUFJLEtBQ0ssVUFBQTthQUFSLEtBQUcsVUFBVTtLQUFBOztNQUNULFFBQUE7TUFDSixnQkFBQyxRQUFELEdBQ1E7Y0FBUCxXQUFTLE1BQU8sU0FBQSxJQUNHO2VBQWxCO2dCQUFlLEdBbkJmLFlBbUJnQixxQkFBTztRQUFBLEdBQU8sSUFBSTtPQUFBO01BQUEsT0FFaEM7Y0FBSDtNQUFBO0tBQUE7SUFBQTtHQUFBO0VBQUE7RUFHTCxRQUFNLGVBQWEsS0FBTSxTQUFBLEVBQ0M7R0FBekIsUUFBSSxrQkFBYyxXQUFTLGVBQWEsYUFBVztHQUNuRCxRQUFJLFdBQVUsS0FBRyxFQUFHLG9CQUFvQixTQUFBLEtBQ2E7V0FBcEQsV0FBUyx3QkFBQSxHQUF3QixTQUFBLFlBQ1c7WUFBM0Msc0JBQWdCLFlBQVk7YUFBTyxHQTVCaEMsWUE0QmlDLHNDQUF3QjtLQUFBLEdBQWM7SUFBQTtHQUFBO1VBQzVFLE9BQUcsRUFBRTtFQUFBO0VBR04saURBQ1U7R0FBVCxVQUFNO2tCQUNMLHFCQUFBLFFBQWlCLFdBQ2U7V0FBaEMsT0FBUSxrQkFBYyxRQUFRLFlBQVcsU0FBQSxFQUNDO1lBQXpDLEtBQU0sV0FBUyxFQUFFO0lBQUE7R0FBQTs7RUFFcEIsdURBQ2E7R0FBWixVQUFNO2tCQUNMLHdCQUFBLFFBQ2E7V0FBYixLQUFNLGtCQUFjO0dBQUE7O0VBR3RCLHdCQUFpQiwyQkFB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