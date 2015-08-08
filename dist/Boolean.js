"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports"],exports=>{
	exports._get=_ms.lazy(()=>{
		const implies=exports.implies=(()=>{
			const built={};
			const doc=built.doc=`Whether \`then\` is true whenever \`if\` is.\nAlways true when \`if\` is false.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[false,false],true);
				_ms.assoc(built,[false,true],true);
				_ms.assoc(built,[true,false],false);
				_ms.assoc(built,[true,true],true);
				return built
			};
			return _ms.set(function implies(if_63,then_63){
				_ms.checkContains(Boolean,if_63,"if?");
				return (()=>{
					if(if_63){
						return _ms.unlazy(then_63)
					} else {
						return true
					}
				})()
			},built)
		})();
		const xor=exports.xor=(()=>{
			const built={};
			const doc=built.doc=`True if \`a\` and \`b\` differ.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[false,false],false);
				_ms.assoc(built,[false,true],true);
				_ms.assoc(built,[true,false],true);
				_ms.assoc(built,[true,true],false);
				return built
			};
			return _ms.set(function xor(a,b){
				_ms.checkContains(Boolean,a,"a");
				_ms.checkContains(Boolean,b,"b");
				return (()=>{
					if(a){
						return ! b
					} else {
						return b
					}
				})()
			},built)
		})();
		const name=exports.name=`Boolean`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9Cb29sZWFuLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7RUFBQSw4QkFDUSxLQUFBOztHQUFQLG9CQUNDO0dBRUQsc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxNQUFNLE9BQVc7b0JBQ25CLENBQUUsTUFBTSxNQUFVO29CQUNsQixDQUFFLEtBQUssT0FBVztvQkFDbEIsQ0FBRSxLQUFLLE1BQVU7OztrQkFDakIsaUJBQUEsTUFBWSxRQUNjO3NCQUR0QjtXQUVBO0tBQUgsR0FBQSxNQUNHOztZQUVDO2FBQUg7S0FBQTtJQUFBO0dBQUE7O0VBRUosc0JBQ0ksS0FBQTs7R0FBSCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsTUFBTSxPQUFXO29CQUNuQixDQUFFLE1BQU0sTUFBVTtvQkFDbEIsQ0FBRSxLQUFLLE9BQVc7b0JBQ2xCLENBQUUsS0FBSyxNQUFVOzs7a0JBQ2pCLGFBQUEsRUFBVSxFQUNTO3NCQURqQjtzQkFBVTtXQUVSO0tBQUgsR0FBQSxFQUNDO2FBQUEsRUFBSTtLQUFBLE9BRUQ7YUFBSDtLQUFBO0lBQUE7R0FBQTs7RUE1Qkosd0JBQUEiLCJmaWxlIjoiQm9vbGVhbi5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9