"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/Seq/Range","../../control","../../math/Number","../../Object","../../Type/Type","../../bang","../../at/Seq/Seq"],function(exports,_64_0,Range_1,control_2,Number_3,Object_4,Type_5,_33_6,Seq_7){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_0),empty_63=_ms.get(_$2,"empty?"),flat_45map_39=_ms.get(_$2,"flat-map'"),map_39=_ms.get(_$2,"map'"),_$3=_ms.getModule(Range_1),range=_ms.get(_$3,"range"),_$4=_ms.getModule(control_2),_if=_ms.get(_$4,"if"),_$5=_ms.getModule(Number_3),divisible_63=_ms.get(_$5,"divisible?"),infinity=_ms.get(_$5,"infinity"),Nat=_ms.get(_$5,"Nat"),_$6=_ms.getModule(Object_4),Object_45_62Map=_ms.get(_$6,"Object->Map"),_$7=_ms.getModule(Type_5),_61_62=_ms.get(_$7,"=>"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_6)
		}),_$10=_ms.lazyGetModule(Seq_7),seq_61_63=_ms.lazyProp(_$10,"seq=?"),take_39=_ms.lazyProp(_$10,"take'");
		const make_45fb=function make_45fb(spec){
			return map_39(range(1,infinity),function(n){
				const parts=flat_45map_39(Object_45_62Map(spec),function(_){
					const divisor=_ms.checkContains(Nat,_.val,"divisor");
					const shout=_ms.checkContains(String,_.key,"shout");
					return _if(divisible_63(n,divisor),shout)
				});
				return function(){
					const _=parts;
					if(_ms.bool(empty_63(_))){
						return n
					} else {
						return _61_62(String,parts," ")
					}
				}()
			})
		};
		const fizz_45buzz=exports["fizz-buzz"]=function(){
			const doc="Infinite Seq of Fizz Buzz game.";
			const test=function test(){
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),_ms.unlazy(take_39)(fizz_45buzz,6),function(){
					const _0=1;
					const _1=2;
					const _2="Fizz";
					const _3=4;
					const _4="Buzz";
					const _5="Fizz";
					return [_0,_1,_2,_3,_4,_5]
				}())
			};
			return _ms.set(make_45fb(function(){
				const Fizz=3;
				const Buzz=5;
				return {
					Fizz:Fizz,
					Buzz:Buzz
				}
			}()),"doc",doc,"test",test,"name","fizz-buzz")
		}();
		const fizz_45buzz_45jazz=exports["fizz-buzz-jazz"]=function(){
			const doc="Infinite Seq of Fizz Buzz Jazz game.";
			const test=function test(){
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
					const _11="Fizz Jazz";
					const _12=13;
					const _13=14;
					const _14="Fizz Buzz";
					const _15="Jazz";
					const _16=17;
					return [_0,_1,_2,_3,_4,_5,_6,_7,_8,_9,_10,_11,_12,_13,_14,_15,_16]
				}())
			};
			return _ms.set(make_45fb(function(){
				const Fizz=3;
				const Jazz=4;
				const Buzz=5;
				return {
					Fizz:Fizz,
					Jazz:Jazz,
					Buzz:Buzz
				}
			}()),"doc",doc,"test",test,"name","fizz-buzz-jazz")
		}();
		const name=exports.name="fizz-buzz";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vZml6ei1idXp6Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFXQSxnQkFBVyxtQkFBQSxLQUNJO1VBQWQsT0FBTSxNQUFNLEVBQUUsVUFBVyxTQUFBLEVBQ0M7SUFDekIsWUFBUSxjQUFXLGdCQUFZLE1BQU8sU0FBQSxFQUNDO0tBQXRDLGdDQUFRLElBQU07S0FDZCw4QkFBTSxPQUFTO1lBQ2YsSUFBSSxhQUFXLEVBQUUsU0FBUztJQUFBOztLQUN0QixRQUFBO0tBQ0osWUFBQSxTQUFBLElBQ087YUFBTjtLQUFBLE9BRUc7YUFBSCxPQUFHLE9BQU8sTUFBTztLQUFBO0lBQUE7R0FBQTtFQUFBO0VBRXJCLGlEQUNVO0dBQVQsVUFBTTtHQUNOLFdBQ08sZUFBQTtxRUFBUyxZQUFVLGFBQ0U7S0FBMUIsU0FBRTtLQUNGLFNBQUU7S0FDRixTQUFHO0tBQ0gsU0FBRTtLQUNGLFNBQUc7S0FDSCxTQUFHOzs7O2tCQUNMLG9CQUNPO0lBQU4sV0FBTTtJQUNOLFdBQU07Ozs7Ozs7RUFFUiw2REFDZTtHQUFkLFVBQU07R0FDTixXQUNPLGVBQUE7cUVBQVMsbUJBQWUsY0FDRztLQUFoQyxTQUFFO0tBQ0YsU0FBRTtLQUNGLFNBQUc7S0FDSCxTQUFHO0tBQ0gsU0FBRztLQUNILFNBQUc7S0FDSCxTQUFFO0tBQ0YsU0FBRztLQUNILFNBQUc7S0FDSCxTQUFHO0tBQ0gsVUFBRTtLQUNGLFVBQUc7S0FDSCxVQUFFO0tBQ0YsVUFBRTtLQUNGLFVBQUc7S0FDSCxVQUFHO0tBQ0gsVUFBRTs7OztrQkFDSixvQkFDTztJQUFOLFdBQU07SUFDTixXQUFNO0lBQ04sV0FBTTs7Ozs7Ozs7RUE5RFIsd0JBQUEiLCJmaWxlIjoibWV0YS9kZW1vL2ZpenotYnV6ei5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9