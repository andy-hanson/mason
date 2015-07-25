"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Type/Method"],(exports,Method_0)=>{
	exports._get=_ms.lazy(()=>{
		const Method=_ms.getDefaultExport(Method_0);
		const _43=exports["+"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=()=>{
				return `Combines two values of the same type into a greater value of that type.`
			}();
			const args=built.args=2;
			return _ms.setName(built,"+")
		}());
		const _45=exports["-"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=()=>{
				return `\`+ b res\` should be \`a\`.`
			}();
			const args=built.args=2;
			return _ms.setName(built,"-")
		}());
		const _42=exports["*"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=()=>{
				return `Sum of \`b\` copies of \`a\`.`
			}();
			const args=built.args=2;
			return _ms.setName(built,"*")
		}());
		const _47=exports["/"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=()=>{
				return `\`* b res\` should be \`a\`.`
			}();
			const args=built.args=2;
			return _ms.setName(built,"/")
		}());
		const name=exports.name=`methods`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tYXRoL21ldGhvZHMubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFHQSx1QkFBRyxLQUFJLFlBQ007O0dBQVosd0JBQ0k7V0FBRjs7R0FDRixzQkFBTTs7O0VBRVAsdUJBQUcsS0FBSSxZQUNNOztHQUFaLHdCQUNJO1dBQUY7O0dBQ0Ysc0JBQU07OztFQUVQLHVCQUFHLEtBQUksWUFDTTs7R0FBWix3QkFDSTtXQUFGOztHQUNGLHNCQUFNOzs7RUFFUCx1QkFBRyxLQUFJLFlBQ007O0dBQVosd0JBQ0k7V0FBRjs7R0FDRixzQkFBTTs7O0VBckJQLHdCQUFBIiwiZmlsZSI6Im1hdGgvbWV0aG9kcy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9