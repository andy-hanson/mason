"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./compare","./js","./math/Number","./private/js-impl","./Type/Method"],(exports,compare_0,js_1,Number_2,js_45impl_3,Method_4)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(js_1),js_45bar=_ms.get(_$3,"js-bar"),_$4=_ms.getModule(Number_2),Int=_ms.get(_$4,"Int"),_$5=_ms.getModule(js_45impl_3),hashCodeDefault=_ms.get(_$5,"hashCodeDefault"),hashCodeString=_ms.get(_$5,"hashCodeString"),Method=_ms.getDefaultExport(Method_4),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!");
		const hash_45code=Method(()=>{
			const built={};
			const doc=built.doc=`Integer used to identify a value in a Hash-Map (or Hash-Set).\nThis should have a high probability of being different than the hash-codes of the other values in the map.`;
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
			const _default=built.default=function _default(){
				const _this=this;
				return hashCodeDefault(_this,hash_45code)
			};
			return _ms.setName(built,"hash-code")
		}());
		impl_33(hash_45code,Boolean,function(){
			const _this=this;
			return ()=>{
				const _=_this;
				if(_ms.bool(_)){
					return 1
				} else {
					return 0
				}
			}()
		});
		impl_33(hash_45code,Function,function(){
			const _this=this;
			return hash_45code(()=>{
				const _=_this.name;
				if(_ms.bool(_61_63(0,_.length))){
					return _this.toString()
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
				return 42
			},built)
		}());
		impl_33(hash_45code,Number,function(){
			const _this=this;
			return js_45bar(_this,0)
		});
		const name=exports.name=`hash-code`;
		exports.default=hash_45code;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9oYXNoLWNvZGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFPQSxrQkFBVyxXQUNNOztHQUFoQixvQkFDQztHQUVELHNCQUNRLGVBQUE7SUFBUCxZQUNHOztLQUFGLGdCQUFHO0tBQ0gsZ0JBQUc7OztJQUNKLFlBQ0c7O0tBQUYsZ0JBQUc7S0FDSCxnQkFBRzs7O2VBQ0ksT0FBSSxZQUFVLEdBQUksWUFBVTtrQkFDNUIsT0FBSSxZQUFVLEdBQUksWUFBVTtHQUFBO0dBRXJDLHNCQUFNO0dBQ04sNEJBQVM7R0FDVCwyQ0FBYTtHQUNiLDZCQUNXLG1CQUFBOztXQUFWLGdCQUFnQixNQUFLO0dBQUE7OztFQUd2QixRQUFNLFlBQVUsUUFDVSxVQUFBOzs7SUFBcEIsUUFBQTtJQUNKLFlBQUEsR0FDQztZQUFBO0lBQUEsT0FFRztZQUFIO0lBQUE7R0FBQTtFQUFBO0VBRUgsUUFBTSxZQUFVLFNBQ1csVUFBQTs7VUFDMUI7SUFBZSxRQUFBO0lBQ2QsWUFBQSxPQUFHLEVBQUUsV0FDd0I7WUFBNUI7V0FFRztZQUFIO0lBQUE7R0FBQTtFQUFBO0VBR0gsUUFBTSxZQUFVLFdBQ007O0dBQXJCLHNCQUNRLGVBQUE7ZUFBQyxPQUFJLFlBQVcsS0FBSyxZQUFXO2tCQUMvQixPQUFJLFlBQVcsS0FBSyxZQUFXOztrQkFDeEM7O0VBRUQsUUFBTSxZQUFVLFdBQ007O0dBQXJCLHNCQUNRLGVBQUE7SUFBUCxVQUFNLE9BQVE7ZUFDTixPQUFJLFlBQVUsS0FBTSxZQUFVO0dBQUE7a0JBRXRDLElBQUE7V0FDQTtHQUFBOztFQUdGLFFBQU0sWUFBVSxPQUNTLFVBQUE7O1VBQXhCLFNBQU8sTUFBSztFQUFBO0VBNURiLHdCQUFBO2tCQU9BIiwiZmlsZSI6Imhhc2gtY29kZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9