"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Boolean","../../compare","../../Generatorbang","../../methods","../../Type/Type","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../at","../at-Type","../q","./Hash-Mapbang","./Mapbang","../../bang","../../math/methods"],function(exports,Boolean_0,compare_1,Generator_33_2,methods_3,Type_4,Kind_5,Method_6,Pred_45Type_7,_64_8,_64_45Type_9,_63_10,Hash_45Map_33_11,Map_33_12,_33_13,methods_14){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_$2.and,not=_$2.not,_$3=_ms.getModule(compare_1),_61_63=_$3["=?"],_$4=_ms.getModule(Generator_33_2),each_126=_$4["each~"],_$5=_ms.getModule(methods_3),sub=_$5.sub,_$6=_ms.getModule(Type_4),type_45of=_$6["type-of"],Kind=_ms.getDefaultExport(Kind_5),_$7=_ms.getModule(Kind_5),kind_33=_$7["kind!"],Method=_ms.getDefaultExport(Method_6),_$8=_ms.getModule(Method_6),impl_33=_$8["impl!"],_$9=_ms.getModule(Pred_45Type_7),Any=_$9.Any,_64=_ms.getDefaultExport(_64_8),_$10=_ms.getModule(_64_8),all_63=_$10["all?"],count=_$10.count,empty_63=_$10["empty?"],iterator=_$10.iterator,map=_$10.map,_$11=_ms.getModule(_64_45Type_9),empty=_$11.empty,_$12=_ms.getModule(_63_10),un_45_63=_$12["un-?"],Hash_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Hash_45Map_33_11)
		}),_$15=_ms.lazyGetModule(Map_33_12),assoc_33=_ms.lazyProp(_$15,"assoc!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_13)
		}),_$18=_ms.lazyGetModule(methods_14),_43=_ms.lazyProp(_$18,"+");
		const Map=Kind(function(){
			const doc="Mapping from keys to values.";
			return {
				doc:doc,
				name:"Map"
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
			const doc="`?` containing the value corresponding to `key`, if any.";
			const args=["_","key"];
			return {
				doc:doc,
				args:args,
				name:"?get"
			}
		}());
		const has_45key_63=exports["has-key?"]=Method(function(){
			const doc="|:Boolean _ key:Any\nWhether the key is in the Map.";
			const args=["_","key"];
			const _default=function _default(_,key){
				return not(empty_63(_63get(_,key)))
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"has-key?"
			}
		}());
		const keys=exports.keys=Method(function(){
			const doc="Every key that the Map `has-key?`.";
			const args=1;
			return {
				doc:doc,
				args:args,
				name:"keys"
			}
		}());
		const values=exports.values=Method(function(){
			const doc="Every value in the Map.";
			const args=1;
			const _default=function _default(_){
				return map(keys(_),function(key){
					return _ms.sub(_,key)
				})
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"values"
			}
		}());
		const keys_45values=exports["keys-values"]=Method(function(){
			const doc=function doc(){
				return "Every (key. val.)."
			};
			const args=1;
			const _default=function _default(_){
				return map(keys(_),function(k){
					const key=k;
					const val=_ms.sub(_,k);
					return {
						key:key,
						val:val
					}
				})
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"keys-values"
			}
		}());
		impl_33(_61_63,Map,function(m1,m2){
			return and(_61_63(type_45of(m1),type_45of(m2)),_ms.lazy(function(){
				return map_61_63(m1,m2)
			}))
		});
		impl_33(count,Map,function(){
			return _ms.set(function(_){
				return count(keys(_))
			})
		}());
		impl_33(empty_63,Map,function(_){
			return empty_63(keys(_))
		});
		impl_33(sub,Map,function(map,key){
			return un_45_63(_63get(map,key),_ms.lazy(function(){
				return ((((""+_ms.show(map))+" does not contain ")+_ms.show(key))+".")
			}))
		});
		const make_45map=exports["make-map"]=function(){
			const doc="Creates a Map whose values are the result of applying `get-value` to each key.";
			return _ms.set(function make_45map(_64key,get_45value){
				const map=empty(_ms.unlazy(Hash_45Map_33));
				for(let _ of _ms.iterator(_64key)){
					_ms.unlazy(assoc_33)(map,_,get_45value(_))
				};
				return map
			},"doc",doc)
		}();
		const map_61_63=exports["map=?"]=function(){
			const doc="Whether the two maps have the same keys and the same associated values, regardless of the maps' types.";
			return _ms.set(function map_61_63(a,b){
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
			},"doc",doc)
		}();
		const name=exports.name="Map";
		exports.default=Map;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9NYXAubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0VBbUJBLFVBQU0sZUFDSTtHQUFULFVBQU07Ozs7OztFQUVQLFFBQU0sSUFBSTtFQUNWLFFBQU0sU0FBUyxJQUFLLFNBQUEsRUFDQztVQUFwQixTQUFNLEtBQUEsR0FBUSxVQUFBLEVBQ0M7V0FBWCxPQUFBO1NBQUs7aUJBQU8sRUFBRTtJQUFBO0dBQUE7RUFBQTtFQUdsQiw2QkFBTSxpQkFDTTtHQUFYLFVBQU07R0FDTixXQUFNLENBQUcsSUFBSTs7Ozs7OztFQUVkLHVDQUFVLGlCQUNNO0dBQWYsVUFDQztHQUVELFdBQU0sQ0FBRyxJQUFJO0dBQ2IsZUFBVSxrQkFBQSxFQUFFLElBQ0c7V0FBZCxJQUFLLFNBQVEsT0FBSyxFQUFFO0dBQUE7Ozs7Ozs7O0VBRXRCLHdCQUFNLGlCQUNNO0dBQVgsVUFBTTtHQUNOLFdBQU07Ozs7Ozs7RUFFUCw0QkFBUSxpQkFDTTtHQUFiLFVBQU07R0FDTixXQUFNO0dBQ04sZUFBVSxrQkFBQSxFQUNDO1dBQVYsSUFBSSxLQUFBLEdBQU8sU0FBQSxJQUNHO29CQUFiLEVBQUU7SUFBQTtHQUFBOzs7Ozs7OztFQUVMLDJDQUFhLGlCQUNNO0dBQWxCLFVBQU0sY0FDTztXQUFYO0dBQUE7R0FDRixXQUFNO0dBQ04sZUFBVSxrQkFBQSxFQUNDO1dBQVYsSUFBSSxLQUFBLEdBQU8sU0FBQSxFQUNDO0tBQVgsVUFBSztLQUNMLGtCQUFLLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0VBR1YsUUFBTSxPQUFHLElBQUssU0FBQSxHQUFHLEdBQ0U7VUFBbEIsSUFBSyxPQUFJLFVBQVEsSUFBSyxVQUFRO1dBQU8sVUFBTSxHQUFHO0dBQUE7RUFBQTtFQUUvQyxRQUFNLE1BQU0sY0FDRztrQkFLYixTQUFBLEVBQ0M7V0FBRCxNQUFNLEtBQUE7R0FBQTtFQUFBO0VBRVIsUUFBTSxTQUFPLElBQUssU0FBQSxFQUNDO1VBQWxCLFNBQU8sS0FBQTtFQUFBO0VBRVIsUUFBTSxJQUFJLElBQUssU0FBQSxJQUFJLElBQ087VUFBekIsU0FBTSxPQUFLLElBQUk7V0FBTyxJQWxFVSxZQWtFVCxxQ0FBdUI7OztFQUcvQywrQ0FDUztHQUFSLFVBQU07a0JBTUwsb0JBQUEsT0FBTyxZQUNrQjtJQUF6QixVQUFNO0lBQ0QsUUFBQSxrQkFBQSxRQUNJOzBCQUFELElBQUksRUFBRSxZQUFBO0lBQUE7V0FDZDtHQUFBOztFQUVGLDJDQUNNO0dBQUwsVUFBTTtrQkFTTCxtQkFBQSxFQUFNLEVBQ0s7V0FBWCxJQUFLLE9BQUksTUFBTSxHQUFJLE1BQU07c0JBQ0s7YUFBN0IsT0FBTSxLQUFLLEdBQUksU0FBQSxJQUNHO09BQWpCLFlBQU0sT0FBSyxFQUFFO2NBQ2IsSUFBSyxJQUFLLFNBQU87ZUFBUSxlQUFHLEVBQUUsS0FBSzs7Ozs7OztFQTNHeEMsd0JBQUE7a0JBNkdBIiwiZmlsZSI6ImF0L01hcC9NYXAuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==