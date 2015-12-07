"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../js","./../private/bootstrap","./../at/q","./Impl-Type","./Kind","./../Object"],(exports,js_0,bootstrap_1,_63_2,Impl_45Type_3,Kind_4,Object_5)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(js_0),defined_63=_ms.get(_$0,"defined?"),js_45delete=_ms.get(_$0,"js-delete"),js_45sub=_ms.get(_$0,"js-sub"),js_45typeof=_ms.get(_$0,"js-typeof"),_$1=_ms.getModule(bootstrap_1),addProperty=_ms.get(_$1,"addProperty"),implContains=_ms.get(_$1,"implContains"),msDef=_ms.get(_$1,"msDef"),_$2=_ms.lazyGetModule(_63_2),un_45_63=_ms.lazyProp(_$2,"un-?"),Impl_45Type=_ms.lazy(()=>_ms.getDefaultExport(Impl_45Type_3)),_$3=_ms.lazyGetModule(Impl_45Type_3),Self_45Type=_ms.lazyProp(_$3,"Self-Type"),Kind=_ms.lazy(()=>_ms.getDefaultExport(Kind_4)),_$4=_ms.lazyGetModule(Object_5),_63property=_ms.lazyProp(_$4,"?property"),property_45with_45proto_63=_ms.lazyProp(_$4,"property-with-proto?");
		let flag_63=function flag_63(_){
			return (defined_63(_)&&_)
		};
		let random_45digits=function random_45digits(){
			return Math.random().toString().slice(2)
		};
		let build_45str=function build_45str(builder){
			let built_45str="";
			builder(part=>{
				built_45str=`${built_45str}${part}\n`
			});
			return built_45str
		};
		let str_45lit=function str_45lit(str){
			return JSON.stringify(str)
		};
		let Method=exports.default=class Method extends Function{
			constructor(params){
				let _this;
				let method_45name=params.name;
				if(! defined_63(method_45name))throw new (Error)(`Must provide method name.`);
				let default_63=defined_63(params.default);
				let wrap_63=defined_63(params.wrap);
				let allow_45null_63=flag_63(params["allow-null?"]);
				if(! (! allow_45null_63||default_63))throw new (Error)(`Method with \`allow-null?\` must have \`default.`);
				let secret_45name=`__method_${method_45name}_${random_45digits()}`;
				let impl_45symbol=(()=>{
					let _=params["impl-symbol"];
					if(defined_63(_)){
						return _
					} else {
						return Symbol(method_45name)
					}
				})();
				let has_45args_63=defined_63(params.args);
				let num_45args=(()=>{
					let _=params.args;
					if(_ms.hasInstance(Array,_)){
						return _.length
					} else if(! defined_63(_)){
						return - 1
					} else throw new (Error)("No branch of `case` matches.")
				})();
				let src=build_45str(add_33=>{
					let access_45method=`global[${str_45lit(secret_45name)}]`;
					let impl=(()=>{
						switch(js_45typeof(impl_45symbol)){
							case "symbol":{
								return `a[${access_45method}["impl-symbol"]]`
							}
							case "string":{
								return `a[${str_45lit(impl_45symbol)}]`
							}
							default:throw new (Error)("No branch of `switch` matches.")
						}
					})();
					if(default_63){
						let no_45impl=(()=>{
							if(allow_45null_63){
								return `a == null || ${impl} === undefined`
							} else {
								return `${impl} === undefined`
							}
						})();
						let call=(()=>{
							if(wrap_63){
								return `${access_45method}.wrap.apply(null, [${access_45method}.default].concat(Array.prototype.slice.call(arguments)))`
							} else {
								return `${access_45method}.default.apply(a, Array.prototype.slice.call(arguments, 1))`
							}
						})();
						add_33(`if (${no_45impl}) return ${call}`)
					};
					let wrap=`${access_45method}.wrap`;
					return add_33((()=>{
						if(has_45args_63){
							let args=(()=>{
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
				addProperty(global,secret_45name,_this);
				js_45delete(params,"name");
				js_45delete(params,"impl-symbol");
				Object.assign(_this,params);
				_ms.newProperty(_this,"impl-symbol",impl_45symbol);
				Object.defineProperty(_this,"name",(()=>{
					let built={};
					let value=built.value=method_45name;
					return built
				})())
			}
			toString(){
				let _this=this;
				return _this.name
			}
		};
		msDef("method",(_45name,args,_default)=>{
			return new (Method)((()=>{
				let built={};
				built.name=_45name;
				built.args=args;
				if(defined_63(_default)){
					built.default=_default
				};
				return built
			})())
		});
		let impl_33=exports["impl!"]=function impl_33(_,implementor,implementation){
			_ms.checkInstance(Method,_,"_");
			_ms.checkInstance(_ms.unlazy(Impl_45Type),implementor,"implementor");
			_ms.checkInstance(Function,implementation,"implementation");
			do_45impl_33(_,implementor,implementation)
		};
		let impl_45double_33=exports["impl-double!"]=function impl_45double_33(_,implementor_450,implementor_451,implementation){
			_ms.checkInstance(Method,_,"_");
			_ms.checkInstance(_ms.unlazy(Impl_45Type),implementor_450,"implementor-0");
			_ms.checkInstance(_ms.unlazy(Impl_45Type),implementor_451,"implementor-1");
			_ms.checkInstance(Function,implementation,"implementation");
			let dispatcher=(()=>{
				if(writable_63(implementor_450.prototype,_["impl-symbol"])){
					return (()=>{
						let dd=new (Double_45Dispatcher)(_);
						do_45impl_33(_,implementor_450,dd);
						return dd
					})()
				} else {
					return (()=>{
						let impl=js_45sub(implementor_450.prototype,_["impl-symbol"]);
						if(! _ms.hasInstance(Double_45Dispatcher,impl))throw new (Error)(`Can't define double dispatch of ${_} for ${implementor_450}.
A single-dispatch implementation already exists: ${impl}.`);
						return impl
					})()
				}
			})();
			do_45impl_33(dispatcher,implementor_451,implementation)
		};
		let self_45impl_33=exports["self-impl!"]=function self_45impl_33(_,implementor,implementation){
			_ms.checkInstance(Method,_,"_");
			_ms.checkInstance(Object,implementor,"implementor");
			_ms.checkInstance(Function,implementation,"implementation");
			impl_33(_,new (_ms.unlazy(Self_45Type))(implementor),implementation)
		};
		let _63impl_45for=exports["?impl-for"]=function _63impl_45for(_,implementor){
			_ms.checkInstance(Method,_,"_");
			_ms.checkInstance(_ms.unlazy(Impl_45Type),implementor,"implementor");
			return _63self_45impl_45for(_,implementor.prototype)
		};
		let impl_45for=exports["impl-for"]=function impl_45for(_,implementor){
			_ms.checkInstance(Method,_,"_");
			_ms.checkInstance(_ms.unlazy(Impl_45Type),implementor,"implementor");
			return _ms.unlazy(un_45_63)(_63impl_45for(_,implementor),_ms.lazy(()=>`${_} not implemented for ${implementor}.`))
		};
		let _63self_45impl_45for=exports["?self-impl-for"]=function _63self_45impl_45for(_,object){
			_ms.checkInstance(Method,_,"_");
			return _ms.unlazy(_63property)(object,_["impl-symbol"])
		};
		let self_45impl_45for=exports["self-impl-for"]=function self_45impl_45for(_,object){
			_ms.checkInstance(Method,_,"_");
			return _ms.unlazy(un_45_63)(_63self_45impl_45for(_,object),_ms.lazy(()=>`${_} not implemented on ${object}.`))
		};
		let writable_63=function writable_63(obj,property){
			let desc=Object.getOwnPropertyDescriptor(obj,property);
			return (! defined_63(desc)||desc.writable)
		};
		let propagate_45method_45down_33=exports["propagate-method-down!"]=function propagate_45method_45down_33(implementor,method_45symbol,implementation){
			if(! Object.prototype.hasOwnProperty.call(implementor.prototype,method_45symbol)){
				{
					let _=implementor;
					if(_ms.hasInstance(_ms.unlazy(Kind),_)){
						for(let sub_45implementor of _.implementors){
							propagate_45method_45down_33(sub_45implementor,method_45symbol,implementation)
						}
					} else {
						Object.defineProperty(_.prototype,method_45symbol,(()=>{
							let built={};
							let value=built.value=implementation;
							let writable=built.writable=true;
							let configurable=built.configurable=true;
							let enumerable=built.enumerable=false;
							return built
						})())
					}
				}
			}
		};
		let do_45impl_33=function do_45impl_33(_,implementor,implementation){
			if(! writable_63(implementor.prototype,_["impl-symbol"]))throw (()=>{
				return `Can not redefine method ${_} for ${implementor}.`
			})();
			Object.defineProperty(implementor.prototype,_["impl-symbol"],(()=>{
				let built={};
				let value=built.value=implementation;
				let writable=built.writable=false;
				let configurable=built.configurable=false;
				let enumerable=built.enumerable=false;
				return built
			})());
			if(_ms.hasInstance(_ms.unlazy(Kind),implementor)){
				for(let sub_45impl of implementor.implementors){
					propagate_45method_45down_33(sub_45impl,_["impl-symbol"],implementation)
				}
			}
		};
		let Double_45Dispatcher=class Double_45Dispatcher extends Function{
			constructor(meth){
				let _this;
				let impl_45symbol=Symbol(`${meth.name}_double_dispatch`);
				let secret_45name=`__double_dispatch_${random_45digits()}`;
				addProperty(global,secret_45name,impl_45symbol);
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
					let built={};
					let value=built.value=`${meth.name}__double-dispatcher`;
					return built
				})())
			}
		};
		implContains(Method,function(_){
			let _this=this;
			return _ms.unlazy(property_45with_45proto_63)(_,_this["impl-symbol"])
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9NZXRob2QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFVQSxZQUFVLGlCQUFBO1VBQ1QsQ0FBSSxXQUFTLElBQUU7RUFBQTtFQUVoQixvQkFDaUI7VUFBaEIsK0JBQStCO0VBQUE7RUFFaEMsZ0JBQWEscUJBQUE7R0FDWixnQkFBYTtHQUNiLFFBQVU7Z0JBQ0ssR0FBQyxjQUFVOztVQUMxQjtFQUFBO0VBRUQsY0FBVyxtQkFBQTtVQUNWLGVBQWU7RUFBQTtFQUVoQiwyQkFBYyxxQkFBUTtHQUdYLFlBQUE7UUE0TmE7SUEzTnRCLGtCQUFjO0lBRVAsS0FBQSxXQUFTLGlDQUFtQjtJQUVuQyxlQUFXLFdBQVM7SUFDcEIsWUFBUSxXQUFTO0lBQ2pCLG9CQUFjLFFBQU07SUFDYixLQUFBLENBQUksRUFBSSxpQkFBYSw4QkFBZ0I7SUFFNUMsa0JBQWUsWUFBVyxpQkFBZTtJQUV6QyxrQkFBbUI7S0FBTSxNQUFOO0tBQ2xCLEdBQUEsV0FBUyxHQUNBO2FBQVA7S0FBQSxPQUVFO2FBQUgsT0FBTztLQUFBO0lBQUE7SUFFVCxrQkFBWSxXQUFTO0lBQ3JCLGVBQWdCO0tBQU0sTUFBTjtLQUNmLG1CQUFDLE1BQUQsR0FDTTthQUFKO1lBQ0YsR0FBQSxFQUFJLFdBQVMsR0FDQTthQUFaOzs7SUFFRixRQUFNLFlBQVc7S0FDaEIsb0JBQWlCLFVBQVMsVUFBUTtLQUVsQyxTQUFjO2FBQUEsWUFBVTtZQUN0QixTQUNNO2VBQUwsS0FBRzs7WUFDSixTQUNNO2VBQUwsS0FBSSxVQUFROzs7OztLQUVaLEdBQUEsV0FDUTtNQUFWLGNBQ2M7T0FBYixHQUFBLGdCQUNXO2VBQVQsZ0JBQWM7Y0FFWjtlQUNGLEdBQUM7OztNQUNKLFNBQ1c7T0FBVixHQUFBLFFBQ0s7ZUFBSCxHQUFDLHFDQUFpQztjQUVoQztlQUFGLEdBQUM7OztNQUNKLE9BQU0sT0FBSyxxQkFBaUI7O0tBRTdCLFNBQVEsR0FBQztZQUVULE9BQ1M7TUFBUixHQUFBLGNBQ1M7T0FBUixTQUFjO2VBQUE7Y0FDYixFQUNDO2lCQUFDO1NBQUE7Y0FDRixFQUNDO2lCQUFDOztjQUNGLEVBQ0M7aUJBQUM7Ozs7O2NBR0M7UUFBSCxHQUFBLFFBQ0s7Z0JBQUgsVUFBUSxRQUFNLFNBQU87ZUFFbkI7Z0JBQ0YsVUFBUSxRQUFPLFdBQVc7OzthQUM5QixHQUFBLFFBQ0s7Y0FDSCxnREFDaUIsUUFBTSw0QkFDTixRQUFNLCtCQUNOLFFBQU0sa0NBQ04sUUFBTTthQUlyQjtjQUNGLGdEQUNpQiwwQkFDQSwyQkFDQSw4QkFDQTs7OztJQUlkLE9BQUE7VUFDTixFQUNDO1lBQU8sSUFBRTtNQXFJVzs7O1VBcElyQixFQUNDO1lBQU8sSUFBRyxJQUFFO01BbUlROzs7VUFsSXJCLEVBQ0M7WUFBTyxJQUFHLElBQUcsSUFBRTtNQWlJSzs7OztZQS9IYixJQUFHLElBQUcsSUFBRyxJQUFFO01BK0hFOztJQTNIdEIsc0JBMkhzQixNQTNISztJQUUzQixZQUFZLE9BQU8sY0F5SEc7SUF2SHRCLFlBQVUsT0FBUTtJQUNsQixZQUFVLE9BQVE7SUFDbEIsY0FxSHNCLE1BckhIO29CQXFIRyxvQkFwSFA7SUFDZixzQkFtSHNCLE1BbkhNLE9BQ0ksS0FBQTs7S0FBL0Isc0JBQU87Ozs7O1FBa0hjO1dBQUE7OztFQTVHeEIsTUFBTyxTQUFRLENBQUEsUUFBTSxLQUFLO1VBQ3pCLEtBQUksUUFDTSxLQUFBOztlQUFIO2VBQ047SUFDRyxHQUFBLFdBQVMsVUFDTzttQkFBbEI7SUFBQTs7OztFQUVILDZCQUFTLGlCQUFBLEVBQVMsWUFBc0I7cUJBQTdCOztxQkFBNEM7R0FDdEQsYUFBVSxFQUFDLFlBQVk7RUFBQTtFQUV4Qiw2Q0FBZ0IsMEJBQUEsRUFBUyxnQkFBd0IsZ0JBQXdCO3FCQUF2RDs7O3FCQUFzRTtHQUN2RixlQUNpQjtJQUFoQixHQUFBLFlBQVUsMEJBQXlCLGtCQUNZO1lBQXpDLEtBQzZCO2FBRDdCLEtBQUkscUJBQW1CO01BQzNCLGFBQVUsRUFBQyxnQkFBYzs7O1dBRXZCO1lBQUUsS0FDb0Q7ZUFEcEQsU0FBTywwQkFBeUI7TUFDN0IscUJBQUssb0JBQUwsd0JBQ04sbUNBQWtDLFNBQU0scUVBQ1U7Ozs7O0dBRXRELGFBQVMsV0FBVyxnQkFBYztFQUFBO0VBRW5DLHlDQUFjLHdCQUFBLEVBQVMsWUFBbUI7cUJBQTFCO3FCQUFtQjtxQkFBc0I7R0FFeEQsUUFBTyxFQUFFLDhCQUFjLGFBQWE7RUFBQTtFQUVyQyx1Q0FBWSx1QkFBQSxFQUFTO3FCQUFQOztVQUliLHFCQUFnQixFQUFDOztFQUVsQixtQ0FBVyxvQkFBQSxFQUFTO3FCQUFQOzsrQkFFTixjQUFXLEVBQUMsMEJBQWUsR0FBRSx5QkFBc0I7O0VBRTFELG1EQUFpQiw4QkFBQSxFQUFTO3FCQUFQO2tDQUVSLE9BQVE7O0VBRW5CLCtDQUFnQiwyQkFBQSxFQUFTO3FCQUFQOytCQUVYLHFCQUFnQixFQUFDLHFCQUFVLEdBQUUsd0JBQXFCOztFQUd4RCxnQkFBYSxxQkFBQSxJQUFJO0dBQ2hCLFNBQU8sZ0NBQWdDLElBQUk7VUFDM0MsQ0FBSSxFQUFJLFdBQVMsT0FBTTs7RUFHeEIsbUVBQTBCLHNDQUFBLFlBQVksZ0JBQWM7R0FFNUMsS0FBQSxxQ0FBcUMsc0JBQXNCLGlCQUNhO0lBQXpFO0tBQUEsTUFBQTtLQUNKLG9DQUFBLEdBQ0s7TUFBQSxRQUFBLHFCQUFvQixlQUNhO09BQXBDLDZCQUF1QixrQkFBZ0IsZ0JBQWM7TUFBQTtLQUFBLE9BRW5EO01BRUgsc0JBQXVCLFlBQVcsZ0JBQ2EsS0FBQTs7T0FBOUMsc0JBQU87T0FDUCw0QkFBVTtPQUNWLG9DQUFjO09BQ2QsZ0NBQVk7Ozs7Ozs7RUFJakIsaUJBQWMsc0JBQUEsRUFBQyxZQUFZO0dBQ25CLEtBQUEsWUFBVSxzQkFBdUIsd0JBQ2tCLEtBQUE7V0FBeEQsMkJBQTBCLFNBQU07O0dBRWxDLHNCQUFzQixzQkFBdUIsaUJBQ1ksS0FBQTs7SUFBeEQsc0JBQU87SUFDUCw0QkFBVTtJQUNWLG9DQUFjO0lBQ2QsZ0NBQVk7OztHQUVWLG9DQUFBLGFBQ2dCO0lBQWQsUUFBQSxjQUFZLHlCQUN3QjtLQUF2Qyw2QkFBdUIsV0FBVSxpQkFBYTtJQUFBO0dBQUE7RUFBQTtFQUVqRCx3QkFBMEIsa0NBQVE7R0FDdkIsWUFBQTtRQXdCWTtJQXZCckIsa0JBQWMsT0FBUSxHQUFFO0lBQ3hCLGtCQUFlLHFCQUFvQjtJQUNuQyxZQUFZLE9BQU8sY0FBWTtVQUc5Qiw2RkFFMEMsb0RBQ25CLG1GQUVtQjtJQWF0QjtJQVRyQixzQkFTcUIsTUFUTTtvQkFTTixlQVBYO29CQU9XLG9CQU5OO0lBQ2Ysc0JBS3FCLE1BTE8sT0FDSSxLQUFBOztLQUEvQixzQkFBUSxHQUFFOzs7OztFQUdkLGFBQWEsT0FBVSxTQUFBO09BQ0M7aURBQUQsRUFBQyIsImZpbGUiOiJUeXBlL01ldGhvZC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
