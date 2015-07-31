"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports"],exports=>{
	exports._get=_ms.lazy(()=>{
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
		const defined_63=exports["defined?"]=()=>{
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
		}();
		const id_61_63=exports["id=?"]=()=>{
			const built={};
			const doc=built.doc=`For Objects, whether they are the same place in memory.\nFor primitive types, whether they have the same data.\nTODO: Explain (and test) difference between this and js===`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[`a`,`a`],true);
				_ms.assoc(built,[[`a`],[`a`]],false);
				return built
			};
			return _ms.set(Object.is,built,"id=?")
		}();
		const truthy_63=exports["truthy?"]=()=>{
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
		}();
		const js_45typeof=exports["js-typeof"]=()=>{
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
		}();
		const name=exports.name=`js`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9qcy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0VBQUEsc0JBQU07RUFFTixTQUFNLFlBQUEsVUFDTztVQUFaLFNBQVUsSUFBSSxJQUFJLFlBQVU7O0VBQzdCLGlCQUFZLG9CQUFBLFVBQ087VUFBbEIsU0FBVSxJQUFJLFVBQVE7O0VBRXZCLGlDQUFRLEdBQUk7RUFDWixxQ0FBVSxHQUFJO0VBQ2QsK0JBQU0sR0FBSTtFQUNWLCtCQUFNLEdBQUk7RUFDVixtQ0FBTyxHQUFJO0VBQ1gsbUNBQU8sR0FBSTtFQUNYLCtCQUFNLEdBQUk7RUFDViwyQkFBSyxHQUFJO0VBQ1QsMkJBQUssR0FBSTtFQUNULCtCQUFNLEdBQUk7RUFDViwrQkFBTSxHQUFJO0VBQ1YsMkJBQUssR0FBSTtFQUNULDJCQUFLLEdBQUk7RUFDVCwyQkFBSyxHQUFJO0VBQ1QsMkJBQUssR0FBSTtFQUNULGlDQUFRLEdBQUk7RUFDWixpQ0FBUSxHQUFJO0VBQ1osNEJBQUssV0FBVTtFQUNmLDJCQUFLLFdBQVU7RUFDZixpQ0FBUSxTQUFVLE1BQU0sT0FBTztFQUMvQixpQ0FBUSxTQUFVLE1BQU0sT0FBTyxNQUFNO0VBQ3JDLHVDQUFXLFNBQVUsTUFBTSxPQUFPO0VBQ2xDLCtDQUFlLEdBQUk7RUFFbkIseUNBQ1M7O0dBQVIsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLFFBQWU7b0JBQ2pCLENBQUUsR0FBTzs7O2tCQUNULG9CQUFBLEVBQ0M7V0FBRCxFQUFJLFNBQUssRUFBRTs7O0VBRWIsbUNBQ0s7O0dBQUosb0JBQ0M7R0FHRCxzQkFDTyxlQUFBOztvQkFBTixDQUFHLElBQUksS0FBUTtvQkFDZixDQUFFLENBQUcsS0FBSyxDQUFHLE1BQVU7OztrQkFDeEI7O0VBRUQsdUNBQ1E7O0dBQVAsb0JBQU07R0FDTixzQkFDUSxlQUFBO0lBQUYsUUFBQSxLQUFBLENBQUUsS0FBSyxPQUFVLEVBQUUsV0FBWSxHQUFFLE9BQ087bUJBQXBDLFVBQVE7SUFBQTtlQUNULFVBQVE7ZUFDUixVQUFRO0dBQUE7a0JBQ2hCLG1CQUFBLEVBQ0M7V0FBRCxFQUFJLE1BQUc7R0FBQTs7RUFFVCwyQ0FDVTs7R0FBVCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsUUFBZ0I7b0JBQ2xCLENBQUUsTUFBVztvQkFDYixDQUFFLE1BQVc7b0JBQ2IsQ0FBRSxHQUFRO29CQUNWLENBQUcsS0FBUztvQkFDWixDQUFHLE9BQVEsTUFBVTtvQkFDckIsQ0FBRSxhQUFnQjtvQkFDbEIsQ0FBRTtPQUFJO0lBQUEsR0FBUzs7O2tCQUNoQixXQUFVOztFQXRFWCx3QkFBQSIsImZpbGUiOiJqcy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9