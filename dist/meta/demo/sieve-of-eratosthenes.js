"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/q","../../at/Map/Map","../../at/Map/Id-Map","../../at/Map/multi-map","../../at/Range","../../at/Seq/Stream","../../math/Number","../../math/methods","../../Type/Type","../../at/at","../../at/Seq/Seq","../../math/Number"],(exports,_63_0,Map_1,Id_45Map_2,multi_45map_3,Range_4,Stream_5,Number_6,methods_7,Type_8,_64_9,Seq_10,Number_11)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(_63_0),Some=_ms.get(_$2,"Some"),_$3=_ms.getModule(Map_1),assoc_33=_ms.get(_$3,"assoc!"),un_45assoc_33=_ms.get(_$3,"un-assoc!"),Id_45Map=_ms.getDefaultExport(Id_45Map_2),_$5=_ms.getModule(multi_45map_3),add_45to_45_64_33=_ms.get(_$5,"add-to-@!"),Range=_ms.getDefaultExport(Range_4),Stream=_ms.getDefaultExport(Stream_5),_$8=_ms.getModule(Number_6),infinity=_ms.get(_$8,"infinity"),square=_ms.get(_$8,"square"),_$9=_ms.getModule(methods_7),_43=_ms.get(_$9,"+"),_42=_ms.get(_$9,"*"),_$10=_ms.getModule(Type_8),_61_62=_ms.get(_$10,"=>"),_$12=_ms.lazyGetModule(_64_9),any_63=_ms.lazyProp(_$12,"any?"),_$13=_ms.lazyGetModule(Seq_10),take=_ms.lazyProp(_$13,"take"),_$14=_ms.lazyGetModule(Number_11),divisible_63=_ms.lazyProp(_$14,"divisible?");
		const primes=exports.primes=(()=>{
			const built={};
			const doc=built.doc=`Infinite Seq of Numbers > 2, each divisible only by itself and one.`;
			const test=built.test=function test(){
				const is_45prime_63=function is_45prime_63(_){
					return ! _ms.unlazy(any_63)(new (Range)(2,_),_ms.sub(_ms.unlazy(divisible_63),_))
				};
				for(let _ of _ms.unlazy(take)(primes,20)){
					_ms.assert(is_45prime_63,_)
				}
			};
			return _ms.set(new (Stream)(function*(){
				(yield 2);
				(yield 3);
				const prime_45factors=_61_62(Id_45Map,(yield* function*(){
					const built=new (global.Map)();
					_ms.assoc(built,9,[3]);
					return built
				}()));
				for(let candidate of new (Range)(5,infinity,2)){
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
		})();
		const name=exports.name=`sieve-of-eratosthenes`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vc2lldmUtb2YtZXJhdG9zdGhlbmVzLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBZ0JBLDRCQUNPLEtBQUE7O0dBQU4sb0JBQU07R0FDTixzQkFDUSxlQUFBO0lBQVAsb0JBQWEsdUJBQUEsRUFDQztZQUFiLHFCQUFVLEtBQUksT0FBTSxFQUFFLG9DQUFjO0lBQUE7SUFDaEMsUUFBQSxzQkFBSyxPQUFPLElBQ0U7Z0JBQVYsY0FBVTtJQUFBO0dBQUE7a0JBQ3BCLEtBQUksUUFDVSxXQUFBO1dBQVY7V0FDQTtJQUVILHNCQUFnQixPQUFHLFNBQ00sbUJBQUE7O3FCQUF4QixFQUFLLENBQUU7OztJQUNILFFBQUEsYUFBYSxLQUFJLE9BQU0sRUFBRSxTQUFTLEdBQ0M7S0FDakM7TUFBQSxRQUFBLGNBQVUsZ0JBQWM7TUFDN0I7NEJBQUMsS0FBRDtzQkFDYTs7UUFBUCxRQUFBLEtBQUEsUUFDTztTQUFYLFVBQU0sSUFBRSxVQUFXLElBQUUsRUFBRTtTQUV2QixrQkFBVSxnQkFBYyxJQUFJLENBQUU7UUFBQTtPQUFBLE9BRTVCO2VBQUE7UUFDSCxTQUFPLGdCQUFlLE9BQU8sV0FBVyxDQUFFO09BQUE7TUFBQTtLQUFBO0lBQUE7R0FBQTs7RUF2Qy9DLHdCQUFBIiwiZmlsZSI6Im1ldGEvZGVtby9zaWV2ZS1vZi1lcmF0b3N0aGVuZXMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==