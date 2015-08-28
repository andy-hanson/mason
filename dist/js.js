"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/Range","./compare"],(exports,Range_0,compare_1)=>{
	exports._get=_ms.lazy(()=>{
		const Range=_ms.lazy(()=>_ms.getDefaultExport(Range_0)),_$4=_ms.lazyGetModule(compare_1),_61_63=_ms.lazyProp(_$4,"=?");
		const doc=exports.doc=`Functions implementing behavior native to JavaScript.`;
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
		const regex=exports.regex=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(_61_63),regex`a${1}b`,RegExp(`a1b`))
			};
			return _ms.set(function regex(strings){
				const values=[].slice.call(arguments,1);
				let _="";
				for(let i of new (_ms.unlazy(Range))(0,values.length)){
					_=`${_}${_ms.sub(strings,i)}${_ms.sub(values,i)}`
				};
				_=`${_}${_ms.sub(strings,values.length)}`;
				return RegExp(_)
			},built)
		})();
		const defined_63=exports["defined?"]=(()=>{
			const built={};
			const doc=built.doc=`True for any value except \`undefined\`.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[void 0],false);
				_ms.assoc(built,[0],true);
				return built
			};
			return _ms.set(function defined_63(_){
				return ! id_61_63(_,void 0)
			},built)
		})();
		const id_61_63=exports["id=?"]=(()=>{
			const built={};
			const doc=built.doc=`For Objects, whether they are the same place in memory.\nFor primitive types, whether they have the same data.\nTODO: Explain (and test) difference between this and js===`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[`a`,`a`],true);
				_ms.assoc(built,[[`a`],[`a`]],false);
				return built
			};
			return _ms.set(Object.is,built,"id=?")
		})();
		const truthy_63=exports["truthy?"]=(()=>{
			const built={};
			const doc=built.doc=`Whether javascript's \`if\` statement would consider the value to be true.`;
			const test=built.test=function test(){
				for(let _ of [null,void 0,0,Number.NaN,"",false]){
					_ms.assertNot(truthy_63,_)
				};
				_ms.assert(truthy_63,[]);
				_ms.assert(truthy_63,true)
			};
			return _ms.set(function truthy_63(_){
				return ! js_33(_)
			},built)
		})();
		const js_45typeof=exports["js-typeof"]=(()=>{
			const built={};
			const doc=built.doc=`JavaScript's \`typeof\` operator.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[void 0],`undefined`);
				_ms.assoc(built,[null],`object`);
				_ms.assoc(built,[true],`boolean`);
				_ms.assoc(built,[0],`number`);
				_ms.assoc(built,[`a`],`string`);
				_ms.assoc(built,[Symbol(`s`)],`symbol`);
				_ms.assoc(built,[js_45typeof],`function`);
				_ms.assoc(built,[{
					a:1
				}],`object`);
				return built
			};
			return _ms.set(unary_45op(`typeof`),built,"js-typeof")
		})();
		const name=exports.name=`js`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvanMubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFLQSxzQkFBTTtFQUVOLFNBQU0sWUFBQSxVQUNPO1VBQVosU0FBVSxJQUFJLElBQUksWUFBVTs7RUFDN0IsaUJBQVksb0JBQUEsVUFDTztVQUFsQixTQUFVLElBQUksVUFBUTs7RUFFdkIsaUNBQVEsR0FBSTtFQUNaLHFDQUFVLEdBQUk7RUFDZCwrQkFBTSxHQUFJO0VBQ1YsK0JBQU0sR0FBSTtFQUNWLG1DQUFPLEdBQUk7RUFDWCxtQ0FBTyxHQUFJO0VBQ1gsK0JBQU0sR0FBSTtFQUNWLDJCQUFLLEdBQUk7RUFDVCwyQkFBSyxHQUFJO0VBQ1QsK0JBQU0sR0FBSTtFQUNWLCtCQUFNLEdBQUk7RUFDViwyQkFBSyxHQUFJO0VBQ1QsMkJBQUssR0FBSTtFQUNULDJCQUFLLEdBQUk7RUFDVCwyQkFBSyxHQUFJO0VBQ1QsaUNBQVEsR0FBSTtFQUNaLGlDQUFRLEdBQUk7RUFDWiw0QkFBSyxXQUFVO0VBQ2YsMkJBQUssV0FBVTtFQUNmLGlDQUFRLFNBQVUsTUFBTSxPQUFPO0VBQy9CLGlDQUFRLFNBQVUsTUFBTSxPQUFPLE1BQU07RUFDckMsdUNBQVcsU0FBVSxNQUFNLE9BQU87RUFDbEMsK0NBQWUsR0FBSTtFQUVuQiwwQkFDTSxLQUFBOztHQUFMLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtrQ0FBSSxLQUFNLElBQUUsS0FBTSxPQUFROztrQkFFakMsZUFBQSxRQUNpQjs7SUFBakIsTUEyQm9DO0lBMUIvQixRQUFBLEtBQUssd0JBQVUsRUFBRSxlQUNhO09BQTVCLEdBQUMsWUFBRyxRQUFRLGFBQUksT0FBTzs7TUFDeEIsR0FBQyxZQUFHLFFBQVE7V0FDbEIsT0FBTztHQUFBOztFQUVULHFDQUNTLEtBQUE7O0dBQVIsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLFFBQWU7b0JBQ2pCLENBQUUsR0FBTzs7O2tCQUNULG9CQUFBLEVBQ0M7V0FBRCxFQUFJLFNBQUssRUFBRTs7O0VBRWIsK0JBQ0ssS0FBQTs7R0FBSixvQkFDQztHQUdELHNCQUNPLGVBQUE7O29CQUFOLENBQUcsSUFBSSxLQUFRO29CQUNmLENBQUUsQ0FBRyxLQUFLLENBQUcsTUFBVTs7O2tCQUN4Qjs7RUFFRCxtQ0FDUSxLQUFBOztHQUFQLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtJQUFGLFFBQUEsS0FBQSxDQUFFLEtBQUssT0FBVSxFQUFFLFdBQVksR0FBRSxPQUNPO21CQUFwQyxVQUFRO0lBQUE7ZUFDVCxVQUFRO2VBQ1IsVUFBUTtHQUFBO2tCQUNoQixtQkFBQSxFQUNDO1dBQUQsRUFBSSxNQUFBO0dBQUE7O0VBRU4sdUNBQ1UsS0FBQTs7R0FBVCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsUUFBZ0I7b0JBQ2xCLENBQUUsTUFBVztvQkFDYixDQUFFLE1BQVc7b0JBQ2IsQ0FBRSxHQUFRO29CQUNWLENBQUcsS0FBUztvQkFDWixDQUFHLE9BQVEsTUFBVTtvQkFDckIsQ0FBRSxhQUFnQjtvQkFDbEIsQ0FBRTtPQUFJO0lBQUEsR0FBUzs7O2tCQUNoQixXQUFVOztFQXZGWCx3QkFBQSIsImZpbGUiOiJqcy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9