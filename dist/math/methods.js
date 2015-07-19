"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Type/Method"],(exports,Method_0)=>{
	exports._get=_ms.lazy(()=>{
		const Method=_ms.getDefaultExport(Method_0);
		const _43=exports["+"]=Method(()=>{
			const built={};
			const doc=built.doc=()=>{
				return `Combines two values of the same type into a greater value of that type.`
			}();
			const args=built.args=2;
			return _ms.setName(built,"+")
		}());
		const _45=exports["-"]=Method(()=>{
			const built={};
			const doc=built.doc=()=>{
				return `\`+ b res\` should be \`a\`.`
			}();
			const args=built.args=2;
			return _ms.setName(built,"-")
		}());
		const _42=exports["*"]=Method(()=>{
			const built={};
			const doc=built.doc=()=>{
				return `Sum of \`b\` copies of \`a\`.`
			}();
			const args=built.args=2;
			return _ms.setName(built,"*")
		}());
		const _47=exports["/"]=Method(()=>{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tYXRoL21ldGhvZHMubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFHQSx1QkFBRyxXQUNNOztHQUFSLHdCQUNJO1dBQUY7O0dBQ0Ysc0JBQU07OztFQUVQLHVCQUFHLFdBQ007O0dBQVIsd0JBQ0k7V0FBRjs7R0FDRixzQkFBTTs7O0VBRVAsdUJBQUcsV0FDTTs7R0FBUix3QkFDSTtXQUFGOztHQUNGLHNCQUFNOzs7RUFFUCx1QkFBRyxXQUNNOztHQUFSLHdCQUNJO1dBQUY7O0dBQ0Ysc0JBQU07OztFQXJCUCx3QkFBQSIsImZpbGUiOiJtYXRoL21ldGhvZHMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==