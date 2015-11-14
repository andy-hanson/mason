"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../Function","./../js","./../methods","./Method","./Type","./../at/at"],(exports,Function_0,js_1,methods_2,Method_3,Type_4,_64_5)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(Function_0),Pred=_ms.get(_$0,"Pred"),_$1=_ms.getModule(js_1),defined_63=_ms.get(_$1,"defined?"),id_61_63=_ms.get(_$1,"id=?"),_$2=_ms.getModule(methods_2),sub=_ms.get(_$2,"sub"),_$3=_ms.getModule(Method_3),self_45impl_33=_ms.get(_$3,"self-impl!"),Type=_ms.getDefaultExport(Type_4),_$4=_ms.getModule(Type_4),_61_62=_ms.get(_$4,"=>"),contains_63=_ms.get(_$4,"contains?"),_$5=_ms.lazyGetModule(_64_5),any_63=_ms.lazyProp(_$5,"any?"),_64map=_ms.lazyProp(_$5,"@map");
		const Pred_45Type=exports.default=(()=>{
			const _=class Pred_45Type{
				constructor(params){
					const _this=this;
					Object.assign(_this,params);
					_ms.assert(_ms.contains,String,_this.name);
					_ms.assert(_ms.contains,Pred,_this.predicate)
				}
				[_ms.symbol(contains_63)](value){
					const _this=this;
					return _this.predicate(value)
				}
			};
			_ms.kindDo(_,Type);
			return _
		})();
		const Opt=exports.Opt=new (Pred_45Type)((()=>{
			const built={};
			built.name="Opt";
			const predicate=built.predicate=function predicate(){
				return true
			};
			return built
		})());
		self_45impl_33(sub,Opt,(()=>{
			return Exists_45Type=>{
				_ms.checkContains(Type,Exists_45Type,"Exists-Type");
				const ET=Exists_45Type;
				return new (Opt_45Sub)(ET)
			}
		})());
		const Opt_45Sub=(()=>{
			const _=class Opt_45Sub{
				constructor(Exists_45Type){
					const _this=this;
					_ms.checkContains(Type,Exists_45Type,"Exists-Type");
					_ms.newProperty(this,"Exists-Type",Exists_45Type)
				}
				[_ms.symbol(contains_63)](_){
					const _this=this;
					return (! defined_63(_)||_ms.contains(_this["Exists-Type"],_))
				}
			};
			_ms.kindDo(_,Type);
			return _
		})();
		const Any=exports.Any=new (Pred_45Type)((()=>{
			const built={};
			built.name="Any";
			const predicate=built.predicate=defined_63;
			return built
		})());
		const ObjLit=exports.ObjLit=new (Pred_45Type)((()=>{
			const built={};
			built.name="ObjLit";
			const predicate=built.predicate=function predicate(_){
				return (_ms.contains(Object,_)&&id_61_63(Object.getPrototypeOf(_),Object.prototype))
			};
			return built
		})());
		const Union=exports.Union=(()=>{
			return new (Object)()
		})();
		self_45impl_33(sub,Union,function(){
			const types=[].slice.call(arguments,0);
			return new (Pred_45Type)((()=>{
				const built={};
				built.name=(()=>{
					const names=_ms.unlazy(_64map)(types,_=>_.name);
					return `Union[${_61_62(String,names,` `)}]`
				})();
				const predicate=built.predicate=function predicate(_){
					return _ms.unlazy(any_63)(types,possible_45type=>{
						return _ms.contains(possible_45type,_)
					})
				};
				return built
			})())
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9QcmVkLVR5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFTQSxrQ0FBaUI7O0lBRU4sWUFBQTtXQTJCWTtLQTFCckIsY0EwQnFCLE1BMUJGOzZCQUNOLE9BeUJROzZCQXhCSCxLQXdCRzs7Z0JBdEJ0QixjQUFXO1dBc0JXO1lBQUEsZ0JBckJWO0lBQUE7R0FBQTtnQkFSUzs7O0VBV3JCLHNCQUFLLEtBQUksYUFDUyxLQUFBOztjQUNqQjtHQUNBLGdDQUNZO1dBQVg7R0FBQTs7O0VBRUYsZUFBVyxJQUFJLElBQ0csS0FBQTtVQUNoQjtzQkFBWTtJQUNaLFNBQUs7V0FDTCxLQUFJLFdBQVE7R0FBQTtFQUFBO0VBRWQsZ0JBQWdCOztJQUVMLFlBQUE7V0FJVzt1QkFKRTs7O2dCQUd2QixjQUFXO1dBQ1U7WUFBcEIsQ0FBSSxFQUFJLFdBQUEsaUJBQVkscUJBQUQ7SUFBQTtHQUFBO2dCQU5BOzs7RUFRdEIsc0JBQUssS0FBSSxhQUNTLEtBQUE7O2NBQ2pCO0dBQ0EsZ0NBQVc7OztFQUVaLDRCQUFRLEtBQUksYUFDUyxLQUFBOztjQUNwQjtHQUNBLGdDQUFZLG1CQUFBO1dBQ1gsY0FBSyxPQUFELElBQVMsU0FBSyxzQkFBTyxHQUFnQjs7OztFQUUzQywwQkFDTSxLQUFBO1VBQ0wsS0FBSTtFQUFBO0VBRUwsZUFBVyxJQUFJLE1BQU87O1VBQ3JCLEtBQUksYUFDUyxLQUFBOztlQUNQLEtBQUE7S0FBSiwrQkFBYTtZQUNaLFNBQU8sT0FBRyxPQUFPLE1BQU87O0lBQzFCLGdDQUFZLG1CQUFBOytCQUNOLE1BQU87MEJBQ1YsZ0JBQUQ7S0FBQTtJQUFBIiwiZmlsZSI6IlR5cGUvUHJlZC1UeXBlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
