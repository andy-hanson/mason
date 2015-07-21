"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Object","../../show","../../Type/Method","../../Type/Type","../at","./Map","./Weak-Id-Map"],(exports,Object_0,show_1,Method_2,Type_3,_64_4,Map_5,Weak_45Id_45Map_6)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Object_0),flag_63=_ms.get(_$2,"flag?"),show=_ms.getDefaultExport(show_1),_$4=_ms.getModule(Method_2),impl_33=_ms.get(_$4,"impl!"),_$5=_ms.getModule(Type_3),_61_62=_ms.get(_$5,"=>"),type_45of=_ms.get(_$5,"type-of"),_$6=_ms.getModule(_64_4),map_39=_ms.get(_$6,"map'"),Map=_ms.getDefaultExport(Map_5),Weak_45Id_45Map=_ms.getDefaultExport(Weak_45Id_45Map_6);
		impl_33(show,Map,()=>{
			const built={};
			const test=built.test=function test(){
				const built=new global.Map();
				const m=()=>{
					const built=new global.Map();
					_ms.assoc(built,1,2);
					return built
				}();
				_ms.assoc(built,[m],`\n\t1 -> 2`);
				return built
			};
			return _ms.set(function(opts){
				const _this=this;
				const parts=map_39(_this,pair=>{
					return `${_ms.show(show(_ms.sub(pair,0),opts))} -> ${_ms.show(show(_ms.sub(pair,1),opts))}`
				});
				const type=()=>{
					if(_ms.bool(flag_63(opts,`repr`))){
						return show(type_45of(_this),opts)
					} else {
						return ""
					}
				}();
				return `${_ms.show(type)}\n\t${_ms.show(_61_62(String,parts,`\n\t`))}`
			},built)
		}());
		const name=exports.name=`show-Map`;
		exports.default=impl_33(show,Weak_45Id_45Map,()=>{
			return `<a Weak-Id-Map>`
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9zaG93LU1hcC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVNBLFFBQU0sS0FBSyxRQUNHOztHQUFiLHNCQUNPLGVBQUE7O0lBQU4sWUFDRzs7cUJBQUYsRUFBSzs7O29CQUNOLENBQUUsR0FBUTs7O2tCQU1ULFNBQUEsS0FDSTs7SUFFTCxZQUFRLE9BQUssTUFBTSxNQUNJO1lBQXJCLFlBQUMsYUFBSyxLQUFLLEdBQUcsc0JBQVUsYUFBSyxLQUFLLEdBQUc7O0lBQ3ZDO0tBQ0MsWUFBQSxRQUFNLEtBQU0sU0FDSzthQUFoQixLQUFNLFVBQVEsT0FBTTtLQUFBLE9BRWpCO2FBQUY7S0FBQTtJQUFBO1dBRUYsWUFBQyxxQkFDQyxPQUFHLE9BQU8sTUFBTzs7O0VBL0J0Qix3QkFBQTtrQkFpQ0EsUUFBTSxLQUFLLGdCQUNhLElBQUE7VUFBdEIiLCJmaWxlIjoiYXQvTWFwL3Nob3ctTWFwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=