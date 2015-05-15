"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./methods","./private/js-impl","./Type/Alias-Type","./Type/Method","./at/at","./at/at-Type","./at/Map/Map","./at/Map/Hash-Mapbang","./at/Map/Mapbang","./at/Map/Weak-Id-Mapbang","./at/Seq/Seq","./Object","./Try","./bang","./at/Seq/Seq","./compare","./control","./math/methods"],function(exports,methods_0,js_45impl_1,Alias_45Type_2,Method_3,_64_4,_64_45Type_5,Map_6,Hash_45Map_33_7,Map_33_8,Weak_45Id_45Map_33_9,Seq_10,Object_11,Try_12,_33_13,Seq_14,compare_15,control_16,methods_17){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(methods_0),sub=_ms.get(_$2,"sub"),_$3=_ms.getModule(js_45impl_1),iCurry=_ms.get(_$3,"iCurry"),Alias_45Type=_ms.getDefaultExport(Alias_45Type_2),Method=_ms.getDefaultExport(Method_3),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),self_45impl_33=_ms.get(_$5,"self-impl!"),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_4)
		}),_$7=_ms.lazyGetModule(_64_4),_43_43=_ms.lazyProp(_$7,"++"),each_33=_ms.lazyProp(_$7,"each!"),map=_ms.lazyProp(_$7,"map"),map_39=_ms.lazyProp(_$7,"map'"),_$8=_ms.lazyGetModule(_64_45Type_5),empty=_ms.lazyProp(_$8,"empty"),Map=_ms.lazy(function(){
			return _ms.getDefaultExport(Map_6)
		}),Hash_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Hash_45Map_33_7)
		}),_$11=_ms.lazyGetModule(Map_33_8),get_45or_45add_33=_ms.lazyProp(_$11,"get-or-add!"),Weak_45Id_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Weak_45Id_45Map_33_9)
		}),_$13=_ms.lazyGetModule(Seq_10),rtail=_ms.lazyProp(_$13,"rtail"),last=_ms.lazyProp(_$13,"last"),_$14=_ms.lazyGetModule(Object_11),Object_45_62Map=_ms.lazyProp(_$14,"Object->Map"),_$15=_ms.lazyGetModule(Try_12),oh_45no_33=_ms.lazyProp(_$15,"oh-no!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_13)
		}),_$18=_ms.lazyGetModule(Seq_14),seq_61_63=_ms.lazyProp(_$18,"seq=?"),_$19=_ms.lazyGetModule(compare_15),_61_63=_ms.lazyProp(_$19,"=?"),_$20=_ms.lazyGetModule(control_16),build=_ms.lazyProp(_$20,"build"),_$21=_ms.lazyGetModule(methods_17),_43=_ms.lazyProp(_$21,"+");
		const Action=exports.Action=Alias_45Type(function(){
			const doc="A function returning nothing.\nFunction[Number] describes a Function taking nothing and returning a Number;\nAction[Number] describes a Function taking a Number and returning nothing.";
			const alias_45of=Function;
			return {
				doc:doc,
				"alias-of":alias_45of,
				displayName:"Action"
			}
		}());
		const Pred=exports.Pred=Alias_45Type(function(){
			const doc="Function[Any Boolean].";
			const alias_45of=Function;
			return {
				doc:doc,
				"alias-of":alias_45of,
				displayName:"Pred"
			}
		}());
		const apply=exports.apply=function(){
			const doc="Calls the function with the given arguments list.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[_ms.unlazy(_43),[1,2]],_v0=3;
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(_,args){
				_ms.checkContains(Function,_,"_");
				_ms.checkContains(_ms.unlazy(_64),args,"args");
				return Function.apply.call(_,null,[].concat(_ms.arr(args)))
			},"doc",doc,"test",test,"displayName","apply")
		}();
		const call=exports.call=function(){
			const doc="Calls the function with the given arguments.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[_ms.unlazy(_43),1,2],_v0=3;
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(_){
				const args=[].slice.call(arguments,1);
				_ms.checkContains(Function,_,"_");
				return Function.apply.call(_,null,[].concat(_ms.arr(args)))
			},"doc",doc,"test",test,"displayName","call")
		}();
		const fun_45copy=exports["fun-copy"]=function(){
			const doc="Creates a new function with identical functionality.\n*Does* copy any values captured by its scope.\nDoes *not* copy any properties on the old function.";
			const test=function(){
				return _ms.set(function(){
					const f1=function(){
						const doc="f1";
						return _ms.set(function(_){
							return _
						},"doc",doc,"displayName","f1")
					}();
					const f2=function(){
						const doc="f2";
						return _ms.set(fun_45copy(f1),"doc",doc,"displayName","f2")
					}();
					_ms.unlazy(_33)(_ms.unlazy(_61_63),f1.doc,"f1");
					_ms.unlazy(_33)(_ms.unlazy(_61_63),f2.doc,"f2");
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),f1(1),f2(1))
				},"displayName","test")
			}();
			return _ms.set(function(_){
				_ms.checkContains(Function,_,"_");
				return Function.prototype.call.bind(_,null)
			},"doc",doc,"test",test,"displayName","fun-copy")
		}();
		const identity=exports.identity=function(){
			const doc="Outputs its input unmodified.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[1],_v0=1;
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(_){
				return _
			},"doc",doc,"test",test,"displayName","identity")
		}();
		const noop=exports.noop=function(){
			const doc="Does nothing.";
			return _ms.set(function(){
				return null
			},"doc",doc,"displayName","noop")
		}();
		const id_45memoize=exports["id-memoize"]=function(){
			const doc="When an Object is passed into `fun`, stores the result in a `Weak-Id-Map!`\nand uses that if the exact same (`id=?`) Object is used again.";
			const test=function(){
				return _ms.set(function(){
					return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),[1,2,1],_ms.unlazy(build)(function(_yield){
						const get_45a=id_45memoize(function(){
							return _ms.set(function(x){
								_yield(x.a);
								return x.a
							},"displayName","get-a")
						}());
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
				},"displayName","test")
			}();
			return _ms.set(function(_){
				_ms.checkContains(Function,_,"_");
				const wm=_ms.unlazy(empty)(_ms.unlazy(Weak_45Id_45Map_33));
				return function(arg){
					_ms.checkContains(Object,arg,"arg");
					return _ms.unlazy(get_45or_45add_33)(wm,arg,_ms.lazy(function(){
						return _(arg)
					}))
				}
			},"doc",doc,"test",test,"displayName","id-memoize")
		}();
		const hash_45memoize=exports["hash-memoize"]=function(){
			const doc="Stores the argument every time you call it,\nand re-uses the result if called again with the same argument.\nThis will make those arguments unavailable for garbage collection...";
			const test=function(){
				return _ms.set(function(){
					return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),[1,2],_ms.unlazy(build)(function(_yield){
						const get_45a=hash_45memoize(function(){
							return _ms.set(function(x){
								_yield(x.a);
								return x.a
							},"displayName","get-a")
						}());
						const a1=call(function(){
							return _ms.set(function(){
								const a=1;
								return {
									a:a
								}
							},"displayName","a1")
						}());
						_ms.unlazy(_33)(_ms.unlazy(_61_63),get_45a(a1),1);
						_ms.unlazy(_33)(_ms.unlazy(_61_63),get_45a(a1),1);
						const a2={
							a:2
						};
						_ms.unlazy(_33)(_ms.unlazy(_61_63),get_45a(a2),2);
						const a1b=call(function(){
							return _ms.set(function(){
								const a=1;
								return {
									a:a
								}
							},"displayName","a1b")
						}());
						_ms.unlazy(_33)(_ms.unlazy(_61_63),a1,a1b);
						return _ms.unlazy(_33)(_ms.unlazy(_61_63),get_45a(a1b),1)
					}))
				},"displayName","test")
			}();
			return _ms.set(function(_){
				_ms.checkContains(Function,_,"_");
				const hm=_ms.unlazy(empty)(_ms.unlazy(Hash_45Map_33));
				return function(arg){
					_ms.checkContains(Object,arg,"arg");
					return _ms.unlazy(get_45or_45add_33)(hm,arg,_ms.lazy(function(){
						return _(arg)
					}))
				}
			},"doc",doc,"test",test,"displayName","hash-memoize")
		}();
		const spread=exports.spread=function(){
			const doc="Applies `fun`, starting with the given args, to each entry in an arguments list or map.";
			const test=function(){
				return _ms.set(function(){
					const all_454=function(){
						return _ms.set(function(a,b,c,d){
							return [a,b,c,d]
						},"displayName","all-4")
					}();
					const x=spread(all_454,1,2,3,function(){
						const _0=4;
						const _1=5;
						return [_0,_1]
					}());
					_ms.unlazy(_33)(_ms.unlazy(seq_61_63),x,function(){
						const _0=[1,2,3,4];
						const _1=[1,2,3,5];
						return [_0,_1]
					}());
					const y=spread(all_454,1,2,function(){
						const _k0=3,_v0=4;
						const _k1=5,_v1=6;
						return _ms.map(_k0,_v0,_k1,_v1)
					}());
					_ms.unlazy(_33)(_ms.unlazy(seq_61_63),y,function(){
						const _0=[1,2,3,4];
						const _1=[1,2,5,6];
						return [_0,_1]
					}());
					const z=spread(all_454,1,2,function(){
						const three=4;
						const five=6;
						return {
							three:three,
							five:five,
							displayName:"z"
						}
					}());
					return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),z,function(){
						const _0=[1,2,"three",4];
						const _1=[1,2,"five",6];
						const _2=[1,2,"displayName","z"];
						return [_0,_1,_2]
					}())
				},"displayName","test")
			}();
			return _ms.set(function(fun){
				const args=[].slice.call(arguments,1);
				_ms.checkContains(Function,fun,"fun");
				const init_45args=_ms.unlazy(rtail)(args);
				const last_45arg=_ms.unlazy(last)(args);
				const _64spreaded=function(){
					const _=last_45arg;
					if(_ms.bool(_ms.contains(_ms.unlazy(Map),_))){
						return _ms.unlazy(map_39)(_,function(pair){
							const _$165=pair,key=_$165.key,val=_$165.val;
							return [key,val]
						})
					} else if(_ms.bool(_ms.contains(_ms.unlazy(_64),_))){
						return _ms.unlazy(map)(_,function(em){
							return [em]
						})
					} else if(_ms.bool(_ms.contains(Object,_))){
						return _ms.unlazy(map_39)(_ms.unlazy(Object_45_62Map)(_),function(pair){
							const _$172=pair,key=_$172.key,val=_$172.val;
							return [key,val]
						})
					} else {
						return _ms.unlazy(oh_45no_33)(("Can only spread a @ or Map, not "+_ms.show(_)))
					}
				}();
				return _ms.checkContains(_ms.unlazy(_64),_ms.unlazy(map)(_64spreaded,function(spreaded){
					const all_45args=_ms.unlazy(_43_43)(init_45args,spreaded);
					return Function.apply.call(fun,null,[].concat(_ms.arr(all_45args)))
				}),"res")
			},"doc",doc,"test",test,"displayName","spread")
		}();
		const spread_33=exports["spread!"]=function(){
			const doc="TODO";
			const test=function(){
				return _ms.set(function(){
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),[1,2,3],_ms.unlazy(build)(function(yield_33){
						const f=function(){
							return _ms.set(function(a,b,c){
								yield_33(a);
								yield_33(b);
								return yield_33(c)
							},"displayName","f")
						}();
						return spread_33(f,1,function(){
							const _k0=2,_v0=3;
							return _ms.map(_k0,_v0)
						}())
					}))
				},"displayName","test")
			}();
			return _ms.set(function(fun){
				const args=[].slice.call(arguments,1);
				return _ms.unlazy(each_33)(Function.apply.call(spread,null,[].concat(fun,_ms.arr(args))),noop)
			},"doc",doc,"test",test,"displayName","spread!")
		}();
		const thunk=exports.thunk=function(){
			const doc="Makes function which, when called, returns `a`.";
			const test=function(){
				return _ms.set(function(){
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),thunk(1)(),1)
				},"displayName","test")
			}();
			return _ms.set(function(_){
				return function(){
					return _
				}
			},"doc",doc,"test",test,"displayName","thunk")
		}();
		const curry=function(){
			const doc="Creates a function which calls `f` with the given arguments first.";
			const test=function(){
				return _ms.set(function(){
					const _431=_ms.sub(_ms.unlazy(_43),1);
					_ms.unlazy(_33)(_ms.unlazy(_61_63),_431(1),2);
					const all_453=function(){
						return _ms.set(function(a,b,c){
							return [a,b,c]
						},"displayName","all-3")
					}();
					const one_45two=_ms.sub(all_453,1,2);
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),one_45two(3),[1,2,3])
				},"displayName","test")
			}();
			return _ms.set(iCurry,"doc",doc,"test",test,"displayName","curry")
		}();
		impl_33(sub,Function,curry);
		impl_33(sub,Method,curry);
		const displayName=exports.displayName="Function";
		exports.default=self_45impl_33(sub,Function,function(){
			const doc="Subbing Function does nothing and is only for documentation.\n* Function[Number String] takes a Number and returns a String.\n* Function[2] takes 2 arguments.\n* Function[2 String] takes 2 arguments and returns a String.\n* Function without a sub is assumed to be a one-argument function, so never write Function[1].";
			const test=function(){
				return _ms.set(function(){
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(Function,Function,Function),Function)
				},"displayName","test")
			}();
			return _ms.set(function(){
				return Function
			},"doc",doc,"test",test)
		}());
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9GdW5jdGlvbi5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7RUFzQkEsNEJBQVEsdUJBQ1U7R0FBakIsVUFDQztHQUdELGlCQUFVOzs7Ozs7O0VBRVgsd0JBQU0sdUJBQ1U7R0FBZixVQUFNO0dBQ04saUJBQVU7Ozs7Ozs7RUFFWCxvQ0FDTTtHQUFMLFVBQU07R0FDTixxQkFDTzttQkFBQSxVQUFBO0tBQU4sVUFBQSxpQkFBSSxDQUFFLEVBQUUsUUFBUzs7OztrQkFDakIsU0FBQSxFQUFXLEtBQ007c0JBRGY7OytCQUNGLHlCQUFFO0dBQUE7O0VBRUosa0NBQ0s7R0FBSixVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTtLQUFOLFVBQUEsaUJBQUksRUFBRSxPQUFPOzs7O2tCQUNiLFNBQUEsRUFDa0I7O3NCQURoQjsrQkFDRix5QkFBRTtHQUFBOztFQUVKLCtDQUNTO0dBQVIsVUFDQztHQUdELHFCQUNPO21CQUFBLFVBQUE7S0FBTixtQkFDSTtNQUFILFVBQU07cUJBQ0wsU0FBQSxFQUNDO2NBQUQ7TUFBQTs7S0FDRixtQkFDSTtNQUFILFVBQU07cUJBQ04sV0FBUzs7d0NBQ0wsT0FBUTt3Q0FDUixPQUFROytDQUNQLEdBQUcsR0FBSSxHQUFHO0lBQUE7O2tCQUVoQixTQUFBLEVBQ1U7c0JBRFI7V0FFRiw2QkFBNkIsRUFBRTtHQUFBOztFQUVqQywwQ0FDUztHQUFSLFVBQU07R0FDTixxQkFDTzttQkFBQSxVQUFBO0tBQU4sVUFBQSxDQUFFLE9BQU87Ozs7a0JBQ1QsU0FBQSxFQUNDO1dBQUQ7R0FBQTs7RUFFRixrQ0FDSztHQUFKLFVBQU07a0JBRUwsVUFBQTtXQUFBO0dBQUE7O0VBSUQsbURBQ1c7R0FBVixVQUNDO0dBRUQscUJBQ087bUJBQUEsVUFBQTtrREFBRSxDQUFFLEVBQUUsRUFBRSxxQkFBWSxTQUFBLE9BQ0s7TUFBOUIsY0FBUSx1QkFBWTtz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LFFBQVM7R0FBQTs7RUFFN0Isb0NBQ007R0FBTCxVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTsrQ0FBQSxNQUFNLEtBQUs7SUFBQTs7a0JBQ2pCLFNBQUEsRUFDQztXQUNBLFVBQUE7WUFBQTtJQUFBO0dBQUE7O0VBRUgsc0JBQ087R0FBTixVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTtLQUFOLG1DQUFPO3dDQUNELEtBQUcsR0FBRztLQUNaLHdCQUFTO3FCQUFBLFNBQUEsRUFBRSxFQUFFLEVBQ0M7Y0FBYixDQUFFLEVBQUUsRUFBRTtNQUFBOztLQUNQLHdCQUFVLFFBQU0sRUFBRTsrQ0FDWixVQUFRLEdBQUcsQ0FBRSxFQUFFLEVBQUU7SUFBQTs7a0JBQ3hCOztFQUVELFFBQU0sSUFBSSxTQUFTO0VBRW5CLFFBQU0sSUFBSSxPQUFPO0VBck5qQixzQ0FBQTtrQkF1TkEsZUFBVyxJQUFJLG1CQUNRO0dBQXRCLFVBQ0M7R0FLRCxxQkFDTzttQkFBQSxVQUFBO3VEQUFELFNBQVMsU0FBUyxVQUFVO0lBQUE7O2tCQUVqQyxVQUFBO1dBQUE7R0FBQSIsImZpbGUiOiJGdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9