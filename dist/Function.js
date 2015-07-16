"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./methods","./private/js-impl","./Type/Alias-Type","./Type/Method","./at/at","./at/at-Type","./at/Map/Map","./at/Map/Hash-Mapbang","./at/Map/Mapbang","./at/Map/Weak-Id-Mapbang","./at/Seq/Seq","./Object","./Type/Type","./at/Seq/Seq","./compare","./control","./math/methods"],function(exports,methods_0,js_45impl_1,Alias_45Type_2,Method_3,_64_4,_64_45Type_5,Map_6,Hash_45Map_33_7,Map_33_8,Weak_45Id_45Map_33_9,Seq_10,Object_11,Type_12,Seq_13,compare_14,control_15,methods_16){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(methods_0),sub=_ms.get(_$2,"sub"),_$3=_ms.getModule(js_45impl_1),iCurry=_ms.get(_$3,"iCurry"),Alias_45Type=_ms.getDefaultExport(Alias_45Type_2),Method=_ms.getDefaultExport(Method_3),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),self_45impl_33=_ms.get(_$5,"self-impl!"),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_4)
		}),_$7=_ms.lazyGetModule(_64_4),_43_43=_ms.lazyProp(_$7,"++"),_$8=_ms.lazyGetModule(_64_45Type_5),empty=_ms.lazyProp(_$8,"empty"),Map=_ms.lazy(function(){
			return _ms.getDefaultExport(Map_6)
		}),Hash_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Hash_45Map_33_7)
		}),_$11=_ms.lazyGetModule(Map_33_8),get_45or_45add_33=_ms.lazyProp(_$11,"get-or-add!"),Weak_45Id_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Weak_45Id_45Map_33_9)
		}),_$13=_ms.lazyGetModule(Seq_10),rtail=_ms.lazyProp(_$13,"rtail"),last=_ms.lazyProp(_$13,"last"),_$14=_ms.lazyGetModule(Object_11),Object_45_62Map=_ms.lazyProp(_$14,"Object->Map"),_$15=_ms.lazyGetModule(Type_12),_61_62=_ms.lazyProp(_$15,"=>"),_$17=_ms.lazyGetModule(Seq_13),seq_61_63=_ms.lazyProp(_$17,"seq=?"),_$18=_ms.lazyGetModule(compare_14),_61_63=_ms.lazyProp(_$18,"=?"),_$19=_ms.lazyGetModule(control_15),build=_ms.lazyProp(_$19,"build"),_$20=_ms.lazyGetModule(methods_16),_43=_ms.lazyProp(_$20,"+");
		const Action=exports.Action=Alias_45Type(function(){
			const built={};
			const doc=built.doc=`A function returning nothing.\nFunction[Number] describes a Function taking nothing and returning a Number;\nAction[Number] describes a Function taking a Number and returning nothing.`;
			const alias_45of=built["alias-of"]=Function;
			return _ms.setName(built,"Action")
		}());
		const Pred=exports.Pred=Alias_45Type(function(){
			const built={};
			const doc=built.doc=`Function[Any Boolean].`;
			const alias_45of=built["alias-of"]=Function;
			return _ms.setName(built,"Pred")
		}());
		const Thunk=exports.Thunk=Alias_45Type(function(){
			const built={};
			const doc=built.doc=`Function with no args returning a value.`;
			const alias_45of=built["alias-of"]=Function;
			return _ms.setName(built,"Thunk")
		}());
		const apply=exports.apply=function(){
			const built={};
			const doc=built.doc=`Calls the function with the given arguments list.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[_ms.unlazy(_43),[1,2]],3);
				return built
			};
			return _ms.set(function apply(_,args){
				_ms.checkContains(Function,_,"_");
				_ms.checkContains(_ms.unlazy(_64),args,"args");
				return Function.apply.call(_,null,[].concat(_ms.arr(args)))
			},built)
		}();
		const call=exports.call=function(){
			const built={};
			const doc=built.doc=`Calls the function with the given arguments.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[_ms.unlazy(_43),1,2],3);
				return built
			};
			return _ms.set(function call(_){
				const args=[].slice.call(arguments,1);
				_ms.checkContains(Function,_,"_");
				return Function.apply.call(_,null,[].concat(_ms.arr(args)))
			},built)
		}();
		const fun_45copy=exports["fun-copy"]=function(){
			const built={};
			const doc=built.doc=`Creates a new function with identical functionality.\n*Does* copy any values captured by its scope.\nDoes *not* copy any properties on the old function.`;
			const test=built.test=function test(){
				const f1=function(){
					const built={};
					const doc=built.doc=`f1`;
					return _ms.set(function f1(_){
						return _
					},built)
				}();
				const f2=function(){
					const built={};
					const doc=built.doc=`f2`;
					return _ms.set(fun_45copy(f1),built,"f2")
				}();
				_ms.assert(_ms.unlazy(_61_63),f1.doc,`f1`);
				_ms.assert(_ms.unlazy(_61_63),f2.doc,`f2`);
				_ms.assert(_ms.unlazy(_61_63),f1(1),f2(1))
			};
			return _ms.set(function fun_45copy(_){
				_ms.checkContains(Function,_,"_");
				return Function.prototype.call.bind(_,null)
			},built)
		}();
		const identity=exports.identity=function(){
			const built={};
			const doc=built.doc=`Outputs its input unmodified.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[1],1);
				return built
			};
			return _ms.set(function identity(_){
				return _
			},built)
		}();
		const noop=exports.noop=function(){
			const built={};
			const doc=built.doc=`Does nothing.`;
			return _ms.set(function noop(){},built)
		}();
		const id_45memoize=exports["id-memoize"]=function(){
			const built={};
			const doc=built.doc=`When an Object is passed into \`fun\`, stores the result in a \`Weak-Id-Map!\`\nand uses that if the exact same (\`id=?\`) Object is used again.`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(seq_61_63),[1,2,1],_ms.unlazy(build)(function(_yield){
					const get_45a=id_45memoize(function(x){
						_yield(x.a);
						return x.a
					});
					const a1={
						a:1
					};
					_ms.assert(_ms.unlazy(_61_63),get_45a(a1),1);
					_ms.assert(_ms.unlazy(_61_63),get_45a(a1),1);
					const a2={
						a:2
					};
					_ms.assert(_ms.unlazy(_61_63),get_45a(a2),2);
					const a1b={
						a:1
					};
					_ms.assert(_ms.unlazy(_61_63),get_45a(a1b),1)
				}))
			};
			return _ms.set(function id_45memoize(_){
				_ms.checkContains(Function,_,"_");
				const wm=_ms.unlazy(empty)(_ms.unlazy(Weak_45Id_45Map_33));
				return function(arg){
					_ms.checkContains(Object,arg,"arg");
					return _ms.unlazy(get_45or_45add_33)(wm,arg,_ms.lazy(function(){
						return _(arg)
					}))
				}
			},built)
		}();
		const hash_45memoize=exports["hash-memoize"]=function(){
			const built={};
			const doc=built.doc=`Stores the argument every time you call it,\nand re-uses the result if called again with the same argument.\nThis will make those arguments unavailable for garbage collection...`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(seq_61_63),[1,2],_ms.unlazy(build)(function(_yield){
					const get_45a=hash_45memoize(function(x){
						_yield(x.a);
						return x.a
					});
					const a1=call(function(){
						const built={};
						const a=built.a=1;
						return built
					});
					_ms.assert(_ms.unlazy(_61_63),get_45a(a1),1);
					_ms.assert(_ms.unlazy(_61_63),get_45a(a1),1);
					const a2={
						a:2
					};
					_ms.assert(_ms.unlazy(_61_63),get_45a(a2),2);
					const a1b=call(function(){
						const built={};
						const a=built.a=1;
						return built
					});
					_ms.assert(_ms.unlazy(_61_63),a1,a1b);
					_ms.assert(_ms.unlazy(_61_63),get_45a(a1b),1)
				}))
			};
			return _ms.set(function hash_45memoize(_){
				_ms.checkContains(Function,_,"_");
				const hm=_ms.unlazy(empty)(_ms.unlazy(Hash_45Map_33));
				return function(arg){
					_ms.checkContains(Object,arg,"arg");
					return _ms.unlazy(get_45or_45add_33)(hm,arg,_ms.lazy(function(){
						return _(arg)
					}))
				}
			},built)
		}();
		const spread=exports.spread=function(){
			const built={};
			const doc=built.doc=`Applies \`fun\`, starting with the given args, to each entry in an arguments list or map.`;
			const test=built.test=function test(){
				const all_454=function all_454(a,b,c,d){
					return [a,b,c,d]
				};
				_ms.assert(_ms.unlazy(seq_61_63),spread(all_454,1,2,3,[4,5]),function(){
					const built=[];
					_ms.add(built,[1,2,3,4]);
					_ms.add(built,[1,2,3,5]);
					return built
				}());
				const y=spread(all_454,1,2,function(){
					const built=new global.Map();
					_ms.assoc(built,3,4);
					_ms.assoc(built,5,6);
					return built
				}());
				_ms.assert(_ms.unlazy(seq_61_63),y,function(){
					const built=[];
					_ms.add(built,[1,2,3,4]);
					_ms.add(built,[1,2,5,6]);
					return built
				}());
				_ms.assert(_ms.unlazy(seq_61_63),spread(all_454,1,2,{
					three:4,
					five:6
				}),function(){
					const built=[];
					_ms.add(built,[1,2,`three`,4]);
					_ms.add(built,[1,2,`five`,6]);
					return built
				}())
			};
			return _ms.set(function spread(fun){
				const args=[].slice.call(arguments,1);
				_ms.checkContains(Function,fun,"fun");
				const init_45args=_ms.unlazy(rtail)(args);
				const last_45arg=_ms.unlazy(last)(args);
				const _64spreaded=function(){
					const _=last_45arg;
					if(_ms.bool(_ms.contains(_ms.unlazy(Map),_))){
						return _ms.unlazy(_61_62)(Array,_)
					} else if(_ms.bool(_ms.contains(_ms.unlazy(_64),_))){
						return function(){
							const built=[];
							for(let _ of _){
								_ms.add(built,[_])
							};
							return built
						}()
					} else if(_ms.bool(_ms.contains(Object,_))){
						return _ms.unlazy(_61_62)(Array,_ms.unlazy(Object_45_62Map)(_))
					} else {
						throw _ms.error(`Can only spread a @ or Map, not ${_ms.show(_)}`)
					}
				}();
				return _ms.checkContains(_ms.unlazy(_64),function(){
					const built=[];
					for(let _ of _64spreaded){
						const all_45args=_ms.unlazy(_43_43)(init_45args,_);
						_ms.add(built,Function.apply.call(fun,null,[].concat(_ms.arr(all_45args))))
					};
					return built
				}(),"res")
			},built)
		}();
		const spread_33=exports["spread!"]=function(){
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(_61_63),[1,2,3],_ms.unlazy(build)(function(yield_33){
					const f=function f(a,b,c){
						yield_33(a);
						yield_33(b);
						return yield_33(c)
					};
					return spread_33(f,1,function(){
						const built=new global.Map();
						_ms.assoc(built,2,3);
						return built
					}())
				}))
			};
			return _ms.set(function spread_33(fun){
				const args=[].slice.call(arguments,1);
				Function.apply.call(spread,null,[].concat(fun,_ms.arr(args)))
			},built)
		}();
		const thunk=exports.thunk=function(){
			const built={};
			const doc=built.doc=`Makes function which, when called, returns \`a\`.`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(_61_63),thunk(1)(),1)
			};
			return _ms.set(function thunk(_){
				return function(){
					return _
				}
			},built)
		}();
		const curry=function(){
			const built={};
			const doc=built.doc=`Creates a function which calls \`f\` with the given arguments first.`;
			const test=built.test=function test(){
				const _431=_ms.sub(_ms.unlazy(_43),1);
				_ms.assert(_ms.unlazy(_61_63),_431(1),2);
				const all_453=function all_453(a,b,c){
					return [a,b,c]
				};
				const one_45two=_ms.sub(all_453,1,2);
				_ms.assert(_ms.unlazy(_61_63),one_45two(3),[1,2,3])
			};
			return _ms.set(iCurry,built,"curry")
		}();
		impl_33(sub,Function,curry);
		impl_33(sub,Method,curry);
		self_45impl_33(sub,Function,function(){
			const built={};
			const doc=built.doc=`Subbing Function does nothing and is only for documentation.\n* Function[Number String] takes a Number and returns a String.\n* Function[2] takes 2 arguments.\n* Function[2 String] takes 2 arguments and returns a String.\n* Function without a sub is assumed to be a one-argument function, so never write Function[1].`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(_61_63),_ms.sub(Function,Function,Function),Function)
			};
			return _ms.set(function(){
				return Function
			},built)
		}());
		const name=exports.name=`Function`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9GdW5jdGlvbi5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0VBcUJBLDRCQUFRLHVCQUNVOztHQUFqQixvQkFDQztHQUdELG1DQUFVOzs7RUFFWCx3QkFBTSx1QkFDVTs7R0FBZixvQkFBTTtHQUNOLG1DQUFVOzs7RUFFWCwwQkFBTyx1QkFDVTs7R0FBaEIsb0JBQU07R0FDTixtQ0FBVTs7O0VBRVgsb0NBQ007O0dBQUwsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixpQkFBSSxDQUFFLEVBQUUsSUFBUzs7O2tCQUNqQixlQUFBLEVBQVcsS0FDTTtzQkFEZjs7K0JBQ0YseUJBQUU7R0FBQTs7RUFFSixrQ0FDSzs7R0FBSixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLGlCQUFJLEVBQUUsR0FBTzs7O2tCQUNiLGNBQUEsRUFDa0I7O3NCQURoQjsrQkFDRix5QkFBRTtHQUFBOztFQUVKLCtDQUNTOztHQUFSLG9CQUNDO0dBR0Qsc0JBQ1EsZUFBQTtJQUFQLG1CQUNJOztLQUFILG9CQUFNO29CQUNMLFlBQUEsRUFDQzthQUFEO0tBQUE7O0lBQ0YsbUJBQ0k7O0tBQUgsb0JBQU07b0JBQ04sV0FBUzs7a0NBQ0MsT0FBUTtrQ0FDUixPQUFRO2tDQUNQLEdBQUcsR0FBSSxHQUFHO0dBQUE7a0JBRXRCLG9CQUFBLEVBQ1U7c0JBRFI7V0FFRiw2QkFBNkIsRUFBRTtHQUFBOztFQUVqQywwQ0FDUzs7R0FBUixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsR0FBTzs7O2tCQUNULGtCQUFBLEVBQ0M7V0FBRDtHQUFBOztFQUVGLGtDQUNLOztHQUFKLG9CQUFNO2tCQUVKLGVBQUE7O0VBSUYsbURBQ1c7O0dBQVYsb0JBQ0M7R0FFRCxzQkFDUSxlQUFBO3FDQUFPLENBQUUsRUFBRSxFQUFFLHFCQUFhLFNBQUEsT0FDSztLQUFyQyxjQUFRLGFBQVksU0FBQSxFQUNDO01BQXBCLE9BQU07YUFDTjs7S0FDRCxTQUFLO1FBQUc7S0FBQTttQ0FDSSxRQUFNLElBQUk7bUNBQ1YsUUFBTSxJQUFJO0tBQ3RCLFNBQUs7UUFBRztLQUFBO21DQUNJLFFBQU0sSUFBSTtLQUN0QixVQUFNO1FBQUc7S0FBQTttQ0FDRyxRQUFNLEtBQUs7SUFBQTtHQUFBO2tCQUN4QixzQkFBQSxFQUNVO3NCQURSO0lBQ0Y7V0FDQyxTQUFBLElBQ1U7dUJBRE47MENBQ1EsR0FBRzthQUFNLEVBQUU7S0FBQTtJQUFBO0dBQUE7O0VBRTFCLHVEQUNhOztHQUFaLG9CQUNDO0dBR0Qsc0JBQ1EsZUFBQTtxQ0FBTyxDQUFFLEVBQUUscUJBQWEsU0FBQSxPQUNLO0tBQW5DLGNBQVEsZUFBYyxTQUFBLEVBQ0M7TUFBdEIsT0FBTTthQUNOOztLQUNELFNBQUssS0FDeUIsVUFBQTs7TUFBN0IsZ0JBQUc7OzttQ0FDUSxRQUFNLElBQUk7bUNBQ1YsUUFBTSxJQUFJO0tBQ3RCLFNBQUs7UUFBRztLQUFBO21DQUNJLFFBQU0sSUFBSTtLQUN0QixVQUFNLEtBQ3lCLFVBQUE7O01BQTlCLGdCQUFHOzs7bUNBQ08sR0FBRzttQ0FDRixRQUFNLEtBQUs7SUFBQTtHQUFBO2tCQUN4Qix3QkFBQSxFQUNVO3NCQURSO0lBQ0Y7V0FDQyxTQUFBLElBQ1U7dUJBRE47MENBQ1EsR0FBRzthQUFNLEVBQUU7S0FBQTtJQUFBO0dBQUE7O0VBRTNCLHNDQUNPOztHQUFOLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtJQUFQLGNBQVMsaUJBQUEsRUFBRSxFQUFFLEVBQUUsRUFDQztZQUFmLENBQUUsRUFBRSxFQUFFLEVBQUU7SUFBQTtxQ0FDTSxPQUFPLFFBQU0sRUFBRSxFQUFFLEVBQUUsQ0FBRSxFQUFFLGNBQ0k7O21CQUF2QyxDQUFFLEVBQUUsRUFBRSxFQUFFO21CQUNSLENBQUUsRUFBRSxFQUFFLEVBQUU7OztJQUVYLFFBQUksT0FBTyxRQUFNLEVBQUUsWUFDQzs7cUJBQW5CLEVBQUs7cUJBQ0wsRUFBSzs7O3FDQUNRLFlBQ0M7O21CQUFaLENBQUUsRUFBRSxFQUFFLEVBQUU7bUJBQ1IsQ0FBRSxFQUFFLEVBQUUsRUFBRTs7O3FDQUVJLE9BQU8sUUFBTSxFQUFFLEVBQUU7V0FBUTtVQUFRO0lBQUEsYUFDRzs7bUJBQWhELENBQUUsRUFBRSxFQUFHLFFBQU87bUJBQ2QsQ0FBRSxFQUFFLEVBQUcsT0FBTTs7OztrQkFHaEIsZ0JBQUcsSUFDb0I7O3NCQURoQjtJQUVQLG9DQUFrQjtJQUNsQixrQ0FBZ0I7SUFDaEI7S0FBaUIsUUFBQTtLQUNoQix5Q0FBQSxJQUNJO2dDQUNBLE1BQU07S0FBQSxPQUNWLHlDQUFBLElBQ0U7OztlQUFJLEtBQUEsRUFDQztzQkFBTCxDQUFFO09BQUE7OztZQUNKLHlCQUFDLE9BQUQsSUFDTztnQ0FBSCxrQ0FBaUI7S0FBQSxPQUVqQjtNQUFILGdCQUFRLDRDQUFpQzs7Ozs7YUFFdEMsS0FBQSxZQUNTO01BQWIsb0NBQWMsWUFBVTt3Q0FDdEIsMkJBQUk7S0FBQTs7Ozs7RUFFVCw2Q0FDUTs7R0FBUCxvQkFBTTtHQUNOLHNCQUNRLGVBQUE7a0NBQUksQ0FBRSxFQUFFLEVBQUUscUJBQVksU0FBQSxTQUNNO0tBQWxDLFFBQUssV0FBQSxFQUFFLEVBQUUsRUFDQztNQUFULFNBQU87TUFDUCxTQUFPO2FBQ1AsU0FBTztLQUFBO1lBQ1IsVUFBUSxFQUFFLFlBQ0M7O3NCQUFWLEVBQUs7Ozs7O2tCQUNOLG1CQUFBLElBQ1c7O3dCQUFaLHNCQUFPLFlBQUk7R0FBQTs7RUFFYixvQ0FDTTs7R0FBTCxvQkFBTTtHQUNOLHNCQUNRLGVBQUE7a0NBQUssTUFBTSxLQUFLO0dBQUE7a0JBQ3ZCLGVBQUEsRUFDQztXQUNBLFVBQUE7WUFBQTtJQUFBO0dBQUE7O0VBRUgsc0JBQ087O0dBQU4sb0JBQU07R0FDTixzQkFDUSxlQUFBO0lBQVAsbUNBQU87a0NBQ0ssS0FBRyxHQUFHO0lBQ2xCLGNBQVMsaUJBQUEsRUFBRSxFQUFFLEVBQ0M7WUFBYixDQUFFLEVBQUUsRUFBRTtJQUFBO0lBQ1Asd0JBQVUsUUFBTSxFQUFFO2tDQUNOLFVBQVEsR0FBRyxDQUFFLEVBQUUsRUFBRTtHQUFBO2tCQUM5Qjs7RUFFRCxRQUFNLElBQUksU0FBUztFQUVuQixRQUFNLElBQUksT0FBTztFQUVqQixlQUFXLElBQUksbUJBQ1E7O0dBQXRCLG9CQUNDO0dBS0Qsc0JBQ1EsZUFBQTswQ0FBSSxTQUFTLFNBQVMsVUFBVTtHQUFBO2tCQUV2QyxVQUFBO1dBQUE7R0FBQTs7RUExTkYsd0JBQUEiLCJmaWxlIjoiRnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==