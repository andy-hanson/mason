"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./private/js-impl","./Try"],function(exports,js_45impl_0,Try_1){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_45impl_0),iAnd=_ms.get(_$2,"iAnd"),iOr=_ms.get(_$2,"iOr"),_$4=_ms.lazyGetModule(Try_1),oh_45no_33=_ms.lazyProp(_$4,"oh-no!");
		const Bool=function(){
			const doc="JavaScript's native Boolean type.\nEither true or false.";
			return _ms.set(Boolean,"doc",doc,"displayName","Bool")
		}();
		const not=exports.not=function(){
			const doc="Negation of a Bool.";
			const test=_ms.set(function(){
				const _k0=[false],_v0=true;
				const _k1=[true],_v1=false;
				return _ms.map(_k0,_v0,_k1,_v1)
			},"displayName","test");
			return _ms.set(function(_){
				_ms.checkContains(Bool,_,"_");
				return function(){
					if(_ms.bool(_)){
						return false
					} else {
						return true
					}
				}()
			},"doc",doc,"test",test,"displayName","not")
		}();
		const and=exports.and=function(){
			const doc="True iff all conditions are true.\nEquivalent to `all? args`.\nAll arguments after the first may be lazy.\"";
			const test=_ms.set(function(){
				const _k0=[false,false],_v0=false;
				const _k1=[false,true],_v1=false;
				const _k2=[true,false],_v2=false;
				const _k3=[true,true],_v3=true;
				const _k4=[true,true,false],_v4=false;
				const _k5=[true,false,_ms.lazy(function(){
					return _ms.unlazy(oh_45no_33)()
				})],_v5=false;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4,_k5,_v5)
			},"displayName","test");
			return _ms.set(iAnd,"doc",doc,"test",test,"displayName","and")
		}();
		const nand=exports.nand=function(){
			const doc="Negation of and.";
			const test=_ms.set(function(){
				const _k0=[false,false],_v0=true;
				const _k1=[false,true],_v1=true;
				const _k2=[true,false],_v2=true;
				const _k3=[true,true],_v3=false;
				const _k4=[true,true,false],_v4=true;
				const _k5=[true,false,_ms.lazy(function(){
					return _ms.unlazy(oh_45no_33)()
				})],_v5=true;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4,_k5,_v5)
			},"displayName","test");
			return _ms.set(function(){
				const args=[].slice.call(arguments,0);
				return not(Function.apply.call(and,null,[].concat(_ms.arr(args))))
			},"doc",doc,"test",test,"displayName","nand")
		}();
		const or=exports.or=function(){
			const doc="True iff any condition is true.\nEquivalent to `any? args`.\nAll arguments after the first may be lazy.";
			const test=_ms.set(function(){
				const _k0=[false,false],_v0=false;
				const _k1=[false,true],_v1=true;
				const _k2=[true,false],_v2=true;
				const _k3=[true,true],_v3=true;
				const _k4=[false,false,true],_v4=true;
				const _k5=[false,true,_ms.lazy(function(){
					return _ms.unlazy(oh_45no_33)()
				})],_v5=true;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4,_k5,_v5)
			},"displayName","test");
			return _ms.set(iOr,"doc",doc,"test",test,"displayName","or")
		}();
		const nor=exports.nor=function(){
			const doc="Negation of or.";
			const test=_ms.set(function(){
				const _k0=[false,false],_v0=true;
				const _k1=[false,true],_v1=false;
				const _k2=[true,false],_v2=false;
				const _k3=[true,true],_v3=false;
				const _k4=[false,false,true],_v4=false;
				const _k5=[false,true,_ms.lazy(function(){
					return _ms.unlazy(oh_45no_33)()
				})],_v5=false;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4,_k5,_v5)
			},"displayName","test");
			return _ms.set(function(){
				const args=[].slice.call(arguments,0);
				return not(Function.apply.call(or,null,[].concat(_ms.arr(args))))
			},"doc",doc,"test",test,"displayName","nor")
		}();
		const implies=exports.implies=function(){
			const doc="Whether `then` is true whenever `if` is.\nAlways true when `if` is false.";
			const test=_ms.set(function(){
				const _k0=[false,false],_v0=true;
				const _k1=[false,true],_v1=true;
				const _k2=[true,false],_v2=false;
				const _k3=[true,true],_v3=true;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3)
			},"displayName","test");
			return _ms.set(function(_if,then){
				_ms.checkContains(Bool,_if,"if");
				return function(){
					if(_ms.bool(_if)){
						return _ms.unlazy(then)
					} else {
						return true
					}
				}()
			},"doc",doc,"test",test,"displayName","implies")
		}();
		const xor=exports.xor=function(){
			const doc="True if `a` and `b` differ.";
			const test=_ms.set(function(){
				const _k0=[false,false],_v0=false;
				const _k1=[false,true],_v1=true;
				const _k2=[true,false],_v2=true;
				const _k3=[true,true],_v3=false;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3)
			},"displayName","test");
			return _ms.set(function(a,b){
				_ms.checkContains(Bool,a,"a");
				_ms.checkContains(Bool,b,"b");
				return function(){
					if(_ms.bool(a)){
						return not(b)
					} else {
						return b
					}
				}()
			},"doc",doc,"test",test,"displayName","xor")
		}();
		const displayName=exports.displayName="Bool";
		exports.default=Bool;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9Cb29sLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBS0EscUJBQ007R0FBTCxVQUNDO2tCQUVEOztFQUVELGdDQUNJO0dBQUgsVUFBTTtHQUNOLG1CQUNPLFVBQUE7SUFBTixVQUFBLENBQUUsV0FBVztJQUNiLFVBQUEsQ0FBRSxVQUFVOzs7a0JBQ1osU0FBQSxFQUNNO3NCQURKOztLQUVELFlBQUEsR0FDQzthQUFBO0tBQUEsT0FFRzthQUFIO0tBQUE7SUFBQTtHQUFBOztFQUVKLGdDQUNJO0dBQUgsVUFDQztHQUdELG1CQUNPLFVBQUE7SUFBTixVQUFBLENBQUUsTUFBTSxXQUFXO0lBQ25CLFVBQUEsQ0FBRSxNQUFNLFVBQVU7SUFDbEIsVUFBQSxDQUFFLEtBQUssV0FBVztJQUNsQixVQUFBLENBQUUsS0FBSyxVQUFVO0lBQ2pCLFVBQUEsQ0FBRSxLQUFLLEtBQUssV0FBVztJQUV2QixVQUFBLENBQUUsS0FBSzs7WUFBdUI7OztrQkFDL0I7O0VBRUQsa0NBQ0s7R0FBSixVQUFNO0dBQ04sbUJBQ08sVUFBQTtJQUFOLFVBQUEsQ0FBRSxNQUFNLFdBQVc7SUFDbkIsVUFBQSxDQUFFLE1BQU0sVUFBVTtJQUNsQixVQUFBLENBQUUsS0FBSyxXQUFXO0lBQ2xCLFVBQUEsQ0FBRSxLQUFLLFVBQVU7SUFDakIsVUFBQSxDQUFFLEtBQUssS0FBSyxXQUFXO0lBRXZCLFVBQUEsQ0FBRSxLQUFLOztZQUF1Qjs7O2tCQUM5QixVQUNPOztXQUFQLHdCQUFLLDJCQUFJO0dBQUE7O0VBRVgsOEJBQ0c7R0FBRixVQUNDO0dBR0QsbUJBQ08sVUFBQTtJQUFOLFVBQUEsQ0FBRSxNQUFNLFdBQVc7SUFDbkIsVUFBQSxDQUFFLE1BQU0sVUFBVTtJQUNsQixVQUFBLENBQUUsS0FBSyxXQUFXO0lBQ2xCLFVBQUEsQ0FBRSxLQUFLLFVBQVU7SUFDakIsVUFBQSxDQUFFLE1BQU0sTUFBTSxVQUFVO0lBRXhCLFVBQUEsQ0FBRSxNQUFNOztZQUFzQjs7O2tCQUMvQjs7RUFFRCxnQ0FDSTtHQUFILFVBQU07R0FDTixtQkFDTyxVQUFBO0lBQU4sVUFBQSxDQUFFLE1BQU0sV0FBVztJQUNuQixVQUFBLENBQUUsTUFBTSxVQUFVO0lBQ2xCLFVBQUEsQ0FBRSxLQUFLLFdBQVc7SUFDbEIsVUFBQSxDQUFFLEtBQUssVUFBVTtJQUNqQixVQUFBLENBQUUsTUFBTSxNQUFNLFVBQVU7SUFFeEIsVUFBQSxDQUFFLE1BQU07O1lBQXNCOzs7a0JBQzlCLFVBQ087O1dBQVAsd0JBQUssMEJBQUc7R0FBQTs7RUFFVix3Q0FDUTtHQUFQLFVBQ0M7R0FFRCxtQkFDTyxVQUFBO0lBQU4sVUFBQSxDQUFFLE1BQU0sV0FBVztJQUNuQixVQUFBLENBQUUsTUFBTSxVQUFVO0lBQ2xCLFVBQUEsQ0FBRSxLQUFLLFdBQVc7SUFDbEIsVUFBQSxDQUFFLEtBQUssVUFBVTs7O2tCQUNqQixTQUFBLElBQVEsS0FDVTtzQkFEZjs7S0FFRixZQUFBLEtBQ0U7d0JBSEs7S0FBQSxPQUtIO2FBQUg7S0FBQTtJQUFBO0dBQUE7O0VBRUosZ0NBQ0k7R0FBSCxVQUFNO0dBQ04sbUJBQ08sVUFBQTtJQUFOLFVBQUEsQ0FBRSxNQUFNLFdBQVc7SUFDbkIsVUFBQSxDQUFFLE1BQU0sVUFBVTtJQUNsQixVQUFBLENBQUUsS0FBSyxXQUFXO0lBQ2xCLFVBQUEsQ0FBRSxLQUFLLFVBQVU7OztrQkFDakIsU0FBQSxFQUFPLEVBQ007c0JBRFg7c0JBQU87O0tBRVIsWUFBQSxHQUNDO2FBQUEsSUFBSTtLQUFBLE9BRUQ7YUFBSDtLQUFBO0lBQUE7R0FBQTs7RUEzR0osc0NBQUE7a0JBNkdBIiwiZmlsZSI6IkJvb2wuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==