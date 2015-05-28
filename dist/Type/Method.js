"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","esast/dist/mangle-identifier","../Boolean","../js","../private/js-impl","../private/bootstrap","./Obj-Type","../bang","../at/q","../Function","../Object","./Impl-Type","./Kind","../at/at-Type","../at/q","../compare","../Function","../private/bootstrap","../Try"],function(exports,mangle_45identifier_0,Boolean_1,js_2,js_45impl_3,bootstrap_4,Obj_45Type_5,_33_6,_63_7,Function_8,Object_9,Impl_45Type_10,Kind_11,_64_45Type_12,_63_13,compare_14,Function_15,bootstrap_16,Try_17){
	exports._get=_ms.lazy(function(){
		const mangle_45identifier=_ms.getDefaultExport(mangle_45identifier_0),_$3=_ms.getModule(Boolean_1),and=_ms.get(_$3,"and"),implies=_ms.get(_$3,"implies"),not=_ms.get(_$3,"not"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),js_33=_ms.get(_$4,"js!"),js_61_61_61=_ms.get(_$4,"js==="),js_45instanceof=_ms.get(_$4,"js-instanceof"),js_45sub=_ms.get(_$4,"js-sub"),_$6=_ms.getModule(js_45impl_3),buildStr=_ms.get(_$6,"buildStr"),methodArgNames=_ms.get(_$6,"methodArgNames"),ohNo=_ms.get(_$6,"ohNo"),_$7=_ms.getModule(bootstrap_4),implContains=_ms.get(_$7,"implContains"),msDef=_ms.get(_$7,"msDef"),containsImplSymbol=_ms.get(_$7,"containsImplSymbol"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_5),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_6)
		}),_$11=_ms.lazyGetModule(_63_7),un_45_63=_ms.lazyProp(_$11,"un-?"),_$12=_ms.lazyGetModule(Function_8),noop=_ms.lazyProp(_$12,"noop"),_$13=_ms.lazyGetModule(Object_9),p_45with_45proto_63=_ms.lazyProp(_$13,"p-with-proto?"),Impl_45Type=_ms.lazy(function(){
			return _ms.getDefaultExport(Impl_45Type_10)
		}),_$14=_ms.lazyGetModule(Impl_45Type_10),self_45type=_ms.lazyProp(_$14,"self-type"),Kind=_ms.lazy(function(){
			return _ms.getDefaultExport(Kind_11)
		}),_$17=_ms.lazyGetModule(_64_45Type_12),empty=_ms.lazyProp(_$17,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_13)
		}),_$19=_ms.lazyGetModule(compare_14),_61_63=_ms.lazyProp(_$19,"=?"),_$20=_ms.lazyGetModule(Function_15),thunk=_ms.lazyProp(_$20,"thunk"),_$21=_ms.lazyGetModule(bootstrap_16),pAdd=_ms.lazyProp(_$21,"pAdd"),_$22=_ms.lazyGetModule(Try_17),fails_63=_ms.lazyProp(_$22,"fails?");
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
				if(flag_63(method["allow-null?"])){
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
			const built={};
			const doc=built.doc="TODO:REST\nThe `doc` of the method should be its signature, followed by a string of the meaning.\nFor example:\n\tsizeness.\n\t\tdoc. |:Int _\n\t\t\t\"How big it is.\"\n\t\t...\nThe `wrap` property can replace the default calling mechanism.\nIt will be given the implementation, then the method's arguments.\nYou can use this to, for example, apply in/out conditions to every implementation.\n\tsizeness.\n\t\twrap. |impl x\n\t\t\tout\n\t\t\t\t! >=? res 0\n\t\t\timpl x";
			const test=built.test=function test(){
				const m=Method(function(){
					const built={};
					const allow_45null_63=built["allow-null?"]=true;
					const _default=built.default=_ms.unlazy(thunk)("default");
					return _ms.setName(built,"m")
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
				_ms.unlazy(_33)(_ms.unlazy(_61_63),"wrap-call-arg",function(){
					const wrap_45method=Method(function(){
						const built={};
						const _default=built.default=function _default(_){
							return ("call-"+_ms.show(_))
						};
						const wrap=built.wrap=function wrap(impl,arg){
							return ("wrap-"+_ms.show(impl(arg)))
						};
						return _ms.setName(built,"wrap-method")
					}());
					return wrap_45method("arg")
				}())
			};
			const props=built.props=function(){
				const built={};
				const name=built.name=String;
				const impl_45symbol=built["impl-symbol"]=String;
				return built
			}();
			const opt_45props=built["opt-props"]=function(){
				const built={};
				const args=built.args=null;
				const _default=built.default=Function;
				const allow_45null_63=built["allow-null?"]=Boolean;
				const wrap=built.wrap=Function;
				return _ms.setName(built,"opt-props")
			}();
			const extensible=built.extensible=true;
			const defaults=built.defaults=function(){
				const built={};
				const name=built.name=function name(){
					ohNo("Must provide name.")
				};
				const impl_45symbol=built["impl-symbol"]=function impl_45symbol(_){
					return ("impl-"+_ms.show(_.name))
				};
				return built
			}();
			const make_45callable=built["make-callable"]=make_45callable_45method;
			return _ms.setName(built,"Method")
		}());
		const impl_33=exports["impl!"]=function(){
			const built={};
			const doc=built.doc="Implements a Method for a type or types.";
			const test=built.test="See Method.test.";
			return _ms.set(function impl_33(method,implementor,implementation){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(_ms.unlazy(Impl_45Type),implementor,"implementor");
				_ms.checkContains(Function,implementation,"implementation");
				do_45impl_33(method,implementor,implementation)
			},built)
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
						const built={};
						const name=built.name="<double dispatcher>";
						const method=built.method=m;
						const first_45type=built["first-type"]=implementor_450;
						const impl_45symbol=built["impl-symbol"]=Symbol("<double dispatcher>");
						return built
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
			do_45impl_33(dispatcher,implementor_451,implementation)
		};
		const self_45impl_33=exports["self-impl!"]=function(){
			const built={};
			const doc=built.doc="TODO";
			const test=built.test=function test(){};
			return _ms.set(function self_45impl_33(method,implementor,implementation){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(Object,implementor,"implementor");
				_ms.checkContains(Function,implementation,"implementation");
				impl_33(method,_ms.unlazy(self_45type)(implementor),function(implementor){
					const args=[].slice.call(arguments,1);
					_ms.unlazy(noop)(implementor);
					return Function.apply.call(implementation,null,[].concat(_ms.arr(args)))
				})
			},built)
		}();
		const _63impl_45for=exports["?impl-for"]=function(){
			const built={};
			const doc=built.doc="Implementation of a method for a particular Impl-Type.\nDoes not reference method.default or impls on super-types.\nEmpty if the type would use method.default.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[contains_63,Method],_ms.unlazy(_63)(method_45contains_63));
				_ms.assoc(built,[_ms.unlazy(_61_63),Method],_ms.unlazy(empty)(_ms.unlazy(_63)));
				return built
			};
			return _ms.set(function _63impl_45for(method,type){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(_ms.unlazy(Impl_45Type),type,"type");
				const desc=Object.getOwnPropertyDescriptor(type.prototype,method["impl-symbol"]);
				return _ms.bool(and(defined_63(desc),_ms.lazy(function(){
					return not(desc.writable)
				})))?_ms.some(function(){
					return desc.value
				}()):_ms.None
			},built)
		}();
		const impl_45for=exports["impl-for"]=function(){
			const built={};
			const doc=built.doc="impl-for that fails when there is no implementation.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[contains_63,Method],method_45contains_63);
				_ms.unlazy(_33)(impl_45for(contains_63,_ms.unlazy(Kind)),_ms.unlazy(Impl_45Type),_ms.unlazy(Kind));
				return built
			};
			return _ms.set(function impl_45for(method,type){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(_ms.unlazy(Impl_45Type),type,"type");
				return _ms.unlazy(un_45_63)(_63impl_45for(method,type),_ms.lazy(function(){
					return ((((""+_ms.show(method))+" not implemented for ")+_ms.show(type))+".")
				}))
			},built)
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
						for(let sub_45implementor of _.implementors[Symbol.iterator]()){
							propagate_45method_45down_33(sub_45implementor,method_45symbol,implementation)
						}
					} else {
						Object.defineProperty(_.prototype,method_45symbol,function(){
							const built={};
							const value=built.value=implementation;
							const writable=built.writable=true;
							const configurable=built.configurable=true;
							const enumerable=built.enumerable=false;
							return built
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
				const built={};
				const value=built.value=implementation;
				const writable=built.writable=false;
				const configurable=built.configurable=false;
				const enumerable=built.enumerable=false;
				return built
			}());
			if(contains_63(_ms.unlazy(Kind),implementor)){
				for(let _ of implementor.implementors[Symbol.iterator]()){
					propagate_45method_45down_33(_,method["impl-symbol"],implementation)
				}
			}
		};
		const Double_45Dispatcher=Obj_45Type(function(){
			const built={};
			const props=built.props=function(){
				const built={};
				const name=built.name=String;
				const method=built.method=Method;
				const first_45type=built["first-type"]=null;
				const impl_45symbol=built["impl-symbol"]=Symbol;
				return built
			}();
			const make_45callable=built["make-callable"]=function make_45callable(_){
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
			return _ms.setName(built,"Double-Dispatcher")
		}());
		const method_45contains_63=function method_45contains_63(method,value){
			return _ms.unlazy(p_45with_45proto_63)(value,method["impl-symbol"])
		};
		implContains(Method,method_45contains_63);
		const contains_63=Method(function(){
			const built={};
			const doc=built.doc="|:Boolean collection value\nWhether some collection of things as as an element `value`.\"";
			const impl_45symbol=built["impl-symbol"]=containsImplSymbol;
			return _ms.setName(built,"contains?")
		}());
		msDef("contains",contains_63);
		const name=exports.name="Method";
		exports.default=Method;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL01ldGhvZC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0VBdUJBLGNBQVMsaUJBQUEsRUFBQTs7SUFDUixZQUFBLFdBQVEsSUFDQztZQUFSLE1BQUssWUFBTSxFQUFFO0lBQUEsT0FFVjtZQUFIO0lBQUE7R0FBQTtFQUFBO0VBRUYsbUJBQWMsc0JBQUEsT0FDTTtVQUFuQixTQUFVLFNBQUEsT0FDSTtJQUFiLG9CQUFZLFdBQVM7SUFDckI7S0FDQyxZQUFBLGVBQ1M7YUFBUjtPQUFvQixRQUFBO09BQ25CLHlCQUFDLE9BQUQsSUFDTztlQUFOO09BQUEsT0FDRCxZQUFBLGdCQUFjLEVBQUUsUUFDb0I7ZUFBbkM7OztZQUVDO2FBQUY7S0FBQTtJQUFBO0lBRUgsT0FBTSxnQ0FBaUIsb0JBQWtCLDZCQUFjO0lBQ3ZELEdBQUksUUFBTSx1QkFDa0I7S0FBckIsY0FBUSxXQUFTLGlCQUNjO01BQXBDLEtBQU07S0FBQTtLQUNQLE9BQU07SUFBQTtJQUVQO0tBQ0MsWUFBQSxXQUFTLGlCQUNjO2FBQXJCLG1CQUFNO1lBRUo7YUFBRixrQkFBSzs7O0lBRVI7S0FDQyxZQUFBLFdBQVMsY0FDVzthQUFsQixtQkFBTTtZQUVKO2FBQUYsRUFmTyxZQWVOOzs7SUFFSjtLQUNDLFlBQUEsZUFDUzthQUFQLHNCQUFRLGdCQUFNO1lBRVo7YUFFRixrRUFDaUIseUNBQ0EsNENBQ0EsK0NBQ0E7OztXQUdwQixPQUFNO0dBQUE7RUFBQTtFQUVSLCtCQUF3QixrQ0FBQSxPQUNNO0dBQTdCLFVBQU0sYUFBVztHQUNqQixRQUFJLFNBQVUsTUFBTSxPQUFNO0dBQzFCLFdBQU8sRUFBRSxlQUFlO29CQUNiLEtBQU0sU0FBUTtVQUN6QjtFQUFBO0VBRUQsYUFBUSxxQkFDUTs7R0FBZixvQkFDQztHQWdCRCxzQkFDUSxlQUFBO0lBQVAsUUFBSSxpQkFDTTs7S0FBVCwyQ0FBYTtLQUNi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