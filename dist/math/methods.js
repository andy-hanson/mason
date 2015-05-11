"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Type/Method"],function(exports,Method_0){
	exports._get=_ms.lazy(function(){
		const Method=_ms.getDefaultExport(Method_0);
		const exports={};
		const _43=exports["+"]=Method(function(){
			const doc=function(a,b){
				return "Combines two values of the same type into a greater value of that type."
			};
			return {
				doc:doc,
				displayName:"+"
			}
		}());
		const _45=exports["-"]=Method(function(){
			const doc=function(a,b){
				return "`+ b res` should be `a`."
			};
			return {
				doc:doc,
				displayName:"-"
			}
		}());
		const _42=exports["*"]=Method(function(){
			const doc=function(a,b){
				return "Sum of `b` copies of `a`."
			};
			return {
				doc:doc,
				displayName:"*"
			}
		}());
		const _47=exports["/"]=Method(function(){
			const doc=function(a,b){
				return "`* b res` should be `a`."
			};
			return {
				doc:doc,
				displayName:"/"
			}
		}());
		const displayName=exports.displayName="methods";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tYXRoL21ldGhvZHMubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lDQUdBOzs7RUFBQSx1QkFBRyxpQkFDTTtHQUFSLFVBQU0sU0FBQSxFQUFFLEVBQ0M7V0FBUDtHQUFBO1VBRE07Ozs7O0VBR1QsdUJBQUcsaUJBQ007R0FBUixVQUFNLFNBQUEsRUFBRSxFQUNDO1dBQVA7R0FBQTtVQURNOzs7OztFQUdULHVCQUFHLGlCQUNNO0dBQVIsVUFBTSxTQUFBLEVBQUUsRUFDQztXQUFQO0dBQUE7VUFETTs7Ozs7RUFHVCx1QkFBRyxpQkFDTTtHQUFSLFVBQU0sU0FBQSxFQUFFLEVBQ0M7V0FBUDtHQUFBO1VBRE07Ozs7O0VBaEJULHNDQUFBIiwiZmlsZSI6Im1hdGgvbWV0aG9kcy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9