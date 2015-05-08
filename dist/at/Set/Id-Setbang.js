"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../js","../../Type/Kind","../../Type/Type","../at","../atbang","../at-Type","./Setbang"],function(exports,js_0,Kind_1,Type_2,_64_3,_64_33_4,_64_45Type_5,Set_33_6){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),_new=_ms.get(_$2,"new"),_$3=_ms.getModule(Kind_1),kind_33=_ms.get(_$3,"kind!"),self_45kind_33=_ms.get(_$3,"self-kind!"),_$4=_ms.getModule(Type_2),contains_63=_ms.get(_$4,"contains?"),_$5=_ms.getModule(_64_3),count=_ms.get(_$5,"count"),each_33=_ms.get(_$5,"each!"),iterator=_ms.get(_$5,"iterator"),_$6=_ms.getModule(_64_33_4),_43_43_33=_ms.get(_$6,"++!"),_45_45_33=_ms.get(_$6,"--!"),empty_33=_ms.get(_$6,"empty!"),_64_45Type=_ms.getDefaultExport(_64_45Type_5),_$7=_ms.getModule(_64_45Type_5),empty=_ms.get(_$7,"empty"),Set_33=_ms.getDefaultExport(Set_33_6);
		const exports={};
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
			const _k1=_43_43_33,_v1=function(_,addeds){
				return each_33(addeds,function(added){
					return _.add(added)
				})
			};
			const _k2=empty_33,_v2=function(_){
				return _.clear(null)
			};
			const _k3=_45_45_33,_v3=function(_,deleteds){
				return each_33(deleteds,function(deleted){
					return _.delete(deleted)
				})
			};
			const _k4=iterator,_v4=function(_){
				return _.keys(null)
			};
			const _k5=contains_63,_v5=function(_,val){
				return _.has(val)
			};
			return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4,_k5,_v5)
		}());
		exports.default=Id_45Set_33;
		const displayName=exports.displayName="Id-Set!";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NldC9JZC1TZXQhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztpQ0FTQTs7O0VBQUEsa0JBQVU7RUFFVixlQUFXLFlBQVEscUJBQU07R0FDeEIsVUFBQSxVQUFVLFVBQUE7V0FDVCxLQUFJO0dBQUE7OztFQUVOLFFBQU0sWUFBUSxpQkFBSTtHQUNqQixVQUFBLFVBQVUsU0FBQSxFQUFDO1dBQ1Y7O0dBQ0QsVUFBQSxjQUFRLFNBQUEsRUFBRSxPQUFNO1dBQ2YsUUFBTSxPQUFRLFNBQUEsTUFBSztZQUNsQixNQUFNO0lBQUE7R0FBQTtHQUNSLFVBQUEsYUFBVyxTQUFBLEVBQUM7V0FDWCxRQUFRO0dBQUE7R0FDVCxVQUFBLGNBQVEsU0FBQSxFQUFFLFNBQVE7V0FDakIsUUFBTSxTQUFVLFNBQUEsUUFBTztZQUN0QixTQUFTO0lBQUE7R0FBQTtHQUNYLFVBQUEsYUFBYSxTQUFBLEVBQUM7V0FFYixPQUFPO0dBQUE7R0FDUixVQUFBLGdCQUFjLFNBQUEsRUFBRSxJQUFHO1dBQ2xCLE1BQU07R0FBQTs7O2tCQUVSO0VBaENBLHNDQUFBIiwiZmlsZSI6ImF0L1NldC9JZC1TZXRiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=