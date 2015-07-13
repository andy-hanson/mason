"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../methods","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../../Type/Type","../at","../at-Type","../q","./Id-Mapbang","./Mapbang","../../bang","../../math/methods"],function(exports,compare_0,methods_1,Kind_2,Method_3,Pred_45Type_4,Type_5,_64_6,_64_45Type_7,_63_8,Id_45Map_33_9,Map_33_10,_33_11,methods_12){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(methods_1),sub=_ms.get(_$3,"sub"),Kind=_ms.getDefaultExport(Kind_2),_$4=_ms.getModule(Kind_2),kind_33=_ms.get(_$4,"kind!"),Method=_ms.getDefaultExport(Method_3),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),_$6=_ms.getModule(Pred_45Type_4),Any=_ms.get(_$6,"Any"),_$7=_ms.getModule(Type_5),_61_62=_ms.get(_$7,"=>"),type_45of=_ms.get(_$7,"type-of"),_64=_ms.getDefaultExport(_64_6),_$8=_ms.getModule(_64_6),all_63=_ms.get(_$8,"all?"),count=_ms.get(_$8,"count"),empty_63=_ms.get(_$8,"empty?"),map_39=_ms.get(_$8,"map'"),_$9=_ms.getModule(_64_45Type_7),empty=_ms.get(_$9,"empty"),_$10=_ms.getModule(_63_8),un_45_63=_ms.get(_$10,"un-?"),Id_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Id_45Map_33_9)
		}),_$13=_ms.lazyGetModule(Map_33_10),assoc_33=_ms.lazyProp(_$13,"assoc!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_11)
		}),_$16=_ms.lazyGetModule(methods_12),_43=_ms.lazyProp(_$16,"+");
		const Map=Kind(function(){
			const built={};
			const doc=built.doc=`Mapping from keys to values.`;
			return _ms.setName(built,"Map")
		}());
		kind_33(Map,_64);
		const _63get=exports["?get"]=Method(function(){
			const built={};
			const doc=built.doc=`\`?\` containing the value corresponding to \`key\`, if any.`;
			const args=built.args=[`_`,`key`];
			return _ms.setName(built,"?get")
		}());
		const has_45key_63=exports["has-key?"]=Method(function(){
			const built={};
			const doc=built.doc=`|:Boolean _ key:Any\nWhether the key is in the Map.`;
			const args=built.args=[`_`,`key`];
			const _default=built.default=function _default(_,key){
				return ! empty_63(_63get(_,key))
			};
			return _ms.setName(built,"has-key?")
		}());
		const keys=exports.keys=Method(function(){
			const built={};
			const doc=built.doc=`Every key that the Map \`has-key?\`.`;
			const args=built.args=1;
			const _default=built.default=function _default(_){
				return _61_62(Array,map_39(_,function(pair){
					return _ms.sub(pair,0)
				}))
			};
			return _ms.setName(built,"keys")
		}());
		const values=exports.values=Method(function(){
			const built={};
			const doc=built.doc=`Every value in the Map.`;
			const args=built.args=1;
			const _default=built.default=function _default(_){
				return _61_62(Array,map_39(_,function(pair){
					return _ms.sub(pair,1)
				}))
			};
			return _ms.setName(built,"values")
		}());
		impl_33(_61_63,Map,function(m1,m2){
			return (_61_63(type_45of(m1),type_45of(m2))&&map_61_63(m1,m2))
		});
		impl_33(sub,Map,function(map,key){
			_ms.checkContains(Any,key,"key");
			return un_45_63(_63get(map,key),_ms.lazy(function(){
				return `${_ms.show(map)} does not contain ${_ms.show(key)}.`
			}))
		});
		const make_45map=exports["make-map"]=function(){
			const built={};
			const doc=built.doc=`Creates a Map whose values are the result of applying \`get-value\` to each key.`;
			const test=built.test=function test(){
				const map=make_45map([1,2],function(x){
					return _ms.unlazy(_43)(x,1)
				});
				_ms.unlazy(_33)(_61_63,_ms.sub(map,1),2);
				return _ms.unlazy(_33)(_61_63,_ms.sub(map,2),3)
			};
			return _ms.set(function make_45map(_64key,get_45value){
				_ms.checkContains(_64,_64key,"@key");
				_ms.checkContains(Function,get_45value,"get-value");
				const map=empty(_ms.unlazy(Id_45Map_33));
				for(let _ of _64key){
					_ms.unlazy(assoc_33)(map,_,get_45value(_))
				};
				return map
			},built)
		}();
		const map_61_63=exports["map=?"]=function(){
			const built={};
			const doc=built.doc=`Whether the two maps have the same keys and the same associated values, regardless of the maps' types.`;
			const test=built.test=function test(){
				const built=new global.Map();
				const m1=function(){
					const built=new global.Map();
					_ms.assoc(built,1,2);
					_ms.assoc(built,3,4);
					return built
				}();
				const m2=function(){
					const built=new global.Map();
					_ms.assoc(built,1,2);
					return built
				}();
				_ms.assoc(built,[m1,m1],true);
				_ms.assoc(built,[m1,m2],false);
				return built
			};
			return _ms.set(function map_61_63(a,b){
				_ms.checkContains(Map,a,"a");
				_ms.checkContains(Map,b,"b");
				return (_61_63(count(a),count(b))&&function(){
					return all_63(a,function(pair){
						const key=_ms.sub(pair,0);
						const val=_ms.sub(pair,1);
						const _63bk=_63get(b,key);
						return (! empty_63(_63bk)&&_61_63(val,_63bk.val))
					})
				}())
			},built)
		}();
		const name=exports.name=`Map`;
		exports.default=Map;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9NYXAubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0VBaUJBLFVBQUssZUFDSTs7R0FBUixvQkFBTTs7O0VBRVAsUUFBTSxJQUFJO0VBR1QsNkJBQU0saUJBQ007O0dBQVgsb0JBQU07R0FDTixzQkFBTSxDQUFHLElBQUk7OztFQUVkLHVDQUFVLGlCQUNNOztHQUFmLG9CQUNDO0dBRUQsc0JBQU0sQ0FBRyxJQUFJO0dBQ2IsNkJBQVUsa0JBQUEsRUFBRSxJQUNHO1dBQWQsRUFBSyxTQUFRLE9BQUssRUFBRTtHQUFBOzs7RUFFdEIsd0JBQU0saUJBQ007O0dBQVgsb0JBQU07R0FDTixzQkFBTTtHQUNOLDZCQUFVLGtCQUFBLEVBQ0M7V0FBVixPQUFHLE1BQU8sT0FBSyxFQUFHLFNBQUEsS0FDSTtvQkFBckIsS0FBSztJQUFBO0dBQUE7OztFQUVSLDRCQUFRLGlCQUNNOztHQUFiLG9CQUFNO0dBQ04sc0JBQU07R0FDTiw2QkFBVSxrQkFBQSxFQUNDO1dBQVYsT0FBRyxNQUFPLE9BQUssRUFBRyxTQUFBLEtBQ0k7b0JBQXJCLEtBQUs7SUFBQTtHQUFBOzs7RUFHUixRQUFNLE9BQUcsSUFBSyxTQUFBLEdBQUcsR0FDRTtVQUFsQixDQUFLLE9BQUksVUFBUSxJQUFLLFVBQVEsTUFBTSxVQUFNLEdBQUc7RUFBQTtFQUU5QyxRQUFNLElBQUksSUFBSyxTQUFBLElBQUksSUFDTztxQkFESDtVQUN0QixTQUFNLE9BQUssSUFBSTtXQUFPLFlBQUMsa0NBQXVCOzs7RUFHL0MsK0NBQ1M7O0dBQVIsb0JBQU07R0FDTixzQkFDTyxlQUFBO0lBQU4sVUFBTSxXQUFTLENBQUUsRUFBRSxHQUFLLFNBQUEsRUFDQzs0QkFBdEIsRUFBRTtJQUFBO29CQUNILGVBQUcsSUFBSSxHQUFHOzJCQUNWLGVBQUcsSUFBSSxHQUFHO0dBQUE7a0JBRVosb0JBQUEsT0FBTyxZQUNrQjtzQkFEcEI7c0JBQVk7SUFDakIsVUFBTTtJQUNELFFBQUEsS0FBQSxPQUNJOzBCQUFELElBQUksRUFBRSxZQUFTO0lBQUE7V0FDdkI7R0FBQTs7RUFFRiwyQ0FDTTs7R0FBTCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O0lBQU4sbUJBQ0k7O3FCQUFILEVBQUs7cUJBQ0wsRUFBSzs7O0lBQ04sbUJBQ0k7O3FCQUFILEVBQUs7OztvQkFDTixDQUFFLEdBQUcsSUFBUTtvQkFDYixDQUFFLEdBQUcsSUFBUTs7O2tCQUNiLG1CQUFBLEVBQU0sRUFDSztzQkFEVDtzQkFBTTtXQUNSLENBQUssT0FBSSxNQUFNLEdBQUksTUFBTSxlQUNHO1lBQTNCLE9BQUssRUFBRyxTQUFBLEtBQ0k7TUFDWCxrQkFBTSxLQUFLO01BQ1gsa0JBQU0sS0FBSztNQUNYLFlBQU0sT0FBSyxFQUFFO2FBQ2IsQ0FBSyxFQUFJLFNBQU8sUUFBTSxPQUFHLElBQUk7Ozs7O0VBeEZsQyx3QkFBQTtrQkFpQkEiLCJmaWxlIjoiYXQvTWFwL01hcC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9