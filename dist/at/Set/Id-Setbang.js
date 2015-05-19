"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../js","../../Type/Kind","../../Type/Type","../at","../atbang","../at-Type","./Setbang"],function(exports,js_0,Kind_1,Type_2,_64_3,_64_33_4,_64_45Type_5,Set_33_6){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),_new=_$2.new,_$3=_ms.getModule(Kind_1),kind_33=_$3["kind!"],self_45kind_33=_$3["self-kind!"],_$4=_ms.getModule(Type_2),contains_63=_$4["contains?"],_$5=_ms.getModule(_64_3),count=_$5.count,iterator=_$5.iterator,_$6=_ms.getModule(_64_33_4),_43_43_33=_$6["++!"],_45_45_33=_$6["--!"],empty_33=_$6["empty!"],_64_45Type=_ms.getDefaultExport(_64_45Type_5),_$7=_ms.getModule(_64_45Type_5),empty=_$7.empty,Set_33=_ms.getDefaultExport(Set_33_6);
		const Id_45Set_33=global.Set;
		self_45kind_33(Id_45Set_33,_64_45Type,function(){
			const _k0=empty,_v0=function(){
				return _new(Id_45Set_33)
			};
			return _ms.map(_k0,_v0)
		}());
		kind_33(Id_45Set_33,Set_33,function(){
			const _k0=count,_v0=function(_){
				return _.size
			};
			const _k1=_43_43_33,_v1=function(_,_64added){
				for(let em of _ms.iterator(_64added)){
					_.add(em)
				}
			};
			const _k2=empty_33,_v2=function(_){
				return _.clear()
			};
			const _k3=_45_45_33,_v3=function(_,_64deleted){
				for(let em of _ms.iterator(_64deleted)){
					_.delete(em)
				}
			};
			const _k4=iterator,_v4=function(_){
				return _.keys()
			};
			const _k5=contains_63,_v5=function(_,val){
				return _.has(val)
			};
			return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4,_k5,_v5)
		}());
		const name=exports.name="Id-Set!";
		exports.default=Id_45Set_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NldC9JZC1TZXQhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBU0Esa0JBQVU7RUFFVixlQUFXLFlBQVEscUJBQ007R0FBeEIsVUFBQSxVQUNVLFVBQUE7V0FBVCxLQUFJO0dBQUE7OztFQUVOLFFBQU0sWUFBUSxpQkFDSTtHQUFqQixVQUFBLFVBQVUsU0FBQSxFQUNDO1dBQVY7O0dBRUQsVUFBQSxjQUFRLFNBQUEsRUFBRSxTQUNNO0lBQVYsUUFBQSxtQkFBTSxVQUNNO0tBQWhCLE1BQU07SUFBQTtHQUFBO0dBQ1IsVUFBQSxhQUFXLFNBQUEsRUFDQztXQUFYOztHQUVELFVBQUEsY0FBUSxTQUFBLEVBQUUsV0FDUTtJQUFaLFFBQUEsbUJBQU0sWUFDUTtLQUFsQixTQUFTO0lBQUE7R0FBQTtHQUNYLFVBQUEsYUFBYSxTQUFBLEVBQ0M7V0FDYjs7R0FDRCxVQUFBLGdCQUFjLFNBQUEsRUFBRSxJQUNHO1dBQWxCLE1BQU07R0FBQTs7O0VBaENSLHdCQUFBO2tCQWtDQSIsImZpbGUiOiJhdC9TZXQvSWQtU2V0YmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9