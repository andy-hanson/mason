"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports"],exports=>{
	exports._get=_ms.lazy(()=>{
		let op=function op(op_45name){
			return Function("a","b",`return a ${op_45name} b`)
		};
		let unary_45op=function unary_45op(op_45name){
			return Function("_",`return ${op_45name} _`)
		};
		let js_45and=exports["js-and"]=op(`&`);
		let js_45caret=exports["js-caret"]=op(`^`);
		let js_60_60=exports["js<<"]=op("<<");
		let js_62_62=exports["js>>"]=op(">>");
		let js_62_62_62=exports["js>>>"]=op(">>>");
		let js_61_61_61=exports["js==="]=op("===");
		let js_61_61=exports["js=="]=op("==");
		let js_60=exports["js<"]=op("<");
		let js_62=exports["js>"]=op(">");
		let js_60_61=exports["js<="]=op("<=");
		let js_62_61=exports["js>="]=op(">=");
		let js_43=exports["js+"]=op("+");
		let js_45=exports["js-"]=op("-");
		let js_42=exports["js*"]=op("*");
		let js_47=exports["js/"]=op("/");
		let js_45mod=exports["js-mod"]=op(`%`);
		let js_45bar=exports["js-bar"]=op(`|`);
		let js_126=exports["js~"]=unary_45op(`~`);
		let js_33=exports["js!"]=unary_45op("!");
		let js_45delete=exports["js-delete"]=Function("obj","prop",`delete obj[prop]`);
		let js_45in=exports["js-in"]=op("in");
		let js_45instanceof=exports["js-instanceof"]=op("instanceof");
		let js_45typeof=exports["js-typeof"]=unary_45op("typeof");
		let defined_63=exports["defined?"]=function defined_63(_){
			return ! id_61_63(_,void 0)
		};
		let null_63=exports["null?"]=function null_63(_){
			return js_61_61_61(_,null)
		};
		let exists_63=exports["exists?"]=function exists_63(_){
			return ! js_61_61(_,null)
		};
		let id_61_63=exports["id=?"]=(()=>{
			return Object.is
		})();
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvanMubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztFQUVBLE9BQU0sWUFBQSxVQUNPO1VBQVosU0FBVSxJQUFHLElBQUcsWUFBVTs7RUFDM0IsZUFBWSxvQkFBQSxVQUNPO1VBQWxCLFNBQVcsSUFBRSxVQUFROztFQUV0QiwrQkFBUSxHQUFJO0VBQ1osbUNBQVUsR0FBSTtFQUNkLDZCQUFNLEdBQUk7RUFDViw2QkFBTSxHQUFJO0VBQ1YsaUNBQU8sR0FBSTtFQUNYLGlDQUFPLEdBQUk7RUFDWCw2QkFBTSxHQUFJO0VBQ1YseUJBQUssR0FBSTtFQUNULHlCQUFLLEdBQUk7RUFDVCw2QkFBTSxHQUFJO0VBQ1YsNkJBQU0sR0FBSTtFQUNWLHlCQUFLLEdBQUk7RUFDVCx5QkFBSyxHQUFJO0VBQ1QseUJBQUssR0FBSTtFQUNULHlCQUFLLEdBQUk7RUFDVCwrQkFBUSxHQUFJO0VBQ1osK0JBQVEsR0FBSTtFQUNaLDBCQUFLLFdBQVU7RUFDZix5QkFBSyxXQUFVO0VBQ2YscUNBQVcsU0FBVSxNQUFLLE9BQU07RUFDaEMsNkJBQU8sR0FBSTtFQUNYLDZDQUFlLEdBQUk7RUFDbkIscUNBQVcsV0FBVTtFQUVyQixtQ0FBWSxvQkFBQSxFQUNBO1VBQ1gsRUFBSSxTQUFNLEVBQUM7O0VBRVosNkJBQVMsaUJBQUEsRUFDQTtVQUNSLFlBQU8sRUFBQztFQUFBO0VBRVQsaUNBQVcsbUJBQUEsRUFDQTtVQUNWLEVBQUksU0FBTSxFQUFDO0VBQUE7RUFFWiw2QkFDSyxLQUFBO1VBR0oiLCJmaWxlIjoianMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
