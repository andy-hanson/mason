"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/Range","./compare"],(exports,Range_0,compare_1)=>{
	exports._get=_ms.lazy(()=>{
		const Range=_ms.lazy(()=>{
			return _ms.getDefaultExport(Range_0)
		}),_$4=_ms.lazyGetModule(compare_1),_61_63=_ms.lazyProp(_$4,"=?");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9qcy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBS0Esc0JBQU07RUFFTixTQUFNLFlBQUEsVUFDTztVQUFaLFNBQVUsSUFBSSxJQUFJLFlBQVU7O0VBQzdCLGlCQUFZLG9CQUFBLFVBQ087VUFBbEIsU0FBVSxJQUFJLFVBQVE7O0VBRXZCLGlDQUFRLEdBQUk7RUFDWixxQ0FBVSxHQUFJO0VBQ2QsK0JBQU0sR0FBSTtFQUNWLCtCQUFNLEdBQUk7RUFDVixtQ0FBTyxHQUFJO0VBQ1gsbUNBQU8sR0FBSTtFQUNYLCtCQUFNLEdBQUk7RUFDViwyQkFBSyxHQUFJO0VBQ1QsMkJBQUssR0FBSTtFQUNULCtCQUFNLEdBQUk7RUFDViwrQkFBTSxHQUFJO0VBQ1YsMkJBQUssR0FBSTtFQUNULDJCQUFLLEdBQUk7RUFDVCwyQkFBSyxHQUFJO0VBQ1QsMkJBQUssR0FBSTtFQUNULGlDQUFRLEdBQUk7RUFDWixpQ0FBUSxHQUFJO0VBQ1osNEJBQUssV0FBVTtFQUNmLDJCQUFLLFdBQVU7RUFDZixpQ0FBUSxTQUFVLE1BQU0sT0FBTztFQUMvQixpQ0FBUSxTQUFVLE1BQU0sT0FBTyxNQUFNO0VBQ3JDLHVDQUFXLFNBQVUsTUFBTSxPQUFPO0VBQ2xDLCtDQUFlLEdBQUk7RUFFbkIsMEJBQ00sS0FBQTs7R0FBTCxvQkFBTTtHQUNOLHNCQUNRLGVBQUE7a0NBQUksS0FBTSxJQUFFLEtBQU0sT0FBUTs7a0JBRWpDLGVBQUEsUUFDaUI7O0lBQWpCLE1BMkJvQztJQTFCL0IsUUFBQSxLQUFLLHdCQUFVLEVBQUUsZUFDYTtPQUE1QixHQUFDLFlBQUcsUUFBUSxhQUFJLE9BQU87O01BQ3hCLEdBQUMsWUFBRyxRQUFRO1dBQ2xCLE9BQU87R0FBQTs7RUFFVCxxQ0FDUyxLQUFBOztHQUFSLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxRQUFlO29CQUNqQixDQUFFLEdBQU87OztrQkFDVCxvQkFBQSxFQUNDO1dBQUQsRUFBSSxTQUFLLEVBQUU7OztFQUViLCtCQUNLLEtBQUE7O0dBQUosb0JBQ0M7R0FHRCxzQkFDTyxlQUFBOztvQkFBTixDQUFHLElBQUksS0FBUTtvQkFDZixDQUFFLENBQUcsS0FBSyxDQUFHLE1BQVU7OztrQkFDeEI7O0VBRUQsbUNBQ1EsS0FBQTs7R0FBUCxvQkFBTTtHQUNOLHNCQUNRLGVBQUE7SUFBRixRQUFBLEtBQUEsQ0FBRSxLQUFLLE9BQVUsRUFBRSxXQUFZLEdBQUUsT0FDTzttQkFBcEMsVUFBUTtJQUFBO2VBQ1QsVUFBUTtlQUNSLFVBQVE7R0FBQTtrQkFDaEIsbUJBQUEsRUFDQztXQUFELEVBQUksTUFBRztHQUFBOztFQUVULHVDQUNVLEtBQUE7O0dBQVQsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLFFBQWdCO29CQUNsQixDQUFFLE1BQVc7b0JBQ2IsQ0FBRSxNQUFXO29CQUNiLENBQUUsR0FBUTtvQkFDVixDQUFHLEtBQVM7b0JBQ1osQ0FBRyxPQUFRLE1BQVU7b0JBQ3JCLENBQUUsYUFBZ0I7b0JBQ2xCLENBQUU7T0FBSTtJQUFBLEdBQVM7OztrQkFDaEIsV0FBVTs7RUF2Rlgsd0JBQUEiLCJmaWxlIjoianMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==