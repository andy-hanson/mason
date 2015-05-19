"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Boolean","../../compare","../../methods","../../Type/Js-Method","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../../Type/Type","../at","../at-Type","../q","./Hash-Mapbang","./Mapbang","../../bang","../../math/methods"],function(exports,Boolean_0,compare_1,methods_2,Js_45Method_3,Kind_4,Method_5,Pred_45Type_6,Type_7,_64_8,_64_45Type_9,_63_10,Hash_45Map_33_11,Map_33_12,_33_13,methods_14){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(methods_2),sub=_ms.get(_$4,"sub"),_$5=_ms.getModule(Js_45Method_3),js_45impl_33=_ms.get(_$5,"js-impl!"),Kind=_ms.getDefaultExport(Kind_4),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),Method=_ms.getDefaultExport(Method_5),_$7=_ms.getModule(Method_5),impl_33=_ms.get(_$7,"impl!"),_$8=_ms.getModule(Pred_45Type_6),Any=_ms.get(_$8,"Any"),_$9=_ms.getModule(Type_7),type_45of=_ms.get(_$9,"type-of"),_64=_ms.getDefaultExport(_64_8),_$10=_ms.getModule(_64_8),all_63=_ms.get(_$10,"all?"),count=_ms.get(_$10,"count"),empty_63=_ms.get(_$10,"empty?"),iterator=_ms.get(_$10,"iterator"),map=_ms.get(_$10,"map"),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),_$12=_ms.getModule(_63_10),un_45_63=_ms.get(_$12,"un-?"),Hash_45Map_33=_ms.lazy(function(){
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
		js_45impl_33(iterator,Map,function*(){
			for(let _ of keys(this)[Symbol.iterator]()){
				(yield {
					key:_,
					val:_ms.sub(this,_)
				})
			}
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
				return _ms.checkContains(_ms.sub(_64,Any),"Every (key. val.).","res")
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
			const test=function test(){
				const map=function(){
					const _k0=1,_v0=2;
					const _k1=3,_v1=4;
					return _ms.map(_k0,_v0,_k1,_v1)
				}();
				const _k0=[map],_v0=2;
				return _ms.map(_k0,_v0)
			};
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
			const test=function test(){
				const map=make_45map([1,2],function(x){
					return _ms.unlazy(_43)(x,1)
				});
				_ms.unlazy(_33)(_61_63,_ms.sub(map,1),2);
				return _ms.unlazy(_33)(_61_63,_ms.sub(map,2),3)
			};
			return _ms.set(function make_45map(_64key,get_45value){
				_ms.checkContains(_64,_64key,"@key");
				_ms.checkContains(Function,get_45value,"get-value");
				const map=empty(_ms.unlazy(Hash_45Map_33));
				for(let _ of _64key[Symbol.iterator]()){
					_ms.unlazy(assoc_33)(map,_,get_45value(_))
				};
				return map
			},"doc",doc,"test",test)
		}();
		const map_61_63=exports["map=?"]=function(){
			const doc="Whether the two maps have the same keys and the same associated values, regardless of the maps' types.";
			const test=function test(){
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
			};
			return _ms.set(function map_61_63(a,b){
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
			},"doc",doc,"test",test)
		}();
		const name=exports.name="Map";
		exports.default=Map;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9NYXAubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0VBbUJBLFVBQU0sZUFDSTtHQUFULFVBQU07Ozs7OztFQUVQLFFBQU0sSUFBSTtFQUNWLGFBQVMsU0FBUyxJQUNNLFdBQUE7R0FBbEIsUUFBQSxLQUFBLEtBQUsseUJBQ0k7V0FBVjtTQUFLO2lCQUFPLEtBQUs7SUFBQTtHQUFBO0VBQUE7RUFHckIsNkJBQU0saUJBQ007R0FBWCxVQUFNO0dBQ04sV0FBTSxDQUFHLElBQUk7Ozs7Ozs7RUFFZCx1Q0FBVSxpQkFDTTtHQUFmLFVBQ0M7R0FFRCxXQUFNLENBQUcsSUFBSTtHQUNiLGVBQVUsa0JBQUEsRUFBRSxJQUNHO1dBQWQsSUFBSyxTQUFRLE9BQUssRUFBRTtHQUFBOzs7Ozs7OztFQUV0Qix3QkFBTSxpQkFDTTtHQUFYLFVBQU07R0FDTixXQUFNOzs7Ozs7O0VBRVAsNEJBQVEsaUJBQ007R0FBYixVQUFNO0dBQ04sV0FBTTtHQUNOLGVBQVUsa0JBQUEsRUFDQztXQUFWLElBQUksS0FBQSxHQUFPLFNBQUEsSUFDRztvQkFBYixFQUFFO0lBQUE7R0FBQTs7Ozs7Ozs7RUFFTCwyQ0FBYSxpQkFDTTtHQUFsQixVQUFNLGNBQ087cUNBRE4sSUFBRSxLQUNQOztHQUNGLFdBQU07R0FDTixlQUFVLGtCQUFBLEVBQ0M7V0FBVixJQUFJLEtBQUEsR0FBTyxTQUFBLEVBQ0M7S0FBWCxVQUFLO0tBQ0wsa0JBQUssRUFBRTs7Ozs7Ozs7Ozs7Ozs7RUFHVixRQUFNLE9BQUcsSUFBSyxTQUFBLEdBQUcsR0FDRTtVQUFsQixJQUFLLE9BQUksVUFBUSxJQUFLLFVBQVE7V0FBTyxVQUFNLEdBQUc7R0FBQTtFQUFBO0VBRS9DLFFBQU0sTUFBTSxjQUNHO0dBQWQsV0FDTyxlQUFBO0lBQU4sb0JBQ0s7S0FBSixVQUFBLE1BQUs7S0FDTCxVQUFBLE1BQUs7OztJQUNOLFVBQUEsQ0FBRSxTQUFTOzs7a0JBQ1gsU0FBQSxFQUNDO1dBQUQsTUFBTSxLQUFBO0dBQUE7O0VBRVIsUUFBTSxTQUFPLElBQUssU0FBQSxFQUNDO1VBQWxCLFNBQU8sS0FBQTtFQUFBO0VBRVIsUUFBTSxJQUFJLElBQUssU0FBQSxJQUFJLElBQ087cUJBREg7VUFDdEIsU0FBTSxPQUFLLElBQUk7V0FBTyxJQWxFVSxZQWtFVCxxQ0FBdUI7OztFQUcvQywrQ0FDUztHQUFSLFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixVQUFNLFdBQVMsQ0FBRSxFQUFFLEdBQUssU0FBQSxFQUNDOzRCQUF0QixFQUFFO0lBQUE7b0JBQ0gsZUFBRyxJQUFJLEdBQUc7MkJBQ1YsZUFBRyxJQUFJLEdBQUc7R0FBQTtrQkFDWixvQkFBQSxPQUFPLFlBQ2tCO3NCQURwQjtzQkFBWTtJQUNqQixVQUFNO0lBQ0QsUUFBQSxLQUFBLDBCQUNJOzBCQUFELElBQUksRUFBRSxZQUFBO0lBQUE7V0FDZDtHQUFBOztFQUVGLDJDQUNNO0dBQUwsVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLG1CQUNJO0tBQUgsVUFBQSxNQUFLO0tBQ0wsVUFBQSxNQUFLOzs7SUFDTixtQkFDSTtLQUFILFVBQUEsTUFBSzs7O0lBQ04sVUFBQSxDQUFFLEdBQUcsUUFBUTtJQUNiLFVBQUEsQ0FBRSxHQUFHLFFBQVE7OztrQkFDYixtQkFBQSxFQUFNLEVBQ0s7c0JBRFQ7c0JBQU07V0FDUixJQUFLLE9BQUksTUFBTSxHQUFJLE1BQU07c0JBQ0s7YUFBN0IsT0FBTSxLQUFLLEdBQUksU0FBQSxJQUNHO09BQWpCLFlBQU0sT0FBSyxFQUFFO2NBQ2IsSUFBSyxJQUFLLFNBQU87ZUFBUSxlQUFHLEVBQUUsS0FBSzs7Ozs7OztFQTNHeEMsd0JBQUE7a0JBNkdBIiwiZmlsZSI6ImF0L01hcC9NYXAuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==