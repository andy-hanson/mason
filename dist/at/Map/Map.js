"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../methods","./../../to-string","./../../Type/Method","./../../Type/Type","./../at","./../at-Type","./../q","./Id-Map"],(exports,compare_0,methods_1,to_45string_2,Method_3,Type_4,_64_5,_64_45Type_6,_63_7,Id_45Map_8)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(methods_1),sub=_ms.get(_$1,"sub"),to_45string=_ms.getDefaultExport(to_45string_2),Method=_ms.getDefaultExport(Method_3),_$2=_ms.getModule(Type_4),_61_62=_ms.get(_$2,"=>"),type_45of=_ms.get(_$2,"type-of"),_64=_ms.getDefaultExport(_64_5),_$3=_ms.getModule(_64_5),all_63=_ms.get(_$3,"all?"),count=_ms.get(_$3,"count"),empty_63=_ms.get(_$3,"empty?"),_64map_126=_ms.get(_$3,"@map~"),_$4=_ms.getModule(_64_45Type_6),empty=_ms.get(_$4,"empty"),_$5=_ms.getModule(_63_7),_63_45or=_ms.get(_$5,"?-or"),un_45_63=_ms.get(_$5,"un-?"),Id_45Map=_ms.lazy(()=>_ms.getDefaultExport(Id_45Map_8));
		const Map=exports.default=_ms.kind("Map",[_64],{},{
			[_ms.symbol(to_45string)](){
				const _this=this;
				const parts=_64map_126(_this,pair=>{
					return `${_ms.sub(pair,0)} -> ${_ms.sub(pair,1)}`
				});
				return `${_this.constructor.name}
	${_61_62(String,parts,`\n\t`)}`
			},
			[_ms.symbol(_61_63)](other){
				const _this=this;
				return (_61_63(type_45of(_this),type_45of(other))&&map_61_63(_this,other))
			},
			[_ms.symbol(sub)](key){
				const _this=this;
				return un_45_63(_63get(_this,key),_ms.lazy(()=>`${_this} does not contain ${key}.`))
			}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvTWFwLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBWUEsMENBQVU7ZUFHVDtVQXlFRztJQXJFRixZQUFRLFdBcUVOLE1BckVrQjtZQUNsQixXQUFDLEtBQUssaUJBQVEsS0FBSzs7V0FFcEIsR0FrRUMsMkJBakVDLE9BQUcsT0FBTyxNQUFPOztlQUVyQixTQUFJO1VBK0REO1dBOURGLENBQUssT0FBSSxVQThEUCxPQTlEc0IsVUFBUSxTQUFTLFVBOER2QyxNQTlEa0Q7R0FBQTtlQUVyRCxNQUFLO1VBNERGO1dBM0RGLFNBQU0sT0EyREosTUEzRGMsa0JBQU8sR0EyRHJCLDBCQTNEOEM7OztFQUdqRCw2QkFBTSxLQUFJLFFBQ00sS0FBQTs7Y0FDZjtHQUNBLHNCQUFNLENBQUUsSUFBRzs7O0VBRVosdUNBQVUsS0FBSSxRQUNNLEtBQUE7O2NBQ25CO0dBQ0Esc0JBQU0sQ0FBRSxJQUFHO0dBQ1gsNkJBQVcsa0JBQUE7VUErQ1Q7V0E5Q0QsRUFBSyxTQUFRLE9BOENaLE1BOUNzQjtHQUFBOzs7RUFFekIsK0JBQU8sS0FBSSxRQUNNLEtBQUE7O2NBQ2hCO0dBQ0Esc0JBQU07R0FDTiw2QkFDVztVQXVDVDtXQXRDRCxPQUFHLE1BQU8sV0FzQ1QsTUF0Q3FCO29CQUNyQixLQUFLO0lBQUE7R0FBQTs7O0VBRVIsbUNBQVMsS0FBSSxRQUNNLEtBQUE7O2NBQ2xCO0dBQ0Esc0JBQU07R0FDTiw2QkFDVztVQThCVDtXQTdCRCxPQUFHLE1BQU8sV0E2QlQsTUE3QnFCO29CQUNyQixLQUFLO0lBQUE7R0FBQTs7O0VBR1IscUNBQVcsb0JBQUEsT0FBTztxQkFBRjtxQkFBWTtHQUczQixVQUFNO0dBQ0YsUUFBQSxLQUFBLE9BQ0k7ZUFBUCxJQUFJLEVBQUssWUFBQTs7VUFDVjtFQUFBO0VBRUQsaUNBQVEsbUJBQUEsRUFBTTtxQkFBSjtxQkFBTTtVQUVmLENBQUssT0FBSSxNQUFNLEdBQUksTUFBTSxLQUNHLEtBQUE7V0FBM0IsT0FBSyxFQUFHO0tBRVAsa0JBQU0sS0FBSztLQUNYLGtCQUFNLEtBQUs7S0FDWCxZQUFNLE9BQUssRUFBRTtZQUNiLENBQUssRUFBSSxTQUFPLFFBQU0sT0FBRyxJQUFJOzs7O0VBR2hDLCtDQUFhLEtBQUksUUFDTSxLQUFBOztjQUN0QjtHQUNBLHNCQUFNLENBQUUsSUFBRyxNQUFLO0dBQ2hCLDZCQUFXLGtCQUFBLElBQUk7VUFFYjtXQURELFNBQU0sT0FDTCxNQURlLGtCQUNNLEtBQUE7Z0JBQXJCLE1BQUsiLCJmaWxlIjoiYXQvTWFwL01hcC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
