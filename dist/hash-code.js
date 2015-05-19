"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./compare","./js","./math/Number","./private/js-impl","./Type/Method","./bang"],function(exports,compare_0,js_1,Number_2,js_45impl_3,Method_4,_33_5){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(js_1),js_45bar=_ms.get(_$3,"js-bar"),_$4=_ms.getModule(Number_2),Int=_ms.get(_$4,"Int"),_$5=_ms.getModule(js_45impl_3),hashCodeDefault=_ms.get(_$5,"hashCodeDefault"),hashCodeString=_ms.get(_$5,"hashCodeString"),Method=_ms.getDefaultExport(Method_4),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_5)
		}),_$8=_ms.lazyGetModule(_33_5),_33not=_ms.lazyProp(_$8,"!not");
		const keep_45small=function keep_45small(_){
			return js_45bar(_,0)
		};
		const hash_45code=Method(function(){
			const doc="Integer used to identify a value in a Hash-Map! (or Hash-Set!).\nThis should have a high probability of being different than the hash-codes of the other values in the map.";
			const test=function test(){
				const a=function(){
					const x=1;
					const y=2;
					return {
						x:x,
						y:y,
						name:"a"
					}
				}();
				const b=function(){
					const x=1;
					const y=1;
					return {
						x:x,
						y:y,
						name:"b"
					}
				}();
				_ms.unlazy(_33)(_61_63,hash_45code(a),hash_45code(a));
				return _ms.unlazy(_33not)(_61_63,hash_45code(a),hash_45code(b))
			};
			const args=1;
			const returns=Int;
			const allow_45null_63=true;
			const _default=function _default(_){
				return hashCodeDefault(_,hash_45code)
			};
			return {
				doc:doc,
				test:test,
				args:args,
				returns:returns,
				"allow-null?":allow_45null_63,
				default:_default,
				name:"hash-code"
			}
		}());
		impl_33(hash_45code,Boolean,function(_){
			return function(){
				if(_ms.bool(_)){
					return 1
				} else {
					return 0
				}
			}()
		});
		impl_33(hash_45code,Function,function(fun){
			return hash_45code(function(){
				const _=fun.name;
				if(_ms.bool(_61_63(0,_.length))){
					return fun.toString()
				} else {
					return _
				}
			}())
		});
		impl_33(hash_45code,String,function(){
			const test=function test(){
				_ms.unlazy(_33)(_61_63,hash_45code("a"),hash_45code("a"));
				return _ms.unlazy(_33not)(_61_63,hash_45code("a"),hash_45code("b"))
			};
			return _ms.set(hashCodeString,"test",test)
		}());
		impl_33(hash_45code,Symbol,function(){
			const test=function test(){
				const sym=Symbol("test");
				return _ms.unlazy(_33)(_61_63,hash_45code(sym),hash_45code(sym))
			};
			return _ms.set(function(){
				return _ms.checkContains(Int,42,"res")
			},"test",test)
		}());
		impl_33(hash_45code,Number,keep_45small);
		const name=exports.name="hash-code";
		exports.default=hash_45code;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9oYXNoLWNvZGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQVNBLG1CQUFjLHNCQUFBLEVBQ0M7VUFBZCxTQUFPLEVBQUU7RUFBQTtFQUVWLGtCQUFZLGlCQUNNO0dBQWpCLFVBQ0M7R0FFRCxXQUNPLGVBQUE7SUFBTixrQkFDRztLQUFGLFFBQUc7S0FDSCxRQUFHOzs7Ozs7O0lBQ0osa0JBQ0c7S0FBRixRQUFHO0tBQ0gsUUFBRzs7Ozs7OztvQkFDRixPQUFJLFlBQVUsR0FBSSxZQUFVOzhCQUN6QixPQUFJLFlBQVUsR0FBSSxZQUFVO0dBQUE7R0FFbEMsV0FBTTtHQUNOLGNBQVM7R0FDVCxzQkFBYTtHQUNiLGVBQVUsa0JBQUEsRUFDQztXQUFWLGdCQUFnQixFQUFFO0dBQUE7Ozs7Ozs7Ozs7O0VBR3BCLFFBQU0sWUFBVSxRQUFTLFNBQUEsRUFBQTs7SUFDeEIsWUFBQSxHQUNDO1lBQUE7SUFBQSxPQUVHO1lBQUg7SUFBQTtHQUFBO0VBQUE7RUFFRixRQUFNLFlBQVUsU0FBVSxTQUFBLElBQ0c7VUFDNUI7SUFBZSxRQUFBO0lBQ2QsWUFBQSxPQUFHLEVBQUUsV0FDd0I7WUFBNUI7V0FFRztZQUFIO0lBQUE7R0FBQTtFQUFBO0VBR0gsUUFBTSxZQUFVLGlCQUNNO0dBQXJCLFdBQ08sZUFBQTtvQkFBSixPQUFJLFlBQVcsS0FBSyxZQUFXOzhCQUM1QixPQUFJLFlBQVcsS0FBSyxZQUFXO0dBQUE7a0JBQ3JDOztFQUVELFFBQU0sWUFBVSxpQkFDTTtHQUFyQixXQUNPLGVBQUE7SUFBTixVQUFNLE9BQVE7MkJBQ1osT0FBSSxZQUFVLEtBQU0sWUFBVTtHQUFBO2tCQUNoQyxVQUNJOzZCQURILElBRUQ7OztFQUdGLFFBQU0sWUFBVSxPQUFPO0VBL0R2Qix3QkFBQTtrQkFpRUEiLCJmaWxlIjoiaGFzaC1jb2RlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=