"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../control","./../../Type/Pred-Type","./../at","./../at-Type","./Map"],(exports,control_0,Pred_45Type_1,_64_2,_64_45Type_3,Map_4)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(control_0),opr=_ms.get(_$0,"opr"),_$1=_ms.getModule(Pred_45Type_1),Opt=_ms.get(_$1,"Opt"),_64=_ms.getDefaultExport(_64_2),_$2=_ms.getModule(_64_2),_43_43_33=_ms.get(_$2,"++!"),_64_45Type=_ms.getDefaultExport(_64_45Type_3),_$3=_ms.getModule(_64_45Type_3),empty=_ms.get(_$3,"empty"),Map=_ms.getDefaultExport(Map_4),_$4=_ms.getModule(Map_4),get_45or_45add_33=_ms.get(_$4,"get-or-add!");
		const add_45to_45_64_33=exports["add-to-@!"]=function add_45to_45_64_33(map,key,added,_64_45type){
			_ms.checkContains(Map,map,"map");
			_ms.checkContains(_64,added,"added");
			_ms.checkContains(_ms.sub(Opt,_64_45Type),_64_45type,"@-type");
			const _=get_45or_45add_33(map,key,_ms.lazy(()=>(()=>{
				return empty(opr(_64_45type,Array))
			})()));
			return _43_43_33(_,added)
		};
		const group=exports.group=function group(_64value,group_45by){
			_ms.checkContains(_64,_64value,"@value");
			_ms.checkContains(Function,group_45by,"group-by");
			const map=empty(Map);
			for(let _ of _64value){
				const key=group_45by(_);
				add_45to_45_64_33(map,key,[_])
			};
			return map
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvbXVsdGktbWFwLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBT0EsNkNBQVksMkJBQUEsSUFBUSxJQUFJLE1BQVE7cUJBQWhCO3FCQUFjOzZCQUFTLElBQUk7R0FHMUMsUUFBSSxrQkFBWSxJQUFJLGlCQUNLLEtBQUE7V0FBeEIsTUFBTyxJQUFJLFdBQU87R0FBQTtVQUNuQixVQUFJLEVBQUU7RUFBQTtFQUVQLDBCQUFRLGVBQUEsU0FBUztxQkFBRjtxQkFBVztHQUd6QixVQUFNLE1BQU07R0FDUCxRQUFBLEtBQUEsU0FDTTtJQUFWLFVBQU0sV0FBUztJQUNmLGtCQUFVLElBQUksSUFBSSxDQUFDO0dBQUE7VUFDcEI7RUFBQSIsImZpbGUiOiJhdC9NYXAvbXVsdGktbWFwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
