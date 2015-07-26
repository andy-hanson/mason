"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../methods","../../private/bootstrap","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../../Type/Type","../at","../at-Type","../q","./Id-Map","../../math/methods"],(exports,compare_0,methods_1,bootstrap_2,Kind_3,Method_4,Pred_45Type_5,Type_6,_64_7,_64_45Type_8,_63_9,Id_45Map_10,methods_11)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(methods_1),sub=_ms.get(_$3,"sub"),_$4=_ms.getModule(bootstrap_2),msDef=_ms.get(_$4,"msDef"),Kind=_ms.getDefaultExport(Kind_3),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),Method=_ms.getDefaultExport(Method_4),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),_$7=_ms.getModule(Pred_45Type_5),Any=_ms.get(_$7,"Any"),_$8=_ms.getModule(Type_6),_61_62=_ms.get(_$8,"=>"),type_45of=_ms.get(_$8,"type-of"),_64=_ms.getDefaultExport(_64_7),_$9=_ms.getModule(_64_7),all_63=_ms.get(_$9,"all?"),count=_ms.get(_$9,"count"),empty_63=_ms.get(_$9,"empty?"),map_39=_ms.get(_$9,"map'"),_$10=_ms.getModule(_64_45Type_8),empty=_ms.get(_$10,"empty"),_$11=_ms.getModule(_63_9),_63_45or=_ms.get(_$11,"?-or"),un_45_63=_ms.get(_$11,"un-?"),Id_45Map=_ms.lazy(()=>{
			return _ms.getDefaultExport(Id_45Map_10)
		}),_$15=_ms.lazyGetModule(methods_11),_43=_ms.lazyProp(_$15,"+");
		const Map=new (Kind)(()=>{
			const built={};
			const doc=built.doc=`Mapping from keys to values.`;
			return _ms.setName(built,"Map")
		}());
		kind_33(Map,_64);
		const _63get=exports["?get"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=`\`?\` containing the value corresponding to \`key\`, if any.`;
			const args=built.args=[`_`,`key`];
			return _ms.setName(built,"?get")
		}());
		const has_45key_63=exports["has-key?"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=`|:Boolean _ key:Any\nWhether the key is in the Map.`;
			const args=built.args=[`_`,`key`];
			const _default=built.default=function _default(key){
				const _this=this;
				return ! empty_63(_63get(_this,key))
			};
			return _ms.setName(built,"has-key?")
		}());
		const keys=exports.keys=new (Method)(()=>{
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
		}());
		const values=exports.values=new (Method)(()=>{
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
		}());
		impl_33(_61_63,Map,function(other){
			const _this=this;
			return (_61_63(type_45of(_this),type_45of(other))&&map_61_63(_this,other))
		});
		impl_33(sub,Map,function(key){
			const _this=this;
			_ms.checkContains(Any,key,"key");
			return un_45_63(_63get(_this,key),_ms.lazy(()=>{
				return `${_ms.show(_this)} does not contain ${_ms.show(key)}.`
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
				const built=new (global.Map)();
				const m1=()=>{
					const built=new (global.Map)();
					_ms.assoc(built,1,2);
					_ms.assoc(built,3,4);
					return built
				}();
				const m2=()=>{
					const built=new (global.Map)();
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
		const assoc_33=exports["assoc!"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=`Set _[key] to val.`;
			const args=built.args=[`_`,`key`,`val`];
			return _ms.setName(built,"assoc!")
		}());
		msDef(`assoc`,assoc_33);
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
		const un_45assoc_33=exports["un-assoc!"]=new (Method)(()=>{
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
		const add_33=exports["add!"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=`|_ key:Any val:Any\nassoc! key val, but fail if _[key] is set already.`;
			const args=built.args=[`_`,`key`,`val`];
			const _default=built.default=function _default(key,val){
				const _this=this;
				if(_ms.bool(has_45key_63(_this,key)))throw _ms.error(`Already have key ${_ms.show(key)}.`);
				assoc_33(_this,key,val)
			};
			return _ms.setName(built,"add!")
		}());
		const get_45or_45add_33=exports["get-or-add!"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=`map[key], and if it's not already there, fill it in with default-val.`;
			const args=built.args=[`_`,`key`,`~default-val`];
			const _default=built.default=function _default(key,default_45val){
				const _this=this;
				return _63_45or(_63get(_this,key),_ms.lazy(()=>{
					return ()=>{
						assoc_33(_this,key,_ms.unlazy(default_45val));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9NYXAubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQWdCQSxVQUFLLEtBQUksVUFDSTs7R0FBWixvQkFBTTs7O0VBRVAsUUFBTSxJQUFJO0VBR1QsNkJBQU0sS0FBSSxZQUNNOztHQUFmLG9CQUFNO0dBQ04sc0JBQU0sQ0FBRyxJQUFJOzs7RUFFZCx1Q0FBVSxLQUFJLFlBQ007O0dBQW5CLG9CQUNDO0dBRUQsc0JBQU0sQ0FBRyxJQUFJO0dBQ2IsNkJBQVcsa0JBQUEsSUFDRztVQWlHTDtXQWpHUixFQUFLLFNBQVEsT0FpR0wsTUFqR2U7R0FBQTs7O0VBRXpCLHdCQUFNLEtBQUksWUFDTTs7R0FBZixvQkFBTTtHQUNOLHNCQUFNO0dBQ04sNkJBQ1csbUJBQUE7VUEyRkY7V0EzRlIsT0FBRyxNQUFPLE9BMkZGLE1BM0ZhLE1BQ0k7b0JBQXhCLEtBQUs7SUFBQTtHQUFBOzs7RUFFUiw0QkFBUSxLQUFJLFlBQ007O0dBQWpCLG9CQUFNO0dBQ04sc0JBQU07R0FDTiw2QkFDVyxtQkFBQTtVQW9GRjtXQXBGUixPQUFHLE1BQU8sT0FvRkYsTUFwRmEsTUFDSTtvQkFBeEIsS0FBSztJQUFBO0dBQUE7OztFQUdSLFFBQU0sT0FBRyxJQUFNLFNBQUEsTUFDSztTQStFVjtVQS9FVCxDQUFLLE9BQUksVUErRUEsT0EvRWUsVUFBUSxTQUFTLFVBK0VoQyxNQS9FMkM7RUFBQTtFQUVyRCxRQUFNLElBQUksSUFBTSxTQUFBLElBQ087U0E0RWI7cUJBN0VVO1VBQ25CLFNBQU0sT0E0RUcsTUE1RU87V0FBTyxZQTRFZCxvQ0E1RXVDOzs7RUFHakQseUNBQ1M7O0dBQVIsb0JBQU07R0FDTixzQkFDUSxlQUFBO0lBQVAsVUFBTSxXQUFTLENBQUUsRUFBRSxHQUFLLEdBQ0M7NEJBQXRCLEVBQUU7SUFBQTtlQUNHLGVBQUcsSUFBSSxHQUFHO2VBQ1YsZUFBRyxJQUFJLEdBQUc7R0FBQTtrQkFFbEIsb0JBQUEsT0FBTyxZQUNrQjtzQkFEcEI7c0JBQVk7SUFDakIsVUFBTTtJQUNELFFBQUEsS0FBQSxPQUNJO0tBQVIsU0FBTyxJQUFJLEVBQUUsWUFBUztJQUFBO1dBQ3ZCO0dBQUE7O0VBRUYscUNBQ007O0dBQUwsb0JBQU07R0FDTixzQkFDTyxlQUFBOztJQUFOLGFBQ0k7O3FCQUFILEVBQUs7cUJBQ0wsRUFBSzs7O0lBQ04sYUFDSTs7cUJBQUgsRUFBSzs7O29CQUNOLENBQUUsR0FBRyxJQUFRO29CQUNiLENBQUUsR0FBRyxJQUFROzs7a0JBQ2IsbUJBQUEsRUFBTSxFQUNLO3NCQURUO3NCQUFNO1dBQ1IsQ0FBSyxPQUFJLE1BQU0sR0FBSSxNQUFNLFNBQ0c7WUFBM0IsT0FBSyxFQUFHLE1BQ0k7TUFDWCxrQkFBTSxLQUFLO01BQ1gsa0JBQU0sS0FBSztNQUNYLFlBQU0sT0FBSyxFQUFFO2FBQ2IsQ0FBSyxFQUFJLFNBQU8sUUFBTSxPQUFHLElBQUk7Ozs7O0VBR2pDLGlDQUFRLEtBQUksWUFDTTs7R0FBakIsb0JBQU07R0FDTixzQkFBTSxDQUFHLElBQUksTUFBTTs7O0VBQ3BCLE1BQU8sUUFBTztFQUVkLHlDQUNROztHQUFQLG9CQUFNO0dBQ04sc0JBQU87a0JBQ0wscUJBQUEsSUFBUSxTQUNVO3NCQURkO3NCQUFXO0lBQ1gsUUFBQSxLQUFBLFNBQ007S0FDVixTQUFPLFlBQUksRUFBRSxXQUFHLEVBQUU7SUFBQTtHQUFBOztFQUVyQix5Q0FBVyxLQUFJLFlBQ007O0dBQXBCLG9CQUNDO0dBQ0Qsc0JBQU0sQ0FBRyxJQUFJOzs7RUFFZCxpREFDVzs7R0FBVixvQkFBTTtrQkFDSiwwQkFBQSxJQUFRLGVBQ1k7c0JBRGhCO3NCQUFlO0lBQ2YsUUFBQSxLQUFBLGVBQ1U7S0FBZCxjQUFVLElBQUk7SUFBQTtHQUFBOztFQUVqQiw2QkFBTSxLQUFJLFlBQ007O0dBQWYsb0JBQ0M7R0FFRCxzQkFBTSxDQUFHLElBQUksTUFBTTtHQUNuQiw2QkFBWSxrQkFBQSxJQUFJLElBR2Y7VUFPUTtJQVJDLFlBQUEsYUFRRCxNQVJlLHNCQUFZLDZCQUFrQjtJQUNyRCxTQU9RLE1BUEksSUFBSTtHQUFBOzs7RUFFbEIsK0NBQWEsS0FBSSxZQUNNOztHQUF0QixvQkFBTTtHQUNOLHNCQUFNLENBQUcsSUFBSSxNQUFNO0dBQ25CLDZCQUFXLGtCQUFBLElBQUksY0FDWTtVQUNsQjtXQURSLFNBQU0sT0FDRSxNQURRO2dCQUNNO01BQXJCLFNBQU8sTUFBSyxlQUZDO3dCQUFBO0tBQUE7SUFBQTtHQUFBOzs7RUEvSGpCLHdCQUFBO2tCQWdCQSIsImZpbGUiOiJhdC9NYXAvTWFwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=