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
						const cond=(()=>{
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
						add_33(`if (${cond}) return ${call}`)
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
				const src=`target2 = arguments[0]
if (target2 === undefined)
	throw new Error("Can't double-dispatch ${method.name} for undefined.")
impl = target2[global.${secret_45name}]
if (impl === undefined)
	throw new Error(\`Can't double-dispatch ${method.name} for $\{this} on $\{target2}.\`)
return impl.apply(this, arguments)`;
				super(src);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvVHlwZS9NZXRob2QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFlQSxjQUFTLGlCQUFBLEVBQ0M7VUFBVCxDQUFJLFdBQUEsSUFBVTtFQUFBO0VBRWYsc0JBQ2lCLDBCQUFBO1VBQWhCLCtCQUErQjtFQUFBO0VBRWhDLGtCQUFhLHFCQUFBLFFBQ087R0FBbkIsZ0JBQWU7R0FDZixRQUFVLE1BQ0k7Z0JBQUMsR0FBQyxjQUFXOztVQUMzQjtFQUFBO0VBRUQsZ0JBQVcsbUJBQUEsSUFDRztVQUFiLGVBQWU7RUFBQTtFQUVoQixhQUFjLHFCQXNQYTtlQXJQZixPQUNNO0lBQWhCLG9CQUFjO0lBRU4sS0FBQSxXQUFTLGlDQUFvQjtJQUVyQyxpQkFBVyxXQUFTO0lBQ3BCLGNBQVEsV0FBUztJQUNqQixzQkFBYyxRQUFNO0lBQ1osS0FBQSxDQUFJLEVBQUksaUJBQWEsOEJBQWlCO0lBRTlDLG9CQUFlLFlBQVUsaUJBQWM7SUFFdkMsb0JBQW1CO0tBQUEsUUFBQTtLQUNsQixHQUFBLFdBQUEsR0FDUzthQUFSO0tBQUEsT0FFRzthQXVPVSxPQXZPTjtLQUFBO0lBQUE7SUFFVCxvQkFBWSxXQUFTO0lBQ3JCLGlCQUFnQjtLQUFBLFFBQUE7S0FDZixHQUFBLFlBQU0sWUFBQSxHQUFZLFVBQ087YUFBeEI7S0FBQSxPQUNELEdBQUEsZ0JBQWMsRUFBRSxPQUNLO2FBQXBCO1lBQ0QsR0FBQSxFQUFJLFdBQUEsR0FDUzthQUFaOzs7SUFFRixVQUFNLFlBQVcsUUFDSTtLQUFwQixzQkFBaUIsVUFBUSxVQUFRO0tBRWpDLFdBQVk7TUFBQSxRQUFBO01BQ1gsR0FBQSxZQUFNLFlBQUEsR0FBWSxVQUNPO2NBQXZCLEtBQUc7YUFDTCxnQkE4Rm1CLE9BOUZuQixHQUNPO2NBQUwsS0FBRyxVQUFROzs7S0FFZCxHQUFJLFdBQ1E7TUFBWCxXQUNXO09BQVYsR0FBQSxnQkFDVztlQUFULGdCQUFjO2NBRVo7ZUFDRixHQUFD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TyxlQUFBOztvQkFBTixDQUFDLFlBQVUsUUFBVzs7O2tCQUV0QixDQUFBLE9BQWMsT0FDYztzQkFEckI7O2dDQUNELGNBQVUsT0FBTyxtQkFBUSxHQUFDLDhCQUE2Qjs7O0VBRS9ELHFEQUNlLEtBQUE7O0dBQWQsb0JBQU07R0FDTixzQkFDUSxlQUFBO2tCQUNQLENBQUEsT0FBYyxTQUNNO3NCQURiOzRCQUNKLE9BQU87OztFQUVaLGlEQUNjLEtBQUE7O0dBQWIsb0JBQU07R0FDTixzQkFDUSxlQUFBO2tCQUNQLENBQUEsT0FBYyxTQUNNO3NCQURiO2dDQUNELHFCQUFlLE9BQU8scUJBQVUsR0FBQyw2QkFBNEI7OztFQUdwRSxrQkFBYSxxQkFBQSxJQUFJLFNBQ1E7R0FBeEIsV0EwREMsZ0NBMURzQyxJQUFJO1VBQzNDLENBQUksRUFBSSxXQUFTLE9BQU07O0VBSXhCLHFFQUEwQixzQ0FBQSxZQUFZLGdCQUFjLGVBQ21EO0dBQXRHLEtBb0RDLHFDQXBENEMsc0JBQXNCLGlCQUNhO0lBQXpFO0tBQUEsUUFBQTtLQUNMLGlDQUFBLEdBQ0s7TUFBQyxRQUFBLHFCQUFtQixlQUNjO09BQXJDLDZCQUF1QixrQkFBZ0IsZ0JBQWM7TUFBQTtLQUFBLE9BRW5EO01BOENMLHNCQTVDd0IsWUFBWSxnQkFDYSxLQUFBOztPQUE5Qyx3QkFBTztPQUNQLDhCQUFVO09BQ1Ysc0NBQWM7T0FDZCxrQ0FBWTs7Ozs7OztFQUlqQixtQkFBYSxzQkFBQSxPQUFPLFlBQVksZUFLL0I7R0FIUyxLQUFBLFlBQVUsc0JBQXNCLDZCQUN5QixLQUFBO1dBQS9ELDJCQUF5QixjQUFhOztHQWlDeEMsc0JBL0JxQixzQkFBc0Isc0JBQ2tCLEtBQUE7O0lBQTdELHdCQUFPO0lBQ1AsOEJBQVU7SUFDVixzQ0FBYztJQUNkLGtDQUFZOzs7R0FFYixpQ0FBSSxhQUNnQjtJQUFkLFFBQUEsS0FBQSx5QkFDd0I7S0FBNUIsNkJBQXVCLEVBQUUsc0JBQW1CO0lBQUE7R0FBQTtFQUFBO0VBRS9DLDBCQUEwQixrQ0FBQTtlQUNkLE9BQ007SUFBaEIsb0JBQWMsT0FBUSxHQUFDO0lBQ3ZCLG9CQUFlLHFCQUFtQjtJQUNsQyxLQUFLLE9BQU8sY0FBWTtJQUV4QixVQUNDLDZGQUV5QyxzREFDbEIsbUZBRWtCO0lBRTFDLE1BQU07SUFPTixzQkFKc0IsS0FBSztvQkFFM0IsY0FBVTtvQkFDVixtQkFBZTtJQUNmLHNCQUFzQixLQUFNLE9BQ0ssS0FBQTs7S0FBaEMsd0JBQVEsR0FBQzs7Ozs7RUFFYixrQkFBWSxLQUFJLFFBQ00sS0FBQTs7U0FBckIsUUFBQTtHQUNBLG9CQUNDO0dBQ0Qsc0JBQ0ssS0FBQTs7a0JBQUQ7a0JBQ0E7OztHQUNKLHlDQUFhOzs7RUFDZCxNQUFPLFdBQVU7RUFFakIsMkJBQW9CLDhCQUFBLE9BQU8sTUFDSzswQ0FBakIsTUFBTTs7RUFFckIsYUFBYSxPQUFPO0VBelRwQix3QkFBQTtrQkE4QkEiLCJmaWxlIjoiVHlwZS9NZXRob2QuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==