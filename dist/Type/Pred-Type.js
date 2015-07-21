"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Function","../js","../methods","./Kind","./Method","./Obj-Type","./Type","../at/at","../compare"],(exports,Function_0,js_1,methods_2,Kind_3,Method_4,Obj_45Type_5,Type_6,_64_7,compare_8)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Function_0),Pred=_ms.get(_$2,"Pred"),_$3=_ms.getModule(js_1),defined_63=_ms.get(_$3,"defined?"),id_61_63=_ms.get(_$3,"id=?"),_$4=_ms.getModule(methods_2),sub=_ms.get(_$4,"sub"),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),self_45impl_33=_ms.get(_$6,"self-impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_5),Type=_ms.getDefaultExport(Type_6),_$8=_ms.getModule(Type_6),_61_62=_ms.get(_$8,"=>"),contains_63=_ms.get(_$8,"contains?"),_$10=_ms.lazyGetModule(_64_7),any_63=_ms.lazyProp(_$10,"any?"),_$12=_ms.lazyGetModule(compare_8),_61_63=_ms.lazyProp(_$12,"=?");
		const Pred_45Type=Obj_45Type(()=>{
			const built={};
			const doc=built.doc=`Arbitrary predicates can be made into types using Pred-Type.`;
			const props=built.props=()=>{
				const built={};
				const name=built.name=String;
				const predicate=built.predicate=Pred;
				return built
			}();
			const extensible=built.extensible=true;
			return _ms.setName(built,"Pred-Type")
		}());
		kind_33(Pred_45Type,Type);
		impl_33(contains_63,Pred_45Type,function(value){
			const _this=this;
			return _this.predicate(value)
		});
		const Opt=exports.Opt=Pred_45Type(()=>{
			const built={};
			const doc=built.doc=`A value which could be anything, even undefined.`;
			const predicate=built.predicate=function predicate(){
				return true
			};
			return _ms.setName(built,"Opt")
		}());
		self_45impl_33(sub,Opt,()=>{
			const built={};
			const doc=built.doc=`Contains null, undefined, or an instance of Exists-Type.`;
			return _ms.set(Exists_45Type=>{
				_ms.checkContains(Type,Exists_45Type,"Exists-Type");
				const ET=Exists_45Type;
				return Opt_45Sub(()=>{
					const built={};
					const Exists_45Type=built["Exists-Type"]=ET;
					return built
				}())
			},built)
		}());
		const Opt_45Sub=Obj_45Type(()=>{
			const built={};
			const doc=built.doc=`Result of calling Opt[something].`;
			const props=built.props=()=>{
				const built={};
				const Exists_45Type=built["Exists-Type"]=Type;
				return _ms.setName(built,"props")
			}();
			return _ms.setName(built,"Opt-Sub")
		}());
		kind_33(Opt_45Sub,Type);
		impl_33(contains_63,Opt_45Sub,function(_){
			const _this=this;
			return (! defined_63(_)||contains_63(_this["Exists-Type"],_))
		});
		const Any=exports.Any=Pred_45Type(()=>{
			const built={};
			const doc=built.doc=`Not undefined.`;
			const test=built.test=function test(){
				_ms.assert(contains_63,Any,0);
				_ms.assert(contains_63,Any,null);
				_ms.assertNot(contains_63,Any,void 0)
			};
			const predicate=built.predicate=defined_63;
			return _ms.setName(built,"Any")
		}());
		const ObjLit=exports.ObjLit=Pred_45Type(()=>{
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
		}());
		const Union=exports.Union=()=>{
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
		}();
		self_45impl_33(sub,Union,function(){
			const types=[].slice.call(arguments,0);
			return Pred_45Type(()=>{
				const built={};
				const name=built.name=`Union[${_ms.show(_61_62(String,types,` `))}]`;
				const predicate=built.predicate=function predicate(_){
					return _ms.unlazy(any_63)(types,type=>{
						return contains_63(type,_)
					})
				};
				return built
			}())
		});
		const name=exports.name=`Pred-Type`;
		exports.default=Pred_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1ByZWQtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWFBLGtCQUFXLGVBQ1E7O0dBQWxCLG9CQUFNO0dBQ04sNEJBQ007O0lBQUwsc0JBQU07SUFDTixnQ0FBVzs7O0dBQ1osa0NBQVk7OztFQUViLFFBQU0sWUFBVTtFQUNoQixRQUFNLFlBQVUsWUFBWSxTQUFBLE1BQ0s7O1VBQWhDLGdCQUFXO0VBQUE7RUFHWCxzQkFBSyxnQkFDUzs7R0FBYixvQkFBTTtHQUNOLGdDQUNZLG9CQUFBO1dBQVg7R0FBQTs7O0VBRUYsZUFBVyxJQUFJLFFBQ0c7O0dBQWpCLG9CQUFNO2tCQUNMLGVBQ2dCO3NCQURKO0lBQ1osU0FBSztXQUNMLGNBQ087O0tBQU4seUNBQWE7Ozs7O0VBRWhCLGdCQUFVLGVBQ1E7O0dBQWpCLG9CQUFNO0dBQ04sNEJBQ007O0lBQUwseUNBQWE7Ozs7O0VBQ2YsUUFBTSxVQUFRO0VBQ2QsUUFBTSxZQUFVLFVBQVUsU0FBQSxFQUNDOztVQUExQixDQUFJLEVBQUksV0FBUSxJQUFJLFlBQVUscUJBQWE7RUFBQTtFQUU3QyxzQkFBSyxnQkFDUzs7R0FBYixvQkFBTTtHQUNOLHNCQUNRLGVBQUE7ZUFBQyxZQUFVLElBQUk7ZUFDZCxZQUFVLElBQUk7a0JBQ2QsWUFBVSxJQUFJOztHQUN2QixnQ0FBVzs7O0VBRVosNEJBQVEsZ0JBQ1M7O0dBQWhCLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtlQUFDLFlBQVUsT0FBTztPQUFJO0lBQUE7a0JBQ3JCLFlBQVUsT0FBTztHQUFBO0dBQzFCLGdDQUFZLG1CQUFBLEVBQ0M7V0FBWixjQUFLLE9BQUQsSUFBUyxTQUFNLHNCQUFzQixHQUFHOzs7O0VBRTlDLDhCQUNNOztHQUFMLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtJQUNQLGtCQUFNLE1BQU0sT0FBTyxRQUFRO2tDQUNoQixTQUFVO2VBQ2IsWUFBVSxJQUFLO2VBQ2YsWUFBVSxJQUFJO2VBQ2QsWUFBVSxJQUFJO2tCQUNkLFlBQVUsSUFBSTtHQUFBOzs7RUFFeEIsZUFBVyxJQUFJLE1BQU8sVUFDUTs7VUFBN0IsZ0JBQ1M7O0lBQVIsc0JBQU8sa0JBQU8sT0FBRyxPQUFPLE1BQU87SUFDL0IsZ0NBQVksbUJBQUEsRUFDQzsrQkFBUCxNQUFPLE1BQ0k7YUFBZixZQUFVLEtBQUs7S0FBQTtJQUFBOzs7O0VBN0VuQix3QkFBQTtrQkFhQSIsImZpbGUiOiJUeXBlL1ByZWQtVHlwZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9