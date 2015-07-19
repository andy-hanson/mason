"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/q","../../at/Map/Mapbang","../../at/Map/Id-Mapbang","../../at/Map/multi-mapbang","../../at/Seq/Range","../../at/Seq/Stream","../../math/Number","../../math/methods","../../Type/Type","../../at/at","../../at/Seq/Seq","../../math/Number"],(exports,_63_0,Map_33_1,Id_45Map_33_2,multi_45map_33_3,Range_4,Stream_5,Number_6,methods_7,Type_8,_64_9,Seq_10,Number_11)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(_63_0),Some=_ms.get(_$2,"Some"),_$3=_ms.getModule(Map_33_1),assoc_33=_ms.get(_$3,"assoc!"),un_45assoc_33=_ms.get(_$3,"un-assoc!"),Id_45Map_33=_ms.getDefaultExport(Id_45Map_33_2),_$5=_ms.getModule(multi_45map_33_3),add_45to_45_64_33=_ms.get(_$5,"add-to-@!"),_$6=_ms.getModule(Range_4),range=_ms.get(_$6,"range"),Stream=_ms.getDefaultExport(Stream_5),_$8=_ms.getModule(Number_6),infinity=_ms.get(_$8,"infinity"),square=_ms.get(_$8,"square"),_$9=_ms.getModule(methods_7),_43=_ms.get(_$9,"+"),_42=_ms.get(_$9,"*"),_$10=_ms.getModule(Type_8),_61_62=_ms.get(_$10,"=>"),_$12=_ms.lazyGetModule(_64_9),any_63=_ms.lazyProp(_$12,"any?"),_$13=_ms.lazyGetModule(Seq_10),take=_ms.lazyProp(_$13,"take"),_$14=_ms.lazyGetModule(Number_11),divisible_63=_ms.lazyProp(_$14,"divisible?");
		const primes=exports.primes=()=>{
			const built={};
			const doc=built.doc=`Infinite Seq of Numbers > 2, each divisible only by itself and one.`;
			const test=built.test=function test(){
				const is_45prime_63=function is_45prime_63(_){
					return ! _ms.unlazy(any_63)(range(2,_),_ms.sub(_ms.unlazy(divisible_63),_))
				};
				for(let _ of _ms.unlazy(take)(primes,20)){
					_ms.assert(is_45prime_63,_)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vc2lldmUtb2YtZXJhdG9zdGhlbmVzLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBZ0JBLGdDQUNPOztHQUFOLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtJQUFQLG9CQUFhLHVCQUFBLEVBQ0M7WUFBYixxQkFBVSxNQUFNLEVBQUUsb0NBQWM7SUFBQTtJQUM1QixRQUFBLHNCQUFLLE9BQU8sSUFDRTtnQkFBVixjQUFVO0lBQUE7R0FBQTtrQkFDcEIsT0FDVSxXQUFBO1dBQU47V0FDQTtJQUVILHNCQUFnQixPQUFHLFlBQ08sbUJBQUE7O3FCQUF6QixFQUFLLENBQUU7OztJQUNILFFBQUEsYUFBYSxNQUFNLEVBQUUsU0FBUyxHQUNDO0tBQzdCO01BQUEsUUFBQSxjQUFVLGdCQUFjO01BQzdCOzRCQUFDLEtBQUQ7c0JBQ2E7O1FBQVAsUUFBQSxLQUFBLFFBQ087U0FBWCxVQUFNLElBQUUsVUFBVyxJQUFFLEVBQUU7U0FFdkIsa0JBQVUsZ0JBQWMsSUFBSSxDQUFFO1FBQUE7T0FBQSxPQUU1QjtlQUFBO1FBQ0gsU0FBTyxnQkFBZSxPQUFPLFdBQVcsQ0FBRTtPQUFBO01BQUE7S0FBQTtJQUFBO0dBQUE7O0VBdkMvQyx3QkFBQSIsImZpbGUiOiJtZXRhL2RlbW8vc2lldmUtb2YtZXJhdG9zdGhlbmVzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=