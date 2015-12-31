"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../methods","./../../to-string","./../../Type/Type","./../at","./../q","./Id-Map"],(exports,compare_0,methods_1,to_45string_2,Type_3,_64_4,_63_5,Id_45Map_6)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(methods_1),sub=_ms.get(_$1,"sub"),to_45string=_ms.getDefaultExport(to_45string_2),_$2=_ms.getModule(to_45string_2),inspect=_ms.get(_$2,"inspect"),_$3=_ms.getModule(Type_3),_61_62=_ms.get(_$3,"=>"),type_45of=_ms.get(_$3,"type-of"),_64=_ms.getDefaultExport(_64_4),_$4=_ms.getModule(_64_4),all_63=_ms.get(_$4,"all?"),count=_ms.get(_$4,"count"),empty=_ms.get(_$4,"empty"),empty_63=_ms.get(_$4,"empty?"),from_45stream=_ms.get(_$4,"from-stream"),_64map_126=_ms.get(_$4,"@map~"),_$5=_ms.getModule(_63_5),_63_45or=_ms.get(_$5,"?-or"),un_45_63=_ms.get(_$5,"un-?"),Id_45Map=_ms.lazy(()=>_ms.getDefaultExport(Id_45Map_6));
		let Map=exports.default=_ms.trait("Map",[_64],{
			[_ms.symbol(empty)](){
				let _this=this;
				return new (_ms.unlazy(Id_45Map))()
			},
			[_ms.symbol(from_45stream)](stream){
				let _this=this;
				let map=empty(_this);
				for(let _ of stream){
					_ms.setSub(map,_ms.sub(_,0),_ms.sub(_,1),"init")
				};
				return map
			}
		},{
			[_ms.symbol(to_45string)](){
				let _this=this;
				return inspect(_this)
			},
			[_ms.symbol(inspect)](){
				let _this=this;
				return (empty_63(_this)?`empty ${_this.constructor.name}`:(()=>{
					let parts=_64map_126(_this,pair=>{
						return `${inspect(_ms.sub(pair,0))} -> ${inspect(_ms.sub(pair,1))}`
					});
					return `${_this.constructor.name}
	${_61_62(String,parts,`\n\t`)}`
				})())
			},
			[_ms.symbol(_61_63)](other){
				let _this=this;
				return (_61_63(type_45of(_this),type_45of(other))&&map_61_63(_this,other))
			},
			[_ms.symbol(sub)](key){
				let _this=this;
				return un_45_63(_63get(_this,key),_ms.lazy(()=>`${_this} does not contain ${key}.`))
			}
		});
		let _63get=exports["?get"]=_ms.method("?get",["key"]);
		let has_45key_63=exports["has-key?"]=_ms.method("has-key?",["key"],function(key){
			let _this=this;
			return ! empty_63(_63get(_this,key))
		});
		let _64keys=exports["@keys"]=_ms.method("@keys",[],function(){
			let _this=this;
			return _61_62(Array,_64map_126(_this,pair=>{
				return _ms.sub(pair,0)
			}))
		});
		let _64values=exports["@values"]=_ms.method("@values",[],function(){
			let _this=this;
			return _61_62(Array,_64map_126(_this,pair=>{
				return _ms.sub(pair,1)
			}))
		});
		let make_45map=exports["make-map"]=function make_45map(_64key,get_45value){
			_ms.checkInstance(_64,_64key,"@key");
			_ms.checkInstance(Function,get_45value,"get-value");
			let map=empty(_ms.unlazy(Id_45Map));
			for(let _ of _64key){
				_ms.setSub(map,_,get_45value(_),"init")
			};
			return map
		};
		let map_61_63=exports["map=?"]=function map_61_63(a,b){
			_ms.checkInstance(Map,a,"a");
			_ms.checkInstance(Map,b,"b");
			return (_61_63(count(a),count(b))&&(()=>{
				return all_63(a,pair=>{
					let key=_ms.sub(pair,0);
					let val=_ms.sub(pair,1);
					let _63bk=_63get(b,key);
					return (! empty_63(_63bk)&&_61_63(val,_63bk.val))
				})
			})())
		};
		let get_45or_45add_33=exports["get-or-add!"]=_ms.method("get-or-add!",["key","default-val"],function(key,default_45val){
			let _this=this;
			return _63_45or(_63get(_this,key),_ms.lazy(()=>(()=>{
				_ms.setSub(_this,key,_ms.unlazy(default_45val),"init");
				return _ms.unlazy(default_45val)
			})()))
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvTWFwLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBVUEseUNBQVc7ZUFJVCxTQUNPO1FBeUVOO1dBekVBOztlQUVELGdCQUFhLE9BQ007UUFzRWxCO0lBdEVBLFFBQU0sTUFzRU47SUFyRUksUUFBQSxLQUFBLE9BQ007Z0JBQ1QsWUFBSyxFQUFDLFdBQU8sRUFBQzs7V0FDZjtHQUFBO0VBQUE7ZUFFRixlQUNXO1FBK0RUO1dBL0RELFFBK0RDO0dBQUE7ZUE3REYsV0FDUztRQTREUDtXQTVESSxDQUFDLFNBNERMLE9BNURtQixTQTREbkIseUJBM0Q4QyxLQUFBO0tBRzlDLFVBQVEsV0F3RFIsTUF4RG9CLE1BQ0k7YUFBdEIsR0FBRSxnQkFBUSxLQUFLLFVBQVMsZ0JBQVEsS0FBSzs7WUFFdEMsR0FxREQsMkJBcERJLE9BQUcsT0FBTyxNQUFPOzs7ZUFFdkIsU0FBSSxNQUNLO1FBaURQO1dBakRELENBQUssT0FBSSxVQWlEUixPQWpEdUIsVUFBUSxTQUFTLFVBaUR4QyxNQWpEbUQ7R0FBQTtlQUVyRCxNQUFLLElBQ0c7UUE4Q047V0E5Q0QsU0FBTSxPQThDTCxNQTlDZSxrQkFBTyxHQThDdEIsMEJBOUM4Qzs7O0VBR2hEO0VBSUEsbUVBQWtCLFNBQUEsSUFDRztPQXNDbkI7VUFyQ0QsRUFBSSxTQUFRLE9BcUNYLE1BckNxQjtFQUFBO0VBRXZCLG1EQUNlLFVBQUE7T0FrQ2I7VUFoQ0QsT0FBRyxNQUFPLFdBZ0NULE1BaENxQixNQUNJO21CQUF6QixLQUFLO0dBQUE7RUFBQTtFQUVQLHlEQUNpQixVQUFBO09BNEJmO1VBMUJELE9BQUcsTUFBTyxXQTBCVCxNQTFCcUIsTUFDSTttQkFBekIsS0FBSztHQUFBO0VBQUE7RUFHUCxtQ0FBVyxvQkFBQSxPQUFPLFlBQ2tCO3FCQURwQjtxQkFBWTtHQUczQixRQUFNO0dBQ0YsUUFBQSxLQUFBLE9BQ0k7ZUFBUCxJQUFLLEVBQUksWUFBVTs7VUFDcEI7RUFBQTtFQUVELCtCQUFRLG1CQUFBLEVBQU0sRUFDSztxQkFEVDtxQkFBTTtVQUVmLENBQUssT0FBSSxNQUFNLEdBQUksTUFBTSxLQUNHLEtBQUE7V0FBM0IsT0FBSyxFQUFHLE1BQ0k7S0FDWCxnQkFBTSxLQUFLO0tBQ1gsZ0JBQU0sS0FBSztLQUNYLFVBQU0sT0FBSyxFQUFFO1lBQ2IsQ0FBSyxFQUFJLFNBQU8sUUFBTSxPQUFHLElBQUk7Ozs7RUFHaEMsNEZBQXFCLFNBQUEsSUFBSSxjQUNZO09BRW5DO1VBREQsU0FBTSxPQUNMLE1BRGUsa0JBQ00sS0FBQTtlQUFyQixNQUFLIiwiZmlsZSI6ImF0L01hcC9NYXAuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
