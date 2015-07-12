"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Kind","../../Type/Type","../at","../atbang","../at-Type","./Setbang"],function(exports,Kind_0,Type_1,_64_2,_64_33_3,_64_45Type_4,Set_33_5){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),self_45kind_33=_ms.get(_$2,"self-kind!"),_$3=_ms.getModule(Type_1),contains_63=_ms.get(_$3,"contains?"),_$4=_ms.getModule(_64_2),count=_ms.get(_$4,"count"),_$5=_ms.getModule(_64_33_3),_43_43_33=_ms.get(_$5,"++!"),_45_45_33=_ms.get(_$5,"--!"),empty_33=_ms.get(_$5,"empty!"),_64_45Type=_ms.getDefaultExport(_64_45Type_4),_$6=_ms.getModule(_64_45Type_4),empty=_ms.get(_$6,"empty"),Set_33=_ms.getDefaultExport(Set_33_5);
		const Id_45Set_33=global.Set;
		self_45kind_33(Id_45Set_33,_64_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,empty,function(){
				return new Id_45Set_33()
			});
			return built
		}());
		kind_33(Id_45Set_33,Set_33,function(){
			const built=new global.Map();
			_ms.assoc(built,count,function(_){
				return _.size
			});
			_ms.assoc(built,_43_43_33,function(_,_64added){
				for(let em of _64added){
					_.add(em)
				}
			});
			_ms.assoc(built,empty_33,function(_){
				_.clear()
			});
			_ms.assoc(built,_45_45_33,function(_,_64deleted){
				for(let em of _64deleted){
					_.delete(em)
				}
			});
			_ms.assoc(built,contains_63,function(_,val){
				return _.has(val)
			});
			return built
		}());
		const name=exports.name=`Id-Set!`;
		exports.default=Id_45Set_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NldC9JZC1TZXQhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBUUEsa0JBQVM7RUFFVCxlQUFXLFlBQVEscUJBQ007O21CQUF4QixNQUNVLFVBQUE7V0FBVCxJQUFJO0dBQUE7OztFQUVOLFFBQU0sWUFBUSxpQkFDSTs7bUJBQWpCLE1BQVUsU0FBQSxFQUNDO1dBQVY7O21CQUVELFVBQVMsU0FBQSxFQUFFLFNBQ007SUFBWCxRQUFBLE1BQU0sU0FDTTtLQUFoQixNQUFNO0lBQUE7R0FBQTttQkFDUixTQUFZLFNBQUEsRUFDQztJQUFaOzttQkFFRCxVQUFTLFNBQUEsRUFBRSxXQUNRO0lBQWIsUUFBQSxNQUFNLFdBQ1E7S0FBbEIsU0FBUztJQUFBO0dBQUE7bUJBQ1gsWUFBYyxTQUFBLEVBQUUsSUFDRztXQUFsQixNQUFNO0dBQUE7OztFQTVCUix3QkFBQTtrQkFRQSIsImZpbGUiOiJhdC9TZXQvSWQtU2V0YmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9