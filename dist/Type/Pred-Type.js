"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Function","../js","../methods","./Kind","./Method","./Type","../at/at","../compare"],(exports,Function_0,js_1,methods_2,Kind_3,Method_4,Type_5,_64_6,compare_7)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(Function_0),Pred=_ms.get(_$0,"Pred"),_$1=_ms.getModule(js_1),defined_63=_ms.get(_$1,"defined?"),id_61_63=_ms.get(_$1,"id=?"),_$2=_ms.getModule(methods_2),sub=_ms.get(_$2,"sub"),_$3=_ms.getModule(Kind_3),kind_33=_ms.get(_$3,"kind!"),_$4=_ms.getModule(Method_4),impl_33=_ms.get(_$4,"impl!"),self_45impl_33=_ms.get(_$4,"self-impl!"),Type=_ms.getDefaultExport(Type_5),_$5=_ms.getModule(Type_5),_61_62=_ms.get(_$5,"=>"),contains_63=_ms.get(_$5,"contains?"),_$6=_ms.lazyGetModule(_64_6),any_63=_ms.lazyProp(_$6,"any?"),_$7=_ms.lazyGetModule(compare_7),_61_63=_ms.lazyProp(_$7,"=?");
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
			built[`name`]="Opt";
			const doc=built.doc=`A value which could be anything, even undefined.`;
			const predicate=built.predicate=function predicate(){
				return true
			};
			return built
		})());
		self_45impl_33(sub,Opt,(()=>{
			const built={};
			const doc=built.doc=`Contains undefined or an instance of Exists-Type.`;
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
			return (! defined_63(_)||_ms.contains(_this["Exists-Type"],_))
		});
		const Any=exports.Any=new (Pred_45Type)((()=>{
			const built={};
			built[`name`]="Any";
			const doc=built.doc=`Not undefined.`;
			const test=built.test=function test(){
				_ms.assert(_ms.contains,Any,0);
				_ms.assert(_ms.contains,Any,null);
				_ms.assertNot(_ms.contains,Any,void 0)
			};
			const predicate=built.predicate=defined_63;
			return built
		})());
		const ObjLit=exports.ObjLit=new (Pred_45Type)((()=>{
			const built={};
			built[`name`]="ObjLit";
			const doc=built.doc=`Matches only Objects which have no type (other than Object itself).`;
			const test=built.test=function test(){
				_ms.assert(_ms.contains,ObjLit,{
					a:1
				});
				_ms.assertNot(_ms.contains,ObjLit,ObjLit)
			};
			const predicate=built.predicate=function predicate(_){
				return (_ms.contains(Object,_)&&id_61_63(Object.getPrototypeOf(_),Object.prototype))
			};
			return built
		})());
		const Union=exports.Union=(()=>{
			const built={};
			const doc=built.doc=`Type that matches one of several types. Analogous to \`or\`.`;
			const test=built.test=function test(){
				const SBN=_ms.sub(Union,String,Boolean,Number);
				_ms.assert(_ms.unlazy(_61_63),SBN.name,`Union[String Boolean Number]`);
				_ms.assert(_ms.contains,SBN,`true`);
				_ms.assert(_ms.contains,SBN,true);
				_ms.assert(_ms.contains,SBN,1);
				_ms.assertNot(_ms.contains,SBN,null)
			};
			return built
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
		exports.default=Pred_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvVHlwZS9QcmVkLVR5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFZQSxrQkFDZ0I7ZUFHSixPQUNNO0lBZ0R5QixjQWhEM0IsS0FBSzs0QkFrRVAsT0FqRUo7NEJBQ1csS0FBWDs7O0VBRVYsUUFBTSxZQUFVO0VBQ2hCLFFBQU0sWUFBVSxZQUFZLFNBQUEsTUFDSztTQXdCWDtVQUFBLGdCQXhCVjtFQUFBO0VBR1gsc0JBQUssS0FBSSxhQUNTLEtBQUE7O1NBQWpCLFFBQUE7R0FDQSxvQkFBTTtHQUNOLGdDQUNZLG9CQUFBO1dBQVg7R0FBQTs7O0VBRUYsZUFBVyxJQUFJLElBQ0csS0FBQTs7R0FBakIsb0JBQU07a0JBQ0wsZUFDZ0I7c0JBREo7SUFDWixTQUFLO1dBQ0wsS0FBSSxXQUFRO0dBQUE7O0VBRWQsZ0JBQ2U7ZUFJSCxjQUNnQjtzQkFESjtvQkFDdEIsbUJBQWU7R0FBQTtFQUFBO0VBQ2pCLFFBQU0sVUFBUTtFQUNkLFFBQU0sWUFBVSxVQUFVLFNBQUEsRUFDQztTQUFOO1VBQXBCLENBQUksRUFBSSxXQUFBLGlCQUFZLHFCQUFEO0VBQUE7RUFFckIsc0JBQUssS0FBSSxhQUNTLEtBQUE7O1NBQWpCLFFBQUE7R0FDQSxvQkFBTTtHQUNOLHNCQUNRLGVBQUE7NEJBQUcsSUFBRjs0QkFDSyxJQUFMOytCQUNVLElBQVY7O0dBQ1QsZ0NBQVc7OztFQUVaLDRCQUFRLEtBQUksYUFDUyxLQUFBOztTQUFwQixRQUFBO0dBQ0Esb0JBQU07R0FDTixzQkFDUSxlQUFBOzRCQUFRLE9BQVA7T0FBSTtJQUFBOytCQUNHLE9BQVA7R0FBQTtHQUNULGdDQUFZLG1CQUFBLEVBQ0M7V0FBWixjQUF5QyxPQUFyQyxJQUFTLFNBQTRCLHNCQUFqQixHQUFpQjs7OztFQUUzQywwQkFDTSxLQUFBOztHQUFMLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtJQUNQLGtCQUFNLE1BWU0sT0FaTyxRQUFRO2tDQUNoQixTQUFVOzRCQUNOLElBQU47NEJBQ0ksSUFBTDs0QkFDRSxJQUFGOytCQUNLLElBQUw7R0FBQTs7O0VBRVYsZUFBVyxJQUFJLE1BQU8sVUFDUTs7VUFBN0IsS0FBSSxhQUNTLEtBQUE7O1VBQVosUUFDSyxLQUFBO0tBQUosWUFBYTs7Y0FBQSxLQUFBLE1BQ0s7cUJBQWpCOzs7O1lBQ0EsU0FBTyxPQUFHLE9BQU8sTUFBTzs7SUFDMUIsZ0NBQVksbUJBQUEsRUFDQzsrQkFBUCxNQUFPLE1BQ0k7MEJBQWQsS0FBRDtLQUFBO0lBQUE7Ozs7RUF0Rkosd0JBQUE7a0JBWUEiLCJmaWxlIjoiVHlwZS9QcmVkLVR5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==