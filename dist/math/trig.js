"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./methods","../bang","./Number"],function(exports,methods_0,_33_1,Number_2){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(methods_0),_42=_ms.get(_$2,"*"),_47=_ms.get(_$2,"/"),_$4=_ms.lazyGetModule(_33_1),_33call_45with=_ms.lazyProp(_$4,"!call-with"),_$5=_ms.lazyGetModule(Number_2),near_63=_ms.lazyProp(_$5,"near?");
		const doc=exports.doc="For dealing with angles. By default angles are in radians.";
		const pi=exports.pi=Math.PI;
		const pi_472=exports["pi/2"]=_47(pi,2);
		const pi3_472=exports["pi3/2"]=_42(pi,1.5);
		const pi_422=exports["pi*2"]=_42(pi,2);
		const sin=exports.sin=function(){
			const doc="Y-value of the point on the unit circle this many radians counter-clockwise from +x.";
			const test=function test(){
				_ms.unlazy(_33call_45with)(_ms.unlazy(near_63),sin,function(){
					const built=new global.Map();
					_ms.assoc(built,[0],0);
					_ms.assoc(built,[pi_472],1);
					_ms.assoc(built,[pi],0);
					_ms.assoc(built,[pi3_472],- 1);
					return built
				}())
			};
			return _ms.set(function sin(radian_45angle){
				_ms.checkContains(Number,radian_45angle,"radian-angle");
				return Math.sin(radian_45angle)
			},"doc",doc,"test",test)
		}();
		const cos=exports.cos=function(){
			const doc="X-value of the point on the unit circle this many radians counter-clockwise from +x.";
			const test=function test(){
				_ms.unlazy(_33call_45with)(_ms.unlazy(near_63),cos,function(){
					const built=new global.Map();
					_ms.assoc(built,[0],1);
					_ms.assoc(built,[pi_472],0);
					_ms.assoc(built,[pi],- 1);
					_ms.assoc(built,[pi3_472],0);
					return built
				}())
			};
			return _ms.set(function cos(radian_45angle){
				_ms.checkContains(Number,radian_45angle,"radian-angle");
				return Math.cos(radian_45angle)
			},"doc",doc,"test",test)
		}();
		const tan=exports.tan=function(){
			const doc="`/ sin cos`";
			const test=function test(){
				_ms.unlazy(_33call_45with)(_ms.unlazy(near_63),tan,function(){
					const built=new global.Map();
					_ms.assoc(built,[0],0);
					_ms.assoc(built,[pi],0);
					return built
				}())
			};
			return _ms.set(function tan(radian_45angle){
				_ms.checkContains(Number,radian_45angle,"radian-angle");
				return Math.tan(radian_45angle)
			},"doc",doc,"test",test)
		}();
		const acos=exports.acos=function(){
			const doc="`cos res` should be `cos`.";
			const test=function test(){
				_ms.unlazy(_33call_45with)(_ms.unlazy(near_63),acos,function(){
					const built=new global.Map();
					_ms.assoc(built,[0],pi_472);
					_ms.assoc(built,[0.5],_47(pi,3));
					_ms.assoc(built,[1],0);
					return built
				}())
			};
			return _ms.set(function acos(cos){
				_ms.checkContains(Number,cos,"cos");
				return Math.acos(cos)
			},"doc",doc,"test",test)
		}();
		const asin=exports.asin=function(){
			const doc="`sin res` should be `sin`.";
			const test=function test(){
				_ms.unlazy(_33call_45with)(_ms.unlazy(near_63),asin,function(){
					const built=new global.Map();
					_ms.assoc(built,[0],0);
					_ms.assoc(built,[0.5],_47(pi,6));
					_ms.assoc(built,[1],pi_472);
					return built
				}())
			};
			return _ms.set(function asin(sin){
				_ms.checkContains(Number,sin,"sin");
				return Math.asin(sin)
			},"doc",doc,"test",test)
		}();
		const atan=exports.atan=function(){
			const doc="`tan res` should be `tan`.";
			const test=function test(){
				_ms.unlazy(_33call_45with)(_ms.unlazy(near_63),atan,function(){
					const built=new global.Map();
					_ms.assoc(built,[0],0);
					return built
				}())
			};
			return _ms.set(function atan(tan){
				_ms.checkContains(Number,tan,"tan");
				return Math.atan(tan)
			},"doc",doc,"test",test)
		}();
		const degrees_45to_45radians_45factor=exports["degrees-to-radians-factor"]=_47(pi,180);
		const degrees_45to_45radians=exports["degrees-to-radians"]=function(){
			const doc="Converts an angle in degrees to one in radians.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[180],pi);
				return built
			};
			return _ms.set(function degrees_45to_45radians(degrees){
				_ms.checkContains(Number,degrees,"degrees");
				return _42(degrees,degrees_45to_45radians_45factor)
			},"doc",doc,"test",test)
		}();
		const radians_45to_45degrees_45factor=exports["radians-to-degrees-factor"]=_47(180,pi);
		const radians_45to_45degrees=exports["radians-to-degrees"]=function(){
			const doc="Converts an angle in radians to one in degrees.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[pi],180);
				return built
			};
			return _ms.set(function radians_45to_45degrees(radians){
				_ms.checkContains(Number,radians,"radians");
				return _42(radians,radians_45to_45degrees_45factor)
			},"doc",doc,"test",test)
		}();
		const name=exports.name="trig";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tYXRoL3RyaWcubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFNQSxzQkFBTTtFQUVOLG9CQUFJO0VBQ0osNkJBQU0sSUFBRSxHQUFHO0VBQ1gsK0JBQU8sSUFBRSxHQUFHO0VBQ1osNkJBQU0sSUFBRSxHQUFHO0VBRVgsZ0NBQ0k7R0FBSCxVQUFNO0dBQ04sV0FDUSxlQUFBO21EQUFVLGNBQ0c7O3FCQUFuQixDQUFFLEdBQU87cUJBQ1QsQ0FBRSxRQUFVO3FCQUNaLENBQUUsSUFBUTtxQkFDVixDQUFFLFNBQVc7Ozs7a0JBQ2QsYUFBQSxlQUNtQjtzQkFETjtXQUNiLFNBQVM7R0FBQTs7RUFFWCxnQ0FDSTtHQUFILFVBQU07R0FDTixXQUNRLGVBQUE7bURBQVUsY0FDRzs7cUJBQW5CLENBQUUsR0FBTztxQkFDVCxDQUFFLFFBQVU7cUJBQ1osQ0FBRSxJQUFRO3FCQUNWLENBQUUsU0FBVzs7OztrQkFDZCxhQUFBLGVBQ21CO3NCQUROO1dBQ2IsU0FBUztHQUFBOztFQUVYLGdDQUNJO0dBQUgsVUFBTTtHQUNOLFdBQ1EsZUFBQTttREFBVSxjQUNHOztxQkFBbkIsQ0FBRSxHQUFPO3FCQUNULENBQUUsSUFBUTs7OztrQkFDWCxhQUFBLGVBQ21CO3NCQUROO1dBQ2IsU0FBUztHQUFBOztFQUVYLGtDQUNLO0dBQUosVUFBTTtHQUNOLFdBQ1EsZUFBQTttREFBVSxlQUNJOztxQkFBcEIsQ0FBRSxHQUFPO3FCQUNULENBQUUsS0FBUyxJQUFFLEdBQUc7cUJBQ2hCLENBQUUsR0FBTzs7OztrQkFDVixjQUFBLElBQ1U7c0JBRE47V0FDSixVQUFVO0dBQUE7O0VBRVosa0NBQ0s7R0FBSixVQUFNO0dBQ04sV0FDUSxlQUFBO21EQUFVLGVBQ0k7O3FCQUFwQixDQUFFLEdBQU87cUJBQ1QsQ0FBRSxLQUFTLElBQUUsR0FBRztxQkFDaEIsQ0FBRSxHQUFPOzs7O2tCQUNWLGNBQUEsSUFDVTtzQkFETjtXQUNKLFVBQVU7R0FBQTs7RUFFWixrQ0FDSztHQUFKLFVBQU07R0FDTixXQUNRLGVBQUE7bURBQVUsZUFDSTs7cUJBQXBCLENBQUUsR0FBTzs7OztrQkFDVixjQUFBLElBQ1U7c0JBRE47V0FDSixVQUFVO0dBQUE7O0VBR1gsMkVBQTJCLElBQUUsR0FBRztFQUNoQyxxRUFDbUI7R0FBbEIsVUFBTTtHQUNOLFdBQ08sZUFBQTs7b0JBQU4sQ0FBRSxLQUFTOzs7a0JBQ1gsZ0NBQUEsUUFDYztzQkFETjtXQUNSLElBQUUsUUFBUTtHQUFBOztFQUVaLDJFQUEyQixJQUFFLElBQUk7RUFDakMscUVBQ21CO0dBQWxCLFVBQU07R0FDTixXQUNPLGVBQUE7O29CQUFOLENBQUUsSUFBUTs7O2tCQUNWLGdDQUFBLFFBQ2M7c0JBRE47V0FDUixJQUFFLFFBQVE7R0FBQTs7RUF2RmIsd0JBQUEiLCJmaWxlIjoibWF0aC90cmlnLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=