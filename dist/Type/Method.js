"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","esast/dist/mangle-identifier","../Boolean","../js","../private/js-impl","../private/bootstrap","./Obj-Type","../at/q","../control","../Function","../Object","./Impl-Type","./Kind","../bang","../at/at-Type","../at/q","../compare","../Function","../private/bootstrap","../Try","./Type"],function(exports,mangle_45identifier_0,Boolean_1,js_2,js_45impl_3,bootstrap_4,Obj_45Type_5,_63_6,control_7,Function_8,Object_9,Impl_45Type_10,Kind_11,_33_12,_64_45Type_13,_63_14,compare_15,Function_16,bootstrap_17,Try_18,Type_19){
	exports._get=_ms.lazy(function(){
		const mangle_45identifier=_ms.getDefaultExport(mangle_45identifier_0),_$3=_ms.getModule(Boolean_1),and=_ms.get(_$3,"and"),implies=_ms.get(_$3,"implies"),not=_ms.get(_$3,"not"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),js_33=_ms.get(_$4,"js!"),js_61_61_61=_ms.get(_$4,"js==="),js_45instanceof=_ms.get(_$4,"js-instanceof"),js_45sub=_ms.get(_$4,"js-sub"),_$6=_ms.getModule(js_45impl_3),buildStr=_ms.get(_$6,"buildStr"),methodArgNames=_ms.get(_$6,"methodArgNames"),ohNo=_ms.get(_$6,"ohNo"),_$7=_ms.getModule(bootstrap_4),implContains=_ms.get(_$7,"implContains"),msDef=_ms.get(_$7,"msDef"),containsImplSymbol=_ms.get(_$7,"containsImplSymbol"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_5),_$10=_ms.lazyGetModule(_63_6),un_45_63=_ms.lazyProp(_$10,"un-?"),_$11=_ms.lazyGetModule(control_7),_if=_ms.lazyProp(_$11,"if"),_$12=_ms.lazyGetModule(Function_8),noop=_ms.lazyProp(_$12,"noop"),_$13=_ms.lazyGetModule(Object_9),p_45with_45proto_63=_ms.lazyProp(_$13,"p-with-proto?"),Impl_45Type=_ms.lazy(function(){
			return _ms.getDefaultExport(Impl_45Type_10)
		}),_$14=_ms.lazyGetModule(Impl_45Type_10),self_45type=_ms.lazyProp(_$14,"self-type"),Kind=_ms.lazy(function(){
			return _ms.getDefaultExport(Kind_11)
		}),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_12)
		}),_$18=_ms.lazyGetModule(_64_45Type_13),empty=_ms.lazyProp(_$18,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_14)
		}),_$20=_ms.lazyGetModule(compare_15),_61_63=_ms.lazyProp(_$20,"=?"),_$21=_ms.lazyGetModule(Function_16),thunk=_ms.lazyProp(_$21,"thunk"),_$22=_ms.lazyGetModule(bootstrap_17),pAdd=_ms.lazyProp(_$22,"pAdd"),_$23=_ms.lazyGetModule(Try_18),fails_63=_ms.lazyProp(_$23,"fails?"),_$24=_ms.lazyGetModule(Type_19),contains_63=_ms.lazyProp(_$24,"contains?");
		const if_33=function if_33(bool,act){
			if(_ms.bool(bool)){
				act()
			} else {}
		};
		const flag_63=function flag_63(_){
			return function(){
				if(_ms.bool(defined_63(_))){
					return js_33(js_61_61_61(_,false))
				} else {
					return false
				}
			}()
		};
		const method_45src=function method_45src(method){
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
				add_33((((("return function "+_ms.show(mangle_45identifier(method.name)))+"(")+_ms.show(arg_45names))+") {"));
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
		};
		const make_45callable_45method=function make_45callable_45method(method){
			const src=method_45src(method);
			const f=Function("def","wrap",src);
			const call=f(method.default,method.wrap);
			_ms.unlazy(pAdd)(call,"source",src);
			return call
		};
		const Method=Obj_45Type(function(){
			const doc="TODO:REST\nThe `doc` of the method should be its signature, followed by a string of the meaning.\nFor example:\n\tsizeness.\n\t\tdoc. |:Int _\n\t\t\t\"How big it is.\"\n\t\t...\nThe `wrap` property can replace the default calling mechanism.\nIt will be given the implementation, then the method's arguments.\nYou can use this to, for example, apply in/out conditions to every implementation.\n\tsizeness.\n\t\twrap. |impl x\n\t\t\tout\n\t\t\t\t! >=? res 0\n\t\t\timpl x";
			const test=function test(){
				const m=Method(function(){
					const allow_45null_63=true;
					const _default=_ms.unlazy(thunk)("default");
					return {
						"allow-null?":allow_45null_63,
						default:_default,
						name:"m"
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
						const _default=function _default(_){
							return ("call-"+_ms.show(_))
						};
						const wrap=function wrap(impl,arg){
							return ("wrap-"+_ms.show(impl(arg)))
						};
						return {
							default:_default,
							wrap:wrap,
							name:"wrap-method"
						}
					}());
					return wrap_45method("arg")
				}())
			};
			const props=function(){
				const name=String;
				const impl_45symbol=String;
				return {
					name:name,
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
					name:"opt-props"
				}
			}();
			const extensible=true;
			const defaults=function(){
				const name=function name(){
					return ohNo("Must provide name.")
				};
				const impl_45symbol=function impl_45symbol(_){
					return ("impl-"+_ms.show(_.name))
				};
				return {
					name:name,
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
				name:"Method"
			}
		}());
		const impl_33=exports["impl!"]=function(){
			const doc="Implements a Method for a type or types.";
			const test="See Method.test.";
			return _ms.set(function impl_33(method,implementor,implementation){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(_ms.unlazy(Impl_45Type),implementor,"implementor");
				_ms.checkContains(Function,implementation,"implementation");
				return do_45impl_33(method,implementor,implementation)
			},"doc",doc,"test",test)
		}();
		const impl_45double_33=exports["impl-double!"]=function impl_45double_33(method,implementor_450,implementor_451,implementation){
			_ms.checkContains(Method,method,"method");
			_ms.checkContains(_ms.unlazy(Impl_45Type),implementor_450,"implementor-0");
			_ms.checkContains(_ms.unlazy(Impl_45Type),implementor_451,"implementor-1");
			_ms.checkContains(Function,implementation,"implementation");
			const dispatcher=function(){
				if(_ms.bool(writable_63(implementor_450.prototype,method["impl-symbol"]))){
					const m=method;
					const dd=Double_45Dispatcher(function(){
						const name="<double dispatcher>";
						const method=m;
						const first_45type=implementor_450;
						const impl_45symbol=Symbol("<double dispatcher>");
						return {
							name:name,
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
		};
		const self_45impl_33=exports["self-impl!"]=function(){
			const doc="TODO";
			const test=function test(){
				return "TODO"
			};
			return _ms.set(function self_45impl_33(method,implementor,implementation){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(Object,implementor,"implementor");
				_ms.checkContains(Function,implementation,"implementation");
				return impl_33(method,_ms.unlazy(self_45type)(implementor),function(implementor){
					const args=[].slice.call(arguments,1);
					_ms.unlazy(noop)(implementor);
					return Function.apply.call(implementation,null,[].concat(_ms.arr(args)))
				})
			},"doc",doc,"test",test)
		}();
		const _63impl_45for=exports["?impl-for"]=function(){
			const doc="Implementation of a method for a particular Impl-Type.\nDoes not reference method.default or impls on super-types.\nEmpty if the type would use method.default.";
			const test=function test(){
				const _k0=[_ms.unlazy(contains_63),Method],_v0=_ms.unlazy(_63)(method_45contains_63);
				const _k1=[_ms.unlazy(_61_63),Method],_v1=_ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function _63impl_45for(method,type){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(_ms.unlazy(Impl_45Type),type,"type");
				const desc=Object.getOwnPropertyDescriptor(type.prototype,method["impl-symbol"]);
				return _ms.unlazy(_if)(and(defined_63(desc),_ms.lazy(function(){
					return not(desc.writable)
				})),_ms.lazy(function(){
					return desc.value
				}))
			},"doc",doc,"test",test)
		}();
		const impl_45for=exports["impl-for"]=function(){
			const doc="impl-for that fails when there is no implementation.";
			const test=function test(){
				const _k0=[_ms.unlazy(contains_63),Method],_v0=method_45contains_63;
				_ms.unlazy(_33)(impl_45for(_ms.unlazy(contains_63),_ms.unlazy(Kind)),_ms.unlazy(Impl_45Type),_ms.unlazy(Kind));
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function impl_45for(method,type){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(_ms.unlazy(Impl_45Type),type,"type");
				return _ms.unlazy(un_45_63)(_63impl_45for(method,type),_ms.lazy(function(){
					return ((((""+_ms.show(method))+" not implemented for ")+_ms.show(type))+".")
				}))
			},"doc",doc,"test",test)
		}();
		const writable_63=function writable_63(obj,property){
			const desc=Object.getOwnPropertyDescriptor(obj,property);
			return implies(defined_63(desc),_ms.lazy(function(){
				return desc.writable
			}))
		};
		const p_63=function p_63(obj,property){
			return defined_63(js_45sub(obj,property))
		};
		const propagate_45method_45down_33=exports["propagate-method-down!"]=function propagate_45method_45down_33(implementor,method_45symbol,implementation){
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
		};
		const do_45impl_33=function do_45impl_33(method,implementor,implementation){
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
		};
		const Double_45Dispatcher=Obj_45Type(function(){
			const props=function(){
				const name=String;
				const method=Method;
				const first_45type=null;
				const impl_45symbol=Symbol;
				return {
					name:name,
					method:method,
					"first-type":first_45type,
					"impl-symbol":impl_45symbol
				}
			}();
			const make_45callable=function make_45callable(_){
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
			};
			return {
				props:props,
				"make-callable":make_45callable,
				name:"Double-Dispatcher"
			}
		}());
		const method_45contains_63=function method_45contains_63(method,value){
			return _ms.unlazy(p_45with_45proto_63)(value,method["impl-symbol"])
		};
		implContains(Method,method_45contains_63);
		const _45_45contains_63=exports["--contains?"]=Method(function(){
			const doc="|:Boolean collection value\nWhether some collection of things as as an element `value`.\"";
			const impl_45symbol=containsImplSymbol;
			return {
				doc:doc,
				"impl-symbol":impl_45symbol,
				name:"--contains?"
			}
		}());
		msDef("contains",_45_45contains_63);
		const name=exports.name="Method";
		exports.default=Method;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL01ldGhvZC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0VBeUJBLFlBQU8sZUFBQSxLQUFLLElBQ0c7R0FDVCxZQUFKLE1BQ0k7SUFBSDtHQUFBLE9BRUc7RUFBQTtFQUVOLGNBQVMsaUJBQUEsRUFBQTs7SUFDUixZQUFBLFdBQUEsSUFDUztZQUFSLE1BQUssWUFBTSxFQUFFO0lBQUEsT0FFVjtZQUFIO0lBQUE7R0FBQTtFQUFBO0VBRUYsbUJBQWMsc0JBQUEsT0FDTTtVQUFuQixTQUFVLFNBQUEsT0FDSTtJQUFiLG9CQUFZLFdBQVM7SUFDckI7S0FDQyxZQUFBLGVBQ1M7YUFBUjtPQUFvQixRQUFBO09BQ25CLHlCQUFDLE9BQUQsSUFDTztlQUFOO09BQUEsT0FDRCxZQUFBLGdCQUFjLEVBQUUsUUFDb0I7ZUFBbkM7OztZQUVDO2FBQUY7S0FBQTtJQUFBO0lBRUgsT0FBTSxnQ0FBaUIsb0JBQWtCLDZCQUFjO0lBQ3ZELE1BQUssUUFBTSx1QkFDcUIsVUFBQTtLQUF6QixNQUFLLE1BQUssV0FBUyxpQkFDa0IsVUFBQTthQUExQyxLQUFNO0tBQUE7WUFDUCxPQUFNO0lBQUE7SUFFUDtLQUNDLFlBQUEsV0FBUyxpQkFDYzthQUFyQixtQkFBTTtZQUVKO2FBQUYsa0JBQUs7OztJQUVSO0tBQ0MsWUFBQSxXQUFTLGNBQ1c7YUFBbEIsbUJBQU07WUFFSjthQUFGLEVBeEJPLFlBd0JOOzs7SUFFSjtLQUNDLFlBQUEsZUFDUzthQUFQLHNCQUFRLGdCQUFNO1lBRVo7YUFFRixrRUFDaUIseUNBQ0EsNENBQ0EsK0NBQ0E7OztXQUdwQixPQUFNO0dBQUE7RUFBQTtFQUVSLCtCQUF3QixrQ0FBQSxPQUNNO0dBQTdCLFVBQU0sYUFBVztHQUNqQixRQUFJLFNBQVUsTUFBTSxPQUFNO0dBQzFCLFdBQU8sRUFBRSxlQUFlO29CQUNiLEtBQU0sU0FBUTtVQUN6QjtFQUFB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