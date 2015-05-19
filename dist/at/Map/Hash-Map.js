"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Function","../../private/js-impl","../../methods","../../private/bootstrap","../../Type/Alias-Type","../../Type/Kind","../../Type/Method","../at-Type","./Hash-Mapbang","./Mapbang","./Map-Type"],function(exports,Function_0,js_45impl_1,methods_2,bootstrap_3,Alias_45Type_4,Kind_5,Method_6,_64_45Type_7,Hash_45Map_33_8,Map_33_9,Map_45Type_10){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Function_0),thunk=_$2.thunk,_$3=_ms.getModule(js_45impl_1),makeMap=_$3.makeMap,_$4=_ms.getModule(methods_2),freeze=_$4.freeze,_$5=_ms.getModule(bootstrap_3),msDef=_$5.msDef,Alias_45Type=_ms.getDefaultExport(Alias_45Type_4),_$7=_ms.getModule(Kind_5),self_45kind_33=_$7["self-kind!"],_$8=_ms.getModule(Method_6),self_45impl_33=_$8["self-impl!"],_$9=_ms.getModule(_64_45Type_7),empty=_$9.empty,Hash_45Map_33=_ms.getDefaultExport(Hash_45Map_33_8),_$11=_ms.getModule(Map_33_9),assoc_33=_$11["assoc!"],Map_45Type=_ms.getDefaultExport(Map_45Type_10);
		const Hash_45Map=Alias_45Type(function(){
			const alias_45of=Hash_45Map_33;
			return {
				"alias-of":alias_45of,
				name:"Hash-Map"
			}
		}());
		self_45kind_33(Hash_45Map,Map_45Type);
		self_45impl_33(empty,Hash_45Map,thunk(freeze(empty(Hash_45Map_33))));
		msDef("map",function(){
			const args=[].slice.call(arguments,0);
			const hm=empty(Hash_45Map_33);
			makeMap(hm,assoc_33,args);
			return freeze(hm)
		});
		const name=exports.name="Hash-Map";
		exports.default=Hash_45Map;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9IYXNoLU1hcC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWFBLGlCQUFXLHVCQUNVO0dBQXBCLGlCQUFVOzs7Ozs7RUFFWCxlQUFXLFdBQVM7RUFDcEIsZUFBVyxNQUFNLFdBQVUsTUFBTyxPQUFRLE1BQU07RUFHaEQsTUFBTyxNQUFNLFVBQ087O0dBQW5CLFNBQUssTUFBTTtHQUNYLFFBQVEsR0FBRyxTQUFPO1VBQ2xCLE9BQU87RUFBQTtFQXZCUix3QkFBQTtrQkF5QkEiLCJmaWxlIjoiYXQvTWFwL0hhc2gtTWFwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=