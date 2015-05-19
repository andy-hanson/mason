"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./methods","../bang","./Number"],function(exports,methods_0,_33_1,Number_2){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(methods_0),_42=_$2["*"],_47=_$2["/"],_$4=_ms.lazyGetModule(_33_1),_33call_45with=_ms.lazyProp(_$4,"!call-with"),_$5=_ms.lazyGetModule(Number_2),near_63=_ms.lazyProp(_$5,"near?");
		const doc=exports.doc="For dealing with angles. By default angles are in radians.";
		const pi=exports.pi=Math.PI;
		const pi_472=exports["pi/2"]=_47(pi,2);
		const pi3_472=exports["pi3/2"]=_42(pi,1.5);
		const pi_422=exports["pi*2"]=_42(pi,2);
		const sin=exports.sin=function(){
			const doc="Y-value of the point on the unit circle this many radians counter-clockwise from +x.";
			return _ms.set(function sin(radian_45angle){
				return Math.sin(radian_45angle)
			},"doc",doc)
		}();
		const cos=exports.cos=function(){
			const doc="X-value of the point on the unit circle this many radians counter-clockwise from +x.";
			return _ms.set(function cos(radian_45angle){
				return Math.cos(radian_45angle)
			},"doc",doc)
		}();
		const tan=exports.tan=function(){
			const doc="`/ sin cos`";
			return _ms.set(function tan(radian_45angle){
				return Math.tan(radian_45angle)
			},"doc",doc)
		}();
		const acos=exports.acos=function(){
			const doc="`cos res` should be `cos`.";
			return _ms.set(function acos(cos){
				return Math.acos(cos)
			},"doc",doc)
		}();
		const asin=exports.asin=function(){
			const doc="`sin res` should be `sin`.";
			return _ms.set(function asin(sin){
				return Math.asin(sin)
			},"doc",doc)
		}();
		const atan=exports.atan=function(){
			const doc="`tan res` should be `tan`.";
			return _ms.set(function atan(tan){
				return Math.atan(tan)
			},"doc",doc)
		}();
		const degrees_45to_45radians_45factor=exports["degrees-to-radians-factor"]=_47(pi,180);
		const degrees_45to_45radians=exports["degrees-to-radians"]=function(){
			const doc="Converts an angle in degrees to one in radians.";
			return _ms.set(function degrees_45to_45radians(degrees){
				return _42(degrees,degrees_45to_45radians_45factor)
			},"doc",doc)
		}();
		const radians_45to_45degrees_45factor=exports["radians-to-degrees-factor"]=_47(180,pi);
		const radians_45to_45degrees=exports["radians-to-degrees"]=function(){
			const doc="Converts an angle in radians to one in degrees.";
			return _ms.set(function radians_45to_45degrees(radians){
				return _42(radians,radians_45to_45degrees_45factor)
			},"doc",doc)
		}();
		const name=exports.name="trig";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tYXRoL3RyaWcubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFNQSxzQkFBTTtFQUVOLG9CQUFJO0VBQ0osNkJBQU0sSUFBRSxHQUFHO0VBQ1gsK0JBQU8sSUFBRSxHQUFHO0VBQ1osNkJBQU0sSUFBRSxHQUFHO0VBRVgsZ0NBQ0k7R0FBSCxVQUFNO2tCQU9MLGFBQUEsZUFDbUI7V0FBbkIsU0FBUztHQUFBOztFQUVYLGdDQUNJO0dBQUgsVUFBTTtrQkFPTCxhQUFBLGVBQ21CO1dBQW5CLFNBQVM7R0FBQTs7RUFFWCxnQ0FDSTtHQUFILFVBQU07a0JBS0wsYUFBQSxlQUNtQjtXQUFuQixTQUFTO0dBQUE7O0VBRVgsa0NBQ0s7R0FBSixVQUFNO2tCQU1MLGNBQUEsSUFDVTtXQUFWLFVBQVU7R0FBQTs7RUFFWixrQ0FDSztHQUFKLFVBQU07a0JBTUwsY0FBQSxJQUNVO1dBQVYsVUFBVTtHQUFBOztFQUVaLGtDQUNLO0dBQUosVUFBTTtrQkFJTCxjQUFBLElBQ1U7V0FBVixVQUFVO0dBQUE7O0VBR1gsMkVBQTJCLElBQUUsR0FBRztFQUNoQyxxRUFDbUI7R0FBbEIsVUFBTTtrQkFHTCxnQ0FBQSxRQUNjO1dBQWQsSUFBRSxRQUFRO0dBQUE7O0VBRVosMkVBQTJCLElBQUUsSUFBSTtFQUNqQyxxRUFDbUI7R0FBbEIsVUFBTTtrQkFHTCxnQ0FBQSxRQUNjO1dBQWQsSUFBRSxRQUFRO0dBQUE7O0VBdkZiLHdCQUFBIiwiZmlsZSI6Im1hdGgvdHJpZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9