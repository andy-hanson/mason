"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../js","./Pred-Type"],(exports,js_0,Pred_45Type_1)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(js_0),id_61_63=_ms.get(_$0,"id=?"),js_45typeof=_ms.get(_$0,"js-typeof"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_1);
		let pt=function pt(type_45name,typeof_45res){
			return new (Pred_45Type)((()=>{
				let built={};
				built.name=type_45name;
				let predicate=built.predicate=function predicate(_){
					return id_61_63(js_45typeof(_),typeof_45res)
				};
				return built
			})())
		};
		let Num=exports.Num=pt("Num","number");
		let Str=exports.Str=pt("Str","string");
		let Bool=exports.Bool=pt("Bool","boolean");
		let Sym=exports.Sym=pt("Sym","symbol");
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9wcmltaXRpdmUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFJQSxPQUFNLFlBQUEsWUFBVSxhQUNVO1VBQXpCLEtBQUksYUFDUyxLQUFBOztlQUFOO0lBQ04sOEJBQWEsbUJBQUEsRUFDQTtZQUFaLFNBQUssWUFBVSxHQUFDO0lBQUE7Ozs7RUFFbkIsb0JBQUssR0FBRyxNQUFNO0VBRWQsb0JBQUssR0FBRyxNQUFNO0VBRWQsc0JBQU0sR0FBRyxPQUFNO0VBRWYsb0JBQUssR0FBRyxNQUFNIiwiZmlsZSI6IlR5cGUvcHJpbWl0aXZlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
