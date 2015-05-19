"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/q","../../at/Map/Mapbang","../../at/Map/Id-Mapbang","../../at/Map/multi-mapbang","../../at/Seq/Range","../../at/Seq/Stream","../../math/Number","../../math/methods","../../Type/Type","../../bang","../../at/at","../../at/Seq/Seq","../../Boolean","../../math/Number"],function(exports,_63_0,Map_33_1,Id_45Map_33_2,multi_45map_33_3,Range_4,Stream_5,Number_6,methods_7,Type_8,_33_9,_64_10,Seq_11,Boolean_12,Number_13){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_63_0),Some=_ms.get(_$2,"Some"),_$3=_ms.getModule(Map_33_1),assoc_33=_ms.get(_$3,"assoc!"),un_45assoc_33=_ms.get(_$3,"un-assoc!"),Id_45Map_33=_ms.getDefaultExport(Id_45Map_33_2),_$5=_ms.getModule(multi_45map_33_3),add_45to_45_64_33=_ms.get(_$5,"add-to-@!"),_$6=_ms.getModule(Range_4),range=_ms.get(_$6,"range"),Stream=_ms.getDefaultExport(Stream_5),_$8=_ms.getModule(Number_6),infinity=_ms.get(_$8,"infinity"),square=_ms.get(_$8,"square"),_$9=_ms.getModule(methods_7),_43=_ms.get(_$9,"+"),_42=_ms.get(_$9,"*"),_$10=_ms.getModule(Type_8),_61_62=_ms.get(_$10,"=>"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_9)
		}),_$13=_ms.lazyGetModule(_64_10),any_63=_ms.lazyProp(_$13,"any?"),_$14=_ms.lazyGetModule(Seq_11),take_39=_ms.lazyProp(_$14,"take'"),_$15=_ms.lazyGetModule(Boolean_12),not=_ms.lazyProp(_$15,"not"),_$16=_ms.lazyGetModule(Number_13),divisible_63=_ms.lazyProp(_$16,"divisible?");
		const primes=exports.primes=function(){
			const doc="Infinite Seq of Numbers > 2, each divisible only by itself and one.";
			const test=function test(){
				const is_45prime_63=function is_45prime_63(_){
					return _ms.unlazy(not)(_ms.unlazy(any_63)(range(2,_),_ms.sub(_ms.unlazy(divisible_63),_)))
				};
				for(let _ of _ms.unlazy(take_39)(primes,20)[Symbol.iterator]()){
					_ms.unlazy(_33)(is_45prime_63,_)
				}
			};
			return _ms.set(Stream(function*(){
				(yield 2);
				(yield 3);
				const prime_45factors=_61_62(Id_45Map_33,(yield* function*(){
					const _k0=9,_v0=[3];
					return _ms.map(_k0,_v0)
				}()));
				for(let candidate of range(5,infinity,2)[Symbol.iterator]()){
					{
						const _=un_45assoc_33(prime_45factors,candidate);
						{
							const _$=_ms.extract(Some,_);
							if((_$!==null)){
								const factors=_$[0];
								for(let _ of factors[Symbol.iterator]()){
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
			}),"doc",doc,"test",test,"name","primes")
		}();
		const name=exports.name="sieve-of-eratosthenes";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vc2lldmUtb2YtZXJhdG9zdGhlbmVzLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFrQkEsc0NBQ087R0FBTixVQUFNO0dBQ04sV0FDTyxlQUFBO0lBQU4sb0JBQWEsdUJBQUEsRUFDQzsrQ0FBRixNQUFNLEVBQUUsb0NBQWM7SUFBQTtJQUM3QixRQUFBLHlCQUFNLE9BQU8sdUJBQ0U7cUJBQWpCLGNBQVU7SUFBQTtHQUFBO2tCQUNkLE9BQ1MsV0FBQTtXQUFMO1dBQ0E7SUFFSCxzQkFBZ0IsT0FBRyxZQUNPLG1CQUFBO0tBQXpCLFVBQUEsTUFBSyxDQUFFOzs7SUFDSCxRQUFBLGFBQWEsTUFBTSxFQUFFLFNBQVMsc0JBQ0M7S0FDN0I7TUFBQSxRQUFBLGNBQVUsZ0JBQWM7TUFDN0I7NEJBQUMsS0FBRDtzQkFDYTs7UUFBUCxRQUFBLEtBQUEsMkJBQ087U0FBWCxVQUFNLElBQUUsVUFBVyxJQUFFLEVBQUU7U0FDdkIsa0JBQVUsZ0JBQWMsSUFBSSxDQUFFO1FBQUE7T0FBQSxPQUU1QjtlQUFBO1FBQ0gsU0FBTyxnQkFBZSxPQUFPLFdBQVcsQ0FBRTtPQUFBO01BQUE7S0FBQTtJQUFBO0dBQUE7O0VBeEMvQyx3QkFBQSIsImZpbGUiOiJtZXRhL2RlbW8vc2lldmUtb2YtZXJhdG9zdGhlbmVzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=