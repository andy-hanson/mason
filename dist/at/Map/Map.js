"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Bool","../../compare","../../Fun","../../Generatorbang","../../methods","../../Type/Type","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../at","../at-Type","../q","./Hash-Mapbang","./Mapbang","../../bang","../../math/methods"],function(exports,Bool_0,compare_1,Fun_2,Generator_33_3,methods_4,Type_5,Kind_6,Method_7,Pred_45Type_8,_64_9,_64_45Type_10,_63_11,Hash_45Map_33_12,Map_33_13,_33_14,methods_15){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Bool_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),Fun=_ms.getDefaultExport(Fun_2),_$5=_ms.getModule(Generator_33_3),each_126=_ms.get(_$5,"each~"),_$6=_ms.getModule(methods_4),sub=_ms.get(_$6,"sub"),_$7=_ms.getModule(Type_5),type_45of=_ms.get(_$7,"type-of"),Kind=_ms.getDefaultExport(Kind_6),_$8=_ms.getModule(Kind_6),kind_33=_ms.get(_$8,"kind!"),Method=_ms.getDefaultExport(Method_7),_$9=_ms.getModule(Method_7),impl_33=_ms.get(_$9,"impl!"),_$10=_ms.getModule(Pred_45Type_8),Any=_ms.get(_$10,"Any"),_64=_ms.getDefaultExport(_64_9),_$11=_ms.getModule(_64_9),all_63=_ms.get(_$11,"all?"),count=_ms.get(_$11,"count"),each_33=_ms.get(_$11,"each!"),empty_63=_ms.get(_$11,"empty?"),iterator=_ms.get(_$11,"iterator"),map=_ms.get(_$11,"map"),_$12=_ms.getModule(_64_45Type_10),empty=_ms.get(_$12,"empty"),_$13=_ms.getModule(_63_11),un_45_63=_ms.get(_$13,"un-?"),Hash_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Hash_45Map_33_12)
		}),_$16=_ms.lazyGetModule(Map_33_13),assoc_33=_ms.lazyProp(_$16,"assoc!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_14)
		}),_$19=_ms.lazyGetModule(methods_15),_43=_ms.lazyProp(_$19,"+");
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
			const doc="|:Bool _ key:Any\nWhether the key is in the Map.";
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
				_ms.checkContains(Fun,get_45value,"get-value");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9NYXAubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0VBb0JBLFVBQU0sZUFDSTtHQUFULFVBQU07Ozs7OztFQUVQLFFBQU0sSUFBSTtFQUNWLFFBQU0sU0FBUyxJQUFLLFNBQUEsRUFDQztVQUFwQixTQUFNLEtBQUEsR0FBUSxVQUFBLEVBQ0M7V0FBWCxPQUFBO1NBQUs7aUJBQU8sRUFBRTtJQUFBO0dBQUE7RUFBQTtFQUdsQiw2QkFBTSxpQkFDTTtHQUFYLFVBQ0M7Ozs7OztFQUdGLHVDQUFVLGlCQUNNO0dBQWYsVUFDQztHQUVELHlCQUFVO21CQUFBLFNBQUEsRUFBRSxJQUNPO3VCQURIO1lBQ2YsSUFBSyxTQUFRLE9BQUssRUFBRTtJQUFBOzs7Ozs7OztFQUV0Qix3QkFBTSxpQkFDTTtHQUFYLFVBQU07Ozs7OztFQUVQLDRCQUFRLGlCQUNNO0dBQWIsVUFBTTtHQUNOLHlCQUFVO21CQUFBLFNBQUEsRUFDQztZQUFWLElBQUksS0FBQSxHQUFPLFNBQUEsSUFDRztxQkFBYixFQUFFO0tBQUE7SUFBQTs7Ozs7Ozs7RUFFTCwyQ0FBYSxpQkFDTTtHQUFsQixvQkFBTTttQkFBQSxVQUNPO3NDQUROLElBQUUsS0FDUDs7O0dBQ0YseUJBQVU7bUJBQUEsU0FBQSxFQUNDO1lBQVYsSUFBSSxLQUFBLEdBQU8sU0FBQSxFQUNDO01BQVgsVUFBSztNQUNMLGtCQUFLLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0VBR1YsUUFBTSxPQUFHLElBQUssU0FBQSxHQUFHLEdBQ0U7VUFBbEIsSUFBSyxPQUFJLFVBQVEsSUFBSyxVQUFRO1dBQU8sVUFBTSxHQUFHO0dBQUE7RUFBQTtFQUUvQyxRQUFNLE1BQU0sY0FDRztHQUFkLHFCQUNPO21CQUFBLFVBQUE7S0FBTixvQkFDSztNQUFKLFVBQUEsTUFBSztNQUNMLFVBQUEsTUFBSzs7O0tBQ04sVUFBQSxDQUFFLFNBQVM7Ozs7a0JBQ1gsU0FBQSxFQUNDO1dBQUQsTUFBTSxLQUFBO0dBQUE7O0VBRVIsUUFBTSxTQUFPLElBQUssU0FBQSxFQUNDO1VBQWxCLFNBQU8sS0FBQTtFQUFBO0VBRVIsUUFBTSxJQUFJLElBQUssU0FBQSxJQUFJLElBQ087cUJBREg7VUFDdEIsU0FBTSxPQUFLLElBQUk7V0FBTyxJQTdEVSxZQTZEVCxxQ0FBdUI7OztFQUcvQywrQ0FDUztHQUFSLFVBQU07R0FDTixxQkFDTzttQkFBQSxVQUFBO0tBQU4sVUFBTSxXQUFTLENBQUUsRUFBRSxhQUFLO3FCQUFBLFNBQUEsRUFDQzs4QkFBdEIsRUFBRTtNQUFBOztxQkFDSCxlQUFHLElBQUksR0FBRzs0QkFDVixlQUFHLElBQUksR0FBRztJQUFBOztrQkFDWixTQUFBLE9BQU8sWUFDYTtzQkFEZjtzQkFBWTtJQUNqQixVQUFNO0lBQ04sUUFBTSxPQUFNLFNBQUEsRUFDQztpQ0FBTCxJQUFJLEVBQUUsWUFBQTtJQUFBO1dBQ2Q7R0FBQTs7RUFFRiwyQ0FDTTtHQUFMLFVBQU07R0FDTixxQkFDTzttQkFBQSxVQUFBO0tBQU4sbUJBQ0k7TUFBSCxVQUFBLE1BQUs7TUFDTCxVQUFBLE1BQUs7OztLQUNOLG1CQUNJO01BQUgsVUFBQSxNQUFLOzs7S0FDTixVQUFBLENBQUUsR0FBRyxRQUFRO0tBQ2IsVUFBQSxDQUFFLEdBQUcsUUFBUTs7OztrQkFDYixTQUFBLEVBQU0sRUFDSztzQkFEVDtzQkFBTTtXQUNSLElBQUssT0FBSSxNQUFNLEdBQUksTUFBTTtzQkFDSzthQUE3QixPQUFNLEtBQUssR0FBSSxTQUFBLElBQ0c7T0FBakIsWUFBTSxPQUFLLEVBQUU7Y0FDYixJQUFLLElBQUssU0FBTztlQUFRLGVBQUcsRUFBRSxLQUFLOzs7Ozs7O0VBekd4QyxzQ0FBQTtrQkEyR0EiLCJmaWxlIjoiYXQvTWFwL01hcC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9