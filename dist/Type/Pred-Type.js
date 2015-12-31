"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../js","./../methods","./Method","./Trait","./Type","./../at/at"],(exports,js_0,methods_1,Method_2,Trait_3,Type_4,_64_5)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(js_0),defined_63=_ms.get(_$0,"defined?"),id_61_63=_ms.get(_$0,"id=?"),_$1=_ms.getModule(methods_1),sub=_ms.get(_$1,"sub"),_$2=_ms.getModule(Method_2),self_45impl_33=_ms.get(_$2,"self-impl!"),Trait=_ms.getDefaultExport(Trait_3),_$3=_ms.getModule(Trait_3),has_45trait_63=_ms.get(_$3,"has-trait?"),Type=_ms.getDefaultExport(Type_4),_$4=_ms.getModule(Type_4),_61_62=_ms.get(_$4,"=>"),has_45instance_63=_ms.get(_$4,"has-instance?"),_$5=_ms.lazyGetModule(_64_5),any_63=_ms.lazyProp(_$5,"any?"),_64map=_ms.lazyProp(_$5,"@map");
		let Pred=Function;
		let Pred_45Type=exports.default=(()=>{
			let _=class Pred_45Type{
				constructor(params){
					let _this=this;
					Object.assign(_this,params);
					if(! _ms.hasInstance(Pred,_this.predicate))throw new (Error)("Assertion failed.")
				}
				[_ms.symbol(has_45instance_63)](value){
					let _this=this;
					return _this.predicate(value)
				}
			};
			_ms.traitDo(_,Type);
			return _
		})();
		let Opt=exports.Opt=new (Pred_45Type)((()=>{
			let built={};
			built.name="Opt";
			let predicate=built.predicate=function predicate(){
				return true
			};
			return built
		})());
		self_45impl_33(sub,Opt,(()=>{
			return Exists_45Type=>{
				_ms.checkInstance(Type,Exists_45Type,"Exists-Type");
				let ET=Exists_45Type;
				return new (Opt_45Sub)(ET)
			}
		})());
		let Opt_45Sub=(()=>{
			let _=class Opt_45Sub{
				constructor(Exists_45Type){
					let _this=this;
					_ms.checkInstance(Type,Exists_45Type,"Exists-Type");
					_ms.newProperty(this,"Exists-Type",Exists_45Type)
				}
				get name(){
					let _this=this;
					return `Opt[${_this["Exists-Type"].name}]`
				}
				[_ms.symbol(has_45instance_63)](_){
					let _this=this;
					return (! defined_63(_)||_ms.hasInstance(_this["Exists-Type"],_))
				}
			};
			_ms.traitDo(_,Type);
			return _
		})();
		let Any=exports.Any=new (Pred_45Type)((()=>{
			let built={};
			built.name="Any";
			let predicate=built.predicate=defined_63;
			return built
		})());
		let ObjLit=exports.ObjLit=new (Pred_45Type)((()=>{
			let built={};
			built.name="ObjLit";
			let predicate=built.predicate=function predicate(_){
				return (_ms.hasInstance(Object,_)&&id_61_63(Object.getPrototypeOf(_),Object.prototype))
			};
			return built
		})());
		let Union=exports.Union=(()=>{
			let built={};
			built.name="Union";
			return built
		})();
		self_45impl_33(sub,Union,function(){
			let types=[].slice.call(arguments,0);
			return new (Pred_45Type)((()=>{
				let built={};
				built.name=(()=>{
					let names=_ms.unlazy(_64map)(types,_=>_.name);
					return `Union[${_61_62(String,names,` `)}]`
				})();
				let predicate=built.predicate=function predicate(_){
					return _ms.unlazy(any_63)(types,possible_45type=>{
						return _ms.hasInstance(possible_45type,_)
					})
				};
				return built
			})())
		});
		let Class=exports.Class=(()=>{
			let built={};
			built.name="Class";
			return built
		})();
		self_45impl_33(sub,Class,typ=>{
			return new (Pred_45Type)((()=>{
				let built={};
				built.name=`Class[${typ.name}]`;
				let predicate=built.predicate=function predicate(_){
					return (()=>{
						if(_ms.hasInstance(Function,_)){
							return _ms.hasInstance(typ,_.prototype)
						} else if(_ms.hasInstance(Trait,_)){
							return (_ms.hasInstance(Trait,typ)&&has_45trait_63(_,typ))
						} else {
							return false
						}
					})()
				};
				return built
			})())
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9QcmVkLVR5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFVQSxTQUFPO0VBRVAsZ0NBQWlCOztJQUVOLFlBQUEsT0FDTTtTQTZCTTtLQTdCckIsY0E2QnFCLE1BN0JGO0tBRVoscUJBQVcsS0EyQkc7O2dCQXpCdEIsb0JBQWUsTUFDSztTQXdCRTtZQUFBLGdCQXhCVjtJQUFBO0dBQUE7aUJBUlU7OztFQVd0QixvQkFBSyxLQUFJLGFBQ1MsS0FBQTs7Y0FDakI7R0FDQSw4QkFDWSxvQkFBQTtXQUFYO0dBQUE7OztFQUVGLGVBQVcsSUFBSSxJQUNHLEtBQUE7VUFDaEIsZUFDZ0I7c0JBREo7SUFDWixPQUFLO1dBQ0wsS0FBSSxXQUFRO0dBQUE7RUFBQTtFQUVkLGNBQWdCOztJQUVMLFlBQUEsY0FDaUI7U0FNTjt1QkFQRTs7O2NBSWQ7U0FHWTtZQUhuQixPQUdtQjs7Z0JBRHJCLG9CQUFnQixFQUNBO1NBQUs7WUFBcEIsQ0FBSSxFQUFJLFdBQVMsb0JBQUcscUJBQUQ7SUFBQTtHQUFBO2lCQVRDOzs7RUFXdkIsb0JBQUssS0FBSSxhQUNTLEtBQUE7O2NBQ2pCO0dBQ0EsOEJBQVc7OztFQUVaLDBCQUFRLEtBQUksYUFDUyxLQUFBOztjQUNwQjtHQUNBLDhCQUFhLG1CQUFBLEVBQ0E7V0FBWixpQkFBSyxPQUFELElBQVMsU0FBSyxzQkFBc0IsR0FBQzs7OztFQUczQyx3QkFDTSxLQUFBOztjQUNMOzs7RUFFRCxlQUFXLElBQUksTUFBTyxVQUNROztVQUE3QixLQUFJLGFBQ1MsS0FBQTs7ZUFDUCxLQUFBO0tBQUosNkJBQWE7WUFDWixTQUFRLE9BQUcsT0FBTyxNQUFPOztJQUMzQiw4QkFBYSxtQkFBQSxFQUNBOytCQUFQLE1BQU8saUJBQ2E7NkJBQXZCLGdCQUFEO0tBQUE7SUFBQTs7OztFQUdKLHdCQUNNLEtBQUE7O2NBQ0w7OztFQUVELGVBQVcsSUFBSSxNQUFPLEtBQ0c7VUFBeEIsS0FBSSxhQUNTLEtBQUE7O2VBQUwsU0FBUTtJQUNmLDhCQUFZLG1CQUFBLEVBQUE7WUFDSTtNQUFmLG1CQUFDLFNBQUQsR0FDUzs4QkFBSSxJQUFYO2FBQ0YsbUJBQUMsTUFBRCxHQUNNO2NBQUwsaUJBQVEsTUFBSixNQUFXLGVBQVksRUFBQztNQUFBLE9BRXpCO2NBQUg7TUFBQTtLQUFBO0lBQUEiLCJmaWxlIjoiVHlwZS9QcmVkLVR5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
