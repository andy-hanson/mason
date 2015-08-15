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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvQC9TZXQvSGFzaC1TZXQubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFTQSxpQkFDZSxLQU1YO1NBREg7dUJBS0MsU0FDTztXQXFCQTtZQXJCTixLQXFCTSxPQXJCSSxNQUFNO0lBQUE7Z0JBR1AsSUFDRztxQkFBYixXQUFPO0lBQUE7Z0JBRVIsWUFDVTtXQWNGO1lBZFAsU0FBVSxLQWNIOztnQkFWUixZQUFNLFNBQ007V0FTSjtLQVRGLFFBQUEsS0FBQSxTQUNNO01BQVYsU0FRTSxVQVJNLEVBQUU7S0FBQTtJQUFBO2dCQUdoQixZQUFNLFdBQ1E7V0FJTjtLQUpGLFFBQUEsS0FBQSxXQUNRO01BQVosY0FHTSxVQUhTO0tBQUE7SUFBQTtnQkFFakIsWUFDUztXQUFEO0tBQVAsU0FBTzs7O0dBMUJQLGVBQVcsRUFBRTtHQUNiLFFBQU0sRUFBRTtVQUZUO0VBQUE7RUFmRCx3QkFBQTtrQkFTQSIsImZpbGUiOiJhdC9TZXQvSGFzaC1TZXQuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==