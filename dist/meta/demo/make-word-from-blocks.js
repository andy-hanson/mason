"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/q","../../at/Seq/Seq","../../String","../../Type/Type"],function(exports,_64_0,_63_1,Seq_2,String_3,Type_4){
	exports._get=_ms.lazy(function(){
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),_43_43=_ms.get(_$2,"++"),_45_45=_ms.get(_$2,"--"),empty_63=_ms.get(_$2,"empty?"),flat_45map=_ms.get(_$2,"flat-map"),keep=_ms.get(_$2,"keep"),map=_ms.get(_$2,"map"),_63=_ms.getDefaultExport(_63_1),Seq=_ms.getDefaultExport(Seq_2),_$4=_ms.getModule(Seq_2),_63first=_ms.get(_$4,"?first"),tail=_ms.get(_$4,"tail"),_$5=_ms.getModule(String_3),_45_62upper=_ms.get(_$5,"->upper"),_$6=_ms.getModule(Type_4),contains_63=_ms.get(_$6,"contains?");
		const make_45word_45from_45blocks=function(){
			const built={};
			const doc=built.doc="http://rosettacode.org/wiki/ABC_Problem";
			return _ms.set(function make_45word_45from_45blocks(word,blocks){
				_ms.checkContains(String,word,"word");
				_ms.checkContains(_ms.sub(_64,String),blocks,"blocks");
				const rec=function rec(chars_45left,blocks_45left){
					return function(){
						const _=chars_45left;
						if(_ms.bool(empty_63(_))){
							return _63([])
						} else {
							const rest_45word=tail(_);
							const this_45char_45blocks=keep(blocks_45left,function(_){
								return contains_63(_,_ms.sub(chars_45left,0))
							});
							return _63first(flat_45map(this_45char_45blocks,function(_){
								return map(rec(rest_45word,_45_45(blocks_45left,[_])),function(ans){
									return _43_43([_],ans)
								})
							}))
						}
					}()
				};
				return _ms.checkContains(_ms.sub(_63,_ms.sub(Seq,String)),rec(_45_62upper(word),map(blocks,_45_62upper)),"res")
			},built)
		}();
		const name=exports.name="make-word-from-blocks";
		exports.default=make_45word_45from_45blocks;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vbWFrZS13b3JkLWZyb20tYmxvY2tzLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBT0EsNENBQ3NCOztHQUFyQixvQkFBTTtrQkF5Q0wscUNBQWdCLEtBQVksT0FDZ0I7c0JBRHZCOzhCQUFjLElBQUU7SUFDckMsVUFBTyxhQUFBLGFBQVcsY0FDVzs7TUFBdkIsUUFBQTtNQUNKLFlBQUEsU0FBTSxJQUNDO2NBQU4sSUFBRTtNQUFBLE9BRUM7T0FBSCxrQkFBWSxLQUFJO09BQ2hCLDJCQUFtQixLQUFLLGNBQWEsU0FBQSxFQUNDO2VBQXJDLFlBQVUsVUFBRSxhQUFXO09BQUE7Y0FDeEIsU0FBUSxXQUFTLHFCQUFrQixTQUFBLEVBQ0M7ZUFDbkMsSUFBSyxJQUFJLFlBQVcsT0FBRyxjQUFZLENBQUUsS0FBTyxTQUFBLElBQ0c7Z0JBQTlDLE9BQUcsQ0FBRSxHQUFJO1FBQUE7T0FBQTtNQUFBO0tBQUE7SUFBQTtxQ0FaYixZQUFFLElBQUksU0FhUCxJQUFLLFlBQVEsTUFBTyxJQUFJLE9BQU87OztFQTlEakMsd0JBQUE7a0JBT0EiLCJmaWxlIjoibWV0YS9kZW1vL21ha2Utd29yZC1mcm9tLWJsb2Nrcy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9