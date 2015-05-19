"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./methods","./private/js-impl","./Type/Alias-Type","./Type/Method","./at/at","./at/at-Type","./at/Map/Map","./at/Map/Hash-Mapbang","./at/Map/Mapbang","./at/Map/Weak-Id-Mapbang","./at/Seq/Seq","./Object","./Try","./bang","./at/Seq/Seq","./compare","./control","./math/methods"],function(exports,methods_0,js_45impl_1,Alias_45Type_2,Method_3,_64_4,_64_45Type_5,Map_6,Hash_45Map_33_7,Map_33_8,Weak_45Id_45Map_33_9,Seq_10,Object_11,Try_12,_33_13,Seq_14,compare_15,control_16,methods_17){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(methods_0),sub=_$2.sub,_$3=_ms.getModule(js_45impl_1),iCurry=_$3.iCurry,Alias_45Type=_ms.getDefaultExport(Alias_45Type_2),Method=_ms.getDefaultExport(Method_3),_$5=_ms.getModule(Method_3),impl_33=_$5["impl!"],self_45impl_33=_$5["self-impl!"],_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_4)
		}),_$7=_ms.lazyGetModule(_64_4),_43_43=_ms.lazyProp(_$7,"++"),map=_ms.lazyProp(_$7,"map"),map_39=_ms.lazyProp(_$7,"map'"),_$8=_ms.lazyGetModule(_64_45Type_5),empty=_ms.lazyProp(_$8,"empty"),Map=_ms.lazy(function(){
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
				name:"Action"
			}
		}());
		const Pred=exports.Pred=Alias_45Type(function(){
			const doc="Function[Any Boolean].";
			const alias_45of=Function;
			return {
				doc:doc,
				"alias-of":alias_45of,
				name:"Pred"
			}
		}());
		const apply=exports.apply=function(){
			const doc="Calls the function with the given arguments list.";
			return _ms.set(function apply(_,args){
				return Function.apply.call(_,null,[].concat(_ms.arr(args)))
			},"doc",doc)
		}();
		const call=exports.call=function(){
			const doc="Calls the function with the given arguments.";
			return _ms.set(function call(_){
				const args=[].slice.call(arguments,1);
				return Function.apply.call(_,null,[].concat(_ms.arr(args)))
			},"doc",doc)
		}();
		const fun_45copy=exports["fun-copy"]=function(){
			const doc="Creates a new function with identical functionality.\n*Does* copy any values captured by its scope.\nDoes *not* copy any properties on the old function.";
			return _ms.set(function fun_45copy(_){
				return Function.prototype.call.bind(_,null)
			},"doc",doc)
		}();
		const identity=exports.identity=function(){
			const doc="Outputs its input unmodified.";
			return _ms.set(function identity(_){
				return _
			},"doc",doc)
		}();
		const noop=exports.noop=function(){
			const doc="Does nothing.";
			return _ms.set(function noop(){},"doc",doc)
		}();
		const id_45memoize=exports["id-memoize"]=function(){
			const doc="When an Object is passed into `fun`, stores the result in a `Weak-Id-Map!`\nand uses that if the exact same (`id=?`) Object is used again.";
			return _ms.set(function id_45memoize(_){
				const wm=_ms.unlazy(empty)(_ms.unlazy(Weak_45Id_45Map_33));
				return function(arg){
					return _ms.unlazy(get_45or_45add_33)(wm,arg,_ms.lazy(function(){
						return _(arg)
					}))
				}
			},"doc",doc)
		}();
		const hash_45memoize=exports["hash-memoize"]=function(){
			const doc="Stores the argument every time you call it,\nand re-uses the result if called again with the same argument.\nThis will make those arguments unavailable for garbage collection...";
			return _ms.set(function hash_45memoize(_){
				const hm=_ms.unlazy(empty)(_ms.unlazy(Hash_45Map_33));
				return function(arg){
					return _ms.unlazy(get_45or_45add_33)(hm,arg,_ms.lazy(function(){
						return _(arg)
					}))
				}
			},"doc",doc)
		}();
		const spread=exports.spread=function(){
			const doc="Applies `fun`, starting with the given args, to each entry in an arguments list or map.";
			return _ms.set(function spread(fun){
				const args=[].slice.call(arguments,1);
				const init_45args=_ms.unlazy(rtail)(args);
				const last_45arg=_ms.unlazy(last)(args);
				const _64spreaded=function(){
					const _=last_45arg;
					if(_ms.contains(_ms.unlazy(Map),_)){
						return _ms.unlazy(map_39)(_,function(pair){
							const _$165=pair,key=_$165.key,val=_$165.val;
							return [key,val]
						})
					} else if(_ms.contains(_ms.unlazy(_64),_)){
						return _ms.unlazy(map)(_,function(em){
							return [em]
						})
					} else if(_ms.contains(Object,_)){
						return _ms.unlazy(map_39)(_ms.unlazy(Object_45_62Map)(_),function(pair){
							const _$172=pair,key=_$172.key,val=_$172.val;
							return [key,val]
						})
					} else {
						return _ms.unlazy(oh_45no_33)(("Can only spread a @ or Map, not "+_ms.show(_)))
					}
				}();
				return _ms.unlazy(map)(_64spreaded,function(spreaded){
					const all_45args=_ms.unlazy(_43_43)(init_45args,spreaded);
					return Function.apply.call(fun,null,[].concat(_ms.arr(all_45args)))
				})
			},"doc",doc)
		}();
		const spread_33=exports["spread!"]=function(){
			const doc="TODO";
			return _ms.set(function spread_33(fun){
				const args=[].slice.call(arguments,1);
				for(let _ of _ms.iterator(Function.apply.call(spread,null,[].concat(fun,_ms.arr(args))))){
					noop(_)
				}
			},"doc",doc)
		}();
		const thunk=exports.thunk=function(){
			const doc="Makes function which, when called, returns `a`.";
			return _ms.set(function thunk(_){
				return function(){
					return _
				}
			},"doc",doc)
		}();
		const curry=function(){
			const doc="Creates a function which calls `f` with the given arguments first.";
			return _ms.set(iCurry,"doc",doc,"name","curry")
		}();
		impl_33(sub,Function,curry);
		impl_33(sub,Method,curry);
		const name=exports.name="Function";
		exports.default=self_45impl_33(sub,Function,function(){
			const doc="Subbing Function does nothing and is only for documentation.\n* Function[Number String] takes a Number and returns a String.\n* Function[2] takes 2 arguments.\n* Function[2 String] takes 2 arguments and returns a String.\n* Function without a sub is assumed to be a one-argument function, so never write Function[1].";
			return _ms.set(function(){
				return Function
			},"doc",doc)
		}());
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9GdW5jdGlvbi5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7RUFzQkEsNEJBQVEsdUJBQ1U7R0FBakIsVUFDQztHQUdELGlCQUFVOzs7Ozs7O0VBRVgsd0JBQU0sdUJBQ1U7R0FBZixVQUFNO0dBQ04saUJBQVU7Ozs7Ozs7RUFFWCxvQ0FDTTtHQUFMLFVBQU07a0JBR0wsZUFBQSxFQUFXLEtBQ007K0JBQWpCLHlCQUFFO0dBQUE7O0VBRUosa0NBQ0s7R0FBSixVQUFNO2tCQUdMLGNBQUEsRUFDa0I7OytCQUFsQix5QkFBRTtHQUFBOztFQUVKLCtDQUNTO0dBQVIsVUFDQztrQkFlQSxvQkFBQSxFQUNVO1dBQ1YsNkJBQTZCLEVBQUU7R0FBQTs7RUFFakMsMENBQ1M7R0FBUixVQUFNO2tCQUdMLGtCQUFBLEVBQ0M7V0FBRDtHQUFBOztFQUVGLGtDQUNLO0dBQUosVUFBTTtrQkFFTCxlQUFBOztFQUlELG1EQUNXO0dBQVYsVUFDQztrQkFjQSxzQkFBQSxFQUNVO0lBQVY7V0FDQyxTQUFBLElBQ1U7MENBQUUsR0FBRzthQUFNLEVBQUU7S0FBQTtJQUFBO0dBQUE7O0VBRTFCLHVEQUNhO0dBQVosVUFDQztrQkFrQkEsd0JBQUEsRUFDVTtJQUFWO1dBQ0MsU0FBQSxJQUNVOzBDQUFFLEdBQUc7YUFBTSxFQUFFO0tBQUE7SUFBQTtHQUFBOztFQUUzQixzQ0FDTztHQUFOLFVBQU07a0JBMkJMLGdCQUFHLElBQ29COztJQUN2QixvQ0FBa0I7SUFDbEIsa0NBQWdCO0lBQ2hCO0tBQWlCLFFBQUE7S0FDaEIsZ0NBQUEsR0FDSTtnQ0FDRSxFQUFHLFNBQUEsS0FDSTtPQUFYLFlBQVU7Y0FDVixDQUFFLElBQUk7TUFBQTtLQUFBLE9BQ1IsZ0NBQUEsR0FDRTs2QkFBRyxFQUFHLFNBQUEsR0FDRTtjQUFSLENBQUU7TUFBQTtLQUFBLE9BQ0osZ0JBQUMsT0FBRCxHQUNPOzREQUFELEdBQWMsU0FBQSxLQUNJO09BQXRCLFlBQVU7Y0FDVixDQUFFLElBQUk7TUFBQTtLQUFBLE9BRUo7b0NBQUssNkNBQWlDO0tBQUE7SUFBQTsyQkFDdkMsWUFBVyxTQUFBLFNBQ1E7S0FBdEIsb0NBQWMsWUFBVTtnQ0FDeEIsMkJBQUk7SUFBQTtHQUFBOztFQUVQLDZDQUNRO0dBQVAsVUFBTTtrQkFTTCxtQkFBQSxJQUNXOztJQUFOLFFBQUEsc0NBQUEsc0JBQU8sWUFBSSxTQUNPO0tBQXRCLEtBQUs7SUFBQTtHQUFBOztFQUVSLG9DQUNNO0dBQUwsVUFBTTtrQkFHTCxlQUFBLEVBQ0M7V0FDQSxVQUFBO1lBQUE7SUFBQTtHQUFBOztFQUVILHNCQUNPO0dBQU4sVUFBTTtrQkFRTjs7RUFFRCxRQUFNLElBQUksU0FBUztFQUVuQixRQUFNLElBQUksT0FBTztFQXROakIsd0JBQUE7a0JBd05BLGVBQVcsSUFBSSxtQkFDUTtHQUF0QixVQUNDO2tCQVFBLFVBQUE7V0FBQTtHQUFBIiwiZmlsZSI6IkZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=