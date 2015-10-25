"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../methods","./../../to-string","./../../Type/Kind","./../../Type/Method","./../../Type/Pred-Type","./../../Type/Type","./../at","./../at-Type","./../q","./Id-Map"],(exports,compare_0,methods_1,to_45string_2,Kind_3,Method_4,Pred_45Type_5,Type_6,_64_7,_64_45Type_8,_63_9,Id_45Map_10)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(methods_1),sub=_ms.get(_$1,"sub"),to_45string=_ms.getDefaultExport(to_45string_2),Kind=_ms.getDefaultExport(Kind_3),_$2=_ms.getModule(Kind_3),kind_33=_ms.get(_$2,"kind!"),Method=_ms.getDefaultExport(Method_4),_$3=_ms.getModule(Method_4),impl_33=_ms.get(_$3,"impl!"),_$4=_ms.getModule(Pred_45Type_5),Any=_ms.get(_$4,"Any"),_$5=_ms.getModule(Type_6),_61_62=_ms.get(_$5,"=>"),type_45of=_ms.get(_$5,"type-of"),_64=_ms.getDefaultExport(_64_7),_$6=_ms.getModule(_64_7),all_63=_ms.get(_$6,"all?"),count=_ms.get(_$6,"count"),empty_63=_ms.get(_$6,"empty?"),_64map_126=_ms.get(_$6,"@map~"),_$7=_ms.getModule(_64_45Type_8),empty=_ms.get(_$7,"empty"),_$8=_ms.getModule(_63_9),_63_45or=_ms.get(_$8,"?-or"),un_45_63=_ms.get(_$8,"un-?"),Id_45Map=_ms.lazy(()=>_ms.getDefaultExport(Id_45Map_10));
		const Map=exports.default=new (Kind)((()=>{
			const built={};
			built.name="Map";
			return built
		})());
		kind_33(Map,_64);
		impl_33(to_45string,Map,function(){
			const _this=this;
			const parts=_64map_126(_this,pair=>{
				return `${_ms.sub(pair,0)} -> ${_ms.sub(pair,1)}`
			});
			return `${_this.constructor.name}
	${_61_62(String,parts,`\n\t`)}`
		});
		const _63get=exports["?get"]=new (Method)((()=>{
			const built={};
			built.name="?get";
			const args=built.args=["_","key"];
			return built
		})());
		const has_45key_63=exports["has-key?"]=new (Method)((()=>{
			const built={};
			built.name="has-key?";
			const args=built.args=["_","key"];
			const _default=built.default=function _default(key){
				const _this=this;
				return ! empty_63(_63get(_this,key))
			};
			return built
		})());
		const _64keys=exports["@keys"]=new (Method)((()=>{
			const built={};
			built.name="@keys";
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
			built.name="@values";
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
		const make_45map=exports["make-map"]=function make_45map(_64key,get_45value){
			_ms.checkContains(_64,_64key,"@key");
			_ms.checkContains(Function,get_45value,"get-value");
			const map=empty(_ms.unlazy(Id_45Map));
			for(let _ of _64key){
				_ms.setSub(map,_,get_45value(_),"init")
			};
			return map
		};
		const map_61_63=exports["map=?"]=function map_61_63(a,b){
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
		};
		const get_45or_45add_33=exports["get-or-add!"]=new (Method)((()=>{
			const built={};
			built.name="get-or-add!";
			const args=built.args=["_","key",`~default-val`];
			const _default=built.default=function _default(key,default_45val){
				const _this=this;
				return _63_45or(_63get(_this,key),_ms.lazy(()=>(()=>{
					_ms.setSub(_this,key,_ms.unlazy(default_45val),"init-mutable");
					return _ms.unlazy(default_45val)
				})()))
			};
			return built
		})());
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvTWFwLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBY0EsMEJBQUssS0FBSSxNQUNJLEtBQUE7O2NBQ1o7OztFQUVELFFBQU0sSUFBSTtFQUVWLFFBQU0sWUFBVSxJQUNNO1NBeUVsQjtHQXRFSCxZQUFRLFdBc0VMLE1BdEVpQjtXQUNsQixXQUFDLEtBQUssaUJBQVEsS0FBSzs7VUFFcEIsR0FtRUUsMkJBbEVBLE9BQUcsT0FBTyxNQUFPOztFQUdwQiw2QkFBTSxLQUFJLFFBQ00sS0FBQTs7Y0FDZjtHQUNBLHNCQUFNLENBQUUsSUFBRzs7O0VBRVosdUNBQVUsS0FBSSxRQUNNLEtBQUE7O2NBQ25CO0dBQ0Esc0JBQU0sQ0FBRSxJQUFHO0dBQ1gsNkJBQVcsa0JBQUE7VUFzRFQ7V0FyREQsRUFBSyxTQUFRLE9BcURaLE1BckRzQjtHQUFBOzs7RUFFekIsK0JBQU8sS0FBSSxRQUNNLEtBQUE7O2NBQ2hCO0dBQ0Esc0JBQU07R0FDTiw2QkFDVztVQThDVDtXQTdDRCxPQUFHLE1BQU8sV0E2Q1QsTUE3Q3FCO29CQUNyQixLQUFLO0lBQUE7R0FBQTs7O0VBRVIsbUNBQVMsS0FBSSxRQUNNLEtBQUE7O2NBQ2xCO0dBQ0Esc0JBQU07R0FDTiw2QkFDVztVQXFDVDtXQXBDRCxPQUFHLE1BQU8sV0FvQ1QsTUFwQ3FCO29CQUNyQixLQUFLO0lBQUE7R0FBQTs7O0VBR1IsUUFBTSxPQUFHLElBQU0sU0FBQTtTQWdDWjtVQS9CRixDQUFLLE9BQUksVUErQlAsT0EvQnNCLFVBQVEsU0FBUyxVQStCdkMsTUEvQmtEO0VBQUE7RUFFckQsUUFBTSxJQUFJLElBQU0sU0FBQTtTQTZCYjtxQkE3QmlCO1VBQ25CLFNBQU0sT0E0QkosTUE1QmMsa0JBQU8sR0E0QnJCLDBCQTVCOEM7O0VBR2pELHFDQUFXLG9CQUFBLE9BQU87cUJBQUY7cUJBQVk7R0FHM0IsVUFBTTtHQUNELFFBQUEsS0FBQSxPQUNJO2VBQVIsSUFBSSxFQUFLLFlBQUE7O1VBQ1Y7RUFBQTtFQUVELGlDQUFRLG1CQUFBLEVBQU07cUJBQUo7cUJBQU07VUFFZixDQUFLLE9BQUksTUFBTSxHQUFJLE1BQU0sS0FDRyxLQUFBO1dBQTNCLE9BQUssRUFBRztLQUVQLGtCQUFNLEtBQUs7S0FDWCxrQkFBTSxLQUFLO0tBQ1gsWUFBTSxPQUFLLEVBQUU7WUFDYixDQUFLLEVBQUksU0FBTyxRQUFNLE9BQUcsSUFBSTs7OztFQUdoQywrQ0FBYSxLQUFJLFFBQ00sS0FBQTs7Y0FDdEI7R0FDQSxzQkFBTSxDQUFFLElBQUcsTUFBSztHQUNoQiw2QkFBVyxrQkFBQSxJQUFJO1VBRWI7V0FERCxTQUFNLE9BQ0wsTUFEZSxrQkFDTSxLQUFBO2dCQUFyQixNQUFLIiwiZmlsZSI6ImF0L01hcC9NYXAuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
