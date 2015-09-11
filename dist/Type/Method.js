"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../js","../private/bootstrap","../at/q","../assert","../compare","./Impl-Type","./Kind","../Object","../at/q","../Try"],(exports,js_0,bootstrap_1,_63_2,assert_3,compare_4,Impl_45Type_5,Kind_6,Object_7,_63_8,Try_9)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(js_0),defined_63=_ms.get(_$0,"defined?"),js_61_61_61=_ms.get(_$0,"js==="),js_45delete=_ms.get(_$0,"js-delete"),js_45instanceof=_ms.get(_$0,"js-instanceof"),js_45sub=_ms.get(_$0,"js-sub"),js_45typeof=_ms.get(_$0,"js-typeof"),_$1=_ms.getModule(bootstrap_1),containsImplSymbol=_ms.get(_$1,"containsImplSymbol"),implContains=_ms.get(_$1,"implContains"),msDef=_ms.get(_$1,"msDef"),pAdd=_ms.get(_$1,"pAdd"),_$2=_ms.lazyGetModule(_63_2),un_45_63=_ms.lazyProp(_$2,"un-?"),_$3=_ms.lazyGetModule(assert_3),assert_45call_33=_ms.lazyProp(_$3,"assert-call!"),_$4=_ms.lazyGetModule(compare_4),_61_63=_ms.lazyProp(_$4,"=?"),Impl_45Type=_ms.lazy(()=>_ms.getDefaultExport(Impl_45Type_5)),_$5=_ms.lazyGetModule(Impl_45Type_5),Self_45Type=_ms.lazyProp(_$5,"Self-Type"),Kind=_ms.lazy(()=>_ms.getDefaultExport(Kind_6)),_$6=_ms.lazyGetModule(Object_7),_63p=_ms.lazyProp(_$6,"?p"),p_45with_45proto_63=_ms.lazyProp(_$6,"p-with-proto?"),_$7=_ms.lazyGetModule(_63_8),_63None=_ms.lazyProp(_$7,"?None"),_63some=_ms.lazyProp(_$7,"?some"),_$8=_ms.lazyGetModule(Try_9),fails_63=_ms.lazyProp(_$8,"fails?");
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
		const Method=class Method extends Function{
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
		_ms.newProperty(Method,"doc",`TODO`);
		_ms.newProperty(Method,"test",()=>{
			const m=new (Method)((()=>{
				const built={};
				built[`name`]="m";
				const allow_45null_63=built["allow-null?"]=true;
				const _default=built.default=function _default(){
					return `default`
				};
				return built
			})());
			impl_33(m,String,()=>{
				return `String`
			});
			impl_45double_33(m,Number,Number,()=>{
				return `Number Number`
			});
			impl_45double_33(m,Number,String,()=>{
				return `Number String`
			});
			_ms.unlazy(assert_45call_33)(m,(()=>{
				const built=new (global.Map)();
				_ms.assoc(built,[null],`default`);
				_ms.assoc(built,[`a`],`String`);
				_ms.assoc(built,[1,1],`Number Number`);
				_ms.assoc(built,[1,`a`],`Number String`);
				return built
			})());
			_ms.assert(_ms.unlazy(fails_63),()=>{
				return m(1,m)
			});
			_ms.assert(_ms.unlazy(_61_63),`wrap-call-arg`,(()=>{
				const wrap_45method=new (Method)((()=>{
					const built={};
					built[`name`]="wrap-method";
					const _default=built.default=function _default(){
						const _this=this;
						return `call-${_this}`
					};
					const wrap=built.wrap=function wrap(impl,arg){
						return `wrap-${impl.call(arg)}`
					};
					return built
				})());
				return wrap_45method(`arg`)
			})())
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
		const self_45impl_33=exports["self-impl!"]=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){};
			return _ms.set((method,implementor,implementation)=>{
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(Object,implementor,"implementor");
				_ms.checkContains(Function,implementation,"implementation");
				impl_33(method,new (_ms.unlazy(Self_45Type))(implementor),implementation)
			},built)
		})();
		const _63impl_45for=exports["?impl-for"]=(()=>{
			const built={};
			const doc=built.doc=`Implementation of a method for a particular Impl-Type.
Does not reference method.default or impls on super-types.
Empty if the type would use method.default.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[contains_63,Method],_ms.unlazy(_63some)(method_45contains_63));
				_ms.assoc(built,[_ms.unlazy(_61_63),Method],_ms.unlazy(_63None));
				return built
			};
			return _ms.set((method,type)=>{
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(_ms.unlazy(Impl_45Type),type,"type");
				return _63self_45impl_45for(method,type.prototype)
			},built)
		})();
		const impl_45for=exports["impl-for"]=(()=>{
			const built={};
			const doc=built.doc=`impl-for that fails when there is no implementation.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[contains_63,Method],method_45contains_63);
				return built
			};
			return _ms.set((method,type)=>{
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(_ms.unlazy(Impl_45Type),type,"type");
				return _ms.unlazy(un_45_63)(_63impl_45for(method,type),_ms.lazy(()=>`${method} not implemented for ${type}.`))
			},built)
		})();
		const _63self_45impl_45for=exports["?self-impl-for"]=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){};
			return _ms.set((method,object)=>{
				_ms.checkContains(Method,method,"method");
				return _ms.unlazy(_63p)(object,method["impl-symbol"])
			},built)
		})();
		const self_45impl_45for=exports["self-impl-for"]=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){};
			return _ms.set((method,object)=>{
				_ms.checkContains(Method,method,"method");
				return _ms.unlazy(un_45_63)(_63self_45impl_45for(method,object),_ms.lazy(()=>`${method} not implemented on ${object}.`))
			},built)
		})();
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
			if(! writable_63(implementor.prototype,method["impl-symbol"]))throw (()=>{
				return `Can not redefine method ${method} for ${implementor}.`
			})();
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
			const doc=built.doc=`Whether some collection of things as as an element \`instance\`."`;
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
		exports.default=Method;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvVHlwZS9NZXRob2QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFlQSxjQUFTLGlCQUFBLEVBQ0M7VUFBVCxDQUFJLFdBQUEsSUFBVTtFQUFBO0VBRWYsc0JBQ2lCLDBCQUFBO1VBQWhCLCtCQUErQjtFQUFBO0VBRWhDLGtCQUFhLHFCQUFBLFFBQ087R0FBbkIsZ0JBQWU7R0FDZixRQUFVLE1BQ0k7Z0JBQUMsR0FBQyxjQUFXOztVQUMzQjtFQUFBO0VBRUQsZ0JBQVcsbUJBQUEsSUFDRztVQUFiLGVBQWU7RUFBQTtFQUVoQixhQUFjLHFCQXNQYTtHQXJQZixZQUFBLE9BQ007SUFBaEIsb0JBQWM7SUFFTixLQUFBLFdBQVMsaUNBQW9CO0lBRXJDLGlCQUFXLFdBQVM7SUFDcEIsY0FBUSxXQUFTO0lBQ2pCLHNCQUFjLFFBQU07SUFDWixLQUFBLENBQUksRUFBSSxpQkFBYSw4QkFBaUI7SUFFOUMsb0JBQWUsWUFBVSxpQkFBYztJQUV2QyxvQkFBbUI7S0FBQSxRQUFBO0tBQ2xCLEdBQUEsV0FBQSxHQUNTO2FBQVI7S0FBQSxPQUVHO2FBdU9VLE9Bdk9OO0tBQUE7SUFBQTtJQUVULG9CQUFZLFdBQVM7SUFDckIsaUJBQWdCO0tBQUEsUUFBQTtLQUNmLEdBQUEsWUFBTSxZQUFBLEdBQVksVUFDTzthQUF4QjtLQUFBLE9BQ0QsR0FBQSxnQkFBYyxFQUFFLE9BQ0s7YUFBcEI7WUFDRCxHQUFBLEVBQUksV0FBQSxHQUNTO2FBQVo7OztJQUVGLFVBQU0sWUFBVyxRQUNJO0tBQXBCLHNCQUFpQixVQUFRLFVBQVE7S0FFakMsV0FBWTtNQUFBLFFBQUE7TUFDWCxHQUFBLFlBQU0sWUFBQSxHQUFZLFVBQ087Y0FBdkIsS0FBRzthQUNMLGdCQThGbUIsT0E5Rm5CLEdBQ087Y0FBTCxLQUFHLFVBQVE7OztLQUVkLEdBQUksV0FDUTtNQUFYLGdCQUNjO09BQWIsR0FBQSxnQkFDVztlQUFULGdCQUFjO2NBRVo7ZUFD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TixDQUFDLFlBQVUsUUFBVzs7O2tCQUV0QixDQUFBLE9BQWMsT0FDYztzQkFEckI7O2dDQUNELGNBQVUsT0FBTyxtQkFBUSxHQUFDLDhCQUE2Qjs7O0VBRS9ELHFEQUNlLEtBQUE7O0dBQWQsb0JBQU07R0FDTixzQkFDUSxlQUFBO2tCQUNQLENBQUEsT0FBYyxTQUNNO3NCQURiOzRCQUNKLE9BQU87OztFQUVaLGlEQUNjLEtBQUE7O0dBQWIsb0JBQU07R0FDTixzQkFDUSxlQUFBO2tCQUNQLENBQUEsT0FBYyxTQUNNO3NCQURiO2dDQUNELHFCQUFlLE9BQU8scUJBQVUsR0FBQyw2QkFBNEI7OztFQUdwRSxrQkFBYSxxQkFBQSxJQUFJLFNBQ1E7R0FBeEIsV0F5REMsZ0NBekRzQyxJQUFJO1VBQzNDLENBQUksRUFBSSxXQUFTLE9BQU07O0VBSXhCLHFFQUEwQixzQ0FBQSxZQUFZLGdCQUFjLGVBQ21EO0dBQXRHLEtBbURDLHFDQW5ENEMsc0JBQXNCLGlCQUNhO0lBQXpFO0tBQUEsUUFBQTtLQUNMLGlDQUFBLEdBQ0s7TUFBQyxRQUFBLHFCQUFtQixlQUNjO09BQXJDLDZCQUF1QixrQkFBZ0IsZ0JBQWM7TUFBQTtLQUFBLE9BRW5EO01BNkNMLHNCQTNDd0IsWUFBWSxnQkFDYSxLQUFBOztPQUE5Qyx3QkFBTztPQUNQLDhCQUFVO09BQ1Ysc0NBQWM7T0FDZCxrQ0FBWTs7Ozs7OztFQUlqQixtQkFBYSxzQkFBQSxPQUFPLFlBQVksZUFLL0I7R0FIUyxLQUFBLFlBQVUsc0JBQXNCLDZCQUN5QixLQUFBO1dBQS9ELDJCQUF5QixjQUFhOztHQWdDeEMsc0JBOUJxQixzQkFBc0Isc0JBQ2tCLEtBQUE7O0lBQTdELHdCQUFPO0lBQ1AsOEJBQVU7SUFDVixzQ0FBYztJQUNkLGtDQUFZOzs7R0FFYixpQ0FBSSxhQUNnQjtJQUFkLFFBQUEsS0FBQSx5QkFDd0I7S0FBNUIsNkJBQXVCLEVBQUUsc0JBQW1CO0lBQUE7R0FBQTtFQUFBO0VBRS9DLDBCQUEwQixrQ0FBQTtHQUNkLFlBQUEsT0FDTTtJQUFoQixvQkFBYyxPQUFRLEdBQUM7SUFDdkIsb0JBQWUscUJBQW1CO0lBQ2xDLEtBQUssT0FBTyxjQUFZO1VBR3ZCLDZGQUV5QyxzREFDbEIsbUZBRWtCO0lBUTFDLHNCQUpzQixLQUFLO29CQUUzQixjQUFVO29CQUNWLG1CQUFlO0lBQ2Ysc0JBQXNCLEtBQU0sT0FDSyxLQUFBOztLQUFoQyx3QkFBUSxHQUFDOzs7OztFQUViLGtCQUFZLEtBQUksUUFDTSxLQUFBOztTQUFyQixRQUFBO0dBQ0Esb0JBQ0M7R0FDRCxzQkFDSyxLQUFBOztrQkFBRDtrQkFDQTs7O0dBQ0oseUNBQWE7OztFQUNkLE1BQU8sV0FBVTtFQUVqQiwyQkFBb0IsOEJBQUEsT0FBTyxNQUNLOzBDQUFqQixNQUFNOztFQUVyQixhQUFhLE9BQU87RUF4VHBCLHdCQUFBO2tCQThCQSIsImZpbGUiOiJUeXBlL01ldGhvZC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9