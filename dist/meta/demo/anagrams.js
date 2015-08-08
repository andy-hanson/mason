"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/at-Type","../../at/Map/Map","../../at/Map/Id-Map","../../at/Map/multi-map","../../compare","../../at/Seq/Seq","../../String"],(exports,_64_0,_64_45Type_1,Map_2,Id_45Map_3,multi_45map_4,compare_5,Seq_6,String_7)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(_64_0),count=_ms.get(_$2,"count"),keep=_ms.get(_$2,"keep"),map=_ms.get(_$2,"map"),_$3=_ms.getModule(_64_45Type_1),empty=_ms.get(_$3,"empty"),_$4=_ms.getModule(Map_2),values=_ms.get(_$4,"values"),Id_45Map=_ms.getDefaultExport(Id_45Map_3),_$6=_ms.getModule(multi_45map_4),add_45to_45_64_33=_ms.get(_$6,"add-to-@!"),_$7=_ms.getModule(compare_5),_61_63=_ms.get(_$7,"=?"),max=_ms.get(_$7,"max"),sort=_ms.get(_$7,"sort"),_$9=_ms.lazyGetModule(Seq_6),seq_61_63=_ms.lazyProp(_$9,"seq=?"),_$10=_ms.lazyGetModule(String_7),split_45str=_ms.lazyProp(_$10,"split-str");
		const maximum_45anagram_45sets=exports["maximum-anagram-sets"]=(()=>{
			const built={};
			const doc=built.doc=`http://rosettacode.org/wiki/Anagrams#JavaScript`;
			const test=built.test=function test(){
				const words=_ms.unlazy(split_45str)(RegExp(`\\s`),`abel able bale bela elba\nalger glare lager large regal\nangel angle galen glean lange\ncaret carte cater crate trace\nelan lane lean lena neal\nevil levi live veil vile\nrandom words to prove it's doing work`);
				_ms.assert(_ms.unlazy(seq_61_63),maximum_45anagram_45sets(words),(()=>{
					const built=[];
					_ms.add(built,[`abel`,`able`,`bale`,`bela`,`elba`]);
					_ms.add(built,[`alger`,`glare`,`lager`,`large`,`regal`]);
					_ms.add(built,[`angel`,`angle`,`galen`,`glean`,`lange`]);
					_ms.add(built,[`caret`,`carte`,`cater`,`crate`,`trace`]);
					_ms.add(built,[`elan`,`lane`,`lean`,`lena`,`neal`]);
					_ms.add(built,[`evil`,`levi`,`live`,`veil`,`vile`]);
					return built
				})())
			};
			return _ms.set(function maximum_45anagram_45sets(words){
				const sorted_45_62words=empty(Id_45Map);
				for(let _ of words){
					add_45to_45_64_33(sorted_45_62words,sort(_),[_])
				};
				const max_45count=max(map(values(sorted_45_62words),count));
				return keep(values(sorted_45_62words),_=>{
					return _61_63(count(_),max_45count)
				})
			},built)
		})();
		const name=exports.name=`anagrams`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vYW5hZ3JhbXMubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFXQSwrREFDcUIsS0FBQTs7R0FBcEIsb0JBQU07R0FDTixzQkFDUSxlQUFBO0lBQVAsb0NBQW1CLE9BQVEsT0FDMUI7cUNBT2MseUJBQXFCLE9BQ00sS0FBQTs7bUJBQXZDLENBQUcsT0FBTyxPQUFPLE9BQU8sT0FBTzttQkFDL0IsQ0FBRyxRQUFRLFFBQVEsUUFBUSxRQUFRO21CQUNuQyxDQUFHLFFBQVEsUUFBUSxRQUFRLFFBQVE7bUJBQ25DLENBQUcsUUFBUSxRQUFRLFFBQVEsUUFBUTttQkFDbkMsQ0FBRyxPQUFPLE9BQU8sT0FBTyxPQUFPO21CQUMvQixDQUFHLE9BQU8sT0FBTyxPQUFPLE9BQU87Ozs7a0JBQ2xDLGtDQUFBLE1BQ0s7SUFDTCx3QkFBZ0IsTUFBTTtJQUNqQixRQUFBLEtBQUEsTUFDSztLQUNULGtCQUFVLGtCQUFjLEtBQUksR0FBRSxDQUFFO0lBQUE7SUFDakMsa0JBQVksSUFBSyxJQUFLLE9BQU8sbUJBQWU7V0FDNUMsS0FBTSxPQUFPLG1CQUFnQixHQUNDO1lBQTdCLE9BQUcsTUFBSyxHQUFFO0lBQUE7R0FBQTs7RUFyQ2Isd0JBQUEiLCJmaWxlIjoibWV0YS9kZW1vL2FuYWdyYW1zLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=