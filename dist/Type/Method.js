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
				return _ms.unlazy(_if)(and(defined_63(desc),_ms.lazy(function(){
					return not(desc.writable)
				})),_ms.lazy(function(){
					return desc.value
				}))
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
			if(_ms.bool(contains_63(_ms.unlazy(Kind),implementor))){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL01ldGhvZC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0VBd0JBLGNBQVMsaUJBQUEsRUFBQTs7SUFDUixZQUFBLFdBQVEsSUFDQztZQUFSLE1BQUssWUFBTSxFQUFFO0lBQUEsT0FFVjtZQUFIO0lBQUE7R0FBQTtFQUFBO0VBRUYsbUJBQWMsc0JBQUEsT0FDTTtVQUFuQixTQUFVLFNBQUEsT0FDSTtJQUFiLG9CQUFZLFdBQVM7SUFDckI7S0FDQyxZQUFBLGVBQ1M7YUFBUjtPQUFvQixRQUFBO09BQ25CLHlCQUFDLE9BQUQsSUFDTztlQUFOO09BQUEsT0FDRCxZQUFBLGdCQUFjLEVBQUUsUUFDb0I7ZUFBbkM7OztZQUVDO2FBQUY7S0FBQTtJQUFBO0lBRUgsT0FBTSxnQ0FBaUIsb0JBQWtCLDZCQUFjO0lBQ3ZELFlBQUksUUFBTSx3QkFDa0I7S0FBckIsY0FBUSxXQUFTLGlCQUNjO01BQXBDLEtBQU07S0FBQTtLQUNQLE9BQU07SUFBQTtJQUVQO0tBQ0MsWUFBQSxXQUFTLGlCQUNjO2FBQXJCLG1CQUFNO1lBRUo7YUFBRixrQkFBSzs7O0lBRVI7S0FDQyxZQUFBLFdBQVMsY0FDVzthQUFsQixtQkFBTTtZQUVKO2FBQUYsRUE2RGMsWUE3RGI7OztJQUVKO0tBQ0MsWUFBQSxlQUNTO2FBQVAsc0JBQVEsZ0JBQU07WUFFWjthQUVGLGtFQUNpQix5Q0FDQSw0Q0FDQSwrQ0FDQTs7O1dBR3BCLE9BQU07R0FBQTtFQUFBO0VBRVIsK0JBQXdCLGtDQUFBLE9BQ007R0FBN0IsVUFBTSxhQUFXO0dBQ2pCLFFBQUksU0FBVSxNQUFNLE9BQU07R0FDMUIsV0FBTyxFQUFFLGVBQWU7b0JBQ2IsS0FBTSxTQUFRO1VBQ3pCO0VBQUE7RUFFRCxhQUFRLHFCQUNROztHQUFmLG9CQUNDO0dBZ0JELHNCQUNRLGVBQUE7SUFBUCxRQUFJLGlCQUNNOztLQUFULDJDQUFhO0tB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