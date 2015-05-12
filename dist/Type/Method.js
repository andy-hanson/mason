"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Bool","../js","../private/js-impl","../private/bootstrap","./Obj-Type","../at/q","../control","../Fun","../Obj","../Try","./Impl-Type","./Kind","../bang","../at/at-Type","../at/q","../compare","../Fun","../math/Num","../private/bootstrap","../Try","./Type"],function(exports,Bool_0,js_1,js_45impl_2,bootstrap_3,Obj_45Type_4,_63_5,control_6,Fun_7,Obj_8,Try_9,Impl_45Type_10,Kind_11,_33_12,_64_45Type_13,_63_14,compare_15,Fun_16,Num_17,bootstrap_18,Try_19,Type_20){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Bool_0),and=_ms.get(_$2,"and"),implies=_ms.get(_$2,"implies"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(js_1),defined_63=_ms.get(_$3,"defined?"),js_45sub=_ms.get(_$3,"js-sub"),_$4=_ms.getModule(js_45impl_2),buildStr=_ms.get(_$4,"buildStr"),_$5=_ms.getModule(bootstrap_3),Fun=_ms.get(_$5,"Fun"),impl_45contains_63_33=_ms.get(_$5,"impl-contains?!"),Obj=_ms.get(_$5,"Obj"),Str=_ms.get(_$5,"Str"),msDef=_ms.get(_$5,"msDef"),contains_63_45impl_45symbol=_ms.get(_$5,"contains?-impl-symbol"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_4),_$8=_ms.lazyGetModule(_63_5),un_45_63=_ms.lazyProp(_$8,"un-?"),_$9=_ms.lazyGetModule(control_6),_if=_ms.lazyProp(_$9,"if"),_$10=_ms.lazyGetModule(Fun_7),noop=_ms.lazyProp(_$10,"noop"),_$11=_ms.lazyGetModule(Obj_8),p_45with_45proto_63=_ms.lazyProp(_$11,"p-with-proto?"),_$12=_ms.lazyGetModule(Try_9),oh_45no_33=_ms.lazyProp(_$12,"oh-no!"),Impl_45Type=_ms.lazy(function(){
			return _ms.getDefaultExport(Impl_45Type_10)
		}),_$13=_ms.lazyGetModule(Impl_45Type_10),self_45type=_ms.lazyProp(_$13,"self-type"),Kind=_ms.lazy(function(){
			return _ms.getDefaultExport(Kind_11)
		}),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_12)
		}),_$17=_ms.lazyGetModule(_64_45Type_13),empty=_ms.lazyProp(_$17,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_14)
		}),_$19=_ms.lazyGetModule(compare_15),_61_63=_ms.lazyProp(_$19,"=?"),_$20=_ms.lazyGetModule(Fun_16),thunk=_ms.lazyProp(_$20,"thunk"),Num=_ms.lazy(function(){
			return _ms.getDefaultExport(Num_17)
		}),_$22=_ms.lazyGetModule(bootstrap_18),p_43_33=_ms.lazyProp(_$22,"p+!"),_$23=_ms.lazyGetModule(Try_19),fails_63=_ms.lazyProp(_$23,"fails?"),_$24=_ms.lazyGetModule(Type_20),contains_63=_ms.lazyProp(_$24,"contains?");
		const make_45callable_45method=_ms.set(function(method){
			const src=buildStr(_ms.set(function(add_33){
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
			},"displayName","src"));
			const f=Fun("def","wrap",src);
			const call=f(method.default,method.wrap);
			_ms.unlazy(p_43_33)(call,"source",src);
			return call
		},"displayName","make-callable-method");
		const Method=Obj_45Type(function(){
			const doc="TODO:REST\nThe `doc` of the method should be its signature, followed by a string of the meaning.\nFor example:\n\tsizeness.\n\t\tdoc. |:Int _\n\t\t\t\"How big it is.\"\n\t\t...\nThe `wrap` property can replace the default calling mechanism.\nIt will be given the implementation, then the method's arguments.\nYou can use this to, for example, apply in/out conditions to every implementation.\n\tsizeness.\n\t\twrap. |impl x\n\t\t\tout\n\t\t\t\t! >=? res 0\n\t\t\timpl x";
			const test=_ms.set(function(){
				const m=Method(function(){
					const _default=_ms.unlazy(thunk)("default");
					return {
						default:_default,
						displayName:"m"
					}
				}());
				impl_33(m,Str,_ms.unlazy(thunk)("Str"));
				impl_45double_33(m,_ms.unlazy(Num),_ms.unlazy(Num),_ms.unlazy(thunk)("Num Num"));
				impl_45double_33(m,_ms.unlazy(Num),Str,_ms.unlazy(thunk)("Num Str"));
				_ms.unlazy(_33)(_ms.unlazy(_61_63),m(null),"default");
				_ms.unlazy(_33)(_ms.unlazy(_61_63),m("a"),"Str");
				_ms.unlazy(_33)(_ms.unlazy(_61_63),m(1,1),"Num Num");
				_ms.unlazy(_33)(_ms.unlazy(_61_63),m(1,"a"),"Num Str");
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return m(1,m)
				});
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),"wrap-call-arg",function(){
					const wrap_45method=Method(function(){
						const _default=_ms.set(function(_){
							return ("call-"+_ms.show(_))
						},"displayName","default");
						const wrap=_ms.set(function(impl,arg){
							return ("wrap-"+_ms.show(impl(arg)))
						},"displayName","wrap");
						return {
							default:_default,
							wrap:wrap,
							displayName:"wrap-method"
						}
					}());
					return wrap_45method("arg")
				}())
			},"displayName","test");
			const props=function(){
				const displayName=Str;
				const impl_45symbol=Str;
				return {
					displayName:displayName,
					"impl-symbol":impl_45symbol
				}
			}();
			const opt_45props=function(){
				const _default=Fun;
				const wrap=Fun;
				return {
					default:_default,
					wrap:wrap,
					displayName:"opt-props"
				}
			}();
			const extensible=true;
			const defaults=function(){
				const displayName=_ms.set(function(){
					return _ms.unlazy(oh_45no_33)("displayName required!")
				},"displayName","displayName");
				const impl_45symbol=_ms.set(function(_){
					return ("impl-"+_ms.show(_.displayName))
				},"displayName","impl-symbol");
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
				_ms.checkContains(Fun,implementation,"implementation");
				return do_45impl_33(method,implementor,implementation)
			},"doc",doc,"test",test,"displayName","impl!")
		}();
		const impl_45double_33=exports["impl-double!"]=_ms.set(function(method,implementor_450,implementor_451,implementation){
			_ms.checkContains(Method,method,"method");
			_ms.checkContains(_ms.unlazy(Impl_45Type),implementor_450,"implementor-0");
			_ms.checkContains(_ms.unlazy(Impl_45Type),implementor_451,"implementor-1");
			_ms.checkContains(Fun,implementation,"implementation");
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
							return _ms.unlazy(oh_45no_33)((((((("Can't define double dispatch of "+_ms.show(method))+" for ")+_ms.show(implementor_450))+".\nA single-dispatch implementation already exists: ")+_ms.show(_))+"."))
						}
					}()
				}
			}();
			return do_45impl_33(dispatcher,implementor_451,implementation)
		},"displayName","impl-double!");
		const self_45impl_33=exports["self-impl!"]=function(){
			const doc="TODO";
			const test=_ms.set(function(){
				return "TODO"
			},"displayName","test");
			return _ms.set(function(method,implementor,implementation){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(Obj,implementor,"implementor");
				_ms.checkContains(Fun,implementation,"implementation");
				return impl_33(method,_ms.unlazy(self_45type)(implementor),function(implementor){
					const args=[].slice.call(arguments,1);
					_ms.unlazy(noop)(implementor);
					return Function.apply.call(implementation,null,[].concat(_ms.arr(args)))
				})
			},"doc",doc,"test",test,"displayName","self-impl!")
		}();
		const _63impl_45for=exports["?impl-for"]=function(){
			const doc="Implementation of a method for a particular Impl-Type.\nDoes not reference method.default or impls on super-types.\nEmpty if the type would use method.default.";
			const test=_ms.set(function(){
				const _k0=[_ms.unlazy(contains_63),Method],_v0=_ms.unlazy(_63)(method_45contains_63);
				const _k1=[_ms.unlazy(_61_63),Method],_v1=_ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1)
			},"displayName","test");
			return _ms.set(function(method,type){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(_ms.unlazy(Impl_45Type),type,"type");
				const desc=Obj.getOwnPropertyDescriptor(type.prototype,method["impl-symbol"]);
				return _ms.unlazy(_if)(and(defined_63(desc),_ms.lazy(function(){
					return not(desc.writable)
				})),_ms.lazy(function(){
					return desc.value
				}))
			},"doc",doc,"test",test,"displayName","?impl-for")
		}();
		const impl_45for=exports["impl-for"]=function(){
			const doc="impl-for that fails when there is no implementation.";
			const test=_ms.set(function(){
				const _k0=[_ms.unlazy(contains_63),Method],_v0=method_45contains_63;
				_ms.unlazy(_33)(impl_45for(_ms.unlazy(contains_63),_ms.unlazy(Kind)),_ms.unlazy(Impl_45Type),_ms.unlazy(Kind));
				return _ms.map(_k0,_v0)
			},"displayName","test");
			return _ms.set(function(method,type){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(_ms.unlazy(Impl_45Type),type,"type");
				return _ms.unlazy(un_45_63)(_63impl_45for(method,type),_ms.lazy(function(){
					return ((((""+_ms.show(method))+" not implemented for ")+_ms.show(type))+".")
				}))
			},"doc",doc,"test",test,"displayName","impl-for")
		}();
		const writable_63=_ms.set(function(obj,property){
			const desc=global.Object.getOwnPropertyDescriptor(obj,property);
			return implies(defined_63(desc),_ms.lazy(function(){
				return desc.writable
			}))
		},"displayName","writable?");
		const p_63=_ms.set(function(obj,property){
			return defined_63(js_45sub(obj,property))
		},"displayName","p?");
		const propagate_45method_45down_33=exports["propagate-method-down!"]=_ms.set(function(implementor,method_45symbol,implementation){
			{
				const _=implementor;
				if(_ms.bool(not(p_63(_.prototype,method_45symbol)))){
					if(_ms.bool(_ms.contains(_ms.unlazy(Kind),_))){
						_.implementors.forEach(function(sub_45implementor){
							return propagate_45method_45down_33(sub_45implementor,method_45symbol,implementation)
						})
					} else {
						Obj.defineProperty(_.prototype,method_45symbol,function(){
							const value=implementation;
							const writable=true;
							return {
								value:value,
								writable:writable
							}
						}())
					}
				} else {
					null
				}
			}
		},"displayName","propagate-method-down!");
		const do_45impl_33=_ms.set(function(method,implementor,implementation){
			if(_ms.bool(writable_63(implementor.prototype,method["impl-symbol"]))){
				null
			} else {
				_ms.unlazy(oh_45no_33)((((("Can not redefine method "+_ms.show(method))+" for ")+_ms.show(implementor))+"."))
			};
			Obj.defineProperty(implementor.prototype,method["impl-symbol"],function(){
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
				} else {
					null
				}
			}
		},"displayName","do-impl!");
		const Double_45Dispatcher=Obj_45Type(function(){
			const props=function(){
				const displayName=Str;
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
			const make_45callable=_ms.set(function(_){
				return function(){
					const args=[].slice.call(arguments,0);
					const target_452=js_45sub(args,1);
					if(_ms.bool(defined_63(target_452))){
						null
					} else {
						_ms.unlazy(oh_45no_33)(_ms.lazy(function(){
							return (("Can't double-dispatch "+_ms.show(_.method))+" for undefined.")
						}))
					};
					const impl=js_45sub(target_452,_["impl-symbol"]);
					if(_ms.bool(defined_63(impl))){
						_ms.unlazy(_33)(_ms.unlazy(contains_63),Fun,impl)
					} else {
						_ms.unlazy(oh_45no_33)(_ms.lazy(function(){
							return ((((("Can't double-dispatch "+_ms.show(_.method))+" for ")+_ms.show(_["first-type"]))+" on ")+_ms.show(target_452))
						}))
					};
					return Function.apply.call(impl,null,[].concat(_ms.arr(args)))
				}
			},"displayName","make-callable");
			return {
				props:props,
				"make-callable":make_45callable,
				displayName:"Double-Dispatcher"
			}
		}());
		const method_45contains_63=_ms.set(function(method,value){
			return _ms.unlazy(p_45with_45proto_63)(value,method["impl-symbol"])
		},"displayName","method-contains?");
		impl_45contains_63_33(Method,method_45contains_63);
		const _45_45contains_63=exports["--contains?"]=Method(function(){
			const doc="|:Bool collection value\nWhether some collection of things as as an element `value`.\"";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL01ldGhvZC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7RUF5QkEsdUNBQXdCLFNBQUEsT0FDTTtHQUE3QixVQUFNLGlCQUFVLFNBQUEsT0FDSTtJQUFuQixPQUFNO0lBQ047S0FDQyxZQUFBLFdBQVMsaUJBQ2M7YUFBckIsdUNBQTBCO1lBRXhCO2FBQUYsa0JBQUs7OztJQUNSLE9BQU0sd0JBQVk7SUFDWixPQUNMLGtFQUMyQjtJQUV2QixZQUFKLFdBQVMsY0FDVztLQUFuQixPQUNDO0lBQUEsT0FRRTtLQUFILE9BQ0M7SUFBQTtXQU9ILE9BQU07R0FBQTtHQUVQLFFBQUksSUFBSyxNQUFNLE9BQU07R0FDckIsV0FBTyxFQUFFLGVBQWU7dUJBQ2QsS0FBTSxTQUFRO1VBQ3hCO0VBQUE7RUFFRCxhQUFTLHFCQUNRO0dBQWhCLFVBQ0M7R0FnQkQsbUJBQ08sVUFBQTtJQUFOLFFBQUksaUJBQ007S0FBVCxpQ0FBZ0I7WUFBUDs7Ozs7SUFDVixRQUFNLEVBQUUsc0JBQVk7SUFDcEIsaUJBQWEsb0RBQWtCO0lBQy9CLGlCQUFhLGtCQUFNLHNCQUFZO3VDQUN6QixFQUFFLE1BQUs7dUNBQ1AsRUFBRyxLQUFLO3VDQUNSLEVBQUUsRUFBRSxHQUFJO3VDQUNSLEVBQUUsRUFBRyxLQUFLO3lDQUVBLFVBQUE7WUFBZixFQUFFLEVBQUU7SUFBQTs4Q0FFQywwQkFDYztLQUFuQixvQkFBYyxpQkFDTTtNQUFuQix1QkFBVSxTQUFBLEVBQ0M7Y0FBVCxrQkFBTTtNQUFBO01BQ1IsbUJBQU8sU0FBQSxLQUFLLElBQ0c7Y0FBYixrQkFBTSxLQUFLO01BQUE7YUFITTs7Ozs7O1lBSXBCLGNBQWE7SUFBQTtHQUFBO0dBRWYsc0JBQ007SUFBTCxrQkFBYTtJQUNiLG9CQUFhO1dBRFI7Ozs7O0dBRU4sNEJBQ1U7SUFBVCxlQUFTO0lBQ1QsV0FBTTtXQURHOzs7Ozs7R0FFVixpQkFBWTtHQUNaLHlCQUNTO0lBQ1IsMEJBQ2MsVUFBQTttQ0FBTDtJQUFBO0lBQ1QsNEJBQWMsU0FBQSxFQUNDO1lBQWIsa0JBQU07O1dBSkE7Ozs7O0dBS1Qsc0JBQWU7VUFuREM7Ozs7Ozs7Ozs7O0VBcURqQix5Q0FDTTtHQUFMLFVBQU07R0FDTixXQUFPO2tCQUNOLFNBQUEsT0FBYyxZQUFzQixlQUNrQjtzQkFEL0M7O3NCQUE0QztXQUNuRCxhQUFTLE9BQU8sWUFBWTtHQUFBOztFQUU5Qix1REFBZSxTQUFBLE9BQWMsZ0JBQXdCLGdCQUF3QixlQUNrQjtxQkFEekU7OztxQkFBc0U7R0FDM0Y7SUFDQyxZQUFBLFlBQVUsMEJBQXdCLHdCQUNrQjtLQUFuRCxRQUFJO0tBQ0osU0FBSyw4QkFDaUI7TUFBckIsa0JBQWM7TUFDZCxhQUFRO01BQ1IsbUJBQVk7TUFDWixvQkFBYSxPQUFRO2FBSEE7Ozs7Ozs7S0FJdEIsYUFBUyxPQUFPLGdCQUFjO1lBQzlCO0lBQUEsT0FFRzs7TUFBRSxRQUFBLFNBQU8sMEJBQXdCO01BQ25DLHlCQUFDLG9CQUFELElBQ2tCO2NBQWpCO01BQUEsT0FFRztxQ0FDRixrREFBaUMsMkJBQWEsbUZBQ0k7Ozs7O1VBRXZELGFBQVMsV0FBVyxnQkFBYztFQUFBO0VBRW5DLHFEQUNXO0dBQVYsVUFBTTtHQUNOLG1CQUNPLFVBQUE7V0FBTDtHQUFBO2tCQUNELFNBQUEsT0FBYyxZQUFnQixlQUNrQjtzQkFEekM7c0JBQW1CO3NCQUFtQjtXQUM3QyxRQUFNLCtCQUFrQixhQUFjLFNBQUEsWUFDbUI7O3NCQUFuRDtnQ0FDTCxzQ0FBZTtJQUFBO0dBQUE7O0VBRWxCLG1EQUNVO0dBQVQsVUFDQztHQUdELG1CQUNPLFVBQUE7SUFBTixVQUFBLHlCQUFZLDRCQUFjO0lBQzFCLFVBQUEsb0JBQUs7OztrQkFDTCxTQUFBLE9BQWMsS0FDYztzQkFEckI7O0lBRVAsV0FBTyw2QkFBNkIsZUFBZTsyQkFDL0MsSUFBSyxXQUFTO1lBQVEsSUFBSTs7WUFBaUI7Ozs7RUFFakQsK0NBQ1M7R0FBUixVQUFNO0dBQ04sbUJBQ08sVUFBQTtJQUFOLFVBQUEseUJBQVksWUFBWTtvQkFDckI7OztrQkFDSCxTQUFBLE9BQWMsS0FDYztzQkFEckI7O2dDQUNELGNBQVUsT0FBTztZQUFRLElBaERuQixZQWdEb0IsMkNBQTZCOzs7O0VBSTlELDBCQUFhLFNBQUEsSUFBSSxTQUNRO0dBQXhCLFdBQU8sdUNBQXVDLElBQUk7VUFDbEQsUUFBUyxXQUFTO1dBQU87OztFQUUxQixtQkFBTSxTQUFBLElBQUksU0FDUTtVQUFqQixXQUFVLFNBQU8sSUFBSTtFQUFBO0VBR3RCLDZFQUF5QixTQUFBLFlBQVksZ0JBQWMsZUFDOEM7R0FBMUY7SUFBQSxRQUFBO0lBRUwsWUFBQSxJQUFLLEtBQUcsWUFBWSxtQkFDYztLQUM1QiwwQ0FBSixJQUNLO01BQUosdUJBQXdCLFNBQUEsa0JBQ2U7Y0FBdEMsNkJBQXVCLGtCQUFnQixnQkFBYztNQUFBO0tBQUEsT0FFbkQ7TUFFSCxtQkFBbUIsWUFBWSwwQkFDYTtPQUEzQyxZQUFPO09BQ1AsZUFBVTtjQURpQzs7Ozs7O1dBRzNDO0tBQUg7SUFBQTtHQUFBO0VBQUE7RUFJSCwyQkFBWSxTQUFBLE9BQU8sWUFBWSxlQVE5QjtHQUxNLFlBQUosWUFBVSxzQkFBc0Isd0JBQ2tCO0lBQWpEO0dBQUEsT0FFRzsyQkFBSyx3Q0FBeUIsMkJBQWE7O0dBRWpELG1CQUFtQixzQkFBc0IsZ0NBQ2tCO0lBQTFELFlBQU87SUFDUCxpQkFBWTtXQUQ4Qzs7Ozs7R0FFckQ7SUFBQSxRQUFBO0lBQ0wsMENBQUEsSUFDSztLQUFKLHVCQUF3QixTQUFBLElBQ0c7YUFBMUIsNkJBQXVCLElBQUksc0JBQW1CO0tBQUE7SUFBQSxPQUU1QztLQUFIO0lBQUE7R0FBQTtFQUFBO0VBRUgsMEJBQW9CLHFCQUNRO0dBQTNCLHNCQUNNO0lBQUwsa0JBQWE7SUFDYixhQUFRO0lBQ1IsbUJBQUE7SUFDQSxvQkFBYTtXQUhSOzs7Ozs7O0dBSU4sOEJBQWdCLFNBQUEsRUFDQztXQUFmLFVBQ087O0tBQVAsaUJBQVcsU0FBTyxLQUFLO0tBRVosWUFBVixXQUFTLGFBQ1E7TUFBaEI7S0FBQSxPQUVHOztjQUFNLG9DQUF1Qjs7O0tBRWxDLFdBQU8sU0FBTyxXQUFTO0tBRVosWUFBVixXQUFTLE9BQ0k7OENBQUEsSUFBSTtLQUFBLE9BRWI7O2NBQU0sdUNBQXVCLDZCQUFlLG1DQUFrQjtNQUFBO0tBQUE7Z0NBQ25FLDRCQUFLO0lBQUE7R0FBQTtVQXBCb0I7Ozs7OztFQXNCN0IsbUNBQW9CLFNBQUEsT0FBTyxNQUNLOzBDQUFqQixNQUFNOztFQUNyQixzQkFBZ0IsT0FBTztFQUd2QiwrQ0FBYSxpQkFDTTtHQUFsQixVQUNDO0dBRUQsb0JBQWE7VUFISzs7Ozs7O0VBS25CLE1BQU8sV0FBVTtFQWhRakIsc0NBQUE7a0JBa1FBIiwiZmlsZSI6IlR5cGUvTWV0aG9kLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=