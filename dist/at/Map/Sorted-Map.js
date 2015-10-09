"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Method","../../Type/Kind","../at-Type","./Map","./Splay-Tree"],(exports,Method_0,Kind_1,_64_45Type_2,Map_3,Splay_45Tree_4)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(Method_0),self_45impl_33=_ms.get(_$0,"self-impl!"),Kind=_ms.getDefaultExport(Kind_1),_$1=_ms.getModule(Kind_1),kind_33=_ms.get(_$1,"kind!"),_$2=_ms.getModule(_64_45Type_2),empty=_ms.get(_$2,"empty"),Map=_ms.getDefaultExport(Map_3),Splay_45Tree=_ms.lazy(()=>_ms.getDefaultExport(Splay_45Tree_4));
		const Sorted_45Map=exports.default=new (Kind)((()=>{
			const built={};
			built[`name`]="Sorted-Map";
			return built
		})());
		kind_33(Sorted_45Map,Map);
		self_45impl_33(empty,Sorted_45Map,()=>{
			return empty(_ms.unlazy(Splay_45Tree))
		});
		const name=exports.name=`Sorted-Map`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvU29ydGVkLU1hcC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVFBLG1DQUFZLEtBQUksTUFDSSxLQUFBOztTQUVuQixRQUFBOzs7RUFFRCxRQUFNLGFBQVc7RUFFakIsZUFBVyxNQUFNLGFBQ1ksSUFBQTtVQUE1Qjs7RUFoQkQsd0JBQUEiLCJmaWxlIjoiYXQvTWFwL1NvcnRlZC1NYXAuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
