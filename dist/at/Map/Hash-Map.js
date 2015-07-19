"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Function","../../methods","../../Type/Alias-Type","../../Type/Kind","../../Type/Method","../at-Type","./Hash-Mapbang","./Map-Type"],(exports,Function_0,methods_1,Alias_45Type_2,Kind_3,Method_4,_64_45Type_5,Hash_45Map_33_6,Map_45Type_7)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Function_0),thunk=_ms.get(_$2,"thunk"),_$3=_ms.getModule(methods_1),freeze=_ms.get(_$3,"freeze"),Alias_45Type=_ms.getDefaultExport(Alias_45Type_2),_$5=_ms.getModule(Kind_3),self_45kind_33=_ms.get(_$5,"self-kind!"),_$6=_ms.getModule(Method_4),self_45impl_33=_ms.get(_$6,"self-impl!"),_$7=_ms.getModule(_64_45Type_5),empty=_ms.get(_$7,"empty"),Hash_45Map_33=_ms.getDefaultExport(Hash_45Map_33_6),Map_45Type=_ms.getDefaultExport(Map_45Type_7);
		const Hash_45Map=Alias_45Type(()=>{
			const built={};
			const alias_45of=built["alias-of"]=Hash_45Map_33;
			return _ms.setName(built,"Hash-Map")
		}());
		self_45kind_33(Hash_45Map,Map_45Type);
		self_45impl_33(empty,Hash_45Map,thunk(freeze(empty(Hash_45Map_33))));
		const name=exports.name=`Hash-Map`;
		exports.default=Hash_45Map;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9IYXNoLU1hcC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVVBLGlCQUFVLGlCQUNVOztHQUFuQixtQ0FBVTs7O0VBRVgsZUFBVyxXQUFTO0VBQ3BCLGVBQVcsTUFBTSxXQUFVLE1BQU8sT0FBUSxNQUFNO0VBZGhELHdCQUFBO2tCQVVBIiwiZmlsZSI6ImF0L01hcC9IYXNoLU1hcC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9