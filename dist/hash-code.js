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
			const built={};
			const doc=built.doc=`Integer used to identify a value in a Hash-Map! (or Hash-Set!).\nThis should have a high probability of being different than the hash-codes of the other values in the map.`;
			const test=built.test=function test(){
				const a=function(){
					const built={};
					const x=built.x=1;
					const y=built.y=2;
					return _ms.setName(built,"a")
				}();
				const b=function(){
					const built={};
					const x=built.x=1;
					const y=built.y=1;
					return _ms.setName(built,"b")
				}();
				_ms.unlazy(_33)(_61_63,hash_45code(a),hash_45code(a));
				_ms.unlazy(_33not)(_61_63,hash_45code(a),hash_45code(b))
			};
			const args=built.args=1;
			const returns=built.returns=Int;
			const allow_45null_63=built["allow-null?"]=true;
			const _default=built.default=function _default(_){
				return hashCodeDefault(_,hash_45code)
			};
			return _ms.setName(built,"hash-code")
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
			const built={};
			const test=built.test=function test(){
				_ms.unlazy(_33)(_61_63,hash_45code(`a`),hash_45code(`a`));
				_ms.unlazy(_33not)(_61_63,hash_45code(`a`),hash_45code(`b`))
			};
			return _ms.set(hashCodeString,built)
		}());
		impl_33(hash_45code,Symbol,function(){
			const built={};
			const test=built.test=function test(){
				const sym=Symbol(`test`);
				_ms.unlazy(_33)(_61_63,hash_45code(sym),hash_45code(sym))
			};
			return _ms.set(function(){
				return _ms.checkContains(Int,42,"res")
			},built)
		}());
		impl_33(hash_45code,Number,keep_45small);
		const name=exports.name=`hash-code`;
		exports.default=hash_45code;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9oYXNoLWNvZGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQVNBLG1CQUFjLHNCQUFBLEVBQ0M7VUFBZCxTQUFPLEVBQUU7RUFBQTtFQUVWLGtCQUFXLGlCQUNNOztHQUFoQixvQkFDQztHQUVELHNCQUNRLGVBQUE7SUFBUCxrQkFDRzs7S0FBRixnQkFBRztLQUNILGdCQUFHOzs7SUFDSixrQkFDRzs7S0FBRixnQkFBRztLQUNILGdCQUFHOzs7b0JBQ0YsT0FBSSxZQUFVLEdBQUksWUFBVTt1QkFDekIsT0FBSSxZQUFVLEdBQUksWUFBVTtHQUFBO0dBRWxDLHNCQUFNO0dBQ04sNEJBQVM7R0FDVCwyQ0FBYTtHQUNiLDZCQUFVLGtCQUFBLEVBQ0M7V0FBVixnQkFBZ0IsRUFBRTtHQUFBOzs7RUFHcEIsUUFBTSxZQUFVLFFBQVMsU0FBQSxFQUFBOztJQUN4QixZQUFBLEdBQ0M7WUFBQTtJQUFBLE9BRUc7WUFBSDtJQUFBO0dBQUE7RUFBQTtFQUVGLFFBQU0sWUFBVSxTQUFVLFNBQUEsSUFDRztVQUM1QjtJQUFlLFFBQUE7SUFDZCxZQUFBLE9BQUcsRUFBRSxXQUN3QjtZQUE1QjtXQUVHO1lBQUg7SUFBQTtHQUFBO0VBQUE7RUFHSCxRQUFNLFlBQVUsaUJBQ007O0dBQXJCLHNCQUNRLGVBQUE7b0JBQUwsT0FBSSxZQUFXLEtBQUssWUFBVzt1QkFDNUIsT0FBSSxZQUFXLEtBQUssWUFBVzs7a0JBQ3JDOztFQUVELFFBQU0sWUFBVSxpQkFDTTs7R0FBckIsc0JBQ1EsZUFBQTtJQUFQLFVBQU0sT0FBUTtvQkFDWixPQUFJLFlBQVUsS0FBTSxZQUFVO0dBQUE7a0JBQ2hDLFVBQ0k7NkJBREgsSUFFRDs7O0VBR0YsUUFBTSxZQUFVLE9BQU87RUEvRHZCLHdCQUFBO2tCQVlBIiwiZmlsZSI6Imhhc2gtY29kZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9