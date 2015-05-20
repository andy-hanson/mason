"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Boolean","../../compare","../../methods","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../../Type/Type","../at","../at-Type","../q","./Hash-Mapbang","./Mapbang","../../bang","../../math/methods"],function(exports,Boolean_0,compare_1,methods_2,Kind_3,Method_4,Pred_45Type_5,Type_6,_64_7,_64_45Type_8,_63_9,Hash_45Map_33_10,Map_33_11,_33_12,methods_13){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(methods_2),sub=_ms.get(_$4,"sub"),Kind=_ms.getDefaultExport(Kind_3),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),Method=_ms.getDefaultExport(Method_4),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),_$7=_ms.getModule(Pred_45Type_5),Any=_ms.get(_$7,"Any"),_$8=_ms.getModule(Type_6),_61_62=_ms.get(_$8,"=>"),type_45of=_ms.get(_$8,"type-of"),_64=_ms.getDefaultExport(_64_7),_$9=_ms.getModule(_64_7),all_63=_ms.get(_$9,"all?"),count=_ms.get(_$9,"count"),empty_63=_ms.get(_$9,"empty?"),map_39=_ms.get(_$9,"map'"),_$10=_ms.getModule(_64_45Type_8),empty=_ms.get(_$10,"empty"),_$11=_ms.getModule(_63_9),un_45_63=_ms.get(_$11,"un-?"),Hash_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Hash_45Map_33_10)
		}),_$14=_ms.lazyGetModule(Map_33_11),assoc_33=_ms.lazyProp(_$14,"assoc!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_12)
		}),_$17=_ms.lazyGetModule(methods_13),_43=_ms.lazyProp(_$17,"+");
		const Map=Kind(function(){
			const doc="Mapping from keys to values.";
			return {
				doc:doc,
				name:"Map"
			}
		}());
		kind_33(Map,_64);
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
			const _default=function _default(_){
				return _61_62(Array,map_39(_,function(pair){
					return _ms.sub(pair,0)
				}))
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"keys"
			}
		}());
		const values=exports.values=Method(function(){
			const doc="Every value in the Map.";
			const args=1;
			const _default=function _default(_){
				return _61_62(Array,map_39(_,function(pair){
					return _ms.sub(pair,1)
				}))
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"values"
			}
		}());
		impl_33(_61_63,Map,function(m1,m2){
			return and(_61_63(type_45of(m1),type_45of(m2)),_ms.lazy(function(){
				return map_61_63(m1,m2)
			}))
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
						return all_63(a,function(pair){
							const key=_ms.sub(pair,0);
							const val=_ms.sub(pair,1);
							const _63bk=_63get(b,key);
							return and(not(empty_63(_63bk)),_ms.lazy(function(){
								return _61_63(val,_63bk.val)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9NYXAubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0VBa0JBLFVBQU0sZUFDSTtHQUFULFVBQU07Ozs7OztFQUVQLFFBQU0sSUFBSTtFQUdULDZCQUFNLGlCQUNNO0dBQVgsVUFBTTtHQUNOLFdBQU0sQ0FBRyxJQUFJOzs7Ozs7O0VBRWQsdUNBQVUsaUJBQ007R0FBZixVQUNDO0dBRUQsV0FBTSxDQUFHLElBQUk7R0FDYixlQUFVLGtCQUFBLEVBQUUsSUFDRztXQUFkLElBQUssU0FBUSxPQUFLLEVBQUU7R0FBQTs7Ozs7Ozs7RUFFdEIsd0JBQU0saUJBQ007R0FBWCxVQUFNO0dBQ04sV0FBTTtHQUNOLGVBQVUsa0JBQUEsRUFDQztXQUFWLE9BQUcsTUFBTyxPQUFLLEVBQUcsU0FBQSxLQUNJO29CQUFyQixLQUFLO0lBQUE7R0FBQTs7Ozs7Ozs7RUFFUiw0QkFBUSxpQkFDTTtHQUFiLFVBQU07R0FDTixXQUFNO0dBQ04sZUFBVSxrQkFBQSxFQUNDO1dBQVYsT0FBRyxNQUFPLE9BQUssRUFBRyxTQUFBLEtBQ0k7b0JBQXJCLEtBQUs7SUFBQTtHQUFBOzs7Ozs7OztFQUdSLFFBQU0sT0FBRyxJQUFLLFNBQUEsR0FBRyxHQUNFO1VBQWxCLElBQUssT0FBSSxVQUFRLElBQUssVUFBUTtXQUFPLFVBQU0sR0FBRztHQUFBO0VBQUE7RUFFL0MsUUFBTSxJQUFJLElBQUssU0FBQSxJQUFJLElBQ087cUJBREg7VUFDdEIsU0FBTSxPQUFLLElBQUk7V0FBTyxJQTVDVSxZQTRDVCxxQ0FBdUI7OztFQUcvQywrQ0FDUztHQUFSLFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixVQUFNLFdBQVMsQ0FBRSxFQUFFLEdBQUssU0FBQSxFQUNDOzRCQUF0QixFQUFFO0lBQUE7b0JBQ0gsZUFBRyxJQUFJLEdBQUc7MkJBQ1YsZUFBRyxJQUFJLEdBQUc7R0FBQTtrQkFDWixvQkFBQSxPQUFPLFlBQ2tCO3NCQURwQjtzQkFBWTtJQUNqQixVQUFNO0lBQ0QsUUFBQSxLQUFBLDBCQUNJOzBCQUFELElBQUksRUFBRSxZQUFBO0lBQUE7V0FDZDtHQUFBOztFQUVGLDJDQUNNO0dBQUwsVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLG1CQUNJO0tBQUgsVUFBQSxNQUFLO0tBQ0wsVUFBQSxNQUFLOzs7SUFDTixtQkFDSTtLQUFILFVBQUEsTUFBSzs7O0lBQ04sVUFBQSxDQUFFLEdBQUcsUUFBUTtJQUNiLFVBQUEsQ0FBRSxHQUFHLFFBQVE7OztrQkFDYixtQkFBQSxFQUFNLEVBQ0s7c0JBRFQ7c0JBQU07V0FDUixJQUFLLE9BQUksTUFBTSxHQUFJLE1BQU07c0JBQ0s7YUFBN0IsT0FBSyxFQUFHLFNBQUEsS0FDSTtPQUNYLGtCQUFNLEtBQUs7T0FDWCxrQkFBTSxLQUFLO09BQ1gsWUFBTSxPQUFLLEVBQUU7Y0FDYixJQUFLLElBQUssU0FBTztlQUFRLE9BQUcsSUFBSTs7Ozs7OztFQXhGckMsd0JBQUE7a0JBMEZBIiwiZmlsZSI6ImF0L01hcC9NYXAuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==