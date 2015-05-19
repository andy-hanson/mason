"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/q","../../at/Map/Mapbang","../../at/Map/Id-Mapbang","../../at/Map/multi-mapbang","../../at/Seq/Range","../../at/Seq/Stream","../../Generatorbang","../../math/Number","../../math/methods","../../Type/Type","../../bang","../../at/at","../../at/Seq/Seq","../../Boolean","../../math/Number"],function(exports,_63_0,Map_33_1,Id_45Map_33_2,multi_45map_33_3,Range_4,Stream_5,Generator_33_6,Number_7,methods_8,Type_9,_33_10,_64_11,Seq_12,Boolean_13,Number_14){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_63_0),Some=_$2.Some,_$3=_ms.getModule(Map_33_1),assoc_33=_$3["assoc!"],un_45assoc_33=_$3["un-assoc!"],Id_45Map_33=_ms.getDefaultExport(Id_45Map_33_2),_$5=_ms.getModule(multi_45map_33_3),add_45to_45_64_33=_$5["add-to-@!"],_$6=_ms.getModule(Range_4),range=_$6.range,Stream=_ms.getDefaultExport(Stream_5),_$8=_ms.getModule(Generator_33_6),each_126=_$8["each~"],_$9=_ms.getModule(Number_7),infinity=_$9.infinity,square=_$9.square,_$10=_ms.getModule(methods_8),_43=_$10["+"],_42=_$10["*"],_$11=_ms.getModule(Type_9),_61_62=_$11["=>"],_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_10)
		}),_$14=_ms.lazyGetModule(_64_11),any_63=_ms.lazyProp(_$14,"any?"),_$15=_ms.lazyGetModule(Seq_12),take_39=_ms.lazyProp(_$15,"take'"),_$16=_ms.lazyGetModule(Boolean_13),not=_ms.lazyProp(_$16,"not"),_$17=_ms.lazyGetModule(Number_14),divisible_63=_ms.lazyProp(_$17,"divisible?");
		const primes=exports.primes=function(){
			const doc="Infinite Seq of Numbers > 2, each divisible only by itself and one.";
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
								for(let _ of _ms.iterator(factors)){
									const key=_43(candidate,_42(2,_));
									add_45to_45_64_33(prime_45factors,key,[_])
								}
							} else {
								(yield candidate);
								assoc_33(prime_45factors,square(candidate),[candidate])
							}
						}
					}
				}))
			}),"doc",doc,"name","primes")
		}();
		const name=exports.name="sieve-of-eratosthenes";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vc2lldmUtb2YtZXJhdG9zdGhlbmVzLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFtQkEsc0NBQ087R0FBTixVQUFNO2tCQU1OLE9BQ1MsV0FBQTtXQUFMO1dBQ0E7SUFFSCxzQkFBZ0IsT0FBRyxZQUNPLG1CQUFBO0tBQXpCLFVBQUEsTUFBSyxDQUFFOzs7V0FDSixRQUFBLFNBQU8sTUFBTSxFQUFFLFNBQVMsR0FBSyxVQUFBLFVBQ1M7S0FDbkM7TUFBQSxRQUFBLGNBQVUsZ0JBQWM7TUFDN0I7NEJBQUMsS0FBRDtzQkFDYTs7UUFBUCxRQUFBLGtCQUFBLFNBQ087U0FBWCxVQUFNLElBQUUsVUFBVyxJQUFFLEVBQUU7U0FDdkIsa0JBQVUsZ0JBQWMsSUFBSSxDQUFFO1FBQUE7T0FBQSxPQUU1QjtlQUFBO1FBQ0gsU0FBTyxnQkFBZSxPQUFPLFdBQVcsQ0FBRTtPQUFBO01BQUE7S0FBQTtJQUFBO0dBQUE7O0VBekMvQyx3QkFBQSIsImZpbGUiOiJtZXRhL2RlbW8vc2lldmUtb2YtZXJhdG9zdGhlbmVzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=