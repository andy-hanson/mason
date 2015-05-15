"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Boolean","../js","../private/js-impl","../private/bootstrap","../private/js-impl","./Obj-Type","../at/q","../control","../Function","../Object","./Impl-Type","./Kind","../bang","../at/at-Type","../at/q","../compare","../Function","../private/bootstrap","../Try","./Type"],function(exports,Boolean_0,js_1,js_45impl_2,bootstrap_3,js_45impl_4,Obj_45Type_5,_63_6,control_7,Function_8,Object_9,Impl_45Type_10,Kind_11,_33_12,_64_45Type_13,_63_14,compare_15,Function_16,bootstrap_17,Try_18,Type_19){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),implies=_ms.get(_$2,"implies"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(js_1),defined_63=_ms.get(_$3,"defined?"),js_45sub=_ms.get(_$3,"js-sub"),_$4=_ms.getModule(js_45impl_2),buildStr=_ms.get(_$4,"buildStr"),_$5=_ms.getModule(bootstrap_3),impl_45contains_63_33=_ms.get(_$5,"impl-contains?!"),msDef=_ms.get(_$5,"msDef"),contains_63_45impl_45symbol=_ms.get(_$5,"contains?-impl-symbol"),_$7=_ms.getModule(js_45impl_4),ohNo=_ms.get(_$7,"ohNo"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_5),_$10=_ms.lazyGetModule(_63_6),un_45_63=_ms.lazyProp(_$10,"un-?"),_$11=_ms.lazyGetModule(control_7),_if=_ms.lazyProp(_$11,"if"),_$12=_ms.lazyGetModule(Function_8),noop=_ms.lazyProp(_$12,"noop"),_$13=_ms.lazyGetModule(Object_9),p_45with_45proto_63=_ms.lazyProp(_$13,"p-with-proto?"),Impl_45Type=_ms.lazy(function(){
			return _ms.getDefaultExport(Impl_45Type_10)
		}),_$14=_ms.lazyGetModule(Impl_45Type_10),self_45type=_ms.lazyProp(_$14,"self-type"),Kind=_ms.lazy(function(){
			return _ms.getDefaultExport(Kind_11)
		}),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_12)
		}),_$18=_ms.lazyGetModule(_64_45Type_13),empty=_ms.lazyProp(_$18,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_14)
		}),_$20=_ms.lazyGetModule(compare_15),_61_63=_ms.lazyProp(_$20,"=?"),_$21=_ms.lazyGetModule(Function_16),thunk=_ms.lazyProp(_$21,"thunk"),_$22=_ms.lazyGetModule(bootstrap_17),p_43_33=_ms.lazyProp(_$22,"p+!"),_$23=_ms.lazyGetModule(Try_18),fails_63=_ms.lazyProp(_$23,"fails?"),_$24=_ms.lazyGetModule(Type_19),contains_63=_ms.lazyProp(_$24,"contains?");
		const make_45callable_45method=function(){
			return _ms.set(function(method){
				const src=buildStr(function(){
					return _ms.set(function(add_33){
						add_33("return function(a, b, c, d) {");
						const impl=function(){
							if(_ms.bool(defined_63(method.default))){
								return (("(a == null) ? def : (a[\""+_ms.show(method["impl-symbol"]))+"\"] || def)")
							} else {
								return (("a[\""+_ms.show(method["impl-symbol"]))+"\"]")
							}
						}();
						add_33(("var impl = "+_ms.show(impl)));
						add_33((("if (impl === undefined)\n\tthrow new Error(\"Method "+_ms.show(method.displayName))+" not defined for \" + a + \" of type \" + a.constructor)"));
						if(_ms.bool(defined_63(method.wrap))){
							add_33("switch (arguments.length) {\n\tcase 1: return wrap(impl, a)\n\tcase 2: return wrap(impl, a, b)\n\tcase 3: return wrap(impl, a, b, c)\n\tcase 4: return wrap(impl, a, b, c, d)\n\tdefault: throw new Error(\"Code not generated to accept \" + arguments.length + \" arguments.\")\n}")
						} else {
							add_33("switch (arguments.length) {\n\tcase 1: return impl(a)\n\tcase 2: return impl(a, b)\n\tcase 3: return impl(a, b, c)\n\tcase 4: return impl(a, b, c, d)\n\tdefault: throw new Error(\"Code not generated to accept \" + arguments.length + \" arguments.\")\n}")
						};
						return add_33("}")
					},"displayName","src")
				}());
				const f=Function("def","wrap",src);
				const call=f(method.default,method.wrap);
				_ms.unlazy(p_43_33)(call,"source",src);
				return call
			},"displayName","make-callable-method")
		}();
		const Method=Obj_45Type(function(){
			const doc="TODO:REST\nThe `doc` of the method should be its signature, followed by a string of the meaning.\nFor example:\n\tsizeness.\n\t\tdoc. |:Int _\n\t\t\t\"How big it is.\"\n\t\t...\nThe `wrap` property can replace the default calling mechanism.\nIt will be given the implementation, then the method's arguments.\nYou can use this to, for example, apply in/out conditions to every implementation.\n\tsizeness.\n\t\twrap. |impl x\n\t\t\tout\n\t\t\t\t! >=? res 0\n\t\t\timpl x";
			const test=function(){
				return _ms.set(function(){
					const m=Method(function(){
						const _default=_ms.unlazy(thunk)("default");
						return {
							default:_default,
							displayName:"m"
						}
					}());
					impl_33(m,String,_ms.unlazy(thunk)("String"));
					impl_45double_33(m,Number,Number,_ms.unlazy(thunk)("Number Number"));
					impl_45double_33(m,Number,String,_ms.unlazy(thunk)("Number String"));
					_ms.unlazy(_33)(_ms.unlazy(_61_63),m(null),"default");
					_ms.unlazy(_33)(_ms.unlazy(_61_63),m("a"),"String");
					_ms.unlazy(_33)(_ms.unlazy(_61_63),m(1,1),"Number Number");
					_ms.unlazy(_33)(_ms.unlazy(_61_63),m(1,"a"),"Number String");
					_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
						return m(1,m)
					});
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),"wrap-call-arg",function(){
						const wrap_45method=Method(function(){
							const _default=function(){
								return _ms.set(function(_){
									return ("call-"+_ms.show(_))
								},"displayName","default")
							}();
							const wrap=function(){
								return _ms.set(function(impl,arg){
									return ("wrap-"+_ms.show(impl(arg)))
								},"displayName","wrap")
							}();
							return {
								default:_default,
								wrap:wrap,
								displayName:"wrap-method"
							}
						}());
						return wrap_45method("arg")
					}())
				},"displayName","test")
			}();
			const props=function(){
				const displayName=String;
				const impl_45symbol=String;
				return {
					displayName:displayName,
					"impl-symbol":impl_45symbol
				}
			}();
			const opt_45props=function(){
				const _default=Function;
				const wrap=Function;
				return {
					default:_default,
					wrap:wrap,
					displayName:"opt-props"
				}
			}();
			const extensible=true;
			const defaults=function(){
				const displayName=function(){
					return _ms.set(function(){
						return ohNo("displayName required!")
					},"displayName","displayName")
				}();
				const impl_45symbol=function(){
					return _ms.set(function(_){
						return ("impl-"+_ms.show(_.displayName))
					},"displayName","impl-symbol")
				}();
				return {
					displayName:displayName,
					"impl-symbol":impl_45symbol
				}
			}();
			const make_45callable=make_45callable_45method;
			return {
				doc:doc,
				test:test,
				props:props,
				"opt-props":opt_45props,
				extensible:extensible,
				defaults:defaults,
				"make-callable":make_45callable,
				displayName:"Method"
			}
		}());
		const impl_33=exports["impl!"]=function(){
			const doc="Implements a Method for a type or types.";
			const test="See Method.test.";
			return _ms.set(function(method,implementor,implementation){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(_ms.unlazy(Impl_45Type),implementor,"implementor");
				_ms.checkContains(Function,implementation,"implementation");
				return do_45impl_33(method,implementor,implementation)
			},"doc",doc,"test",test,"displayName","impl!")
		}();
		const impl_45double_33=exports["impl-double!"]=function(){
			return _ms.set(function(method,implementor_450,implementor_451,implementation){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(_ms.unlazy(Impl_45Type),implementor_450,"implementor-0");
				_ms.checkContains(_ms.unlazy(Impl_45Type),implementor_451,"implementor-1");
				_ms.checkContains(Function,implementation,"implementation");
				const dispatcher=function(){
					if(_ms.bool(writable_63(implementor_450.prototype,method["impl-symbol"]))){
						const m=method;
						const dd=Double_45Dispatcher(function(){
							const displayName="<double dispatcher>";
							const method=m;
							const first_45type=implementor_450;
							const impl_45symbol=Symbol("<double dispatcher>");
							return {
								displayName:displayName,
								method:method,
								"first-type":first_45type,
								"impl-symbol":impl_45symbol
							}
						}());
						do_45impl_33(method,implementor_450,dd);
						return dd
					} else {
						return function(){
							const _=js_45sub(implementor_450.prototype,method["impl-symbol"]);
							if(_ms.bool(_ms.contains(Double_45Dispatcher,_))){
								return _
							} else {
								return ohNo((((((("Can't define double dispatch of "+_ms.show(method))+" for ")+_ms.show(implementor_450))+".\nA single-dispatch implementation already exists: ")+_ms.show(_))+"."))
							}
						}()
					}
				}();
				return do_45impl_33(dispatcher,implementor_451,implementation)
			},"displayName","impl-double!")
		}();
		const self_45impl_33=exports["self-impl!"]=function(){
			const doc="TODO";
			const test=function(){
				return _ms.set(function(){
					return "TODO"
				},"displayName","test")
			}();
			return _ms.set(function(method,implementor,implementation){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(Object,implementor,"implementor");
				_ms.checkContains(Function,implementation,"implementation");
				return impl_33(method,_ms.unlazy(self_45type)(implementor),function(implementor){
					const args=[].slice.call(arguments,1);
					_ms.unlazy(noop)(implementor);
					return Function.apply.call(implementation,null,[].concat(_ms.arr(args)))
				})
			},"doc",doc,"test",test,"displayName","self-impl!")
		}();
		const _63impl_45for=exports["?impl-for"]=function(){
			const doc="Implementation of a method for a particular Impl-Type.\nDoes not reference method.default or impls on super-types.\nEmpty if the type would use method.default.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[_ms.unlazy(contains_63),Method],_v0=_ms.unlazy(_63)(method_45contains_63);
					const _k1=[_ms.unlazy(_61_63),Method],_v1=_ms.unlazy(empty)(_ms.unlazy(_63));
					return _ms.map(_k0,_v0,_k1,_v1)
				},"displayName","test")
			}();
			return _ms.set(function(method,type){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(_ms.unlazy(Impl_45Type),type,"type");
				const desc=Object.getOwnPropertyDescriptor(type.prototype,method["impl-symbol"]);
				return _ms.unlazy(_if)(and(defined_63(desc),_ms.lazy(function(){
					return not(desc.writable)
				})),_ms.lazy(function(){
					return desc.value
				}))
			},"doc",doc,"test",test,"displayName","?impl-for")
		}();
		const impl_45for=exports["impl-for"]=function(){
			const doc="impl-for that fails when there is no implementation.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[_ms.unlazy(contains_63),Method],_v0=method_45contains_63;
					_ms.unlazy(_33)(impl_45for(_ms.unlazy(contains_63),_ms.unlazy(Kind)),_ms.unlazy(Impl_45Type),_ms.unlazy(Kind));
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(method,type){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(_ms.unlazy(Impl_45Type),type,"type");
				return _ms.unlazy(un_45_63)(_63impl_45for(method,type),_ms.lazy(function(){
					return ((((""+_ms.show(method))+" not implemented for ")+_ms.show(type))+".")
				}))
			},"doc",doc,"test",test,"displayName","impl-for")
		}();
		const writable_63=function(){
			return _ms.set(function(obj,property){
				const desc=Object.getOwnPropertyDescriptor(obj,property);
				return implies(defined_63(desc),_ms.lazy(function(){
					return desc.writable
				}))
			},"displayName","writable?")
		}();
		const p_63=function(){
			return _ms.set(function(obj,property){
				return defined_63(js_45sub(obj,property))
			},"displayName","p?")
		}();
		const propagate_45method_45down_33=exports["propagate-method-down!"]=function(){
			return _ms.set(function(implementor,method_45symbol,implementation){
				{
					const _=implementor;
					if(_ms.bool(not(p_63(_.prototype,method_45symbol)))){
						if(_ms.bool(_ms.contains(_ms.unlazy(Kind),_))){
							_.implementors.forEach(function(sub_45implementor){
								return propagate_45method_45down_33(sub_45implementor,method_45symbol,implementation)
							})
						} else {
							Object.defineProperty(_.prototype,method_45symbol,function(){
								const value=implementation;
								const writable=true;
								return {
									value:value,
									writable:writable
								}
							}())
						}
					} else {}
				}
			},"displayName","propagate-method-down!")
		}();
		const do_45impl_33=function(){
			return _ms.set(function(method,implementor,implementation){
				if(_ms.bool(writable_63(implementor.prototype,method["impl-symbol"]))){} else {
					ohNo((((("Can not redefine method "+_ms.show(method))+" for ")+_ms.show(implementor))+"."))
				};
				Object.defineProperty(implementor.prototype,method["impl-symbol"],function(){
					const value=implementation;
					const enumerable=false;
					return {
						value:value,
						enumerable:enumerable
					}
				}());
				{
					const _=implementor;
					if(_ms.bool(_ms.contains(_ms.unlazy(Kind),_))){
						_.implementors.forEach(function(sub){
							return propagate_45method_45down_33(sub,method["impl-symbol"],implementation)
						})
					} else {}
				}
			},"displayName","do-impl!")
		}();
		const Double_45Dispatcher=Obj_45Type(function(){
			const props=function(){
				const displayName=String;
				const method=Method;
				const first_45type=null;
				const impl_45symbol=Symbol;
				return {
					displayName:displayName,
					method:method,
					"first-type":first_45type,
					"impl-symbol":impl_45symbol
				}
			}();
			const make_45callable=function(){
				return _ms.set(function(_){
					return function(){
						const args=[].slice.call(arguments,0);
						const target_452=js_45sub(args,1);
						if(_ms.bool(defined_63(target_452))){} else {
							ohNo(_ms.lazy(function(){
								return (("Can't double-dispatch "+_ms.show(_.method))+" for undefined.")
							}))
						};
						const impl=js_45sub(target_452,_["impl-symbol"]);
						if(_ms.bool(defined_63(impl))){
							_ms.unlazy(_33)(_ms.unlazy(contains_63),Function,impl)
						} else {
							ohNo(_ms.lazy(function(){
								return ((((("Can't double-dispatch "+_ms.show(_.method))+" for ")+_ms.show(_["first-type"]))+" on ")+_ms.show(target_452))
							}))
						};
						return Function.apply.call(impl,null,[].concat(_ms.arr(args)))
					}
				},"displayName","make-callable")
			}();
			return {
				props:props,
				"make-callable":make_45callable,
				displayName:"Double-Dispatcher"
			}
		}());
		const method_45contains_63=function(){
			return _ms.set(function(method,value){
				return _ms.unlazy(p_45with_45proto_63)(value,method["impl-symbol"])
			},"displayName","method-contains?")
		}();
		impl_45contains_63_33(Method,method_45contains_63);
		const _45_45contains_63=exports["--contains?"]=Method(function(){
			const doc="|:Boolean collection value\nWhether some collection of things as as an element `value`.\"";
			const impl_45symbol=contains_63_45impl_45symbol;
			return {
				doc:doc,
				"impl-symbol":impl_45symbol,
				displayName:"--contains?"
			}
		}());
		msDef("contains",_45_45contains_63);
		const displayName=exports.displayName="Method";
		exports.default=Method;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL01ldGhvZC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0VBeUJBLHlDQUF3QjtrQkFBQSxTQUFBLE9BQ007SUFBN0IsVUFBTSxtQkFBVTtvQkFBQSxTQUFBLE9BQ0k7TUFBbkIsT0FBTTtNQUNOO09BQ0MsWUFBQSxXQUFTLGlCQUNjO2VBQXJCLHVDQUEwQjtjQUV4QjtlQUFGLGtCQUFLOzs7TUFDUixPQUFNLHdCQUFZO01BQ1osT0FDTCxrRUFDMkI7TUFFdkIsWUFBSixXQUFTLGNBQ1c7T0FBbkIsT0FDQztNQUFBLE9BUUU7T0FBSCxPQUNDO01BQUE7YUFPSCxPQUFNO0tBQUE7O0lBRVAsUUFBSSxTQUFVLE1BQU0sT0FBTTtJQUMxQixXQUFPLEVBQUUsZUFBZTt3QkFDZCxLQUFNLFNBQVE7V0FDeEI7R0FBQTs7RUFFRCxhQUFTLHFCQUNRO0dBQWhCLFVBQ0M7R0FnQkQscUJBQ087bUJBQUEsVUFBQTtLQUFOLFFBQUksaUJBQ007TUFBVCxpQ0FBZ0I7Ozs7OztLQUNqQixRQUFNLEVBQUUseUJBQWU7S0FDdkIsaUJBQWEsRUFBRSxPQUFPLHlCQUFlO0tBQ3JDLGlCQUFhLEVBQUUsT0FBTyx5QkFBZTt3Q0FDL0IsRUFBRSxNQUFLO3dDQUNQLEVBQUcsS0FBSzt3Q0FDUixFQUFFLEVBQUUsR0FBSTt3Q0FDUixFQUFFLEVBQUcsS0FBSzswQ0FFQSxVQUFBO2FBQWYsRUFBRSxFQUFFO0tBQUE7K0NBRUMsMEJBQ2M7TUFBbkIsb0JBQWMsaUJBQ007T0FBbkIseUJBQVU7dUJBQUEsU0FBQSxFQUNDO2dCQUFULGtCQUFNO1FBQUE7O09BQ1IscUJBQU87dUJBQUEsU0FBQSxLQUFLLElBQ0c7Z0JBQWIsa0JBQU0sS0FBSztRQUFBOzs7Ozs7OzthQUNkLGNBQWE7S0FBQTtJQUFBOztHQUVmLHNCQUNNO0lBQUwsa0JBQWE7SUFDYixvQkFBYTs7Ozs7O0dBQ2QsNEJBQ1U7SUFBVCxlQUFTO0lBQ1QsV0FBTTs7Ozs7OztHQUNQLGlCQUFZO0dBQ1oseUJBQ1M7SUFDUiw0QkFDYztvQkFBQSxVQUFBO2FBQWIsS0FBTTtLQUFBOztJQUNQLDhCQUFjO29CQUFBLFNBQUEsRUFDQzthQUFiLGtCQUFNOzs7Ozs7OztHQUNULHNCQUFlOzs7Ozs7Ozs7Ozs7RUFFaEIseUNBQ007R0FBTCxVQUFNO0dBQ04sV0FBTztrQkFDTixTQUFBLE9BQWMsWUFBc0IsZUFDdUI7c0JBRHBEOztzQkFBNEM7V0FDbkQsYUFBUyxPQUFPLFlBQVk7R0FBQTs7RUFFOUIseURBQWU7a0JBQUEsU0FBQSxPQUFjLGdCQUF3QixnQkFBd0IsZUFDdUI7c0JBRDlFOzs7c0JBQXNFO0lBQzNGO0tBQ0MsWUFBQSxZQUFVLDBCQUF3Qix3QkFDa0I7TUFBbkQsUUFBSTtNQUNKLFNBQUssOEJBQ2lCO09BQXJCLGtCQUFjO09BQ2QsYUFBUTtPQUNSLG1CQUFZO09BQ1osb0JBQWEsT0FBUTs7Ozs7Ozs7TUFDdEIsYUFBUyxPQUFPLGdCQUFjO2FBQzlCO0tBQUEsT0FFRzs7T0FBRSxRQUFBLFNBQU8sMEJBQXdCO09BQ25DLHlCQUFDLG9CQUFELElBQ2tCO2VBQWpCO09BQUEsT0FFRztlQUFILEtBQ0Msa0RBQWlDLDJCQUFhLG1GQUNJOzs7OztXQUV2RCxhQUFTLFdBQVcsZ0JBQWM7R0FBQTs7RUFFbkMscURBQ1c7R0FBVixVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTtZQUFMO0lBQUE7O2tCQUNELFNBQUEsT0FBYyxZQUFtQixlQUN1QjtzQkFEakQ7c0JBQW1CO3NCQUFzQjtXQUNoRCxRQUFNLCtCQUFrQixhQUFjLFNBQUEsWUFDbUI7O3NCQUFuRDtnQ0FDTCxzQ0FBZTtJQUFBO0dBQUE7O0VBRWxCLG1EQUNVO0dBQVQsVUFDQztHQUdELHFCQUNPO21CQUFBLFVBQUE7S0FBTixVQUFBLHlCQUFZLDRCQUFjO0tBQzFCLFVBQUEsb0JBQUs7Ozs7a0JBQ0wsU0FBQSxPQUFjLEtBQ2M7c0JBRHJCOztJQUVQLFdBQU8sZ0NBQWdDLGVBQWU7MkJBQ2xELElBQUssV0FBUztZQUFRLElBQUk7O1lBQWlCOzs7O0VBRWpELCtDQUNTO0dBQVIsVUFBTTtHQUNOLHFCQUNPO21CQUFBLFVBQUE7S0FBTixVQUFBLHlCQUFZLFlBQVk7cUJBQ3JCOzs7O2tCQUNILFNBQUEsT0FBYyxLQUNjO3NCQURyQjs7Z0NBQ0QsY0FBVSxPQUFPO1lBQVEsSUFsSXJCLFlBa0lzQiwyQ0FBNkI7Ozs7RUFJOUQsNEJBQWE7a0JBQUEsU0FBQSxJQUFJLFNBQ1E7SUFBeEIsV0FBTyxnQ0FBZ0MsSUFBSTtXQUMzQyxRQUFTLFdBQVM7WUFBTzs7OztFQUUxQixxQkFBTTtrQkFBQSxTQUFBLElBQUksU0FDUTtXQUFqQixXQUFVLFNBQU8sSUFBSTtHQUFBOztFQUd0QiwrRUFBeUI7a0JBQUEsU0FBQSxZQUFZLGdCQUFjLGVBQ21EO0lBQS9GO0tBQUEsUUFBQTtLQUVMLFlBQUEsSUFBSyxLQUFHLFlBQVksbUJBQ2M7TUFDNUIsMENBQUosSUFDSztPQUFKLHVCQUF3QixTQUFBLGtCQUNlO2VBQXRDLDZCQUF1QixrQkFBZ0IsZ0JBQWM7T0FBQTtNQUFBLE9BRW5EO09BRUgsc0JBQXNCLFlBQVksMEJBQ2E7UUFBOUMsWUFBTztRQUNQLGVBQVU7Ozs7Ozs7WUFFVjtJQUFBO0dBQUE7O0VBSU4sNkJBQVk7a0JBQUEsU0FBQSxPQUFPLFlBQVksZUFROUI7SUFMTSxZQUFKLFlBQVUsc0JBQXNCLHdCQUNrQixRQUU5QztLQUFILEtBQU0sd0NBQXlCLDJCQUFhOztJQUUvQyxzQkFBc0Isc0JBQXNCLGdDQUNrQjtLQUE3RCxZQUFPO0tBQ1AsaUJBQVk7Ozs7OztJQUNQO0tBQUEsUUFBQTtLQUNMLDBDQUFBLElBQ0s7TUFBSix1QkFBd0IsU0FBQSxJQUNHO2NBQTFCLDZCQUF1QixJQUFJLHNCQUFtQjtNQUFBO0tBQUEsT0FFNUM7SUFBQTtHQUFBOztFQUVOLDBCQUFvQixxQkFDUTtHQUEzQixzQkFDTTtJQUFMLGtCQUFhO0lBQ2IsYUFBUTtJQUNSLG1CQUFBO0lBQ0Esb0JBQWE7Ozs7Ozs7O0dBQ2QsZ0NBQWdCO21CQUFBLFNBQUEsRUFDQztZQUFmLFVBQ087O01BQVAsaUJBQVcsU0FBTyxLQUFLO01BRVosWUFBVixXQUFTLGFBQ1EsUUFFYjtPQUFIO2VBQU8sb0NBQXVCOzs7TUFFaEMsV0FBTyxTQUFPLFdBQVM7TUFFWixZQUFWLFdBQVMsT0FDSTsrQ0FBQSxTQUFTO01BQUEsT0FFbEI7T0FBSDtlQUFPLHVDQUF1Qiw2QkFBZSxtQ0FBa0I7T0FBQTtNQUFBO2lDQUNqRSw0QkFBSztLQUFBO0lBQUE7Ozs7Ozs7O0VBRVQscUNBQW9CO2tCQUFBLFNBQUEsT0FBTyxNQUNLOzJDQUFqQixNQUFNOzs7RUFDckIsc0JBQWdCLE9BQU87RUFHdkIsK0NBQWEsaUJBQ007R0FBbEIsVUFDQztHQUVELG9CQUFhOzs7Ozs7O0VBRWQsTUFBTyxXQUFVO0VBaFFqQixzQ0FBQTtrQkFrUUEiLCJmaWxlIjoiVHlwZS9NZXRob2QuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==