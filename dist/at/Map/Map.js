"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Boolean","../../compare","../../Generatorbang","../../methods","../../Type/Type","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../at","../at-Type","../q","./Hash-Mapbang","./Mapbang","../../bang","../../math/methods"],function(exports,Boolean_0,compare_1,Generator_33_2,methods_3,Type_4,Kind_5,Method_6,Pred_45Type_7,_64_8,_64_45Type_9,_63_10,Hash_45Map_33_11,Map_33_12,_33_13,methods_14){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(Generator_33_2),each_126=_ms.get(_$4,"each~"),_$5=_ms.getModule(methods_3),sub=_ms.get(_$5,"sub"),_$6=_ms.getModule(Type_4),type_45of=_ms.get(_$6,"type-of"),Kind=_ms.getDefaultExport(Kind_5),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),Method=_ms.getDefaultExport(Method_6),_$8=_ms.getModule(Method_6),impl_33=_ms.get(_$8,"impl!"),_$9=_ms.getModule(Pred_45Type_7),Any=_ms.get(_$9,"Any"),_64=_ms.getDefaultExport(_64_8),_$10=_ms.getModule(_64_8),all_63=_ms.get(_$10,"all?"),count=_ms.get(_$10,"count"),each_33=_ms.get(_$10,"each!"),empty_63=_ms.get(_$10,"empty?"),iterator=_ms.get(_$10,"iterator"),map=_ms.get(_$10,"map"),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),_$12=_ms.getModule(_63_10),un_45_63=_ms.get(_$12,"un-?"),Hash_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Hash_45Map_33_11)
		}),_$15=_ms.lazyGetModule(Map_33_12),assoc_33=_ms.lazyProp(_$15,"assoc!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_13)
		}),_$18=_ms.lazyGetModule(methods_14),_43=_ms.lazyProp(_$18,"+");
		const Map=Kind(function(){
			const doc="Mapping from keys to values.";
			return {
				doc:doc,
				displayName:"Map"
			}
		}());
		kind_33(Map,_64);
		impl_33(iterator,Map,function(_){
			return each_126(keys(_),function*(k){
				return (yield {
					key:k,
					val:_ms.sub(_,k)
				})
			})
		});
		const _63get=exports["?get"]=Method(function(){
			const doc="|:? _ key:Any\n`?` containing the value corresponding to `key`, if any.";
			return {
				doc:doc,
				displayName:"?get"
			}
		}());
		const has_45key_63=exports["has-key?"]=Method(function(){
			const doc="|:Boolean _ key:Any\nWhether the key is in the Map.";
			const _default=function(){
				return _ms.set(function(_,key){
					_ms.checkContains(Any,key,"key");
					return not(empty_63(_63get(_,key)))
				},"displayName","default")
			}();
			return {
				doc:doc,
				default:_default,
				displayName:"has-key?"
			}
		}());
		const keys=exports.keys=Method(function(){
			const doc="Every key that the Map `has-key?`.";
			return {
				doc:doc,
				displayName:"keys"
			}
		}());
		const values=exports.values=Method(function(){
			const doc="Every value in the Map.";
			const _default=function(){
				return _ms.set(function(_){
					return map(keys(_),function(key){
						return _ms.sub(_,key)
					})
				},"displayName","default")
			}();
			return {
				doc:doc,
				default:_default,
				displayName:"values"
			}
		}());
		const keys_45values=exports["keys-values"]=Method(function(){
			const doc=function(){
				return _ms.set(function(){
					return _ms.checkContains(_ms.sub(_64,Any),"Every { key, val }.","res")
				},"displayName","doc")
			}();
			const _default=function(){
				return _ms.set(function(_){
					return map(keys(_),function(k){
						const key=k;
						const val=_ms.sub(_,k);
						return {
							key:key,
							val:val
						}
					})
				},"displayName","default")
			}();
			return {
				doc:doc,
				default:_default,
				displayName:"keys-values"
			}
		}());
		impl_33(_61_63,Map,function(m1,m2){
			return and(_61_63(type_45of(m1),type_45of(m2)),_ms.lazy(function(){
				return map_61_63(m1,m2)
			}))
		});
		impl_33(count,Map,function(){
			const test=function(){
				return _ms.set(function(){
					const map=function(){
						const _k0=1,_v0=2;
						const _k1=3,_v1=4;
						return _ms.map(_k0,_v0,_k1,_v1)
					}();
					const _k0=[map],_v0=2;
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(_){
				return count(keys(_))
			},"test",test)
		}());
		impl_33(empty_63,Map,function(_){
			return empty_63(keys(_))
		});
		impl_33(sub,Map,function(map,key){
			_ms.checkContains(Any,key,"key");
			return un_45_63(_63get(map,key),_ms.lazy(function(){
				return ((((""+_ms.show(map))+" does not contain ")+_ms.show(key))+".")
			}))
		});
		const make_45map=exports["make-map"]=function(){
			const doc="Creates a Map whose values are the result of applying `get-value` to each key.";
			const test=function(){
				return _ms.set(function(){
					const map=make_45map([1,2],function(){
						return _ms.set(function(x){
							return _ms.unlazy(_43)(x,1)
						},"displayName","map")
					}());
					_ms.unlazy(_33)(_61_63,_ms.sub(map,1),2);
					return _ms.unlazy(_33)(_61_63,_ms.sub(map,2),3)
				},"displayName","test")
			}();
			return _ms.set(function(_64key,get_45value){
				_ms.checkContains(_64,_64key,"@key");
				_ms.checkContains(Function,get_45value,"get-value");
				const map=empty(_ms.unlazy(Hash_45Map_33));
				each_33(_64key,function(_){
					return _ms.unlazy(assoc_33)(map,_,get_45value(_))
				});
				return map
			},"doc",doc,"test",test,"displayName","make-map")
		}();
		const map_61_63=exports["map=?"]=function(){
			const doc="Whether the two maps have the same keys and the same associated values, regardless of the maps' types.";
			const test=function(){
				return _ms.set(function(){
					const m1=function(){
						const _k0=1,_v0=2;
						const _k1=3,_v1=4;
						return _ms.map(_k0,_v0,_k1,_v1)
					}();
					const m2=function(){
						const _k0=1,_v0=2;
						return _ms.map(_k0,_v0)
					}();
					const _k0=[m1,m1],_v0=true;
					const _k1=[m1,m2],_v1=false;
					return _ms.map(_k0,_v0,_k1,_v1)
				},"displayName","test")
			}();
			return _ms.set(function(a,b){
				_ms.checkContains(Map,a,"a");
				_ms.checkContains(Map,b,"b");
				return and(_61_63(count(a),count(b)),_ms.lazy(function(){
					return function(){
						return all_63(keys(a),function(key){
							const _63bk=_63get(b,key);
							return and(not(empty_63(_63bk)),_ms.lazy(function(){
								return _61_63(_ms.sub(a,key),_63bk.val)
							}))
						})
					}()
				}))
			},"doc",doc,"test",test,"displayName","map=?")
		}();
		const displayName=exports.displayName="Map";
		exports.default=Map;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9NYXAubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0VBbUJBLFVBQU0sZUFDSTtHQUFULFVBQU07Ozs7OztFQUVQLFFBQU0sSUFBSTtFQUNWLFFBQU0sU0FBUyxJQUFLLFNBQUEsRUFDQztVQUFwQixTQUFNLEtBQUEsR0FBUSxVQUFBLEVBQ0M7V0FBWCxPQUFBO1NBQUs7aUJBQU8sRUFBRTtJQUFBO0dBQUE7RUFBQTtFQUdsQiw2QkFBTSxpQkFDTTtHQUFYLFVBQ0M7Ozs7OztFQUdGLHVDQUFVLGlCQUNNO0dBQWYsVUFDQztHQUVELHlCQUFVO21CQUFBLFNBQUEsRUFBRSxJQUNPO3VCQURIO1lBQ2YsSUFBSyxTQUFRLE9BQUssRUFBRTtJQUFBOzs7Ozs7OztFQUV0Qix3QkFBTSxpQkFDTTtHQUFYLFVBQU07Ozs7OztFQUVQLDRCQUFRLGlCQUNNO0dBQWIsVUFBTTtHQUNOLHlCQUFVO21CQUFBLFNBQUEsRUFDQztZQUFWLElBQUksS0FBQSxHQUFPLFNBQUEsSUFDRztxQkFBYixFQUFFO0tBQUE7SUFBQTs7Ozs7Ozs7RUFFTCwyQ0FBYSxpQkFDTTtHQUFsQixvQkFBTTttQkFBQSxVQUNPO3NDQUROLElBQUUsS0FDUDs7O0dBQ0YseUJBQVU7bUJBQUEsU0FBQSxFQUNDO1lBQVYsSUFBSSxLQUFBLEdBQU8sU0FBQSxFQUNDO01BQVgsVUFBSztNQUNMLGtCQUFLLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0VBR1YsUUFBTSxPQUFHLElBQUssU0FBQSxHQUFHLEdBQ0U7VUFBbEIsSUFBSyxPQUFJLFVBQVEsSUFBSyxVQUFRO1dBQU8sVUFBTSxHQUFHO0dBQUE7RUFBQTtFQUUvQyxRQUFNLE1BQU0sY0FDRztHQUFkLHFCQUNPO21CQUFBLFVBQUE7S0FBTixvQkFDSztNQUFKLFVBQUEsTUFBSztNQUNMLFVBQUEsTUFBSzs7O0tBQ04sVUFBQSxDQUFFLFNBQVM7Ozs7a0JBQ1gsU0FBQSxFQUNDO1dBQUQsTUFBTSxLQUFBO0dBQUE7O0VBRVIsUUFBTSxTQUFPLElBQUssU0FBQSxFQUNDO1VBQWxCLFNBQU8sS0FBQTtFQUFBO0VBRVIsUUFBTSxJQUFJLElBQUssU0FBQSxJQUFJLElBQ087cUJBREg7VUFDdEIsU0FBTSxPQUFLLElBQUk7V0FBTyxJQTlEVSxZQThEVCxxQ0FBdUI7OztFQUcvQywrQ0FDUztHQUFSLFVBQU07R0FDTixxQkFDTzttQkFBQSxVQUFBO0tBQU4sVUFBTSxXQUFTLENBQUUsRUFBRSxhQUFLO3FCQUFBLFNBQUEsRUFDQzs4QkFBdEIsRUFBRTtNQUFBOztxQkFDSCxlQUFHLElBQUksR0FBRzs0QkFDVixlQUFHLElBQUksR0FBRztJQUFBOztrQkFDWixTQUFBLE9BQU8sWUFDa0I7c0JBRHBCO3NCQUFZO0lBQ2pCLFVBQU07SUFDTixRQUFNLE9BQU0sU0FBQSxFQUNDO2lDQUFMLElBQUksRUFBRSxZQUFBO0lBQUE7V0FDZDtHQUFBOztFQUVGLDJDQUNNO0dBQUwsVUFBTTtHQUNOLHFCQUNPO21CQUFBLFVBQUE7S0FBTixtQkFDSTtNQUFILFVBQUEsTUFBSztNQUNMLFVBQUEsTUFBSzs7O0tBQ04sbUJBQ0k7TUFBSCxVQUFBLE1BQUs7OztLQUNOLFVBQUEsQ0FBRSxHQUFHLFFBQVE7S0FDYixVQUFBLENBQUUsR0FBRyxRQUFROzs7O2tCQUNiLFNBQUEsRUFBTSxFQUNLO3NCQURUO3NCQUFNO1dBQ1IsSUFBSyxPQUFJLE1BQU0sR0FBSSxNQUFNO3NCQUNLO2FBQTdCLE9BQU0sS0FBSyxHQUFJLFNBQUEsSUFDRztPQUFqQixZQUFNLE9BQUssRUFBRTtjQUNiLElBQUssSUFBSyxTQUFPO2VBQVEsZUFBRyxFQUFFLEtBQUs7Ozs7Ozs7RUF4R3hDLHNDQUFBO2tCQTBHQSIsImZpbGUiOiJhdC9NYXAvTWFwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=