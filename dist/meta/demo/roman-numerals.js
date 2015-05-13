"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../math/Num","../../math/methods","../../Str","../../bang","../../at/Seq/Range","../../Type/Type"],function(exports,compare_0,Num_1,methods_2,Str_3,_33_4,Range_5,Type_6){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_60_61_63=_ms.get(_$2,"<=?"),_$3=_ms.getModule(Num_1),log=_ms.get(_$3,"log"),Nat=_ms.get(_$3,"Nat"),pow=_ms.get(_$3,"pow"),round_45down=_ms.get(_$3,"round-down"),_$4=_ms.getModule(methods_2),_45=_ms.get(_$4,"-"),_42=_ms.get(_$4,"*"),Str=_ms.getDefaultExport(Str_3),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_4)
		}),_$8=_ms.lazyGetModule(Range_5),range=_ms.lazyProp(_$8,"range"),_$9=_ms.lazyGetModule(Type_6),contains_63=_ms.lazyProp(_$9,"contains?");
		const roman_45digits=function(){
			const _k0=1,_v0="I";
			const _k1=5,_v1="V";
			const _k2=10,_v2="X";
			const _k3=50,_v3="L";
			const _k4=100,_v4="C";
			const _k5=500,_v5="D";
			const _k6=1000,_v6="M";
			return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4,_k5,_v5,_k6,_v6)
		}();
		const power_45of_4510_45below=function(){
			return _ms.set(function(_){
				return pow(10,round_45down(log(10,_)))
			},"displayName","power-of-10-below")
		}();
		const roman=exports.roman=function(){
			const doc="Converts a number to Roman numerals.\nOnly works for values 1-3999.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[1],_v0="I";
					const _k1=[4],_v1="IV";
					const _k2=[5],_v2="V";
					const _k3=[9],_v3="IX";
					const _k4=[44],_v4="XLIV";
					const _k5=[49],_v5="XLIX";
					const _k6=[2014],_v6="MMXIV";
					return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4,_k5,_v5,_k6,_v6)
				},"displayName","test")
			}();
			return _ms.set(function(n){
				_ms.checkContains(Nat,n,"n");
				_ms.unlazy(_33)(_ms.unlazy(contains_63),_ms.unlazy(range)(1,4000),n);
				const dec=power_45of_4510_45below(n);
				const dig=function(){
					return _ms.set(function(dec_45multiple){
						return _ms.sub(roman_45digits,_42(dec_45multiple,dec))
					},"displayName","dig")
				}();
				const rec=function(){
					return _ms.set(function(dec_45multiple){
						return function(){
							const _=_45(n,_42(dec_45multiple,dec));
							if(_ms.bool(_61_63(_,0))){
								return ""
							} else {
								return roman(_)
							}
						}()
					},"displayName","rec")
				}();
				const gt_63=function(){
					return _ms.set(function(dec_45multiple){
						return _60_61_63(_42(dec_45multiple,dec),n)
					},"displayName","gt?")
				}();
				return _ms.checkContains(Str,function(){
					if(_ms.bool(gt_63(9))){
						return (((""+_ms.show(dig(1)))+_ms.show(dig(10)))+_ms.show(rec(9)))
					} else if(_ms.bool(gt_63(5))){
						return ((""+_ms.show(dig(5)))+_ms.show(rec(5)))
					} else if(_ms.bool(gt_63(4))){
						return (((""+_ms.show(dig(1)))+_ms.show(dig(5)))+_ms.show(rec(4)))
					} else {
						return ((""+_ms.show(dig(1)))+_ms.show(rec(1)))
					}
				}(),"res")
			},"doc",doc,"test",test,"displayName","roman")
		}();
		const displayName=exports.displayName="roman-numerals";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vcm9tYW4tbnVtZXJhbHMubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQVdBLCtCQUNjO0dBQWIsVUFBQSxNQUFNO0dBQ04sVUFBQSxNQUFNO0dBQ04sVUFBQSxPQUFPO0dBQ1AsVUFBQSxPQUFPO0dBQ1AsVUFBQSxRQUFRO0dBQ1IsVUFBQSxRQUFRO0dBQ1IsVUFBQSxTQUFTOzs7RUFFVix3Q0FBcUI7a0JBQUEsU0FBQSxFQUNDO1dBQXJCLElBQUksR0FBSSxhQUFZLElBQUksR0FBRztHQUFBOztFQUU1QixvQ0FDTTtHQUFMLFVBQ0M7R0FFRCxxQkFDTzttQkFBQSxVQUFBO0tBQU4sVUFBQSxDQUFFLE9BQVE7S0FDVixVQUFBLENBQUUsT0FBUTtLQUNWLFVBQUEsQ0FBRSxPQUFRO0tBQ1YsVUFBQSxDQUFFLE9BQVE7S0FDVixVQUFBLENBQUUsUUFBUztLQUNYLFVBQUEsQ0FBRSxRQUFTO0tBQ1gsVUFBQSxDQUFFLFVBQVc7Ozs7a0JBRWIsU0FBSyxFQUlMO3NCQUpPOzhEQUVhLEVBQUUsTUFBTTtJQUU1QixVQUFNLHdCQUFrQjtJQUN4QixvQkFBTztvQkFBQSxTQUFBLGVBQ1k7cUJBQWxCLGVBQWMsSUFBRSxlQUFhO0tBQUE7O0lBQzlCLG9CQUFPO29CQUFBLFNBQUEsZUFDWTs7T0FBYixRQUFBLElBQUUsRUFBRyxJQUFFLGVBQWE7T0FDeEIsWUFBQSxPQUFHLEVBQUUsSUFDQztlQUFKO09BQUEsT0FFRTtlQUFILE1BQUE7T0FBQTtNQUFBO0tBQUE7O0lBQ0gsc0JBQU87b0JBQUEsU0FBQSxlQUNZO2FBQWxCLFVBQUssSUFBRSxlQUFhLEtBQUs7S0FBQTs7NkJBZHpCO0tBZ0JBLFlBQUEsTUFBSSxJQUNDO2FBQUgsR0FQQyxZQU9BLElBQUksY0FBRyxJQUFJLGVBQUksSUFBSTtLQUFBLE9BQ3RCLFlBQUEsTUFBSSxJQUNDO2FBQUgsRUFUQyxZQVNBLElBQUksY0FBRyxJQUFJO0tBQUEsT0FDZCxZQUFBLE1BQUksSUFDQzthQUFILEdBWEMsWUFXQSxJQUFJLGNBQUcsSUFBSSxjQUFHLElBQUk7S0FBQSxPQUVqQjthQUFGLEVBYkMsWUFhQSxJQUFJLGNBQUcsSUFBSTtLQUFBO0lBQUE7OztFQTNEakIsc0NBQUEiLCJmaWxlIjoibWV0YS9kZW1vL3JvbWFuLW51bWVyYWxzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=