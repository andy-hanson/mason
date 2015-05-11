"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../bang","../../at/at","../../at/at-Type","../../at/q","../../at/Map/Map","../../at/Set/Id-Setbang","../../cash","../../Bool","../../compare","../../control","../../Fun","../../Generatorbang","../../Obj","../../Str","../../Try","../../Type/Impl-Type","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../../Type/Type","../modules","../../control","../../Objbang","../../Type/Method"],function(exports,_33_0,_64_1,_64_45Type_2,_63_3,Map_4,Id_45Set_33_5,$_6,Bool_7,compare_8,control_9,Fun_10,Generator_33_11,Obj_12,Str_13,Try_14,Impl_45Type_15,Kind_16,Method_17,Pred_45Type_18,Type_19,modules_20,control_21,Obj_33_22,Method_23){
	exports._get=_ms.lazy(function(){
		const _33=_ms.getDefaultExport(_33_0),_$2=_ms.getModule(_33_0),_33call=_ms.get(_$2,"!call"),_64=_ms.getDefaultExport(_64_1),_$3=_ms.getModule(_64_1),_43_43=_ms.get(_$3,"++"),each_33=_ms.get(_$3,"each!"),flatten=_ms.get(_$3,"flatten"),flat_45map=_ms.get(_$3,"flat-map"),map=_ms.get(_$3,"map"),_$4=_ms.getModule(_64_45Type_2),empty=_ms.get(_$4,"empty"),_$5=_ms.getModule(_63_3),_63_45or=_ms.get(_$5,"?-or"),Map=_ms.getDefaultExport(Map_4),Id_45Set_33=_ms.getDefaultExport(Id_45Set_33_5),$=_ms.getDefaultExport($_6),_$8=_ms.getModule($_6),$after=_ms.get(_$8,"$after"),$all=_ms.get(_$8,"$all"),$ing=_ms.get(_$8,"$ing"),Bool=_ms.getDefaultExport(Bool_7),_$9=_ms.getModule(Bool_7),and=_ms.get(_$9,"and"),or=_ms.get(_$9,"or"),_$10=_ms.getModule(compare_8),_61_63=_ms.get(_$10,"=?"),_$11=_ms.getModule(control_9),_if=_ms.get(_$11,"if"),Fun=_ms.getDefaultExport(Fun_10),_$12=_ms.getModule(Fun_10),noop=_ms.get(_$12,"noop"),Generator_33=_ms.getDefaultExport(Generator_33_11),Obj=_ms.getDefaultExport(Obj_12),_$14=_ms.getModule(Obj_12),_63p=_ms.get(_$14,"?p"),p=_ms.get(_$14,"p"),p_63=_ms.get(_$14,"p?"),_64p=_ms.get(_$14,"@p"),_64p_45all=_ms.get(_$14,"@p-all"),Str=_ms.getDefaultExport(Str_13),_$16=_ms.getModule(Try_14),$annotate_45errors=_ms.get(_$16,"$annotate-errors"),annotate_45errors=_ms.get(_$16,"annotate-errors"),oh_45no_33=_ms.get(_$16,"oh-no!"),Success=_ms.get(_$16,"Success"),_try=_ms.get(_$16,"try"),Impl_45Type=_ms.getDefaultExport(Impl_45Type_15),Kind=_ms.getDefaultExport(Kind_16),_$18=_ms.getModule(Kind_16),concrete_45implementors=_ms.get(_$18,"concrete-implementors"),Method=_ms.getDefaultExport(Method_17),_$19=_ms.getModule(Method_17),impl_33=_ms.get(_$19,"impl!"),impl_45for=_ms.get(_$19,"impl-for"),_$20=_ms.getModule(Pred_45Type_18),ObjLit=_ms.get(_$20,"ObjLit"),_$21=_ms.getModule(Type_19),contains_63=_ms.get(_$21,"contains?"),_$22=_ms.getModule(modules_20),$_64all_45modules=_ms.get(_$22,"$@all-modules"),_$24=_ms.lazyGetModule(control_21),build=_ms.lazyProp(_$24,"build"),Obj_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Obj_33_22)
		}),_$26=_ms.lazyGetModule(Method_23),self_45impl_33=_ms.lazyProp(_$26,"self-impl!");
		const exports={};
		const doc=exports.doc="For running code in `test` properties.";
		const test=function(){
			return _33(_61_63,["x","y","b"],_ms.unlazy(build)(function(_yield){
				const obj=function(){
					const a=function(){
						const test=function(){
							const x=function(){
								return _yield("x")
							};
							const y=function(){
								return _yield("y")
							};
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
					const b=empty(_ms.unlazy(Obj_33));
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
		};
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
				return map(_64p_45all(prototype),function(name){
					const x=_try(function(){
						return _63p(prototype,name)
					});
					return function(){
						const _=x;
						if(_ms.bool(_ms.contains(Success,_))){
							return each_33(_.val,function(val){
								return _64$maybe_45test((((""+_ms.show(type))+"#")+_ms.show(name)),val,false)
							})
						} else {
							return null
						}
					}()
				})
			}))
		});
		impl_33(test_45special,Kind,function(_){
			const a=_64$_45from_45any(impl_45for(test_45special,Impl_45Type)(_));
			const b=flat_45map(_63p(_,"implementor-test"),function(test){
				_ms.checkContains(Fun,test,"test");
				return flat_45map(concrete_45implementors(_),function(implementor){
					return _64$test_45test_45fun(implementor,test,(((""+_ms.show(_))+".implementor-test of ")+_ms.show(implementor)),implementor)
				})
			});
			return _43_43(a,b)
		});
		const $test_45all=exports["$test-all"]=function(){
			const doc="Tests all modules in dir-path.";
			return _ms.set(function(require,dir_45path){
				_ms.checkContains(Fun,require,"require");
				_ms.checkContains(Str,dir_45path,"dir-path");
				return $after($_64all_45modules(require,dir_45path),function(_){
					return $all(flat_45map(_,_64$test_45module))
				})
			},"doc",doc,"displayName","$test-all")
		}();
		const $test_45module=exports["$test-module"]=function(){
			const doc="Treats an Obj as a module and tests it.";
			return _ms.set(function(_module){
				_ms.checkContains(Obj,_module,"module");
				return $all(_64$test_45module(_module))
			},"doc",doc,"displayName","$test-module")
		}();
		const _64$test_45module=function(_module){
			_ms.checkContains(Obj,_module,"module");
			const module_45name=_63_45or(_63p(_module,"displayName"),"<anonymous module>");
			return _64$maybe_45test(module_45name,_module,true)
		};
		const all_45tested=empty(Id_45Set_33);
		const _64$maybe_45test=function(name,value,is_45module){
			_ms.checkContains(Str,name,"name");
			_ms.checkContains(Bool,is_45module,"is-module");
			return function(){
				if(_ms.bool(all_45tested.has(value))){
					return []
				} else {
					all_45tested.add(value);
					return _64$test_45single(name,value,is_45module)
				}
			}()
		};
		const $test_45fun=exports["$test-fun"]=function(){
			const doc="TODO";
			const test=function(){
				return "TODO"
			};
			return _ms.set(function(_){
				_ms.checkContains(Fun,_,"_");
				return $all(_64$test_45single(_.displayName,_,false))
			},"doc",doc,"test",test,"displayName","$test-fun")
		}();
		const _64$test_45single=function(name,value,is_45module){
			_ms.checkContains(Str,name,"name");
			_ms.checkContains(Bool,is_45module,"is-module");
			const a=test_45special(value);
			const b=function(){
				const _=value;
				if(_ms.bool(or(is_45module,_ms.lazy(function(){
					return _ms.contains(ObjLit,_)
				}),_ms.lazy(function(){
					return _ms.contains(Fun,_)
				})))){
					return flat_45map(_64p(_),function(prop_45name){
						const next_45name=(((""+_ms.show(name))+".")+_ms.show(prop_45name));
						const prop_45val=p(_,prop_45name);
						return function(){
							const _=prop_45name;
							if(_ms.bool(_61_63(_,"test"))){
								return _64$test_45test_45prop(value,prop_45val,next_45name)
							} else if(_ms.bool(_61_63(_,"$test"))){
								return _64$test_45$test_45prop(prop_45val,next_45name)
							} else {
								return _64$maybe_45test(next_45name,prop_45val,false)
							}
						}()
					})
				} else if(_ms.bool(and(_ms.contains(Obj,_),_ms.lazy(function(){
					return p_63(_,"test")
				})))){
					return _64$test_45test_45prop(_,_.test,((""+_ms.show(name))+".test"))
				} else {
					return []
				}
			}();
			return _43_43(_64$_45from_45any(a),b)
		};
		const _64$test_45test_45prop=function(value,value_45test,name){
			const _=value_45test;
			const _64$a=flatten(_if(_ms.contains(Fun,_),_ms.lazy(function(){
				return _64$test_45test_45fun(value,value_45test,name)
			})));
			const _64$b=flatten(_if(_ms.contains(ObjLit,_),_ms.lazy(function(){
				return flat_45map(_64p(_),function(sub_45name){
					return _64$test_45test_45prop(value,p(_,sub_45name),(((""+_ms.show(name))+".")+_ms.show(sub_45name)))
				})
			})));
			return _43_43(_64$a,_64$b)
		};
		const _64$test_45$test_45prop=function(value_45$test,name){
			_ms.checkContains(_ms.sub(Fun,Generator_33),value_45$test,"value-$test");
			const _0=$annotate_45errors(_ms.lazy(function(){
				return ((""+_ms.show(name))+": ")
			}),$ing(value_45$test));
			return [_0]
		};
		const _64$test_45test_45fun=function(value,value_45test,name){
			const args=[].slice.call(arguments,3);
			_ms.checkContains(Fun,value_45test,"value-test");
			const ano=_ms.lazy(function(){
				return ((""+_ms.show(name))+": ")
			});
			const _=annotate_45errors(_ms.lazy(function(){
				return _ms.unlazy(ano)
			}),function(){
				return Function.apply.call(value_45test,null,[].concat(_ms.arr(args)))
			});
			return function(){
				if(_ms.bool(_ms.contains(Map,_))){
					_33(contains_63(Fun,value),_ms.lazy(function(){
						return function(){
							return (("Test of "+_ms.show(name))+" returned a Map, but the value is not callable.")
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
									return oh_45no_33(("Result of test should be $, @[$], or (). Got: "+_ms.show(_)))
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
		const displayName=exports.displayName="test";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL3Rlc3RzL3Rlc3QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lDQTJCQTs7Ozs7RUFBQSxzQkFBTTtFQUdOLFdBQ08sVUFBQTtVQUFOLElBQUUsT0FBRyxDQUFHLElBQUksSUFBSSx1QkFBYSxTQUFBLE9BQ0s7SUFBakMsb0JBQ0s7S0FBSixrQkFDRTtNQUFELHFCQUNLO09BQUosUUFDSSxVQUFBO2VBQUgsT0FBTztPQUFBO09BQ1IsUUFDSSxVQUFBO2VBQUgsT0FBTztPQUFBO2NBSEo7Ozs7OzthQURKOzs7OztLQUtGLFFBQUc7Z0NBQ1EsZUFBYSxFQUNHLFVBQUE7YUFBMUIsT0FBTztLQUFBO0tBQ1IsUUFBRztZQVRDOzs7Ozs7O1dBVUwsaUJBQWMsTUFBSyxJQUFJO0dBQUE7RUFBQTtFQUd6Qiw2Q0FBYyxpQkFDTTtHQUFuQixVQUNDO0dBRUQsZUFBUztVQUhVOzs7Ozs7RUFNcEIsUUFBTSxlQUFhLFlBQVcsU0FBQSxLQUNJO1VBQWpDLEtBQU0sV0FBVSxLQUFHLEtBQU0sYUFBYSxTQUFBLFVBQ1M7V0FBOUMsSUFBSyxXQUFPLFdBQVksU0FBQSxLQUNJO0tBRTNCLFFBQUksS0FDSyxVQUFBO2FBQVIsS0FBRyxVQUFVO0tBQUE7O01BQ1QsUUFBQTtNQUNKLHlCQUFDLFFBQUQsSUFDUTtjQUFQLFFBQU0sTUFBTyxTQUFBLElBQ0c7ZUFBZixpQkFBYyxHQTNDUixZQTJDUyxxQkFBTyxPQUFPLElBQUk7T0FBQTtNQUFBLE9BRS9CO2NBQUg7TUFBQTtLQUFBO0lBQUE7R0FBQTtFQUFBO0VBR0wsUUFBTSxlQUFhLEtBQU0sU0FBQSxFQUNDO0dBQXpCLFFBQUksa0JBQWMsV0FBUyxlQUFhLGFBQVc7R0FDbkQsUUFBSSxXQUFVLEtBQUcsRUFBRyxvQkFBb0IsU0FBQSxLQUNRO3NCQURIO1dBQzVDLFdBQVMsd0JBQUEsR0FBd0IsU0FBQSxZQUNXO1lBQTNDLHNCQUFnQixZQUFZLEtBQU0sR0FwRHpCLFlBb0QwQixzQ0FBd0IsY0FBYztJQUFBO0dBQUE7VUFDM0UsT0FBRyxFQUFFO0VBQUE7RUFHTixpREFDVTtHQUFULFVBQU07a0JBQ0wsU0FBQSxRQUFZLFdBQ1k7c0JBRGhCO3NCQUFhO1dBQ3JCLE9BQVEsa0JBQWMsUUFBUSxZQUFXLFNBQUEsRUFDQztZQUF6QyxLQUFNLFdBQVMsRUFBRTtJQUFBO0dBQUE7O0VBRXBCLHVEQUNhO0dBQVosVUFBTTtrQkFDTCxTQUFBLFFBQ1U7c0JBREg7V0FDUCxLQUFNLGtCQUFjO0dBQUE7O0VBR3RCLHdCQUFpQixTQUFBLFFBQ1U7cUJBREg7R0FDdkIsb0JBQWMsU0FBTSxLQUFHLFFBQVEsZUFBZTtVQUM5QyxpQkFBYSxjQUFZLFFBQU87RUFBQTtFQUdqQyxtQkFBYSxNQUFNO0VBR25CLHVCQUFnQixTQUFBLEtBQVMsTUFBTSxZQUNjO3FCQUR4QjtxQkFBb0I7O0lBRXZDLFlBQUEsaUJBQWUsUUFDSztZQUFuQjtJQUFBLE9BRUc7S0FBSCxpQkFBZTtZQUNmLGtCQUFjLEtBQUssTUFBTTtJQUFBO0dBQUE7RUFBQTtFQUU1QixpREFDVTtHQUFULFVBQU07R0FDTixXQUNPLFVBQUE7V0FBTDtHQUFBO2tCQUNELFNBQUEsRUFDSztzQkFESDtXQUNGLEtBQU0sa0JBQWMsY0FBYyxFQUFFO0dBQUE7O0VBRXRDLHdCQUFpQixTQUFBLEtBQVMsTUFBTSxZQUNjO3FCQUR4QjtxQkFBb0I7R0FDekMsUUFBSSxlQUFhO0dBQ2pCO0lBQVMsUUFBQTtJQUNSLFlBQUEsR0FBRzt5QkFBWSxPQUFEO0lBQUE7eUJBQVUsSUFBRDtJQUFBLEtBQ0k7WUFBMUIsV0FBUyxLQUFBLEdBQUssU0FBQSxZQUNTO01BQXRCLGtCQUFhLEdBaEdMLFlBZ0dNLHFCQUFPO01BQ3JCLGlCQUFXLEVBQUUsRUFBRTs7T0FDVixRQUFBO09BQ0osWUFBQSxPQUFHLEVBQUcsU0FDSztlQUFWLHVCQUFpQixNQUFNLFdBQVM7T0FBQSxPQUNqQyxZQUFBLE9BQUcsRUFBRyxVQUNNO2VBQVgsd0JBQWtCLFdBQVM7T0FBQSxPQUV4QjtlQUFILGlCQUFhLFlBQVUsV0FBUztPQUFBO01BQUE7S0FBQTtJQUFBLE9BQ3BDLFlBQUEsaUJBQUssSUFBRDtZQUFPLEtBQUcsRUFBRztJQUFBLEtBQ007WUFBdEIsdUJBQWlCLEVBQUUsT0FBUSxFQTFHbEIsWUEwR21CO1dBRXpCO1lBQUg7SUFBQTtHQUFBO1VBRUYsT0FBSSxrQkFBWSxHQUFHO0VBQUE7RUFFcEIsNkJBQW9CLFNBQUEsTUFBTSxhQUFXLEtBQ3lCO0dBRTdELFFBQUk7R0FDSixZQUFNLFFBQVMsaUJBQUksSUFBRDtXQUFPLHNCQUFnQixNQUFNLGFBQVc7R0FBQTtHQUMxRCxZQUFNLFFBQVMsaUJBQUksT0FBRDtXQUFVLFdBQVMsS0FBQSxHQUFLLFNBQUEsV0FDUTtZQUFqRCx1QkFBaUIsTUFBTyxFQUFFLEVBQUUsWUFBVyxHQXRIN0IsWUFzSDhCLHFCQUFPO0lBQUE7R0FBQTtVQUNoRCxPQUFHLE1BQUk7RUFBQTtFQUVSLDhCQUFxQixTQUFBLGNBQTRCLEtBQ0k7NkJBRHBCLElBQUk7R0FDcEMsU0FBRTtXQUFtQixFQTFIVixZQTBIVztNQUFVLEtBQUs7VUFBZTs7RUFFckQsNEJBQW1CLFNBQUEsTUFBTSxhQUFlLEtBQ1k7O3FCQURoQjtHQUNuQztXQUFRLEVBN0hHLFlBNkhGOztHQUNULFFBQUk7O01BQ3NCLFVBQUE7K0JBQXpCLG9DQUFXO0dBQUE7O0lBRVgseUJBQUMsSUFBRCxJQUNJO0tBQUgsSUFBRyxZQUFVLElBQUk7dUJBQ1E7Y0FBdkIsc0JBQVM7OztLQUNYOztRQUNzQixVQUFBO2FBQXJCLFFBQU0sTUFBTTtLQUFBO1lBQ2I7SUFBQSxPQUNELHlCQUFDLEVBQUQsSUFDRTtZQUFELENBQUc7O1FBQXNCO0lBQUEsT0FFdEI7WUFBSDtJQUFBO0dBQUE7RUFBQTtFQUVILGtDQUNhO1VBQVgsU0FBQSxjQUNXOztLQUFOLFFBQUE7S0FDSix5QkFBQyxJQUFELElBQ0U7YUFBRCxJQUFJLEVBQUcsU0FBQSxFQUFBOztRQUNOLHlCQUFDLEVBQUQsSUFDRTtnQkFBRDtRQUFBLE9BRUc7Z0JBQUgsV0FBUSwyREFBK0M7UUFBQTtPQUFBO01BQUE7S0FBQSxPQUMxRCx5QkFBQyxFQUFELElBQ0U7YUFBRCxDQUFFO0tBQUEsT0FFQzthQUFIO0tBQUE7SUFBQTtHQUFBO0VBQUE7RUE1S0osc0NBQUEiLCJmaWxlIjoibWV0YS90ZXN0cy90ZXN0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=