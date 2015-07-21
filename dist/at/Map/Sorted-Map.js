"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Kind","../../Type/Method","../at-Type","./Map","./Map-Type","./Splay-Tree","../../compare","./Map"],(exports,Kind_0,Method_1,_64_45Type_2,Map_3,Map_45Type_4,Splay_45Tree_5,compare_6,Map_7)=>{
	exports._get=_ms.lazy(()=>{
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),self_45kind_33=_ms.get(_$2,"self-kind!"),_$3=_ms.getModule(Method_1),self_45impl_33=_ms.get(_$3,"self-impl!"),_$4=_ms.getModule(_64_45Type_2),empty=_ms.get(_$4,"empty"),Map=_ms.getDefaultExport(Map_3),Map_45Type=_ms.getDefaultExport(Map_45Type_4),Splay_45Tree=_ms.lazy(()=>{
			return _ms.getDefaultExport(Splay_45Tree_5)
		}),_$10=_ms.lazyGetModule(compare_6),sorted_63=_ms.lazyProp(_$10,"sorted?"),_$11=_ms.lazyGetModule(Map_7),assoc_33=_ms.lazyProp(_$11,"assoc!"),keys=_ms.lazyProp(_$11,"keys");
		const Sorted_45Map=Kind(()=>{
			const built={};
			const doc=built.doc=`Map whose \`keys\` are in sorted order.\nThis kind of Map depends on an efficient \`compare\` between its keys.`;
			const implementor_45test=built["implementor-test"]=function implementor_45test(type){
				const _=empty(type);
				for(let key of [1,3,5,4,2]){
					_ms.unlazy(assoc_33)(_,key,key)
				};
				_ms.assert(_ms.unlazy(sorted_63),_ms.unlazy(keys)(_))
			};
			return _ms.setName(built,"Sorted-Map")
		}());
		self_45kind_33(Sorted_45Map,Map_45Type);
		self_45impl_33(empty,Sorted_45Map,()=>{
			return empty(_ms.unlazy(Splay_45Tree))
		});
		kind_33(Sorted_45Map,Map);
		const name=exports.name=`Sorted-Map`;
		exports.default=Sorted_45Map;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9Tb3J0ZWQtTWFwLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFZQSxtQkFBWSxTQUNJOztHQUFmLG9CQUNDO0dBRUQsbURBQW9CLDRCQUFBLEtBQ0k7SUFBdkIsUUFBSSxNQUFNO0lBQ0wsUUFBQSxPQUFPLENBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUNHOzBCQUFqQixFQUFFLElBQUk7SUFBQTtzREFDTTtHQUFBOzs7RUFFdEIsZUFBVyxhQUFXO0VBQ3RCLGVBQVcsTUFBTSxhQUNZLElBQUE7VUFBNUI7O0VBRUQsUUFBTSxhQUFXO0VBMUJqQix3QkFBQTtrQkFZQSIsImZpbGUiOiJhdC9NYXAvU29ydGVkLU1hcC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9