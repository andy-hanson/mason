"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./Type/Type","./compare","./math/methods"],(exports,_64_0,Type_1,compare_2,methods_3)=>{
	exports._get=_ms.lazy(()=>{
		const _64=_ms.lazy(()=>{
			return _ms.getDefaultExport(_64_0)
		}),_$3=_ms.lazyGetModule(Type_1),_61_62=_ms.lazyProp(_$3,"=>"),_$5=_ms.lazyGetModule(compare_2),_61_63=_ms.lazyProp(_$5,"=?"),_$6=_ms.lazyGetModule(methods_3),_43=_ms.lazyProp(_$6,"+");
		const doc=exports.doc=`Functions implementing behavior native to JavaScript.`;
		const op=function op(op_45name){
			return Function(`a`,`b`,`return a ${_ms.show(op_45name)} b`)
		};
		const unary_45op=function unary_45op(op_45name){
			return Function(`_`,`return ${_ms.show(op_45name)} _`)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9qcy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBT0Esc0JBQU07RUFFTixTQUFNLFlBQUEsVUFDTztVQUFaLFNBQVUsSUFBSSxJQUFJLHFCQUFVOztFQUM3QixpQkFBWSxvQkFBQSxVQUNPO1VBQWxCLFNBQVUsSUFBSSxtQkFBUTs7RUFFdkIsaUNBQVEsR0FBSTtFQUNaLHFDQUFVLEdBQUk7RUFDZCwrQkFBTSxHQUFJO0VBQ1YsK0JBQU0sR0FBSTtFQUNWLG1DQUFPLEdBQUk7RUFDWCxtQ0FBTyxHQUFJO0VBQ1gsK0JBQU0sR0FBSTtFQUNWLDJCQUFLLEdBQUk7RUFDVCwyQkFBSyxHQUFJO0VBQ1QsK0JBQU0sR0FBSTtFQUNWLCtCQUFNLEdBQUk7RUFDViwyQkFBSyxHQUFJO0VBQ1QsMkJBQUssR0FBSTtFQUNULDJCQUFLLEdBQUk7RUFDVCwyQkFBSyxHQUFJO0VBQ1QsaUNBQVEsR0FBSTtFQUNaLGlDQUFRLEdBQUk7RUFDWiw0QkFBSyxXQUFVO0VBQ2YsMkJBQUssV0FBVTtFQUNmLGlDQUFRLFNBQVUsTUFBTSxPQUFPO0VBQy9CLGlDQUFRLFNBQVUsTUFBTSxPQUFPLE1BQU07RUFDckMsdUNBQVcsU0FBVSxNQUFNLE9BQU87RUFDbEMsK0NBQWUsR0FBSTtFQUVuQix5Q0FDUzs7R0FBUixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsUUFBZTtvQkFDakIsQ0FBRSxHQUFPOzs7a0JBQ1Qsb0JBQUEsRUFDQztXQUFELEVBQUksU0FBSyxFQUFFOzs7RUFFYixtQ0FDSzs7R0FBSixvQkFDQztHQUdELHNCQUNPLGVBQUE7O29CQUFOLENBQUcsSUFBSSxLQUFRO29CQUNmLENBQUUsQ0FBRyxLQUFLLENBQUcsTUFBVTs7O2tCQUN4Qjs7RUFFRCx1Q0FDUTs7R0FBUCxvQkFBTTtHQUNOLHNCQUNRLGVBQUE7SUFBRixRQUFBLEtBQUEsQ0FBRSxLQUFLLE9BQVUsRUFBRSxXQUFZLEdBQUUsT0FDTzttQkFBcEMsVUFBUTtJQUFBO2VBQ1QsVUFBUTtlQUNSLFVBQVE7R0FBQTtrQkFDaEIsbUJBQUEsRUFDQztXQUFELEVBQUksTUFBRztHQUFBOztFQUVULDJDQUNVOztHQUFULG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxRQUFnQjtvQkFDbEIsQ0FBRSxNQUFXO29CQUNiLENBQUUsTUFBVztvQkFDYixDQUFFLEdBQVE7b0JBQ1YsQ0FBRyxLQUFTO29CQUNaLENBQUcsT0FBUSxNQUFVO29CQUNyQixDQUFFLGFBQWdCO29CQUNsQixDQUFFO09BQUk7SUFBQSxHQUFTOzs7a0JBQ2hCLFdBQVU7O0VBN0VYLHdCQUFBIiwiZmlsZSI6ImpzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=