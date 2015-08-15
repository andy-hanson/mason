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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvQm9vbGVhbi5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0VBQUEsOEJBQ1EsS0FBQTs7R0FBUCxvQkFDQztHQUVELHNCQUNPLGVBQUE7O29CQUFOLENBQUUsTUFBTSxPQUFXO29CQUNuQixDQUFFLE1BQU0sTUFBVTtvQkFDbEIsQ0FBRSxLQUFLLE9BQVc7b0JBQ2xCLENBQUUsS0FBSyxNQUFVOzs7a0JBQ2pCLGlCQUFBLE1BQVksUUFDYztzQkFEdEI7V0FFQTtLQUFILEdBQUEsTUFDRzs7WUFFQzthQUFIO0tBQUE7SUFBQTtHQUFBOztFQUVKLHNCQUNJLEtBQUE7O0dBQUgsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLE1BQU0sT0FBVztvQkFDbkIsQ0FBRSxNQUFNLE1BQVU7b0JBQ2xCLENBQUUsS0FBSyxPQUFXO29CQUNsQixDQUFFLEtBQUssTUFBVTs7O2tCQUNqQixhQUFBLEVBQVUsRUFDUztzQkFEakI7c0JBQVU7V0FFUjtLQUFILEdBQUEsRUFDQzthQUFBLEVBQUk7S0FBQSxPQUVEO2FBQUg7S0FBQTtJQUFBO0dBQUE7O0VBNUJKLHdCQUFBIiwiZmlsZSI6IkJvb2xlYW4uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==