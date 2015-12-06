"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../js","./../methods","./Method","./Type","./../at/at"],(exports,js_0,methods_1,Method_2,Type_3,_64_4)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(js_0),defined_63=_ms.get(_$0,"defined?"),id_61_63=_ms.get(_$0,"id=?"),_$1=_ms.getModule(methods_1),sub=_ms.get(_$1,"sub"),_$2=_ms.getModule(Method_2),self_45impl_33=_ms.get(_$2,"self-impl!"),Type=_ms.getDefaultExport(Type_3),_$3=_ms.getModule(Type_3),_61_62=_ms.get(_$3,"=>"),has_45instance_63=_ms.get(_$3,"has-instance?"),_$4=_ms.lazyGetModule(_64_4),any_63=_ms.lazyProp(_$4,"any?"),_64map=_ms.lazyProp(_$4,"@map");
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
			_ms.kindDo(_,Type);
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
			_ms.kindDo(_,Type);
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
			return new (Object)()
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
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9QcmVkLVR5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFTQSxTQUFPO0VBRVAsZ0NBQWlCOztJQUVOLFlBQUE7U0E4Qlk7S0E3QnJCLGNBNkJxQixNQTdCRjtLQUVaLHFCQUFXLEtBMkJHOztnQkF6QnRCLG9CQUFlO1NBeUJPO1lBQUEsZ0JBeEJWO0lBQUE7R0FBQTtnQkFSUzs7O0VBV3JCLG9CQUFLLEtBQUksYUFDUyxLQUFBOztjQUNqQjtHQUNBLDhCQUNZO1dBQVg7R0FBQTs7O0VBRUYsZUFBVyxJQUFJLElBQ0csS0FBQTtVQUNoQjtzQkFBWTtJQUNaLE9BQUs7V0FDTCxLQUFJLFdBQVE7R0FBQTtFQUFBO0VBRWQsY0FBZ0I7O0lBRUwsWUFBQTtTQU9XO3VCQVBFOzs7Y0FJZDtTQUdZO1lBSG5CLE9BR21COztnQkFEckIsb0JBQWdCO1NBQ0s7WUFBcEIsQ0FBSSxFQUFJLFdBQVMsb0JBQUcscUJBQUQ7SUFBQTtHQUFBO2dCQVRBOzs7RUFXdEIsb0JBQUssS0FBSSxhQUNTLEtBQUE7O2NBQ2pCO0dBQ0EsOEJBQVc7OztFQUVaLDBCQUFRLEtBQUksYUFDUyxLQUFBOztjQUNwQjtHQUNBLDhCQUFhLG1CQUFBO1dBQ1osaUJBQUssT0FBRCxJQUFTLFNBQUssc0JBQXNCLEdBQUM7Ozs7RUFFM0Msd0JBQ00sS0FBQTtVQUNMLEtBQUk7RUFBQTtFQUVMLGVBQVcsSUFBSSxNQUFPOztVQUNyQixLQUFJLGFBQ1MsS0FBQTs7ZUFDUCxLQUFBO0tBQUosNkJBQWE7WUFDWixTQUFRLE9BQUcsT0FBTyxNQUFPOztJQUMzQiw4QkFBYSxtQkFBQTsrQkFDUCxNQUFPOzZCQUNWLGdCQUFEO0tBQUE7SUFBQSIsImZpbGUiOiJUeXBlL1ByZWQtVHlwZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
