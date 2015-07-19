"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Kind","../../Type/Type","../at","../at-Type","./Set"],(exports,Kind_0,Type_1,_64_2,_64_45Type_3,Set_4)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),self_45kind_33=_ms.get(_$2,"self-kind!"),_$3=_ms.getModule(Type_1),contains_63=_ms.get(_$3,"contains?"),_$4=_ms.getModule(_64_2),_43_43_33=_ms.get(_$4,"++!"),_45_45_33=_ms.get(_$4,"--!"),count=_ms.get(_$4,"count"),empty_33=_ms.get(_$4,"empty!"),_64_45Type=_ms.getDefaultExport(_64_45Type_3),_$5=_ms.getModule(_64_45Type_3),empty=_ms.get(_$5,"empty"),Set=_ms.getDefaultExport(Set_4);
		const Id_45Set=global.Set;
		self_45kind_33(Id_45Set,_64_45Type,()=>{
			const built=new global.Map();
			_ms.assoc(built,empty,()=>{
				return new Id_45Set()
			});
			return built
		}());
		kind_33(Id_45Set,Set,()=>{
			const built=new global.Map();
			_ms.assoc(built,count,_=>{
				return _.size
			});
			_ms.assoc(built,_43_43_33,(_,_64added)=>{
				for(let em of _64added){
					_.add(em)
				}
			});
			_ms.assoc(built,empty_33,_=>{
				_.clear()
			});
			_ms.assoc(built,_45_45_33,(_,_64deleted)=>{
				for(let em of _64deleted){
					_.delete(em)
				}
			});
			_ms.assoc(built,contains_63,(_,val)=>{
				return _.has(val)
			});
			return built
		}());
		const name=exports.name=`Id-Set`;
		exports.default=Id_45Set;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NldC9JZC1TZXQubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFPQSxlQUFRO0VBRVIsZUFBVyxTQUFPLGVBQ007O21CQUF2QixNQUNVLElBQUE7V0FBVCxJQUFJO0dBQUE7OztFQUVOLFFBQU0sU0FBTyxRQUNHOzttQkFBZixNQUFVLEdBQ0M7V0FBVjs7bUJBRUQsVUFBUyxDQUFBLEVBQUUsV0FDTTtJQUFYLFFBQUEsTUFBTSxTQUNNO0tBQWhCLE1BQU07SUFBQTtHQUFBO21CQUNSLFNBQVksR0FDQztJQUFaOzttQkFFRCxVQUFTLENBQUEsRUFBRSxhQUNRO0lBQWIsUUFBQSxNQUFNLFdBQ1E7S0FBbEIsU0FBUztJQUFBO0dBQUE7bUJBQ1gsWUFBYyxDQUFBLEVBQUUsTUFDRztXQUFsQixNQUFNO0dBQUE7OztFQTNCUix3QkFBQTtrQkFPQSIsImZpbGUiOiJhdC9TZXQvSWQtU2V0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=