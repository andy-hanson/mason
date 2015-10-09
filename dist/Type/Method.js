"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../js","../private/bootstrap","../at/q","./Impl-Type","./Kind","../Object"],(exports,js_0,bootstrap_1,_63_2,Impl_45Type_3,Kind_4,Object_5)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(js_0),defined_63=_ms.get(_$0,"defined?"),js_61_61_61=_ms.get(_$0,"js==="),js_45delete=_ms.get(_$0,"js-delete"),js_45instanceof=_ms.get(_$0,"js-instanceof"),js_45sub=_ms.get(_$0,"js-sub"),js_45typeof=_ms.get(_$0,"js-typeof"),_$1=_ms.getModule(bootstrap_1),containsImplSymbol=_ms.get(_$1,"containsImplSymbol"),implContains=_ms.get(_$1,"implContains"),msDef=_ms.get(_$1,"msDef"),pAdd=_ms.get(_$1,"pAdd"),_$2=_ms.lazyGetModule(_63_2),un_45_63=_ms.lazyProp(_$2,"un-?"),Impl_45Type=_ms.lazy(()=>_ms.getDefaultExport(Impl_45Type_3)),_$3=_ms.lazyGetModule(Impl_45Type_3),Self_45Type=_ms.lazyProp(_$3,"Self-Type"),Kind=_ms.lazy(()=>_ms.getDefaultExport(Kind_4)),_$4=_ms.lazyGetModule(Object_5),_63p=_ms.lazyProp(_$4,"?p"),p_45with_45proto_63=_ms.lazyProp(_$4,"p-with-proto?");
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
					if(js_61_61_61(js_45typeof(_),`number`)){
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
						if(js_61_61_61(js_45typeof(_),`symbol`)){
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
									case 1:{
										return `a`
									}
									case 2:{
										return `a, b`
									}
									case 3:{
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
					case 1:{
						super(`a`,src);
						break
					}
					case 2:{
						super(`a`,`b`,src);
						break
					}
					case 3:{
						super(`a`,`b`,`c`,src);
						break
					}
					default:super(`a`,`b`,`c`,`d`,src)
				};
				Object.setPrototypeOf(this,Method.prototype);
				pAdd(global,secret_45name,this);
				js_45delete(params,`name`);
				js_45delete(params,`impl-symbol`);
				Object.assign(this,params);
				_ms.newProperty(this,"impl-symbol",impl_45symbol);
				Object.defineProperty(this,`name`,(()=>{
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
			const dispatcher=(()=>{
				if(writable_63(implementor_450.prototype,method["impl-symbol"])){
					const dd=new (Double_45Dispatcher)(method);
					do_45impl_33(method,implementor_450,dd);
					return dd
				} else {
					const _=js_45sub(implementor_450.prototype,method["impl-symbol"]);
					if(! _ms.contains(Double_45Dispatcher,_))throw new (Error)(`Can't define double dispatch of ${method} for ${implementor_450}.
A single-dispatch implementation already exists: ${_}.`);
					return _
				}
			})();
			do_45impl_33(dispatcher,implementor_451,implementation)
		};
		const self_45impl_33=exports["self-impl!"]=function self_45impl_33(method,implementor,implementation){
			_ms.checkContains(Method,method,"method");
			_ms.checkContains(Object,implementor,"implementor");
			_ms.checkContains(Function,implementation,"implementation");
			impl_33(method,new (_ms.unlazy(Self_45Type))(implementor),implementation)
		};
		const _63impl_45for=exports["?impl-for"]=function _63impl_45for(method,type){
			_ms.checkContains(Method,method,"method");
			_ms.checkContains(_ms.unlazy(Impl_45Type),type,"type");
			return _63self_45impl_45for(method,type.prototype)
		};
		const impl_45for=exports["impl-for"]=function impl_45for(method,type){
			_ms.checkContains(Method,method,"method");
			_ms.checkContains(_ms.unlazy(Impl_45Type),type,"type");
			return _ms.unlazy(un_45_63)(_63impl_45for(method,type),_ms.lazy(()=>`${method} not implemented for ${type}.`))
		};
		const _63self_45impl_45for=exports["?self-impl-for"]=function _63self_45impl_45for(method,object){
			_ms.checkContains(Method,method,"method");
			return _ms.unlazy(_63p)(object,method["impl-symbol"])
		};
		const self_45impl_45for=exports["self-impl-for"]=function self_45impl_45for(method,object){
			_ms.checkContains(Method,method,"method");
			return _ms.unlazy(un_45_63)(_63self_45impl_45for(method,object),_ms.lazy(()=>`${method} not implemented on ${object}.`))
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
		const do_45impl_33=function do_45impl_33(method,implementor,implementation){
			{
				if(! writable_63(implementor.prototype,method["impl-symbol"]))throw (()=>{
					return `Can not redefine method ${method} for ${implementor}.`
				})()
			};
			Object.defineProperty(implementor.prototype,method["impl-symbol"],(()=>{
				const built={};
				const value=built.value=implementation;
				const writable=built.writable=false;
				const configurable=built.configurable=false;
				const enumerable=built.enumerable=false;
				return built
			})());
			if(_ms.contains(_ms.unlazy(Kind),implementor)){
				for(let _ of implementor.implementors){
					propagate_45method_45down_33(_,method["impl-symbol"],implementation)
				}
			}
		};
		const Double_45Dispatcher=class Double_45Dispatcher extends Function{
			constructor(method){
				const impl_45symbol=Symbol(`${method.name}_double_dispatch`);
				const secret_45name=`__double_dispatch_${random_45digits()}`;
				pAdd(global,secret_45name,impl_45symbol);
				super(`target2 = arguments[0]
if (target2 === undefined)
	throw new Error("Can't double-dispatch ${method.name} for undefined.")
impl = target2[global.${secret_45name}]
if (impl === undefined)
	throw new Error(\`Can't double-dispatch ${method.name} for $\{this} on $\{target2}.\`)
return impl.apply(this, arguments)`);
				Object.setPrototypeOf(this,Double_45Dispatcher.prototype);
				_ms.newProperty(this,"method",method);
				_ms.newProperty(this,"impl-symbol",impl_45symbol);
				Object.defineProperty(this,`name`,(()=>{
					const built={};
					const value=built.value=`${method.name}__double-dispatcher`;
					return built
				})())
			}
		};
		const contains_63=new (Method)((()=>{
			const built={};
			built[`name`]="contains?";
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`type`);
				_ms.add(built,`instance`);
				return built
			})();
			const impl_45symbol=built["impl-symbol"]=containsImplSymbol;
			return built
		})());
		msDef(`contains`,contains_63);
		const method_45contains_63=function method_45contains_63(method,value){
			return _ms.unlazy(p_45with_45proto_63)(value,method["impl-symbol"])
		};
		implContains(Method,method_45contains_63);
		const name=exports.name=`Method`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9NZXRob2QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFVQSxjQUFTLGlCQUFBLEVBQ0M7VUFBVCxDQUFJLFdBQUEsSUFBVTtFQUFBO0VBRWYsc0JBQ2lCLDBCQUFBO1VBQWhCLCtCQUErQjtFQUFBO0VBRWhDLGtCQUFhLHFCQUFBLFFBQ087R0FBbkIsZ0JBQWU7R0FDZixRQUFVLE1BQ0k7Z0JBQUMsR0FBQyxjQUFXOztVQUMzQjtFQUFBO0VBRUQsZ0JBQVcsbUJBQUEsSUFDRztVQUFiLGVBQWU7RUFBQTtFQUVoQiw2QkFBYyxNQW9CUixlQWdMcUI7R0FqTWYsWUFBQSxPQUNNO0lBQWhCLG9CQUFjO0lBRU4sS0FBQSxXQUFTLGlDQUFvQjtJQUVyQyxpQkFBVyxXQUFTO0lBQ3BCLGNBQVEsV0FBUztJQUNqQixzQkFBYyxRQUFNO0lBQ1osS0FBQSxDQUFJLEVBQUksaUJBQWEsOEJBQWlCO0lBRTlDLG9CQUFlLFlBQVUsaUJBQWM7SUFFdkMsb0JBQW1CO0tBQUEsUUFBQTtLQUNsQixHQUFBLFdBQUEsR0FDUzthQUFSO0tBQUEsT0FFRzthQW1MVSxPQW5MTjtLQUFBO0lBQUE7SUFFVCxvQkFBWSxXQUFTO0lBQ3JCLGlCQUFnQjtLQUFBLFFBQUE7S0FDZixHQUFBLFlBQU0sWUFBQSxHQUFZLFVBQ087YUFBeEI7S0FBQSxPQUNELEdBQUEsZ0JBQWMsRUFBRSxPQUNLO2FBQXBCO1lBQ0QsR0FBQSxFQUFJLFdBQUEsR0FDUzthQUFaOzs7SUFFRixVQUFNLFlBQVcsUUFDSTtLQUFwQixzQkFBaUIsVUFBUSxVQUFRO0tBRWpDLFdBQVk7TUFBQSxRQUFBO01BQ1gsR0FBQSxZQUFNLFlBQUEsR0FBWSxVQUNPO2NBQXZCLEtBQUc7YUFDTCxnQkFBQyxPQUFELEdBQ087Y0FBTCxLQUFHLFVBQVE7OztLQUVkLEdBQUksV0FDUTtNQUFYLGdCQUNjO09BQWIsR0FBQSxnQkFDVztlQUFULGdCQUFjO2NB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QTlCcUIsc0JBQXNCLHNCQUNrQixLQUFBOztJQUE3RCx3QkFBTztJQUNQLDhCQUFVO0lBQ1Ysc0NBQWM7SUFDZCxrQ0FBWTs7O0dBRWIsaUNBQUksYUFDZ0I7SUFBZCxRQUFBLEtBQUEseUJBQ3dCO0tBQTVCLDZCQUF1QixFQUFFLHNCQUFtQjtJQUFBO0dBQUE7RUFBQTtFQUUvQywwQkFBMEIsa0NBQUE7R0FDZCxZQUFBLE9BQ007SUFBaEIsb0JBQWMsT0FBUSxHQUFDO0lBQ3ZCLG9CQUFlLHFCQUFtQjtJQUNsQyxLQUFLLE9BQU8sY0FBWTtVQUd2Qiw2RkFFeUMsc0RBQ2xCLG1GQUVrQjtJQVExQyxzQkFKc0IsS0FBSztvQkFFM0IsY0FBVTtvQkFDVixtQkFBZTtJQUNmLHNCQUFzQixLQUFNLE9BQ0ssS0FBQTs7S0FBaEMsd0JBQVEsR0FBQzs7Ozs7RUFFYixrQkFBWSxLQUFJLFFBQ00sS0FBQTs7U0FDckIsUUFBQTtHQUNBLHNCQUNLLEtBQUE7O2tCQUFEO2tCQUNBOzs7R0FDSix5Q0FBYTs7O0VBQ2QsTUFBTyxXQUFVO0VBRWpCLDJCQUFvQiw4QkFBQSxPQUFPLE1BQ0s7MENBQWpCLE1BQU07O0VBRXJCLGFBQWEsT0FBTztFQWhRcEIsd0JBQUEiLCJmaWxlIjoiVHlwZS9NZXRob2QuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
