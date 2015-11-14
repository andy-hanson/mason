"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../js","./../private/bootstrap","./../at/q","./Impl-Type","./Kind","./../Object"],(exports,js_0,bootstrap_1,_63_2,Impl_45Type_3,Kind_4,Object_5)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(js_0),defined_63=_ms.get(_$0,"defined?"),js_61_61_61=_ms.get(_$0,"js==="),js_45delete=_ms.get(_$0,"js-delete"),js_45instanceof=_ms.get(_$0,"js-instanceof"),js_45sub=_ms.get(_$0,"js-sub"),js_45typeof=_ms.get(_$0,"js-typeof"),_$1=_ms.getModule(bootstrap_1),containsImplSymbol=_ms.get(_$1,"containsImplSymbol"),implContains=_ms.get(_$1,"implContains"),msDef=_ms.get(_$1,"msDef"),pAdd=_ms.get(_$1,"pAdd"),_$2=_ms.lazyGetModule(_63_2),un_45_63=_ms.lazyProp(_$2,"un-?"),Impl_45Type=_ms.lazy(()=>_ms.getDefaultExport(Impl_45Type_3)),_$3=_ms.lazyGetModule(Impl_45Type_3),Self_45Type=_ms.lazyProp(_$3,"Self-Type"),Kind=_ms.lazy(()=>_ms.getDefaultExport(Kind_4)),_$4=_ms.lazyGetModule(Object_5),_63property=_ms.lazyProp(_$4,"?property"),property_45with_45proto_63=_ms.lazyProp(_$4,"property-with-proto?");
		const flag_63=function flag_63(_){
			return (defined_63(_)&&_)
		};
		const random_45digits=function random_45digits(){
			return Math.random().toString().slice(2)
		};
		const build_45str=function build_45str(builder){
			let built_45str="";
			builder(part=>{
				built_45str=`${built_45str}${part}\n`
			});
			return built_45str
		};
		const str_45lit=function str_45lit(str){
			return JSON.stringify(str)
		};
		const Method=exports.default=class Method extends Function{
			constructor(params){
				let _this;
				const method_45name=params.name;
				if(! defined_63(method_45name))throw new (Error)(`Must provide method name.`);
				const default_63=defined_63(params.default);
				const wrap_63=defined_63(params.wrap);
				const allow_45null_63=flag_63(params["allow-null?"]);
				if(! (! allow_45null_63||default_63))throw new (Error)(`Method with \`allow-null?\` must have \`default.`);
				const secret_45name=`__method_${method_45name}_${random_45digits()}`;
				const impl_45symbol=(()=>{
					const _=params["impl-symbol"];
					if(defined_63(_)){
						return _
					} else {
						return Symbol(method_45name)
					}
				})();
				const has_45args_63=defined_63(params.args);
				const num_45args=(()=>{
					const _=params.args;
					if(js_61_61_61(js_45typeof(_),"number")){
						return _
					} else if(js_45instanceof(_,Array)){
						return _.length
					} else if(! defined_63(_)){
						return - 1
					} else throw new (Error)("No branch of `case` matches.")
				})();
				const src=build_45str(add_33=>{
					const access_45method=`global[${str_45lit(secret_45name)}]`;
					const impl=(()=>{
						const _=impl_45symbol;
						if(js_61_61_61(js_45typeof(_),"symbol")){
							return `a[${access_45method}[\"impl-symbol\"]]`
						} else if(_ms.contains(String,_)){
							return `a[${str_45lit(_)}]`
						} else throw new (Error)("No branch of `case` matches.")
					})();
					if(default_63){
						const no_45impl=(()=>{
							if(allow_45null_63){
								return `a == null || ${impl} === undefined`
							} else {
								return `${impl} === undefined`
							}
						})();
						const call=(()=>{
							if(wrap_63){
								return `${access_45method}.wrap.apply(null, [${access_45method}.default].concat(Array.prototype.slice.call(arguments)))`
							} else {
								return `${access_45method}.default.apply(a, Array.prototype.slice.call(arguments, 1))`
							}
						})();
						add_33(`if (${no_45impl}) return ${call}`)
					};
					const wrap=`${access_45method}.wrap`;
					return add_33((()=>{
						if(has_45args_63){
							const args=(()=>{
								switch(num_45args){
									case 0:{
										return "a"
									}
									case 1:{
										return `a, b`
									}
									case 2:{
										return `a, b, c`
									}
									default:throw new (Error)("No branch of `switch` matches.")
								}
							})();
							return (()=>{
								if(wrap_63){
									return `return ${wrap}(${impl}, ${args})`
								} else {
									return `return ${impl}(${args.slice(3)})`
								}
							})()
						} else if(wrap_63){
							return `switch (arguments.length) \{
	case 1: return ${wrap}(${impl}, a)
	case 2: return ${wrap}(${impl}, a, b)
	case 3: return ${wrap}(${impl}, a, b, c)
	case 4: return ${wrap}(${impl}, a, b, c, d)
	default: throw new Error(\`Code not generated to handle $\{arguments.length} arguments.\`)
}`
						} else {
							return `switch (arguments.length) \{
	case 1: return ${impl}()
	case 2: return ${impl}(b)
	case 3: return ${impl}(b, c)
	case 4: return ${impl}(b, c, d)
	default: throw new Error(\`Code not generated to handle $\{arguments.length} args.\`)
}`
						}
					})())
				});
				switch(num_45args){
					case 0:{
						super("a",src);
						_this=this;
						break
					}
					case 1:{
						super("a","b",src);
						_this=this;
						break
					}
					case 2:{
						super("a","b","c",src);
						_this=this;
						break
					}
					default:
						super("a","b","c","d",src);
						_this=this
				};
				Object.setPrototypeOf(_this,Method.prototype);
				pAdd(global,secret_45name,_this);
				js_45delete(params,"name");
				js_45delete(params,"impl-symbol");
				Object.assign(_this,params);
				_ms.newProperty(_this,"impl-symbol",impl_45symbol);
				Object.defineProperty(_this,"name",(()=>{
					const built={};
					const value=built.value=method_45name;
					return built
				})())
			}
			toString(){
				const _this=this;
				return _this.name
			}
		};
		msDef("method",(_45name,args,_default)=>{
			return new (Method)((()=>{
				const built={};
				built.name=_45name;
				built.args=args;
				if(defined_63(_default)){
					built.default=_default
				};
				return built
			})())
		});
		const impl_33=exports["impl!"]=function impl_33(_,implementor,implementation){
			_ms.checkContains(Method,_,"_");
			_ms.checkContains(_ms.unlazy(Impl_45Type),implementor,"implementor");
			_ms.checkContains(Function,implementation,"implementation");
			do_45impl_33(_,implementor,implementation)
		};
		const impl_45double_33=exports["impl-double!"]=function impl_45double_33(_,implementor_450,implementor_451,implementation){
			_ms.checkContains(Method,_,"_");
			_ms.checkContains(_ms.unlazy(Impl_45Type),implementor_450,"implementor-0");
			_ms.checkContains(_ms.unlazy(Impl_45Type),implementor_451,"implementor-1");
			_ms.checkContains(Function,implementation,"implementation");
			const dispatcher=(()=>{
				if(writable_63(implementor_450.prototype,_["impl-symbol"])){
					return (()=>{
						const dd=new (Double_45Dispatcher)(_);
						do_45impl_33(_,implementor_450,dd);
						return dd
					})()
				} else {
					return (()=>{
						const impl=js_45sub(implementor_450.prototype,_["impl-symbol"]);
						if(! _ms.contains(Double_45Dispatcher,impl))throw new (Error)(`Can't define double dispatch of ${_} for ${implementor_450}.
A single-dispatch implementation already exists: ${impl}.`);
						return impl
					})()
				}
			})();
			do_45impl_33(dispatcher,implementor_451,implementation)
		};
		const self_45impl_33=exports["self-impl!"]=function self_45impl_33(_,implementor,implementation){
			_ms.checkContains(Method,_,"_");
			_ms.checkContains(Object,implementor,"implementor");
			_ms.checkContains(Function,implementation,"implementation");
			impl_33(_,new (_ms.unlazy(Self_45Type))(implementor),implementation)
		};
		const _63impl_45for=exports["?impl-for"]=function _63impl_45for(_,implementor){
			_ms.checkContains(Method,_,"_");
			_ms.checkContains(_ms.unlazy(Impl_45Type),implementor,"implementor");
			return _63self_45impl_45for(_,implementor.prototype)
		};
		const impl_45for=exports["impl-for"]=function impl_45for(_,implementor){
			_ms.checkContains(Method,_,"_");
			_ms.checkContains(_ms.unlazy(Impl_45Type),implementor,"implementor");
			return _ms.unlazy(un_45_63)(_63impl_45for(_,implementor),_ms.lazy(()=>`${_} not implemented for ${implementor}.`))
		};
		const _63self_45impl_45for=exports["?self-impl-for"]=function _63self_45impl_45for(_,object){
			_ms.checkContains(Method,_,"_");
			return _ms.unlazy(_63property)(object,_["impl-symbol"])
		};
		const self_45impl_45for=exports["self-impl-for"]=function self_45impl_45for(_,object){
			_ms.checkContains(Method,_,"_");
			return _ms.unlazy(un_45_63)(_63self_45impl_45for(_,object),_ms.lazy(()=>`${_} not implemented on ${object}.`))
		};
		const writable_63=function writable_63(obj,property){
			const desc=Object.getOwnPropertyDescriptor(obj,property);
			return (! defined_63(desc)||desc.writable)
		};
		const propagate_45method_45down_33=exports["propagate-method-down!"]=function propagate_45method_45down_33(implementor,method_45symbol,implementation){
			if(! Object.prototype.hasOwnProperty.call(implementor.prototype,method_45symbol)){
				{
					const _=implementor;
					if(_ms.contains(_ms.unlazy(Kind),_)){
						for(let sub_45implementor of _.implementors){
							propagate_45method_45down_33(sub_45implementor,method_45symbol,implementation)
						}
					} else {
						Object.defineProperty(_.prototype,method_45symbol,(()=>{
							const built={};
							const value=built.value=implementation;
							const writable=built.writable=true;
							const configurable=built.configurable=true;
							const enumerable=built.enumerable=false;
							return built
						})())
					}
				}
			}
		};
		const do_45impl_33=function do_45impl_33(_,implementor,implementation){
			if(! writable_63(implementor.prototype,_["impl-symbol"]))throw (()=>{
				return `Can not redefine method ${_} for ${implementor}.`
			})();
			Object.defineProperty(implementor.prototype,_["impl-symbol"],(()=>{
				const built={};
				const value=built.value=implementation;
				const writable=built.writable=false;
				const configurable=built.configurable=false;
				const enumerable=built.enumerable=false;
				return built
			})());
			if(_ms.contains(_ms.unlazy(Kind),implementor)){
				for(let sub_45impl of implementor.implementors){
					propagate_45method_45down_33(sub_45impl,_["impl-symbol"],implementation)
				}
			}
		};
		const Double_45Dispatcher=class Double_45Dispatcher extends Function{
			constructor(meth){
				let _this;
				const impl_45symbol=Symbol(`${meth.name}_double_dispatch`);
				const secret_45name=`__double_dispatch_${random_45digits()}`;
				pAdd(global,secret_45name,impl_45symbol);
				super(`target2 = arguments[0]
if (target2 === undefined)
	throw new Error("Can't double-dispatch ${meth.name} for undefined.")
impl = target2[global.${secret_45name}]
if (impl === undefined)
	throw new Error(\`Can't double-dispatch ${meth.name} for $\{this} on $\{target2}.\`)
return impl.apply(this, arguments)`);
				_this=this;
				Object.setPrototypeOf(_this,Double_45Dispatcher.prototype);
				_ms.newProperty(_this,"method",meth);
				_ms.newProperty(_this,"impl-symbol",impl_45symbol);
				Object.defineProperty(_this,"name",(()=>{
					const built={};
					const value=built.value=`${meth.name}__double-dispatcher`;
					return built
				})())
			}
		};
		const contains_63=new (Method)((()=>{
			const built={};
			built.name="contains?";
			const args=built.args=["instance"];
			const impl_45symbol=built["impl-symbol"]=containsImplSymbol;
			return built
		})());
		msDef("contains",contains_63);
		implContains(Method,function(_){
			const _this=this;
			return _ms.unlazy(property_45with_45proto_63)(_,_this["impl-symbol"])
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9NZXRob2QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFVQSxjQUFTLGlCQUFBO1VBQ1IsQ0FBSSxXQUFBLElBQVU7RUFBQTtFQUVmLHNCQUNpQjtVQUFoQiwrQkFBK0I7RUFBQTtFQUVoQyxrQkFBYSxxQkFBQTtHQUNaLGdCQUFlO0dBQ2YsUUFBVTtnQkFDSyxHQUFDLGNBQVc7O1VBQzNCO0VBQUE7RUFFRCxnQkFBVyxtQkFBQTtVQUNWLGVBQWU7RUFBQTtFQUVoQiw2QkFBYyxxQkFBQTtHQUdILFlBQUE7UUFxT2E7SUFwT3RCLG9CQUFjO0lBRVAsS0FBQSxXQUFTLGlDQUFtQjtJQUVuQyxpQkFBVyxXQUFTO0lBQ3BCLGNBQVEsV0FBUztJQUNqQixzQkFBYyxRQUFNO0lBQ2IsS0FBQSxDQUFJLEVBQUksaUJBQWEsOEJBQWdCO0lBRTVDLG9CQUFlLFlBQVUsaUJBQWM7SUFFdkMsb0JBQW1CO0tBQU0sUUFBTjtLQUNsQixHQUFBLFdBQUEsR0FDUzthQUFSO0tBQUEsT0FFRzthQUFILE9BQU87S0FBQTtJQUFBO0lBRVQsb0JBQVksV0FBUztJQUNyQixpQkFBZ0I7S0FBTSxRQUFOO0tBQ2YsR0FBQSxZQUFNLFlBQUEsR0FBWSxVQUNNO2FBQXZCO0tBQUEsT0FDRCxHQUFBLGdCQUFjLEVBQUUsT0FDSzthQUFwQjtZQUNELEdBQUEsRUFBSSxXQUFBLEdBQ1M7YUFBWjs7O0lBRUYsVUFBTSxZQUFXO0tBQ2hCLHNCQUFpQixVQUFRLFVBQVE7S0FFakMsV0FBWTtNQUFBLFFBQUE7TUFDWCxHQUFBLFlBQU0sWUFBQSxHQUFZLFVBQ007Y0FBdEIsS0FBRzthQUNMLGdCQUFDLE9BQUQsR0FDTztjQUFMLEtBQUcsVUFBUTs7O0tBRVgsR0FBQSxXQUNRO01BQVYsZ0JBQ2M7T0FBYixHQUFBLGdCQUNXO2VBQVQsZ0JBQWM7Y0FFWjtlQUNGLEdBQUM7OztNQUNKLFdBQ1c7T0FBVixHQUFBLFFBQ0s7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c0IsaUJBQ2EsS0FBQTs7SUFBeEQsd0JBQU87SUFDUCw4QkFBVTtJQUNWLHNDQUFjO0lBQ2Qsa0NBQVk7OztHQUVWLGlDQUFBLGFBQ2dCO0lBQWQsUUFBQSxjQUFZLHlCQUN3QjtLQUF2Qyw2QkFBdUIsV0FBUyxpQkFBYztJQUFBO0dBQUE7RUFBQTtFQUVqRCwwQkFBMEIsa0NBQUE7R0FDZixZQUFBO1FBK0JZO0lBOUJyQixvQkFBYyxPQUFRLEdBQUM7SUFDdkIsb0JBQWUscUJBQW1CO0lBQ2xDLEtBQUssT0FBTyxjQUFZO1VBR3ZCLDZGQUV5QyxvREFDbEIsbUZBRWtCO0lBb0JyQjtJQWhCckIsc0JBZ0JxQixNQWhCTTtvQkFnQk4sZUFkWDtvQkFjVyxvQkFiTjtJQUNmLHNCQVlxQixNQVpPLE9BQ0ksS0FBQTs7S0FBL0Isd0JBQVEsR0FBQzs7Ozs7RUFFYixrQkFBWSxLQUFJLFFBQ00sS0FBQTs7Y0FDckI7R0FDQSxzQkFBTSxDQUFFO0dBQ1IseUNBQWE7OztFQUNkLE1BQU8sV0FBUztFQUdoQixhQUFhLE9BQVMsU0FBQTtTQUNFO2lEQUFGLEVBQUUiLCJmaWxlIjoiVHlwZS9NZXRob2QuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
