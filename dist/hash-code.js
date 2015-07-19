"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./compare","./js","./math/Number","./private/js-impl","./Type/Method"],(exports,compare_0,js_1,Number_2,js_45impl_3,Method_4)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(js_1),js_45bar=_ms.get(_$3,"js-bar"),_$4=_ms.getModule(Number_2),Int=_ms.get(_$4,"Int"),_$5=_ms.getModule(js_45impl_3),hashCodeDefault=_ms.get(_$5,"hashCodeDefault"),hashCodeString=_ms.get(_$5,"hashCodeString"),Method=_ms.getDefaultExport(Method_4),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!");
		const keep_45small=function keep_45small(_){
			return js_45bar(_,0)
		};
		const hash_45code=Method(()=>{
			const built={};
			const doc=built.doc=`Integer used to identify a value in a Hash-Map! (or Hash-Set!).\nThis should have a high probability of being different than the hash-codes of the other values in the map.`;
			const test=built.test=function test(){
				const a=()=>{
					const built={};
					const x=built.x=1;
					const y=built.y=2;
					return _ms.setName(built,"a")
				}();
				const b=()=>{
					const built={};
					const x=built.x=1;
					const y=built.y=1;
					return _ms.setName(built,"b")
				}();
				_ms.assert(_61_63,hash_45code(a),hash_45code(a));
				_ms.assertNot(_61_63,hash_45code(a),hash_45code(b))
			};
			const args=built.args=1;
			const returns=built.returns=Int;
			const allow_45null_63=built["allow-null?"]=true;
			const _default=built.default=function _default(_){
				return hashCodeDefault(_,hash_45code)
			};
			return _ms.setName(built,"hash-code")
		}());
		impl_33(hash_45code,Boolean,_=>{
			return ()=>{
				if(_ms.bool(_)){
					return 1
				} else {
					return 0
				}
			}()
		});
		impl_33(hash_45code,Function,fun=>{
			return hash_45code(()=>{
				const _=fun.name;
				if(_ms.bool(_61_63(0,_.length))){
					return fun.toString()
				} else {
					return _
				}
			}())
		});
		impl_33(hash_45code,String,()=>{
			const built={};
			const test=built.test=function test(){
				_ms.assert(_61_63,hash_45code(`a`),hash_45code(`a`));
				_ms.assertNot(_61_63,hash_45code(`a`),hash_45code(`b`))
			};
			return _ms.set(hashCodeString,built)
		}());
		impl_33(hash_45code,Symbol,()=>{
			const built={};
			const test=built.test=function test(){
				const sym=Symbol(`test`);
				_ms.assert(_61_63,hash_45code(sym),hash_45code(sym))
			};
			return _ms.set(()=>{
				return _ms.checkContains(Int,42,"res")
			},built)
		}());
		impl_33(hash_45code,Number,keep_45small);
		const name=exports.name=`hash-code`;
		exports.default=hash_45code;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9oYXNoLWNvZGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFPQSxtQkFBYyxzQkFBQSxFQUNDO1VBQWQsU0FBTyxFQUFFO0VBQUE7RUFFVixrQkFBVyxXQUNNOztHQUFoQixvQkFDQztHQUVELHNCQUNRLGVBQUE7SUFBUCxZQUNHOztLQUFGLGdCQUFHO0tBQ0gsZ0JBQUc7OztJQUNKLFlBQ0c7O0tBQUYsZ0JBQUc7S0FDSCxnQkFBRzs7O2VBQ0ksT0FBSSxZQUFVLEdBQUksWUFBVTtrQkFDNUIsT0FBSSxZQUFVLEdBQUksWUFBVTtHQUFBO0dBRXJDLHNCQUFNO0dBQ04sNEJBQVM7R0FDVCwyQ0FBYTtHQUNiLDZCQUFVLGtCQUFBLEVBQ0M7V0FBVixnQkFBZ0IsRUFBRTtHQUFBOzs7RUFHcEIsUUFBTSxZQUFVLFFBQVMsR0FBQTs7SUFDeEIsWUFBQSxHQUNDO1lBQUE7SUFBQSxPQUVHO1lBQUg7SUFBQTtHQUFBO0VBQUE7RUFFRixRQUFNLFlBQVUsU0FBVSxLQUNHO1VBQzVCO0lBQWUsUUFBQTtJQUNkLFlBQUEsT0FBRyxFQUFFLFdBQ3dCO1lBQTVCO1dBRUc7WUFBSDtJQUFBO0dBQUE7RUFBQTtFQUdILFFBQU0sWUFBVSxXQUNNOztHQUFyQixzQkFDUSxlQUFBO2VBQUMsT0FBSSxZQUFXLEtBQUssWUFBVztrQkFDL0IsT0FBSSxZQUFXLEtBQUssWUFBVzs7a0JBQ3hDOztFQUVELFFBQU0sWUFBVSxXQUNNOztHQUFyQixzQkFDUSxlQUFBO0lBQVAsVUFBTSxPQUFRO2VBQ04sT0FBSSxZQUFVLEtBQU0sWUFBVTtHQUFBO2tCQUN0QyxJQUNJOzZCQURILElBRUQ7OztFQUdGLFFBQU0sWUFBVSxPQUFPO0VBN0R2Qix3QkFBQTtrQkFVQSIsImZpbGUiOiJoYXNoLWNvZGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==