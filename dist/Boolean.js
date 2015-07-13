"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports"],function(exports){
	exports._get=_ms.lazy(function(){
		const implies=exports.implies=function(){
			const built={};
			const doc=built.doc=`Whether \`then\` is true whenever \`if\` is.\nAlways true when \`if\` is false.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[false,false],true);
				_ms.assoc(built,[false,true],true);
				_ms.assoc(built,[true,false],false);
				_ms.assoc(built,[true,true],true);
				return built
			};
			return _ms.set(function implies(if_63,then_63){
				_ms.checkContains(Boolean,if_63,"if?");
				return function(){
					if(_ms.bool(if_63)){
						return _ms.unlazy(then_63)
					} else {
						return true
					}
				}()
			},built)
		}();
		const xor=exports.xor=function(){
			const built={};
			const doc=built.doc=`True if \`a\` and \`b\` differ.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[false,false],false);
				_ms.assoc(built,[false,true],true);
				_ms.assoc(built,[true,false],true);
				_ms.assoc(built,[true,true],false);
				return built
			};
			return _ms.set(function xor(a,b){
				_ms.checkContains(Boolean,a,"a");
				_ms.checkContains(Boolean,b,"b");
				return function(){
					if(_ms.bool(a)){
						return ! b
					} else {
						return b
					}
				}()
			},built)
		}();
		const name=exports.name=`Boolean`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9Cb29sZWFuLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7RUFBQSx3Q0FDUTs7R0FBUCxvQkFDQztHQUVELHNCQUNPLGVBQUE7O29CQUFOLENBQUUsTUFBTSxPQUFXO29CQUNuQixDQUFFLE1BQU0sTUFBVTtvQkFDbEIsQ0FBRSxLQUFLLE9BQVc7b0JBQ2xCLENBQUUsS0FBSyxNQUFVOzs7a0JBQ2pCLGlCQUFBLE1BQVksUUFDYztzQkFEdEI7O0tBRUgsWUFBQSxPQUNHO3dCQUhRO0tBQUEsT0FLUDthQUFIO0tBQUE7SUFBQTtHQUFBOztFQUVKLGdDQUNJOztHQUFILG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxNQUFNLE9BQVc7b0JBQ25CLENBQUUsTUFBTSxNQUFVO29CQUNsQixDQUFFLEtBQUssT0FBVztvQkFDbEIsQ0FBRSxLQUFLLE1BQVU7OztrQkFDakIsYUFBQSxFQUFVLEVBQ1M7c0JBRGpCO3NCQUFVOztLQUVYLFlBQUEsR0FDQzthQUFBLEVBQUk7S0FBQSxPQUVEO2FBQUg7S0FBQTtJQUFBO0dBQUE7O0VBNUJKLHdCQUFBIiwiZmlsZSI6IkJvb2xlYW4uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==