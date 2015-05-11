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
		const exports={};
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
				return true
			};
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
				_ms.unlazy(_33)(contains_63,Any,0);
				_ms.unlazy(_33)(contains_63,Any,null);
				return _ms.unlazy(_33not)(contains_63,Any,undefined)
			};
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
				_ms.unlazy(_33)(contains_63,ObjLit,{
					a:1
				});
				return _ms.unlazy(_33not)(contains_63,ObjLit,ObjLit)
			};
			const predicate=function(_){
				return and(_ms.contains(Obj,_),_ms.lazy(function(){
					return id_61_63(Obj.getPrototypeOf(_),Obj.prototype)
				}))
			};
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
				const SBN=_ms.sub(Union,Str,_ms.unlazy(Bool),_ms.unlazy(Num));
				_ms.unlazy(_33)(_ms.unlazy(_61_63),SBN.displayName,"Union[Str Bool Num]");
				_ms.unlazy(_33)(contains_63,SBN,"true");
				_ms.unlazy(_33)(contains_63,SBN,true);
				_ms.unlazy(_33)(contains_63,SBN,3);
				return _ms.unlazy(_33not)(contains_63,SBN,null)
			};
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
				const predicate=function(_){
					return _ms.unlazy(any_63)(types,function(type){
						return contains_63(type,_)
					})
				};
				return {
					displayName:displayName,
					predicate:predicate
				}
			}())
		});
		exports.default=Pred_45Type;
		const displayName=exports.displayName="Pred-Type";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1ByZWQtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7aUNBbUJBOzs7Ozs7Ozs7RUFBQSxrQkFBWSxxQkFDUTtHQUFuQixVQUFNO0dBQ04sc0JBQ007SUFBTCxrQkFBYTtJQUNiLGdCQUFXO1dBRE47Ozs7O0dBRU4saUJBQUE7VUFKbUI7Ozs7Ozs7RUFNcEIsUUFBTSxZQUFVO0VBQ2hCLFFBQU0sWUFBVSxZQUFXLFNBQUEsRUFBRSxNQUNLO1VBQWpDLFlBQVk7RUFBQTtFQUdaLHNCQUFLLHNCQUNTO0dBQWIsVUFBTTtHQUNOLGdCQUNZLFVBQUE7V0FBWDtHQUFBO1VBRlk7Ozs7OztFQUlkLGVBQVcsSUFBSSxjQUNHO0dBQWpCLFVBQU07a0JBQ0wsU0FBQSxjQUNnQjtzQkFESjtJQUNaLFNBQUs7V0FDTCxvQkFDTztLQUFOLG9CQUFhO1lBQVA7Ozs7OztFQUVULGdCQUFVLHFCQUNRO0dBQWpCLFVBQU07R0FDTixzQkFDTTtJQUFMLG9CQUFhO1dBQVI7Ozs7O1VBRlc7Ozs7OztFQUdsQixRQUFNLFVBQVE7RUFDZCxRQUFNLFlBQVUsVUFBUyxTQUFBLEdBQUcsRUFDQztVQUE1QixHQUFJLElBQUksV0FBQTtXQUFhLFlBQVUsa0JBQWU7R0FBQTtFQUFBO0VBRWhELHNCQUFLLHNCQUNTO0dBQWIsVUFBTTtHQUNOLFdBQ08sVUFBQTtvQkFBSixZQUFVLElBQUk7b0JBQ2QsWUFBVSxJQUFJOzhCQUNYLFlBQVUsSUFBSTtHQUFBO0dBQ3BCLGdCQUFXO1VBTEU7Ozs7Ozs7RUFPZCw0QkFBUSxzQkFDUztHQUFoQixVQUFNO0dBQ04sV0FDTyxVQUFBO29CQUFKLFlBQVUsT0FBTztPQUFJO0lBQUE7OEJBQ2xCLFlBQVUsT0FBTztHQUFBO0dBQ3ZCLGdCQUFZLFNBQUEsRUFDQztXQUFaLGlCQUFLLElBQUQ7WUFBTyxTQUFNLG1CQUFtQixHQUFHOzs7VUFMeEI7Ozs7Ozs7RUFPakIsb0NBQ007R0FBTCxVQUFNO0dBQ04sV0FDTyxVQUFBO0lBQ04sa0JBQU0sTUFBTTt1Q0FDUCxnQkFBaUI7b0JBQ3BCLFlBQVUsSUFBSztvQkFDZixZQUFVLElBQUk7b0JBQ2QsWUFBVSxJQUFJOzhCQUNYLFlBQVUsSUFBSTtHQUFBO1VBUmY7Ozs7OztFQVVOLGVBQVcsSUFBSSxNQUFPLFVBQ1E7O1VBQTdCLHNCQUNTO0lBQVIsa0JBQWMsb0JBQU8sT0FBRyxJQUFJLE1BQU87SUFDbkMsZ0JBQVksU0FBQSxFQUNDOytCQUFQLE1BQU8sU0FBQSxLQUNJO2FBQWYsWUFBVSxLQUFLO0tBQUE7SUFBQTtXQUhUOzs7Ozs7a0JBSVY7RUFwRkEsc0NBQUEiLCJmaWxlIjoiVHlwZS9QcmVkLVR5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==