"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/Range"],(exports,Range_0)=>{
	exports._get=_ms.lazy(()=>{
		const Range=_ms.lazy(()=>_ms.getDefaultExport(Range_0));
		const op=function op(op_45name){
			return Function("a","b",`return a ${op_45name} b`)
		};
		const unary_45op=function unary_45op(op_45name){
			return Function("_",`return ${op_45name} _`)
		};
		const js_45and=exports["js-and"]=op(`&`);
		const js_45caret=exports["js-caret"]=op(`^`);
		const js_60_60=exports["js<<"]=op("<<");
		const js_62_62=exports["js>>"]=op(">>");
		const js_62_62_62=exports["js>>>"]=op(">>>");
		const js_61_61_61=exports["js==="]=op("===");
		const js_61_61=exports["js=="]=op("==");
		const js_60=exports["js<"]=op("<");
		const js_62=exports["js>"]=op(">");
		const js_60_61=exports["js<="]=op("<=");
		const js_62_61=exports["js>="]=op(">=");
		const js_43=exports["js+"]=op("+");
		const js_45=exports["js-"]=op("-");
		const js_42=exports["js*"]=op("*");
		const js_47=exports["js/"]=op("/");
		const js_45mod=exports["js-mod"]=op(`%`);
		const js_45bar=exports["js-bar"]=op(`|`);
		const js_126=exports["js~"]=unary_45op(`~`);
		const js_33=exports["js!"]=unary_45op("!");
		const js_45sub=exports["js-sub"]=Function("obj","prop",`return obj[prop]`);
		const js_45set=exports["js-set"]=Function("obj","prop","val",`obj[prop] = val`);
		const js_45delete=exports["js-delete"]=Function("obj","prop",`delete obj[prop]`);
		const js_45in=exports["js-in"]=op("in");
		const js_45instanceof=exports["js-instanceof"]=op("instanceof");
		const js_45typeof=exports["js-typeof"]=(()=>{
			return unary_45op("typeof")
		})();
		const regex=exports.regex=function regex(strings){
			const values=[].slice.call(arguments,1);
			let _="";
			for(let i of new (_ms.unlazy(Range))(0,values.length)){
				_=`${_}${_ms.sub(strings,i)}${_ms.sub(values,i)}`
			};
			_=`${_}${_ms.sub(strings,values.length)}`;
			return RegExp(_)
		};
		const defined_63=exports["defined?"]=function defined_63(_){
			return ! id_61_63(_,void 0)
		};
		const exists_63=exports["exists?"]=function exists_63(_){
			return ! js_61_61(_,null)
		};
		const id_61_63=exports["id=?"]=(()=>{
			return Object.is
		})();
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvanMubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFJQSxTQUFNLFlBQUE7VUFDTCxTQUFVLElBQUcsSUFBRyxZQUFVOztFQUMzQixpQkFBWSxvQkFBQTtVQUNYLFNBQVUsSUFBRyxVQUFROztFQUV0QixpQ0FBUSxHQUFJO0VBQ1oscUNBQVUsR0FBSTtFQUNkLCtCQUFNLEdBQUk7RUFDViwrQkFBTSxHQUFJO0VBQ1YsbUNBQU8sR0FBSTtFQUNYLG1DQUFPLEdBQUk7RUFDWCwrQkFBTSxHQUFJO0VBQ1YsMkJBQUssR0FBSTtFQUNULDJCQUFLLEdBQUk7RUFDVCwrQkFBTSxHQUFJO0VBQ1YsK0JBQU0sR0FBSTtFQUNWLDJCQUFLLEdBQUk7RUFDVCwyQkFBSyxHQUFJO0VBQ1QsMkJBQUssR0FBSTtFQUNULDJCQUFLLEdBQUk7RUFDVCxpQ0FBUSxHQUFJO0VBQ1osaUNBQVEsR0FBSTtFQUNaLDRCQUFLLFdBQVU7RUFDZiwyQkFBSyxXQUFVO0VBQ2YsaUNBQVEsU0FBVSxNQUFLLE9BQU07RUFDN0IsaUNBQVEsU0FBVSxNQUFLLE9BQU0sTUFBSztFQUNsQyx1Q0FBVyxTQUFVLE1BQUssT0FBTTtFQUNoQywrQkFBTyxHQUFJO0VBQ1gsK0NBQWUsR0FBSTtFQUNuQix1Q0FDVSxLQUFBO1VBQ1QsV0FBVTtFQUFBO0VBRVgsMEJBQVEsZUFBQTs7R0FFUCxNQUFPO0dBQ0YsUUFBQSxLQUFLLHdCQUFVLEVBQUUsZUFDYTtNQUE1QixHQUFDLFlBQUcsUUFBUSxhQUFJLE9BQU87O0tBQ3hCLEdBQUMsWUFBRyxRQUFRO1VBQ2xCLE9BQU87RUFBQTtFQUVSLHFDQUFXLG9CQUFBO1VBRVYsRUFBSSxTQUFLLEVBQUU7O0VBRVosbUNBQVUsbUJBQUE7VUFFVCxFQUFJLFNBQUssRUFBRTtFQUFBO0VBRVosK0JBQ0ssS0FBQTtVQUdKIiwiZmlsZSI6ImpzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
