"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/q","../../at/Seq/Seq","../../String","../../Type/Type"],(exports,_64_0,_63_1,Seq_2,String_3,Type_4)=>{
	exports._get=_ms.lazy(()=>{
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),_43_43=_ms.get(_$2,"++"),_45_45=_ms.get(_$2,"--"),empty_63=_ms.get(_$2,"empty?"),flat_45map_39=_ms.get(_$2,"flat-map'"),keep=_ms.get(_$2,"keep"),map=_ms.get(_$2,"map"),map_39=_ms.get(_$2,"map'"),_63=_ms.getDefaultExport(_63_1),_$4=_ms.getModule(Seq_2),_63first=_ms.get(_$4,"?first"),tail=_ms.get(_$4,"tail"),_$5=_ms.getModule(String_3),_45_62upper=_ms.get(_$5,"->upper"),_$6=_ms.getModule(Type_4),contains_63=_ms.get(_$6,"contains?");
		const make_45word_45from_45blocks=(()=>{
			const built={};
			const doc=built.doc=`http://rosettacode.org/wiki/ABC_Problem`;
			return _ms.set(function make_45word_45from_45blocks(word,blocks){
				_ms.checkContains(String,word,"word");
				_ms.checkContains(_64,blocks,"blocks");
				const rec=function rec(chars_45left,blocks_45left){
					return (()=>{
						const _=chars_45left;
						if(empty_63(_)){
							return _63([])
						} else {
							const rest_45word=tail(_);
							const this_45char_45blocks=keep(blocks_45left,_=>{
								return contains_63(_,_ms.sub(chars_45left,0))
							});
							return _63first(flat_45map_39(this_45char_45blocks,_=>{
								return map_39(rec(rest_45word,_45_45(blocks_45left,[_])),ans=>{
									return _43_43([_],ans)
								})
							}))
						}
					})()
				};
				return _ms.checkContains(_63,rec(_45_62upper(word),map(blocks,_45_62upper)),"res")
			},built)
		})();
		const name=exports.name=`make-word-from-blocks`;
		exports.default=make_45word_45from_45blocks;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vbWFrZS13b3JkLWZyb20tYmxvY2tzLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBT0Esa0NBQ3NCLEtBQUE7O0dBQXJCLG9CQUFNO2tCQXlDTCxxQ0FBRyxLQUFZLE9BQzBDO3NCQURqRDtzQkFBYztJQUN0QixVQUFPLGFBQUEsYUFBVyxjQUNXO1lBQXZCO01BQUEsUUFBQTtNQUNKLEdBQUEsU0FBTSxHQUNDO2NBQU4sSUFBRTtNQUFBLE9BRUM7T0FBSCxrQkFBWSxLQUFJO09BQ2hCLDJCQUFtQixLQUFLLGNBQWEsR0FDQztlQUFyQyxZQUFVLFVBQUUsYUFBVztPQUFBO2NBRXhCLFNBQVEsY0FBVSxxQkFBa0IsR0FDQztlQUNwQyxPQUFNLElBQUksWUFBVyxPQUFHLGNBQVksQ0FBRSxLQUFPLEtBQ0c7Z0JBQS9DLE9BQUcsQ0FBRSxHQUFJO1FBQUE7T0FBQTtNQUFBO0tBQUE7SUFBQTs2QkFiYixJQWNELElBQUssWUFBUSxNQUFPLElBQUksT0FBTzs7O0VBL0RqQyx3QkFBQTtrQkFPQSIsImZpbGUiOiJtZXRhL2RlbW8vbWFrZS13b3JkLWZyb20tYmxvY2tzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=