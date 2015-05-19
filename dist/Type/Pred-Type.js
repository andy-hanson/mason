"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Boolean","../Function","../js","../methods","./Kind","./Method","./Obj-Type","./Type","../at/at","../bang","../compare"],function(exports,Boolean_0,Function_1,js_2,methods_3,Kind_4,Method_5,Obj_45Type_6,Type_7,_64_8,_33_9,compare_10){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_$2.and,not=_$2.not,or=_$2.or,_$3=_ms.getModule(Function_1),Pred=_$3.Pred,_$4=_ms.getModule(js_2),defined_63=_$4["defined?"],id_61_63=_$4["id=?"],_$5=_ms.getModule(methods_3),sub=_$5.sub,_$6=_ms.getModule(Kind_4),kind_33=_$6["kind!"],_$7=_ms.getModule(Method_5),impl_33=_$7["impl!"],self_45impl_33=_$7["self-impl!"],Obj_45Type=_ms.getDefaultExport(Obj_45Type_6),Type=_ms.getDefaultExport(Type_7),_$9=_ms.getModule(Type_7),_61_62=_$9["=>"],contains_63=_$9["contains?"],_$11=_ms.lazyGetModule(_64_8),any_63=_ms.lazyProp(_$11,"any?"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_9)
		}),_$13=_ms.lazyGetModule(_33_9),_33not=_ms.lazyProp(_$13,"!not"),_$14=_ms.lazyGetModule(compare_10),_61_63=_ms.lazyProp(_$14,"=?");
		const Pred_45Type=Obj_45Type(function(){
			const doc="Arbitrary predicates can be made into types using Pred-Type.";
			const props=function(){
				const name=String;
				const predicate=Pred;
				return {
					name:name,
					predicate:predicate
				}
			}();
			const extensible=true;
			return {
				doc:doc,
				props:props,
				extensible:extensible,
				name:"Pred-Type"
			}
		}());
		kind_33(Pred_45Type,Type);
		impl_33(contains_63,Pred_45Type,function(_,value){
			return _.predicate(value)
		});
		const Opt=exports.Opt=Pred_45Type(function(){
			const doc="A value which could be anything, even undefined.";
			const predicate=function predicate(){
				return true
			};
			return {
				doc:doc,
				predicate:predicate,
				name:"Opt"
			}
		}());
		self_45impl_33(sub,Opt,function(){
			const doc="Contains null, undefined, or an instance of Exists-Type.";
			return _ms.set(function(Exists_45Type){
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
					name:"props"
				}
			}();
			return {
				doc:doc,
				props:props,
				name:"Opt-Sub"
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
			const predicate=defined_63;
			return {
				doc:doc,
				predicate:predicate,
				name:"Any"
			}
		}());
		const ObjLit=exports.ObjLit=Pred_45Type(function(){
			const doc="Matches only Objects which have no type (other than Object itself).";
			const predicate=function predicate(_){
				return and(_ms.contains(Object,_),_ms.lazy(function(){
					return id_61_63(Object.getPrototypeOf(_),Object.prototype)
				}))
			};
			return {
				doc:doc,
				predicate:predicate,
				name:"ObjLit"
			}
		}());
		const Union=exports.Union=function(){
			const doc="Type that matches one of several types. Analogous to `or`.";
			return {
				doc:doc,
				name:"Union"
			}
		}();
		self_45impl_33(sub,Union,function(){
			const types=[].slice.call(arguments,0);
			return Pred_45Type(function(){
				const name=(("Union["+_ms.show(_61_62(String,types," ")))+"]");
				const predicate=function predicate(_){
					return _ms.unlazy(any_63)(types,function(type){
						return contains_63(type,_)
					})
				};
				return {
					name:name,
					predicate:predicate
				}
			}())
		});
		const name=exports.name="Pred-Type";
		exports.default=Pred_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1ByZWQtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBZUEsa0JBQVkscUJBQ1E7R0FBbkIsVUFBTTtHQUNOLHNCQUNNO0lBQUwsV0FBTTtJQUNOLGdCQUFXOzs7Ozs7R0FDWixpQkFBWTs7Ozs7Ozs7RUFFYixRQUFNLFlBQVU7RUFDaEIsUUFBTSxZQUFVLFlBQVcsU0FBQSxFQUFFLE1BQ0s7VUFBakMsWUFBWTtFQUFBO0VBR1osc0JBQUssc0JBQ1M7R0FBYixVQUFNO0dBQ04sZ0JBQ1ksb0JBQUE7V0FBWDtHQUFBOzs7Ozs7O0VBRUYsZUFBVyxJQUFJLGNBQ0c7R0FBakIsVUFBTTtrQkFDTCxTQUFBLGNBQ2dCO0lBQWhCLFNBQUs7V0FDTCxvQkFDTztLQUFOLG9CQUFhOzs7Ozs7O0VBRWhCLGdCQUFVLHFCQUNRO0dBQWpCLFVBQU07R0FDTixzQkFDTTtJQUFMLG9CQUFhOzs7Ozs7Ozs7Ozs7RUFDZixRQUFNLFVBQVE7RUFDZCxRQUFNLFlBQVUsVUFBUyxTQUFBLEdBQUcsRUFDQztVQUE1QixHQUFJLElBQUksV0FBQTtXQUFhLFlBQVUsa0JBQWU7R0FBQTtFQUFBO0VBRWhELHNCQUFLLHNCQUNTO0dBQWIsVUFBTTtHQUtOLGdCQUFXOzs7Ozs7O0VBRVosNEJBQVEsc0JBQ1M7R0FBaEIsVUFBTTtHQUlOLGdCQUFZLG1CQUFBLEVBQ0M7V0FBWixpQkFBSyxPQUFEO1lBQVUsU0FBTSxzQkFBc0IsR0FBRzs7Ozs7Ozs7O0VBRS9DLG9DQUNNO0dBQUwsVUFBTTs7Ozs7O0VBVVAsZUFBVyxJQUFJLE1BQU8sVUFDUTs7VUFBN0Isc0JBQ1M7SUFBUixXQUFPLG9CQUFPLE9BQUcsT0FBTyxNQUFPO0lBQy9CLGdCQUFZLG1CQUFBLEVBQ0M7K0JBQVAsTUFBTyxTQUFBLEtBQ0k7YUFBZixZQUFVLEtBQUs7S0FBQTtJQUFBOzs7Ozs7O0VBL0VuQix3QkFBQTtrQkFnRkEiLCJmaWxlIjoiVHlwZS9QcmVkLVR5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==