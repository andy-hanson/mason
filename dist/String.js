"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./compare","./js","./Type/Kind","./Type/Method","./Type/Pred-Type","./at/at"],(exports,compare_0,js_1,Kind_2,Method_3,Pred_45Type_4,_64_5)=>{
	exports._get=_ms.lazy(()=>{
		const compare=_ms.getDefaultExport(compare_0),_$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(js_1),id_61_63=_ms.get(_$3,"id=?"),Kind=_ms.getDefaultExport(Kind_2),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_4),_$8=_ms.lazyGetModule(_64_5),count=_ms.lazyProp(_$8,"count");
		const String_45Test=exports["String-Test"]=new (Kind)(()=>{
			const built={};
			const doc=built.doc=`Something we can compare a String to.`;
			const implementors=built.implementors=[String,RegExp];
			return _ms.setName(built,"String-Test")
		}());
		const _45_62upper=exports["->upper"]=()=>{
			const built={};
			const doc=built.doc=`Converts a-z to A-Z.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[`hi`],`HI`);
				return built
			};
			return _ms.set(function _45_62upper(_){
				_ms.checkContains(String,_,"_");
				return _.toUpperCase()
			},built)
		}();
		const Char=exports.Char=new (Pred_45Type)(()=>{
			const built={};
			const doc=built.doc=`Any String with only one character.`;
			const predicate=built.predicate=function predicate(_){
				return (_ms.contains(String,_)&&_61_63(_ms.unlazy(count)(_),1))
			};
			return _ms.setName(built,"Char")
		}());
		const indent=exports.indent=()=>{
			const built={};
			const doc=built.doc=`Adds a \`\\t\` to all \`\\n\` in \`str\`.\nDoes *not* do anything to the first line.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
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
		const split_45str=exports["split-str"]=()=>{
			const built={};
			const doc=built.doc=`Like \`@.split\` but using a String-Test instead of a predicate.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
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
		impl_33(_61_63,String,function(other){
			const _this=this;
			return id_61_63(_this,other)
		});
		impl_33(compare,String,function(other){
			const _this=this;
			return _this.localeCompare(other)
		});
		const name=exports.name=`String`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9TdHJpbmcubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFTQSwyQ0FBYSxLQUFJLFVBQ0k7O0dBQXBCLG9CQUFNO0dBQ04sc0NBQWMsQ0FBRSxPQUFPOzs7RUFFeEIseUNBQ1E7O0dBQVAsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFHLE1BQVU7OztrQkFDYixxQkFBQSxFQUNRO3NCQUROO1dBQ0Y7OztFQUVGLHdCQUFNLEtBQUksaUJBQ1M7O0dBQWxCLG9CQUFNO0dBQ04sZ0NBQVksbUJBQUEsRUFDQztXQUFaLGNBQUssT0FBRCxJQUFTLHlCQUFRLEdBQUU7R0FBQTs7O0VBRXpCLGdDQUNPOztHQUFOLG9CQUNDO0dBRUQsc0JBQ08sZUFBQTs7SUFBTixRQUNDO0lBRUQsbUJBQ0M7b0JBRUQsQ0FBRSxHQUFPO29CQUNULENBQUcsS0FBUzs7O2tCQUNaLGdCQUFBLEVBQ1E7c0JBRE47V0FDRixVQUFXLE9BQVEsS0FBSyxLQUFLOzs7RUFFL0IsMkNBQ1U7O0dBQVQsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFHLElBQUksaUJBQW9CLENBQUcsSUFBSSxLQUFLLElBQUk7b0JBQzNDLENBQUcsT0FBUSxLQUFLLE9BQVUsQ0FBWTs7O2tCQUN0QyxxQkFBZSxTQUFxQixFQUNRO3NCQURwQjtzQkFBYztxQ0FBckMsTUFBTSxRQUNQLFFBQVE7OztFQUVWLFFBQU0sT0FBRyxPQUFTLFNBQUEsTUFDSztTQUV0QjtVQUZBLFNBRUEsTUFGVTtFQUFBO0VBQ1gsUUFBTSxRQUFRLE9BQVMsU0FBQSxNQUNLO1NBQTNCO1VBQUEsb0JBQWU7RUFBQTtFQXBEaEIsd0JBQUEiLCJmaWxlIjoiU3RyaW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=