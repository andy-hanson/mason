"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/Seq/Range","../../math/Number","../../Object","../../Type/Type","../../bang","../../at/Seq/Seq"],function(exports,_64_0,Range_1,Number_2,Object_3,Type_4,_33_5,Seq_6){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_0),empty_63=_ms.get(_$2,"empty?"),map_39=_ms.get(_$2,"map'"),_$3=_ms.getModule(Range_1),range=_ms.get(_$3,"range"),_$4=_ms.getModule(Number_2),divisible_63=_ms.get(_$4,"divisible?"),infinity=_ms.get(_$4,"infinity"),Nat=_ms.get(_$4,"Nat"),_$5=_ms.getModule(Object_3),Object_45_62Map=_ms.get(_$5,"Object->Map"),_$6=_ms.getModule(Type_4),_61_62=_ms.get(_$6,"=>"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_5)
		}),_$9=_ms.lazyGetModule(Seq_6),seq_61_63=_ms.lazyProp(_$9,"seq=?"),take_39=_ms.lazyProp(_$9,"take'");
		const make_45fizz_45buzz=exports["make-fizz-buzz"]=function(){
			const built={};
			const doc=built.doc="Infinite Seq of Fizz Buzz game.\nSpec is an Obj whose values are divisors and\nwhose keys are strings to be printed when the divisor matches.";
			const test=built.test=function test(){
				const fizz_45buzz=function(){
					return make_45fizz_45buzz(function(){
						const built={};
						const Fizz=built.Fizz=3;
						const Buzz=built.Buzz=5;
						return built
					}())
				}();
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63),_ms.unlazy(take_39)(fizz_45buzz,6),function(){
					const built=[];
					_ms.add(built,1);
					_ms.add(built,2);
					_ms.add(built,"Fizz");
					_ms.add(built,4);
					_ms.add(built,"Buzz");
					_ms.add(built,"Fizz");
					return built
				}());
				const fizz_45buzz_45jazz=function(){
					return make_45fizz_45buzz(function(){
						const built={};
						const Fizz=built.Fizz=3;
						const Jazz=built.Jazz=4;
						const Buzz=built.Buzz=5;
						return built
					}())
				}();
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63),_ms.unlazy(take_39)(fizz_45buzz_45jazz,17),function(){
					const built=[];
					_ms.add(built,1);
					_ms.add(built,2);
					_ms.add(built,"Fizz");
					_ms.add(built,"Jazz");
					_ms.add(built,"Buzz");
					_ms.add(built,"Fizz");
					_ms.add(built,7);
					_ms.add(built,"Jazz");
					_ms.add(built,"Fizz");
					_ms.add(built,"Buzz");
					_ms.add(built,11);
					_ms.add(built,"FizzJazz");
					_ms.add(built,13);
					_ms.add(built,14);
					_ms.add(built,"FizzBuzz");
					_ms.add(built,"Jazz");
					_ms.add(built,17);
					return built
				}())
			};
			return _ms.set(function make_45fizz_45buzz(spec){
				const tests=_61_62(Array,map_39(Object_45_62Map(spec),function(_){
					const built={};
					const shout=_ms.checkContains(String,built.shout=_ms.sub(_,0),"shout");
					const divisor=_ms.checkContains(Nat,built.divisor=_ms.sub(_,1),"divisor");
					return built
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
			},built)
		}();
		const name=exports.name="fizz-buzz";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vZml6ei1idXp6Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFVQSw2REFDZTs7R0FBZCxvQkFDQztHQUdELHNCQUNRLGVBQUE7SUFBUCw0QkFDVztZQUNWLDZCQUNjOztNQUFiLHNCQUFNO01BQ04sc0JBQU07Ozs7OERBQ08sWUFBVSxhQUNFOzttQkFBeEI7bUJBQ0E7bUJBQ0M7bUJBQ0Q7bUJBQ0M7bUJBQ0E7OztJQUVKLG1DQUNnQjtZQUFmLDZCQUNjOztNQUFiLHNCQUFNO01BQ04sc0JBQU07TUFDTixzQkFBTTs7Ozs4REFDTyxtQkFBZSxjQUNHOzttQkFBOUI7bUJBQ0E7bUJBQ0M7bUJBQ0E7bUJBQ0E7bUJBQ0E7bUJBQ0Q7bUJBQ0M7bUJBQ0E7bUJBQ0E7bUJBQ0Q7bUJBQ0M7bUJBQ0Q7bUJBQ0E7bUJBQ0M7bUJBQ0E7bUJBQ0Q7Ozs7a0JBQ0gsNEJBQUEsS0FDSTtJQUNKLFlBQVEsT0FBRyxNQUFPLE9BQU0sZ0JBQVksTUFBTyxTQUFBLEVBQ0M7O0tBQzNDLDhCQUFNLDJCQUFRLEVBQUU7S0FDaEIsZ0NBQVEsMEJBQUssRUFBRTs7O1dBQ2hCLE9BQU0sTUFBTSxFQUFFLFVBQVcsU0FBQSxFQUNDO0tBQXpCLE1BQU87S0FDRixRQUFBLEtBQUEseUJBQ0s7TUFBVCxZQUFJLGFBQVcsRUFBRSxZQUNTO1NBQW5CLEVBSEQsWUFHRSxhQUFHOzs7O01BR1gsWUFBQSxTQUFPLElBQ0M7Y0FBUDtNQUFBLE9BRUc7Y0FBSDtNQUFBO0tBQUE7SUFBQTtHQUFBOztFQXBFTCx3QkFBQSIsImZpbGUiOiJtZXRhL2RlbW8vZml6ei1idXp6LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=