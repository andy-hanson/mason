"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Kind","../at","../at-Type","../Map/Map","../Map/Hash-Map","../Map/Map","./Set"],(exports,Kind_0,_64_1,_64_45Type_2,Map_3,Hash_45Map_4,Map_5,Set_6)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),self_45kind_33=_ms.get(_$2,"self-kind!"),_$3=_ms.getModule(_64_1),_43_43_33=_ms.get(_$3,"++!"),_45_45_33=_ms.get(_$3,"--!"),empty_33=_ms.get(_$3,"empty!"),iterator=_ms.get(_$3,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_2),_$4=_ms.getModule(_64_45Type_2),empty=_ms.get(_$4,"empty"),_$5=_ms.getModule(Map_3),keys=_ms.get(_$5,"keys"),Hash_45Map=_ms.getDefaultExport(Hash_45Map_4),_$7=_ms.getModule(Map_5),assoc_33=_ms.get(_$7,"assoc!"),un_45assoc_33=_ms.get(_$7,"un-assoc!"),Set=_ms.getDefaultExport(Set_6);
		const Hash_45Set=(()=>{
			const _=class Hash_45Set{
				static [_ms.symbol(empty)](){
					const _this=this;
					return new (_this)(empty(Hash_45Map))
				}
				constructor(map){
					_ms.newProperty(this,"map",map)
				}
				[_ms.symbol(iterator)](){
					const _this=this;
					return iterator(keys(_this.map))
				}
				[_ms.symbol(_43_43_33)](_64added){
					const _this=this;
					for(let _ of _64added){
						assoc_33(_this.map,_,true)
					}
				}
				[_ms.symbol(_45_45_33)](_64deleted){
					const _this=this;
					for(let _ of _64deleted){
						un_45assoc_33(_this.map,_)
					}
				}
				[_ms.symbol(empty_33)](){
					const _this=this;
					empty_33(_this.map)
				}
			};
			self_45kind_33(_,_64_45Type);
			kind_33(_,Set);
			return _
		})();
		const name=exports.name=`Hash-Set`;
		exports.default=Hash_45Set;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NldC9IYXNoLVNldC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVNBLGlCQUNlLEtBTVg7U0FESDt1QkFLQyxTQUNPO1dBcUJBO1lBckJOLEtBcUJNLE9BckJJLE1BQU07SUFBQTtnQkFHUCxJQUNHO3FCQUFiLFdBQU87SUFBQTtnQkFFUixZQUNVO1dBY0Y7WUFkUCxTQUFVLEtBY0g7O2dCQVZSLFlBQU0sU0FDTTtXQVNKO0tBVEYsUUFBQSxLQUFBLFNBQ007TUFBVixTQVFNLFVBUk0sRUFBRTtLQUFBO0lBQUE7Z0JBR2hCLFlBQU0sV0FDUTtXQUlOO0tBSkYsUUFBQSxLQUFBLFdBQ1E7TUFBWixjQUdNLFVBSFM7S0FBQTtJQUFBO2dCQUVqQixZQUNTO1dBQUQ7S0FBUCxTQUFPOzs7R0ExQlAsZUFBVyxFQUFFO0dBQ2IsUUFBTSxFQUFFO1VBRlQ7RUFBQTtFQWZELHdCQUFBO2tCQVNBIiwiZmlsZSI6ImF0L1NldC9IYXNoLVNldC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9