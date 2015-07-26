"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","esast/dist/util","../js","../private/bootstrap","../private/js-impl","../at/q","../assert","../compare","./Impl-Type","./Kind","../Object","../at/q","../Try"],(exports,util_0,js_1,bootstrap_2,js_45impl_3,_63_4,assert_5,compare_6,Impl_45Type_7,Kind_8,Object_9,_63_10,Try_11)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(util_0),escapeStringForLiteral=_ms.get(_$2,"escapeStringForLiteral"),_$3=_ms.getModule(js_1),defined_63=_ms.get(_$3,"defined?"),js_61_61_61=_ms.get(_$3,"js==="),js_45delete=_ms.get(_$3,"js-delete"),js_45instanceof=_ms.get(_$3,"js-instanceof"),js_45sub=_ms.get(_$3,"js-sub"),js_45typeof=_ms.get(_$3,"js-typeof"),_$4=_ms.getModule(bootstrap_2),containsImplSymbol=_ms.get(_$4,"containsImplSymbol"),implContains=_ms.get(_$4,"implContains"),msDef=_ms.get(_$4,"msDef"),pAdd=_ms.get(_$4,"pAdd"),_$5=_ms.getModule(js_45impl_3),buildStr=_ms.get(_$5,"buildStr"),_$7=_ms.lazyGetModule(_63_4),un_45_63=_ms.lazyProp(_$7,"un-?"),_$8=_ms.lazyGetModule(assert_5),assert_45call_33=_ms.lazyProp(_$8,"assert-call!"),_$9=_ms.lazyGetModule(compare_6),_61_63=_ms.lazyProp(_$9,"=?"),Impl_45Type=_ms.lazy(()=>{
			return _ms.getDefaultExport(Impl_45Type_7)
		}),_$10=_ms.lazyGetModule(Impl_45Type_7),Self_45Type=_ms.lazyProp(_$10,"Self-Type"),Kind=_ms.lazy(()=>{
			return _ms.getDefaultExport(Kind_8)
		}),_$12=_ms.lazyGetModule(Object_9),p_45with_45proto_63=_ms.lazyProp(_$12,"p-with-proto?"),_$14=_ms.lazyGetModule(_63_10),_63None=_ms.lazyProp(_$14,"?None"),_63some=_ms.lazyProp(_$14,"?some"),_$15=_ms.lazyGetModule(Try_11),fails_63=_ms.lazyProp(_$15,"fails?");
		const flag_63=function flag_63(_){
			return (defined_63(_)&&_)
		};
		const random_45digits=function random_45digits(){
			return Math.random().toString().slice(2)
		};
		const Method=class Method extends Function{
			constructor(params){
				const name=params.name;
				if(! _ms.bool(defined_63(name)))throw _ms.error(`Must provide method name.`);
				const default_63=defined_63(params.default);
				const wrap_63=defined_63(params.wrap);
				const allow_45null_63=flag_63(params["allow-null?"]);
				if(! _ms.bool((! allow_45null_63||default_63)))throw _ms.error(`Method with \`allow-null?\` must have \`default.`);
				const secret_45name=`__method_${_ms.show(name)}_${_ms.show(random_45digits())}`;
				const impl_45symbol=()=>{
					const _=params["impl-symbol"];
					if(_ms.bool(defined_63(_))){
						return _
					} else {
						return Symbol(name)
					}
				}();
				const has_45args_63=defined_63(params.args);
				const num_45args=()=>{
					const _=params.args;
					if(_ms.bool(js_61_61_61(js_45typeof(_),`number`))){
						return _
					} else if(_ms.bool(js_45instanceof(_,Array))){
						return _.length
					} else if(_ms.bool(! defined_63(_))){
						return - 1
					} else throw new (Error)("No branch of `case` matches.")
				}();
				const src=buildStr(add_33=>{
					const access_45method=`global["${_ms.show(escapeStringForLiteral(secret_45name))}"]`;
					const impl=()=>{
						const _=impl_45symbol;
						if(_ms.bool(js_61_61_61(js_45typeof(_),`symbol`))){
							return `a[${_ms.show(access_45method)}["impl-symbol"]]`
						} else if(_ms.bool(_ms.contains(String,_))){
							return `a["${_ms.show(escapeStringForLiteral(_))}"]`
						} else throw new (Error)("No branch of `case` matches.")
					}();
					if(default_63){
						const cond=()=>{
							if(_ms.bool(allow_45null_63)){
								return `a == null || ${_ms.show(impl)} === undefined`
							} else {
								return `${_ms.show(impl)} === undefined`
							}
						}();
						const call=()=>{
							if(_ms.bool(wrap_63)){
								return `${_ms.show(access_45method)}.wrap.apply(null, [${_ms.show(access_45method)}.default].concat(Array.prototype.slice.call(arguments)))`
							} else {
								return `${_ms.show(access_45method)}.default.apply(a, Array.prototype.slice.call(arguments, 1))`
							}
						}();
						add_33(`if (${_ms.show(cond)}) return ${_ms.show(call)}`)
					};
					const wrap=`${_ms.show(access_45method)}.wrap`;
					return add_33(()=>{
						if(_ms.bool(has_45args_63)){
							const args=()=>{
								switch(num_45args){
									case 1:return `a`
									case 2:return `a, b`
									case 3:return `a, b, c`
									default:throw new (Error)("No branch of `switch` matches.")
								}
							}();
							return ()=>{
								if(_ms.bool(wrap_63)){
									return `return ${_ms.show(wrap)}(${_ms.show(impl)}, ${_ms.show(args)})`
								} else {
									return `return ${_ms.show(impl)}(${_ms.show(args.slice(3))})`
								}
							}()
						} else if(_ms.bool(wrap_63)){
							return `switch (arguments.length) \{\n\tcase 1: return ${_ms.show(wrap)}(${_ms.show(impl)}, a)\n\tcase 2: return ${_ms.show(wrap)}(${_ms.show(impl)}, a, b)\n\tcase 3: return ${_ms.show(wrap)}(${_ms.show(impl)}, a, b, c)\n\tcase 4: return ${_ms.show(wrap)}(${_ms.show(impl)}, a, b, c, d)\n\tdefault: throw new Error(\`Code not generated to handle $\{arguments.length} arguments.\`)\n}`
						} else {
							return `switch (arguments.length) \{\n\tcase 1: return ${_ms.show(impl)}()\n\tcase 2: return ${_ms.show(impl)}(b)\n\tcase 3: return ${_ms.show(impl)}(b, c)\n\tcase 4: return ${_ms.show(impl)}(b, c, d)\n\tdefault: throw new Error(\`Code not generated to handle $\{arguments.length} args.\`)\n}`
						}
					}())
				});
				switch(num_45args){
					case 1:
						super(`a`,src);
						break
					case 2:
						super(`a`,`b`,src);
						break
					case 3:
						super(`a`,`b`,`c`,src);
						break
					default:super(`a`,`b`,`c`,`d`,src)
				};
				Object.setPrototypeOf(this,Method.prototype);
				pAdd(global,secret_45name,this);
				js_45delete(params,`name`);
				js_45delete(params,`impl-symbol`);
				Object.assign(this,params);
				_ms.newProperty(this,"impl-symbol",impl_45symbol);
				Object.defineProperty(this,`name`,()=>{
					const built={};
					const value=built.value=name;
					return built
				}())
			}
		};
		_ms.newProperty(Method,"doc",`TODO`);
		_ms.newProperty(Method,"test",()=>{
			const m=new (Method)(()=>{
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
				const built=new (global.Map)();
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
				const wrap_45method=new (Method)(()=>{
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
		});
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
					const dd=new (Double_45Dispatcher)(method);
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
				impl_33(method,new (_ms.unlazy(Self_45Type))(implementor),implementation)
			},built)
		}();
		const _63impl_45for=exports["?impl-for"]=()=>{
			const built={};
			const doc=built.doc=`Implementation of a method for a particular Impl-Type.\nDoes not reference method.default or impls on super-types.\nEmpty if the type would use method.default.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[contains_63,Method],_ms.unlazy(_63some)(method_45contains_63));
				_ms.assoc(built,[_ms.unlazy(_61_63),Method],_ms.unlazy(_63None));
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
				const built=new (global.Map)();
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
		const Double_45Dispatcher=class Double_45Dispatcher extends Function{
			constructor(method){
				const impl_45symbol=Symbol(`${_ms.show(method.name)}_double_dispatch`);
				const secret_45name=`__double_dispatch_${_ms.show(random_45digits())}`;
				pAdd(global,secret_45name,impl_45symbol);
				const src=`target2 = arguments[0]\nif (target2 === undefined)\n\tthrow new Error("Can't double-dispatch ${_ms.show(method.name)} for undefined.")\nimpl = target2[global.${_ms.show(secret_45name)}]\nif (impl === undefined)\n\tthrow new Error(\`Can't double-dispatch ${_ms.show(method.name)} for $\{this} on $\{target2}.\`)\nreturn impl.apply(this, arguments)`;
				super(src);
				Object.setPrototypeOf(this,Double_45Dispatcher.prototype);
				_ms.newProperty(this,"method",method);
				_ms.newProperty(this,"impl-symbol",impl_45symbol);
				Object.defineProperty(this,`name`,()=>{
					const built={};
					const value=built.value=`${_ms.show(method.name)}__double-dispatcher`;
					return built
				}())
			}
		};
		const contains_63=new (Method)(()=>{
			const built={};
			const doc=built.doc=`Whether some collection of things as as an element \`instance\`."`;
			const args=built.args=()=>{
				const built=[];
				_ms.add(built,`type`);
				_ms.add(built,`instance`);
				return built
			}();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL01ldGhvZC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7RUFnQkEsY0FBUyxpQkFBQSxFQUNDO1VBQVQsQ0FBSSxXQUFRLElBQUU7RUFBQTtFQUVmLHNCQUNpQiwwQkFBQTtVQUFoQiwrQkFBK0I7RUFBQTtFQUVoQyxhQUFjLHFCQUFBO2VBQ0YsT0FDTTtJQUFoQixXQUFPO0lBRUMsY0FBQSxXQUFTLHVCQUFhO0lBRTlCLGlCQUFXLFdBQVM7SUFDcEIsY0FBUSxXQUFTO0lBQ2pCLHNCQUFjLFFBQU07SUFDWixjQUFBLENBQUksRUFBSSxpQkFBYSw2QkFBaUI7SUFFOUMsb0JBQWUscUJBQVUsa0JBQU87SUFFaEM7S0FBbUIsUUFBQTtLQUNsQixZQUFBLFdBQVEsSUFDQzthQUFSO0tBQUEsT0FFRzthQUFILE9BQU87S0FBQTtJQUFBO0lBRVQsb0JBQVksV0FBUztJQUNyQjtLQUFnQixRQUFBO0tBQ2YsWUFBQSxZQUFNLFlBQVMsR0FBRyxXQUNPO2FBQXhCO0tBQUEsT0FDRCxZQUFBLGdCQUFjLEVBQUUsUUFDSzthQUFwQjtZQUNELFlBQUEsRUFBSSxXQUFRLElBQ0M7YUFBWjs7O0lBRUYsVUFBTSxTQUFVLFFBQ0k7S0FBbkIsc0JBQWlCLG9CQUFVLHVCQUF1QjtLQUVsRDtNQUFZLFFBQUE7TUFDWCxZQUFBLFlBQU0sWUFBUyxHQUFHLFdBQ087Y0FBdkIsY0FBRzthQUNMLHlCQUFDLE9BQUQsSUFDTztjQUFMLGVBQUssdUJBQXNCOzs7S0FFOUIsR0FBSSxXQUNRO01BQVg7T0FDQyxZQUFBLGlCQUNXO2VBQVQseUJBQWM7Y0FFWjtlQUNGLFlBQUM7OztNQUNKO09BQ0MsWUFBQSxTQUNLO2VBQUgsWUFBQywrQ0FBa0M7Y0FFakM7ZUFBRixZQUFDOzs7TUFDSixPQUFNLGdCQUFLLDBCQUFlOztLQUUzQixXQUFRLFlBQUM7WUFFVDtNQUNDLFlBQUEsZUFDUztPQUFS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