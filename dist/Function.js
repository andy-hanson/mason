"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./methods","./private/js-impl","./Type/Alias-Type","./Type/Method","./at/at","./at/at-Type","./at/Map/Map","./at/Map/Hash-Mapbang","./at/Map/Mapbang","./at/Map/Weak-Id-Mapbang","./at/Seq/Seq","./Object","./Try","./Type/Type","./bang","./at/Seq/Seq","./compare","./control","./math/methods"],function(exports,methods_0,js_45impl_1,Alias_45Type_2,Method_3,_64_4,_64_45Type_5,Map_6,Hash_45Map_33_7,Map_33_8,Weak_45Id_45Map_33_9,Seq_10,Object_11,Try_12,Type_13,_33_14,Seq_15,compare_16,control_17,methods_18){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(methods_0),sub=_ms.get(_$2,"sub"),_$3=_ms.getModule(js_45impl_1),iCurry=_ms.get(_$3,"iCurry"),Alias_45Type=_ms.getDefaultExport(Alias_45Type_2),Method=_ms.getDefaultExport(Method_3),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),self_45impl_33=_ms.get(_$5,"self-impl!"),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_4)
		}),_$7=_ms.lazyGetModule(_64_4),_43_43=_ms.lazyProp(_$7,"++"),map=_ms.lazyProp(_$7,"map"),_$8=_ms.lazyGetModule(_64_45Type_5),empty=_ms.lazyProp(_$8,"empty"),Map=_ms.lazy(function(){
			return _ms.getDefaultExport(Map_6)
		}),Hash_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Hash_45Map_33_7)
		}),_$11=_ms.lazyGetModule(Map_33_8),get_45or_45add_33=_ms.lazyProp(_$11,"get-or-add!"),Weak_45Id_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Weak_45Id_45Map_33_9)
		}),_$13=_ms.lazyGetModule(Seq_10),rtail=_ms.lazyProp(_$13,"rtail"),last=_ms.lazyProp(_$13,"last"),_$14=_ms.lazyGetModule(Object_11),Object_45_62Map=_ms.lazyProp(_$14,"Object->Map"),_$15=_ms.lazyGetModule(Try_12),oh_45no_33=_ms.lazyProp(_$15,"oh-no!"),_$16=_ms.lazyGetModule(Type_13),_61_62=_ms.lazyProp(_$16,"=>"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_14)
		}),_$19=_ms.lazyGetModule(Seq_15),seq_61_63=_ms.lazyProp(_$19,"seq=?"),_$20=_ms.lazyGetModule(compare_16),_61_63=_ms.lazyProp(_$20,"=?"),_$21=_ms.lazyGetModule(control_17),build=_ms.lazyProp(_$21,"build"),_$22=_ms.lazyGetModule(methods_18),_43=_ms.lazyProp(_$22,"+");
		const Action=exports.Action=Alias_45Type(function(){
			const built={};
			const doc=built.doc="A function returning nothing.\nFunction[Number] describes a Function taking nothing and returning a Number;\nAction[Number] describes a Function taking a Number and returning nothing.";
			const alias_45of=built["alias-of"]=Function;
			return _ms.setName(built,"Action")
		}());
		const Pred=exports.Pred=Alias_45Type(function(){
			const built={};
			const doc=built.doc="Function[Any Boolean].";
			const alias_45of=built["alias-of"]=Function;
			return _ms.setName(built,"Pred")
		}());
		const Thunk=exports.Thunk=Alias_45Type(function(){
			const built={};
			const doc=built.doc="Function with no args returning a value.";
			const alias_45of=built["alias-of"]=Function;
			return _ms.setName(built,"Thunk")
		}());
		const apply=exports.apply=function(){
			const built={};
			const doc=built.doc="Calls the function with the given arguments list.";
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
			const doc=built.doc="Calls the function with the given arguments.";
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
			const doc=built.doc="Creates a new function with identical functionality.\n*Does* copy any values captured by its scope.\nDoes *not* copy any properties on the old function.";
			const test=built.test=function test(){
				const f1=function(){
					const built={};
					const doc=built.doc="f1";
					return _ms.set(function f1(_){
						return _
					},built)
				}();
				const f2=function(){
					const built={};
					const doc=built.doc="f2";
					return _ms.set(fun_45copy(f1),built,"f2")
				}();
				_ms.unlazy(_33)(_ms.unlazy(_61_63),f1.doc,"f1");
				_ms.unlazy(_33)(_ms.unlazy(_61_63),f2.doc,"f2");
				_ms.unlazy(_33)(_ms.unlazy(_61_63),f1(1),f2(1))
			};
			return _ms.set(function fun_45copy(_){
				_ms.checkContains(Function,_,"_");
				return Function.prototype.call.bind(_,null)
			},built)
		}();
		const identity=exports.identity=function(){
			const built={};
			const doc=built.doc="Outputs its input unmodified.";
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
			const doc=built.doc="Does nothing.";
			return _ms.set(function noop(){},built)
		}();
		const id_45memoize=exports["id-memoize"]=function(){
			const built={};
			const doc=built.doc="When an Object is passed into `fun`, stores the result in a `Weak-Id-Map!`\nand uses that if the exact same (`id=?`) Object is used again.";
			const test=built.test=function test(){
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63),[1,2,1],_ms.unlazy(build)(function(_yield){
					const get_45a=id_45memoize(function(x){
						_yield(x.a);
						return x.a
					});
					const a1={
						a:1
					};
					_ms.unlazy(_33)(_ms.unlazy(_61_63),get_45a(a1),1);
					_ms.unlazy(_33)(_ms.unlazy(_61_63),get_45a(a1),1);
					const a2={
						a:2
					};
					_ms.unlazy(_33)(_ms.unlazy(_61_63),get_45a(a2),2);
					const a1b={
						a:1
					};
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),get_45a(a1b),1)
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
			const doc=built.doc="Stores the argument every time you call it,\nand re-uses the result if called again with the same argument.\nThis will make those arguments unavailable for garbage collection...";
			const test=built.test=function test(){
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63),[1,2],_ms.unlazy(build)(function(_yield){
					const get_45a=hash_45memoize(function(x){
						_yield(x.a);
						return x.a
					});
					const a1=call(function(){
						const built={};
						const a=built.a=1;
						return built
					});
					_ms.unlazy(_33)(_ms.unlazy(_61_63),get_45a(a1),1);
					_ms.unlazy(_33)(_ms.unlazy(_61_63),get_45a(a1),1);
					const a2={
						a:2
					};
					_ms.unlazy(_33)(_ms.unlazy(_61_63),get_45a(a2),2);
					const a1b=call(function(){
						const built={};
						const a=built.a=1;
						return built
					});
					_ms.unlazy(_33)(_ms.unlazy(_61_63),a1,a1b);
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),get_45a(a1b),1)
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
			const doc=built.doc="Applies `fun`, starting with the given args, to each entry in an arguments list or map.";
			const test=built.test=function test(){
				const all_454=function all_454(a,b,c,d){
					return [a,b,c,d]
				};
				const x=spread(all_454,1,2,3,function(){
					const built=[];
					_ms.add(built,4);
					_ms.add(built,5);
					return built
				}());
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63),x,function(){
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
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63),y,function(){
					const built=[];
					_ms.add(built,[1,2,3,4]);
					_ms.add(built,[1,2,5,6]);
					return built
				}());
				const z=spread(all_454,1,2,function(){
					const built={};
					const three=built.three=4;
					const five=built.five=6;
					return _ms.setName(built,"z")
				}());
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63),z,function(){
					const built=[];
					_ms.add(built,[1,2,"three",4]);
					_ms.add(built,[1,2,"five",6]);
					_ms.add(built,[1,2,"name","z"]);
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
						return _ms.unlazy(map)(_,function(em){
							return [em]
						})
					} else if(_ms.bool(_ms.contains(Object,_))){
						return _ms.unlazy(_61_62)(Array,_ms.unlazy(Object_45_62Map)(_))
					} else {
						return _ms.unlazy(oh_45no_33)(("Can only spread a @ or Map, not "+_ms.show(_)))
					}
				}();
				return _ms.checkContains(_ms.unlazy(_64),_ms.unlazy(map)(_64spreaded,function(spreaded){
					const all_45args=_ms.unlazy(_43_43)(init_45args,spreaded);
					return Function.apply.call(fun,null,[].concat(_ms.arr(all_45args)))
				}),"res")
			},built)
		}();
		const spread_33=exports["spread!"]=function(){
			const built={};
			const doc=built.doc="TODO";
			const test=built.test=function test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),[1,2,3],_ms.unlazy(build)(function(yield_33){
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
				for(let _ of Function.apply.call(spread,null,[].concat(fun,_ms.arr(args)))[Symbol.iterator]()){
					noop(_)
				}
			},built)
		}();
		const thunk=exports.thunk=function(){
			const built={};
			const doc=built.doc="Makes function which, when called, returns `a`.";
			const test=built.test=function test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),thunk(1)(),1)
			};
			return _ms.set(function thunk(_){
				return function(){
					return _
				}
			},built)
		}();
		const curry=function(){
			const built={};
			const doc=built.doc="Creates a function which calls `f` with the given arguments first.";
			const test=built.test=function test(){
				const _431=_ms.sub(_ms.unlazy(_43),1);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_431(1),2);
				const all_453=function all_453(a,b,c){
					return [a,b,c]
				};
				const one_45two=_ms.sub(all_453,1,2);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),one_45two(3),[1,2,3])
			};
			return _ms.set(iCurry,built,"curry")
		}();
		impl_33(sub,Function,curry);
		impl_33(sub,Method,curry);
		self_45impl_33(sub,Function,function(){
			const built={};
			const doc=built.doc="Subbing Function does nothing and is only for documentation.\n* Function[Number String] takes a Number and returns a String.\n* Function[2] takes 2 arguments.\n* Function[2 String] takes 2 arguments and returns a String.\n* Function without a sub is assumed to be a one-argument function, so never write Function[1].";
			const test=built.test=function test(){
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(Function,Function,Function),Function)
			};
			return _ms.set(function(){
				return Function
			},built)
		}());
		const name=exports.name="Function";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9GdW5jdGlvbi5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7RUF1QkEsNEJBQVEsdUJBQ1U7O0dBQWpCLG9CQUNDO0dBR0QsbUNBQVU7OztFQUVYLHdCQUFNLHVCQUNVOztHQUFmLG9CQUFNO0dBQ04sbUNBQVU7OztFQUVYLDBCQUFPLHVCQUNVOztHQUFoQixvQkFBTTtHQUNOLG1DQUFVOzs7RUFFWCxvQ0FDTTs7R0FBTCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLGlCQUFJLENBQUUsRUFBRSxJQUFTOzs7a0JBQ2pCLGVBQUEsRUFBVyxLQUNNO3NCQURmOzsrQkFDRix5QkFBRTtHQUFBOztFQUVKLGtDQUNLOztHQUFKLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4saUJBQUksRUFBRSxHQUFPOzs7a0JBQ2IsY0FBQSxFQUNrQjs7c0JBRGhCOytCQUNGLHlCQUFFO0dBQUE7O0VBRUosK0NBQ1M7O0dBQVIsb0JBQ0M7R0FHRCxzQkFDUSxlQUFBO0lBQVAsbUJBQ0k7O0tBQUgsb0JBQU07b0JBQ0wsWUFBQSxFQUNDO2FBQUQ7S0FBQTs7SUFDRixtQkFDSTs7S0FBSCxvQkFBTTtvQkFDTixXQUFTOzt1Q0FDTCxPQUFRO3VDQUNSLE9BQVE7dUNBQ1AsR0FBRyxHQUFJLEdBQUc7R0FBQTtrQkFFaEIsb0JBQUEsRUFDVTtzQkFEUjtXQUVGLDZCQUE2QixFQUFFO0dBQUE7O0VBRWpDLDBDQUNTOztHQUFSLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxHQUFPOzs7a0JBQ1Qsa0JBQUEsRUFDQztXQUFEO0dBQUE7O0VBRUYsa0NBQ0s7O0dBQUosb0JBQU07a0JBRUosZUFBQTs7RUFJRixtREFDVzs7R0FBVixvQkFDQztHQUVELHNCQUNRLGVBQUE7MENBQUMsQ0FBRSxFQUFFLEVBQUUscUJBQVksU0FBQSxPQUNLO0tBQTlCLGNBQVEsYUFBWSxTQUFBLEVBQ0M7TUFBcEIsT0FBTTthQUNOOztLQUNELFNBQUs7UUFBRztLQUFBO3dDQUNGLFFBQU0sSUFBSTt3Q0FDVixRQUFNLElBQUk7S0FDaEIsU0FBSztRQUFHO0tBQUE7d0NBQ0YsUUFBTSxJQUFJO0tBQ2hCLFVBQU07UUFBRztLQUFBOytDQUNILFFBQU0sS0FBSztJQUFBO0dBQUE7a0JBQ2xCLHNCQUFBLEVBQ1U7c0JBRFI7SUFDRjtXQUNDLFNBQUEsSUFDVTt1QkFETjswQ0FDUSxHQUFHO2FBQU0sRUFBRTtLQUFBO0lBQUE7R0FBQTs7RUFFMUIsdURBQ2E7O0dBQVosb0JBQ0M7R0FHRCxzQkFDUSxlQUFBOzBDQUFDLENBQUUsRUFBRSxxQkFBWSxTQUFBLE9BQ0s7S0FBNUIsY0FBUSxlQUFjLFNBQUEsRUFDQztNQUF0QixPQUFNO2FBQ047O0tBQ0QsU0FBSyxLQUN5QixVQUFBOztNQUE3QixnQkFBRzs7O3dDQUNFLFFBQU0sSUFBSTt3Q0FDVixRQUFNLElBQUk7S0FDaEIsU0FBSztRQUFHO0tBQUE7d0NBQ0YsUUFBTSxJQUFJO0tBQ2hCLFVBQU0sS0FDeUIsVUFBQTs7TUFBOUIsZ0JBQUc7Ozt3Q0FDQyxHQUFHOytDQUNGLFFBQU0sS0FBSztJQUFBO0dBQUE7a0JBQ2xCLHdCQUFBLEVBQ1U7c0JBRFI7SUFDRjtXQUNDLFNBQUEsSUFDVTt1QkFETjswQ0FDUSxHQUFHO2FBQU0sRUFBRTtLQUFBO0lBQUE7R0FBQTs7RUFFM0Isc0NBQ087O0dBQU4sb0JBQU07R0FDTixzQkFDUSxlQUFBO0lBQVAsY0FBUyxpQkFBQSxFQUFFLEVBQUUsRUFBRSxFQUNDO1lBQWYsQ0FBRSxFQUFFLEVBQUUsRUFBRTtJQUFBO0lBQ1QsUUFBSSxPQUFPLFFBQU0sRUFBRSxFQUFFLFlBQ0M7O21CQUFuQjttQkFDQTs7OzBDQUNLLFlBQ0M7O21CQUFOLENBQUUsRUFBRSxFQUFFLEVBQUU7bUJBQ1IsQ0FBRSxFQUFFLEVBQUUsRUFBRTs7O0lBRVgsUUFBSSxPQUFPLFFBQU0sRUFBRSxZQUNDOztxQkFBbkIsRUFBSztxQkFDTCxFQUFLOzs7MENBQ0UsWUFDQzs7bUJBQU4sQ0FBRSxFQUFFLEVBQUUsRUFBRTttQkFDUixDQUFFLEVBQUUsRUFBRSxFQUFFOzs7SUFFWCxRQUFJLE9BQU8sUUFBTSxFQUFFLFlBQ0M7O0tBQW5CLHdCQUFPO0tBQ1Asc0JBQU07OzswQ0FDQyxZQUNDOzttQkFBTixDQUFFLEVBQUUsRUFBRyxRQUFPO21CQUNkLENBQUUsRUFBRSxFQUFHLE9BQU07bUJBQ2IsQ0FBRSxFQUFFLEVBQUcsT0FBTzs7OztrQkFHakIsZ0JBQUcsSUFDb0I7O3NCQURoQjtJQUVQLG9DQUFrQjtJQUNsQixrQ0FBZ0I7SUFDaEI7S0FBaUIsUUFBQTtLQUNoQix5Q0FBQSxJQUNJO2dDQUNBLE1BQU07S0FBQSxPQUNWLHlDQUFBLElBQ0U7NkJBQUcsRUFBRyxTQUFBLEdBQ0U7Y0FBUixDQUFFO01BQUE7S0FBQSxPQUNKLHlCQUFDLE9BQUQsSUFDTztnQ0FBSCxrQ0FBaUI7S0FBQSxPQUVqQjtvQ0FBSyw2Q0FBaUM7S0FBQTtJQUFBOzZEQUN2QyxZQUFXLFNBQUEsU0FDUTtLQUF0QixvQ0FBYyxZQUFVO2dDQUN4QiwyQkFBSTtJQUFBOzs7RUFFUCw2Q0FDUTs7R0FBUCxvQkFBTTtHQUNOLHNCQUNRLGVBQUE7dUNBQUYsQ0FBRSxFQUFFLEVBQUUscUJBQVksU0FBQSxTQUNNO0tBQTVCLFFBQUssV0FBQSxFQUFFLEVBQUUsRUFDQztNQUFULFNBQU87TUFDUCxTQUFPO2FBQ1AsU0FBTztLQUFBO1lBQ1IsVUFBUSxFQUFFLFlBQ0M7O3NCQUFWLEVBQUs7Ozs7O2tCQUNOLG1CQUFBLElBQ1c7O0lBQVAsUUFBQSx5QkFBQSxzQkFBTyxZQUFJLDJCQUNPO0tBQXRCLEtBQUs7SUFBQTtHQUFBOztFQUVSLG9DQUNNOztHQUFMLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTt1Q0FBRCxNQUFNLEtBQUs7R0FBQTtrQkFDakIsZUFBQSxFQUNDO1dBQ0EsVUFBQTtZQUFBO0lBQUE7R0FBQTs7RUFFSCxzQkFDTzs7R0FBTixvQkFBTTtHQUNOLHNCQUNRLGVBQUE7SUFBUCxtQ0FBTzt1Q0FDRCxLQUFHLEdBQUc7SUFDWixjQUFTLGlCQUFBLEVBQUUsRUFBRSxFQUNDO1lBQWIsQ0FBRSxFQUFFLEVBQUU7SUFBQTtJQUNQLHdCQUFVLFFBQU0sRUFBRTt1Q0FDWixVQUFRLEdBQUcsQ0FBRSxFQUFFLEVBQUU7R0FBQTtrQkFDeEI7O0VBRUQsUUFBTSxJQUFJLFNBQVM7RUFFbkIsUUFBTSxJQUFJLE9BQU87RUFFakIsZUFBVyxJQUFJLG1CQUNROztHQUF0QixvQkFDQztHQUtELHNCQUNPLGVBQUE7c0RBQUQsU0FBUyxTQUFTLFVBQVU7R0FBQTtrQkFFakMsVUFBQTtXQUFBO0dBQUE7O0VBbk9GLHdCQUFBIiwiZmlsZSI6IkZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=