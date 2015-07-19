"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../methods","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../../Type/Type","../at","../at-Type","../q","./Id-Map","../../math/methods"],(exports,compare_0,methods_1,Kind_2,Method_3,Pred_45Type_4,Type_5,_64_6,_64_45Type_7,_63_8,Id_45Map_9,methods_10)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(methods_1),sub=_ms.get(_$3,"sub"),Kind=_ms.getDefaultExport(Kind_2),_$4=_ms.getModule(Kind_2),kind_33=_ms.get(_$4,"kind!"),Method=_ms.getDefaultExport(Method_3),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),_$6=_ms.getModule(Pred_45Type_4),Any=_ms.get(_$6,"Any"),_$7=_ms.getModule(Type_5),_61_62=_ms.get(_$7,"=>"),type_45of=_ms.get(_$7,"type-of"),_64=_ms.getDefaultExport(_64_6),_$8=_ms.getModule(_64_6),all_63=_ms.get(_$8,"all?"),count=_ms.get(_$8,"count"),empty_63=_ms.get(_$8,"empty?"),map_39=_ms.get(_$8,"map'"),_$9=_ms.getModule(_64_45Type_7),empty=_ms.get(_$9,"empty"),_$10=_ms.getModule(_63_8),_63_45or=_ms.get(_$10,"?-or"),un_45_63=_ms.get(_$10,"un-?"),Id_45Map=_ms.lazy(()=>{
			return _ms.getDefaultExport(Id_45Map_9)
		}),_$14=_ms.lazyGetModule(methods_10),_43=_ms.lazyProp(_$14,"+");
		const Map=Kind(()=>{
			const built={};
			const doc=built.doc=`Mapping from keys to values.`;
			return _ms.setName(built,"Map")
		}());
		kind_33(Map,_64);
		const _63get=exports["?get"]=Method(()=>{
			const built={};
			const doc=built.doc=`\`?\` containing the value corresponding to \`key\`, if any.`;
			const args=built.args=[`_`,`key`];
			return _ms.setName(built,"?get")
		}());
		const has_45key_63=exports["has-key?"]=Method(()=>{
			const built={};
			const doc=built.doc=`|:Boolean _ key:Any\nWhether the key is in the Map.`;
			const args=built.args=[`_`,`key`];
			const _default=built.default=function _default(_,key){
				return ! empty_63(_63get(_,key))
			};
			return _ms.setName(built,"has-key?")
		}());
		const keys=exports.keys=Method(()=>{
			const built={};
			const doc=built.doc=`Every key that the Map \`has-key?\`.`;
			const args=built.args=1;
			const _default=built.default=function _default(_){
				return _61_62(Array,map_39(_,pair=>{
					return _ms.sub(pair,0)
				}))
			};
			return _ms.setName(built,"keys")
		}());
		const values=exports.values=Method(()=>{
			const built={};
			const doc=built.doc=`Every value in the Map.`;
			const args=built.args=1;
			const _default=built.default=function _default(_){
				return _61_62(Array,map_39(_,pair=>{
					return _ms.sub(pair,1)
				}))
			};
			return _ms.setName(built,"values")
		}());
		impl_33(_61_63,Map,(m1,m2)=>{
			return (_61_63(type_45of(m1),type_45of(m2))&&map_61_63(m1,m2))
		});
		impl_33(sub,Map,(map,key)=>{
			_ms.checkContains(Any,key,"key");
			return un_45_63(_63get(map,key),_ms.lazy(()=>{
				return `${_ms.show(map)} does not contain ${_ms.show(key)}.`
			}))
		});
		const make_45map=exports["make-map"]=()=>{
			const built={};
			const doc=built.doc=`Creates a Map whose values are the result of applying \`get-value\` to each key.`;
			const test=built.test=function test(){
				const map=make_45map([1,2],x=>{
					return _ms.unlazy(_43)(x,1)
				});
				_ms.assert(_61_63,_ms.sub(map,1),2);
				_ms.assert(_61_63,_ms.sub(map,2),3)
			};
			return _ms.set(function make_45map(_64key,get_45value){
				_ms.checkContains(_64,_64key,"@key");
				_ms.checkContains(Function,get_45value,"get-value");
				const map=empty(_ms.unlazy(Id_45Map));
				for(let _ of _64key){
					assoc_33(map,_,get_45value(_))
				};
				return map
			},built)
		}();
		const map_61_63=exports["map=?"]=()=>{
			const built={};
			const doc=built.doc=`Whether the two maps have the same keys and the same associated values, regardless of the maps' types.`;
			const test=built.test=function test(){
				const built=new global.Map();
				const m1=()=>{
					const built=new global.Map();
					_ms.assoc(built,1,2);
					_ms.assoc(built,3,4);
					return built
				}();
				const m2=()=>{
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
				return (_61_63(count(a),count(b))&&()=>{
					return all_63(a,pair=>{
						const key=_ms.sub(pair,0);
						const val=_ms.sub(pair,1);
						const _63bk=_63get(b,key);
						return (! empty_63(_63bk)&&_61_63(val,_63bk.val))
					})
				}())
			},built)
		}();
		const assoc_33=exports["assoc!"]=Method(()=>{
			const built={};
			const doc=built.doc=`Set _[key] to val.`;
			const args=built.args=[`_`,`key`,`val`];
			return _ms.setName(built,"assoc!")
		}());
		const assoc_42_33=exports["assoc*!"]=()=>{
			const built={};
			const doc=built.doc=`Adds the other map's keys to mine, overriding my values.`;
			const test=built.test=`See Map.implementor-test.`;
			return _ms.set(function assoc_42_33(map,to_45add){
				_ms.checkContains(Map,map,"map");
				_ms.checkContains(Map,to_45add,"to-add");
				for(let _ of to_45add){
					assoc_33(map,_ms.sub(_,0),_ms.sub(_,1))
				}
			},built)
		}();
		const un_45assoc_33=exports["un-assoc!"]=Method(()=>{
			const built={};
			const doc=built.doc=`If there is a value associated with \`key\`, removes it and returns the value associated.`;
			const args=built.args=[`_`,`key`];
			return _ms.setName(built,"un-assoc!")
		}());
		const un_45assoc_42_33=exports["un-assoc*!"]=()=>{
			const built={};
			const doc=built.doc=`Removes keys (and by proxy, their associated values).`;
			return _ms.set(function un_45assoc_42_33(map,_64to_45delete){
				_ms.checkContains(Map,map,"map");
				_ms.checkContains(_64,_64to_45delete,"@to-delete");
				for(let _ of _64to_45delete){
					un_45assoc_33(map,_)
				}
			},built)
		}();
		const add_33=exports["add!"]=Method(()=>{
			const built={};
			const doc=built.doc=`|_ key:Any val:Any\nassoc! key val, but fail if _[key] is set already.`;
			const args=built.args=[`_`,`key`,`val`];
			const _default=built.default=function _default(_,key,val){
				if(_ms.bool(has_45key_63(_,key)))throw _ms.error(`Already have key ${_ms.show(key)}.`);
				assoc_33(_,key,val)
			};
			return _ms.setName(built,"add!")
		}());
		const get_45or_45add_33=exports["get-or-add!"]=Method(()=>{
			const built={};
			const doc=built.doc=`map[key], and if it's not already there, fill it in with default-val.`;
			const args=built.args=[`_`,`key`,`~default-val`];
			const _default=built.default=function _default(map,key,default_45val){
				return _63_45or(_63get(map,key),_ms.lazy(()=>{
					return ()=>{
						assoc_33(map,key,_ms.unlazy(default_45val));
						return _ms.unlazy(default_45val)
					}()
				}))
			};
			return _ms.setName(built,"get-or-add!")
		}());
		const name=exports.name=`Map`;
		exports.default=Map;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9NYXAubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQWVBLFVBQUssU0FDSTs7R0FBUixvQkFBTTs7O0VBRVAsUUFBTSxJQUFJO0VBR1QsNkJBQU0sV0FDTTs7R0FBWCxvQkFBTTtHQUNOLHNCQUFNLENBQUcsSUFBSTs7O0VBRWQsdUNBQVUsV0FDTTs7R0FBZixvQkFDQztHQUVELHNCQUFNLENBQUcsSUFBSTtHQUNiLDZCQUFVLGtCQUFBLEVBQUUsSUFDRztXQUFkLEVBQUssU0FBUSxPQUFLLEVBQUU7R0FBQTs7O0VBRXRCLHdCQUFNLFdBQ007O0dBQVgsb0JBQU07R0FDTixzQkFBTTtHQUNOLDZCQUFVLGtCQUFBLEVBQ0M7V0FBVixPQUFHLE1BQU8sT0FBSyxFQUFHLE1BQ0k7b0JBQXJCLEtBQUs7SUFBQTtHQUFBOzs7RUFFUiw0QkFBUSxXQUNNOztHQUFiLG9CQUFNO0dBQ04sc0JBQU07R0FDTiw2QkFBVSxrQkFBQSxFQUNDO1dBQVYsT0FBRyxNQUFPLE9BQUssRUFBRyxNQUNJO29CQUFyQixLQUFLO0lBQUE7R0FBQTs7O0VBR1IsUUFBTSxPQUFHLElBQUssQ0FBQSxHQUFHLEtBQ0U7VUFBbEIsQ0FBSyxPQUFJLFVBQVEsSUFBSyxVQUFRLE1BQU0sVUFBTSxHQUFHO0VBQUE7RUFFOUMsUUFBTSxJQUFJLElBQUssQ0FBQSxJQUFJLE1BQ087cUJBREg7VUFDdEIsU0FBTSxPQUFLLElBQUk7V0FBTyxZQUFDLGtDQUF1Qjs7O0VBRy9DLHlDQUNTOztHQUFSLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtJQUFQLFVBQU0sV0FBUyxDQUFFLEVBQUUsR0FBSyxHQUNDOzRCQUF0QixFQUFFO0lBQUE7ZUFDRyxlQUFHLElBQUksR0FBRztlQUNWLGVBQUcsSUFBSSxHQUFHO0dBQUE7a0JBRWxCLG9CQUFBLE9BQU8sWUFDa0I7c0JBRHBCO3NCQUFZO0lBQ2pCLFVBQU07SUFDRCxRQUFBLEtBQUEsT0FDSTtLQUFSLFNBQU8sSUFBSSxFQUFFLFlBQVM7SUFBQTtXQUN2QjtHQUFBOztFQUVGLHFDQUNNOztHQUFMLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7SUFBTixhQUNJOztxQkFBSCxFQUFLO3FCQUNMLEVBQUs7OztJQUNOLGFBQ0k7O3FCQUFILEVBQUs7OztvQkFDTixDQUFFLEdBQUcsSUFBUTtvQkFDYixDQUFFLEdBQUcsSUFBUTs7O2tCQUNiLG1CQUFBLEVBQU0sRUFDSztzQkFEVDtzQkFBTTtXQUNSLENBQUssT0FBSSxNQUFNLEdBQUksTUFBTSxTQUNHO1lBQTNCLE9BQUssRUFBRyxNQUNJO01BQ1gsa0JBQU0sS0FBSztNQUNYLGtCQUFNLEtBQUs7TUFDWCxZQUFNLE9BQUssRUFBRTthQUNiLENBQUssRUFBSSxTQUFPLFFBQU0sT0FBRyxJQUFJOzs7OztFQUdqQyxpQ0FBUSxXQUNNOztHQUFiLG9CQUFNO0dBQ04sc0JBQU0sQ0FBRyxJQUFJLE1BQU07OztFQUVwQix5Q0FDUTs7R0FBUCxvQkFBTTtHQUNOLHNCQUFPO2tCQUNMLHFCQUFBLElBQVEsU0FDVTtzQkFEZDtzQkFBVztJQUNYLFFBQUEsS0FBQSxTQUNNO0tBQ1YsU0FBTyxZQUFJLEVBQUUsV0FBRyxFQUFFO0lBQUE7R0FBQTs7RUFFckIseUNBQVcsV0FDTTs7R0FBaEIsb0JBQ0M7R0FDRCxzQkFBTSxDQUFHLElBQUk7OztFQUVkLGlEQUNXOztHQUFWLG9CQUFNO2tCQUNKLDBCQUFBLElBQVEsZUFDWTtzQkFEaEI7c0JBQWU7SUFDZixRQUFBLEtBQUEsZUFDVTtLQUFkLGNBQVUsSUFBSTtJQUFBO0dBQUE7O0VBRWpCLDZCQUFNLFdBQ007O0dBQVgsb0JBQ0M7R0FFRCxzQkFBTSxDQUFHLElBQUksTUFBTTtHQUNuQiw2QkFBVyxrQkFBQSxFQUFFLElBQUksSUFHaEI7SUFEUyxZQUFBLGFBQVMsRUFBRSxzQkFBWSw2QkFBa0I7SUFDbEQsU0FBTyxFQUFFLElBQUk7R0FBQTs7O0VBRWYsK0NBQWEsV0FDTTs7R0FBbEIsb0JBQU07R0FDTixzQkFBTSxDQUFHLElBQUksTUFBTTtHQUNuQiw2QkFBVSxrQkFBQSxJQUFJLElBQUksY0FDWTtXQUE3QixTQUFNLE9BQUssSUFBSTtnQkFDTTtNQUFwQixTQUFPLElBQUksZUFGSzt3QkFBQTtLQUFBO0lBQUE7R0FBQTs7O0VBN0hwQix3QkFBQTtrQkFlQSIsImZpbGUiOiJhdC9NYXAvTWFwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=