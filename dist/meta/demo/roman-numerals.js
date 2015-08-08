"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../math/Number","../../math/methods","../../at/Range","../../Type/Type"],(exports,compare_0,Number_1,methods_2,Range_3,Type_4)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_60_61_63=_ms.get(_$2,"<=?"),_$3=_ms.getModule(Number_1),log=_ms.get(_$3,"log"),Nat=_ms.get(_$3,"Nat"),pow=_ms.get(_$3,"pow"),round_45down=_ms.get(_$3,"round-down"),_$4=_ms.getModule(methods_2),_45=_ms.get(_$4,"-"),_42=_ms.get(_$4,"*"),Range=_ms.lazy(()=>{
			return _ms.getDefaultExport(Range_3)
		}),_$7=_ms.lazyGetModule(Type_4),contains_63=_ms.lazyProp(_$7,"contains?");
		const roman_45digits=(()=>{
			const built=new (global.Map)();
			_ms.assoc(built,1,`I`);
			_ms.assoc(built,5,`V`);
			_ms.assoc(built,10,`X`);
			_ms.assoc(built,50,`L`);
			_ms.assoc(built,100,`C`);
			_ms.assoc(built,500,`D`);
			_ms.assoc(built,1000,`M`);
			return built
		})();
		const power_45of_4510_45below=function power_45of_4510_45below(_){
			return pow(10,round_45down(log(10,_)))
		};
		const roman=exports.roman=(()=>{
			const built={};
			const doc=built.doc=`Converts a number to Roman numerals.\nOnly works for values 1-3999.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
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
				_ms.assert(_ms.unlazy(contains_63),new (_ms.unlazy(Range))(1,4000),n);
				const dec=power_45of_4510_45below(n);
				const dig=function dig(dec_45multiple){
					return _ms.sub(roman_45digits,_42(dec_45multiple,dec))
				};
				const rec=function rec(dec_45multiple){
					return (()=>{
						const _=_45(n,_42(dec_45multiple,dec));
						if(_61_63(_,0)){
							return ""
						} else {
							return roman(_)
						}
					})()
				};
				const gt_63=function gt_63(dec_45multiple){
					return _60_61_63(_42(dec_45multiple,dec),n)
				};
				return (()=>{
					if(gt_63(9)){
						return `${dig(1)}${dig(10)}${rec(9)}`
					} else if(gt_63(5)){
						return `${dig(5)}${rec(5)}`
					} else if(gt_63(4)){
						return `${dig(1)}${dig(5)}${rec(4)}`
					} else {
						return `${dig(1)}${rec(1)}`
					}
				})()
			},built)
		})();
		const name=exports.name=`roman-numerals`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vcm9tYW4tbnVtZXJhbHMubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQVFBLHFCQUNjLEtBQUE7O21CQUFiLEVBQU07bUJBQ04sRUFBTTttQkFDTixHQUFPO21CQUNQLEdBQU87bUJBQ1AsSUFBUTttQkFDUixJQUFRO21CQUNSLEtBQVM7OztFQUVWLDhCQUFxQixpQ0FBQSxFQUNDO1VBQXJCLElBQUksR0FBSSxhQUFZLElBQUksR0FBRztFQUFBO0VBRTVCLDBCQUNNLEtBQUE7O0dBQUwsb0JBQ0M7R0FFRCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLEdBQVE7b0JBQ1YsQ0FBRSxHQUFRO29CQUNWLENBQUUsR0FBUTtvQkFDVixDQUFFLEdBQVE7b0JBQ1YsQ0FBRSxJQUFTO29CQUNYLENBQUUsSUFBUztvQkFDWCxDQUFFLE1BQVc7OztrQkFFYixlQUFBLEVBSUE7c0JBSkU7dUNBRWtCLHdCQUFVLEVBQUUsTUFBTTtJQUV0QyxVQUFNLHdCQUFrQjtJQUN4QixVQUFPLGFBQUEsZUFDWTtvQkFBbEIsZUFBYyxJQUFFLGVBQWE7SUFBQTtJQUM5QixVQUFPLGFBQUEsZUFDWTtZQUFiO01BQUEsUUFBQSxJQUFFLEVBQUcsSUFBRSxlQUFhO01BQ3hCLEdBQUEsT0FBRyxFQUFFLEdBQ0M7Y0FBSjtNQUFBLE9BRUU7Y0FBSCxNQUFLO01BQUE7S0FBQTtJQUFBO0lBQ1IsWUFBTyxlQUFBLGVBQ1k7WUFBbEIsVUFBSyxJQUFFLGVBQWEsS0FBSztJQUFBO1dBRXRCO0tBQUgsR0FBQSxNQUFJLEdBQ0M7YUFBSCxHQUFDLElBQUksS0FBRyxJQUFJLE1BQUksSUFBSTtZQUN0QixHQUFBLE1BQUksR0FDQzthQUFILEdBQUMsSUFBSSxLQUFHLElBQUk7WUFDZCxHQUFBLE1BQUksR0FDQzthQUFILEdBQUMsSUFBSSxLQUFHLElBQUksS0FBRyxJQUFJO1lBRWpCO2FBQUYsR0FBQyxJQUFJLEtBQUcsSUFBSTs7Ozs7RUF4RGpCLHdCQUFBIiwiZmlsZSI6Im1ldGEvZGVtby9yb21hbi1udW1lcmFscy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9