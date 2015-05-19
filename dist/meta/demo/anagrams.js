"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/at-Type","../../at/Map/Map","../../at/Map/Id-Mapbang","../../at/Map/multi-mapbang","../../compare","../../bang","../../at/Seq/Seq","../../String"],function(exports,_64_0,_64_45Type_1,Map_2,Id_45Map_33_3,multi_45map_33_4,compare_5,_33_6,Seq_7,String_8){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_0),count=_$2.count,keep=_$2.keep,map=_$2.map,_$3=_ms.getModule(_64_45Type_1),empty=_$3.empty,_$4=_ms.getModule(Map_2),values=_$4.values,Id_45Map_33=_ms.getDefaultExport(Id_45Map_33_3),_$6=_ms.getModule(multi_45map_33_4),add_45to_45_64_33=_$6["add-to-@!"],_$7=_ms.getModule(compare_5),_61_63=_$7["=?"],max=_$7.max,sort=_$7.sort,_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_6)
		}),_$10=_ms.lazyGetModule(Seq_7),seq_61_63=_ms.lazyProp(_$10,"seq=?"),_$11=_ms.lazyGetModule(String_8),split_45str=_ms.lazyProp(_$11,"split-str");
		const maximum_45anagram_45sets=exports["maximum-anagram-sets"]=function(){
			const doc="http://rosettacode.org/wiki/Anagrams#JavaScript";
			return _ms.set(function maximum_45anagram_45sets(words){
				const sorted_45_62words=empty(Id_45Map_33);
				for(let _ of _ms.iterator(words)){
					add_45to_45_64_33(sorted_45_62words,sort(_),[_])
				};
				const max_45count=max(map(values(sorted_45_62words),count));
				return keep(values(sorted_45_62words),function(_){
					return _61_63(count(_),max_45count)
				})
			},"doc",doc)
		}();
		const name=exports.name="anagrams";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vYW5hZ3JhbXMubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQVlBLHlFQUNxQjtHQUFwQixVQUFNO2tCQWlCTCxrQ0FBQSxNQUNLO0lBQ0wsd0JBQWdCLE1BQU07SUFDakIsUUFBQSxrQkFBQSxPQUNLO0tBQ1Qsa0JBQVUsa0JBQWMsS0FBQSxHQUFNLENBQUU7SUFBQTtJQUNqQyxrQkFBWSxJQUFLLElBQUssT0FBTyxtQkFBZTtXQUM1QyxLQUFNLE9BQU8sbUJBQWdCLFNBQUEsRUFDQztZQUE3QixPQUFHLE1BQUEsR0FBTztJQUFBO0dBQUE7O0VBdENiLHdCQUFBIiwiZmlsZSI6Im1ldGEvZGVtby9hbmFncmFtcy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9