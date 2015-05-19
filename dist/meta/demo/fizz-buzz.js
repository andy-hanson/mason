"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/Seq/Range","../../control","../../math/Number","../../Object","../../Type/Type","../../bang","../../at/Seq/Seq"],function(exports,_64_0,Range_1,control_2,Number_3,Object_4,Type_5,_33_6,Seq_7){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_0),empty_63=_$2["empty?"],flat_45map_39=_$2["flat-map'"],map_39=_$2["map'"],_$3=_ms.getModule(Range_1),range=_$3.range,_$4=_ms.getModule(control_2),_if=_$4.if,_$5=_ms.getModule(Number_3),divisible_63=_$5["divisible?"],infinity=_$5.infinity,Nat=_$5.Nat,_$6=_ms.getModule(Object_4),Object_45_62Map=_$6["Object->Map"],_$7=_ms.getModule(Type_5),_61_62=_$7["=>"],_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_6)
		}),_$10=_ms.lazyGetModule(Seq_7),seq_61_63=_ms.lazyProp(_$10,"seq=?"),take_39=_ms.lazyProp(_$10,"take'");
		const make_45fb=function make_45fb(spec){
			return map_39(range(1,infinity),function(n){
				const parts=flat_45map_39(Object_45_62Map(spec),function(_){
					const divisor=_.val;
					const shout=_.key;
					return _if(divisible_63(n,divisor),shout)
				});
				return function(){
					const _=parts;
					if(empty_63(_)){
						return n
					} else {
						return _61_62(String,parts," ")
					}
				}()
			})
		};
		const fizz_45buzz=exports["fizz-buzz"]=function(){
			const doc="Infinite Seq of Fizz Buzz game.";
			return _ms.set(make_45fb(function(){
				const Fizz=3;
				const Buzz=5;
				return {
					Fizz:Fizz,
					Buzz:Buzz
				}
			}()),"doc",doc,"name","fizz-buzz")
		}();
		const fizz_45buzz_45jazz=exports["fizz-buzz-jazz"]=function(){
			const doc="Infinite Seq of Fizz Buzz Jazz game.";
			return _ms.set(make_45fb(function(){
				const Fizz=3;
				const Jazz=4;
				const Buzz=5;
				return {
					Fizz:Fizz,
					Jazz:Jazz,
					Buzz:Buzz
				}
			}()),"doc",doc,"name","fizz-buzz-jazz")
		}();
		const name=exports.name="fizz-buzz";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vZml6ei1idXp6Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFXQSxnQkFBVyxtQkFBQSxLQUNJO1VBQWQsT0FBTSxNQUFNLEVBQUUsVUFBVyxTQUFBLEVBQ0M7SUFDekIsWUFBUSxjQUFXLGdCQUFZLE1BQU8sU0FBQSxFQUNDO0tBQXRDLGNBQWM7S0FDZCxZQUFlO1lBQ2YsSUFBSSxhQUFXLEVBQUUsU0FBUztJQUFBOztLQUN0QixRQUFBO0tBQ0osR0FBQSxTQUFBLEdBQ087YUFBTjtLQUFBLE9BRUc7YUFBSCxPQUFHLE9BQU8sTUFBTztLQUFBO0lBQUE7R0FBQTtFQUFBO0VBRXJCLGlEQUNVO0dBQVQsVUFBTTtrQkFTTixvQkFDTztJQUFOLFdBQU07SUFDTixXQUFNOzs7Ozs7O0VBRVIsNkRBQ2U7R0FBZCxVQUFNO2tCQW9CTixvQkFDTztJQUFOLFdBQU07SUFDTixXQUFNO0lBQ04sV0FBTTs7Ozs7Ozs7RUE5RFIsd0JBQUEiLCJmaWxlIjoibWV0YS9kZW1vL2ZpenotYnV6ei5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9