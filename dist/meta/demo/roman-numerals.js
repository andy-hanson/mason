"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../math/Number","../../math/methods","../../at/Seq/Range","../../Type/Type"],function(exports,compare_0,Number_1,methods_2,Range_3,Type_4){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_60_61_63=_ms.get(_$2,"<=?"),_$3=_ms.getModule(Number_1),log=_ms.get(_$3,"log"),Nat=_ms.get(_$3,"Nat"),pow=_ms.get(_$3,"pow"),round_45down=_ms.get(_$3,"round-down"),_$4=_ms.getModule(methods_2),_45=_ms.get(_$4,"-"),_42=_ms.get(_$4,"*"),_$6=_ms.lazyGetModule(Range_3),range=_ms.lazyProp(_$6,"range"),_$7=_ms.lazyGetModule(Type_4),contains_63=_ms.lazyProp(_$7,"contains?");
		const roman_45digits=function(){
			const built=new global.Map();
			_ms.assoc(built,1,`I`);
			_ms.assoc(built,5,`V`);
			_ms.assoc(built,10,`X`);
			_ms.assoc(built,50,`L`);
			_ms.assoc(built,100,`C`);
			_ms.assoc(built,500,`D`);
			_ms.assoc(built,1000,`M`);
			return built
		}();
		const power_45of_4510_45below=function power_45of_4510_45below(_){
			return pow(10,round_45down(log(10,_)))
		};
		const roman=exports.roman=function(){
			const built={};
			const doc=built.doc=`Converts a number to Roman numerals.\nOnly works for values 1-3999.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[1],`I`);
				_ms.assoc(built,[4],`IV`);
				_ms.assoc(built,[5],`V`);
				_ms.assoc(built,[9],`IX`);
				_ms.assoc(built,[44],`XLIV`);
				_ms.assoc(built,[49],`XLIX`);
				_ms.assoc(built,[2014],`MMXIV`);
				return built
			};
			return _ms.set(function roman(n){
				_ms.checkContains(Nat,n,"n");
				_ms.assert(_ms.unlazy(contains_63),_ms.unlazy(range)(1,4000),n);
				const dec=power_45of_4510_45below(n);
				const dig=function dig(dec_45multiple){
					return _ms.sub(roman_45digits,_42(dec_45multiple,dec))
				};
				const rec=function rec(dec_45multiple){
					return function(){
						const _=_45(n,_42(dec_45multiple,dec));
						if(_ms.bool(_61_63(_,0))){
							return ""
						} else {
							return roman(_)
						}
					}()
				};
				const gt_63=function gt_63(dec_45multiple){
					return _60_61_63(_42(dec_45multiple,dec),n)
				};
				return function(){
					if(_ms.bool(gt_63(9))){
						return `${_ms.show(dig(1))}${_ms.show(dig(10))}${_ms.show(rec(9))}`
					} else if(_ms.bool(gt_63(5))){
						return `${_ms.show(dig(5))}${_ms.show(rec(5))}`
					} else if(_ms.bool(gt_63(4))){
						return `${_ms.show(dig(1))}${_ms.show(dig(5))}${_ms.show(rec(4))}`
					} else {
						return `${_ms.show(dig(1))}${_ms.show(rec(1))}`
					}
				}()
			},built)
		}();
		const name=exports.name=`roman-numerals`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vcm9tYW4tbnVtZXJhbHMubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFRQSwrQkFDYzs7bUJBQWIsRUFBTTttQkFDTixFQUFNO21CQUNOLEdBQU87bUJBQ1AsR0FBTzttQkFDUCxJQUFRO21CQUNSLElBQVE7bUJBQ1IsS0FBUzs7O0VBRVYsOEJBQXFCLGlDQUFBLEVBQ0M7VUFBckIsSUFBSSxHQUFJLGFBQVksSUFBSSxHQUFHO0VBQUE7RUFFNUIsb0NBQ007O0dBQUwsb0JBQ0M7R0FFRCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLEdBQVE7b0JBQ1YsQ0FBRSxHQUFRO29CQUNWLENBQUUsR0FBUTtvQkFDVixDQUFFLEdBQVE7b0JBQ1YsQ0FBRSxJQUFTO29CQUNYLENBQUUsSUFBUztvQkFDWCxDQUFFLE1BQVc7OztrQkFFYixlQUFBLEVBSUE7c0JBSkU7eURBRXdCLEVBQUUsTUFBTTtJQUVsQyxVQUFNLHdCQUFrQjtJQUN4QixVQUFPLGFBQUEsZUFDWTtvQkFBbEIsZUFBYyxJQUFFLGVBQWE7SUFBQTtJQUM5QixVQUFPLGFBQUEsZUFDWTs7TUFBYixRQUFBLElBQUUsRUFBRyxJQUFFLGVBQWE7TUFDeEIsWUFBQSxPQUFHLEVBQUUsSUFDQztjQUFKO01BQUEsT0FFRTtjQUFILE1BQUs7TUFBQTtLQUFBO0lBQUE7SUFDUixZQUFPLGVBQUEsZUFDWTtZQUFsQixVQUFLLElBQUUsZUFBYSxLQUFLO0lBQUE7O0tBRXpCLFlBQUEsTUFBSSxJQUNDO2FBQUgsWUFBQyxJQUFJLGVBQUcsSUFBSSxnQkFBSSxJQUFJO1lBQ3RCLFlBQUEsTUFBSSxJQUNDO2FBQUgsWUFBQyxJQUFJLGVBQUcsSUFBSTtZQUNkLFlBQUEsTUFBSSxJQUNDO2FBQUgsWUFBQyxJQUFJLGVBQUcsSUFBSSxlQUFHLElBQUk7WUFFakI7YUFBRixZQUFDLElBQUksZUFBRyxJQUFJOzs7OztFQXhEakIsd0JBQUEiLCJmaWxlIjoibWV0YS9kZW1vL3JvbWFuLW51bWVyYWxzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=