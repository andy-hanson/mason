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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9QcmVkLVR5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFVQSxTQUFPO0VBRVAsZ0NBQWlCOztJQUVOLFlBQUEsT0FDTTs7S0FBZixjQUFjLE1BQUs7S0FFWixxQkFBVyxLQUFYOztJQUVSLFlBQUEsb0JBQWUsTUFDSzs7WUFBbkIsZ0JBQVc7SUFBQTtHQUFBO2lCQVJVOzs7RUFXdEIsb0JBQUssS0FBSSxhQUNTLEtBQUE7O2NBQ2pCO0dBQ0EsOEJBQ1ksb0JBQUE7V0FBWDtHQUFBOzs7RUFFRixlQUFXLElBQUksSUFDRyxLQUFBO1VBQ2hCLGVBQ2dCO3NCQURKO0lBQ1osT0FBSztXQUNMLEtBQUksV0FBUTtHQUFBO0VBQUE7RUFFZCxjQUFnQjs7SUFFTCxZQUFBLGNBQ2lCOzt1QkFESjs7O0lBR3ZCLFVBQ1M7O1lBQVAsT0FBTTs7SUFFUixZQUFBLG9CQUFnQixFQUNBOztZQUFmLENBQUksRUFBSSxXQUFTLG9CQUFHLHFCQUFEO0lBQUE7R0FBQTtpQkFUQzs7O0VBV3ZCLG9CQUFLLEtBQUksYUFDUyxLQUFBOztjQUNqQjtHQUNBLDhCQUFXOzs7RUFFWiwwQkFBUSxLQUFJLGFBQ1MsS0FBQTs7Y0FDcEI7R0FDQSw4QkFBYSxtQkFBQSxFQUNBO1dBQVosaUJBQUssT0FBRCxJQUFTLFNBQUssc0JBQXNCLEdBQUM7Ozs7RUFHM0Msd0JBQ00sS0FBQTs7Y0FDTDs7O0VBRUQsZUFBVyxJQUFJLE1BQU8sVUFDUTs7VUFBN0IsS0FBSSxhQUNTLEtBQUE7O2VBQ1AsS0FBQTtLQUFKLDZCQUFhO1lBQ1osU0FBUSxPQUFHLE9BQU8sTUFBTzs7SUFDM0IsOEJBQWEsbUJBQUEsRUFDQTsrQkFBUCxNQUFPLGlCQUNhOzZCQUF2QixnQkFBRDtLQUFBO0lBQUE7Ozs7RUFHSix3QkFDTSxLQUFBOztjQUNMOzs7RUFFRCxlQUFXLElBQUksTUFBTyxLQUNHO1VBQXhCLEtBQUksYUFDUyxLQUFBOztlQUFMLFNBQVE7SUFDZiw4QkFBWSxtQkFBQSxFQUFBO1lBQ0k7TUFBZixtQkFBQyxTQUFELEdBQ1M7OEJBQUksSUFBWDthQUNGLG1CQUFDLE1BQUQsR0FDTTtjQUFMLGlCQUFRLE1BQUosTUFBVyxlQUFZLEVBQUM7TUFBQSxPQUV6QjtjQUFIO01BQUE7S0FBQTtJQUFBIiwiZmlsZSI6IlR5cGUvUHJlZC1UeXBlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=