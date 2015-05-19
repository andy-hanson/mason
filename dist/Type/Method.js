"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","esast/dist/mangle-identifier","../Boolean","../js","../private/js-impl","../private/bootstrap","./Obj-Type","../bang","../at/q","../control","../Function","../Object","./Impl-Type","./Kind","../at/at-Type","../at/q","../compare","../Function","../private/bootstrap","../Try"],function(exports,mangle_45identifier_0,Boolean_1,js_2,js_45impl_3,bootstrap_4,Obj_45Type_5,_33_6,_63_7,control_8,Function_9,Object_10,Impl_45Type_11,Kind_12,_64_45Type_13,_63_14,compare_15,Function_16,bootstrap_17,Try_18){
	exports._get=_ms.lazy(function(){
		const mangle_45identifier=_ms.getDefaultExport(mangle_45identifier_0),_$3=_ms.getModule(Boolean_1),and=_ms.get(_$3,"and"),implies=_ms.get(_$3,"implies"),not=_ms.get(_$3,"not"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),js_33=_ms.get(_$4,"js!"),js_61_61_61=_ms.get(_$4,"js==="),js_45instanceof=_ms.get(_$4,"js-instanceof"),js_45sub=_ms.get(_$4,"js-sub"),_$6=_ms.getModule(js_45impl_3),buildStr=_ms.get(_$6,"buildStr"),methodArgNames=_ms.get(_$6,"methodArgNames"),ohNo=_ms.get(_$6,"ohNo"),_$7=_ms.getModule(bootstrap_4),implContains=_ms.get(_$7,"implContains"),msDef=_ms.get(_$7,"msDef"),containsImplSymbol=_ms.get(_$7,"containsImplSymbol"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_5),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_6)
		}),_$11=_ms.lazyGetModule(_63_7),un_45_63=_ms.lazyProp(_$11,"un-?"),_$12=_ms.lazyGetModule(control_8),_if=_ms.lazyProp(_$12,"if"),_$13=_ms.lazyGetModule(Function_9),noop=_ms.lazyProp(_$13,"noop"),_$14=_ms.lazyGetModule(Object_10),p_45with_45proto_63=_ms.lazyProp(_$14,"p-with-proto?"),Impl_45Type=_ms.lazy(function(){
			return _ms.getDefaultExport(Impl_45Type_11)
		}),_$15=_ms.lazyGetModule(Impl_45Type_11),self_45type=_ms.lazyProp(_$15,"self-type"),Kind=_ms.lazy(function(){
			return _ms.getDefaultExport(Kind_12)
		}),_$18=_ms.lazyGetModule(_64_45Type_13),empty=_ms.lazyProp(_$18,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_14)
		}),_$20=_ms.lazyGetModule(compare_15),_61_63=_ms.lazyProp(_$20,"=?"),_$21=_ms.lazyGetModule(Function_16),thunk=_ms.lazyProp(_$21,"thunk"),_$22=_ms.lazyGetModule(bootstrap_17),pAdd=_ms.lazyProp(_$22,"pAdd"),_$23=_ms.lazyGetModule(Try_18),fails_63=_ms.lazyProp(_$23,"fails?");
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
				if(_ms.bool(flag_63(method["allow-null?"]))){
					if(! _ms.bool(defined_63(method.default))){
						ohNo("Method with `allow-null?` must have `default`.")
					};
					add_33("if (a == null) return def.apply(null, arguments)")
				};
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
				const _k0=[contains_63,Method],_v0=_ms.unlazy(_63)(method_45contains_63);
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
				const _k0=[contains_63,Method],_v0=method_45contains_63;
				_ms.unlazy(_33)(impl_45for(contains_63,_ms.unlazy(Kind)),_ms.unlazy(Impl_45Type),_ms.unlazy(Kind));
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
			if(! _ms.bool(p_63(implementor.prototype,method_45symbol))){
				{
					const _=implementor;
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
				}
			}
		};
		const do_45impl_33=function do_45impl_33(method,implementor,implementation){
			if(! _ms.bool(writable_63(implementor.prototype,method["impl-symbol"]))){
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
			if(_ms.bool(contains_63(_ms.unlazy(Kind),implementor))){
				implementor.implementors.forEach(function(_){
					return propagate_45method_45down_33(_,method["impl-symbol"],implementation)
				})
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
					_ms.unlazy(_33)(defined_63(target_452),_ms.lazy(function(){
						return (("Can't double-dispatch "+_ms.show(_.method))+" for undefined.")
					}));
					const impl=js_45sub(target_452,_["impl-symbol"]);
					if(_ms.bool(defined_63(impl))){
						_ms.unlazy(_33)(contains_63,Function,impl)
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
		const contains_63=Method(function(){
			const doc="|:Boolean collection value\nWhether some collection of things as as an element `value`.\"";
			const impl_45symbol=containsImplSymbol;
			return {
				doc:doc,
				"impl-symbol":impl_45symbol,
				name:"contains?"
			}
		}());
		msDef("contains",contains_63);
		const name=exports.name="Method";
		exports.default=Method;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL01ldGhvZC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0VBd0JBLGNBQVMsaUJBQUEsRUFBQTs7SUFDUixZQUFBLFdBQUEsSUFDUztZQUFSLE1BQUssWUFBTSxFQUFFO0lBQUEsT0FFVjtZQUFIO0lBQUE7R0FBQTtFQUFBO0VBRUYsbUJBQWMsc0JBQUEsT0FDTTtVQUFuQixTQUFVLFNBQUEsT0FDSTtJQUFiLG9CQUFZLFdBQVM7SUFDckI7S0FDQyxZQUFBLGVBQ1M7YUFBUjtPQUFvQixRQUFBO09BQ25CLHlCQUFDLE9BQUQsSUFDTztlQUFOO09BQUEsT0FDRCxZQUFBLGdCQUFjLEVBQUUsUUFDb0I7ZUFBbkM7OztZQUVDO2FBQUY7S0FBQTtJQUFBO0lBRUgsT0FBTSxnQ0FBaUIsb0JBQWtCLDZCQUFjO0lBQ3ZELFlBQUksUUFBTSx3QkFDa0I7S0FBckIsY0FBUSxXQUFTLGlCQUNjO01BQXBDLEtBQU07S0FBQTtLQUNQLE9BQU07SUFBQTtJQUVQO0tBQ0MsWUFBQSxXQUFTLGlCQUNjO2FBQXJCLG1CQUFNO1lBRUo7YUFBRixrQkFBSzs7O0lBRVI7S0FDQyxZQUFBLFdBQVMsY0FDVzthQUFsQixtQkFBTTtZQUVKO2FBQUYsRUFoQk8sWUFnQk47OztJQUVKO0tBQ0MsWUFBQSxlQUNTO2FBQVAsc0JBQVEsZ0JBQU07WUFFWjthQUVGLGtFQUNpQix5Q0FDQSw0Q0FDQSwrQ0FDQTs7O1dBR3BCLE9BQU07R0FBQTtFQUFBO0VBRVIsK0JBQXdCLGtDQUFBLE9BQ007R0FBN0IsVUFBTSxhQUFXO0dBQ2pCLFFBQUksU0FBVSxNQUFNLE9BQU07R0FDMUIsV0FBTyxFQUFFLGVBQWU7b0JBQ2IsS0FBTSxTQUFRO1VBQ3pCO0VBQUE7RUFFRCxhQUFTLHFCQUNRO0dBQWhCLFVBQ0M7R0FnQkQsV0FDTyxlQUFBO0lBQU4sUUFBSSxpQkFDTTtLQUFULHNCQUFhO0tBQ2Is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