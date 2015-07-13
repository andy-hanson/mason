"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/q","../../at/Map/Mapbang","../../at/Map/Id-Mapbang","../../at/Map/multi-mapbang","../../at/Seq/Range","../../at/Seq/Stream","../../math/Number","../../math/methods","../../Type/Type","../../bang","../../at/at","../../at/Seq/Seq","../../math/Number"],function(exports,_63_0,Map_33_1,Id_45Map_33_2,multi_45map_33_3,Range_4,Stream_5,Number_6,methods_7,Type_8,_33_9,_64_10,Seq_11,Number_12){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_63_0),Some=_ms.get(_$2,"Some"),_$3=_ms.getModule(Map_33_1),assoc_33=_ms.get(_$3,"assoc!"),un_45assoc_33=_ms.get(_$3,"un-assoc!"),Id_45Map_33=_ms.getDefaultExport(Id_45Map_33_2),_$5=_ms.getModule(multi_45map_33_3),add_45to_45_64_33=_ms.get(_$5,"add-to-@!"),_$6=_ms.getModule(Range_4),range=_ms.get(_$6,"range"),Stream=_ms.getDefaultExport(Stream_5),_$8=_ms.getModule(Number_6),infinity=_ms.get(_$8,"infinity"),square=_ms.get(_$8,"square"),_$9=_ms.getModule(methods_7),_43=_ms.get(_$9,"+"),_42=_ms.get(_$9,"*"),_$10=_ms.getModule(Type_8),_61_62=_ms.get(_$10,"=>"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_9)
		}),_$13=_ms.lazyGetModule(_64_10),any_63=_ms.lazyProp(_$13,"any?"),_$14=_ms.lazyGetModule(Seq_11),take=_ms.lazyProp(_$14,"take"),_$15=_ms.lazyGetModule(Number_12),divisible_63=_ms.lazyProp(_$15,"divisible?");
		const primes=exports.primes=function(){
			const built={};
			const doc=built.doc=`Infinite Seq of Numbers > 2, each divisible only by itself and one.`;
			const test=built.test=function test(){
				const is_45prime_63=function is_45prime_63(_){
					return ! _ms.unlazy(any_63)(range(2,_),_ms.sub(_ms.unlazy(divisible_63),_))
				};
				for(let _ of _ms.unlazy(take)(primes,20)){
					_ms.unlazy(_33)(is_45prime_63,_)
				}
			};
			return _ms.set(Stream(function*(){
				(yield 2);
				(yield 3);
				const prime_45factors=_61_62(Id_45Map_33,(yield* function*(){
					const built=new global.Map();
					_ms.assoc(built,9,[3]);
					return built
				}()));
				for(let candidate of range(5,infinity,2)){
					{
						const _=un_45assoc_33(prime_45factors,candidate);
						{
							const _$=_ms.extract(Some,_);
							if((_$!==null)){
								const factors=_$[0];
								for(let _ of factors){
									const key=_43(candidate,_42(2,_));
									add_45to_45_64_33(prime_45factors,key,[_])
								}
							} else {
								(yield candidate);
								assoc_33(prime_45factors,square(candidate),[candidate])
							}
						}
					}
				}
			}),built,"primes")
		}();
		const name=exports.name=`sieve-of-eratosthenes`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vc2lldmUtb2YtZXJhdG9zdGhlbmVzLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFpQkEsc0NBQ087O0dBQU4sb0JBQU07R0FDTixzQkFDUSxlQUFBO0lBQVAsb0JBQWEsdUJBQUEsRUFDQztZQUFiLHFCQUFXLE1BQU0sRUFBRSxvQ0FBYztJQUFBO0lBQzdCLFFBQUEsc0JBQUssT0FBTyxJQUNFO3FCQUFoQixjQUFVO0lBQUE7R0FBQTtrQkFDZCxPQUNVLFdBQUE7V0FBTjtXQUNBO0lBRUgsc0JBQWdCLE9BQUcsWUFDTyxtQkFBQTs7cUJBQXpCLEVBQUssQ0FBRTs7O0lBQ0gsUUFBQSxhQUFhLE1BQU0sRUFBRSxTQUFTLEdBQ0M7S0FDN0I7TUFBQSxRQUFBLGNBQVUsZ0JBQWM7TUFDN0I7NEJBQUMsS0FBRDtzQkFDYTs7UUFBUCxRQUFBLEtBQUEsUUFDTztTQUFYLFVBQU0sSUFBRSxVQUFXLElBQUUsRUFBRTtTQUV2QixrQkFBVSxnQkFBYyxJQUFJLENBQUU7UUFBQTtPQUFBLE9BRTVCO2VBQUE7UUFDSCxTQUFPLGdCQUFlLE9BQU8sV0FBVyxDQUFFO09BQUE7TUFBQTtLQUFBO0lBQUE7R0FBQTs7RUF4Qy9DLHdCQUFBIiwiZmlsZSI6Im1ldGEvZGVtby9zaWV2ZS1vZi1lcmF0b3N0aGVuZXMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==