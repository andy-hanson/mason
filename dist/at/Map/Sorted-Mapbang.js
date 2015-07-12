"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Kind","../at-Type","./Mapbang","./Map-Type","./Splay-Treebang","../../bang","../../compare","./Map","./Mapbang"],function(exports,Kind_0,_64_45Type_1,Map_33_2,Map_45Type_3,Splay_45Tree_33_4,_33_5,compare_6,Map_7,Map_33_8){
	exports._get=_ms.lazy(function(){
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),self_45kind_33=_ms.get(_$2,"self-kind!"),_$3=_ms.getModule(_64_45Type_1),empty=_ms.get(_$3,"empty"),Map_33=_ms.getDefaultExport(Map_33_2),Map_45Type=_ms.getDefaultExport(Map_45Type_3),Splay_45Tree_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Splay_45Tree_33_4)
		}),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_5)
		}),_$10=_ms.lazyGetModule(compare_6),sorted_63=_ms.lazyProp(_$10,"sorted?"),_$11=_ms.lazyGetModule(Map_7),keys=_ms.lazyProp(_$11,"keys"),_$12=_ms.lazyGetModule(Map_33_8),assoc_33=_ms.lazyProp(_$12,"assoc!");
		const Sorted_45Map_33=Kind(function(){
			const built={};
			const doc=built.doc=`Map! whose \`keys\` are in sorted order.\nThis kind of Map! depends on an efficient \`compare\` between its keys.`;
			const implementor_45test=built["implementor-test"]=function implementor_45test(type){
				const _=empty(type);
				for(let key of [1,3,5,4,2]){
					_ms.unlazy(assoc_33)(_,key,key)
				};
				_ms.unlazy(_33)(_ms.unlazy(sorted_63),_ms.unlazy(keys)(_))
			};
			return _ms.setName(built,"Sorted-Map!")
		}());
		self_45kind_33(Sorted_45Map_33,Map_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,empty,function(){
				return empty(_ms.unlazy(Splay_45Tree_33))
			});
			return built
		}());
		kind_33(Sorted_45Map_33,Map_33);
		const name=exports.name=`Sorted-Map!`;
		exports.default=Sorted_45Map_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9Tb3J0ZWQtTWFwIS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7RUFhQSxzQkFBYSxlQUNJOztHQUFoQixvQkFDQztHQUVELG1EQUFvQiw0QkFBQSxLQUNJO0lBQXZCLFFBQUksTUFBTTtJQUNMLFFBQUEsT0FBTyxDQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FDRzswQkFBakIsRUFBRSxJQUFJO0lBQUE7MkRBQ0E7R0FBQTs7O0VBRWhCLGVBQVcsZ0JBQVkscUJBQ1E7O21CQUE5QixNQUNVLFVBQUE7V0FBVDs7OztFQUVGLFFBQU0sZ0JBQVk7RUEzQmxCLHdCQUFBO2tCQWFBIiwiZmlsZSI6ImF0L01hcC9Tb3J0ZWQtTWFwYmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9