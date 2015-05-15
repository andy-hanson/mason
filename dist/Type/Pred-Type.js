"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Boolean","../Function","../js","../methods","./Kind","./Method","./Obj-Type","./Type","../at/at","../bang","../compare"],function(exports,Boolean_0,Function_1,js_2,methods_3,Kind_4,Method_5,Obj_45Type_6,Type_7,_64_8,_33_9,compare_10){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),or=_ms.get(_$2,"or"),_$3=_ms.getModule(Function_1),Pred=_ms.get(_$3,"Pred"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),id_61_63=_ms.get(_$4,"id=?"),_$5=_ms.getModule(methods_3),sub=_ms.get(_$5,"sub"),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),_$7=_ms.getModule(Method_5),impl_33=_ms.get(_$7,"impl!"),self_45impl_33=_ms.get(_$7,"self-impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_6),Type=_ms.getDefaultExport(Type_7),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),contains_63=_ms.get(_$9,"contains?"),_$11=_ms.lazyGetModule(_64_8),any_63=_ms.lazyProp(_$11,"any?"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_9)
		}),_$13=_ms.lazyGetModule(_33_9),_33not=_ms.lazyProp(_$13,"!not"),_$14=_ms.lazyGetModule(compare_10),_61_63=_ms.lazyProp(_$14,"=?");
		const Pred_45Type=Obj_45Type(function(){
			const doc="Arbitrary predicates can be made into types using Pred-Type.";
			const props=function(){
				const displayName=String;
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
			const doc="Matches only Objects which have no type (other than Object itself).";
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
					return and(_ms.contains(Object,_),_ms.lazy(function(){
						return id_61_63(Object.getPrototypeOf(_),Object.prototype)
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
					const SBN=_ms.sub(Union,String,Boolean,Number);
					_ms.unlazy(_33)(_ms.unlazy(_61_63),SBN.displayName,"Union[String Boolean Number]");
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
				const displayName=(("Union["+_ms.show(_61_62(String,types," ")))+"]");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1ByZWQtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBZUEsa0JBQVkscUJBQ1E7R0FBbkIsVUFBTTtHQUNOLHNCQUNNO0lBQUwsa0JBQWE7SUFDYixnQkFBVzs7Ozs7O0dBQ1osaUJBQVk7Ozs7Ozs7O0VBRWIsUUFBTSxZQUFVO0VBQ2hCLFFBQU0sWUFBVSxZQUFXLFNBQUEsRUFBRSxNQUNLO1VBQWpDLFlBQVk7RUFBQTtFQUdaLHNCQUFLLHNCQUNTO0dBQWIsVUFBTTtHQUNOLDBCQUNZO21CQUFBLFVBQUE7WUFBWDtJQUFBOzs7Ozs7OztFQUVGLGVBQVcsSUFBSSxjQUNHO0dBQWpCLFVBQU07a0JBQ0wsU0FBQSxjQUNnQjtzQkFESjtJQUNaLFNBQUs7V0FDTCxvQkFDTztLQUFOLG9CQUFhOzs7Ozs7O0VBRWhCLGdCQUFVLHFCQUNRO0dBQWpCLFVBQU07R0FDTixzQkFDTTtJQUFMLG9CQUFhOzs7Ozs7Ozs7Ozs7RUFDZixRQUFNLFVBQVE7RUFDZCxRQUFNLFlBQVUsVUFBUyxTQUFBLEdBQUcsRUFDQztVQUE1QixHQUFJLElBQUksV0FBQTtXQUFhLFlBQVUsa0JBQWU7R0FBQTtFQUFBO0VBRWhELHNCQUFLLHNCQUNTO0dBQWIsVUFBTTtHQUNOLHFCQUNPO21CQUFBLFVBQUE7cUJBQUosWUFBVSxJQUFJO3FCQUNkLFlBQVUsSUFBSTsrQkFDWCxZQUFVLElBQUk7OztHQUNwQixnQkFBVzs7Ozs7Ozs7RUFFWiw0QkFBUSxzQkFDUztHQUFoQixVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTtxQkFBSixZQUFVLE9BQU87UUFBSTtLQUFBOytCQUNsQixZQUFVLE9BQU87SUFBQTs7R0FDdkIsMEJBQVk7bUJBQUEsU0FBQSxFQUNDO1lBQVosaUJBQUssT0FBRDthQUFVLFNBQU0sc0JBQXNCLEdBQUc7Ozs7Ozs7Ozs7O0VBRS9DLG9DQUNNO0dBQUwsVUFBTTtHQUNOLHFCQUNPO21CQUFBLFVBQUE7S0FDTixrQkFBTSxNQUFNLE9BQU8sUUFBUTt3Q0FDdEIsZ0JBQWlCO3FCQUNwQixZQUFVLElBQUs7cUJBQ2YsWUFBVSxJQUFJO3FCQUNkLFlBQVUsSUFBSTsrQkFDWCxZQUFVLElBQUk7SUFBQTs7Ozs7Ozs7RUFFckIsZUFBVyxJQUFJLE1BQU8sVUFDUTs7VUFBN0Isc0JBQ1M7SUFBUixrQkFBYyxvQkFBTyxPQUFHLE9BQU8sTUFBTztJQUN0QywwQkFBWTtvQkFBQSxTQUFBLEVBQ0M7Z0NBQVAsTUFBTyxTQUFBLEtBQ0k7Y0FBZixZQUFVLEtBQUs7TUFBQTtLQUFBOzs7Ozs7OztFQS9FbkIsc0NBQUE7a0JBZ0ZBIiwiZmlsZSI6IlR5cGUvUHJlZC1UeXBlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=