"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../js","./../private/bootstrap","./../at/q","./Impl-Type","./Kind","./../Object"],(exports,js_0,bootstrap_1,_63_2,Impl_45Type_3,Kind_4,Object_5)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(js_0),defined_63=_ms.get(_$0,"defined?"),js_61_61_61=_ms.get(_$0,"js==="),js_45delete=_ms.get(_$0,"js-delete"),js_45instanceof=_ms.get(_$0,"js-instanceof"),js_45sub=_ms.get(_$0,"js-sub"),js_45typeof=_ms.get(_$0,"js-typeof"),_$1=_ms.getModule(bootstrap_1),addProperty=_ms.get(_$1,"addProperty"),implContains=_ms.get(_$1,"implContains"),msDef=_ms.get(_$1,"msDef"),_$2=_ms.lazyGetModule(_63_2),un_45_63=_ms.lazyProp(_$2,"un-?"),Impl_45Type=_ms.lazy(()=>_ms.getDefaultExport(Impl_45Type_3)),_$3=_ms.lazyGetModule(Impl_45Type_3),Self_45Type=_ms.lazyProp(_$3,"Self-Type"),Kind=_ms.lazy(()=>_ms.getDefaultExport(Kind_4)),_$4=_ms.lazyGetModule(Object_5),_63property=_ms.lazyProp(_$4,"?property"),property_45with_45proto_63=_ms.lazyProp(_$4,"property-with-proto?");
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
					if(js_61_61_61(js_45typeof(_),"number")){
						return _
					} else if(js_45instanceof(_,Array)){
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
								return `a[${access_45method}[\"impl-symbol\"]]`
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
			_ms.checkContains(Method,_,"_");
			_ms.checkContains(_ms.unlazy(Impl_45Type),implementor,"implementor");
			_ms.checkContains(Function,implementation,"implementation");
			do_45impl_33(_,implementor,implementation)
		};
		let impl_45double_33=exports["impl-double!"]=function impl_45double_33(_,implementor_450,implementor_451,implementation){
			_ms.checkContains(Method,_,"_");
			_ms.checkContains(_ms.unlazy(Impl_45Type),implementor_450,"implementor-0");
			_ms.checkContains(_ms.unlazy(Impl_45Type),implementor_451,"implementor-1");
			_ms.checkContains(Function,implementation,"implementation");
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
						if(! _ms.contains(Double_45Dispatcher,impl))throw new (Error)(`Can't define double dispatch of ${_} for ${implementor_450}.
A single-dispatch implementation already exists: ${impl}.`);
						return impl
					})()
				}
			})();
			do_45impl_33(dispatcher,implementor_451,implementation)
		};
		let self_45impl_33=exports["self-impl!"]=function self_45impl_33(_,implementor,implementation){
			_ms.checkContains(Method,_,"_");
			_ms.checkContains(Object,implementor,"implementor");
			_ms.checkContains(Function,implementation,"implementation");
			impl_33(_,new (_ms.unlazy(Self_45Type))(implementor),implementation)
		};
		let _63impl_45for=exports["?impl-for"]=function _63impl_45for(_,implementor){
			_ms.checkContains(Method,_,"_");
			_ms.checkContains(_ms.unlazy(Impl_45Type),implementor,"implementor");
			return _63self_45impl_45for(_,implementor.prototype)
		};
		let impl_45for=exports["impl-for"]=function impl_45for(_,implementor){
			_ms.checkContains(Method,_,"_");
			_ms.checkContains(_ms.unlazy(Impl_45Type),implementor,"implementor");
			return _ms.unlazy(un_45_63)(_63impl_45for(_,implementor),_ms.lazy(()=>`${_} not implemented for ${implementor}.`))
		};
		let _63self_45impl_45for=exports["?self-impl-for"]=function _63self_45impl_45for(_,object){
			_ms.checkContains(Method,_,"_");
			return _ms.unlazy(_63property)(object,_["impl-symbol"])
		};
		let self_45impl_45for=exports["self-impl-for"]=function self_45impl_45for(_,object){
			_ms.checkContains(Method,_,"_");
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
					if(_ms.contains(_ms.unlazy(Kind),_)){
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
			if(_ms.contains(_ms.unlazy(Kind),implementor)){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9NZXRob2QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFVQSxZQUFTLGlCQUFBO1VBQ1IsQ0FBSSxXQUFBLElBQVU7RUFBQTtFQUVmLG9CQUNpQjtVQUFoQiwrQkFBK0I7RUFBQTtFQUVoQyxnQkFBYSxxQkFBQTtHQUNaLGdCQUFhO0dBQ2IsUUFBVTtnQkFDSyxHQUFDLGNBQVc7O1VBQzNCO0VBQUE7RUFFRCxjQUFXLG1CQUFBO1VBQ1YsZUFBZTtFQUFBO0VBRWhCLDJCQUFjLHFCQUFBO0dBR0gsWUFBQTtRQThOYTtJQTdOdEIsa0JBQWM7SUFFUCxLQUFBLFdBQVMsaUNBQW1CO0lBRW5DLGVBQVcsV0FBUztJQUNwQixZQUFRLFdBQVM7SUFDakIsb0JBQWMsUUFBTTtJQUNiLEtBQUEsQ0FBSSxFQUFJLGlCQUFhLDhCQUFnQjtJQUU1QyxrQkFBZSxZQUFVLGlCQUFjO0lBRXZDLGtCQUFtQjtLQUFNLE1BQU47S0FDbEIsR0FBQSxXQUFBLEdBQ1M7YUFBUjtLQUFBLE9BRUc7YUFBSCxPQUFPO0tBQUE7SUFBQTtJQUVULGtCQUFZLFdBQVM7SUFDckIsZUFBZ0I7S0FBTSxNQUFOO0tBQ2YsR0FBQSxZQUFNLFlBQUEsR0FBWSxVQUNNO2FBQXZCO0tBQUEsT0FDRCxHQUFBLGdCQUFjLEVBQUUsT0FDSzthQUFwQjtZQUNELEdBQUEsRUFBSSxXQUFBLEdBQ1M7YUFBWjs7O0lBRUYsUUFBTSxZQUFXO0tBQ2hCLG9CQUFpQixVQUFRLFVBQVE7S0FFakMsU0FBYzthQUFBLFlBQVU7WUFDdEIsU0FDTTtlQUFMLEtBQUc7O1lBQ0osU0FDTTtlQUFMLEtBQUcsVUFBUTs7Ozs7S0FFWCxHQUFBLFdBQ1E7TUFBVixjQUNjO09BQWIsR0FBQSxnQkFDVztlQUFULGdCQUFjO2NBRVo7ZUFDRixHQUFDOzs7TUFDSixTQUNXO09BQVYsR0FBQSxRQUNLO2VBQUgsR0FBQyxxQ0FBa0M7Y0FFakM7ZUFBRixHQUFDOzs7TUFDSixPQUFNLE9BQUsscUJBQWtCOztLQUU5QixTQUFRLEdBQUM7WUFFVCxPQUNTO01BQVIsR0FBQSxjQUNTO09BQVIsU0FBYztlQUFBO2NBQ2IsRUFDQztpQkFBQztTQUFBO2NBQ0YsRUFDQztpQkFBQzs7Y0FDRixFQUNDO2lCQUFDOzs7OztjQUdDO1FBQUgsR0FBQSxRQUNLO2dCQUFILFVBQVEsUUFBTyxTQUFRO2VBRXJCO2dCQUNGLFVBQVEsUUFBTyxXQUFXOzs7YUFDOUIsR0FBQSxRQUNLO2NBQ0gsZ0RBQ2lCLFFBQU8sNEJBQ1AsUUFBTywrQkFDUCxRQUFPLGtDQUNQLFFBQU87YUFJdEI7Y0FDRixnREFDaUIsMEJBQ0EsMkJBQ0EsOEJBQ0E7Ozs7SUFJZCxPQUFBO1VBQ04sRUFDQztZQUFPLElBQUU7TUFxSVc7OztVQXBJckIsRUFDQztZQUFPLElBQUcsSUFBRTtNQW1JUTs7O1VBbElyQixFQUNDO1lBQU8sSUFBRyxJQUFHLElBQUU7TUFpSUs7Ozs7WUEvSGIsSUFBRyxJQUFHLElBQUcsSUFBRTtNQStIRTs7SUEzSHRCLHNCQTJIc0IsTUEzSEs7SUFFM0IsWUFBWSxPQUFPLGNBeUhHO0lBdkh0QixZQUFVLE9BQVE7SUFDbEIsWUFBVSxPQUFRO0lBQ2xCLGNBcUhzQixNQXJISDtvQkFxSEcsb0JBcEhQO0lBQ2Ysc0JBbUhzQixNQW5ITSxPQUNJLEtBQUE7O0tBQS9CLHNCQUFPOzs7OztRQWtIYztXQUFBOzs7RUE1R3hCLE1BQU8sU0FBUSxDQUFBLFFBQU0sS0FBSztVQUN6QixLQUFJLFFBQ00sS0FBQTs7ZUFBSDtlQUNOO0lBQ0csR0FBQSxXQUFTLFVBQ087bUJBQWxCO0lBQUE7Ozs7RUFFSCw2QkFBUyxpQkFBQSxFQUFTLFlBQXNCO3FCQUE3Qjs7cUJBQTRDO0dBQ3RELGFBQVMsRUFBRSxZQUFZO0VBQUE7RUFFeEIsNkNBQWdCLDBCQUFBLEVBQVMsZ0JBQXdCLGdCQUF3QjtxQkFBdkQ7OztxQkFBc0U7R0FDdkYsZUFDaUI7SUFBaEIsR0FBQSxZQUFVLDBCQUF3QixrQkFDYTtZQUF6QyxLQUM2QjthQUQ3QixLQUFJLHFCQUFrQjtNQUMxQixhQUFTLEVBQUUsZ0JBQWM7OztXQUV2QjtZQUFFLEtBQ29EO2VBRHBELFNBQU8sMEJBQXdCO01BQzVCLGtCQUFLLG9CQUFMLHdCQUNOLG1DQUFpQyxTQUFRLHFFQUNTOzs7OztHQUV0RCxhQUFTLFdBQVcsZ0JBQWM7RUFBQTtFQUVuQyx5Q0FBYyx3QkFBQSxFQUFTLFlBQW1CO3FCQUExQjtxQkFBbUI7cUJBQXNCO0dBRXhELFFBQU0sRUFBRyw4QkFBYyxhQUFhO0VBQUE7RUFFckMsdUNBQVksdUJBQUEsRUFBUztxQkFBUDs7VUFJYixxQkFBZSxFQUFFOztFQUVsQixtQ0FBVyxvQkFBQSxFQUFTO3FCQUFQOzsrQkFFTixjQUFVLEVBQUUsMEJBQWUsR0FBQyx5QkFBd0I7O0VBRTNELG1EQUFpQiw4QkFBQSxFQUFTO3FCQUFQO2tDQUVSLE9BQU87O0VBRWxCLCtDQUFnQiwyQkFBQSxFQUFTO3FCQUFQOytCQUVYLHFCQUFlLEVBQUUscUJBQVUsR0FBQyx3QkFBdUI7O0VBR3pELGdCQUFhLHFCQUFBLElBQUk7R0FDaEIsU0FBTyxnQ0FBZ0MsSUFBSTtVQUMzQyxDQUFJLEVBQUksV0FBUyxPQUFNOztFQUd4QixtRUFBMEIsc0NBQUEsWUFBWSxnQkFBYztHQUU1QyxLQUFBLHFDQUFxQyxzQkFBc0IsaUJBQ2E7SUFBekU7S0FBQSxNQUFBO0tBQ0osaUNBQUEsR0FDSztNQUFBLFFBQUEscUJBQW1CLGVBQ2M7T0FBcEMsNkJBQXVCLGtCQUFnQixnQkFBYztNQUFBO0tBQUEsT0FFbkQ7TUFFSCxzQkFBc0IsWUFBWSxnQkFDYSxLQUFBOztPQUE5QyxzQkFBTztPQUNQLDRCQUFVO09BQ1Ysb0NBQWM7T0FDZCxnQ0FBWTs7Ozs7OztFQUlqQixpQkFBYSxzQkFBQSxFQUFFLFlBQVk7R0FDbkIsS0FBQSxZQUFVLHNCQUFzQix3QkFDbUIsS0FBQTtXQUF4RCwyQkFBeUIsU0FBUTs7R0FFbkMsc0JBQXNCLHNCQUFzQixpQkFDYSxLQUFBOztJQUF4RCxzQkFBTztJQUNQLDRCQUFVO0lBQ1Ysb0NBQWM7SUFDZCxnQ0FBWTs7O0dBRVYsaUNBQUEsYUFDZ0I7SUFBZCxRQUFBLGNBQVkseUJBQ3dCO0tBQXZDLDZCQUF1QixXQUFTLGlCQUFjO0lBQUE7R0FBQTtFQUFBO0VBRWpELHdCQUEwQixrQ0FBQTtHQUNmLFlBQUE7UUF3Qlk7SUF2QnJCLGtCQUFjLE9BQVEsR0FBQztJQUN2QixrQkFBZSxxQkFBbUI7SUFDbEMsWUFBWSxPQUFPLGNBQVk7VUFHOUIsNkZBRXlDLG9EQUNsQixtRkFFa0I7SUFhckI7SUFUckIsc0JBU3FCLE1BVE07b0JBU04sZUFQWDtvQkFPVyxvQkFOTjtJQUNmLHNCQUtxQixNQUxPLE9BQ0ksS0FBQTs7S0FBL0Isc0JBQVEsR0FBQzs7Ozs7RUFHYixhQUFhLE9BQVMsU0FBQTtPQUNFO2lEQUFGLEVBQUUiLCJmaWxlIjoiVHlwZS9NZXRob2QuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
