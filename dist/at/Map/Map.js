"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../methods","../../private/bootstrap","../../to-string","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../../Type/Type","../at","../at-Type","../q","./Id-Map","../../math/methods"],(exports,compare_0,methods_1,bootstrap_2,to_45string_3,Kind_4,Method_5,Pred_45Type_6,Type_7,_64_8,_64_45Type_9,_63_10,Id_45Map_11,methods_12)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(methods_1),sub=_ms.get(_$1,"sub"),_$2=_ms.getModule(bootstrap_2),msDef=_ms.get(_$2,"msDef"),to_45string=_ms.getDefaultExport(to_45string_3),Kind=_ms.getDefaultExport(Kind_4),_$3=_ms.getModule(Kind_4),kind_33=_ms.get(_$3,"kind!"),Method=_ms.getDefaultExport(Method_5),_$4=_ms.getModule(Method_5),impl_33=_ms.get(_$4,"impl!"),_$5=_ms.getModule(Pred_45Type_6),Any=_ms.get(_$5,"Any"),_$6=_ms.getModule(Type_7),_61_62=_ms.get(_$6,"=>"),type_45of=_ms.get(_$6,"type-of"),_64=_ms.getDefaultExport(_64_8),_$7=_ms.getModule(_64_8),all_63=_ms.get(_$7,"all?"),count=_ms.get(_$7,"count"),empty_63=_ms.get(_$7,"empty?"),_64map_126=_ms.get(_$7,"@map~"),_$8=_ms.getModule(_64_45Type_9),empty=_ms.get(_$8,"empty"),_$9=_ms.getModule(_63_10),_63_45or=_ms.get(_$9,"?-or"),un_45_63=_ms.get(_$9,"un-?"),Id_45Map=_ms.lazy(()=>_ms.getDefaultExport(Id_45Map_11)),_$10=_ms.lazyGetModule(methods_12),_43=_ms.lazyProp(_$10,"+");
		const Map=exports.default=new (Kind)((()=>{
			const built={};
			built[`name`]="Map";
			return built
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
				_ms.assoc(built,[m],`Map\n\t1 -> 2`);
				return built
			};
			return _ms.set(function(){
				const _this=this;
				const parts=_64map_126(_this,pair=>{
					return `${_ms.sub(pair,0)} -> ${_ms.sub(pair,1)}`
				});
				return `${_this.constructor.name}
	${_61_62(String,parts,`\n\t`)}`
			},built)
		})());
		const _63get=exports["?get"]=new (Method)((()=>{
			const built={};
			built[`name`]="?get";
			const args=built.args=[`_`,`key`];
			return built
		})());
		const has_45key_63=exports["has-key?"]=new (Method)((()=>{
			const built={};
			built[`name`]="has-key?";
			const args=built.args=[`_`,`key`];
			const _default=built.default=function _default(key){
				const _this=this;
				return ! empty_63(_63get(_this,key))
			};
			return built
		})());
		const _64keys=exports["@keys"]=new (Method)((()=>{
			const built={};
			built[`name`]="@keys";
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return _61_62(Array,_64map_126(_this,pair=>{
					return _ms.sub(pair,0)
				}))
			};
			return built
		})());
		const _64values=exports["@values"]=new (Method)((()=>{
			const built={};
			built[`name`]="@values";
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return _61_62(Array,_64map_126(_this,pair=>{
					return _ms.sub(pair,1)
				}))
			};
			return built
		})());
		impl_33(_61_63,Map,function(other){
			const _this=this;
			return (_61_63(type_45of(_this),type_45of(other))&&map_61_63(_this,other))
		});
		impl_33(sub,Map,function(key){
			const _this=this;
			_ms.checkContains(Any,key,"key");
			return un_45_63(_63get(_this,key),_ms.lazy(()=>`${_this} does not contain ${key}.`))
		});
		const make_45map=exports["make-map"]=(()=>{
			const built={};
			const test=built.test=function test(){
				const map=make_45map([1,2],x=>{
					return _ms.unlazy(_43)(x,1)
				});
				_ms.assert(_61_63,_ms.sub(map,1),2);
				_ms.assert(_61_63,_ms.sub(map,2),3)
			};
			return _ms.set((_64key,get_45value)=>{
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
			return _ms.set((a,b)=>{
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
			built[`name`]="assoc!";
			const args=built.args=[`_`,`key`,`val`];
			return built
		})());
		msDef(`assoc`,assoc_33);
		const assoc_42_33=exports["assoc*!"]=(()=>{
			const built={};
			const test=built.test=`See Map.implementor-test.`;
			return _ms.set((map,to_45add)=>{
				_ms.checkContains(Map,map,"map");
				_ms.checkContains(Map,to_45add,"to-add");
				for(let _ of to_45add){
					assoc_33(map,_ms.sub(_,0),_ms.sub(_,1))
				}
			},built)
		})();
		const un_45assoc_33=exports["un-assoc!"]=new (Method)((()=>{
			const built={};
			built[`name`]="un-assoc!";
			const args=built.args=[`_`,`key`];
			return built
		})());
		const un_45assoc_42_33=exports["un-assoc*!"]=(()=>{
			return (map,_64to_45delete)=>{
				_ms.checkContains(Map,map,"map");
				_ms.checkContains(_64,_64to_45delete,"@to-delete");
				for(let _ of _64to_45delete){
					un_45assoc_33(map,_)
				}
			}
		})();
		const add_33=exports["add!"]=new (Method)((()=>{
			const built={};
			built[`name`]="add!";
			const args=built.args=[`_`,`key`,`val`];
			const _default=built.default=function _default(key,val){
				const _this=this;
				if(has_45key_63(_this,key))throw new (Error)(`Already have key ${key}.`);
				assoc_33(_this,key,val)
			};
			return built
		})());
		const get_45or_45add_33=exports["get-or-add!"]=new (Method)((()=>{
			const built={};
			built[`name`]="get-or-add!";
			const args=built.args=[`_`,`key`,`~default-val`];
			const _default=built.default=function _default(key,default_45val){
				const _this=this;
				return _63_45or(_63get(_this,key),_ms.lazy(()=>(()=>{
					assoc_33(_this,key,_ms.unlazy(default_45val));
					return _ms.unlazy(default_45val)
				})()))
			};
			return built
		})());
		const name=exports.name=`Map`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvTWFwLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBaUJBLDBCQUFLLEtBQUksTUFDSSxLQUFBOztTQUNaLFFBQUE7OztFQUVELFFBQU0sSUFBSTtFQUVWLFFBQU0sWUFBVSxJQUNHLEtBQUE7O0dBQWxCLHNCQUNPLGVBQUE7O0lBQU4sUUFDRyxLQUFBOztxQkFBRixFQUFLOzs7b0JBQ04sQ0FBQyxHQUFPOzs7a0JBRVAsVUFBQTtVQTBIUTtJQXZIVCxZQUFRLFdBdUhDLE1BdkhXLE1BQ0k7WUFBdEIsV0FBQyxLQUFLLGlCQUFRLEtBQUs7O1dBRXBCLEdBb0hRLDJCQW5ITixPQUFHLE9BQU8sTUFBTzs7O0VBR3JCLDZCQUFNLEtBQUksUUFDTSxLQUFBOztTQUNmLFFBQUE7R0FDQSxzQkFBTSxDQUFFLElBQUk7OztFQUViLHVDQUFVLEtBQUksUUFDTSxLQUFBOztTQUNuQixRQUFBO0dBQ0Esc0JBQU0sQ0FBRSxJQUFJO0dBQ1osNkJBQVcsa0JBQUEsSUFDRztVQXNHTDtXQXRHUixFQUFLLFNBQVEsT0FzR0wsTUF0R2U7R0FBQTs7O0VBRXpCLCtCQUFPLEtBQUksUUFDTSxLQUFBOztTQUNoQixRQUFBO0dBQ0Esc0JBQU07R0FDTiw2QkFDVyxtQkFBQTtVQStGRjtXQTlGUixPQVNHLE1BVE8sV0E4RkYsTUE5RmMsTUFDSTtvQkFBekIsS0FBSztJQUFBO0dBQUE7OztFQUVSLG1DQUFTLEtBQUksUUFDTSxLQUFBOztTQUNsQixRQUFBO0dBQ0Esc0JBQU07R0FDTiw2QkFDVyxtQkFBQTtVQXNGRjtXQXJGUixPQUFHLE1BQU8sV0FxRkYsTUFyRmMsTUFDSTtvQkFBekIsS0FBSztJQUFBO0dBQUE7OztFQUdSLFFBQU0sT0FBRyxJQUFNLFNBQUEsTUFDSztTQWdGVjtVQWhGVCxDQUFLLE9BQUksVUFnRkEsT0FoRmUsVUFBUSxTQUFTLFVBZ0ZoQyxNQWhGMkM7RUFBQTtFQUVyRCxRQUFNLElBQUksSUFBTSxTQUFBLElBQ087U0E2RWI7cUJBOUVVO1VBQ25CLFNBQU0sT0E2RUcsTUE3RU8sa0JBQU8sR0E2RWQsMEJBN0V1Qzs7RUFHakQscUNBQ1MsS0FBQTs7R0FDUixzQkFDUSxlQUFBO0lBQVAsVUFBTSxXQUFTLENBQUMsRUFBRSxHQUFJLEdBQ0M7NEJBQXBCLEVBQUU7SUFBQTtlQUNHLGVBQUcsSUFBSSxHQUFHO2VBQ1YsZUFBRyxJQUFJLEdBQUc7R0FBQTtrQkFFbEIsQ0FBQSxPQUFPLGNBQ2tCO3NCQURwQjtzQkFBWTtJQUNqQixVQUFNO0lBQ0QsUUFBQSxLQUFBLE9BQ0k7S0FBUixTQUFPLElBQUksRUFBRSxZQUFBO0lBQUE7V0FDZDtHQUFBOztFQUVGLGlDQUNNLEtBQUE7O0dBQ0wsc0JBQ08sZUFBQTs7SUFBTixTQUNJLEtBQUE7O3FCQUFILEVBQUs7cUJBQ0wsRUFBSzs7O0lBQ04sU0FDSSxLQUFBOztxQkFBSCxFQUFLOzs7b0JBQ04sQ0FBQyxHQUFHLElBQU87b0JBQ1gsQ0FBQyxHQUFHLElBQU87OztrQkFDWCxDQUFBLEVBQU0sSUFDSztzQkFEVDtzQkFBTTtXQUNSLENBQUssT0FBSSxNQUFNLEdBQUksTUFBTSxLQUNHLEtBQUE7WUFBM0IsT0FBSyxFQUFHLE1BQ0k7TUFDWCxrQkFBTSxLQUFLO01BQ1gsa0JBQU0sS0FBSztNQUNYLFlBQU0sT0FBSyxFQUFFO2FBQ2IsQ0FBSyxFQUFJLFNBQU8sUUFBTSxPQUFHLElBQUk7Ozs7O0VBR2pDLGlDQUFRLEtBQUksUUFDTSxLQUFBOztTQUNqQixRQUFBO0dBQ0Esc0JBQU0sQ0FBRSxJQUFJLE1BQU07OztFQUNuQixNQUFPLFFBQU87RUFFZCxxQ0FDUSxLQUFBOztHQUNQLHNCQUFPO2tCQUNMLENBQUEsSUFBUSxXQUNVO3NCQURkO3NCQUFXO0lBQ1gsUUFBQSxLQUFBLFNBQ007S0FDVixTQUFPLFlBQUksRUFBRSxXQUFHLEVBQUU7SUFBQTtHQUFBOztFQUVyQix5Q0FBVyxLQUFJLFFBQ00sS0FBQTs7U0FDcEIsUUFBQTtHQUNBLHNCQUFNLENBQUUsSUFBSTs7O0VBRWIsNkNBQ1csS0FBQTtVQUNSLENBQUEsSUFBUSxpQkFDWTtzQkFEaEI7c0JBQWU7SUFDZixRQUFBLEtBQUEsZUFDVTtLQUFkLGNBQVUsSUFBSTtJQUFBO0dBQUE7RUFBQTtFQUVqQiw2QkFBTSxLQUFJLFFBQ00sS0FBQTs7U0FDZixRQUFBO0dBQ0Esc0JBQU0sQ0FBRSxJQUFJLE1BQU07R0FDbEIsNkJBQVksa0JBQUEsSUFBSSxJQUdmO1VBUVE7SUFUQyxHQUFBLGFBU0QsTUFUZSx1QkFBWSxvQkFBa0I7SUFDckQsU0FRUSxNQVJJLElBQUk7R0FBQTs7O0VBRWxCLCtDQUFhLEtBQUksUUFDTSxLQUFBOztTQUN0QixRQUFBO0dBQ0Esc0JBQU0sQ0FBRSxJQUFJLE1BQU07R0FDbEIsNkJBQVcsa0JBQUEsSUFBSSxjQUNZO1VBQ2xCO1dBRFIsU0FBTSxPQUNFLE1BRFEsa0JBQ00sS0FBQTtLQUFyQixTQUFPLE1BQUs7Ozs7OztFQXZKaEIsd0JBQUEiLCJmaWxlIjoiYXQvTWFwL01hcC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9