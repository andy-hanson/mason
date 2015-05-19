"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./compare","./js","./math/Number","./private/js-impl","./Type/Method","./bang"],function(exports,compare_0,js_1,Number_2,js_45impl_3,Method_4,_33_5){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_61_63=_$2["=?"],_$3=_ms.getModule(js_1),js_45bar=_$3["js-bar"],_$4=_ms.getModule(Number_2),Int=_$4.Int,_$5=_ms.getModule(js_45impl_3),hashCodeDefault=_$5.hashCodeDefault,hashCodeString=_$5.hashCodeString,Method=_ms.getDefaultExport(Method_4),_$6=_ms.getModule(Method_4),impl_33=_$6["impl!"],_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_5)
		}),_$8=_ms.lazyGetModule(_33_5),_33not=_ms.lazyProp(_$8,"!not");
		const keep_45small=function keep_45small(_){
			return js_45bar(_,0)
		};
		const hash_45code=Method(function(){
			const doc="Integer used to identify a value in a Hash-Map! (or Hash-Set!).\nThis should have a high probability of being different than the hash-codes of the other values in the map.";
			const args=1;
			const returns=Int;
			const allow_45null_63=true;
			const _default=function _default(_){
				return hashCodeDefault(_,hash_45code)
			};
			return {
				doc:doc,
				args:args,
				returns:returns,
				"allow-null?":allow_45null_63,
				default:_default,
				name:"hash-code"
			}
		}());
		impl_33(hash_45code,Boolean,function(_){
			return function(){
				if(_){
					return 1
				} else {
					return 0
				}
			}()
		});
		impl_33(hash_45code,Function,function(fun){
			return hash_45code(function(){
				const _=fun.name;
				if(_61_63(0,_.length)){
					return fun.toString()
				} else {
					return _
				}
			}())
		});
		impl_33(hash_45code,String,function(){
			return _ms.set(hashCodeString)
		}());
		impl_33(hash_45code,Symbol,function(){
			return _ms.set(function(){
				return 42
			})
		}());
		impl_33(hash_45code,Number,keep_45small);
		const name=exports.name="hash-code";
		exports.default=hash_45code;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9oYXNoLWNvZGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQVNBLG1CQUFjLHNCQUFBLEVBQ0M7VUFBZCxTQUFPLEVBQUU7RUFBQTtFQUVWLGtCQUFZLGlCQUNNO0dBQWpCLFVBQ0M7R0FZRCxXQUFNO0dBQ04sY0FBUztHQUNULHNCQUFhO0dBQ2IsZUFBVSxrQkFBQSxFQUNDO1dBQVYsZ0JBQWdCLEVBQUU7R0FBQTs7Ozs7Ozs7OztFQUdwQixRQUFNLFlBQVUsUUFBUyxTQUFBLEVBQUE7O0lBQ3hCLEdBQUEsRUFDQztZQUFBO0lBQUEsT0FFRztZQUFIO0lBQUE7R0FBQTtFQUFBO0VBRUYsUUFBTSxZQUFVLFNBQVUsU0FBQSxJQUNHO1VBQzVCO0lBQWUsUUFBQTtJQUNkLEdBQUEsT0FBRyxFQUFFLFVBQ3dCO1lBQTVCO1dBRUc7WUFBSDtJQUFBO0dBQUE7RUFBQTtFQUdILFFBQU0sWUFBVSxpQkFDTTtrQkFHckI7RUFBQTtFQUVELFFBQU0sWUFBVSxpQkFDTTtrQkFHcEIsVUFDSTtXQUNKO0dBQUE7RUFBQTtFQUdGLFFBQU0sWUFBVSxPQUFPO0VBL0R2Qix3QkFBQTtrQkFpRUEiLCJmaWxlIjoiaGFzaC1jb2RlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=