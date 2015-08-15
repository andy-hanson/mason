"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../methods","../../private/bootstrap","../../to-string","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../../Type/Type","../at","../at-Type","../q","./Id-Map","../../math/methods"],(exports,compare_0,methods_1,bootstrap_2,to_45string_3,Kind_4,Method_5,Pred_45Type_6,Type_7,_64_8,_64_45Type_9,_63_10,Id_45Map_11,methods_12)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(methods_1),sub=_ms.get(_$3,"sub"),_$4=_ms.getModule(bootstrap_2),msDef=_ms.get(_$4,"msDef"),to_45string=_ms.getDefaultExport(to_45string_3),Kind=_ms.getDefaultExport(Kind_4),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),Method=_ms.getDefaultExport(Method_5),_$7=_ms.getModule(Method_5),impl_33=_ms.get(_$7,"impl!"),_$8=_ms.getModule(Pred_45Type_6),Any=_ms.get(_$8,"Any"),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),type_45of=_ms.get(_$9,"type-of"),_64=_ms.getDefaultExport(_64_8),_$10=_ms.getModule(_64_8),all_63=_ms.get(_$10,"all?"),count=_ms.get(_$10,"count"),empty_63=_ms.get(_$10,"empty?"),map_39=_ms.get(_$10,"map'"),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),_$12=_ms.getModule(_63_10),_63_45or=_ms.get(_$12,"?-or"),un_45_63=_ms.get(_$12,"un-?"),Id_45Map=_ms.lazy(()=>{
			return _ms.getDefaultExport(Id_45Map_11)
		}),_$16=_ms.lazyGetModule(methods_12),_43=_ms.lazyProp(_$16,"+");
		const Map=new (Kind)((()=>{
			const built={};
			const doc=built.doc=`Mapping from keys to values.`;
			return _ms.setName(built,"Map")
		})());
		kind_33(Map,_64);
		impl_33(to_45string,Map,(()=>{
			const built={};
			const test=built.test=function test(){
				const built=new (global.Map)();
				const m=(()=>{
					const built=new (global.Map)();
					_ms.assoc(built,1,2);
					return built
				})();
				_ms.assoc(built,[m],`\n\t1 -> 2`);
				return built
			};
			return _ms.set(function(opts){
				const _this=this;
				const parts=map_39(_this,pair=>{
					return `${_ms.sub(pair,0)} -> ${_ms.sub(pair,1)(opts)}`
				});
				return `${type_45of(_this).name}\n\t${_61_62(String,parts,`\n\t`)}`
			},built)
		})());
		const _63get=exports["?get"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`\`?\` containing the value corresponding to \`key\`, if any.`;
			const args=built.args=[`_`,`key`];
			return _ms.setName(built,"?get")
		})());
		const has_45key_63=exports["has-key?"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`|:Boolean _ key:Any\nWhether the key is in the Map.`;
			const args=built.args=[`_`,`key`];
			const _default=built.default=function _default(key){
				const _this=this;
				return ! empty_63(_63get(_this,key))
			};
			return _ms.setName(built,"has-key?")
		})());
		const keys=exports.keys=new (Method)((()=>{
			const built={};
			const doc=built.doc=`Every key that the Map \`has-key?\`.`;
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return _61_62(Array,map_39(_this,pair=>{
					return _ms.sub(pair,0)
				}))
			};
			return _ms.setName(built,"keys")
		})());
		const values=exports.values=new (Method)((()=>{
			const built={};
			const doc=built.doc=`Every value in the Map.`;
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return _61_62(Array,map_39(_this,pair=>{
					return _ms.sub(pair,1)
				}))
			};
			return _ms.setName(built,"values")
		})());
		impl_33(_61_63,Map,function(other){
			const _this=this;
			return (_61_63(type_45of(_this),type_45of(other))&&map_61_63(_this,other))
		});
		impl_33(sub,Map,function(key){
			const _this=this;
			_ms.checkContains(Any,key,"key");
			return un_45_63(_63get(_this,key),_ms.lazy(()=>{
				return `${_this} does not contain ${key}.`
			}))
		});
		const make_45map=exports["make-map"]=(()=>{
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
		})();
		const map_61_63=exports["map=?"]=(()=>{
			const built={};
			const doc=built.doc=`Whether the two maps have the same keys and the same associated values, regardless of the maps' types.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				const m1=(()=>{
					const built=new (global.Map)();
					_ms.assoc(built,1,2);
					_ms.assoc(built,3,4);
					return built
				})();
				const m2=(()=>{
					const built=new (global.Map)();
					_ms.assoc(built,1,2);
					return built
				})();
				_ms.assoc(built,[m1,m1],true);
				_ms.assoc(built,[m1,m2],false);
				return built
			};
			return _ms.set(function map_61_63(a,b){
				_ms.checkContains(Map,a,"a");
				_ms.checkContains(Map,b,"b");
				return (_61_63(count(a),count(b))&&(()=>{
					return all_63(a,pair=>{
						const key=_ms.sub(pair,0);
						const val=_ms.sub(pair,1);
						const _63bk=_63get(b,key);
						return (! empty_63(_63bk)&&_61_63(val,_63bk.val))
					})
				})())
			},built)
		})();
		const assoc_33=exports["assoc!"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`Set _[key] to val.`;
			const args=built.args=[`_`,`key`,`val`];
			return _ms.setName(built,"assoc!")
		})());
		msDef(`assoc`,assoc_33);
		const assoc_42_33=exports["assoc*!"]=(()=>{
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
		})();
		const un_45assoc_33=exports["un-assoc!"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`If there is a value associated with \`key\`, removes it and returns the value associated.`;
			const args=built.args=[`_`,`key`];
			return _ms.setName(built,"un-assoc!")
		})());
		const un_45assoc_42_33=exports["un-assoc*!"]=(()=>{
			const built={};
			const doc=built.doc=`Removes keys (and by proxy, their associated values).`;
			return _ms.set(function un_45assoc_42_33(map,_64to_45delete){
				_ms.checkContains(Map,map,"map");
				_ms.checkContains(_64,_64to_45delete,"@to-delete");
				for(let _ of _64to_45delete){
					un_45assoc_33(map,_)
				}
			},built)
		})();
		const add_33=exports["add!"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`|_ key:Any val:Any\nassoc! key val, but fail if _[key] is set already.`;
			const args=built.args=[`_`,`key`,`val`];
			const _default=built.default=function _default(key,val){
				const _this=this;
				if(has_45key_63(_this,key))throw _ms.error(`Already have key ${key}.`);
				assoc_33(_this,key,val)
			};
			return _ms.setName(built,"add!")
		})());
		const get_45or_45add_33=exports["get-or-add!"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`map[key], and if it's not already there, fill it in with default-val.`;
			const args=built.args=[`_`,`key`,`~default-val`];
			const _default=built.default=function _default(key,default_45val){
				const _this=this;
				return _63_45or(_63get(_this,key),_ms.lazy(()=>{
					return (()=>{
						assoc_33(_this,key,_ms.unlazy(default_45val));
						return _ms.unlazy(default_45val)
					})()
				}))
			};
			return _ms.setName(built,"get-or-add!")
		})());
		const name=exports.name=`Map`;
		exports.default=Map;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvQC9NYXAvTWFwLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFpQkEsVUFBSyxLQUFJLE1BQ0ksS0FBQTs7R0FBWixvQkFBTTs7O0VBRVAsUUFBTSxJQUFJO0VBRVYsUUFBTSxZQUFVLElBQ0csS0FBQTs7R0FBbEIsc0JBQ08sZUFBQTs7SUFBTixRQUNHLEtBQUE7O3FCQUFGLEVBQUs7OztvQkFDTixDQUFFLEdBQVE7OztrQkFNVCxTQUFBLEtBQ0k7VUFvSEk7SUFsSFQsWUFBUSxPQWtIQyxNQWxIVSxNQUNJO1lBQXJCLFdBQUMsS0FBSyxpQkFBUSxLQUFLLEdBQUc7O1dBRXZCLEdBQUUsVUErR00sa0JBOUdOLE9BQUcsT0FBTyxNQUFPOzs7RUFHckIsNkJBQU0sS0FBSSxRQUNNLEtBQUE7O0dBQWYsb0JBQU07R0FDTixzQkFBTSxDQUFHLElBQUk7OztFQUVkLHVDQUFVLEtBQUksUUFDTSxLQUFBOztHQUFuQixvQkFDQztHQUVELHNCQUFNLENBQUcsSUFBSTtHQUNiLDZCQUFXLGtCQUFBLElBQ0c7VUFpR0w7V0FqR1IsRUFBSyxTQUFRLE9BaUdMLE1BakdlO0dBQUE7OztFQUV6Qix3QkFBTSxLQUFJLFFBQ00sS0FBQTs7R0FBZixvQkFBTTtHQUNOLHNCQUFNO0dBQ04sNkJBQ1csbUJBQUE7VUEyRkY7V0EzRlIsT0FBRyxNQUFPLE9BMkZGLE1BM0ZhLE1BQ0k7b0JBQXhCLEtBQUs7SUFBQTtHQUFBOzs7RUFFUiw0QkFBUSxLQUFJLFFBQ00sS0FBQTs7R0FBakIsb0JBQU07R0FDTixzQkFBTTtHQUNOLDZCQUNXLG1CQUFBO1VBb0ZGO1dBcEZSLE9BQUcsTUFBTyxPQW9GRixNQXBGYSxNQUNJO29CQUF4QixLQUFLO0lBQUE7R0FBQTs7O0VBR1IsUUFBTSxPQUFHLElBQU0sU0FBQSxNQUNLO1NBK0VWO1VBL0VULENBQUssT0FBSSxVQStFQSxPQS9FZSxVQUFRLFNBQVMsVUErRWhDLE1BL0UyQztFQUFBO0VBRXJELFFBQU0sSUFBSSxJQUFNLFNBQUEsSUFDTztTQTRFYjtxQkE3RVU7VUFDbkIsU0FBTSxPQTRFRyxNQTVFTztXQUFPLEdBNEVkLDBCQTVFdUM7OztFQUdqRCxxQ0FDUyxLQUFBOztHQUFSLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtJQUFQLFVBQU0sV0FBUyxDQUFFLEVBQUUsR0FBSyxHQUNDOzRCQUF0QixFQUFFO0lBQUE7ZUFDRyxlQUFHLElBQUksR0FBRztlQUNWLGVBQUcsSUFBSSxHQUFHO0dBQUE7a0JBRWxCLG9CQUFBLE9BQU8sWUFDa0I7c0JBRHBCO3NCQUFZO0lBQ2pCLFVBQU07SUFDRCxRQUFBLEtBQUEsT0FDSTtLQUFSLFNBQU8sSUFBSSxFQUFFLFlBQVM7SUFBQTtXQUN2QjtHQUFBOztFQUVGLGlDQUNNLEtBQUE7O0dBQUwsb0JBQU07R0FDTixzQkFDTyxlQUFBOztJQUFOLFNBQ0ksS0FBQTs7cUJBQUgsRUFBSztxQkFDTCxFQUFLOzs7SUFDTixTQUNJLEtBQUE7O3FCQUFILEVBQUs7OztvQkFDTixDQUFFLEdBQUcsSUFBUTtvQkFDYixDQUFFLEdBQUcsSUFBUTs7O2tCQUNiLG1CQUFBLEVBQU0sRUFDSztzQkFEVDtzQkFBTTtXQUNSLENBQUssT0FBSSxNQUFNLEdBQUksTUFBTSxLQUNHLEtBQUE7WUFBM0IsT0FBSyxFQUFHLE1BQ0k7TUFDWCxrQkFBTSxLQUFLO01BQ1gsa0JBQU0sS0FBSztNQUNYLFlBQU0sT0FBSyxFQUFFO2FBQ2IsQ0FBSyxFQUFJLFNBQU8sUUFBTSxPQUFHLElBQUk7Ozs7O0VBR2pDLGlDQUFRLEtBQUksUUFDTSxLQUFBOztHQUFqQixvQkFBTTtHQUNOLHNCQUFNLENBQUcsSUFBSSxNQUFNOzs7RUFDcEIsTUFBTyxRQUFPO0VBRWQscUNBQ1EsS0FBQTs7R0FBUCxvQkFBTTtHQUNOLHNCQUFPO2tCQUNMLHFCQUFBLElBQVEsU0FDVTtzQkFEZDtzQkFBVztJQUNYLFFBQUEsS0FBQSxTQUNNO0tBQ1YsU0FBTyxZQUFJLEVBQUUsV0FBRyxFQUFFO0lBQUE7R0FBQTs7RUFFckIseUNBQVcsS0FBSSxRQUNNLEtBQUE7O0dBQXBCLG9CQUNDO0dBQ0Qsc0JBQU0sQ0FBRyxJQUFJOzs7RUFFZCw2Q0FDVyxLQUFBOztHQUFWLG9CQUFNO2tCQUNKLDBCQUFBLElBQVEsZUFDWTtzQkFEaEI7c0JBQWU7SUFDZixRQUFBLEtBQUEsZUFDVTtLQUFkLGNBQVUsSUFBSTtJQUFBO0dBQUE7O0VBRWpCLDZCQUFNLEtBQUksUUFDTSxLQUFBOztHQUFmLG9CQUNDO0dBRUQsc0JBQU0sQ0FBRyxJQUFJLE1BQU07R0FDbkIsNkJBQVksa0JBQUEsSUFBSSxJQUdmO1VBT1E7SUFSQyxHQUFBLGFBUUQsTUFSZSxxQkFBWSxvQkFBa0I7SUFDckQsU0FPUSxNQVBJLElBQUk7R0FBQTs7O0VBRWxCLCtDQUFhLEtBQUksUUFDTSxLQUFBOztHQUF0QixvQkFBTTtHQUNOLHNCQUFNLENBQUcsSUFBSSxNQUFNO0dBQ25CLDZCQUFXLGtCQUFBLElBQUksY0FDWTtVQUNsQjtXQURSLFNBQU0sT0FDRSxNQURRO1lBQ00sS0FBQTtNQUFyQixTQUFPLE1BQUs7Ozs7Ozs7RUFySmhCLHdCQUFBO2tCQWlCQSIsImZpbGUiOiJhdC9NYXAvTWFwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=