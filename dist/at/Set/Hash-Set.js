"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../Type/Kind","./../at","./../at-Type","./../Map/Map","./../Map/Hash-Map","./Set"],(exports,Kind_0,_64_1,_64_45Type_2,Map_3,Hash_45Map_4,Set_5)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(Kind_0),self_45kind_33=_ms.get(_$0,"self-kind!"),_$1=_ms.getModule(_64_1),_43_43_33=_ms.get(_$1,"++!"),_45_45_33=_ms.get(_$1,"--!"),empty_33=_ms.get(_$1,"empty!"),iterator=_ms.get(_$1,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_2),_$2=_ms.getModule(_64_45Type_2),empty=_ms.get(_$2,"empty"),_$3=_ms.getModule(Map_3),_64keys=_ms.get(_$3,"@keys"),Hash_45Map=_ms.getDefaultExport(Hash_45Map_4),Set=_ms.getDefaultExport(Set_5);
		const Hash_45Set=exports.default=(()=>{
			const _=class Hash_45Set{
				static [_ms.symbol(empty)](){
					const _this=this;
					return new (_this)(empty(Hash_45Map))
				}
				constructor(map){
					const _this=this;
					_ms.checkContains(Hash_45Map,map,"map");
					_ms.newProperty(this,"map",map)
				}
				[_ms.symbol(iterator)](){
					const _this=this;
					return iterator(_64keys(_this.map))
				}
				[_ms.symbol(_43_43_33)](_64added){
					const _this=this;
					for(let _ of _64added){
						_ms.setSub(_this.map,_,true,"mutate")
					}
				}
				[_ms.symbol(_45_45_33)](_64deleted){
					const _this=this;
					for(let _ of _64deleted){
						_ms.delSub(_this.map,_)
					}
				}
				[_ms.symbol(empty_33)](){
					const _this=this;
					empty_33(_this.map)
				}
			};
			_ms.kindDo(_,Set);
			self_45kind_33(_,_64_45Type);
			return _
		})();
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXQvSGFzaC1TZXQubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFRQSxpQ0FBZ0IsS0FJYjs7dUJBR0Q7V0FxQk87WUFwQk4sS0FvQk0sT0FwQkksTUFBTTtJQUFBO0lBRVIsWUFBQTtXQWtCRjt1QkFsQk87OztnQkFHZjtXQWVRO1lBZFAsU0FBVSxRQWNIOztnQkFWUixZQUFNO1dBVUU7S0FUSCxRQUFBLEtBQUEsU0FDTTtpQkFRSCxVQVJELEVBQU07OztnQkFHYixZQUFNO1dBS0U7S0FKSCxRQUFBLEtBQUEsV0FDUTtpQkFHTCxVQUhHO0tBQUE7SUFBQTtnQkFFWDtXQUNRO0tBQVAsU0FBTzs7O2dCQTVCWTtHQUluQixlQUFXLEVBQUUiLCJmaWxlIjoiYXQvU2V0L0hhc2gtU2V0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
