"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./compare","./js","./Type/Kind","./Type/Method","./Type/Pred-Type","./at/at"],(exports,compare_0,js_1,Kind_2,Method_3,Pred_45Type_4,_64_5)=>{
	exports._get=_ms.lazy(()=>{
		const compare=_ms.getDefaultExport(compare_0),_$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(js_1),id_61_63=_ms.get(_$1,"id=?"),Kind=_ms.getDefaultExport(Kind_2),_$2=_ms.getModule(Method_3),impl_33=_ms.get(_$2,"impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_4),_$3=_ms.lazyGetModule(_64_5),count=_ms.lazyProp(_$3,"count");
		const String_45Test=exports["String-Test"]=new (Kind)((()=>{
			const built={};
			built[`name`]="String-Test";
			const implementors=built.implementors=[String,RegExp];
			return built
		})());
		const Char=exports.Char=new (Pred_45Type)((()=>{
			const built={};
			built[`name`]="Char";
			const predicate=built.predicate=function predicate(_){
				return (_ms.contains(String,_)&&_61_63(_ms.unlazy(count)(_),1))
			};
			return built
		})());
		const indent=exports.indent=function indent(_){
			_ms.checkContains(String,_,"_");
			return _.replace(new (RegExp)(`\n`,`g`),`\n\t`)
		};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvU3RyaW5nLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBU0EsMkNBQWEsS0FBSSxNQUNJLEtBQUE7O1NBQ3BCLFFBQUE7R0FDQSxzQ0FBYyxDQWVELE9BSkU7OztFQVRoQix3QkFBTSxLQUFJLGFBQ1MsS0FBQTs7U0FDbEIsUUFBQTtHQUNBLGdDQUFZLG1CQUFBLEVBQ0M7V0FBWixjQVNZLE9BVFIsSUFBUyx5QkFBRyxHQUFPO0dBQUE7OztFQUV6Qiw0QkFBUyxnQkFBQSxFQUNRO3FCQU1IO1VBSmIsVUFBVyxLQUFJLFFBQVEsS0FBSyxLQUFLOztFQUVsQyxRQUFNLE9BRVEsT0FGSSxTQUFBLE1BQ0s7U0FFdEI7VUFGQSxTQUVBLE1BRlU7RUFBQTtFQUNYLFFBQU0sUUFBUSxPQUFTLFNBQUEsTUFDSztTQUEzQjtVQUFBLG9CQUFlO0VBQUE7RUE1QmhCLHdCQUFBIiwiZmlsZSI6IlN0cmluZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
