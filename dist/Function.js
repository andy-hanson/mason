"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./methods","./private/js-impl","./Type/Alias-Type","./Type/Method","./at/at","./at/at-Type","./at/Map/Hash-Map","./at/Map/Map","./at/Map/Weak-Id-Map","./at/Seq/Seq","./Object","./Type/Pred-Type","./Type/Type","./at/Seq/Seq","./compare","./control","./math/methods"],(exports,methods_0,js_45impl_1,Alias_45Type_2,Method_3,_64_4,_64_45Type_5,Hash_45Map_6,Map_7,Weak_45Id_45Map_8,Seq_9,Object_10,Pred_45Type_11,Type_12,Seq_13,compare_14,control_15,methods_16)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(methods_0),sub=_ms.get(_$2,"sub"),_$3=_ms.getModule(js_45impl_1),iCurry=_ms.get(_$3,"iCurry"),Alias_45Type=_ms.getDefaultExport(Alias_45Type_2),Method=_ms.getDefaultExport(Method_3),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),self_45impl_33=_ms.get(_$5,"self-impl!"),_64=_ms.lazy(()=>{
			return _ms.getDefaultExport(_64_4)
		}),_$7=_ms.lazyGetModule(_64_4),_43_43=_ms.lazyProp(_$7,"++"),_$8=_ms.lazyGetModule(_64_45Type_5),empty=_ms.lazyProp(_$8,"empty"),Hash_45Map=_ms.lazy(()=>{
			return _ms.getDefaultExport(Hash_45Map_6)
		}),Map=_ms.lazy(()=>{
			return _ms.getDefaultExport(Map_7)
		}),_$10=_ms.lazyGetModule(Map_7),get_45or_45add_33=_ms.lazyProp(_$10,"get-or-add!"),Weak_45Id_45Map=_ms.lazy(()=>{
			return _ms.getDefaultExport(Weak_45Id_45Map_8)
		}),_$12=_ms.lazyGetModule(Seq_9),rtail=_ms.lazyProp(_$12,"rtail"),last=_ms.lazyProp(_$12,"last"),_$13=_ms.lazyGetModule(Object_10),Object_45_62Map=_ms.lazyProp(_$13,"Object->Map"),_$14=_ms.lazyGetModule(Pred_45Type_11),ObjLit=_ms.lazyProp(_$14,"ObjLit"),_$15=_ms.lazyGetModule(Type_12),_61_62=_ms.lazyProp(_$15,"=>"),_$17=_ms.lazyGetModule(Seq_13),seq_61_63=_ms.lazyProp(_$17,"seq=?"),_$18=_ms.lazyGetModule(compare_14),_61_63=_ms.lazyProp(_$18,"=?"),_$19=_ms.lazyGetModule(control_15),build=_ms.lazyProp(_$19,"build"),_$20=_ms.lazyGetModule(methods_16),_43=_ms.lazyProp(_$20,"+");
		const Action=exports.Action=new (Alias_45Type)(()=>{
			const built={};
			const doc=built.doc=`A function returning nothing.\nFunction[Number] describes a Function taking nothing and returning a Number;\nAction[Number] describes a Function taking a Number and returning nothing.`;
			const alias_45of=built["alias-of"]=Function;
			return _ms.setName(built,"Action")
		}());
		const Pred=exports.Pred=new (Alias_45Type)(()=>{
			const built={};
			const doc=built.doc=`Function[Any Boolean].`;
			const alias_45of=built["alias-of"]=Function;
			return _ms.setName(built,"Pred")
		}());
		const Thunk=exports.Thunk=new (Alias_45Type)(()=>{
			const built={};
			const doc=built.doc=`Function with no args returning a value.`;
			const alias_45of=built["alias-of"]=Function;
			return _ms.setName(built,"Thunk")
		}());
		const apply=exports.apply=()=>{
			const built={};
			const doc=built.doc=`Calls the function with the given arguments list.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[_ms.unlazy(_43),[1,2]],3);
				return built
			};
			return _ms.set(function apply(_,args){
				_ms.checkContains(Function,_,"_");
				_ms.checkContains(_ms.unlazy(_64),args,"args");
				return Function.apply.call(_,null,[].concat(_ms.arr(args)))
			},built)
		}();
		const call=exports.call=()=>{
			const built={};
			const doc=built.doc=`Calls the function with the given arguments.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[_ms.unlazy(_43),1,2],3);
				return built
			};
			return _ms.set(function call(_){
				const args=[].slice.call(arguments,1);
				_ms.checkContains(Function,_,"_");
				return Function.apply.call(_,null,[].concat(_ms.arr(args)))
			},built)
		}();
		const fun_45copy=exports["fun-copy"]=()=>{
			const built={};
			const doc=built.doc=`Creates a new function with identical functionality.\n*Does* copy any values captured by its scope.\nDoes *not* copy any properties on the old function.`;
			const test=built.test=function test(){
				const f1=()=>{
					const built={};
					const doc=built.doc=`f1`;
					return _ms.set(function f1(_){
						return _
					},built)
				}();
				const f2=()=>{
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
		const identity=exports.identity=()=>{
			const built={};
			const doc=built.doc=`Outputs its input unmodified.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[1],1);
				return built
			};
			return _ms.set(function identity(_){
				return _
			},built)
		}();
		const noop=exports.noop=()=>{
			const built={};
			const doc=built.doc=`Does nothing.`;
			return _ms.set(function noop(){},built)
		}();
		const id_45memoize=exports["id-memoize"]=()=>{
			const built={};
			const doc=built.doc=`When an Object is passed into \`fun\`, stores the result in a Weak-Id-Map\nand uses that if the exact same (\`id=?\`) Object is used again.`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(seq_61_63),[1,2,1],_ms.unlazy(build)(_yield=>{
					const get_45a=id_45memoize(x=>{
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
				const wm=_ms.unlazy(empty)(_ms.unlazy(Weak_45Id_45Map));
				return arg=>{
					_ms.checkContains(Object,arg,"arg");
					return _ms.unlazy(get_45or_45add_33)(wm,arg,_ms.lazy(()=>{
						return _(arg)
					}))
				}
			},built)
		}();
		const hash_45memoize=exports["hash-memoize"]=()=>{
			const built={};
			const doc=built.doc=`Stores the argument every time you call it,\nand re-uses the result if called again with the same argument.\nThis will make those arguments unavailable for garbage collection...`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(seq_61_63),[1,2],_ms.unlazy(build)(_yield=>{
					const get_45a=hash_45memoize(x=>{
						_yield(x.a);
						return x.a
					});
					const a1=call(()=>{
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
					const a1b=call(()=>{
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
				const hm=_ms.unlazy(empty)(_ms.unlazy(Hash_45Map));
				return arg=>{
					_ms.checkContains(Object,arg,"arg");
					return _ms.unlazy(get_45or_45add_33)(hm,arg,_ms.lazy(()=>{
						return _(arg)
					}))
				}
			},built)
		}();
		const spread=exports.spread=()=>{
			const built={};
			const doc=built.doc=`Applies \`fun\`, starting with the given args, to each entry in an arguments list or map.`;
			const test=built.test=function test(){
				const all_454=function all_454(a,b,c,d){
					return [a,b,c,d]
				};
				_ms.assert(_ms.unlazy(seq_61_63),spread(all_454,1,2,3,[4,5]),()=>{
					const built=[];
					_ms.add(built,[1,2,3,4]);
					_ms.add(built,[1,2,3,5]);
					return built
				}());
				const y=spread(all_454,1,2,()=>{
					const built=new (global.Map)();
					_ms.assoc(built,3,4);
					_ms.assoc(built,5,6);
					return built
				}());
				_ms.assert(_ms.unlazy(seq_61_63),y,()=>{
					const built=[];
					_ms.add(built,[1,2,3,4]);
					_ms.add(built,[1,2,5,6]);
					return built
				}());
				_ms.assert(_ms.unlazy(seq_61_63),spread(all_454,1,2,{
					three:4,
					five:6
				}),()=>{
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
				const _64spreaded=()=>{
					const _=last_45arg;
					if(_ms.bool(_ms.contains(_ms.unlazy(Map),_))){
						return _ms.unlazy(_61_62)(Array,_)
					} else if(_ms.bool(_ms.contains(_ms.unlazy(_64),_))){
						return ()=>{
							const built=[];
							for(let elem of _){
								_ms.add(built,[elem])
							};
							return built
						}()
					} else if(_ms.bool(_ms.contains(_ms.unlazy(ObjLit),_))){
						return _ms.unlazy(_61_62)(Array,_ms.unlazy(Object_45_62Map)(_))
					} else {
						throw _ms.error(`Can only spread a @, Map, or ObjLit, not ${_ms.show(_)}`)
					}
				}();
				return _ms.checkContains(_ms.unlazy(_64),()=>{
					const built=[];
					for(let _ of _64spreaded){
						const all_45args=_ms.unlazy(_43_43)(init_45args,_);
						_ms.add(built,Function.apply.call(fun,null,[].concat(_ms.arr(all_45args))))
					};
					return built
				}(),"res")
			},built)
		}();
		const spread_33=exports["spread!"]=()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(_61_63),[1,2,3],_ms.unlazy(build)(yield_33=>{
					const f=function f(a,b,c){
						yield_33(a);
						yield_33(b);
						return yield_33(c)
					};
					return spread_33(f,1,()=>{
						const built=new (global.Map)();
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
		const thunk=exports.thunk=()=>{
			const built={};
			const doc=built.doc=`Makes function which, when called, returns \`a\`.`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(_61_63),thunk(1)(),1)
			};
			return _ms.set(function thunk(_){
				return ()=>{
					return _
				}
			},built)
		}();
		const curry=()=>{
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
		impl_33(sub,Function,function(){
			const _this=this;
			const args=[].slice.call(arguments,0);
			return Function.apply.call(curry,null,[].concat(_this,_ms.arr(args)))
		});
		impl_33(sub,Method,function(){
			const _this=this;
			const args=[].slice.call(arguments,0);
			return Function.apply.call(curry,null,[].concat(_this,_ms.arr(args)))
		});
		self_45impl_33(sub,Function,()=>{
			const built={};
			const doc=built.doc=`Subbing Function does nothing and is only for documentation.\n* Function[Number String] takes a Number and returns a String.\n* Function[2] takes 2 arguments.\n* Function[2 String] takes 2 arguments and returns a String.\n* Function without a sub is assumed to be a one-argument function, so never write Function[1].`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(_61_63),_ms.sub(Function,Function,Function),Function)
			};
			return _ms.set(()=>{
				return Function
			},built)
		}());
		const name=exports.name=`Function`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9GdW5jdGlvbi5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0VBcUJBLDRCQUFRLEtBQUksa0JBQ1U7O0dBQXJCLG9CQUNDO0dBR0QsbUNBQVU7OztFQUVYLHdCQUFNLEtBQUksa0JBQ1U7O0dBQW5CLG9CQUFNO0dBQ04sbUNBQVU7OztFQUVYLDBCQUFPLEtBQUksa0JBQ1U7O0dBQXBCLG9CQUFNO0dBQ04sbUNBQVU7OztFQUVYLDhCQUNNOztHQUFMLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4saUJBQUksQ0FBRSxFQUFFLElBQVM7OztrQkFDakIsZUFBQSxFQUFXLEtBQ007c0JBRGY7OytCQUNGLHlCQUFFO0dBQUE7O0VBRUosNEJBQ0s7O0dBQUosb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixpQkFBSSxFQUFFLEdBQU87OztrQkFDYixjQUFBLEVBQ2tCOztzQkFEaEI7K0JBQ0YseUJBQUU7R0FBQTs7RUFFSix5Q0FDUzs7R0FBUixvQkFDQztHQUdELHNCQUNRLGVBQUE7SUFBUCxhQUNJOztLQUFILG9CQUFNO29CQUNMLFlBQUEsRUFDQzthQUFEO0tBQUE7O0lBQ0YsYUFDSTs7S0FBSCxvQkFBTTtvQkFDTixXQUFTOztrQ0FDQyxPQUFRO2tDQUNSLE9BQVE7a0NBQ1AsR0FBRyxHQUFJLEdBQUc7R0FBQTtrQkFFdEIsb0JBQUEsRUFDVTtzQkFEUjtXQUVGLDZCQUE2QixFQUFFO0dBQUE7O0VBRWpDLG9DQUNTOztHQUFSLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxHQUFPOzs7a0JBQ1Qsa0JBQUEsRUFDQztXQUFEO0dBQUE7O0VBRUYsNEJBQ0s7O0dBQUosb0JBQU07a0JBRUosZUFBQTs7RUFJRiw2Q0FDVzs7R0FBVixvQkFDQztHQUVELHNCQUNRLGVBQUE7cUNBQU8sQ0FBRSxFQUFFLEVBQUUscUJBQWEsUUFDSztLQUFyQyxjQUFRLGFBQVksR0FDQztNQUFwQixPQUFNO2FBQ047O0tBQ0QsU0FBSztRQUFHO0tBQUE7bUNBQ0ksUUFBTSxJQUFJO21DQUNWLFFBQU0sSUFBSTtLQUN0QixTQUFLO1FBQUc7S0FBQTttQ0FDSSxRQUFNLElBQUk7S0FDdEIsVUFBTTtRQUFHO0tBQUE7bUNBQ0csUUFBTSxLQUFLO0lBQUE7R0FBQTtrQkFDeEIsc0JBQUEsRUFDVTtzQkFEUjtJQUNGO1dBQ0MsS0FDVTt1QkFETjswQ0FDUSxHQUFHO2FBQU0sRUFBRTtLQUFBO0lBQUE7R0FBQTs7RUFFMUIsaURBQ2E7O0dBQVosb0JBQ0M7R0FHRCxzQkFDUSxlQUFBO3FDQUFPLENBQUUsRUFBRSxxQkFBYSxRQUNLO0tBQW5DLGNBQVEsZUFBYyxHQUNDO01BQXRCLE9BQU07YUFDTjs7S0FDRCxTQUFLLEtBQ3lCLElBQUE7O01BQTdCLGdCQUFHOzs7bUNBQ1EsUUFBTSxJQUFJO21DQUNWLFFBQU0sSUFBSTtLQUN0QixTQUFLO1FBQUc7S0FBQTttQ0FDSSxRQUFNLElBQUk7S0FDdEIsVUFBTSxLQUN5QixJQUFBOztNQUE5QixnQkFBRzs7O21DQUNPLEdBQUc7bUNBQ0YsUUFBTSxLQUFLO0lBQUE7R0FBQTtrQkFDeEIsd0JBQUEsRUFDVTtzQkFEUjtJQUNGO1dBQ0MsS0FDVTt1QkFETjswQ0FDUSxHQUFHO2FBQU0sRUFBRTtLQUFBO0lBQUE7R0FBQTs7RUFFM0IsZ0NBQ087O0dBQU4sb0JBQU07R0FDTixzQkFDUSxlQUFBO0lBQVAsY0FBUyxpQkFBQSxFQUFFLEVBQUUsRUFBRSxFQUNDO1lBQWYsQ0FBRSxFQUFFLEVBQUUsRUFBRTtJQUFBO3FDQUNNLE9BQU8sUUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFFLEVBQUUsUUFDSTs7bUJBQXZDLENBQUUsRUFBRSxFQUFFLEVBQUU7bUJBQ1IsQ0FBRSxFQUFFLEVBQUUsRUFBRTs7O0lBRVgsUUFBSSxPQUFPLFFBQU0sRUFBRSxNQUNDOztxQkFBbkIsRUFBSztxQkFDTCxFQUFLOzs7cUNBQ1EsTUFDQzs7bUJBQVosQ0FBRSxFQUFFLEVBQUUsRUFBRTttQkFDUixDQUFFLEVBQUUsRUFBRSxFQUFFOzs7cUNBRUksT0FBTyxRQUFNLEVBQUUsRUFBRTtXQUFRO1VBQVE7SUFBQSxPQUNHOzttQkFBaEQsQ0FBRSxFQUFFLEVBQUcsUUFBTzttQkFDZCxDQUFFLEVBQUUsRUFBRyxPQUFNOzs7O2tCQUdoQixnQkFBRyxJQUNvQjs7c0JBRGhCO0lBRVAsb0NBQWtCO0lBQ2xCLGtDQUFnQjtJQUNoQjtLQUFpQixRQUFBO0tBQ2hCLHlDQUFBLElBQ0k7Z0NBQ0EsTUFBTTtLQUFBLE9BQ1YseUNBQUEsSUFDRTs7O2VBQUksUUFBUSxFQUNDO3NCQUFiLENBQUU7T0FBQTs7O1lBQ0osNENBQUEsSUFDTztnQ0FBSCxrQ0FBaUI7S0FBQSxPQUVqQjtNQUFILGdCQUFRLHFEQUEwQzs7Ozs7YUFFL0MsS0FBQSxZQUNTO01BQWIsb0NBQWMsWUFBVTt3Q0FDdEIsMkJBQUk7S0FBQTs7Ozs7RUFFVCx1Q0FDUTs7R0FBUCxvQkFBTTtHQUNOLHNCQUNRLGVBQUE7a0NBQUksQ0FBRSxFQUFFLEVBQUUscUJBQVksVUFDTTtLQUFsQyxRQUFLLFdBQUEsRUFBRSxFQUFFLEVBQ0M7TUFBVCxTQUFPO01BQ1AsU0FBTzthQUNQLFNBQU87S0FBQTtZQUNSLFVBQVEsRUFBRSxNQUNDOztzQkFBVixFQUFLOzs7OztrQkFDTixtQkFBQSxJQUNXOzt3QkFBWixzQkFBTyxZQUFJO0dBQUE7O0VBRWIsOEJBQ007O0dBQUwsb0JBQU07R0FDTixzQkFDUSxlQUFBO2tDQUFLLE1BQU0sS0FBSztHQUFBO2tCQUN2QixlQUFBLEVBQ0M7V0FDQSxJQUFBO1lBQUE7SUFBQTtHQUFBOztFQUVILGdCQUNPOztHQUFOLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtJQUFQLG1DQUFPO2tDQUNLLEtBQUcsR0FBRztJQUNsQixjQUFTLGlCQUFBLEVBQUUsRUFBRSxFQUNDO1lBQWIsQ0FBRSxFQUFFLEVBQUU7SUFBQTtJQUNQLHdCQUFVLFFBQU0sRUFBRTtrQ0FDTixVQUFRLEdBQUcsQ0FBRSxFQUFFLEVBQUU7R0FBQTtrQkFDOUI7O0VBRUQsUUFBTSxJQUFJLFNBQVcsVUFDTztTQUdyQjs7OEJBSE4scUJBR00sY0FISztFQUFBO0VBRVosUUFBTSxJQUFJLE9BQVMsVUFDTztTQUFuQjs7OEJBQU4scUJBQU0sY0FBSztFQUFBO0VBRVosZUFBVyxJQUFJLGFBQ1E7O0dBQXRCLG9CQUNDO0dBS0Qsc0JBQ1EsZUFBQTswQ0FBSSxTQUFTLFNBQVMsVUFBVTtHQUFBO2tCQUV2QyxJQUFBO1dBQUE7R0FBQTs7RUE1TkYsd0JBQUEiLCJmaWxlIjoiRnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==