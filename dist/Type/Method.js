"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","esast/dist/mangle-identifier","../js","../private/bootstrap","../private/js-impl","./Obj-Type","../at/q","./Impl-Type","./Kind","../Object","../at/at-Type","../at/q","../assert","../compare","../Try"],(exports,mangle_45identifier_0,js_1,bootstrap_2,js_45impl_3,Obj_45Type_4,_63_5,Impl_45Type_6,Kind_7,Object_8,_64_45Type_9,_63_10,assert_11,compare_12,Try_13)=>{
	exports._get=_ms.lazy(()=>{
		const mangle_45identifier=_ms.getDefaultExport(mangle_45identifier_0),_$3=_ms.getModule(js_1),defined_63=_ms.get(_$3,"defined?"),js_61_61_61=_ms.get(_$3,"js==="),js_45sub=_ms.get(_$3,"js-sub"),js_45typeof=_ms.get(_$3,"js-typeof"),_$4=_ms.getModule(bootstrap_2),containsImplSymbol=_ms.get(_$4,"containsImplSymbol"),implContains=_ms.get(_$4,"implContains"),msDef=_ms.get(_$4,"msDef"),_$5=_ms.getModule(js_45impl_3),buildStr=_ms.get(_$5,"buildStr"),methodArgNames=_ms.get(_$5,"methodArgNames"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_4),_$8=_ms.lazyGetModule(_63_5),un_45_63=_ms.lazyProp(_$8,"un-?"),Impl_45Type=_ms.lazy(()=>{
			return _ms.getDefaultExport(Impl_45Type_6)
		}),_$9=_ms.lazyGetModule(Impl_45Type_6),self_45type=_ms.lazyProp(_$9,"self-type"),Kind=_ms.lazy(()=>{
			return _ms.getDefaultExport(Kind_7)
		}),_$11=_ms.lazyGetModule(Object_8),p_45with_45proto_63=_ms.lazyProp(_$11,"p-with-proto?"),_$13=_ms.lazyGetModule(_64_45Type_9),empty=_ms.lazyProp(_$13,"empty"),_63=_ms.lazy(()=>{
			return _ms.getDefaultExport(_63_10)
		}),_$15=_ms.lazyGetModule(assert_11),assert_45call_33=_ms.lazyProp(_$15,"assert-call!"),_$16=_ms.lazyGetModule(compare_12),_61_63=_ms.lazyProp(_$16,"=?"),_$17=_ms.lazyGetModule(Try_13),fails_63=_ms.lazyProp(_$17,"fails?");
		const flag_63=function flag_63(_){
			return (defined_63(_)&&_)
		};
		const method_45src=function method_45src(method){
			return buildStr(add_33=>{
				const has_45args_63=defined_63(method.args);
				const arg_45names=()=>{
					if(_ms.bool(has_45args_63)){
						return methodArgNames(()=>{
							const _=method.args;
							if(_ms.bool(_ms.contains(Number,_))){
								return _
							} else if(_ms.bool(_ms.contains(Array,_))){
								return _.length
							} else throw new Error("No branch of `case` matches.")
						}())
					} else {
						return `b,c,d`
					}
				}();
				const args=()=>{
					if(_ms.bool(js_61_61_61(arg_45names.length,0))){
						return `a`
					} else {
						return `a,${_ms.show(arg_45names)}`
					}
				}();
				add_33(`return function ${_ms.show(mangle_45identifier(method.name))}(${_ms.show(args)}) {`);
				const impl=()=>{
					const _=method["impl-symbol"];
					if(_ms.bool(js_61_61_61(js_45typeof(_),`string`))){
						return `a["${_ms.show(_)}"]`
					} else if(_ms.bool(_ms.contains(Symbol,_))){
						return `a[symbol]`
					} else throw new Error("No branch of `case` matches.")
				}();
				const default_63=defined_63(method.default);
				const wrap_63=defined_63(method.wrap);
				const allow_45null_63=flag_63(method["allow-null?"]);
				if(allow_45null_63){
					if(! _ms.bool(default_63))throw _ms.error(`Method with \`allow-null?\` must have \`default\`.`)
				};
				if(default_63){
					const cond=()=>{
						if(_ms.bool(allow_45null_63)){
							return `a == null || ${_ms.show(impl)} === undefined`
						} else {
							return `${_ms.show(impl)} === undefined`
						}
					}();
					add_33(()=>{
						if(_ms.bool(wrap_63)){
							return `if (${_ms.show(cond)}) return wrap.apply(null, [def].concat(Array.prototype.slice.call(arguments)))`
						} else {
							return `if (${_ms.show(cond)}) return def.apply(a, Array.prototype.slice.call(arguments, 1))`
						}
					}())
				};
				add_33(()=>{
					if(_ms.bool(wrap_63)){
						return ()=>{
							if(_ms.bool(has_45args_63)){
								return `return wrap(${_ms.show(impl)},${_ms.show(args)})`
							} else {
								return `switch (arguments.length) {\n\tcase 1: return wrap(${_ms.show(impl)}, a)\n\tcase 2: return wrap(${_ms.show(impl)}, a, b)\n\tcase 3: return wrap(${_ms.show(impl)}, a, b, c)\n\tcase 4: return wrap(${_ms.show(impl)}, a, b, c, d)\n\tdefault: throw new Error("Code not generated to handle "+arguments.length+"arguments.")\n}`
							}
						}()
					} else {
						return ()=>{
							if(_ms.bool(has_45args_63)){
								return `return ${_ms.show(impl)}(${_ms.show(arg_45names)})`
							} else {
								return `switch (arguments.length) {\n\tcase 1: return ${_ms.show(impl)}()\n\tcase 2: return ${_ms.show(impl)}(b)\n\tcase 3: return ${_ms.show(impl)}(b,c)\n\tcase 4: return ${_ms.show(impl)}(b,c,d)\n\tdefault: throw new Error("Code not generated to handle "+arguments.length+"arguments.")\n}`
							}
						}()
					}
				}());
				return add_33(`}`)
			})
		};
		const make_45callable_45method=function make_45callable_45method(method){
			const src=method_45src(method);
			const f=Function(`symbol`,`def`,`wrap`,src);
			return f(method["impl-symbol"],method.default,method.wrap)
		};
		const Method=Obj_45Type(()=>{
			const built={};
			const doc=built.doc=`A Method allows you to call a JavaScript-style method as a function.\nUnlike a Mason Method, for a Method,\nthe first argument becomes \`this\` within the implementation's body.\nTODO: document \`wrap\``;
			const test=built.test=function test(){
				const m=Method(()=>{
					const built={};
					const allow_45null_63=built["allow-null?"]=true;
					const _default=built.default=function _default(){
						return `default`
					};
					return _ms.setName(built,"m")
				}());
				impl_33(m,String,()=>{
					return `String`
				});
				impl_45double_33(m,Number,Number,()=>{
					return `Number Number`
				});
				impl_45double_33(m,Number,String,()=>{
					return `Number String`
				});
				_ms.unlazy(assert_45call_33)(m,()=>{
					const built=new global.Map();
					_ms.assoc(built,[null],`default`);
					_ms.assoc(built,[`a`],`String`);
					_ms.assoc(built,[1,1],`Number Number`);
					_ms.assoc(built,[1,`a`],`Number String`);
					return built
				}());
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return m(1,m)
				});
				_ms.assert(_ms.unlazy(_61_63),`wrap-call-arg`,()=>{
					const wrap_45method=Method(()=>{
						const built={};
						const _default=built.default=function _default(){
							const _this=this;
							return `call-${_ms.show(_this)}`
						};
						const wrap=built.wrap=function wrap(impl,arg){
							return `wrap-${_ms.show(impl.call(arg))}`
						};
						return _ms.setName(built,"wrap-method")
					}());
					return wrap_45method(`arg`)
				}())
			};
			const props=built.props=()=>{
				const built={};
				const name=built.name=String;
				const impl_45symbol=built["impl-symbol"]=null;
				return built
			}();
			const opt_45props=built["opt-props"]=()=>{
				const built={};
				const args=built.args=null;
				const _default=built.default=Function;
				const allow_45null_63=built["allow-null?"]=Boolean;
				const wrap=built.wrap=Function;
				return _ms.setName(built,"opt-props")
			}();
			const extensible=built.extensible=true;
			const defaults=built.defaults=()=>{
				const built={};
				const name=built.name=function name(){
					throw _ms.error(`Must provide name.`)
				};
				const impl_45symbol=built["impl-symbol"]=function impl_45symbol(_){
					return `impl-${_ms.show(_.name)}`
				};
				return built
			}();
			const make_45callable=built["make-callable"]=make_45callable_45method;
			return _ms.setName(built,"Method")
		}());
		const impl_33=exports["impl!"]=function impl_33(method,implementor,implementation){
			_ms.checkContains(Method,method,"method");
			_ms.checkContains(_ms.unlazy(Impl_45Type),implementor,"implementor");
			_ms.checkContains(Function,implementation,"implementation");
			do_45impl_33(method,implementor,implementation)
		};
		const impl_45double_33=exports["impl-double!"]=function impl_45double_33(method,implementor_450,implementor_451,implementation){
			_ms.checkContains(Method,method,"method");
			_ms.checkContains(_ms.unlazy(Impl_45Type),implementor_450,"implementor-0");
			_ms.checkContains(_ms.unlazy(Impl_45Type),implementor_451,"implementor-1");
			_ms.checkContains(Function,implementation,"implementation");
			const dispatcher=()=>{
				if(_ms.bool(writable_63(implementor_450.prototype,method["impl-symbol"]))){
					const m=method;
					const dd=Double_45Dispatcher(()=>{
						const built={};
						const name=built.name=`<double dispatcher>`;
						const method=built.method=m;
						const first_45type=built["first-type"]=implementor_450;
						const impl_45symbol=built["impl-symbol"]=Symbol(`<double dispatcher>`);
						return built
					}());
					do_45impl_33(method,implementor_450,dd);
					return dd
				} else {
					const _=js_45sub(implementor_450.prototype,method["impl-symbol"]);
					if(! _ms.bool(_ms.contains(Double_45Dispatcher,_)))throw _ms.error(`Can't define double dispatch of ${_ms.show(method)} for ${_ms.show(implementor_450)}.\nA single-dispatch implementation already exists: ${_ms.show(_)}.`);
					return _
				}
			}();
			do_45impl_33(dispatcher,implementor_451,implementation)
		};
		const self_45impl_33=exports["self-impl!"]=()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){};
			return _ms.set(function self_45impl_33(method,implementor,implementation){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(Object,implementor,"implementor");
				_ms.checkContains(Function,implementation,"implementation");
				impl_33(method,_ms.unlazy(self_45type)(implementor),implementation)
			},built)
		}();
		const _63impl_45for=exports["?impl-for"]=()=>{
			const built={};
			const doc=built.doc=`Implementation of a method for a particular Impl-Type.\nDoes not reference method.default or impls on super-types.\nEmpty if the type would use method.default.`;
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
				return _ms.bool((defined_63(desc)&&! desc.writable))?_ms.some(()=>{
					return desc.value
				}()):_ms.None
			},built)
		}();
		const impl_45for=exports["impl-for"]=()=>{
			const built={};
			const doc=built.doc=`impl-for that fails when there is no implementation.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[contains_63,Method],method_45contains_63);
				return built
			};
			return _ms.set(function impl_45for(method,type){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(_ms.unlazy(Impl_45Type),type,"type");
				return _ms.unlazy(un_45_63)(_63impl_45for(method,type),_ms.lazy(()=>{
					return `${_ms.show(method)} not implemented for ${_ms.show(type)}.`
				}))
			},built)
		}();
		const writable_63=function writable_63(obj,property){
			const desc=Object.getOwnPropertyDescriptor(obj,property);
			return (! defined_63(desc)||desc.writable)
		};
		const p_63=function p_63(obj,property){
			return defined_63(js_45sub(obj,property))
		};
		const propagate_45method_45down_33=exports["propagate-method-down!"]=function propagate_45method_45down_33(implementor,method_45symbol,implementation){
			if(! _ms.bool(p_63(implementor.prototype,method_45symbol))){
				{
					const _=implementor;
					if(_ms.bool(_ms.contains(_ms.unlazy(Kind),_))){
						for(let sub_45implementor of _.implementors){
							propagate_45method_45down_33(sub_45implementor,method_45symbol,implementation)
						}
					} else {
						Object.defineProperty(_.prototype,method_45symbol,()=>{
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
			if(! _ms.bool(writable_63(implementor.prototype,method["impl-symbol"])))throw _ms.error(()=>{
				return `Can not redefine method ${_ms.show(method)} for ${_ms.show(implementor)}.`
			}());
			Object.defineProperty(implementor.prototype,method["impl-symbol"],()=>{
				const built={};
				const value=built.value=implementation;
				const writable=built.writable=false;
				const configurable=built.configurable=false;
				const enumerable=built.enumerable=false;
				return built
			}());
			if(contains_63(_ms.unlazy(Kind),implementor)){
				for(let _ of implementor.implementors){
					propagate_45method_45down_33(_,method["impl-symbol"],implementation)
				}
			}
		};
		const Double_45Dispatcher=Obj_45Type(()=>{
			const built={};
			const props=built.props=()=>{
				const built={};
				const name=built.name=String;
				const method=built.method=Method;
				const first_45type=built["first-type"]=null;
				const impl_45symbol=built["impl-symbol"]=Symbol;
				return built
			}();
			const make_45callable=built["make-callable"]=function make_45callable(_){
				return function(){
					const _this=this;
					const args=[].slice.call(arguments,0);
					const target_452=js_45sub(args,0);
					if(! _ms.bool(defined_63(target_452)))throw _ms.error(`Can't double-dispatch ${_ms.show(_.method)} for undefined.`);
					const impl=js_45sub(target_452,_["impl-symbol"]);
					if(! _ms.bool(defined_63(impl)))throw _ms.error(`Can't double-dispatch ${_ms.show(_.method)} for ${_ms.show(_["first-type"])} on ${_ms.show(target_452)}.`);
					_ms.assert(contains_63,Function,impl);
					return Function.prototype.apply.call(impl,_this,args)
				}
			};
			return _ms.setName(built,"Double-Dispatcher")
		}());
		const contains_63=Method(()=>{
			const built={};
			const doc=built.doc=`|:Boolean collection value\nWhether some collection of things as as an element \`value\`."`;
			const impl_45symbol=built["impl-symbol"]=containsImplSymbol;
			return _ms.setName(built,"contains?")
		}());
		msDef(`contains`,contains_63);
		const method_45contains_63=function method_45contains_63(method,value){
			return _ms.unlazy(p_45with_45proto_63)(value,method["impl-symbol"])
		};
		implContains(Method,method_45contains_63);
		const name=exports.name=`Method`;
		exports.default=Method;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL01ldGhvZC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztFQWtCQSxjQUFTLGlCQUFBLEVBQ0M7VUFBVCxDQUFJLFdBQVEsSUFBRTtFQUFBO0VBRWYsbUJBQWMsc0JBQUEsT0FDTTtVQUFuQixTQUFVLFFBQ0k7SUFBYixvQkFBWSxXQUFTO0lBQ3JCO0tBQ0MsWUFBQSxlQUNTO2FBQVI7T0FBb0IsUUFBQTtPQUNuQix5QkFBQyxPQUFELElBQ3NEO2VBQXJEO09BQUEsT0FDRCx5QkFBQyxNQUFELElBQzZDO2VBQTVDOzs7WUFFQzthQUFGOzs7SUFFSDtLQUNDLFlBQUEsWUFBTSxtQkFBaUIsSUFDQzthQUF0QjtZQUVFO2FBQUYsY0FBRzs7O0lBRU4sT0FBTSw0QkFBaUIsb0JBQWtCLDBCQUFjO0lBRXZEO0tBQVksUUFBQTtLQUNYLFlBQUEsWUFBTyxZQUFVLEdBQUksV0FDdUI7YUFBMUMsZUFBSztZQUNQLHlCQUFDLE9BQUQsSUFDTzthQUFMOzs7SUFFSCxpQkFBVyxXQUFTO0lBQ3BCLGNBQVEsV0FBUztJQUNqQixzQkFBYyxRQUFNO0lBRXBCLEdBQUksZ0JBQ1c7S0FBTixjQUFBLDRCQUFpQjs7SUFDMUIsR0FBSSxXQUNRO0tBQVg7TUFDQyxZQUFBLGlCQUNXO2NBQVQseUJBQWM7YUFFWjtjQUNGLFlBQUM7OztLQUNKO01BQ0MsWUFBQSxTQUNLO2NBQUgsZ0JBQUs7YUFFSDtjQUFGLGdCQUFLOzs7O0lBRVQ7S0FDQyxZQUFBLFNBQ0s7O09BQ0gsWUFBQSxlQUNTO2VBQVAsd0JBQWEsa0JBQU87Y0FFbEI7ZUFDRiwrREFDc0IsNkNBQ0EsZ0RBQ0EsbURBQ0E7OztZQUl0Qjs7T0FDRixZQUFBLGVBQ1M7ZUFBUCxtQkFBUSxrQkFBTztjQUViO2VBQ0YsMERBQ2lCLHNDQUNBLHVDQUNBLHlDQUNBOzs7OztXQUl0QixPQUFNOzs7RUFFUiwrQkFBd0Isa0NBQUEs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