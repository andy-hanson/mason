"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Method","../../Type/Kind","../at-Type","./Map","./Splay-Tree","../../compare","./Map"],(exports,Method_0,Kind_1,_64_45Type_2,Map_3,Splay_45Tree_4,compare_5,Map_6)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Method_0),self_45impl_33=_ms.get(_$2,"self-impl!"),Kind=_ms.getDefaultExport(Kind_1),_$3=_ms.getModule(Kind_1),kind_33=_ms.get(_$3,"kind!"),_$4=_ms.getModule(_64_45Type_2),empty=_ms.get(_$4,"empty"),Map=_ms.getDefaultExport(Map_3),Splay_45Tree=_ms.lazy(()=>{
			return _ms.getDefaultExport(Splay_45Tree_4)
		}),_$9=_ms.lazyGetModule(compare_5),sorted_63=_ms.lazyProp(_$9,"sorted?"),_$10=_ms.lazyGetModule(Map_6),assoc_33=_ms.lazyProp(_$10,"assoc!"),keys=_ms.lazyProp(_$10,"keys");
		const Sorted_45Map=new (Kind)(()=>{
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
		kind_33(Sorted_45Map,Map);
		self_45impl_33(empty,Sorted_45Map,()=>{
			return empty(_ms.unlazy(Splay_45Tree))
		});
		const name=exports.name=`Sorted-Map`;
		exports.default=Sorted_45Map;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9Tb3J0ZWQtTWFwLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFXQSxtQkFBWSxLQUFJLFVBQ0k7O0dBQW5CLG9CQUNDO0dBR0QsbURBQW9CLDRCQUFBLEtBQ0k7SUFBdkIsUUFBSSxNQUFNO0lBQ0wsUUFBQSxPQUFPLENBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUNHOzBCQUFqQixFQUFFLElBQUk7SUFBQTtzREFDTTtHQUFBOzs7RUFFdEIsUUFBTSxhQUFXO0VBRWpCLGVBQVcsTUFBTSxhQUNZLElBQUE7VUFBNUI7O0VBekJELHdCQUFBO2tCQVdBIiwiZmlsZSI6ImF0L01hcC9Tb3J0ZWQtTWFwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=