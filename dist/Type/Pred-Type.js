"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Bool","../Fun","../js","../methods","../Obj","../private/bootstrap","./Kind","./Method","./Obj-Type","./Type","../at/at","../bang","../Bool","../compare","../math/Num"],function(exports,Bool_0,Fun_1,js_2,methods_3,Obj_4,bootstrap_5,Kind_6,Method_7,Obj_45Type_8,Type_9,_64_10,_33_11,Bool_12,compare_13,Num_14){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Bool_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),or=_ms.get(_$2,"or"),_$3=_ms.getModule(Fun_1),Pred=_ms.get(_$3,"Pred"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),id_61_63=_ms.get(_$4,"id=?"),_$5=_ms.getModule(methods_3),sub=_ms.get(_$5,"sub"),Obj=_ms.getDefaultExport(Obj_4),_$7=_ms.getModule(bootstrap_5),Str=_ms.get(_$7,"Str"),_$8=_ms.getModule(Kind_6),kind_33=_ms.get(_$8,"kind!"),_$9=_ms.getModule(Method_7),impl_33=_ms.get(_$9,"impl!"),self_45impl_33=_ms.get(_$9,"self-impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_8),Type=_ms.getDefaultExport(Type_9),_$11=_ms.getModule(Type_9),_61_62=_ms.get(_$11,"=>"),contains_63=_ms.get(_$11,"contains?"),_$13=_ms.lazyGetModule(_64_10),any_63=_ms.lazyProp(_$13,"any?"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_11)
		}),_$15=_ms.lazyGetModule(_33_11),_33not=_ms.lazyProp(_$15,"!not"),Bool=_ms.lazy(function(){
			return _ms.getDefaultExport(Bool_12)
		}),_$17=_ms.lazyGetModule(compare_13),_61_63=_ms.lazyProp(_$17,"=?"),Num=_ms.lazy(function(){
			return _ms.getDefaultExport(Num_14)
		});
		const Pred_45Type=Obj_45Type(function(){
			const doc="Arbitrary predicates can be made into types using Pred-Type.";
			const props=function(){
				const displayName=Str;
				const predicate=Pred;
				return {
					displayName:displayName,
					predicate:predicate
				}
			}();
			const extensible=true;
			return {
				doc:doc,
				props:props,
				extensible:extensible,
				displayName:"Pred-Type"
			}
		}());
		kind_33(Pred_45Type,Type);
		impl_33(contains_63,Pred_45Type,function(_,value){
			return _.predicate(value)
		});
		const Opt=exports.Opt=Pred_45Type(function(){
			const doc="A value which could be anything, even undefined.";
			const predicate=function(){
				return _ms.set(function(){
					return true
				},"displayName","predicate")
			}();
			return {
				doc:doc,
				predicate:predicate,
				displayName:"Opt"
			}
		}());
		self_45impl_33(sub,Opt,function(){
			const doc="Contains null, undefined, or an instance of Exists-Type.";
			return _ms.set(function(Exists_45Type){
				_ms.checkContains(Type,Exists_45Type,"Exists-Type");
				const ET=Exists_45Type;
				return Opt_45Sub(function(){
					const Exists_45Type=ET;
					return {
						"Exists-Type":Exists_45Type
					}
				}())
			},"doc",doc)
		}());
		const Opt_45Sub=Obj_45Type(function(){
			const doc="Result of calling Opt[something].";
			const props=function(){
				const Exists_45Type=Type;
				return {
					"Exists-Type":Exists_45Type,
					displayName:"props"
				}
			}();
			return {
				doc:doc,
				props:props,
				displayName:"Opt-Sub"
			}
		}());
		kind_33(Opt_45Sub,Type);
		impl_33(contains_63,Opt_45Sub,function(nt,_){
			return or(not(defined_63(_)),_ms.lazy(function(){
				return contains_63(nt["Exists-Type"],_)
			}))
		});
		const Any=exports.Any=Pred_45Type(function(){
			const doc="Not undefined.";
			const test=function(){
				return _ms.set(function(){
					_ms.unlazy(_33)(contains_63,Any,0);
					_ms.unlazy(_33)(contains_63,Any,null);
					return _ms.unlazy(_33not)(contains_63,Any,void 0)
				},"displayName","test")
			}();
			const predicate=defined_63;
			return {
				doc:doc,
				test:test,
				predicate:predicate,
				displayName:"Any"
			}
		}());
		const ObjLit=exports.ObjLit=Pred_45Type(function(){
			const doc="Matches only Objs which have no type (other than Obj itself).";
			const test=function(){
				return _ms.set(function(){
					_ms.unlazy(_33)(contains_63,ObjLit,{
						a:1
					});
					return _ms.unlazy(_33not)(contains_63,ObjLit,ObjLit)
				},"displayName","test")
			}();
			const predicate=function(){
				return _ms.set(function(_){
					return and(_ms.contains(Obj,_),_ms.lazy(function(){
						return id_61_63(Obj.getPrototypeOf(_),Obj.prototype)
					}))
				},"displayName","predicate")
			}();
			return {
				doc:doc,
				test:test,
				predicate:predicate,
				displayName:"ObjLit"
			}
		}());
		const Union=exports.Union=function(){
			const doc="Type that matches one of several types. Analogous to `or`.";
			const test=function(){
				return _ms.set(function(){
					const SBN=_ms.sub(Union,Str,_ms.unlazy(Bool),_ms.unlazy(Num));
					_ms.unlazy(_33)(_ms.unlazy(_61_63),SBN.displayName,"Union[Str Bool Num]");
					_ms.unlazy(_33)(contains_63,SBN,"true");
					_ms.unlazy(_33)(contains_63,SBN,true);
					_ms.unlazy(_33)(contains_63,SBN,3);
					return _ms.unlazy(_33not)(contains_63,SBN,null)
				},"displayName","test")
			}();
			return {
				doc:doc,
				test:test,
				displayName:"Union"
			}
		}();
		self_45impl_33(sub,Union,function(){
			const types=[].slice.call(arguments,0);
			return Pred_45Type(function(){
				const displayName=(("Union["+_ms.show(_61_62(Str,types," ")))+"]");
				const predicate=function(){
					return _ms.set(function(_){
						return _ms.unlazy(any_63)(types,function(type){
							return contains_63(type,_)
						})
					},"displayName","predicate")
				}();
				return {
					displayName:displayName,
					predicate:predicate
				}
			}())
		});
		const displayName=exports.displayName="Pred-Type";
		exports.default=Pred_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1ByZWQtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztFQW1CQSxrQkFBWSxxQkFDUTtHQUFuQixVQUFNO0dBQ04sc0JBQ007SUFBTCxrQkFBYTtJQUNiLGdCQUFXOzs7Ozs7R0FDWixpQkFBWTs7Ozs7Ozs7RUFFYixRQUFNLFlBQVU7RUFDaEIsUUFBTSxZQUFVLFlBQVcsU0FBQSxFQUFFLE1BQ0s7VUFBakMsWUFBWTtFQUFBO0VBR1osc0JBQUssc0JBQ1M7R0FBYixVQUFNO0dBQ04sMEJBQ1k7bUJBQUEsVUFBQTtZQUFYO0lBQUE7Ozs7Ozs7O0VBRUYsZUFBVyxJQUFJLGNBQ0c7R0FBakIsVUFBTTtrQkFDTCxTQUFBLGNBQ2dCO3NCQURKO0lBQ1osU0FBSztXQUNMLG9CQUNPO0tBQU4sb0JBQWE7Ozs7Ozs7RUFFaEIsZ0JBQVUscUJBQ1E7R0FBakIsVUFBTTtHQUNOLHNCQUNNO0lBQUwsb0JBQWE7Ozs7Ozs7Ozs7OztFQUNmLFFBQU0sVUFBUTtFQUNkLFFBQU0sWUFBVSxVQUFTLFNBQUEsR0FBRyxFQUNDO1VBQTVCLEdBQUksSUFBSSxXQUFBO1dBQWEsWUFBVSxrQkFBZTtHQUFBO0VBQUE7RUFFaEQsc0JBQUssc0JBQ1M7R0FBYixVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTtxQkFBSixZQUFVLElBQUk7cUJBQ2QsWUFBVSxJQUFJOytCQUNYLFlBQVUsSUFBSTs7O0dBQ3BCLGdCQUFXOzs7Ozs7OztFQUVaLDRCQUFRLHNCQUNTO0dBQWhCLFVBQU07R0FDTixxQkFDTzttQkFBQSxVQUFBO3FCQUFKLFlBQVUsT0FBTztRQUFJO0tBQUE7K0JBQ2xCLFlBQVUsT0FBTztJQUFBOztHQUN2QiwwQkFBWTttQkFBQSxTQUFBLEVBQ0M7WUFBWixpQkFBSyxJQUFEO2FBQU8sU0FBTSxtQkFBbUIsR0FBRzs7Ozs7Ozs7Ozs7RUFFekMsb0NBQ007R0FBTCxVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTtLQUNOLGtCQUFNLE1BQU07d0NBQ1AsZ0JBQWlCO3FCQUNwQixZQUFVLElBQUs7cUJBQ2YsWUFBVSxJQUFJO3FCQUNkLFlBQVUsSUFBSTsrQkFDWCxZQUFVLElBQUk7SUFBQTs7Ozs7Ozs7RUFFckIsZUFBVyxJQUFJLE1BQU8sVUFDUTs7VUFBN0Isc0JBQ1M7SUFBUixrQkFBYyxvQkFBTyxPQUFHLElBQUksTUFBTztJQUNuQywwQkFBWTtvQkFBQSxTQUFBLEVBQ0M7Z0NBQVAsTUFBTyxTQUFBLEtBQ0k7Y0FBZixZQUFVLEtBQUs7TUFBQTtLQUFBOzs7Ozs7OztFQW5GbkIsc0NBQUE7a0JBb0ZBIiwiZmlsZSI6IlR5cGUvUHJlZC1UeXBlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=