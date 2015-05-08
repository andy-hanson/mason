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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL3Rlc3RzL3Rlc3QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lDQTJCQTs7Ozs7RUFBQSxzQkFBTTtFQUdOLFdBQU8sVUFDTjtVQUFBLElBQUEsT0FBSyxDQUFHLElBQUksSUFBSSx1QkFBYSxTQUFBLE9BQzVCO0lBQUEsb0JBQUs7S0FDSixrQkFBRTtNQUNELHFCQUFLO09BQ0osUUFBSSxVQUNIO2VBQUEsT0FBTztPQUFBO09BQ1IsUUFBSSxVQUNIO2VBQUEsT0FBTztPQUFBO2NBSko7Ozs7OzthQURKOzs7OztLQU1GLFFBQUc7Z0NBQ0gsZUFBQSxFQUEyQixVQUMxQjthQUFBLE9BQU87S0FBQTtLQUNSLFFBQUc7WUFWQzs7Ozs7OztXQVdMLGlCQUFjLE1BQWQsSUFBQTtHQUFBO0VBQUE7RUFHRiw2Q0FBYyxpQkFBTTtHQUNuQixVQUNDO0dBRUQsZUFBUztVQUpVOzs7Ozs7RUFPcEIsUUFBQSxlQUFBLFlBQThCLFNBQUEsS0FDN0I7VUFBQSxLQUFLLFdBQVUsS0FBQSxLQUFVLGFBQWEsU0FBQSxVQUNyQztXQUFBLElBQUksV0FBQSxXQUFvQixTQUFBLEtBR3ZCO0tBQUEsUUFBSSxLQUFLLFVBQ1I7YUFBQSxLQUFBLFVBQUE7S0FBQTs7TUFDSSxRQUFBO01BQ0oseUJBQUMsUUFBRCxJQUFRO2NBQ1AsUUFBTSxNQUFPLFNBQUEsSUFDWjtlQUFBLGlCQUFjLEdBM0NSLFlBMkNRLHFCQUFPLE9BQXJCLElBQUE7T0FBQTtNQUFBLE9BQ0U7Y0FDSDtNQUFBO0tBQUE7SUFBQTtHQUFBO0VBQUE7RUFHTCxRQUFBLGVBQUEsS0FBeUIsU0FBQSxFQUN4QjtHQUFBLFFBQUksa0JBQWEsV0FBQSxlQUFBLGFBQWtDO0dBQ25ELFFBQUksV0FBUyxLQUFJLEVBQUcsb0JBQW9CLFNBQUEsS0FDdkM7c0JBRDRDO1dBQzVDLFdBQUEsd0JBQVMsR0FBd0IsU0FBQSxZQUNoQztZQUFBLHNCQUFBLFlBQUEsS0FBa0MsR0FwRHpCLFlBb0QwQixzQ0FBdUIsY0FBMUQ7SUFBQTtHQUFBO1VBQ0YsT0FBQSxFQUFBO0VBQUE7RUFHRCxpREFBVTtHQUNULFVBQU07a0JBQ0wsU0FBQSxRQUFZLFdBQ1o7c0JBRFE7c0JBQWE7V0FDckIsT0FBTyxrQkFBQSxRQUFBLFlBQWtDLFNBQUEsRUFDeEM7WUFBQSxLQUFLLFdBQVUsRUFBVjtJQUFBO0dBQUE7O0VBRVIsdURBQWE7R0FDWixVQUFNO2tCQUNMLFNBQUEsUUFDQTtzQkFETztXQUNQLEtBQUssa0JBQUE7R0FBQTs7RUFHUCx3QkFBaUIsU0FBQSxRQUNoQjtxQkFEdUI7R0FDdkIsb0JBQWMsU0FBSyxLQUFBLFFBQVksZUFBZTtVQUM5QyxpQkFBQSxjQUFBLFFBQUE7RUFBQTtFQUdELG1CQUFhLE1BQUE7RUFHYix1QkFBZ0IsU0FBQSxLQUFTLE1BQU0sWUFDOUI7cUJBRG9CO3FCQUFvQjs7SUFFdkMsWUFBQSxpQkFBQSxRQUFvQjtZQUNuQjtJQUFBLE9BQ0c7S0FDSCxpQkFBQTtZQUNBLGtCQUFBLEtBQUEsTUFBQTtJQUFBO0dBQUE7RUFBQTtFQUVILGlEQUFVO0dBQ1QsVUFBTTtHQUNOLFdBQU8sVUFDTjtXQUFDO0dBQUE7a0JBQ0QsU0FBQSxFQUNBO3NCQURFO1dBQ0YsS0FBSyxrQkFBZSxjQUFjLEVBQTdCO0dBQUE7O0VBRVAsd0JBQWlCLFNBQUEsS0FBUyxNQUFNLFlBQy9CO3FCQURxQjtxQkFBb0I7R0FDekMsUUFBSSxlQUFBO0dBQ0o7SUFBUyxRQUFBO0lBQ1IsWUFBQSxHQUFBO3lCQUFlLE9BQUQ7SUFBQTt5QkFBVSxJQUFEO0lBQUEsS0FBSTtZQUMxQixXQUFBLEtBQVMsR0FBSyxTQUFBLFlBQ2I7TUFBQSxrQkFBYSxHQWhHTCxZQWdHSyxxQkFBTztNQUNwQixpQkFBVyxFQUFFLEVBQUY7O09BQ04sUUFBQTtPQUNKLFlBQUEsT0FBRyxFQUFHLFNBQUs7ZUFDVix1QkFBQSxNQUFBLFdBQUE7T0FBQSxPQUNELFlBQUEsT0FBRyxFQUFHLFVBQU07ZUFDWCx3QkFBQSxXQUFBO09BQUEsT0FDRztlQUNILGlCQUFBLFlBQUEsV0FBQTtPQUFBO01BQUE7S0FBQTtJQUFBLE9BQ0osWUFBQSxpQkFBSyxJQUFEO1lBQU0sS0FBSSxFQUFHO0lBQUEsS0FBTTtZQUN0Qix1QkFBaUIsRUFBRSxPQUFRLEVBMUdsQixZQTBHa0I7V0FDeEI7WUFDSDtJQUFBO0dBQUE7VUFFRixPQUFHLGtCQUFBLEdBQUg7RUFBQTtFQUVELDZCQUFvQixTQUFBLE1BQU0sYUFBVyxLQUdwQztHQUFBLFFBQUk7R0FDSixZQUFNLFFBQVEsaUJBQUssSUFBRDtXQUFNLHNCQUFBLE1BQUEsYUFBQTtHQUFBO0dBQ3hCLFlBQU0sUUFBUSxpQkFBSyxPQUFEO1dBQVMsV0FBQSxLQUFVLEdBQUssU0FBQSxXQUN6QztZQUFBLHVCQUFBLE1BQXVCLEVBQUcsRUFBSCxZQUFnQixHQXRIN0IsWUFzSDZCLHFCQUFPO0lBQUE7R0FBQTtVQUMvQyxPQUFBLE1BQUE7RUFBQTtFQUVELDhCQUFxQixTQUFBLGNBQTRCLEtBQ2hEOzZCQURnQyxJQUFHO0dBQ25DLFNBQUU7V0FBbUIsRUExSFYsWUEwSFU7TUFBVSxLQUFBO1VBQS9COztFQUVELDRCQUFtQixTQUFBLE1BQU0sYUFBZSxLQUN2Qzs7cUJBRG1DO0dBQ25DO1dBQVEsRUE3SEcsWUE2SEg7O0dBQ1IsUUFBSTs7TUFBc0IsVUFDekI7K0JBQUEsb0NBQVc7R0FBQTs7SUFFWCx5QkFBQyxJQUFELElBQUk7S0FDSCxJQUFFLFlBQUEsSUFBQTt1QkFBdUI7Y0FDdkIsc0JBQVE7OztLQUNWOztRQUFzQixVQUNyQjthQUFBLFFBQUEsTUFBWTtLQUFBO1lBQ2I7SUFBQSxPQUNELHlCQUFDLEVBQUQsSUFBRTtZQUNELENBQUU7O1FBQXVCO0lBQUEsT0FDdEI7WUFDSDtJQUFBO0dBQUE7RUFBQTtFQUVILGtDQUFhO1VBQ1gsU0FBQSxjQUNBOztLQUFLLFFBQUE7S0FDSix5QkFBQyxJQUFELElBQUU7YUFDRCxJQUFJLEVBQUcsU0FBQSxFQUFBOztRQUNOLHlCQUFDLEVBQUQsSUFBRTtnQkFDRDtRQUFBLE9BQ0c7Z0JBQ0gsV0FBUSwyREFBK0M7UUFBQTtPQUFBO01BQUE7S0FBQSxPQUMxRCx5QkFBQyxFQUFELElBQUU7YUFDRCxDQUFFO0tBQUEsT0FDQzthQUNIO0tBQUE7SUFBQTtHQUFBO0VBQUE7RUE1S0osc0NBQUEiLCJmaWxlIjoibWV0YS90ZXN0cy90ZXN0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=