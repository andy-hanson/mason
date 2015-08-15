"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Function","../js","../methods","./Kind","./Method","./Type","../at/at","../compare"],(exports,Function_0,js_1,methods_2,Kind_3,Method_4,Type_5,_64_6,compare_7)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Function_0),Pred=_ms.get(_$2,"Pred"),_$3=_ms.getModule(js_1),defined_63=_ms.get(_$3,"defined?"),id_61_63=_ms.get(_$3,"id=?"),_$4=_ms.getModule(methods_2),sub=_ms.get(_$4,"sub"),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),self_45impl_33=_ms.get(_$6,"self-impl!"),Type=_ms.getDefaultExport(Type_5),_$7=_ms.getModule(Type_5),_61_62=_ms.get(_$7,"=>"),contains_63=_ms.get(_$7,"contains?"),_$9=_ms.lazyGetModule(_64_6),any_63=_ms.lazyProp(_$9,"any?"),_$11=_ms.lazyGetModule(compare_7),_61_63=_ms.lazyProp(_$11,"=?");
		const Pred_45Type=class Pred_45Type{
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
			const doc=built.doc=`A value which could be anything, even undefined.`;
			const predicate=built.predicate=function predicate(){
				return true
			};
			return _ms.setName(built,"Opt")
		})());
		self_45impl_33(sub,Opt,(()=>{
			const built={};
			const doc=built.doc=`Contains null, undefined, or an instance of Exists-Type.`;
			return _ms.set(Exists_45Type=>{
				_ms.checkContains(Type,Exists_45Type,"Exists-Type");
				const ET=Exists_45Type;
				return new (Opt_45Sub)(ET)
			},built)
		})());
		const Opt_45Sub=class Opt_45Sub{
			constructor(Exists_45Type){
				_ms.checkContains(Type,Exists_45Type,"Exists-Type");
				_ms.newProperty(this,"Exists-Type",Exists_45Type)
			}
		};
		kind_33(Opt_45Sub,Type);
		impl_33(contains_63,Opt_45Sub,function(_){
			const _this=this;
			return (! defined_63(_)||contains_63(_this["Exists-Type"],_))
		});
		const Any=exports.Any=new (Pred_45Type)((()=>{
			const built={};
			const doc=built.doc=`Not undefined.`;
			const test=built.test=function test(){
				_ms.assert(contains_63,Any,0);
				_ms.assert(contains_63,Any,null);
				_ms.assertNot(contains_63,Any,void 0)
			};
			const predicate=built.predicate=defined_63;
			return _ms.setName(built,"Any")
		})());
		const ObjLit=exports.ObjLit=new (Pred_45Type)((()=>{
			const built={};
			const doc=built.doc=`Matches only Objects which have no type (other than Object itself).`;
			const test=built.test=function test(){
				_ms.assert(contains_63,ObjLit,{
					a:1
				});
				_ms.assertNot(contains_63,ObjLit,ObjLit)
			};
			const predicate=built.predicate=function predicate(_){
				return (_ms.contains(Object,_)&&id_61_63(Object.getPrototypeOf(_),Object.prototype))
			};
			return _ms.setName(built,"ObjLit")
		})());
		const Union=exports.Union=(()=>{
			const built={};
			const doc=built.doc=`Type that matches one of several types. Analogous to \`or\`.`;
			const test=built.test=function test(){
				const SBN=_ms.sub(Union,String,Boolean,Number);
				_ms.assert(_ms.unlazy(_61_63),SBN.name,`Union[String Boolean Number]`);
				_ms.assert(contains_63,SBN,`true`);
				_ms.assert(contains_63,SBN,true);
				_ms.assert(contains_63,SBN,3);
				_ms.assertNot(contains_63,SBN,null)
			};
			return _ms.setName(built,"Union")
		})();
		self_45impl_33(sub,Union,function(){
			const types=[].slice.call(arguments,0);
			return new (Pred_45Type)((()=>{
				const built={};
				const name=built.name=(()=>{
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
						return contains_63(type,_)
					})
				};
				return built
			})())
		});
		const name=exports.name=`Pred-Type`;
		exports.default=Pred_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvVHlwZS9QcmVkLVR5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFZQSxrQkFDZ0I7ZUFHSixPQUNNO0lBQWhCLGNBQWMsS0FBSzs0QkFDTCxPQUFOOzRCQUNXLEtBQVg7OztFQUVWLFFBQU0sWUFBVTtFQUNoQixRQUFNLFlBQVUsWUFBWSxTQUFBLE1BQ0s7U0F1QkQ7VUFBQSxnQkF2QnBCO0VBQUE7RUFHWCxzQkFBSyxLQUFJLGFBQ1MsS0FBQTs7R0FBakIsb0JBQU07R0FDTixnQ0FDWSxvQkFBQTtXQUFYO0dBQUE7OztFQUVGLGVBQVcsSUFBSSxJQUNHLEtBQUE7O0dBQWpCLG9CQUFNO2tCQUNMLGVBQ2dCO3NCQURKO0lBQ1osU0FBSztXQUNMLEtBQUksV0FBUTtHQUFBOztFQUVkLGdCQUNlO2VBSUgsY0FDZ0I7c0JBREo7b0JBQ3RCLG1CQUFlO0dBQUE7RUFBQTtFQUNqQixRQUFNLFVBQVE7RUFDZCxRQUFNLFlBQVUsVUFBVSxTQUFBLEVBQ0M7U0FBSTtVQUE5QixDQUFJLEVBQUksV0FBUSxJQUFJLFlBQVUscUJBQWE7RUFBQTtFQUU3QyxzQkFBSyxLQUFJLGFBQ1MsS0FBQTs7R0FBakIsb0JBQU07R0FDTixzQkFDUSxlQUFBO2VBQUMsWUFBVSxJQUFJO2VBQ2QsWUFBVSxJQUFJO2tCQUNkLFlBQVUsSUFBSTs7R0FDdkIsZ0NBQVc7OztFQUVaLDRCQUFRLEtBQUksYUFDUyxLQUFBOztHQUFwQixvQkFBTTtHQUNOLHNCQUNRLGVBQUE7ZUFBQyxZQUFVLE9BQU87T0FBSTtJQUFBO2tCQUNyQixZQUFVLE9BQU87R0FBQTtHQUMxQixnQ0FBWSxtQkFBQSxFQUNDO1dBQVosY0FBSyxPQUFELElBQVMsU0FBTSxzQkFBc0IsR0FBRzs7OztFQUU5QywwQkFDTSxLQUFBOztHQUFMLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtJQUNQLGtCQUFNLE1BQU0sT0FBTyxRQUFRO2tDQUNoQixTQUFVO2VBQ2IsWUFBVSxJQUFLO2VBQ2YsWUFBVSxJQUFJO2VBQ2QsWUFBVSxJQUFJO2tCQUNkLFlBQVUsSUFBSTtHQUFBOzs7RUFFeEIsZUFBVyxJQUFJLE1BQU8sVUFDUTs7VUFBN0IsS0FBSSxhQUNTLEtBQUE7O0lBQVosc0JBQ0ssS0FBQTtLQUFKLFlBQWE7O2NBQUEsS0FBQSxNQUNLO3FCQUFqQjs7OztZQUNBLFNBQU8sT0FBRyxPQUFPLE1BQU87O0lBQzFCLGdDQUFZLG1CQUFBLEVBQ0M7K0JBQVAsTUFBTyxNQUNJO2FBQWYsWUFBVSxLQUFLO0tBQUE7SUFBQTs7OztFQW5GbkIsd0JBQUE7a0JBWUEiLCJmaWxlIjoiVHlwZS9QcmVkLVR5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==