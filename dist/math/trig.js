"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./methods","./Num","../bang","./Num"],function(exports,methods_0,Num_1,_33_2,Num_3){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(methods_0),_42=_ms.get(_$2,"*"),_47=_ms.get(_$2,"/"),Num=_ms.getDefaultExport(Num_1),_$5=_ms.lazyGetModule(_33_2),_33call_45with=_ms.lazyProp(_$5,"!call-with"),_$6=_ms.lazyGetModule(Num_3),near_63=_ms.lazyProp(_$6,"near?");
		const doc=exports.doc="For dealing with angles. By default angles are in radians.";
		const pi=exports.pi=Math.PI;
		const pi_472=exports["pi/2"]=_47(pi,2);
		const pi3_472=exports["pi3/2"]=_42(pi,1.5);
		const pi_422=exports["pi*2"]=_42(pi,2);
		const sin=exports.sin=function(){
			const doc="Y-value of the point on the unit circle this many radians counter-clockwise from +x.";
			const test=_ms.set(function(){
				return _ms.unlazy(_33call_45with)(_ms.unlazy(near_63),sin,function(){
					const _k0=[0],_v0=0;
					const _k1=[pi_472],_v1=1;
					const _k2=[pi],_v2=0;
					const _k3=[pi3_472],_v3=- 1;
					return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3)
				}())
			},"displayName","test");
			return _ms.set(function(radian_45angle){
				_ms.checkContains(Num,radian_45angle,"radian-angle");
				return Math.sin(radian_45angle)
			},"doc",doc,"test",test,"displayName","sin")
		}();
		const cos=exports.cos=function(){
			const doc="X-value of the point on the unit circle this many radians counter-clockwise from +x.";
			const test=_ms.set(function(){
				return _ms.unlazy(_33call_45with)(_ms.unlazy(near_63),cos,function(){
					const _k0=[0],_v0=1;
					const _k1=[pi_472],_v1=0;
					const _k2=[pi],_v2=- 1;
					const _k3=[pi3_472],_v3=0;
					return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3)
				}())
			},"displayName","test");
			return _ms.set(function(radian_45angle){
				_ms.checkContains(Num,radian_45angle,"radian-angle");
				return Math.cos(radian_45angle)
			},"doc",doc,"test",test,"displayName","cos")
		}();
		const tan=exports.tan=function(){
			const doc="`/ sin cos`";
			const test=_ms.set(function(){
				return _ms.unlazy(_33call_45with)(_ms.unlazy(near_63),tan,function(){
					const _k0=[0],_v0=0;
					const _k1=[pi],_v1=0;
					return _ms.map(_k0,_v0,_k1,_v1)
				}())
			},"displayName","test");
			return _ms.set(function(_){
				_ms.checkContains(Num,_,"_");
				return Math.tan(_)
			},"doc",doc,"test",test,"displayName","tan")
		}();
		const acos=exports.acos=function(){
			const doc="`cos res` should be `n`.";
			const test=_ms.set(function(){
				return _ms.unlazy(_33call_45with)(_ms.unlazy(near_63),acos,function(){
					const _k0=[0],_v0=pi_472;
					const _k1=[0.5],_v1=_47(pi,3);
					const _k2=[1],_v2=0;
					return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
				}())
			},"displayName","test");
			return _ms.set(function(n){
				_ms.checkContains(Num,n,"n");
				return Math.acos(n)
			},"doc",doc,"test",test,"displayName","acos")
		}();
		const asin=exports.asin=function(){
			const doc="`sin res` should be `n`.";
			const test=_ms.set(function(){
				return _ms.unlazy(_33call_45with)(_ms.unlazy(near_63),asin,function(){
					const _k0=[0],_v0=0;
					const _k1=[0.5],_v1=_47(pi,6);
					const _k2=[1],_v2=pi_472;
					return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
				}())
			},"displayName","test");
			return _ms.set(function(n){
				_ms.checkContains(Num,n,"n");
				return Math.asin(n)
			},"doc",doc,"test",test,"displayName","asin")
		}();
		const atan=exports.atan=function(){
			const doc="`tan res` should be `n`.";
			const test=_ms.set(function(){
				return _ms.unlazy(_33call_45with)(_ms.unlazy(near_63),atan,function(){
					const _k0=[0],_v0=0;
					return _ms.map(_k0,_v0)
				}())
			},"displayName","test");
			return _ms.set(function(n){
				_ms.checkContains(Num,n,"n");
				return Math.atan(n)
			},"doc",doc,"test",test,"displayName","atan")
		}();
		const degrees_45to_45radians_45factor=exports["degrees-to-radians-factor"]=_47(pi,180);
		const degrees_45to_45radians=exports["degrees-to-radians"]=function(){
			const doc="Converts an angle in degrees to one in radians.";
			const test=_ms.set(function(){
				const _k0=[180],_v0=pi;
				return _ms.map(_k0,_v0)
			},"displayName","test");
			return _ms.set(function(degrees){
				_ms.checkContains(Num,degrees,"degrees");
				return _42(degrees,degrees_45to_45radians_45factor)
			},"doc",doc,"test",test,"displayName","degrees-to-radians")
		}();
		const radians_45to_45degrees_45factor=exports["radians-to-degrees-factor"]=_47(180,pi);
		const radians_45to_45degrees=exports["radians-to-degrees"]=function(){
			const doc="Converts an angle in radians to one in degrees.";
			const test=_ms.set(function(){
				const _k0=[pi],_v0=180;
				return _ms.map(_k0,_v0)
			},"displayName","test");
			return _ms.set(function(radians){
				_ms.checkContains(Num,radians,"radians");
				return _42(radians,radians_45to_45degrees_45factor)
			},"doc",doc,"test",test,"displayName","radians-to-degrees")
		}();
		const displayName=exports.displayName="trig";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tYXRoL3RyaWcubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFPQSxzQkFBTTtFQUVOLG9CQUFJO0VBQ0osNkJBQU0sSUFBRSxHQUFHO0VBQ1gsK0JBQU8sSUFBRSxHQUFHO0VBQ1osNkJBQU0sSUFBRSxHQUFHO0VBRVgsZ0NBQ0k7R0FBSCxVQUFNO0dBQ04sbUJBQ08sVUFBQTswREFBVyxjQUNHO0tBQW5CLFVBQUEsQ0FBRSxPQUFPO0tBQ1QsVUFBQSxDQUFFLFlBQVU7S0FDWixVQUFBLENBQUUsUUFBUTtLQUNWLFVBQUEsQ0FBRSxhQUFXOzs7O2tCQUNkLFNBQUEsZUFDZ0I7c0JBREg7V0FDYixTQUFTO0dBQUE7O0VBRVgsZ0NBQ0k7R0FBSCxVQUFNO0dBQ04sbUJBQ08sVUFBQTswREFBVyxjQUNHO0tBQW5CLFVBQUEsQ0FBRSxPQUFPO0tBQ1QsVUFBQSxDQUFFLFlBQVU7S0FDWixVQUFBLENBQUUsUUFBUTtLQUNWLFVBQUEsQ0FBRSxhQUFXOzs7O2tCQUNkLFNBQUEsZUFDZ0I7c0JBREg7V0FDYixTQUFTO0dBQUE7O0VBRVgsZ0NBQ0k7R0FBSCxVQUFNO0dBQ04sbUJBQ08sVUFBQTswREFBVyxjQUNHO0tBQW5CLFVBQUEsQ0FBRSxPQUFPO0tBQ1QsVUFBQSxDQUFFLFFBQVE7Ozs7a0JBQ1gsU0FBQSxFQUNLO3NCQURIO1dBQ0YsU0FBUztHQUFBOztFQUVYLGtDQUNLO0dBQUosVUFBTTtHQUNOLG1CQUNPLFVBQUE7MERBQVcsZUFDSTtLQUFwQixVQUFBLENBQUUsT0FBTztLQUNULFVBQUEsQ0FBRSxTQUFTLElBQUUsR0FBRztLQUNoQixVQUFBLENBQUUsT0FBTzs7OztrQkFDVixTQUFBLEVBQ0s7c0JBREg7V0FDRixVQUFVO0dBQUE7O0VBRVosa0NBQ0s7R0FBSixVQUFNO0dBQ04sbUJBQ08sVUFBQTswREFBVyxlQUNJO0tBQXBCLFVBQUEsQ0FBRSxPQUFPO0tBQ1QsVUFBQSxDQUFFLFNBQVMsSUFBRSxHQUFHO0tBQ2hCLFVBQUEsQ0FBRSxPQUFPOzs7O2tCQUNWLFNBQUEsRUFDSztzQkFESDtXQUNGLFVBQVU7R0FBQTs7RUFFWixrQ0FDSztHQUFKLFVBQU07R0FDTixtQkFDTyxVQUFBOzBEQUFXLGVBQ0k7S0FBcEIsVUFBQSxDQUFFLE9BQU87Ozs7a0JBQ1YsU0FBQSxFQUNLO3NCQURIO1dBQ0YsVUFBVTtHQUFBOztFQUdYLDJFQUEyQixJQUFFLEdBQUc7RUFDaEMscUVBQ21CO0dBQWxCLFVBQU07R0FDTixtQkFDTyxVQUFBO0lBQU4sVUFBQSxDQUFFLFNBQVM7OztrQkFDWCxTQUFBLFFBQ1c7c0JBREg7V0FDUixJQUFFLFFBQVE7R0FBQTs7RUFFWiwyRUFBMkIsSUFBRSxJQUFJO0VBQ2pDLHFFQUNtQjtHQUFsQixVQUFNO0dBQ04sbUJBQ08sVUFBQTtJQUFOLFVBQUEsQ0FBRSxRQUFROzs7a0JBQ1YsU0FBQSxRQUNXO3NCQURIO1dBQ1IsSUFBRSxRQUFRO0dBQUE7O0VBeEZiLHNDQUFBIiwiZmlsZSI6Im1hdGgvdHJpZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9