"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/Range"],(exports,Range_0)=>{
	exports._get=_ms.lazy(()=>{
		const Range=_ms.lazy(()=>_ms.getDefaultExport(Range_0));
		const op=function op(op_45name){
			return Function(`a`,`b`,`return a ${op_45name} b`)
		};
		const unary_45op=function unary_45op(op_45name){
			return Function(`_`,`return ${op_45name} _`)
		};
		const js_45and=exports["js-and"]=op(`&`);
		const js_45caret=exports["js-caret"]=op(`^`);
		const js_60_60=exports["js<<"]=op(`<<`);
		const js_62_62=exports["js>>"]=op(`>>`);
		const js_62_62_62=exports["js>>>"]=op(`>>>`);
		const js_61_61_61=exports["js==="]=op(`===`);
		const js_61_61=exports["js=="]=op(`==`);
		const js_60=exports["js<"]=op(`<`);
		const js_62=exports["js>"]=op(`>`);
		const js_60_61=exports["js<="]=op(`<=`);
		const js_62_61=exports["js>="]=op(`>=`);
		const js_43=exports["js+"]=op(`+`);
		const js_45=exports["js-"]=op(`-`);
		const js_42=exports["js*"]=op(`*`);
		const js_47=exports["js/"]=op(`/`);
		const js_45mod=exports["js-mod"]=op(`%`);
		const js_45bar=exports["js-bar"]=op(`|`);
		const js_126=exports["js~"]=unary_45op(`~`);
		const js_33=exports["js!"]=unary_45op(`!`);
		const js_45sub=exports["js-sub"]=Function(`obj`,`prop`,`return obj[prop]`);
		const js_45set=exports["js-set"]=Function(`obj`,`prop`,`val`,`obj[prop] = val`);
		const js_45delete=exports["js-delete"]=Function(`obj`,`prop`,`delete obj[prop]`);
		const js_45instanceof=exports["js-instanceof"]=op(`instanceof`);
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
		const id_61_63=exports["id=?"]=(()=>{
			return Object.is
		})();
		const truthy_63=exports["truthy?"]=function truthy_63(_){
			return ! ! _
		};
		const js_45typeof=exports["js-typeof"]=(()=>{
			return unary_45op(`typeof`)
		})();
		const name=exports.name=`js`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvanMubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFJQSxTQUFNLFlBQUEsVUFDTztVQXlCRixTQXpCQSxJQUFJLElBQUksWUFBVTs7RUFDN0IsaUJBQVksb0JBQUEsVUFDTztVQXVCUixTQXZCQSxJQUFJLFVBQVE7O0VBRXZCLGlDQUFRLEdBQUk7RUFDWixxQ0FBVSxHQUFJO0VBQ2QsK0JBQU0sR0FBSTtFQUNWLCtCQUFNLEdBQUk7RUFDVixtQ0FBTyxHQUFJO0VBQ1gsbUNBQU8sR0FBSTtFQUNYLCtCQUFNLEdBQUk7RUFDViwyQkFBSyxHQUFJO0VBQ1QsMkJBQUssR0FBSTtFQUNULCtCQUFNLEdBQUk7RUFDViwrQkFBTSxHQUFJO0VBQ1YsMkJBQUssR0FBSTtFQUNULDJCQUFLLEdBQUk7RUFDVCwyQkFBSyxHQUFJO0VBQ1QsMkJBQUssR0FBSTtFQUNULGlDQUFRLEdBQUk7RUFDWixpQ0FBUSxHQUFJO0VBQ1osNEJBQUssV0FBVTtFQUNmLDJCQUFLLFdBQVU7RUFDZixpQ0FFVyxTQUZPLE1BQU0sT0FBTztFQUMvQixpQ0FDVyxTQURPLE1BQU0sT0FBTyxNQUFNO0VBQ3JDLHVDQUFXLFNBQVUsTUFBTSxPQUFPO0VBQ2xDLCtDQUFlLEdBQUk7RUFFbkIsMEJBQVEsZUFBQSxRQUNpQjs7R0FDeEIsTUFBTztHQUNGLFFBQUEsS0FBSyx3QkFBVSxFQUFFLGVBQ2E7TUFBNUIsR0FBQyxZQUFHLFFBQVEsYUFBSSxPQUFPOztLQUN4QixHQUFDLFlBQUcsUUFBUTtVQUNsQixPQUFPO0VBQUE7RUFFUixxQ0FBVyxvQkFBQSxFQUNDO1VBQ1gsRUFBSSxTQUFLLEVBQUU7O0VBRVosK0JBQ0ssS0FBQTtVQUdKOztFQUVELG1DQUFVLG1CQUFBLEVBQ0M7VUFDVixFQUFJLEVBQUk7RUFBQTtFQUVULHVDQUNVLEtBQUE7VUFDVCxXQUFVOztFQXpEWCx3QkFBQSIsImZpbGUiOiJqcy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
