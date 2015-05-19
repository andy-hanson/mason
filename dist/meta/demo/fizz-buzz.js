"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/Seq/Range","../../math/Number","../../Object","../../Type/Type","../../bang","../../at/Seq/Seq"],function(exports,_64_0,Range_1,Number_2,Object_3,Type_4,_33_5,Seq_6){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_0),empty_63=_ms.get(_$2,"empty?"),map_39=_ms.get(_$2,"map'"),_$3=_ms.getModule(Range_1),range=_ms.get(_$3,"range"),_$4=_ms.getModule(Number_2),divisible_63=_ms.get(_$4,"divisible?"),infinity=_ms.get(_$4,"infinity"),Nat=_ms.get(_$4,"Nat"),_$5=_ms.getModule(Object_3),Object_45_62Map=_ms.get(_$5,"Object->Map"),_$6=_ms.getModule(Type_4),_61_62=_ms.get(_$6,"=>"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_5)
		}),_$9=_ms.lazyGetModule(Seq_6),seq_61_63=_ms.lazyProp(_$9,"seq=?"),take_39=_ms.lazyProp(_$9,"take'");
		const make_45fizz_45buzz=exports["make-fizz-buzz"]=function(){
			const doc="Infinite Seq of Fizz Buzz game.\nSpec is an Obj whose values are divisors and\nwhose keys are strings to be printed when the divisor matches.";
			const test=function test(){
				const fizz_45buzz=function(){
					return make_45fizz_45buzz(function(){
						const Fizz=3;
						const Buzz=5;
						return {
							Fizz:Fizz,
							Buzz:Buzz
						}
					}())
				}();
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63),_ms.unlazy(take_39)(fizz_45buzz,6),function(){
					const _0=1;
					const _1=2;
					const _2="Fizz";
					const _3=4;
					const _4="Buzz";
					const _5="Fizz";
					return [_0,_1,_2,_3,_4,_5]
				}());
				const fizz_45buzz_45jazz=function(){
					return make_45fizz_45buzz(function(){
						const Fizz=3;
						const Jazz=4;
						const Buzz=5;
						return {
							Fizz:Fizz,
							Jazz:Jazz,
							Buzz:Buzz
						}
					}())
				}();
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),_ms.unlazy(take_39)(fizz_45buzz_45jazz,17),function(){
					const _0=1;
					const _1=2;
					const _2="Fizz";
					const _3="Jazz";
					const _4="Buzz";
					const _5="Fizz";
					const _6=7;
					const _7="Jazz";
					const _8="Fizz";
					const _9="Buzz";
					const _10=11;
					const _11="FizzJazz";
					const _12=13;
					const _13=14;
					const _14="FizzBuzz";
					const _15="Jazz";
					const _16=17;
					return [_0,_1,_2,_3,_4,_5,_6,_7,_8,_9,_10,_11,_12,_13,_14,_15,_16]
				}())
			};
			return _ms.set(function make_45fizz_45buzz(spec){
				const tests=_61_62(Array,map_39(Object_45_62Map(spec),function(_){
					const shout=_ms.checkContains(String,_ms.sub(_,0),"shout");
					const divisor=_ms.checkContains(Nat,_ms.sub(_,1),"divisor");
					return {
						shout:shout,
						divisor:divisor
					}
				}));
				return map_39(range(1,infinity),function(n){
					let s="";
					for(let _ of tests[Symbol.iterator]()){
						if(_ms.bool(divisible_63(n,_.divisor))){
							s=((""+_ms.show(s))+_ms.show(_.shout))
						}
					};
					return function(){
						if(_ms.bool(empty_63(s))){
							return n
						} else {
							return s
						}
					}()
				})
			},"doc",doc,"test",test)
		}();
		const name=exports.name="fizz-buzz";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vZml6ei1idXp6Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFVQSw2REFDZTtHQUFkLFVBQ0M7R0FHRCxXQUNPLGVBQUE7SUFBTiw0QkFDVztZQUNWLDZCQUNjO01BQWIsV0FBTTtNQUNOLFdBQU07Ozs7Ozs7OERBQ08sWUFBVSxhQUNFO0tBQTFCLFNBQUU7S0FDRixTQUFFO0tBQ0YsU0FBRztLQUNILFNBQUU7S0FDRixTQUFHO0tBQ0gsU0FBRzs7O0lBRUosbUNBQ2dCO1lBQWYsNkJBQ2M7TUFBYixXQUFNO01BQ04sV0FBTTtNQUNOLFdBQU07Ozs7Ozs7O3FFQUNPLG1CQUFlLGNBQ0c7S0FBaEMsU0FBRTtLQUNGLFNBQUU7S0FDRixTQUFHO0tBQ0gsU0FBRztLQUNILFNBQUc7S0FDSCxTQUFHO0tBQ0gsU0FBRTtLQUNGLFNBQUc7S0FDSCxTQUFHO0tBQ0gsU0FBRztLQUNILFVBQUU7S0FDRixVQUFHO0tBQ0gsVUFBRTtLQUNGLFVBQUU7S0FDRixVQUFHO0tBQ0gsVUFBRztLQUNILFVBQUU7Ozs7a0JBQ0gsNEJBQUEsS0FDSTtJQUNKLFlBQVEsT0FBRyxNQUFPLE9BQU0sZ0JBQVksTUFBTyxTQUFBLEVBQ0M7S0FDM0MsOEJBQU0sZUFBUSxFQUFFO0tBQ2hCLGdDQUFRLFlBQUssRUFBRTs7Ozs7O1dBQ2hCLE9BQU0sTUFBTSxFQUFFLFVBQVcsU0FBQSxFQUNDO0tBQXpCLE1BQU87S0FDRixRQUFBLEtBQUEseUJBQ0s7TUFBVCxZQUFJLGFBQVcsRUFBRSxZQUNTO1NBQW5CLEVBSEQsWUFHRSxhQUFHOzs7O01BR1gsWUFBQSxTQUFPLElBQ0M7Y0FBUDtNQUFBLE9BRUc7Y0FBSDtNQUFBO0tBQUE7SUFBQTtHQUFBOztFQXBFTCx3QkFBQSIsImZpbGUiOiJtZXRhL2RlbW8vZml6ei1idXp6LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=