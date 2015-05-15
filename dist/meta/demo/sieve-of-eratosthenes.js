"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/q","../../at/Map/Mapbang","../../at/Map/Id-Mapbang","../../at/Map/multi-mapbang","../../at/Seq/Range","../../at/Seq/Stream","../../Generatorbang","../../math/Number","../../math/methods","../../Type/Type","../../bang","../../at/at","../../at/Seq/Seq","../../Boolean","../../math/Number"],function(exports,_64_0,_63_1,Map_33_2,Id_45Map_33_3,multi_45map_33_4,Range_5,Stream_6,Generator_33_7,Number_8,methods_9,Type_10,_33_11,_64_12,Seq_13,Boolean_14,Number_15){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_0),each_33=_ms.get(_$2,"each!"),_$3=_ms.getModule(_63_1),Some=_ms.get(_$3,"Some"),_$4=_ms.getModule(Map_33_2),assoc_33=_ms.get(_$4,"assoc!"),un_45assoc_33=_ms.get(_$4,"un-assoc!"),Id_45Map_33=_ms.getDefaultExport(Id_45Map_33_3),_$6=_ms.getModule(multi_45map_33_4),add_45to_45_64_33=_ms.get(_$6,"add-to-@!"),_$7=_ms.getModule(Range_5),range=_ms.get(_$7,"range"),Stream=_ms.getDefaultExport(Stream_6),_$9=_ms.getModule(Generator_33_7),each_126=_ms.get(_$9,"each~"),_$10=_ms.getModule(Number_8),infinity=_ms.get(_$10,"infinity"),square=_ms.get(_$10,"square"),_$11=_ms.getModule(methods_9),_43=_ms.get(_$11,"+"),_42=_ms.get(_$11,"*"),_$12=_ms.getModule(Type_10),_61_62=_ms.get(_$12,"=>"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_11)
		}),_$15=_ms.lazyGetModule(_64_12),any_63=_ms.lazyProp(_$15,"any?"),_$16=_ms.lazyGetModule(Seq_13),take_39=_ms.lazyProp(_$16,"take'"),_$17=_ms.lazyGetModule(Boolean_14),not=_ms.lazyProp(_$17,"not"),_$18=_ms.lazyGetModule(Number_15),divisible_63=_ms.lazyProp(_$18,"divisible?");
		const primes=exports.primes=function(){
			const doc="Infinite Seq of Numbers > 2, each divisible only by itself and one.";
			const test=function(){
				return _ms.set(function(){
					const is_45prime_63=function(){
						return _ms.set(function(_){
							return _ms.unlazy(not)(_ms.unlazy(any_63)(range(2,_),_ms.sub(_ms.unlazy(divisible_63),_)))
						},"displayName","is-prime?")
					}();
					return each_33(_ms.unlazy(take_39)(primes,20),_ms.sub(_ms.unlazy(_33),is_45prime_63))
				},"displayName","test")
			}();
			return _ms.set(Stream(function*(){
				(yield 2);
				(yield 3);
				const prime_45factors=_61_62(Id_45Map_33,(yield* function*(){
					const _k0=9,_v0=[3];
					return _ms.map(_k0,_v0)
				}()));
				return (yield* each_126(range(5,infinity,2),function*(candidate){
					{
						const _=un_45assoc_33(prime_45factors,candidate);
						{
							const _$=_ms.extract(Some,_);
							if((_$!==null)){
								const factors=_$[0];
								each_33(factors,function(_){
									const key=_43(candidate,_42(2,_));
									return add_45to_45_64_33(prime_45factors,key,[_])
								})
							} else {
								(yield candidate);
								assoc_33(prime_45factors,square(candidate),[candidate])
							}
						}
					}
				}))
			}),"doc",doc,"test",test,"displayName","primes")
		}();
		const displayName=exports.displayName="sieve-of-eratosthenes";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vc2lldmUtb2YtZXJhdG9zdGhlbmVzLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFvQkEsc0NBQ087R0FBTixVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTtLQUFOLDhCQUFhO3FCQUFBLFNBQUEsRUFDQztpREFBRixNQUFNLEVBQUUsb0NBQWM7TUFBQTs7WUFDbEMsNEJBQWEsT0FBTyw0QkFBTTtJQUFBOztrQkFDM0IsT0FDUyxXQUFBO1dBQUw7V0FDQTtJQUVILHNCQUFnQixPQUFHLFlBQ08sbUJBQUE7S0FBekIsVUFBQSxNQUFLLENBQUU7OztXQUNKLFFBQUEsU0FBTyxNQUFNLEVBQUUsU0FBUyxHQUFLLFVBQUEsVUFDUztLQUNuQztNQUFBLFFBQUEsY0FBVSxnQkFBYztNQUM3Qjs0QkFBQyxLQUFEO3NCQUNhOztRQUFaLFFBQU0sUUFBUyxTQUFBLEVBQ0M7U0FBZixVQUFNLElBQUUsVUFBVyxJQUFFLEVBQUU7Z0JBQ3ZCLGtCQUFVLGdCQUFjLElBQUksQ0FBRTtRQUFBO09BQUEsT0FFNUI7ZUFBQTtRQUNILFNBQU8sZ0JBQWUsT0FBTyxXQUFXLENBQUU7T0FBQTtNQUFBO0tBQUE7SUFBQTtHQUFBOztFQXpDL0Msc0NBQUEiLCJmaWxlIjoibWV0YS9kZW1vL3NpZXZlLW9mLWVyYXRvc3RoZW5lcy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9