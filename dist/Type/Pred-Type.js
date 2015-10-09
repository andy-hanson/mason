"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Function","../js","../methods","./Kind","./Method","./Type","../at/at"],(exports,Function_0,js_1,methods_2,Kind_3,Method_4,Type_5,_64_6)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(Function_0),Pred=_ms.get(_$0,"Pred"),_$1=_ms.getModule(js_1),defined_63=_ms.get(_$1,"defined?"),id_61_63=_ms.get(_$1,"id=?"),_$2=_ms.getModule(methods_2),sub=_ms.get(_$2,"sub"),_$3=_ms.getModule(Kind_3),kind_33=_ms.get(_$3,"kind!"),_$4=_ms.getModule(Method_4),impl_33=_ms.get(_$4,"impl!"),self_45impl_33=_ms.get(_$4,"self-impl!"),Type=_ms.getDefaultExport(Type_5),_$5=_ms.getModule(Type_5),_61_62=_ms.get(_$5,"=>"),contains_63=_ms.get(_$5,"contains?"),_$6=_ms.lazyGetModule(_64_6),any_63=_ms.lazyProp(_$6,"any?");
		const Pred_45Type=exports.default=class Pred_45Type{
			constructor(params){
				Object.assign(this,params);
				_ms.assert(_ms.contains,String,this.name);
				_ms.assert(_ms.contains,Pred,this.predicate)
			}
		};
		kind_33(Pred_45Type,Type);
		impl_33(contains_63,Pred_45Type,function(value){
			const _this=this;
			return _this.predicate(value)
		});
		const Opt=exports.Opt=new (Pred_45Type)((()=>{
			const built={};
			built[`name`]="Opt";
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
		const Opt_45Sub=class Opt_45Sub{
			constructor(Exists_45Type){
				_ms.newProperty(this,"Exists-Type",Exists_45Type);
				_ms.checkContains(Type,Exists_45Type,"Exists-Type")
			}
		};
		kind_33(Opt_45Sub,Type);
		impl_33(contains_63,Opt_45Sub,function(_){
			const _this=this;
			return (! defined_63(_)||_ms.contains(_this["Exists-Type"],_))
		});
		const Any=exports.Any=new (Pred_45Type)((()=>{
			const built={};
			built[`name`]="Any";
			const predicate=built.predicate=defined_63;
			return built
		})());
		const ObjLit=exports.ObjLit=new (Pred_45Type)((()=>{
			const built={};
			built[`name`]="ObjLit";
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
				built[`name`]=(()=>{
					const names=(()=>{
						const built=[];
						for(let _ of types){
							_ms.add(built,_.name)
						};
						return built
					})();
					return `Union[${_61_62(String,names,` `)}]`
				})();
				const predicate=built.predicate=function predicate(_){
					return _ms.unlazy(any_63)(types,type=>{
						return _ms.contains(type,_)
					})
				};
				return built
			})())
		});
		const name=exports.name=`Pred-Type`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9QcmVkLVR5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFVQSxrQ0FDZ0I7R0FDSixZQUFBLE9BQ007SUEyQ2IsY0EzQ1csS0FBSzs0QkFrRFAsT0FqREo7NEJBQ1csS0FBWDs7O0VBRVYsUUFBTSxZQUFVO0VBQ2hCLFFBQU0sWUFBVSxZQUFZLFNBQUEsTUFDSztTQXNCWDtVQUFBLGdCQXRCVjtFQUFBO0VBR1gsc0JBQUssS0FBSSxhQUNTLEtBQUE7O1NBQ2pCLFFBQUE7R0FDQSxnQ0FDWSxvQkFBQTtXQUFYO0dBQUE7OztFQUVGLGVBQVcsSUFBSSxJQUNHLEtBQUE7VUFDaEIsZUFDZ0I7c0JBREo7SUFDWixTQUFLO1dBQ0wsS0FBSSxXQUFRO0dBQUE7RUFBQTtFQUVkLGdCQUNlO0dBQ0gsWUFBQSxjQUNpQjs7c0JBREo7OztFQUd6QixRQUFNLFVBQVE7RUFDZCxRQUFNLFlBQVUsVUFBVSxTQUFBLEVBQ0M7U0FBTjtVQUFwQixDQUFJLEVBQUksV0FBQSxpQkFBWSxxQkFBRDtFQUFBO0VBRXJCLHNCQUFLLEtBQUksYUFDUyxLQUFBOztTQUNqQixRQUFBO0dBQ0EsZ0NBQVc7OztFQUVaLDRCQUFRLEtBQUksYUFDUyxLQUFBOztTQUNwQixRQUFBO0dBQ0EsZ0NBQVksbUJBQUEsRUFDQztXQUFaLGNBSUcsT0FKQyxJQUFTLFNBSVYsc0JBSnFCLEdBSXJCOzs7O0VBRkwsMEJBQ00sS0FBQTtVQUNMLEtBQUk7RUFBQTtFQUVMLGVBQVcsSUFBSSxNQUFPLFVBQ1E7O1VBQTdCLEtBQUksYUFDUyxLQUFBOztVQUFaLFFBQ0ssS0FBQTtLQUFKLFlBQWE7O2NBQUEsS0FBQSxNQUNLO3FCQUFqQjs7OztZQUNBLFNBQU8sT0FBRyxPQUFPLE1BQU87O0lBQzFCLGdDQUFZLG1CQUFBLEVBQ0M7K0JBQVAsTUFBTyxNQUNJOzBCQUFkLEtBQUQ7S0FBQTtJQUFBOzs7O0VBbEVKLHdCQUFBIiwiZmlsZSI6IlR5cGUvUHJlZC1UeXBlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
