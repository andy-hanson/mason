"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../methods","./../../to-string","./../../Type/Type","./../at","./../at-Type","./../q","./Id-Map"],(exports,compare_0,methods_1,to_45string_2,Type_3,_64_4,_64_45Type_5,_63_6,Id_45Map_7)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(methods_1),sub=_ms.get(_$1,"sub"),to_45string=_ms.getDefaultExport(to_45string_2),_$2=_ms.getModule(Type_3),_61_62=_ms.get(_$2,"=>"),type_45of=_ms.get(_$2,"type-of"),_64=_ms.getDefaultExport(_64_4),_$3=_ms.getModule(_64_4),all_63=_ms.get(_$3,"all?"),count=_ms.get(_$3,"count"),empty_63=_ms.get(_$3,"empty?"),_64map_126=_ms.get(_$3,"@map~"),_$4=_ms.getModule(_64_45Type_5),empty=_ms.get(_$4,"empty"),_$5=_ms.getModule(_63_6),_63_45or=_ms.get(_$5,"?-or"),un_45_63=_ms.get(_$5,"un-?"),Id_45Map=_ms.lazy(()=>_ms.getDefaultExport(Id_45Map_7));
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
		const _63get=exports["?get"]=_ms.method("?get",["key"]);
		const has_45key_63=exports["has-key?"]=_ms.method("has-key?",["key"],function(key){
			const _this=this;
			return ! empty_63(_63get(_this,key))
		});
		const _64keys=exports["@keys"]=_ms.method("@keys",[],function(){
			const _this=this;
			return _61_62(Array,_64map_126(_this,pair=>{
				return _ms.sub(pair,0)
			}))
		});
		const _64values=exports["@values"]=_ms.method("@values",[],function(){
			const _this=this;
			return _61_62(Array,_64map_126(_this,pair=>{
				return _ms.sub(pair,1)
			}))
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
		const get_45or_45add_33=exports["get-or-add!"]=_ms.method("get-or-add!",["key","default-val"],function(key,default_45val){
			const _this=this;
			return _63_45or(_63get(_this,key),_ms.lazy(()=>(()=>{
				_ms.setSub(_this,key,_ms.unlazy(default_45val),"init-mutable");
				return _ms.unlazy(default_45val)
			})()))
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvTWFwLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBV0EsMENBQVU7ZUFHVDtVQTRERTtJQXhERCxZQUFRLFdBd0RQLE1BeERtQjtZQUNsQixXQUFDLEtBQUssaUJBQVEsS0FBSzs7V0FFcEIsR0FxREEsMkJBcERFLE9BQUcsT0FBTyxNQUFPOztlQUVyQixTQUFJO1VBa0RGO1dBakRELENBQUssT0FBSSxVQWlEUixPQWpEdUIsVUFBUSxTQUFTLFVBaUR4QyxNQWpEbUQ7R0FBQTtlQUVyRCxNQUFLO1VBK0NIO1dBOUNELFNBQU0sT0E4Q0wsTUE5Q2Usa0JBQU8sR0E4Q3RCLDBCQTlDK0M7OztFQUdqRDtFQUlBLHFFQUFrQixTQUFBO1NBdUNoQjtVQXJDRCxFQUFLLFNBQVEsT0FxQ1osTUFyQ3NCO0VBQUE7RUFFeEIscURBQ2U7U0FrQ2I7VUFoQ0QsT0FBRyxNQUFPLFdBZ0NULE1BaENxQjttQkFDckIsS0FBSztHQUFBO0VBQUE7RUFFUCwyREFDaUI7U0E0QmY7VUExQkQsT0FBRyxNQUFPLFdBMEJULE1BMUJxQjttQkFDckIsS0FBSztHQUFBO0VBQUE7RUFHUCxxQ0FBVyxvQkFBQSxPQUFPO3FCQUFGO3FCQUFZO0dBRzNCLFVBQU07R0FDRixRQUFBLEtBQUEsT0FDSTtlQUFQLElBQUksRUFBSyxZQUFBOztVQUNWO0VBQUE7RUFFRCxpQ0FBUSxtQkFBQSxFQUFNO3FCQUFKO3FCQUFNO1VBRWYsQ0FBSyxPQUFJLE1BQU0sR0FBSSxNQUFNLEtBQ0csS0FBQTtXQUEzQixPQUFLLEVBQUc7S0FFUCxrQkFBTSxLQUFLO0tBQ1gsa0JBQU0sS0FBSztLQUNYLFlBQU0sT0FBSyxFQUFFO1lBQ2IsQ0FBSyxFQUFJLFNBQU8sUUFBTSxPQUFHLElBQUk7Ozs7RUFHaEMsOEZBQXFCLFNBQUEsSUFBSTtTQUd2QjtVQURELFNBQU0sT0FDTCxNQURlLGtCQUNNLEtBQUE7ZUFBckIsTUFBSyIsImZpbGUiOiJhdC9NYXAvTWFwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
