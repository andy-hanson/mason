"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../js","../../Type/Kind","../../Type/Type","../at","../atbang","../at-Type","./Setbang"],function(exports,js_0,Kind_1,Type_2,_64_3,_64_33_4,_64_45Type_5,Set_33_6){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),_new=_ms.get(_$2,"new"),_$3=_ms.getModule(Kind_1),kind_33=_ms.get(_$3,"kind!"),self_45kind_33=_ms.get(_$3,"self-kind!"),_$4=_ms.getModule(Type_2),contains_63=_ms.get(_$4,"contains?"),_$5=_ms.getModule(_64_3),count=_ms.get(_$5,"count"),_$6=_ms.getModule(_64_33_4),_43_43_33=_ms.get(_$6,"++!"),_45_45_33=_ms.get(_$6,"--!"),empty_33=_ms.get(_$6,"empty!"),_64_45Type=_ms.getDefaultExport(_64_45Type_5),_$7=_ms.getModule(_64_45Type_5),empty=_ms.get(_$7,"empty"),Set_33=_ms.getDefaultExport(Set_33_6);
		const Id_45Set_33=global.Set;
		self_45kind_33(Id_45Set_33,_64_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,empty,function(){
				return _new(Id_45Set_33)
			});
			return built
		}());
		kind_33(Id_45Set_33,Set_33,function(){
			const built=new global.Map();
			_ms.assoc(built,count,function(_){
				return _.size
			});
			_ms.assoc(built,_43_43_33,function(_,_64added){
				for(let em of _64added[Symbol.iterator]()){
					_.add(em)
				}
			});
			_ms.assoc(built,empty_33,function(_){
				_.clear()
			});
			_ms.assoc(built,_45_45_33,function(_,_64deleted){
				for(let em of _64deleted[Symbol.iterator]()){
					_.delete(em)
				}
			});
			_ms.assoc(built,contains_63,function(_,val){
				return _.has(val)
			});
			return built
		}());
		const name=exports.name="Id-Set!";
		exports.default=Id_45Set_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NldC9JZC1TZXQhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBU0Esa0JBQVU7RUFFVixlQUFXLFlBQVEscUJBQ007O21CQUF4QixNQUNVLFVBQUE7V0FBVCxLQUFJO0dBQUE7OztFQUVOLFFBQU0sWUFBUSxpQkFDSTs7bUJBQWpCLE1BQVUsU0FBQSxFQUNDO1dBQVY7O21CQUVELFVBQVMsU0FBQSxFQUFFLFNBQ007SUFBWCxRQUFBLE1BQU0sNEJBQ007S0FBaEIsTUFBTTtJQUFBO0dBQUE7bUJBQ1IsU0FBWSxTQUFBLEVBQ0M7SUFBWjs7bUJBRUQsVUFBUyxTQUFBLEVBQUUsV0FDUTtJQUFiLFFBQUEsTUFBTSw4QkFDUTtLQUFsQixTQUFTO0lBQUE7R0FBQTttQkFDWCxZQUFjLFNBQUEsRUFBRSxJQUNHO1dBQWxCLE1BQU07R0FBQTs7O0VBN0JSLHdCQUFBO2tCQStCQSIsImZpbGUiOiJhdC9TZXQvSWQtU2V0YmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9