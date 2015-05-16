"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Object","../../show","../../Type/Method","../../Type/Type","../at","./Map","./Weak-Id-Mapbang"],function(exports,Object_0,show_1,Method_2,Type_3,_64_4,Map_5,Weak_45Id_45Map_33_6){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Object_0),flag_63=_ms.get(_$2,"flag?"),show=_ms.getDefaultExport(show_1),_$4=_ms.getModule(Method_2),impl_33=_ms.get(_$4,"impl!"),_$5=_ms.getModule(Type_3),_61_62=_ms.get(_$5,"=>"),type_45of=_ms.get(_$5,"type-of"),_$6=_ms.getModule(_64_4),map_39=_ms.get(_$6,"map'"),Map=_ms.getDefaultExport(Map_5),Weak_45Id_45Map_33=_ms.getDefaultExport(Weak_45Id_45Map_33_6);
		impl_33(show,Map,function(){
			const test=function test(){
				const m=function(){
					const _k0=1,_v0=2;
					return _ms.map(_k0,_v0)
				}();
				const _k0=[m],_v0="\n\t1 -> 2";
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(_,opts){
				const parts=map_39(_,function(pair){
					const _$23=pair,key=_$23.key,val=_$23.val;
					return (((""+_ms.show(show(key,opts)))+" -> ")+_ms.show(show(val,opts)))
				});
				const type=function(){
					if(_ms.bool(flag_63(opts,"repr"))){
						return show(type_45of(_),opts)
					} else {
						return ""
					}
				}();
				return (((""+_ms.show(type))+"\n\t")+_ms.show(_61_62(String,parts,"\n\t")))
			},"test",test)
		}());
		const name=exports.name="show-Map";
		exports.default=impl_33(show,Weak_45Id_45Map_33,function(){
			return "<a Weak-Id-Map!>"
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9zaG93LU1hcC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVNBLFFBQU0sS0FBSyxjQUNHO0dBQWIsV0FDTyxlQUFBO0lBQU4sa0JBQ0c7S0FBRixVQUFBLE1BQUs7OztJQUNOLFVBQUEsQ0FBRSxPQUFROzs7a0JBTVYsU0FBQSxFQUFFLEtBQ0k7SUFDTixZQUFRLE9BQUssRUFBRyxTQUFBLEtBQ0k7S0FBbkIsV0FBVTtZQUNULEdBS0MsWUFMQSxLQUFLLElBQUkseUJBQVUsS0FBSyxJQUFJO0lBQUE7SUFDL0I7S0FDQyxZQUFBLFFBQU0sS0FBTSxTQUNLO2FBQWhCLEtBQUssVUFBQSxHQUFTO0tBQUEsT0FFWDthQUFGO0tBQUE7SUFBQTtXQUVGLEdBRkUsWUFFRCx3QkFDQyxPQUFHLE9BQU8sTUFBTztHQUFBOztFQS9CdEIsd0JBQUE7a0JBaUNBLFFBQU0sS0FBSyxtQkFDYyxVQUFBO1VBQXZCO0VBQUEiLCJmaWxlIjoiYXQvTWFwL3Nob3ctTWFwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=