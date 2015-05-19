"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","esast/dist/mangle-identifier","../Boolean","../js","../private/js-impl","../private/bootstrap","./Obj-Type","../bang","../at/q","../control","../Function","../Object","./Impl-Type","./Kind","../at/at-Type","../at/q","../compare","../Function","../private/bootstrap","../Try"],function(exports,mangle_45identifier_0,Boolean_1,js_2,js_45impl_3,bootstrap_4,Obj_45Type_5,_33_6,_63_7,control_8,Function_9,Object_10,Impl_45Type_11,Kind_12,_64_45Type_13,_63_14,compare_15,Function_16,bootstrap_17,Try_18){
	exports._get=_ms.lazy(function(){
		const mangle_45identifier=_ms.getDefaultExport(mangle_45identifier_0),_$3=_ms.getModule(Boolean_1),and=_$3.and,implies=_$3.implies,not=_$3.not,_$4=_ms.getModule(js_2),defined_63=_$4["defined?"],js_33=_$4["js!"],js_61_61_61=_$4["js==="],js_45instanceof=_$4["js-instanceof"],js_45sub=_$4["js-sub"],_$6=_ms.getModule(js_45impl_3),buildStr=_$6.buildStr,methodArgNames=_$6.methodArgNames,ohNo=_$6.ohNo,_$7=_ms.getModule(bootstrap_4),implContains=_$7.implContains,msDef=_$7.msDef,containsImplSymbol=_$7.containsImplSymbol,Obj_45Type=_ms.getDefaultExport(Obj_45Type_5),_33=_ms.lazy(function(){
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
				if(defined_63(_)){
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
					if(has_45args_63){
						return methodArgNames(function(){
							const _=method.args;
							if(_ms.contains(Number,_)){
								return _
							} else if(js_45instanceof(_,Array)){
								return _.length
							} else throw new Error("No branch of `case` matches.")
						}())
					} else {
						return "a, b, c, d"
					}
				}();
				add_33((((("return function "+_ms.show(mangle_45identifier(method.name)))+"(")+_ms.show(arg_45names))+") {"));
				if(flag_63(method["allow-null?"])){
					add_33("if (a == null) return def.apply(null, arguments)")
				};
				const impl=function(){
					if(defined_63(method.default)){
						return (("(a[\""+_ms.show(method["impl-symbol"]))+"\"] || def)")
					} else {
						return (("a[\""+_ms.show(method["impl-symbol"]))+"\"]")
					}
				}();
				const call=function(){
					if(defined_63(method.wrap)){
						return (("wrap("+_ms.show(impl))+", ")
					} else {
						return ((""+_ms.show(impl))+"(")
					}
				}();
				add_33(function(){
					if(has_45args_63){
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
			return call
		};
		const Method=Obj_45Type(function(){
			const doc="TODO:REST\nThe `doc` of the method should be its signature, followed by a string of the meaning.\nFor example:\n\tsizeness.\n\t\tdoc. |:Int _\n\t\t\t\"How big it is.\"\n\t\t...\nThe `wrap` property can replace the default calling mechanism.\nIt will be given the implementation, then the method's arguments.\nYou can use this to, for example, apply in/out conditions to every implementation.\n\tsizeness.\n\t\twrap. |impl x\n\t\t\tout\n\t\t\t\t! >=? res 0\n\t\t\timpl x";
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
			return _ms.set(function impl_33(method,implementor,implementation){
				return do_45impl_33(method,implementor,implementation)
			},"doc",doc)
		}();
		const impl_45double_33=exports["impl-double!"]=function impl_45double_33(method,implementor_450,implementor_451,implementation){
			const dispatcher=function(){
				if(writable_63(implementor_450.prototype,method["impl-symbol"])){
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
						if(_ms.contains(Double_45Dispatcher,_)){
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
			return _ms.set(function self_45impl_33(method,implementor,implementation){
				return impl_33(method,_ms.unlazy(self_45type)(implementor),function(implementor){
					const args=[].slice.call(arguments,1);
					_ms.unlazy(noop)(implementor);
					return Function.apply.call(implementation,null,[].concat(_ms.arr(args)))
				})
			},"doc",doc)
		}();
		const _63impl_45for=exports["?impl-for"]=function(){
			const doc="Implementation of a method for a particular Impl-Type.\nDoes not reference method.default or impls on super-types.\nEmpty if the type would use method.default.";
			return _ms.set(function _63impl_45for(method,type){
				const desc=Object.getOwnPropertyDescriptor(type.prototype,method["impl-symbol"]);
				return _ms.unlazy(_if)(and(defined_63(desc),_ms.lazy(function(){
					return not(desc.writable)
				})),_ms.lazy(function(){
					return desc.value
				}))
			},"doc",doc)
		}();
		const impl_45for=exports["impl-for"]=function(){
			const doc="impl-for that fails when there is no implementation.";
			return _ms.set(function impl_45for(method,type){
				return _ms.unlazy(un_45_63)(_63impl_45for(method,type),_ms.lazy(function(){
					return ((((""+_ms.show(method))+" not implemented for ")+_ms.show(type))+".")
				}))
			},"doc",doc)
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
			if(! p_63(implementor.prototype,method_45symbol)){
				{
					const _=implementor;
					if(_ms.contains(_ms.unlazy(Kind),_)){
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
			Object.defineProperty(implementor.prototype,method["impl-symbol"],function(){
				const value=implementation;
				const enumerable=false;
				return {
					value:value,
					enumerable:enumerable
				}
			}());
			if(contains_63(_ms.unlazy(Kind),implementor)){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL01ldGhvZC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0VBd0JBLGNBQVMsaUJBQUEsRUFBQTs7SUFDUixHQUFBLFdBQUEsR0FDUztZQUFSLE1BQUssWUFBTSxFQUFFO0lBQUEsT0FFVjtZQUFIO0lBQUE7R0FBQTtFQUFBO0VBRUYsbUJBQWMsc0JBQUEsT0FDTTtVQUFuQixTQUFVLFNBQUEsT0FDSTtJQUFiLG9CQUFZLFdBQVM7SUFDckI7S0FDQyxHQUFBLGNBQ1M7YUFBUjtPQUFvQixRQUFBO09BQ25CLGdCQUFDLE9BQUQsR0FDTztlQUFOO09BQUEsT0FDRCxHQUFBLGdCQUFjLEVBQUUsT0FDb0I7ZUFBbkM7OztZQUVDO2FBQUY7S0FBQTtJQUFBO0lBRUgsT0FBTSxnQ0FBaUIsb0JBQWtCLDZCQUFjO0lBQ3ZELEdBQUksUUFBTSx1QkFDa0I7S0FFM0IsT0FBTTtJQUFBO0lBRVA7S0FDQyxHQUFBLFdBQVMsZ0JBQ2M7YUFBckIsbUJBQU07WUFFSjthQUFGLGtCQUFLOzs7SUFFUjtLQUNDLEdBQUEsV0FBUyxhQUNXO2FBQWxCLG1CQUFNO1lBRUo7YUFBRixFQWhCTyxZQWdCTjs7O0lBRUo7S0FDQyxHQUFBLGNBQ1M7YUFBUCxzQkFBUSxnQkFBTTtZQUVaO2FBRUYsa0VBQ2lCLHlDQUNBLDRDQUNBLCtDQUNBOzs7V0FHcEIsT0FBTTtHQUFBO0VBQUE7RUFFUiwrQkFBd0Isa0NBQUEsT0FDTTtHQUE3QixVQUFNLGFBQVc7R0FDakIsUUFBSSxTQUFVLE1BQU0sT0FBTTtHQUMxQixXQUFPLEVBQUUsZUFBZTtVQUV4QjtFQUFBO0VBRUQsYUFBUyxxQkFDUTtHQUFoQixVQUNDO0dBc0NELHNCQUNNO0lBQUwsV0FBTTtJQUNOLG9CQUFhOzs7Ozs7R0FDZCw0QkFDVTtJQUFULFdBQUE7SUFDQSxlQUFTO0lBQ1Qsc0JBQWE7SUFDYixXQUFNOzs7Ozs7Ozs7R0FD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