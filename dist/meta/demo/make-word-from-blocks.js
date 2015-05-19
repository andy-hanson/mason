"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/q","../../at/Seq/Seq","../../String","../../Type/Type","../../bang","../../at/at-Type","../../compare"],function(exports,_64_0,_63_1,Seq_2,String_3,Type_4,_33_5,_64_45Type_6,compare_7){
	exports._get=_ms.lazy(function(){
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),_43_43=_$2["++"],_45_45=_$2["--"],empty_63=_$2["empty?"],flat_45map=_$2["flat-map"],keep=_$2.keep,map=_$2.map,_63=_ms.getDefaultExport(_63_1),Seq=_ms.getDefaultExport(Seq_2),_$4=_ms.getModule(Seq_2),_63first=_$4["?first"],tail=_$4.tail,_$5=_ms.getModule(String_3),_45_62upper=_$5["->upper"],_$6=_ms.getModule(Type_4),contains_63=_$6["contains?"],_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_5)
		}),_$9=_ms.lazyGetModule(_64_45Type_6),empty=_ms.lazyProp(_$9,"empty"),_$10=_ms.lazyGetModule(compare_7),_61_63=_ms.lazyProp(_$10,"=?");
		const make_45word_45from_45blocks=exports["make-word-from-blocks"]=function(){
			const doc="http://rosettacode.org/wiki/ABC_Problem";
			return _ms.set(function make_45word_45from_45blocks(word,blocks){
				const rec=function rec(word,blocks){
					return function(){
						const _=word;
						if(empty_63(_)){
							return _63([])
						} else {
							const rest_45word=tail(_);
							const this_45char_45blocks=keep(blocks,function(_){
								return contains_63(_,_ms.sub(word,0))
							});
							return _63first(flat_45map(this_45char_45blocks,function(_){
								return map(rec(rest_45word,_45_45(blocks,[_])),function(ans){
									return _43_43([_],ans)
								})
							}))
						}
					}()
				};
				return rec(_45_62upper(word),map(blocks,_45_62upper))
			},"doc",doc)
		}();
		const name=exports.name="make-word-from-blocks";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vbWFrZS13b3JkLWZyb20tYmxvY2tzLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFXQSw2RUFDc0I7R0FBckIsVUFBTTtrQkFzQ0wscUNBQWdCLEtBQVksT0FDZ0I7SUFBNUMsVUFBTyxhQUFBLEtBQUssT0FDTTs7TUFBWixRQUFBO01BQ0osR0FBQSxTQUFBLEdBQ087Y0FBTixJQUFFO01BQUEsT0FFQztPQUFILGtCQUFZLEtBQUE7T0FDWiwyQkFBbUIsS0FBSyxPQUFRLFNBQUEsRUFDQztlQUFoQyxZQUFVLFVBQUUsS0FBSztPQUFBO2NBQ2xCLFNBQVEsV0FBUyxxQkFBa0IsU0FBQSxFQUNDO2VBQ25DLElBQUssSUFBSSxZQUFXLE9BQUcsT0FBTyxDQUFFLEtBQU8sU0FBQSxJQUNHO2dCQUF6QyxPQUFHLENBQUUsR0FBSTtRQUFBO09BQUE7TUFBQTtLQUFBO0lBQUE7V0FDZCxJQUFLLFlBQVEsTUFBTyxJQUFJLE9BQU87R0FBQTs7RUEvRGpDLHdCQUFBIiwiZmlsZSI6Im1ldGEvZGVtby9tYWtlLXdvcmQtZnJvbS1ibG9ja3MuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==