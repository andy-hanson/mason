"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Kind","../at","../at-Type","./Map","./Id-Mapbang","./Mapbang","./Hash-Mapbang"],function(exports,Kind_0,_64_1,_64_45Type_2,Map_3,Id_45Map_33_4,Map_33_5,Hash_45Map_33_6){
	exports._get=_ms.lazy(function(){
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),self_45kind_33=_ms.get(_$2,"self-kind!"),_64=_ms.getDefaultExport(_64_1),_64_45Type=_ms.getDefaultExport(_64_45Type_2),_$4=_ms.getModule(_64_45Type_2),empty=_ms.get(_$4,"empty"),from_45stream=_ms.get(_$4,"from-stream"),Map=_ms.getDefaultExport(Map_3),Id_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Id_45Map_33_4)
		}),_$8=_ms.lazyGetModule(Map_33_5),assoc_33=_ms.lazyProp(_$8,"assoc!"),Hash_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Hash_45Map_33_6)
		});
		const Map_45Type=Kind(function(){
			const doc="Any sub-type of Map.";
			return {
				doc:doc,
				name:"Map-Type"
			}
		}());
		self_45kind_33(Map,Map_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,empty,function(){
				return empty(_ms.unlazy(Id_45Map_33))
			});
			return built
		}());
		kind_33(Map_45Type,_64_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,from_45stream,function(){
				const test=function test(){
					const built=new global.Map();
					const m=function(){
						const built=new global.Map();
						_ms.assoc(built,1,2);
						_ms.assoc(built,3,4);
						return built
					}();
					const hm=empty(_ms.unlazy(Hash_45Map_33));
					_ms.unlazy(assoc_33)(hm,1,2);
					_ms.unlazy(assoc_33)(hm,3,4);
					_ms.assoc(built,[_ms.unlazy(Hash_45Map_33),m],hm);
					return built
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
			return built
		}());
		const name=exports.name="Map-Type";
		exports.default=Map_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9NYXAtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7RUFXQSxpQkFBVyxlQUNJO0dBQWQsVUFBTTs7Ozs7O0VBR1AsZUFBVyxJQUFJLHFCQUNROzttQkFBdEIsTUFDVSxVQUFBO1dBQVQ7Ozs7RUFFRixRQUFNLFdBQVMscUJBQ007O21CQUFwQix3QkFDYztJQUFiLFdBQ08sZUFBQTs7S0FDTixrQkFDRzs7c0JBQUYsRUFBSztzQkFDTCxFQUFLOzs7S0FDTixTQUFLOzBCQUNFLEdBQUcsRUFBRTswQkFDTCxHQUFHLEVBQUU7cUJBQ1osMkJBQVksR0FBTzs7O21CQUNuQixTQUFBLEtBQUssT0FDUTt1QkFERDtLQUNaLFVBQU0sTUFBTTtLQUNQLFFBQUEsS0FBQSwwQkFDTTsyQkFDSCxZQUFJLEVBQUUsV0FBRyxFQUFFO0tBQUE7WUFDbkI7SUFBQTs7OztFQW5DSCx3QkFBQTtrQkFxQ0EiLCJmaWxlIjoiYXQvTWFwL01hcC1UeXBlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=