"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/atbang","../../at/at-Type","../../at/Seq/Arraybang","../../at/Seq/Range","../../at/Seq/Seqbang","../../at/Seq/Stream","../../at/Set/Id-Setbang","../../Boolean","../../control","../../js","../../math/Number","../../math/methods","../../Type/Type","../../bang","../../at/Seq/Seq"],function(exports,_64_0,_64_33_1,_64_45Type_2,Array_33_3,Range_4,Seq_33_5,Stream_6,Id_45Set_33_7,Boolean_8,control_9,js_10,Number_11,methods_12,Type_13,_33_14,Seq_15){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_0),fold=_$2.fold,keep=_$2.keep,map=_$2.map,map_39=_$2["map'"],_$3=_ms.getModule(_64_33_1),_43_43_33=_$3["++!"],_$4=_ms.getModule(_64_45Type_2),empty=_$4.empty,Array_33=_ms.getDefaultExport(Array_33_3),_$6=_ms.getModule(Range_4),range=_$6.range,_$7=_ms.getModule(Seq_33_5),set_45nth_33=_$7["set-nth!"],Stream=_ms.getDefaultExport(Stream_6),Id_45Set_33=_ms.getDefaultExport(Id_45Set_33_7),_$10=_ms.getModule(Boolean_8),and=_$10.and,not=_$10.not,_$11=_ms.getModule(control_9),returning=_$11.returning,_$12=_ms.getModule(js_10),defined_63=_$12["defined?"],js_45sub=_$12["js-sub"],_$13=_ms.getModule(Number_11),infinity=_$13.infinity,Nat=_$13.Nat,square=_$13.square,_$14=_ms.getModule(methods_12),_43=_$14["+"],_$15=_ms.getModule(Type_13),contains_63=_$15["contains?"],_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_14)
		}),_$18=_ms.lazyGetModule(Seq_15),seq_61_63=_ms.lazyProp(_$18,"seq=?"),take_39=_ms.lazyProp(_$18,"take'");
		const digits=function digits(_){
			return map_39(_.toString(10),Number.parseInt)
		};
		const step=function(){
			return function(_){
				return fold(map(digits(_),square),0,_43)
			}
		}();
		const cache=empty(Array_33);
		set_45nth_33(cache,1,true);
		const happy_63=exports["happy?"]=function(){
			const doc="http://rosettacode.org/wiki/Happy_numbers";
			return _ms.set(function happy_63(n){
				const stepped_45through=empty(Id_45Set_33);
				const loop=function loop(cur){
					return function(){
						const _=js_45sub(cache,cur);
						if(defined_63(_)){
							return _
						} else {
							return and(not(contains_63(stepped_45through,cur)),_ms.lazy(function(){
								return function(){
									_43_43_33(stepped_45through,[cur]);
									return loop(step(cur))
								}()
							}))
						}
					}()
				};
				return returning(loop(n),function(ans){
					for(let _ of _ms.iterator(stepped_45through)){
						set_45nth_33(cache,_,ans)
					};
					return set_45nth_33(cache,n,ans)
				})
			},"doc",doc)
		}();
		const happy_45numbers=exports["happy-numbers"]=function(){
			const doc="Stream of all happy numbers.";
			return _ms.set(keep(range(1,infinity),happy_63),"doc",doc,"name","happy-numbers")
		}();
		const name=exports.name="happy-numbers";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vaGFwcHktbnVtYmVycy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBbUJBLGFBQVUsZ0JBQUEsRUFDSztVQUNkLE9BQU0sV0FBVyxJQUFJOztFQUV0QixxQkFDTTtVQUFKLFNBQUssRUFDSztXQUFWLEtBQU0sSUFBSSxPQUFBLEdBQVEsUUFBUSxFQUFFO0dBQUE7RUFBQTtFQUU5QixZQUFRLE1BQU07RUFDZCxhQUFTLE1BQU0sRUFBRTtFQUVqQiwyQ0FDTztHQUFOLFVBQU07a0JBQ0wsa0JBQUEsRUFDSztJQUFMLHdCQUFrQixNQUFNO0lBQ3hCLFdBQVEsY0FBQSxJQUNHOztNQUFMLFFBQUEsU0FBTyxNQUFNO01BQ2pCLEdBQUEsV0FBQSxHQUNTO2NBQVI7TUFBQSxPQUVHO2NBQUgsSUFBSyxJQUFLLFlBQVUsa0JBQWdCO3lCQUNPO1NBQzFDLFVBQUksa0JBQWdCLENBQUU7Z0JBQ3RCLEtBQU0sS0FBSztRQUFBO09BQUE7TUFBQTtLQUFBO0lBQUE7V0FDZixVQUFXLEtBQUssR0FBSSxTQUFBLElBQ0c7S0FBakIsUUFBQSxrQkFBQSxtQkFDZTtNQUFuQixhQUFTLE1BQU0sRUFBRTtLQUFBO1lBQ2xCLGFBQVMsTUFBTSxFQUFFO0lBQUE7R0FBQTs7RUFFcEIseURBQzBCO0dBQXpCLFVBQU07a0JBV04sS0FBTSxNQUFNLEVBQUUsVUFBVTs7RUE1RHpCLHdCQUFBIiwiZmlsZSI6Im1ldGEvZGVtby9oYXBweS1udW1iZXJzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=