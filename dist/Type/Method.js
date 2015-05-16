"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Boolean","../js","../private/js-impl","../private/bootstrap","./Obj-Type","../at/q","../control","../Function","../Object","./Impl-Type","./Kind","../bang","../at/at-Type","../at/q","../compare","../Function","../private/bootstrap","../Try","./Type"],function(exports,Boolean_0,js_1,js_45impl_2,bootstrap_3,Obj_45Type_4,_63_5,control_6,Function_7,Object_8,Impl_45Type_9,Kind_10,_33_11,_64_45Type_12,_63_13,compare_14,Function_15,bootstrap_16,Try_17,Type_18){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),implies=_ms.get(_$2,"implies"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(js_1),defined_63=_ms.get(_$3,"defined?"),js_33=_ms.get(_$3,"js!"),js_61_61_61=_ms.get(_$3,"js==="),js_45instanceof=_ms.get(_$3,"js-instanceof"),js_45sub=_ms.get(_$3,"js-sub"),_$5=_ms.getModule(js_45impl_2),buildStr=_ms.get(_$5,"buildStr"),methodArgNames=_ms.get(_$5,"methodArgNames"),ohNo=_ms.get(_$5,"ohNo"),_$6=_ms.getModule(bootstrap_3),implContains=_ms.get(_$6,"implContains"),msDef=_ms.get(_$6,"msDef"),containsImplSymbol=_ms.get(_$6,"containsImplSymbol"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_4),_$9=_ms.lazyGetModule(_63_5),un_45_63=_ms.lazyProp(_$9,"un-?"),_$10=_ms.lazyGetModule(control_6),_if=_ms.lazyProp(_$10,"if"),_$11=_ms.lazyGetModule(Function_7),noop=_ms.lazyProp(_$11,"noop"),_$12=_ms.lazyGetModule(Object_8),p_45with_45proto_63=_ms.lazyProp(_$12,"p-with-proto?"),Impl_45Type=_ms.lazy(function(){
			return _ms.getDefaultExport(Impl_45Type_9)
		}),_$13=_ms.lazyGetModule(Impl_45Type_9),self_45type=_ms.lazyProp(_$13,"self-type"),Kind=_ms.lazy(function(){
			return _ms.getDefaultExport(Kind_10)
		}),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_11)
		}),_$17=_ms.lazyGetModule(_64_45Type_12),empty=_ms.lazyProp(_$17,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_13)
		}),_$19=_ms.lazyGetModule(compare_14),_61_63=_ms.lazyProp(_$19,"=?"),_$20=_ms.lazyGetModule(Function_15),thunk=_ms.lazyProp(_$20,"thunk"),_$21=_ms.lazyGetModule(bootstrap_16),pAdd=_ms.lazyProp(_$21,"pAdd"),_$22=_ms.lazyGetModule(Try_17),fails_63=_ms.lazyProp(_$22,"fails?"),_$23=_ms.lazyGetModule(Type_18),contains_63=_ms.lazyProp(_$23,"contains?");
		const if_33=function(){
			return _ms.set(function(bool,act){
				if(_ms.bool(bool)){
					act()
				} else {}
			},"displayName","if!")
		}();
		const flag_63=function(){
			return _ms.set(function(_){
				return function(){
					if(_ms.bool(defined_63(_))){
						return js_33(js_61_61_61(_,false))
					} else {
						return false
					}
				}()
			},"displayName","flag?")
		}();
		const method_45src=function(){
			return _ms.set(function(method){
				return buildStr(function(add_33){
					const has_45args_63=defined_63(method.args);
					const arg_45names=function(){
						if(_ms.bool(has_45args_63)){
							return methodArgNames(function(){
								const _=method.args;
								if(_ms.bool(_ms.contains(Number,_))){
									return _
								} else if(_ms.bool(js_45instanceof(_,Array))){
									return _.length
								} else throw new Error("No branch of `case` matches.")
							}())
						} else {
							return "a, b, c, d"
						}
					}();
					add_33((("return function("+_ms.show(arg_45names))+") {"));
					if_33(flag_63(method["allow-null?"]),function(){
						if_33(js_33(defined_63(method.default)),function(){
							return ohNo("Method with `allow-null?` must have `default`.")
						});
						return add_33("if (a == null) return def.apply(null, arguments)")
					});
					const impl=function(){
						if(_ms.bool(defined_63(method.default))){
							return (("(a[\""+_ms.show(method["impl-symbol"]))+"\"] || def)")
						} else {
							return (("a[\""+_ms.show(method["impl-symbol"]))+"\"]")
						}
					}();
					const call=function(){
						if(_ms.bool(defined_63(method.wrap))){
							return (("wrap("+_ms.show(impl))+", ")
						} else {
							return ((""+_ms.show(impl))+"(")
						}
					}();
					add_33(function(){
						if(_ms.bool(has_45args_63)){
							return ((("return "+_ms.show(call))+_ms.show(arg_45names))+")")
						} else {
							return (((((((("switch (arguments.length) {\n\tcase 1: return "+_ms.show(call))+"a)\n\tcase 2: return ")+_ms.show(call))+"a, b)\n\tcase 3: return ")+_ms.show(call))+"a, b, c)\n\tcase 4: return ")+_ms.show(call))+"a, b, c, d)\n\tdefault: throw new Error(\"Code not generated to accept \" + arguments.length + \" arguments.\")\n}")
						}
					}());
					return add_33("}")
				})
			},"displayName","method-src")
		}();
		const make_45callable_45method=function(){
			return _ms.set(function(method){
				const src=method_45src(method);
				const f=Function("def","wrap",src);
				const call=f(method.default,method.wrap);
				_ms.unlazy(pAdd)(call,"source",src);
				return call
			},"displayName","make-callable-method")
		}();
		const Method=Obj_45Type(function(){
			const doc="TODO:REST\nThe `doc` of the method should be its signature, followed by a string of the meaning.\nFor example:\n\tsizeness.\n\t\tdoc. |:Int _\n\t\t\t\"How big it is.\"\n\t\t...\nThe `wrap` property can replace the default calling mechanism.\nIt will be given the implementation, then the method's arguments.\nYou can use this to, for example, apply in/out conditions to every implementation.\n\tsizeness.\n\t\twrap. |impl x\n\t\t\tout\n\t\t\t\t! >=? res 0\n\t\t\timpl x";
			const test=function(){
				return _ms.set(function(){
					const m=Method(function(){
						const allow_45null_63=true;
						const _default=_ms.unlazy(thunk)("default");
						return {
							"allow-null?":allow_45null_63,
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
				const args=null;
				const _default=Function;
				const allow_45null_63=Boolean;
				const wrap=Function;
				return {
					args:args,
					default:_default,
					"allow-null?":allow_45null_63,
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
		implContains(Method,method_45contains_63);
		const _45_45contains_63=exports["--contains?"]=Method(function(){
			const doc="|:Boolean collection value\nWhether some collection of things as as an element `value`.\"";
			const impl_45symbol=containsImplSymbol;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL01ldGhvZC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0VBd0JBLHNCQUFPO2tCQUFBLFNBQUEsS0FBSyxJQUNHO0lBQ1QsWUFBSixNQUNJO0tBQUg7SUFBQSxPQUVHO0dBQUE7O0VBRU4sd0JBQVM7a0JBQUEsU0FBQSxFQUFBOztLQUNSLFlBQUEsV0FBQSxJQUNTO2FBQVIsTUFBSyxZQUFNLEVBQUU7S0FBQSxPQUVWO2FBQUg7S0FBQTtJQUFBO0dBQUE7O0VBRUYsNkJBQWM7a0JBQUEsU0FBQSxPQUNNO1dBQW5CLFNBQVUsU0FBQSxPQUNJO0tBQWIsb0JBQVksV0FBUztLQUNyQjtNQUNDLFlBQUEsZUFDUztjQUFSO1FBQW9CLFFBQUE7UUFDbkIseUJBQUMsT0FBRCxJQUNPO2dCQUFOO1FBQUEsT0FDRCxZQUFBLGdCQUFjLEVBQUUsUUFDb0I7Z0JBQW5DOzs7YUFFQztjQUFGO01BQUE7S0FBQTtLQUVILE9BQU0sOEJBQWlCO0tBQ3ZCLE1BQUssUUFBTSx1QkFDcUIsVUFBQTtNQUN6QixNQUFLLE1BQUssV0FBUyxpQkFDa0IsVUFBQTtjQUExQyxLQUFNO01BQUE7YUFDUCxPQUFNO0tBQUE7S0FFUDtNQUNDLFlBQUEsV0FBUyxpQkFDYztjQUFyQixtQkFBTTthQUVKO2NBQUYsa0JBQUs7OztLQUtSO01BQ0MsWUFBQSxXQUFTLGNBQ1c7Y0FBbEIsbUJBQU07YUFFSjtjQUFGLEVBM0JPLFlBMkJOOzs7S0FHSjtNQUNDLFlBQUEsZUFDUztjQUFQLHNCQUFRLGdCQUFNO2FBRVo7Y0FDRixrRUFDaUIseUNBQ0EsNENBQ0EsK0NBQ0E7OztZQUdwQixPQUFNO0lBQUE7R0FBQTs7RUFFUix5Q0FBd0I7a0JBQUEsU0FBQSxPQUNNO0lBQTdCLFVBQU0sYUFBVztJQUNqQixRQUFJLFNBQVUsTUFBTSxPQUFNO0lBQzFCLFdBQU8sRUFBRSxlQUFlO3FCQUNiLEtBQU0s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