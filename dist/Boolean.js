"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./private/js-impl","./Try"],function(exports,js_45impl_0,Try_1){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_45impl_0),iAnd=_ms.get(_$2,"iAnd"),iOr=_ms.get(_$2,"iOr"),_$4=_ms.lazyGetModule(Try_1),oh_45no_33=_ms.lazyProp(_$4,"oh-no!");
		const not=exports.not=function(){
			const doc="Negation of a Boolean.";
			const test=function test(){
				const _k0=[false],_v0=true;
				const _k1=[true],_v1=false;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function not(_){
				_ms.checkContains(Boolean,_,"_");
				return function(){
					if(_ms.bool(_)){
						return false
					} else {
						return true
					}
				}()
			},"doc",doc,"test",test)
		}();
		const and=exports.and=function(){
			const doc="True iff all conditions are true.\nEquivalent to `all? args`.\nAll arguments after the first may be lazy.\"";
			const test=function test(){
				const _k0=[false,false],_v0=false;
				const _k1=[false,true],_v1=false;
				const _k2=[true,false],_v2=false;
				const _k3=[true,true],_v3=true;
				const _k4=[true,true,false],_v4=false;
				const _k5=[true,false,_ms.lazy(function(){
					return _ms.unlazy(oh_45no_33)()
				})],_v5=false;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4,_k5,_v5)
			};
			return _ms.set(iAnd,"doc",doc,"test",test,"name","and")
		}();
		const nand=exports.nand=function(){
			const doc="Negation of and.";
			const test=function test(){
				const _k0=[false,false],_v0=true;
				const _k1=[false,true],_v1=true;
				const _k2=[true,false],_v2=true;
				const _k3=[true,true],_v3=false;
				const _k4=[true,true,false],_v4=true;
				const _k5=[true,false,_ms.lazy(function(){
					return _ms.unlazy(oh_45no_33)()
				})],_v5=true;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4,_k5,_v5)
			};
			return _ms.set(function nand(){
				const args=[].slice.call(arguments,0);
				return not(Function.apply.call(and,null,[].concat(_ms.arr(args))))
			},"doc",doc,"test",test)
		}();
		const or=exports.or=function(){
			const doc="True iff any condition is true.\nEquivalent to `any? args`.\nAll arguments after the first may be lazy.";
			const test=function test(){
				const _k0=[false,false],_v0=false;
				const _k1=[false,true],_v1=true;
				const _k2=[true,false],_v2=true;
				const _k3=[true,true],_v3=true;
				const _k4=[false,false,true],_v4=true;
				const _k5=[false,true,_ms.lazy(function(){
					return _ms.unlazy(oh_45no_33)()
				})],_v5=true;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4,_k5,_v5)
			};
			return _ms.set(iOr,"doc",doc,"test",test,"name","or")
		}();
		const nor=exports.nor=function(){
			const doc="Negation of or.";
			const test=function test(){
				const _k0=[false,false],_v0=true;
				const _k1=[false,true],_v1=false;
				const _k2=[true,false],_v2=false;
				const _k3=[true,true],_v3=false;
				const _k4=[false,false,true],_v4=false;
				const _k5=[false,true,_ms.lazy(function(){
					return _ms.unlazy(oh_45no_33)()
				})],_v5=false;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4,_k5,_v5)
			};
			return _ms.set(function nor(){
				const args=[].slice.call(arguments,0);
				return not(Function.apply.call(or,null,[].concat(_ms.arr(args))))
			},"doc",doc,"test",test)
		}();
		const implies=exports.implies=function(){
			const doc="Whether `then` is true whenever `if` is.\nAlways true when `if` is false.";
			const test=function test(){
				const _k0=[false,false],_v0=true;
				const _k1=[false,true],_v1=true;
				const _k2=[true,false],_v2=false;
				const _k3=[true,true],_v3=true;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3)
			};
			return _ms.set(function implies(_if,then){
				_ms.checkContains(Boolean,_if,"if");
				return function(){
					if(_ms.bool(_if)){
						return _ms.unlazy(then)
					} else {
						return true
					}
				}()
			},"doc",doc,"test",test)
		}();
		const xor=exports.xor=function(){
			const doc="True if `a` and `b` differ.";
			const test=function test(){
				const _k0=[false,false],_v0=false;
				const _k1=[false,true],_v1=true;
				const _k2=[true,false],_v2=true;
				const _k3=[true,true],_v3=false;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3)
			};
			return _ms.set(function xor(a,b){
				_ms.checkContains(Boolean,a,"a");
				_ms.checkContains(Boolean,b,"b");
				return function(){
					if(_ms.bool(a)){
						return not(b)
					} else {
						return b
					}
				}()
			},"doc",doc,"test",test)
		}();
		const name=exports.name="Boolean";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9Cb29sZWFuLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBS0EsZ0NBQ0k7R0FBSCxVQUFNO0dBQ04sV0FDTyxlQUFBO0lBQU4sVUFBQSxDQUFFLFdBQVc7SUFDYixVQUFBLENBQUUsVUFBVTs7O2tCQUNaLGFBQUEsRUFDUztzQkFEUDs7S0FFRCxZQUFBLEdBQ0M7YUFBQTtLQUFBLE9BRUc7YUFBSDtLQUFBO0lBQUE7R0FBQTs7RUFFSixnQ0FDSTtHQUFILFVBQ0M7R0FHRCxXQUNPLGVBQUE7SUFBTixVQUFBLENBQUUsTUFBTSxXQUFXO0lBQ25CLFVBQUEsQ0FBRSxNQUFNLFVBQVU7SUFDbEIsVUFBQSxDQUFFLEtBQUssV0FBVztJQUNsQixVQUFBLENBQUUsS0FBSyxVQUFVO0lBQ2pCLFVBQUEsQ0FBRSxLQUFLLEtBQUssV0FBVztJQUV2QixVQUFBLENBQUUsS0FBSzs7WUFBdUI7OztrQkFDL0I7O0VBRUQsa0NBQ0s7R0FBSixVQUFNO0dBQ04sV0FDTyxlQUFBO0lBQU4sVUFBQSxDQUFFLE1BQU0sV0FBVztJQUNuQixVQUFBLENBQUUsTUFBTSxVQUFVO0lBQ2xCLFVBQUEsQ0FBRSxLQUFLLFdBQVc7SUFDbEIsVUFBQSxDQUFFLEtBQUssVUFBVTtJQUNqQixVQUFBLENBQUUsS0FBSyxLQUFLLFdBQVc7SUFFdkIsVUFBQSxDQUFFLEtBQUs7O1lBQXVCOzs7a0JBQzlCLGVBQ087O1dBQVAsd0JBQUssMkJBQUk7R0FBQTs7RUFFWCw4QkFDRztHQUFGLFVBQ0M7R0FHRCxXQUNPLGVBQUE7SUFBTixVQUFBLENBQUUsTUFBTSxXQUFXO0lBQ25CLFVBQUEsQ0FBRSxNQUFNLFVBQVU7SUFDbEIsVUFBQSxDQUFFLEtBQUssV0FBVztJQUNsQixVQUFBLENBQUUsS0FBSyxVQUFVO0lBQ2pCLFVBQUEsQ0FBRSxNQUFNLE1BQU0sVUFBVTtJQUV4QixVQUFBLENBQUUsTUFBTTs7WUFBc0I7OztrQkFDL0I7O0VBRUQsZ0NBQ0k7R0FBSCxVQUFNO0dBQ04sV0FDTyxlQUFBO0lBQU4sVUFBQSxDQUFFLE1BQU0sV0FBVztJQUNuQixVQUFBLENBQUUsTUFBTSxVQUFVO0lBQ2xCLFVBQUEsQ0FBRSxLQUFLLFdBQVc7SUFDbEIsVUFBQSxDQUFFLEtBQUssVUFBVTtJQUNqQixVQUFBLENBQUUsTUFBTSxNQUFNLFVBQVU7SUFFeEIsVUFBQSxDQUFFLE1BQU07O1lBQXNCOzs7a0JBQzlCLGNBQ087O1dBQVAsd0JBQUssMEJBQUc7R0FBQTs7RUFFVix3Q0FDUTtHQUFQLFVBQ0M7R0FFRCxXQUNPLGVBQUE7SUFBTixVQUFBLENBQUUsTUFBTSxXQUFXO0lBQ25CLFVBQUEsQ0FBRSxNQUFNLFVBQVU7SUFDbEIsVUFBQSxDQUFFLEtBQUssV0FBVztJQUNsQixVQUFBLENBQUUsS0FBSyxVQUFVOzs7a0JBQ2pCLGlCQUFBLElBQVcsS0FDYTtzQkFEckI7O0tBRUYsWUFBQSxLQUNFO3dCQUhRO0tBQUEsT0FLTjthQUFIO0tBQUE7SUFBQTtHQUFBOztFQUVKLGdDQUNJO0dBQUgsVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFVBQUEsQ0FBRSxNQUFNLFdBQVc7SUFDbkIsVUFBQSxDQUFFLE1BQU0sVUFBVTtJQUNsQixVQUFBLENBQUUsS0FBSyxXQUFXO0lBQ2xCLFVBQUEsQ0FBRSxLQUFLLFVBQVU7OztrQkFDakIsYUFBQSxFQUFVLEVBQ1M7c0JBRGpCO3NCQUFVOztLQUVYLFlBQUEsR0FDQzthQUFBLElBQUk7S0FBQSxPQUVEO2FBQUg7S0FBQTtJQUFBO0dBQUE7O0VBckdKLHdCQUFBIiwiZmlsZSI6IkJvb2xlYW4uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==