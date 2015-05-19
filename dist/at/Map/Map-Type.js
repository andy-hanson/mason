"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Function","../../methods","../../Type/Method","../../Type/Kind","../at","../at-Type","./Map","./Hash-Mapbang","./Mapbang"],function(exports,Function_0,methods_1,Method_2,Kind_3,_64_4,_64_45Type_5,Map_6,Hash_45Map_33_7,Map_33_8){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Function_0),identity=_ms.get(_$2,"identity"),_$3=_ms.getModule(methods_1),sub=_ms.get(_$3,"sub"),_$4=_ms.getModule(Method_2),impl_33=_ms.get(_$4,"impl!"),self_45impl_33=_ms.get(_$4,"self-impl!"),Kind=_ms.getDefaultExport(Kind_3),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),self_45kind_33=_ms.get(_$5,"self-kind!"),_64=_ms.getDefaultExport(_64_4),_64_45Type=_ms.getDefaultExport(_64_45Type_5),_$7=_ms.getModule(_64_45Type_5),empty=_ms.get(_$7,"empty"),from_45stream=_ms.get(_$7,"from-stream"),Map=_ms.getDefaultExport(Map_6),Hash_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Hash_45Map_33_7)
		}),_$11=_ms.lazyGetModule(Map_33_8),assoc_33=_ms.lazyProp(_$11,"assoc!");
		const Map_45Type=Kind(function(){
			const doc="Any sub-type of Map.";
			return {
				doc:doc,
				name:"Map-Type"
			}
		}());
		kind_33(Map_45Type,_64_45Type);
		self_45kind_33(Map,Map_45Type);
		self_45impl_33(empty,Map,function(){
			return empty(_ms.unlazy(Hash_45Map_33))
		});
		impl_33(sub,Map_45Type,identity);
		impl_33(from_45stream,Map_45Type,function(){
			const test=function test(){
				const m=function(){
					const _k0=1,_v0=2;
					const _k1=3,_v1=4;
					return _ms.map(_k0,_v0,_k1,_v1)
				}();
				const _k0=[_ms.unlazy(Hash_45Map_33),m],_v0=function(){
					const _k0=1,_v0=2;
					const _k1=3,_v1=4;
					return _ms.map(_k0,_v0,_k1,_v1)
				}();
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(type,stream){
				_ms.checkContains(_64,stream,"stream");
				const map=empty(type);
				for(let _ of stream[Symbol.iterator]()){
					_ms.unlazy(assoc_33)(map,_ms.sub(_,0),_ms.sub(_,1))
				};
				return map
			},"test",test)
		}());
		const name=exports.name="Map-Type";
		exports.default=Map_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9NYXAtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBWUEsaUJBQVcsZUFDSTtHQUFkLFVBQU07Ozs7OztFQUVQLFFBQU0sV0FBUztFQUdmLGVBQVcsSUFBSTtFQUNmLGVBQVcsTUFBTSxJQUNLLFVBQUE7VUFBckI7O0VBRUQsUUFBTSxJQUFJLFdBQVM7RUFFbkIsUUFBTSxjQUFZLHFCQUNRO0dBQXpCLFdBQ08sZUFBQTtJQUNOLGtCQUNHO0tBQUYsVUFBQSxNQUFLO0tBQ0wsVUFBQSxNQUFLOzs7SUFDTixVQUFBLDJCQUFZLGlCQUNNO0tBQWpCLFVBQUEsTUFBSztLQUNMLFVBQUEsTUFBSzs7Ozs7a0JBQ04sU0FBQSxLQUFLLE9BQ1E7c0JBREQ7SUFDWixVQUFNLE1BQU07SUFDUCxRQUFBLEtBQUEsMEJBQ007MEJBQ0gsWUFBSSxFQUFFLFdBQUcsRUFBRTtJQUFBO1dBQ25CO0dBQUE7O0VBdENGLHdCQUFBO2tCQXdDQSIsImZpbGUiOiJhdC9NYXAvTWFwLVR5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==