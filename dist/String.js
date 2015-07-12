"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Boolean","./compare","./js","./Type/Kind","./Type/Method","./Type/Pred-Type","./at/at"],function(exports,Boolean_0,compare_1,js_2,Kind_3,Method_4,Pred_45Type_5,_64_6){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),compare=_ms.getDefaultExport(compare_1),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(js_2),id_61_63=_ms.get(_$4,"id=?"),Kind=_ms.getDefaultExport(Kind_3),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_5),_$9=_ms.lazyGetModule(_64_6),count=_ms.lazyProp(_$9,"count");
		const String_45Test=exports["String-Test"]=Kind(function(){
			const built={};
			const doc=built.doc=`Something we can compare a String to.`;
			const implementors=built.implementors=[String,RegExp];
			return _ms.setName(built,"String-Test")
		}());
		const _45_62upper=exports["->upper"]=function(){
			const built={};
			const doc=built.doc=`Converts a-z to A-Z.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[`hi`],`HI`);
				return built
			};
			return _ms.set(function _45_62upper(_){
				_ms.checkContains(String,_,"_");
				return _.toUpperCase()
			},built)
		}();
		const Char=exports.Char=Pred_45Type(function(){
			const built={};
			const doc=built.doc=`Any String with only one character.`;
			const predicate=built.predicate=function predicate(_){
				return and(_ms.contains(String,_),_ms.lazy(function(){
					return _61_63(_ms.unlazy(count)(_),1)
				}))
			};
			return _ms.setName(built,"Char")
		}());
		const indent=exports.indent=function(){
			const built={};
			const doc=built.doc=`Adds a \`\\t\` to all \`\\n\` in \`str\`.\nDoes *not* do anything to the first line.`;
			const test=built.test=function test(){
				const built=new global.Map();
				const s=`a\nb`;
				const s_45indented=`a\n\tb`;
				_ms.assoc(built,[s],s_45indented);
				_ms.assoc(built,[`a`],`a`);
				return built
			};
			return _ms.set(function indent(_){
				_ms.checkContains(String,_,"_");
				return _.replace(RegExp(`\n`,`g`),`\n\t`)
			},built)
		}();
		const split_45str=exports["split-str"]=function(){
			const built={};
			const doc=built.doc=`Like \`@.split\` but using a String-Test instead of a predicate.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[` `,`I am a String`],[`I`,`am`,`a`,`String`]);
				_ms.assoc(built,[RegExp(`.`),`abc`],["","","",""]);
				return built
			};
			return _ms.set(function split_45str(splitter,_){
				_ms.checkContains(String_45Test,splitter,"splitter");
				_ms.checkContains(String,_,"_");
				return _ms.checkContains(_ms.sub(Array,String),_.split(splitter),"res")
			},built)
		}();
		impl_33(_61_63,String,id_61_63);
		impl_33(compare,String,function(a,b){
			return a.localeCompare(b)
		});
		const name=exports.name=`String`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9TdHJpbmcubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFVQSwyQ0FBYSxlQUNJOztHQUFoQixvQkFBTTtHQUNOLHNDQUFjLENBQUUsT0FBTzs7O0VBRXhCLCtDQUNROztHQUFQLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRyxNQUFVOzs7a0JBQ2IscUJBQUEsRUFDUTtzQkFETjtXQUNGOzs7RUFFRix3QkFBTSxzQkFDUzs7R0FBZCxvQkFBTTtHQUNOLGdDQUFZLG1CQUFBLEVBQ0M7V0FBWixpQkFBSyxPQUFEO1lBQVUseUJBQVEsR0FBRTtJQUFBO0dBQUE7OztFQUUxQixzQ0FDTzs7R0FBTixvQkFDQztHQUVELHNCQUNPLGVBQUE7O0lBQU4sUUFDQztJQUVELG1CQUNDO29CQUVELENBQUUsR0FBTztvQkFDVCxDQUFHLEtBQVM7OztrQkFDWixnQkFBQSxFQUNRO3NCQUROO1dBQ0YsVUFBVyxPQUFRLEtBQUssS0FBSzs7O0VBRS9CLGlEQUNVOztHQUFULG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRyxJQUFJLGlCQUFvQixDQUFHLElBQUksS0FBSyxJQUFJO29CQUMzQyxDQUFHLE9BQVEsS0FBSyxPQUFVLENBQVk7OztrQkFDdEMscUJBQWUsU0FBcUIsRUFDUTtzQkFEcEI7c0JBQWM7cUNBQXJDLE1BQU0sUUFDUCxRQUFROzs7RUFFVixRQUFNLE9BQUcsT0FBTztFQUNoQixRQUFNLFFBQVEsT0FBUSxTQUFBLEVBQUUsRUFDQztVQUF4QixnQkFBZ0I7RUFBQTtFQXBEakIsd0JBQUEiLCJmaWxlIjoiU3RyaW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=