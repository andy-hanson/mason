"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Object","../../show","../../Type/Method","../../Type/Type","../at","./Map","./Weak-Id-Mapbang"],function(exports,Object_0,show_1,Method_2,Type_3,_64_4,Map_5,Weak_45Id_45Map_33_6){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Object_0),flag_63=_$2["flag?"],show=_ms.getDefaultExport(show_1),_$4=_ms.getModule(Method_2),impl_33=_$4["impl!"],_$5=_ms.getModule(Type_3),_61_62=_$5["=>"],type_45of=_$5["type-of"],_$6=_ms.getModule(_64_4),map_39=_$6["map'"],Map=_ms.getDefaultExport(Map_5),Weak_45Id_45Map_33=_ms.getDefaultExport(Weak_45Id_45Map_33_6);
		impl_33(show,Map,function(){
			return _ms.set(function(_,opts){
				const parts=map_39(_,function(pair){
					const _$23=pair,key=_$23.key,val=_$23.val;
					return (((""+_ms.show(show(key,opts)))+" -> ")+_ms.show(show(val,opts)))
				});
				const type=function(){
					if(flag_63(opts,"repr")){
						return show(type_45of(_),opts)
					} else {
						return ""
					}
				}();
				return (((""+_ms.show(type))+"\n\t")+_ms.show(_61_62(String,parts,"\n\t")))
			})
		}());
		const name=exports.name="show-Map";
		exports.default=impl_33(show,Weak_45Id_45Map_33,function(){
			return "<a Weak-Id-Map!>"
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9zaG93LU1hcC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVNBLFFBQU0sS0FBSyxjQUNHO2tCQVNaLFNBQUEsRUFBRSxLQUNJO0lBQ04sWUFBUSxPQUFLLEVBQUcsU0FBQSxLQUNJO0tBQW5CLFdBQVU7WUFDVCxHQUtDLFlBTEEsS0FBSyxJQUFJLHlCQUFVLEtBQUssSUFBSTtJQUFBO0lBQy9CO0tBQ0MsR0FBQSxRQUFNLEtBQU0sUUFDSzthQUFoQixLQUFLLFVBQUEsR0FBUztLQUFBLE9BRVg7YUFBRjtLQUFBO0lBQUE7V0FFRixHQUZFLFlBRUQsd0JBQ0MsT0FBRyxPQUFPLE1BQU87R0FBQTtFQUFBO0VBL0J0Qix3QkFBQTtrQkFpQ0EsUUFBTSxLQUFLLG1CQUNjLFVBQUE7VUFBdkI7RUFBQSIsImZpbGUiOiJhdC9NYXAvc2hvdy1NYXAuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==