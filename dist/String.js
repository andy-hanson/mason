"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./compare","./js","./Type/Kind","./Type/Method","./Type/Pred-Type","./at/at"],(exports,compare_0,js_1,Kind_2,Method_3,Pred_45Type_4,_64_5)=>{
	exports._get=_ms.lazy(()=>{
		const compare=_ms.getDefaultExport(compare_0),_$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(js_1),id_61_63=_ms.get(_$3,"id=?"),Kind=_ms.getDefaultExport(Kind_2),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_4),_$8=_ms.lazyGetModule(_64_5),count=_ms.lazyProp(_$8,"count");
		const String_45Test=exports["String-Test"]=new (Kind)((()=>{
			const built={};
			const doc=built.doc=`Something we can compare a String to.`;
			const implementors=built.implementors=[String,RegExp];
			return _ms.setName(built,"String-Test")
		})());
		const _45_62upper=exports["->upper"]=(()=>{
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
		})();
		const Char=exports.Char=new (Pred_45Type)((()=>{
			const built={};
			const doc=built.doc=`Any String with only one character.`;
			const predicate=built.predicate=function predicate(_){
				return (_ms.contains(String,_)&&_61_63(_ms.unlazy(count)(_),1))
			};
			return _ms.setName(built,"Char")
		})());
		const indent=exports.indent=(()=>{
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
		})();
		const split_45str=exports["split-str"]=(()=>{
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
		})();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvU3RyaW5nLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBU0EsMkNBQWEsS0FBSSxNQUNJLEtBQUE7O0dBQXBCLG9CQUFNO0dBQ04sc0NBQWMsQ0FBRSxPQUFPOzs7RUFFeEIscUNBQ1EsS0FBQTs7R0FBUCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUcsTUFBVTs7O2tCQUNiLHFCQUFBLEVBQ1E7c0JBRE47V0FDRjs7O0VBRUYsd0JBQU0sS0FBSSxhQUNTLEtBQUE7O0dBQWxCLG9CQUFNO0dBQ04sZ0NBQVksbUJBQUEsRUFDQztXQUFaLGNBQUssT0FBRCxJQUFTLHlCQUFHLEdBQU87R0FBQTs7O0VBRXpCLDRCQUNPLEtBQUE7O0dBQU4sb0JBQ0M7R0FFRCxzQkFDTyxlQUFBOztJQUFOLFFBQ0M7SUFFRCxtQkFDQztvQkFFRCxDQUFFLEdBQU87b0JBQ1QsQ0FBRyxLQUFTOzs7a0JBQ1osZ0JBQUEsRUFDUTtzQkFETjtXQUNGLFVBQVcsT0FBUSxLQUFLLEtBQUs7OztFQUUvQix1Q0FDVSxLQUFBOztHQUFULG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRyxJQUFJLGlCQUFvQixDQUFHLElBQUksS0FBSyxJQUFJO29CQUMzQyxDQUFHLE9BQVEsS0FBSyxPQUFVLENBQVk7OztrQkFDdEMscUJBQWUsU0FBcUIsRUFDUTtzQkFEcEI7c0JBQWM7cUNBQXJDLE1BQU0sUUFDUCxRQUFROzs7RUFFVixRQUFNLE9BQUcsT0FBUyxTQUFBLE1BQ0s7U0FFdEI7VUFGQSxTQUVBLE1BRlU7RUFBQTtFQUNYLFFBQU0sUUFBUSxPQUFTLFNBQUEsTUFDSztTQUEzQjtVQUFBLG9CQUFlO0VBQUE7RUFwRGhCLHdCQUFBIiwiZmlsZSI6IlN0cmluZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9