"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../at","./../Map/Map","./../Map/Hash-Map","./Set"],(exports,_64_0,Map_1,Hash_45Map_2,Set_3)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(_64_0),_43_43_33=_ms.get(_$0,"++!"),_45_45_33=_ms.get(_$0,"--!"),empty=_ms.get(_$0,"empty"),empty_33=_ms.get(_$0,"empty!"),iterator=_ms.get(_$0,"iterator"),_$1=_ms.getModule(Map_1),_64keys=_ms.get(_$1,"@keys"),Hash_45Map=_ms.getDefaultExport(Hash_45Map_2),Set=_ms.getDefaultExport(Set_3);
		let Hash_45Set=exports.default=(()=>{
			let _=class Hash_45Set{
				static [_ms.symbol(empty)](){
					let _this=this;
					return new (_this)(empty(Hash_45Map))
				}
				constructor(map){
					let _this=this;
					_ms.checkInstance(Hash_45Map,map,"map");
					_ms.newProperty(this,"map",map)
				}
				[_ms.symbol(iterator)](){
					let _this=this;
					return iterator(_64keys(_this.map))
				}
				[_ms.symbol(_43_43_33)](_64added){
					let _this=this;
					for(let _ of _64added){
						_ms.setSub(_this.map,_,true,"mutate")
					}
				}
				[_ms.symbol(_45_45_33)](_64deleted){
					let _this=this;
					for(let _ of _64deleted){
						_ms.del(_this.map,_)
					}
				}
				[_ms.symbol(empty_33)](){
					let _this=this;
					empty_33(_this.map)
				}
			};
			_ms.traitDo(_,Set);
			return _
		})();
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXQvSGFzaC1TZXQubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFNQSwrQkFBZ0I7O0lBS2QsbUJBQUEsU0FDTzs7WUFBTixLQUFJLE9BQU0sTUFBTTtJQUFBO0lBRVIsWUFBQSxJQUNhOzt1QkFEUjs7O0lBR2YsWUFBQSxZQUNVOztZQUFULFNBQVUsUUFBTTs7SUFJakIsWUFBQSxZQUFNLFNBQ007O0tBQVAsUUFBQSxLQUFBLFNBQ007aUJBQVQsVUFBTSxFQUFLOzs7SUFHYixZQUFBLFlBQU0sV0FDUTs7S0FBVCxRQUFBLEtBQUEsV0FDUTtjQUFQLFVBQU07S0FBQTtJQUFBO0lBRVosWUFBQSxZQUNTOztLQUFSLFNBQU87OztpQkExQmEiLCJmaWxlIjoiYXQvU2V0L0hhc2gtU2V0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=